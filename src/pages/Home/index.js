import { useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import { auth } from '../../fireBaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Home() {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate();


        async function handleLogin(e){
            e.preventDefault()
            if(email !== '' && password !== ''){
                await signInWithEmailAndPassword(auth, email, password)
                .then(()=> {
                    navigate('./admin', { replace: true })
                })
                .catch(()=>{
                    toast.warn('Usuário não encontrado')
                })

            }else{
              toast.warn('Campos vázios')
            }
    
        }

 
    return (
      <div className="home-container">
          <h1>Lista de tarefas</h1>
          <span>Gerencie sua agenda de forma fácil</span>

          <form className='form'>
            <input type='text' placeholder='digite seu email'
             value={email} onChange={(e) => setEmail(e.target.value)}
            ></input>
             <input type='password' placeholder='******' 
             value={password} onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={handleLogin} type='submit'>Acessar</button>
        </form>
        <Link className='button-link' to="/register">Não poussui uma conta? Cadastre-se</Link>
      </div>

    );
  }
  