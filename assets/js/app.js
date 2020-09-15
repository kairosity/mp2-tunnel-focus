

class Timer {
    constructor(){
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }

    buildTimer(){
        //set an interval timer that runs a function every second. 
    
        let secondsHtml = document.getElementById('seconds');
        let minutesHtml = document.getElementById('minutes');
        let hoursHtml = document.getElementById('hours');

        secondsHtml.innerHTML = `0${this.seconds}`;
        minutesHtml.innerHTML = `0${this.minutes}`;
        hoursHtml.innerHTML = `0${this.hours}`;
    }

    stopwatch(){
        let seconds = 0;
        let minutes = 0;
        let hours = 0;

        var play;
        var playing = false;
        let pauseButton = document.querySelector('#pause');
        let playButton = document.querySelector('#play');

        let startStopwatchButtonArray = document.querySelectorAll('.start-stopwatch');

        function startStopwatch(){

            seconds = seconds + 1;

            if(seconds >= 60){
                seconds = 0;
                minutes = minutes + 1;
            }

            if(minutes >= 60){
                minutes = 0;
                hours = hours + 1;
            }
            //should I add an end point to hours?


            let secondsHtml = document.getElementById('seconds');
            let minutesHtml = document.getElementById('minutes');
            let hoursHtml = document.getElementById('hours');
            

            //Formatting the timer correctly. 
            if(seconds <= 9){
                secondsHtml.innerHTML = `0${seconds}`;
            } else {
                secondsHtml.innerHTML = seconds;
            }

            if(minutes <= 9){
                minutesHtml.innerHTML = `0${minutes}`;
            } else {
                minutesHtml.innerHTML = minutes;
            }

             if(hours <= 9){
                hoursHtml.innerHTML = `0${hours}`;
            } else {
                hoursHtml.innerHTML = hours;
            }
        }
        
        function stopWatchMethods(){
        //Event listener on each task's stopwatch icon - have to initialise 'play' because clearInterval needs a variable.
                startStopwatchButtonArray.forEach(function(stopwatchButton){
                    stopwatchButton.addEventListener('click', function(){
                        console.log("stopwatch button clicked");

                        //timer display appears - displaying only pause button as the timer is playing. 

                        

                        //timer-controls parent div
                        let timerControls = document.querySelector('.timer-controls');

                        //if the stopwatch isn't already playing then... automatically run StopWatchPlay
                        if (!playing){
                            stopWatchPlay();
                        }
                        
                        stopWatchPause();

                });
                });

        //function to update seconds, minutes & hours every second. is called immediately when stopwatch is clicked.
        function stopWatchPlay(){
            playing = true;
            //calls startStopwatch every second.
            play = setInterval(function(){ 
                startStopwatch(); 
                }, 1000);
        }

        //called immediately but waits to hear a click on pause button.
        function stopWatchPause(){

            pauseButton.addEventListener('click', function(){
                playing = false;
                //stop interval timer counting.
                clearInterval(play);   
                //pause button removed and play button replaces it. 
                pauseButton.style.display = "none";
                playButton.style.display = "inline-block";
                
            })
        }
        playButton.addEventListener('click', function(){
            playing = true;
            play = setInterval(function(){ 
                startStopwatch(); 
                }, 1000);
            pauseButton.style.display = "inline-block";
            playButton.style.display = "none";
        });

    }
        

        // resetStopwatch(){
        //     //reset function goes here. 


        // }

        // saveStopwatchTimeToTask(){
        //     //user will be prompted and asked whether they want to save the time to the associated task. 
        //     //This allows them to make errors or forget that the timer was running. 
        // }
        stopWatchMethods();

    }   
}

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
        this.taskList = JSON.parse(window.localStorage.getItem("taskList")) || [] ;//this will be where there is a reference to localStorage eventually.
        this.buildTaskList(this.taskList); //the method of building the list up in HTML is automatic when a new list is instantiated which will be every time page is loaded.
        this.addNewTask();
        this.toggleTaskComplete(this.taskList);    
    }

    //takes all the tasks stored in taskList and adds them to HTML on page load.
    buildTaskList(){
        let taskList = this.taskList;
        
        for (let i=0; i<taskList.length; i++){
            if (taskList[i].completed === true){
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTask}</p>
                    <input class="taskCheckbox" type="checkbox" checked>
                    <li class="task-description completed" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a><i class="fas fa-stopwatch start-stopwatch"></i></i></a>
                    <a class="task-sort" tabindex=0><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a class="task-options" aria-label="task-options-ellipsis" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

            } else if(taskList[i].completed === false) {
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTask}</p>
                    <input class="taskCheckbox" type="checkbox">
                    <li class="task-description" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a><i class="fas fa-stopwatch start-stopwatch"></i></i></a>
                    <a class="task-sort" tabindex=0><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a class="task-options" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;
            }
        }
        this.toggleTaskComplete();
    }


    /* listens for a click event on the add new task button and then adds the value of the input to both the taskList 
    AND it writes it to the HTML. As long as the value is not null or an empty string. It then clears the input box ready 
    for a new task.
    */
    addNewTask(){
        const addNewTaskButton = document.querySelector('#add-new-task');

        addNewTaskButton.addEventListener('click', function(){ //event listener working. 
        
            const newTaskInput = document.querySelector('#new-task-input').value;
            
            if((newTaskInput !== null) && (newTaskInput !== "")){
                let newTask = new Task(newTaskInput); //creates a new Task obj. & sets its props.
                newTask.id = list.taskList.length; //it will always be 1to1.
                newTask.totalTimeFocusedOnTask = "00h00m00s";
                list.taskList.push(newTask); //adds the new task into the taskList array.

                //adds the task to the list in html  
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${newTask.totalTimeFocusedOnTask}</p>
                    <input class="taskCheckbox" type="checkbox">
                    <li class="task-description" id="${newTask.id}">${newTask.taskDescription}</li>
                    <a><i class="fas fa-stopwatch start-stopwatch"></i></i></a>
                    <a class="task-sort" tabindex=0><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a class="task-options" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

                //clears the input value
                document.querySelector('#new-task-input').value = "";

                //calls these functions so they are operational on the new task.
                list.toggleTaskComplete(list.taskList); //checks for completion tasks when new tasks are added.
                list.deleteTask();
                list.editTask();
                list.setDataToLocalStorage();
                list.dynamicPopoverNav();
                timer.stopwatch();

            } else if ((newTaskInput === "") || (newTaskInput === null)){ //this doesn't fire with spaces - look into that. 
                alert("Please add a task."); 
            }
            
        })
    }

    editTask(){
        //need to listen for clicks on any of the edit buttons
        const arrayOfEditIcons = document.querySelectorAll('.task-edit-icon');

        const ellipsisArray = document.querySelectorAll('.task-options');

        ellipsisArray.forEach(function(ellipsis){    
            ellipsis.addEventListener('click', function(){

                const editTaskButton = document.querySelector('.edit-task-option');
                editTaskButton.addEventListener('click', function(event){

                    let parentDiv = event.target.closest('.task');
                    let liToReplace = parentDiv.children[2];
                    let textToEdit = parentDiv.children[2].textContent;
                    console.log(liToReplace);

                    if (!document.querySelector('.save-button')){  //stops the situation whereby a user can open 2 or more input edit boxes.
                    
                        const newInput = document.createElement("INPUT");
                        newInput.setAttribute("type", "text")
                        newInput.setAttribute("value", `${textToEdit}`);
                        newInput.setAttribute("class", "editedTask")
                        liToReplace.parentNode.replaceChild(newInput, liToReplace);//works

                        const saveButton = document.createElement('BUTTON');
                        saveButton.setAttribute("class", "save-button");
                        saveButton.setAttribute("type", "submit");
                        saveButton.textContent = "Save Changes";
                        newInput.after(saveButton);
                     }

                const saveButton = document.querySelector('.save-button');
                const inputBox = document.querySelector('.editedTask')
                
                saveButton.addEventListener('click', function(){
                    //create a new list element to put the edited task into
                    const newLi = document.createElement('LI');
                    newLi.setAttribute("class", "task-description");
                    newLi.setAttribute("id", `${liToReplace.id}` ); //because it's still available in memory.
                    newLi.textContent = inputBox.value; //set the value of the li to the edited task value.
                    inputBox.parentNode.replaceChild(newLi, inputBox); //confusing AF but basically replace the input box with the Li in the most awkward way possible. 
                    
                    //remove the save button
                    saveButton.remove();

                    list.taskList.forEach(task => {
                        if(task.id == newLi.id){
                            task.taskDescription = newLi.textContent;
                        }
                        if((task.id == newLi.id) && (task.completed == true)){
                            newLi.classList.add('completed');
                        }
                    })
                  list.setDataToLocalStorage()
            })
        })
    })
})
}

    toggleTaskComplete(){
        //listen for checkbox clicks on specific task.
        const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');

        arrayOfCheckboxes.forEach(function(checkbox){  
            
            let checkboxId = checkbox.nextElementSibling.id; //.id
            checkbox.addEventListener('change', function(){ 
                if(checkbox.checked == true){
                    checkbox.nextElementSibling.classList.add('completed');
                    checkbox.setAttribute("checked", true); 
                        
                    list.taskList.forEach(function(task){
                        if (task.id == checkboxId){ 
                            task.completed = true;
                        }
                    })
                        
                } else if (checkbox.checked == false){
                    checkbox.nextElementSibling.classList.remove('completed'); //I think this is causing the issue? 
                     
                    list.taskList.forEach(function(task){
                        if (task.id == checkboxId){
                            task.completed = false;
                        }
                    })
                    }
                    list.setDataToLocalStorage()
                })       
            })
            
        }

    deleteTask(){
        const ellipsisArray = document.querySelectorAll('.task-options');

        ellipsisArray.forEach(function(ellipsis){
                
            ellipsis.addEventListener('click', function(){
                const deleteTask = document.querySelector('.delete-task-option');
                deleteTask.addEventListener('click', function(event){
                    
                    let taskToDelete = event.target.closest('.task');
                    let taskToDeleteId = taskToDelete.children[2].id;

                    //Removes the task from the DOM
                    taskToDelete.remove();

                    //Removes the Task from the taskList array.
                    list.taskList.splice(list.taskList.findIndex(task => task.id == taskToDeleteId), 1);

                    //resets the Task object ids to run from 0 upwards.
                    let tList = list.taskList;
                    for (let i=0; i<tList.length; i++){
                        tList[i].id = i;
                    }
                    let arrOfDomTasks = document.querySelectorAll('.task-description');
                    for (let i=0; i<arrOfDomTasks.length; i++){
                        arrOfDomTasks[i].id = i.toString();
                    }

                    list.setDataToLocalStorage();
                })  
            })     
        })
    }
        dynamicPopoverNav(){
            // const ellipsisArray = document.querySelectorAll('.task-options');
            const popover = document.getElementById('popover');

            tippy('.task-options', {
                allowHTML: true, 
                content: popover.innerHTML,
                aria: {
                    content: 'auto',
                    expanded: 'auto'
                },
                hideOnClick: true,
                interactive: true,
                placement: 'auto',
                trigger: 'click focus',
                theme: 'blueish',
            });
            
        }
       
        setDataToLocalStorage(){
            window.localStorage.setItem("taskList", JSON.stringify(list.taskList));
        }
    
   }
 

let list = new List();
let timer = new Timer();
//call these functions so they are operational on the list that is built from local storage.
list.deleteTask();
list.editTask();
list.dynamicPopoverNav();
timer.buildTimer();
timer.stopwatch();
