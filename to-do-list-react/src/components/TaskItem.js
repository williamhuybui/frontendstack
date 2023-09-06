import React from 'react'

function TaskItem({task, setTaskStatus, removeTask}){
    return (<div> 
             <li draggable="true" className= {task.status ? "done" : ""} key = {task.id}>
             <span className="label">{task.title}</span>
             <div className="actions">
                 <input type="checkbox" className="btn-action btn-action-done" checked = {task.status} onChange = {(e)=> setTaskStatus(task.id, e.target.checked)}/>
                 <button onClick = {()=> removeTask(task.id)}className = "btn-action btn-action-delete"> x </button>
             </div>
         </li>
    </div>)
}
export default TaskItem;