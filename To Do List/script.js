//Select DOM
const todoList = document.querySelector('.task-list');
const filterOption = document.querySelector('#filter');
const form = document.querySelector('.form');
const taskInput = document.querySelector('#newitem');

// Mark done
function markDone(element) {
    element.classList.toggle("done")
}
function removeTask(element) {
    element.classList.add("fall");
    element.addEventListener('transitionend', () => element.remove())
}
todoList.addEventListener('click', (e) => {
    const element = e.target;
    // console.log(element)
    if (element.classList.contains('btn-action-done')) {
        markDone(element.parentNode.parentNode);
    }
    else if (element.classList.contains('btn-action-delete')) {
        removeTask(element.parentNode.parentNode)
    }
})


// Filter tasks
function filterTasks(hideCompletedTasks){
    todoList.querySelectorAll("li").forEach((todoLi) =>{
        if (todoLi.classList.contains("done")){
            todoLi.style.display = hideCompletedTasks ? "none" : "flex";
        }
    })
}

filterOption.addEventListener('click', (e) => {
    filterTasks(e.target.checked)
})

// Add a new task
function addTask(taskLabel){
    const todoLi = document.createElement("li");
    todoLi.draggable = true;
    todoLi.className = "item";

    // Add dragging listeners
    todoLi.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => todoLi.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    todoLi.addEventListener("dragend", () => todoLi.classList.remove("dragging"));
    
    // Add label span
    const labelSpan = document.createElement("span");
    labelSpan.classList.add("label");
    labelSpan.textContent = taskLabel;
    todoLi.appendChild(labelSpan);

    // Add checkbox and delete
    const divActions = document.createElement("div");
    divActions.className = "actions";
    divActions.innerHTML = `<input type="checkbox" class="btn-action btn-action-done">
    <button class = "btn-action btn-action-delete"> x </button>`;
    todoLi.appendChild(divActions);

    todoList.appendChild(todoLi);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskLabel = taskInput.value.trim();
    if (taskLabel) {
        addTask(taskLabel);
        taskInput.value = "";
    }
})

//Dragable items
const sortableList = document.querySelector(".task-list");
const items = sortableList.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
}

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());