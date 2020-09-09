

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
        this.taskList = [];//this will be where there is a reference to localStorage eventually.
        this.completedTasks = [];
        this.buildTaskList(this.taskList); //the method of building the list up in HTML is automatic when a new list is instantiated which will be every time page is loaded.
        this.addNewTask(this.taskList, this.completedTasks);
        this.toggleTaskComplete(this.taskList, this.completedTasks);
    }

    //takes all the tasks store in taskList and adds them to HTML on page load.
    buildTaskList(arrayOfTaskObjectsToBuildListWith){
        let taskList = this.taskList;
        
        for (let i=0; i<taskList.length; i++){
            document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTask}</p>
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
                    <p class="total-task-time">${newTask.totalTimeFocusedOnTask}</p>
                    <input class="taskCheckbox" type="checkbox" id="${newTask.id}" name="task-${newTask.id}">
                    <li>${newTask.taskDescription}</li>
                    <i class="fas fa-trash-alt task-icon task-delete-icon"></i>
                    <a><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

                //clears the input value
                document.querySelector('#new-task-input').value = "";
                list.toggleTaskComplete(taskListToAddTasksTo); //checks for completion tasks when new tasks are added.
                list.deleteTask();

            } else if ((newTaskInput === "") || (newTaskInput === null)){ //this doesn't fire with spaces - look into that. 
                alert("Please add a task."); 
            }
            
        })
    }

    editTask(){
        //need to listen for clicks on any of the edit buttons
                //then target that specific task that the specific edit button refers to 

        //turn the task's <li> section into an input? with a save button. 
        // Maybe use this: MDN: The ChildNode.replaceWith() method replaces this ChildNode in the children list of its parent with a set of Node or DOMString objects. DOMString objects are inserted as equivalent Text nodes.

        //show the current task descrip. in the input as the value. 

        //save the new description over the old one. task.taskDescription = input.value

        //on save flip back to the <li> </li> html view. 
    }

    toggleTaskComplete(arrayOfTasks){
        //listen for checkbox clicks on specific task.
        const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');

        arrayOfCheckboxes.forEach(function(checkbox){  
            let checkboxTask = checkbox.nextElementSibling.textContent;
            checkbox.addEventListener('change', function(){ 
                if(checkbox.checked == true){
                    checkbox.nextElementSibling.classList.add('completed'); 

                    arrayOfTasks.forEach(function(task){
                        if (task.taskDescription === checkboxTask){
                            task.completed = true;
                            list.completedTasks.push(task);
                            console.log(list.completedTasks);
                        }
                    })
                        
                } else if (checkbox.checked == false){
                    checkbox.nextElementSibling.classList.remove('completed');
                     
                    arrayOfTasks.forEach(function(task){
                        if (task.taskDescription === checkboxTask){
                            task.completed = false;
                        }
                    })
                    list.completedTasks.splice(list.completedTasks.findIndex(task => task.taskDescription === checkboxTask), 1);//working
                            console.log(list.completedTasks); //works
                    }
                })
            })
        }

    deleteTask(){
        const arrayOfDeleteIcons = document.querySelectorAll('.task-delete-icon');
        //listen for clicks on any of the delete buttons.
        arrayOfDeleteIcons.forEach(function(deleteIcon){
            deleteIcon.addEventListener('click', function(event){
                let taskToDelete = event.target.parentNode;
                let taskToDeleteText = event.target.previousElementSibling.textContent;
                taskToDelete.remove();//remove from DOM

                //remove from taskList
                list.taskList.splice(list.taskList.findIndex(task => task.taskDescription === taskToDeleteText), 1);//working
                list.completedTasks.splice(list.completedTasks.findIndex(task => task.taskDescription === taskToDeleteText), 1); 
                    
                })
                
            })
        }
   }

        //redo and reorder the task arrays ids? 
 
let list = new List();
