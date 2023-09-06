import React from "react";

function AddTaskForm({handleSubmit, newTask, handleInputChange}){
    return (
        <form onSubmit={handleSubmit} className="form">
        <label htmlFor="newitem">Add New Task</label>
        <input
          type="text"
          id="newitem"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="submit">Add</button>
      </form>
    );
}
export default AddTaskForm;