import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        
        if (!todo) return

        addTodo({ todo, completed: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex shadow-2xl rounded-xl overflow-hidden mb-6 border border-white/10 bg-white/5 backdrop-blur-lg">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full bg-transparent text-slate-100 px-5 py-3 outline-none focus:bg-white/5 transition-colors duration-300 placeholder:text-slate-400"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-400 hover:to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] active:scale-95 transition-all duration-200 shrink-0 border-l border-white/10"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;