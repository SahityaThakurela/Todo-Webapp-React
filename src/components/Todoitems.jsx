import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
    const [isTodoEditable, setisTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setisTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex items-center border rounded-xl px-4 py-3 gap-x-4 shadow-xl backdrop-blur-lg transition-all duration-300 ${
                todo.completed 
                    ? "bg-black/40 border-white/5" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
        >
            {/* THIS IS THE ONLY CHECKBOX CODE NOW - The old one is gone! */}
            <label className="relative flex items-center cursor-pointer shrink-0">
                <input
                    type="checkbox"
                    className="peer hidden" 
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <div className="w-5 h-5 rounded border-2 border-white/30 peer-checked:bg-linear-to-br peer-checked:from-indigo-400 peer-checked:to-purple-500 peer-checked:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg">
                    {/* SVG Checkmark */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </label>

            {/* Todo Text Input */}
            <input
                type="text"
                className={`w-full bg-transparent outline-none text-base transition-all duration-200 rounded-md ${
                    isTodoEditable ? "border border-white/20 px-3 py-1.5 bg-black/40 focus:border-indigo-400" : "border-transparent"
                } ${todo.completed ? "line-through text-slate-400 opacity-60" : "text-slate-100"}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            
            {/* Edit / Save Button */}
            <button
                className="inline-flex w-9 h-9 rounded-lg text-sm border border-white/10 justify-center items-center bg-white/5 text-slate-300 hover:bg-white/20 hover:text-white transition-all duration-300 shrink-0 disabled:opacity-30 disabled:hover:bg-transparent"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setisTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
                title={isTodoEditable ? "Save" : "Edit"}
            >
                {isTodoEditable ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-cyan-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                )}
            </button>
            
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-9 h-9 rounded-lg text-sm border border-white/10 justify-center items-center bg-white/5 text-slate-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 transition-all duration-300 shrink-0"
                onClick={() => deleteTodo(todo.id)}
                title="Delete"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default TodoItem;

// import React, { useState } from 'react'
// import { useTodo } from '../contexts/TodoContext';

// function TodoItem({ todo }) {
//     const [isTodoEditable, setisTodoEditable] = useState(false)
//     const [todoMsg, setTodoMsg] = useState(todo.todo)
//     const { updateTodo, deleteTodo, toggleComplete } = useTodo()

//     const editTodo = () => {
//         updateTodo(todo.id, { ...todo, todo: todoMsg })
//         setisTodoEditable(false)
//     }

//     const toggleCompleted = () => {
//         toggleComplete(todo.id)
//     }

//     return (
//         <div
//             className={`flex items-center border rounded-xl px-4 py-3 gap-x-4 shadow-xl backdrop-blur-lg transition-all duration-300 ${
//                 todo.completed 
//                     ? "bg-black/20 border-white/5" 
//                     : "bg-white/5 border-white/10 hover:bg-white/10"
//             }`}
//         >

//             <label className="relative flex items-center cursor-pointer shrink-0">
//                 <input
//                     type="checkbox"
//                     className="peer hidden" 
//                     checked={todo.completed}
//                     onChange={toggleCompleted}
//                 />
//                 <div className="w-5 h-5 rounded border-2 border-white/30 peer-checked:bg-linear-to-br peer-checked:from-indigo-400 peer-checked:to-purple-500 peer-checked:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg">
//                     {/* SVG Checkmark */}
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                 </div>
//             </label>

//             <input
//                 type="checkbox"
//                 className="cursor-pointer w-5 h-5 accent-indigo-500 rounded"
//                 checked={todo.completed}
//                 onChange={toggleCompleted}
//             />
//             <input
//                 type="text"
//                 className={`w-full bg-transparent outline-none text-base transition-all duration-200 rounded-md ${
//                     isTodoEditable ? "border border-white/20 px-3 py-1.5 bg-black/40 focus:border-indigo-400" : "border-transparent"
//                 } ${todo.completed ? "line-through text-slate-500" : "text-slate-100"}`}
//                 value={todoMsg}
//                 onChange={(e) => setTodoMsg(e.target.value)}
//                 readOnly={!isTodoEditable}
//             />
            
//             {/* Edit / Save Button */}
//             <button
//                 className="inline-flex w-9 h-9 rounded-lg text-sm border border-white/10 justify-center items-center bg-white/5 text-slate-300 hover:bg-white/20 hover:text-white transition-all duration-300 shrink-0 disabled:opacity-30 disabled:hover:bg-transparent"
//                 onClick={() => {
//                     if (todo.completed) return;

//                     if (isTodoEditable) {
//                         editTodo();
//                     } else setisTodoEditable((prev) => !prev);
//                 }}
//                 disabled={todo.completed}
//                 title={isTodoEditable ? "Save" : "Edit"}
//             >
//                 {isTodoEditable ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-cyan-400">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                 ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
//                     </svg>
//                 )}
//             </button>
            
//             {/* Delete Todo Button */}
//             <button
//                 className="inline-flex w-9 h-9 rounded-lg text-sm border border-white/10 justify-center items-center bg-white/5 text-slate-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 transition-all duration-300 shrink-0"
//                 onClick={() => deleteTodo(todo.id)}
//                 title="Delete"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             </button>
//         </div>
//     );
// }

// export default TodoItem;