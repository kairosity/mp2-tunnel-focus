

let timeSegment = 0;

// A Task Class that has all the properties and methods associated with a task

class Task {
    constructor(taskDescription){
        this.taskDescription = taskDescription; //obvz - the only essential prop to create a new task obj.
        this.id = null;
        this.completed = false; 
        this.order = -1; //order of priority in list - will use to structure list order
        this.totalTimeFocusedOnTask = null; //running total of time focused on a specific task
    }   
}

class List {
    constructor(){
        this.taskList = [
            {
                taskDescription: "Task numero uno",
                id: null,
                completed: false,
                order: -1,
                totalTimeFocusedOnTask: "20m43s"
            },
            {
                taskDescription: "Task numero duo",
                id: null,
                completed: false,
                order: -1,
                totalTimeFocusedOnTask: "4hr10m34s"
            },
            {
                taskDescription: "Task numero tres",
                id: null,
                completed: false,
                order: -1,
                totalTimeFocusedOnTask: "1hr20m04s"
            }
        ];
        this.completedTasks = [];
        this.buildTaskList(this.taskList) //the method of building a list is automatic when a new list is instantiated.
    }

    buildTaskList(arrayOfTaskObjectsToBuildListWith){
        let taskList = this.taskList;
        //takes the tasks stored and formats them into a list when window is loaded. 
        for (let i=0; i<taskList.length; i++){
            document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p>${taskList[i].totalTimeFocusedOnTask}</p>
                    <input class="taskCheckbox" type="checkbox" id="${taskList[i].id}" name="task-${taskList[i].id}">
                    <li>${taskList[i].taskDescription}</li>
                    <a><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;
        }
    }

    addNewTask(){
        document.getElementById('add-new-task').addEventListener('click', function(){
            console.log("clicked")
        })
    }
}

let list = new List();


//     if (!list){
//         let list = new List();
//         let taskDescription = document.querySelector('#new-task-input').value;
//         if (taskDescription) {
//             let newTask = new Task(taskDescription);
//             //add the new task to the array of task objects.
//             newTask.id = taskList.length;
//             taskList.push(newTask);
            
//             document.getElementById('list').innerHTML +=
//                 `<div class="task">
//                     <p>0h0m0s</p>
//                     <input class="taskCheckbox" type="checkbox" id="${newTask.id}" name="task-${newTask.id}">
//                     <li>${newTask.taskDescription}</li>
//                     <a><i class="fas fa-sort sort-tasks-icon"></i></a>
//                     <a><i class="fas fa-ellipsis-v task-options-icon"></i></a>
//                 </div>`;
//             document.querySelector('#new-task-input').value = "";
        

//             }
        
//     }

//     }
// })
