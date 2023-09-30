import { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../fireBaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import './register.css'

export default function Register() {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [password2, setPassword2] = useState('')
        const navigate = useNavigate();


       async function handleRegister(e){
            e.preventDefault()
            if(email !== '' && password !== ''){
                if(password === password2){
                  await createUserWithEmailAndPassword(auth, email, password)
                  .then(()=>{
                        navigate('/', {replace: true})
                        toast.success('Conta criada com sucesso')
                  })
                  .catch(()=>{ console.log ('Erro ao logar')})
                }else{
                 toast.warn('Senhas não conferem')
                }      
            }else{
              toast.warn('campos vázios')
            }
           
        }

 
    return (
      <div className="home-container">
          <h1>Cadastre-se</h1>
          <span>vamos criar sua conta</span>

          <form className='form'>
            <input type='text' placeholder='digite seu emaill'
             value={email} onChange={(e) => setEmail(e.target.value)}
            ></input>
             <input type='password' placeholder='******' 
             value={password} onChange={(e) => setPassword(e.target.value)}
            ></input>
             <input type='password' placeholder='Confirme sua senha' 
             value={password2} onChange={(e) => setPassword2(e.target.value)}
            ></input>
            <button onClick={handleRegister} type='submit'>Cadastrar</button>
        </form>
        <Link className='button-link' to="/">Já possui uma conta? Faça o login</Link>
      </div>

    );
  }
  