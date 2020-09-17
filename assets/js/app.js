
//purpose of all methods is to store the time timed in these timer props which are then used to add to time on tasks. e.g. timer.seconds = 56 
class Timer {
    constructor(){
      
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    initialiseTimer(){
        let secondsHtml = document.getElementById('seconds');
        let minutesHtml = document.getElementById('minutes');
        let hoursHtml = document.getElementById('hours');

        secondsHtml.innerHTML = `0${this.seconds}`;
        minutesHtml.innerHTML = `0${this.minutes}`;
        hoursHtml.innerHTML = `0${this.hours}`;
    } 
    timers(){
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let timerToPlay;

        var stopwatch;
        var countdown15;
        var countdown25;
        var playing = false;
        let pauseButton = document.querySelector('#pause');
        let playButton = document.querySelector('#play');
        let resetButton = document.querySelector('#reset');
        let startStopwatchButtonArray = document.querySelectorAll('.start-stopwatch');
        let saveButton = document.getElementById('save-time-to-task');
        let timerContainer = document.querySelector('.timer-container');

        let secondsHtml = document.getElementById('seconds');
        let minutesHtml = document.getElementById('minutes');
        let hoursHtml = document.getElementById('hours');

        function countUp(){

            seconds = seconds + 1;

            if(seconds >= 60){
                seconds = 0;
                minutes = minutes + 1;
            }

            if(minutes >= 60){
                minutes = 0;
                hours = hours + 1;
            }
            
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

        function countDown15Play(){

            seconds = 0;
            minutes = 15;
            hours = 0;

        countdown()

        function countdown(){
            countdown15 = setInterval(function(){ 
                countDown15(); 
                }, 1000);
                return playing = true;
            }

            function countDown15(){
                seconds = seconds - 1;

                if((seconds < 0) && (minutes >= 1)){
                    seconds = 59;
                    minutes = minutes - 1;
                } 

        
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

    }
            
        function stopWatchClickStart(){
                //Event listener on each task's stopwatch icon
                startStopwatchButtonArray.forEach(function(stopwatchButton){
                    stopwatchButton.addEventListener('click', function(event){

                        //if there are no timers playing then... automatically run StopWatchPlay
                        if ((!playing) && (seconds == 0) && (minutes == 0) && (hours==0) && (playButton.style.display == '')) {
                            
                            //show timer when stopwatch clicked.
                            timerContainer.style.display = 'flex'; 

                            // starts playing the stopwatch automatically.
                            stopWatchPlay();

                            //Finf the id of the task clicked on.
                            let id = event.target.parentElement.previousElementSibling.id;

                            //Find the task description and add is as a h2 description in the timer.
                            let description = event.target.parentElement.previousElementSibling.textContent;
                            //Select the area where the title will go
                            let timerTitle = document.querySelector('.timer-task-description');
                            //Give it an id to match the task's id.
                            timerTitle.id = id;
                            //give it a description to match task description.
                            timerTitle.textContent = description;

                            //create the timer title
                            let timerTypeTitle = document.createElement('h2');
                            timerTypeTitle.textContent = "Stopwatch";
                            timerTypeTitle.setAttribute('id', 'stopwatch-timer-title');
                            timerTypeTitle.setAttribute('class', 'timer-title');
                            timerTypeTitle.style.display = 'flex';
                            timerContainer.insertAdjacentElement('afterbegin', timerTypeTitle);

                        } else {
                            console.log("We cannot play the timer because one of these things is true: 1-playing==true 2-seconds, minutes or hours are not at 0 or the play button is visible.");
                        }             
                        pauseOnClick(stopwatch); 
                        resetStopwatch(stopwatch);
                        playOnClick();
                        timer.initialiseTimer();
                    });
                });
    }
            


                    //hide popover box when countdown15 button is clicked. 

                    // set an interval timer that decreases the numbers each second. 

                    //timer has to have the name of the task it was called on same as stopwatch.

                    // should be able to call the pause, reset & play methods on this. refactor if not. 

                    // when ready to save have to minus the amount from 15. E.g. if number left is 00:11:00 The time to save 
                    //would be 15-11 = 4minutes. (in Seconds.) 4*60 etc.. 
                    
                    //if timer gets to zero call on another function (still to write) that plays an alarm both sound and flashing lights. 

                    //a pop-up saying "you've finished your 15 minutes would you like to add that to your task time. "

                    //call on the save functions if yes. Or reset if no. 

    function countDown15ClickStart(){

                //when the button is clicked
                // const arrayOfCountdown15Icons = document.querySelectorAll('.countdown15-task-option');
                const ellipsisArray = document.querySelectorAll('.task-options');
                ellipsisArray.forEach(function(ellipsis){    
                    ellipsis.addEventListener('click', function(){
                        const countdown15Button = document.querySelector('.countdown15-task-option');
                        countdown15Button.addEventListener('click', function(event){
                            let seconds = 0;
                            let minutes = 15;
                            let hours = 0;

                            let secondsHtml = document.getElementById('seconds');
                            let minutesHtml = document.getElementById('minutes');
                            let hoursHtml = document.getElementById('hours');

                            secondsHtml.innerHTML = `0${seconds}`;
                            minutesHtml.innerHTML = `${minutes}`;
                            hoursHtml.innerHTML = `0${hours}`;
    
                            //Find the id of the task clicked on.
                            let parentDiv = event.target.closest('.task');
                            let taskToTargetId = parentDiv.children[2].id;
                            let taskToTargetDescription = parentDiv.children[2].textContent;
                            console.log(taskToTargetDescription);
                            console.log(taskToTargetId);
                        
                             //if there are no timers playing then... automatically run CountDown15
                            if ((!playing) && (seconds == 0) && (minutes == 15) && (hours==0) && (playButton.style.display == '')) {
                                //show timer when stopwatch clicked.
                                timerContainer.style.display = 'flex'; 

                                //Select the area where the title will go
                                let timerTitle = document.querySelector('.timer-task-description');
                                //Give it an id to match the task's id.
                                timerTitle.id = taskToTargetId;
                                //give it a description to match task description.
                                timerTitle.textContent = taskToTargetDescription;
                                // starts playing the countdown automatically.
                                countDown15Play()   
                            }
                })
            })
        })
    }
                          
    function stopWatchPlay(){
        stopwatch = setInterval(function(){ 
            countUp(); 
            }, 1000);
            return playing = true;
        }
    function countdown25Play(){
        countdown25 = setInterval(function(){ 
            countDown(); 
            }, 1000);
            return playing = true;
        }
    function playOnClick(){
        playButton.addEventListener('click', function(){ 
            let timerTitleDOM = document.querySelector('.timer-title');
            if(!playing){
                //if stopwatch is written in dom then timerToPlay = stopwatchPlay
                if (timerTitleDOM.textContent == 'Stopwatch'){
                    stopWatchPlay();
                    resetStopwatch(stopwatch);
                    pauseOnClick(stopwatch);
                } else if (timerTitleDOM.textContent == 'Countdown 15'){
                    countdown15Play();
                } else if (timerTitleDOM.textContent == 'Countdown 25'){
                    countdown25Play();
                }
                
                pauseButton.style.display = "inline-block";
                playButton.style.display = "none";
            }       
        });
    };
    function pauseOnClick(intervalToPause){
        pauseButton.addEventListener('click', function(){
            //stop interval timer counting.
            clearInterval(intervalToPause);   
            pauseButton.style.display = "none";
            playButton.style.display = "inline-block";
            return playing = false;  
        })
    }
    function resetStopwatch(intervalToReset,){
        resetButton.addEventListener('click', function(){
            clearInterval(intervalToReset);
            pauseButton.style.display = "none";
            playButton.style.display = "inline-block";
            resetTimes();
            return playing = false;
        })
    }
    function resetTimes(){
         let timerTitleDOM = document.querySelector('.timer-title');
        // let stopWatchTimerVisible = document.getElementById('stopwatch-timer-title');
        // let timer15Visible = document.getElementById('stopwatch-timer-title');
        // let timer25Visible = document.getElementById('stopwatch-timer-title');
        //could make this conditional i.e. if stopwatch function then reset to 0 - if countdown 15 then reset to 00:15:00 etc...
             if (timerTitleDOM.textContent == 'Stopwatch'){
                    seconds = 0;
                    minutes = 0;
                    hours = 0;

                    let secondsHtml = document.getElementById('seconds');
                    let minutesHtml = document.getElementById('minutes');
                    let hoursHtml = document.getElementById('hours');

                    secondsHtml.innerHTML = `0${seconds}`;
                    minutesHtml.innerHTML = `0${minutes}`;
                    hoursHtml.innerHTML = `0${hours}`;

                } else if (timerTitleDOM.textContent == 'Countdown 15'){
                    seconds = 0;
                    minutes = 15;
                    hours = 0;

                    let secondsHtml = document.getElementById('seconds');
                    let minutesHtml = document.getElementById('minutes');
                    let hoursHtml = document.getElementById('hours');

                    secondsHtml.innerHTML = `0${seconds}`;
                    minutesHtml.innerHTML = `${minutes}`;
                    hoursHtml.innerHTML = `0${hours}`;

                } else if (timerTitleDOM.textContent == 'Countdown 25'){
                    seconds = 0;
                    minutes = 25;
                    hours = 0;

                    let secondsHtml = document.getElementById('seconds');
                    let minutesHtml = document.getElementById('minutes');
                    let hoursHtml = document.getElementById('hours');

                    secondsHtml.innerHTML = `0${seconds}`;
                    minutesHtml.innerHTML = `${minutes}`;
                    hoursHtml.innerHTML = `0${hours}`;
                }       
        }      
    function saveTimeToTask(id){
        //get time to add from a timeSegment temp variable or object. 
        //take in minutes, hours and seconds and convert to seconds:
        let minutesInSeconds = minutes * 60;
        let hoursInSeconds = hours * 3600;
        let timeToAdd = seconds + minutesInSeconds + hoursInSeconds;

        //Find the task object with that taskId and add the timeToAdd to its timeFocusedOnTask prop.
        list.taskList[id].totalTimeFocusedOnTask += timeToAdd;
        list.taskList[id].totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(list.taskList[id].totalTimeFocusedOnTask);
        list.setDataToLocalStorage(); 
    }
    function saveTimeButton(){
        saveButton.addEventListener('click', function(){
            if (playing){
                clearInterval(stopwatch);
                pauseButton.style.display = "none";
                playButton.style.display = "inline-block";       
            }
            //alert asking if the user definitely want to add {seconds} to their total time on that task.
            let timerTitle = document.querySelector('.timer-task-description');
            
            if(confirm("Are you sure you want to save [time] to [task]?")){
                saveTimeToTask(timerTitle.id);
                //needs to update the time spent display on task list.
                let idForSavingTime = timerTitle.id;
                let taskTimeDisplay1 = document.querySelectorAll('.task-description'); //with the same id as the timertitle id.
                
                for (let i=0; i<taskTimeDisplay1.length; i++){
                    if(taskTimeDisplay1[i].id == idForSavingTime){
                        let timeDisplay = taskTimeDisplay1[i].parentElement.firstElementChild; 
                        timeDisplay.textContent = list.taskList[timerTitle.id].totalTimeFocusedOnTaskLongForm;
                        // timeDisplay.textContent = list.taskList[timerTitle.id].totalTimeFocusedOnTask;
                    }       
                }
                //hide timer completely.
                let timerTitleInDOM = document.querySelector('.timer-title');
                timerContainer.removeChild(timerTitleInDOM);
                timerContainer.style.display = "none";
                playButton.style.display = "";
                pauseButton.style.display = "inline-block";
                seconds = 0;
                minutes = 0;
                hours = 0;
                secondsHtml.innerHTML = `0${seconds}`
                minutesHtml.innerHTML = `0${minutes}`
                hoursHtml.innerHTML = `0${hours}`
                playing = false;
            } 
            return playing = false; 
        })
    }
        countDown15ClickStart()    
        stopWatchClickStart(); 
        saveTimeButton();
        playOnClick();
    }
    // Thank you to Wilson Lee on Stack Overflow for this code - attributed in README. 
    convertSecondsToTime(seconds){
        
        let hoursConverted = Math.floor(seconds / 3600);
        let minutesConverted = Math.floor(seconds % 3600 / 60);
        let secondsConverted = Math.floor(seconds % 3600 % 60);

        return `${hoursConverted}hrs ${minutesConverted}mins ${secondsConverted}secs`;
    }
    
    
}

// A Task Class that has all the properties and methods associated with a task

class Task {
    constructor(taskDescription){
        this.taskDescription = taskDescription; //obvz - the only essential prop to create a new task obj.
        this.id = null;
        this.completed = false; 
        this.order = -1; //order of priority in list - will use to structure list order
        this.totalTimeFocusedOnTask = 0; //running total of time focused on a specific task saved in seconds. 
        this.totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(this.totalTimeFocusedOnTask);
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
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox" checked>
                    <li class="task-description completed" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a><i class="fas fa-stopwatch start-stopwatch"></i></i></a>
                    <a class="task-sort" tabindex=0><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a class="task-options" aria-label="task-options-ellipsis" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

            } else if(taskList[i].completed === false) {
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTaskLongForm}</p>
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
                newTask.totalTimeFocusedOnTask = 0;
                list.taskList.push(newTask); //adds the new task into the taskList array.

                //adds the task to the list in html  
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${newTask.totalTimeFocusedOnTaskLongForm}</p>
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
                timer.timers();

            } else if ((newTaskInput === "") || (newTaskInput === null)){ //this doesn't fire with spaces - look into that. 
                alert("Please add a task."); 
            }
            
        })
    }

    editTask(){
        //need to listen for clicks on any of the edit buttons
        // const arrayOfEditIcons = document.querySelectorAll('.task-edit-icon');

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
                sticky: true,
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
timer.initialiseTimer();
timer.timers();
