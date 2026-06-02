import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import { TodoForms } from './components/Index';
import { Todoitems } from './components/Index';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
      setTodos((prev) => [{id: Date.now(),...todo},...prev])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => (todo.id !== id)))
  }

  const updateTodo = (id,todo) => {
      setTodos((prev) => prev.map (
        (prevTodo) => (prevTodo.id === id)? todo : prevTodo)
      ) 
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&display=swap');`}
      </style>

      {/* 1. Added relative positioning and overflow-hidden to contain the background */}
      <div className="relative min-h-screen bg-[#0f172a] py-8 overflow-hidden">
        
        {/* 2. Added Glowing Background Blobs for the glass to blur against */}
        <div className="absolute top-[-10%] left-[10%] w-96 h-96 bg-purple-600/50 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-indigo-600/50 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-full max-w-lg h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        {/* 3. Wrapped the main content in a relative z-10 to sit above the blobs */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-3 text-white">
            <h1 
                className="text-4xl font-extrabold text-center mb-10 mt-2 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
            >
                Manage Your Todos
            </h1>
            
            <div className="mb-6">
                 {/* todo form  */}
                 <TodoForms/>
            </div>
            
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo) => (
                  <div key={todo.id} className='w-full'>
                      <Todoitems todo={todo}/>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App