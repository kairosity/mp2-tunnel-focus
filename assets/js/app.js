

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
        this.taskList = [ //this will be where there is a reference to localStorage eventually.
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
            },
            {
                taskDescription: "Task numero quatro",
                id: null,
                completed: false,
                order: -1,
                totalTimeFocusedOnTask: "6hr24m04s"
            }
        ];
        this.completedTasks = [];
        this.buildTaskList(this.taskList); //the method of building the list up in HTML is automatic when a new list is instantiated which will be every time page is loaded.
        this.addNewTask(this.taskList);
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

    //need a way of taking the input value and connecting that to the taskDescription param. 
    addNewTask(taskListToAddTasksTo){

        const addNewTaskButton = document.querySelector('#add-new-task');

        addNewTaskButton.addEventListener('click', function(){ //event listener working. 
            const newTaskInput = document.querySelector('#new-task-input').value;
            console.log(newTaskInput); 
            if((newTaskInput !== null) && (newTaskInput !== "")){
                let newTask = new Task(newTaskInput);
                newTask.id = taskListToAddTasksTo.length;
                newTask.totalTimeFocusedOnTask = "00h00m00s";
                taskListToAddTasksTo.push(newTask); //this works - it pushes the new task into the taskList array.

                //add task to list in html
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p>${newTask.totalTimeFocusedOnTask}</p>
                    <input class="taskCheckbox" type="checkbox" id="${newTask.id}" name="task-${newTask.id}">
                    <li>${newTask.taskDescription}</li>
                    <a><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

                //clear input value
                document.querySelector('#new-task-input').value = "";

            } else if ((newTaskInput === "") || (newTaskInput === null)){ //this doesn't fire with spaces - look into that. 
                console.log("You need to write something"); //working now.
            }
            
        })

        console.log(this); //this here refers to the List object. 
    }
}

let list = new List();


//     if (!list){
//         let list = new List();
//         let taskDescription = document.querySelector('#new-task-input').value;
//         if (taskDescription) {
//             let newTask = new Task(taskDescription);
//             //add the new task to the array of task objects.
//             
//             taskList.push(newTask);
            
//             document.getElementById('list').innerHTML +=
//                 `<div class="task">
//                     <p>0h0m0s</p>
//                     <input class="taskCheckbox" type="checkbox" id="${newTask.id}" name="task-${newTask.id}">
//                     <li>${newTask.taskDescription}</li>
//                     <a><i class="fas fa-sort sort-tasks-icon"></i></a>
//                     <a><i class="fas fa-ellipsis-v task-options-icon"></i></a>
//                 </div>`;
//             
        

//             }
        
//     }

//     }
// })
