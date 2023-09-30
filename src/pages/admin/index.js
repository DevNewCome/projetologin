import './index.css'
import { useState, useEffect } from 'react'
import { auth, db } from '../../fireBaseConnection'
import { signOut } from 'firebase/auth'
import {addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc} from 'firebase/firestore'
import { toast } from 'react-toastify'
export default function Admin(){
    let [tarefaInput, setTarefaInput] = useState('')
    let [user, setUser] = useState({})
    let [tarefas, setTarefas] = useState([])
    let [edit, setEdit] = useState({})

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))
                if(userDetail){
                    let data = JSON.parse(userDetail);
                    let tarefaRef = collection(db, 'tarefas')
                    let q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                    const unsub = onSnapshot(q, (Snapshot) =>{
                        let lista = [];
                        Snapshot.forEach((doc)=>{
                            lista.push({
                                id: doc.id,
                                tarefa: doc.data().tarefa,
                                userUid: doc.data().userUid
                            })
                        })
                       
                        setTarefas(lista)
                      
                    })
                }   
        }
        loadTarefas()
    }, [])

  async  function handleRegister(e){
        e.preventDefault();
            if(tarefaInput === ''){
               toast.warn('Digite sua tarefa')
                return
            }

            if(edit?.id){
                handleUpdateTarefa();
                return
            }

            await addDoc(collection(db, "tarefas"), {
                tarefa: tarefaInput,
                created: new Date(),
                userUid: user?.uid, // o " ? " serve para se caso não seja encontrada a uid, ele nao crashe, mas sim envie os dados vázio mesmo
            })
                .then(()=>{
                    console.log('Deu certo')
                    setTarefaInput('')
                })
                .catch((error)=>{
                    console.log('sem sucesso' + error)
                })
    }

    async function handleLogout(){
      await signOut(auth);
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
        toast.success('Tarefa concluida')
    }

     function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item);
    }

   async function handleUpdateTarefa(){
    let docRef = doc(db, 'tarefas', edit?.id)
    await updateDoc(docRef, {
        tarefa: tarefaInput
    })
    .then(()=>{
        console.log('tarefa atualizada')
        toast.success('Tarefa atualizada com sucesso')
        setTarefaInput('')
        setEdit({})
    })
    .catch(()=>{
        console.log('erro ao att')
        setTarefaInput('')
        setEdit({})
    })
   };

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>
            <form className='form' onSubmit={handleRegister}>
                <textarea placeholder='Minhas tarefas...' value={tarefaInput} onChange={(e) => setTarefaInput(e.target.value)}>

                </textarea>
                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' type='submit'>Atualizar tarefa</button> 
                ): (
                    <button className='btn-register' type='submit'>Registrar tarefa</button> 
                )}
            </form>
         {tarefas.map((item)=>(
               <article key={item.id} className='list'>
               <p>{item.tarefa}</p>
               <div>
                   <button className='btn-editar' onClick={() => editTarefa(item)} >Editar</button>
                   <button className='btn-delete' onClick={() => deleteTarefa(item.id)}>Concluir</button>
               </div>
           </article>
         ))}
            <button className='btn-logout' onClick={handleLogout}>sair</button>
        </div>
    )
}