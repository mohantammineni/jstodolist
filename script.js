document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todoForm");
  const todoList = document.getElementById("todoList");

  loadTasks();

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskValue = document.getElementById("listname").value.trim();
    if (taskValue) {
      addTask(taskValue);
      document.getElementById("listname").value = "";
      saveTasks();
    }
  });

  function addTask(taskValue) {
    if (!taskValue) return;
    const listItem = createListItem(taskValue);
    todoList.appendChild(listItem);
  }

  function createListItem(taskValue, isCompleted = false) {
    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskValue;
    taskSpan.className = "task-text"; // Add a class for styling
    listItem.appendChild(taskSpan);

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "icons-container"; // Add a class for styling

    const completedIcon = document.createElement("i");
    completedIcon.className = isCompleted ? "fas fa-times" : "fas fa-check";
    completedIcon.style.marginLeft = "10px";
    completedIcon.onclick = function () {
      const currentCompletedState =
        taskSpan.style.textDecoration === "line-through";
      taskSpan.style.textDecoration = currentCompletedState
        ? "none"
        : "line-through";
      completedIcon.className = currentCompletedState
        ? "fas fa-check"
        : "fas fa-times";
      saveTasks();
    };
    listItem.appendChild(completedIcon);

    if (isCompleted) {
      taskSpan.style.textDecoration = "line-through";
    }

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.style.marginLeft = "10px";
    deleteIcon.onclick = function () {
      todoList.removeChild(listItem);
      saveTasks();
    };
    listItem.appendChild(deleteIcon);

    const updateIcon = document.createElement("i");
    updateIcon.className = "fas fa-edit";
    updateIcon.style.marginLeft = "10px";
    updateIcon.onclick = function () {
      const updatedValue = prompt("Update your task:", taskValue);
      if (updatedValue) {
        taskSpan.textContent = updatedValue;
        saveTasks();
      }
    };
    listItem.appendChild(updateIcon);

    return listItem;
  }

  function saveTasks() {
    const tasks = [];
    for (let i = 0; i < todoList.children.length; i++) {
      const taskText =
        todoList.children[i].getElementsByTagName("span")[0].textContent;
      const isCompleted =
        todoList.children[i].getElementsByTagName("span")[0].style
          .textDecoration === "line-through";
      tasks.push({ text: taskText, completed: isCompleted });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.forEach((task) => {
        const listItem = createListItem(task.text, task.completed);
        todoList.appendChild(listItem);
      });
    }
  }
});
