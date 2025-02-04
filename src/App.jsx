import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])
  
  const toggleFinished = (params) => {
    setShowFinished(!ShowFinished)
  }
  

  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleEdit = (e, id) => {
  let t = todos.filter(i=>i.id ===id)
  setTodo(t[0].todo)
  let index = todos.findIndex(item=>{
    return item.id===id;
  })
  const confirmed = window.confirm("Are you sure you want to update this task?");
  if (confirmed) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  saveTols()
  }
  const handleDelete = (e,id) => {
    let index = todos.findIndex(item=>{
      return item.id===id;
    })
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
   saveTols()
  }
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
    saveTols()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox= (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item=>{
    return item.id===id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos);
  saveTols()
  }
  

  return (
    <>
      <Navbar />
      <div className="mx-2 md:container bg-violet-200 md:mx-auto md:my-5 rounded-xl md:p-5 my-1 p-3 min-h-[80vh] md:w-2/3">
      <h1 className='font-bold text-lg text-center'>iTask - Manage your todo at one place!!</h1>
        <div className="addTodo my-5 flex flex-col gap-2 justify-center items-center">
          <h2 className='text-lg font-bold '>Add Todo</h2>
          <input onChange={handleChange} value={todo} className='w-[100%] rounded-full p-[0.4%]' type="text" />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-violet-900 disabled:bg-[#343333] px-3 py-1 text-white rounded-full hover:bg-violet-950 w-1/4   text-sm font-bold'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={ShowFinished} /> Show Finished
        <div className="border w-full h-[3px] bg-[#000000]"></div>
        <h2 className='text-lg font-bold mt-4'>Your Todos</h2>
        <div className="todos">
          {todos.length==0 && <div className='font-bold text-[16px] my-4'>No Todo to display</div>}
          {todos.map(item => {


            return (ShowFinished|| !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-[100%] my-3">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-900 px-3 py-1 text-white rounded-md hover:bg-red-600 mx-1 text-sm font-bold'><FaRegEdit />
                </button>
                <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-900 px-3 py-1 text-white rounded-md hover:bg-red-600 mx-1 text-sm font-bold'><MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
