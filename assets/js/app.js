

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

    //takes all the tasks store in taskList and adds them to HTML on page load.
    buildTaskList(arrayOfTaskObjectsToBuildListWith){
        let taskList = this.taskList;
        
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

    /* listens for a click event on the add new task button and then adds the value of the input to both the taskList 
    AND it writes it to the HTML. As long as the value is not null or an empty string. It then clears the input box ready 
    for a new task.
    */
    addNewTask(taskListToAddTasksTo){
        const addNewTaskButton = document.querySelector('#add-new-task');

        addNewTaskButton.addEventListener('click', function(){ //event listener working. 
            const newTaskInput = document.querySelector('#new-task-input').value;
            console.log(newTaskInput); 
            if((newTaskInput !== null) && (newTaskInput !== "")){
                let newTask = new Task(newTaskInput); //creates a new Task obj. & sets its props.
                newTask.id = taskListToAddTasksTo.length;
                newTask.totalTimeFocusedOnTask = "00h00m00s";
                taskListToAddTasksTo.push(newTask); //adds the new task into the taskList array.

                //adds the task to the list in html
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p>${newTask.totalTimeFocusedOnTask}</p>
                    <input class="taskCheckbox" type="checkbox" id="${newTask.id}" name="task-${newTask.id}">
                    <li>${newTask.taskDescription}</li>
                    <a><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

                //clears the input value
                document.querySelector('#new-task-input').value = "";

            } else if ((newTaskInput === "") || (newTaskInput === null)){ //this doesn't fire with spaces - look into that. 
                alert("Please add a task."); 
            }
            
        })

        console.log(this); //this here refers to the List object. 
    }

    editTask(){
        //need to listen for clicks on any of the edit buttons

        //then target that specific task that the specific edit button refers to 

        //turn the task's <li> section into an input? with a save button. 

        //show the current task descrip. in the input as the value. 

        //save the new description over the old one. task.taskDescription = input.value

        //on save flip back to the <li> </li> html view. 
    }

    toggleTaskComplete(){
        //listen for checkbox clicks on specific task.

        //if not already checked: 
            //1 - mark it as checked
            //2 mark the task object as completed = true
            //3. Draw a line through the task in html (add class completed)
            //4. Add to array of completed tasks.

        //if already checked
            //1. unmark as checked. 
            //2. change the task obj to completed = false
            //3. Remove the line through task (remove class completed)
            //4. Remove from array of completed tasks.


    }

    deleteTask(){
        //listen for clicks on any of the delete buttons.

        //target specific task referred to by that delete button. 

        // remove the task from the taskList array

        //remove the <li> of the task </li> from the html. 

        //redo and reorder the task arrays ids? 
    }
}

let list = new List();
