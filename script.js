const form = document.getElementById("task-form");
const title =document.getElementById("task-title");
const priority=document.getElementById("task-priority");
const list=document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks"))||[];

form.addEventListener("submit", function(event){
	event.preventDefault();
	const taskText = title.value.trim();
	const taskLevel = priority.value;
	
	const newTask = {
		
		id: Date.now(),
		title: taskText,
		priority: taskLevel,
		completed:false,	
		};
	
	tasks.push(newTask);
	saveTasks();
	displayTasks();
	console.log(tasks);	
	form.reset();
	});

function displayTasks(){
	list.innerHTML = "";
	
	tasks.forEach (function(task){
		const taskItem = document.createElement ("div");
		
		taskItem.classList.add("task");
		taskItem.classList.add(task.priority + "-priority");
		
		if (task.completed) {
		taskItem.classList.add("completed");
		}
		
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "delete";
		deleteButton.addEventListener("click", function (){
		tasks = tasks.filter (function(item) {
			return item.id !== task.id;
		});
		saveTasks();
		displayTasks();
		});
		
		taskItem.innerHTML = `
		<div>
		
		<p> ${task.title} </p>
		</div> `;
		
		const completeButton=document.createElement("button");
		completeButton.textContent = "Complete";
		completeButton.addEventListener("click", function (){
		task.completed = !task.completed;
		saveTasks();
		displayTasks();
		});
		
		const actions = document.createElement("div");
		actions.classList.add("actions");
		
		actions.appendChild(completeButton);
		actions.appendChild(deleteButton);
		
		taskItem.appendChild(actions);
		
		list.appendChild(taskItem);
	});	
}
function saveTasks(){
	localStorage.setItem ("tasks", JSON.stringify(tasks));
}
displayTasks();