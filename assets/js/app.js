 
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

        // --------------------------------------GLOBAL TIMER VARIABLES-------------------------------//

        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        // let timerToPlay;

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
        let timerTitle = document.querySelector('.timer-task-description');
        
        const alarm = document.createElement('AUDIO');
        alarm.setAttribute('src', 'assets/audio/alarm1.mp3');
        let alarmButton = document.querySelector('.alarm');

        let secondsHtml = document.getElementById('seconds');
        let minutesHtml = document.getElementById('minutes');
        let hoursHtml = document.getElementById('hours');

    // --------------------------------------HELPER FUNCTIONS-------------------------------//

    function removeTimerFromDom(){
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
    function hideStopwatchButtons(){
        startStopwatchButtonArray.forEach(function(stopwatchButton){
            stopwatchButton.style.visibility = "hidden";
        })
    }

    function showStopwatchButtons(){
         startStopwatchButtonArray.forEach(function(stopwatchButton){
            stopwatchButton.style.visibility = "visible";
        })
    }

    function createTimerTitle(timerType, timerId){
        let timerTypeTitle = document.createElement('h2');
        timerTypeTitle.textContent = `${timerType}`; 
        timerTypeTitle.setAttribute('id', `${timerId}`);
        timerTypeTitle.setAttribute('class', 'timer-title');
        timerTypeTitle.style.display = 'flex';
        timerContainer.insertAdjacentElement('afterbegin', timerTypeTitle);
    }

    function formatTime(seconds, minutes, hours){   
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
    function resetCountdownHtml(seconds, minutes, hours){
        secondsHtml.innerHTML = `0${seconds}`;
        minutesHtml.innerHTML = `${minutes}`;
        hoursHtml.innerHTML = `0${hours}`;
    }

    // --------------------------------------TIMING FUNCTIONS-------------------------------//

    // Stopwatch countup
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
            formatTime(seconds, minutes, hours);
        }
        function stopWatchPlay(){
        stopwatch = setInterval(function(){ 
            countUp(); 
            }, 1000);
            return playing = true;
        }
//Countdown 15 Play
        function countDown15Play(){

            seconds = 0;
            minutes = 15;
            hours = 0;

            countdown();
        }
        function countdown(){
            countdown15 = setInterval(function(){ 
                countDownFunction(); 
                }, 1000);
                return playing = true;
            }
        function countDownFunction(){
            seconds = seconds - 1;

            if((seconds < 0) && (minutes >= 1)){
                seconds = 59;
                minutes = minutes - 1;
            } 
            if((seconds<0) && (minutes==0)){
                if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`){
                alarm.muted == true;
                countdownEnded();
            } else {
                alarm.play()
                countdownEnded();
            }
                
                
            }
            //stops a bug that kept printing seconds as 900
            if (seconds < 61) {
                
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
        //Countdown 25 Play
        function countDown25Play(){

            seconds = 0;
            minutes = 25;
            hours = 0;

            countdown25SetInterval();
        }
        function countdown25SetInterval(){
            countdown25 = setInterval(function(){ 
                countDownFunction(); 
                }, 1000);
                return playing = true;
            }

// --------------------------------------STRUCTURAL FUNCTIONS-------------------------------// 

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

                        //Find the id of the task clicked on.
                        let id = event.target.parentElement.previousElementSibling.id;

                        //Find the task description and add it as a h2 in the timer.
                        let description = event.target.parentElement.previousElementSibling.textContent;
                        
                        //Select the area where the title will go
                        let timerTitle = document.querySelector('.timer-task-description');
                        //Give it an id to match the task's id.
                        timerTitle.id = id;
                        //give it a description to match task description.
                        timerTitle.textContent = description;

                        let timerContainerTitle = "Stopwatch";
                        let timerId = "stopwatch-timer-title";
                        createTimerTitle(timerContainerTitle, timerId);

                        hideStopwatchButtons();

                    } else {
                        startStopwatchButtonArray.forEach(function(stopwatchButton){
                                event.preventDefault();
                        })
                        console.log("We cannot play the timer because one of these things is true: 1-playing==true 2-seconds, minutes or hours are not at 0 or the play button is visible.");
                    }             
                    pauseOnClick(stopwatch); 
                    resetTime(stopwatch);
                    playOnClick();
                    closeTimer();
                    timer.initialiseTimer();
                });
            });
        } 
    function countDown15ClickStart(){
        const ellipsisArray = document.querySelectorAll('.task-options');
        ellipsisArray.forEach(function(ellipsis){  

            ellipsis.addEventListener('click', function(){
                const countdown15Button = document.querySelector('.countdown15-task-option');
                countdown15Button.addEventListener('click', function(event){

                    hideStopwatchButtons();

                    let seconds = 0;
                    let minutes = 15;
                    let hours = 0;

                    secondsHtml.innerHTML = `0${seconds}`;
                    minutesHtml.innerHTML = `${minutes}`;
                    hoursHtml.innerHTML = `0${hours}`;

                    //Find the id of the task clicked on.
                    let parentDiv = event.target.closest('.task');
                    let taskToTargetId = parentDiv.children[2].id;
                    let taskToTargetDescription = parentDiv.children[2].textContent;
                
                        //if there are no timers playing then... automatically run CountDown15
                    if ((!playing) && (seconds == 0) && (minutes == 15) && (hours==0) && (playButton.style.display == '')) {
                        //show timer when stopwatch clicked.
                        timerContainer.style.display = 'flex'; 
                        
                        let timerContainerTitle = "Countdown 15";
                        let timerId = "countdown15-timer-title";
                        createTimerTitle(timerContainerTitle, timerId)
                        
                        //Select the area where the title will go
                        let timerTitle = document.querySelector('.timer-task-description');
                        //Give it an id to match the task's id.
                        timerTitle.id = taskToTargetId;
                        //give it a description to match task description.
                        timerTitle.textContent = taskToTargetDescription;

                        countDown15Play()
                        pauseOnClick(countdown15); 
                        resetTime(countdown15);  
                    }
                closeTimer();
                })
            })
        })
    } 
    function countDown25ClickStart(){
        const ellipsisArray = document.querySelectorAll('.task-options');
        ellipsisArray.forEach(function(ellipsis){  

            ellipsis.addEventListener('click', function(){
                const countdown15Button = document.querySelector('.countdown25-task-option');
                
                countdown15Button.addEventListener('click', function(event){
                    
                    hideStopwatchButtons();

                    let seconds = 0;
                    let minutes = 25;
                    let hours = 0;

                    secondsHtml.innerHTML = `0${seconds}`;
                    minutesHtml.innerHTML = `${minutes}`;
                    hoursHtml.innerHTML = `0${hours}`;

                    //Find the id of the task clicked on.
                    let parentDiv = event.target.closest('.task');
                    let taskToTargetId = parentDiv.children[2].id;
                    let taskToTargetDescription = parentDiv.children[2].textContent;
                
                        //if there are no timers playing then... automatically run CountDown25
                    if ((!playing) && (seconds == 0) && (minutes == 25) && (hours==0) && (playButton.style.display == '')) {
                        //show timer when stopwatch clicked.
                        timerContainer.style.display = 'flex'; 
                        
                        let timerContainerTitle = "Countdown 25";
                        let timerId = "countdown25-timer-title";
                        createTimerTitle(timerContainerTitle, timerId)
                        
                        //Select the area where the title will go
                        let timerTitle = document.querySelector('.timer-task-description');
                        //Give it an id to match the task's id.
                        timerTitle.id = taskToTargetId;
                        //give it a description to match task description.
                        timerTitle.textContent = taskToTargetDescription;

                        // starts playing the countdown automatically.
                        countDown25Play()
                        pauseOnClick(countdown25); 
                        resetTime(countdown25);  
                    }
                closeTimer();
                })
            })
        })
    }                                               
    function playOnClick(){
        playButton.addEventListener('click', function(){ 
            let timerTitleDOM = document.querySelector('.timer-title');
            if(!playing){
                
                if (timerTitleDOM.textContent == 'Stopwatch'){
                    stopWatchPlay();
                    resetTime(stopwatch);
                    pauseOnClick(stopwatch);
                } else if (timerTitleDOM.textContent == 'Countdown 15'){ //bug keeps starting from beginning again. - resets when in countdown15play.
                    countdown();
                    pauseOnClick(countdown15);
                    resetTime(countdown15);
                } else if (timerTitleDOM.textContent == 'Countdown 25'){
                    countdown25SetInterval();
                    pauseOnClick(countdown25);
                    resetTime(countdown25);
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
    function resetTime(intervalToReset,){
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
            if (timerTitleDOM.textContent == 'Stopwatch'){
                seconds = 0;
                minutes = 0;
                hours = 0;

                secondsHtml.innerHTML = `0${seconds}`;
                minutesHtml.innerHTML = `0${minutes}`;
                hoursHtml.innerHTML = `0${hours}`;

            } else if (timerTitleDOM.textContent == 'Countdown 15'){
                seconds = 0;
                minutes = 15;
                hours = 0;
                resetCountdownHtml(seconds, minutes, hours);

            } else if (timerTitleDOM.textContent == 'Countdown 25'){
                seconds = 0;
                minutes = 25;
                hours = 0;
                resetCountdownHtml(seconds, minutes, hours);
            }       
    }      
    function countdownEnded(){ 
        playing = false;  
        //!FIX: change this to a well styled modal.
        if(confirm("Do you want to save this time to this task?")){

                //calls save time function which will save seconds and long form time on the associated task object.
                saveTimeToTask(timerTitle.id, seconds);
                 
                removeTimerFromDom(); //test this when get chance.

                //Updates the time worked display for the task on the task list.
                //task id is...
                let idForSavingTime = timerTitle.id;
                //shows all the tasks in the list.
                let taskTimeDisplay1 = document.querySelectorAll('.task-description'); 
               
                //for each task in list, if the the task id is the same as the task id in the timer then 
                // select the task's timedisplay element (where the total task time is displayed)
                // and change it to the task object's long form task time property which has been updated by the saveTimeToTask() function.
                for (let i=0; i<taskTimeDisplay1.length; i++){
                    if(taskTimeDisplay1[i].id == idForSavingTime){
                        let timeDisplay = taskTimeDisplay1[i].parentElement.firstElementChild; 
                        timeDisplay.textContent = list.taskList[timerTitle.id].totalTimeFocusedOnTaskLongForm;
                    }       
                }
                playing = false;
                seconds = 0;
                minutes = 0;
                hours = 0;
         } else {
             console.log('do something here');
         }
         
    }
     function closeTimer(){
            let xButton = document.querySelector('.close-timer-x');
            
            xButton.addEventListener('click', function(){

                //if user clicks X in the middle of timer playing then I need to pause it first
                let intervalToPause;
                let typeOfTimer = document.querySelector('.timer-title').textContent;

                if(typeOfTimer == "Stopwatch"){
                    intervalToPause = stopwatch;
                } else if (typeOfTimer == "Countdown 15"){
                    intervalToPause = countdown15;
                } else if (typeOfTimer == "Countdown 25"){
                    intervalToPause = countdown25;
                }
                if (playing){
                    clearInterval(intervalToPause);
                }     
                removeTimerFromDom()
                showStopwatchButtons()          
        })       
    }
    function saveTimeButton(){
        saveButton.addEventListener('click', function(){
            let typeOfTimer = document.querySelector('.timer-title');
            if (playing){
                pauseButton.style.display = "none";
                playButton.style.display = "inline-block";
            }
            if (typeOfTimer.textContent == "Stopwatch"){
                clearInterval(stopwatch);            
            } else if (typeOfTimer.textContent == "Countdown 15"){
                clearInterval(countdown15);
            } else if (typeOfTimer.textContent == "Countdown 25"){
                clearInterval(countdown25);
            }
             
            //alert asking if the user definitely want to add {seconds} to their total time on that task.
            let timerTitle = document.querySelector('.timer-task-description');
            
            if(confirm("Do you want to save this time to this task?")){
                saveTimeToTask(timerTitle.id, seconds);
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

                //show all the stopwatch buttons
                startStopwatchButtonArray.forEach(function(stopwatchButton){
                    stopwatchButton.style.visibility = "visible";
                })

                removeTimerFromDom();
            } 
            return playing = false; 
        })
    }
    function saveTimeToTask(id, seconds){

        //select the timer titles to use to determine which timer is being played.
            var minutesInSeconds;
            
             let typeOfTimer = document.querySelector('.timer-title');
                //for countdown 15 timer
                if (typeOfTimer.textContent == "Countdown 15") {
                    minutesInSeconds = minutes * 60
                    
                    //!FIX - whereby seconds was returning 901 & 1501
                    if ( (seconds == -1) && (minutesInSeconds == 0) ){
                       var timeToAdd = 900
                    } else {
                       var timeToAdd = 900 - (minutesInSeconds + seconds);
                    }
                    clearInterval(countdown15); //necessary??

                } else if (typeOfTimer.textContent == "Countdown 25"){
                    minutesInSeconds = minutes * 60

                    if ( (seconds == -1) && (minutesInSeconds == 0) ){
                        var timeToAdd = 1500
                    } else {
                        var timeToAdd = 1500 - (minutesInSeconds + seconds);
                    }
                    clearInterval(countdown25); //necessary??
                } else if (typeOfTimer.textContent == "Stopwatch"){
                    minutesInSeconds = minutes * 60;
                    let hoursInSeconds = hours * 3600;
                    var timeToAdd = seconds + minutesInSeconds + hoursInSeconds;
                }
                seconds = timeToAdd;
        
        //Find the task object with that taskId and add the timeToAdd to its timeFocusedOnTask prop.
        list.taskList[id].totalTimeFocusedOnTask += timeToAdd;
        list.taskList[id].totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(list.taskList[id].totalTimeFocusedOnTask);
        list.setDataToLocalStorage(); 
    }
    function alarmToggle(){
        let alarmButton = document.querySelector('.alarm');

        //on click if alarm button has the id #alarm-off then turn it on, else turn it off. and switch icons. 

        alarmButton.addEventListener('click', function(){
            if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`){
                alarmButton.innerHTML = `<i class="fas fa-bell-slash" aria-hidden="true"></i>`;
            } else {
                alarmButton.innerHTML = `<i class="fas fa-bell" aria-hidden="true"></i>`;
            }
        })

    }

    function manualTaskTimeEdit(){
        //1 Event Listener for clicks on edit time button in popover.
        const ellipsisArray = document.querySelectorAll('.task-options');
        ellipsisArray.forEach(function(ellipsis){  

            ellipsis.addEventListener('click', function(){
                const manuallyEditTimeButton = document.querySelector('.edit-task-time-task-option');
                
                manuallyEditTimeButton.addEventListener('click', function(event){
                    
                //2. select associated task
                    //Find the id of the task clicked on.
                    let parentDiv = event.target.closest('.task');
                    parentDiv.classList.add('edit-time-task');
                    let taskToTargetId = parentDiv.children[2].id;
                    let pElementToTarget = parentDiv.firstElementChild;
                    let timeToEdit = pElementToTarget.textContent.split(" ");
                    let timeArray = []

                    

                    
                    //transform each of the string time numbers into numbers.
                    timeToEdit.forEach(function(item){
                        if (item.length>4){
                            timeArray.push(parseInt(item.slice(0,2)));
                        } else {
                            timeArray.push(parseInt(item.slice(0,1)));
                        }
                    });
                    console.log(timeArray);
                    let hoursToEdit = timeArray[0];
                    let minutesToEdit = timeArray[1];
                    let secondsToEdit = timeArray[2];

                    if (!document.querySelector('.edit-time-save-button')){ //stops being able to open two edits at a time.
                        
                        const newHoursLabel = document.createElement('LABEL');
                        newHoursLabel.setAttribute("for", "editHours");
                        newHoursLabel.textContent = "Hours:";
                        pElementToTarget.parentNode.insertBefore(newHoursLabel, pElementToTarget);
                        const newHours = document.createElement("INPUT");
                        newHours.setAttribute("type", "number")
                        newHours.setAttribute("value", `${hoursToEdit}`);
                        newHours.setAttribute("id", "editHours")
                        newHours.setAttribute("class", "editTime")
                        pElementToTarget.parentNode.insertBefore(newHours, pElementToTarget);

                        const newMinutesLabel = document.createElement('LABEL');
                        newMinutesLabel.setAttribute("for", "editMinutes");
                        newMinutesLabel.textContent = "Minutes:";
                        pElementToTarget.parentNode.insertBefore(newMinutesLabel, pElementToTarget);
                        const newMinutes = document.createElement("INPUT");
                        newMinutes.setAttribute("type", "number")
                        newMinutes.setAttribute("value", `${minutesToEdit}`);
                        newMinutes.setAttribute("id", "editMinutes")
                        newMinutes.setAttribute("id", "editTime")
                        pElementToTarget.parentNode.insertBefore(newMinutes, pElementToTarget);

                        const newSecondsLabel = document.createElement('LABEL');
                        newSecondsLabel.setAttribute("for", "editSeconds");
                        newSecondsLabel.textContent = "Seconds:";
                        pElementToTarget.parentNode.insertBefore(newSecondsLabel, pElementToTarget);
                        const newSeconds = document.createElement("INPUT");
                        newSeconds.setAttribute("type", "number")
                        newSeconds.setAttribute("value", `${secondsToEdit}`);
                        newSeconds.setAttribute("id", "editSeconds")
                        newSeconds.setAttribute("id", "editTime")
                        pElementToTarget.parentNode.insertBefore(newSeconds, pElementToTarget);

                        //remove the time in longform.
                        parentDiv.removeChild(pElementToTarget);

                        const saveButton = document.createElement('BUTTON');
                        saveButton.setAttribute("class", "save-button");
                        saveButton.setAttribute("type", "submit");
                        saveButton.textContent = "Save New Total Time";
                        newSeconds.after(saveButton);
                    }

                //3. Create an input element. - maybe a dropdown menu of numbers for seconds/minutes & hours?  

                //4 Connect the results of that input with:

                    //4.1 task.totalTimeFocusedOnTask
                    //4.2 task.totalTimeFocusedOnTaskLongForm
                    //4.3 Dom representation of 4.2 
                
                //5. Need a save button for confirming the changes. 

                //6. Needs to create new element to display changes again.
                })
            })
        })

        
    }
        countDown15ClickStart(); 
        countDown25ClickStart();   
        stopWatchClickStart(); 
        saveTimeButton();
        playOnClick();
        alarmToggle();
        manualTaskTimeEdit();
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
        this.taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
        this.buildTaskList(this.taskList);
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
        const ellipsisArray = document.querySelectorAll('.task-options');

        ellipsisArray.forEach(function(ellipsis){    
            ellipsis.addEventListener('click', function(){

                const editTaskButton = document.querySelector('.edit-task-option');
                editTaskButton.addEventListener('click', function(event){

                    let parentDiv = event.target.closest('.task');
                    let liToReplace = parentDiv.children[2];
                    let textToEdit = parentDiv.children[2].textContent;

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
            
            let checkboxId = checkbox.nextElementSibling.id;
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