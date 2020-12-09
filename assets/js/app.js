 
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

// --------------------------------------GLOBAL VARIABLES-------------------------------//

        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        var stopwatch;
        var countdownInt;
        var playing = false;
        let pauseButton = document.querySelector('#pause');
        let playButton = document.querySelector('#play');
        let resetButton = document.querySelector('#reset');
        let startStopwatchButtonArray = document.querySelectorAll('.start-stopwatch');
        let saveButton = document.getElementById('save-time-to-task');
        let timerContainer = document.querySelector('.timer-container');
        let timerTitle = document.querySelector('.timer-task-description');

        // const addNewTaskButton = document.querySelector('#add-new-task');
        // const newTaskInput = document.querySelector('#new-task-input');
        // const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
        // const arrayOfSortIcons = document.querySelectorAll('.task-sort');
        // const arrayOfOptionIcons = document.querySelectorAll('.task-options');
        
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
    function scrollElementIntoView(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
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
        minutes = 15; //CHANGE HERE WHEN TESTING
        hours = 0;
        countdown();
    }
    function countdown(){
        countdownInt = setInterval(function(){ 
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
            clearInterval(countdownInt);
            seconds = 0;
            minutes = 0;
            hours = 0;
            
            countdownEnded();        
        } else {
            clearInterval(countdownInt);
            seconds = 0;
            minutes = 0;
            hours = 0;
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
    function countDown25Play(){
        seconds = 0;
        minutes = 25;
        hours = 0;

        countdown();
    }
    function countdown15TimeToAdd(hours, minutes, seconds){
        var minutesInSeconds = minutes * 60
        if ( (seconds == -1) && (minutesInSeconds == 0) ){
            var timeToAdd = 900
            return timeToAdd;
        } else {
            var timeToAdd = 900 - (minutesInSeconds + seconds);
            return timeToAdd;
        }          
    }
    function countdown25TimeToAdd(hours, minutes, seconds){
        var minutesInSeconds = minutes * 60
        if ( (seconds == -1) && (minutesInSeconds == 0) ){
            var timeToAdd = 1500
            return timeToAdd;
        } else {
            var timeToAdd = 1500 - (minutesInSeconds + seconds);
            return timeToAdd;
        }
    }
    function stopwatchTimeToAdd(hours, minutes, seconds){
        let minutesInSeconds = minutes * 60;
        let hoursInSeconds = hours * 3600;
        var timeToAdd = seconds + minutesInSeconds + hoursInSeconds;
        return timeToAdd;
    }
// --------------------------------------STRUCTURAL FUNCTIONS-------------------------------// 

        function stopWatchClickStart(){
            startStopwatchButtonArray.forEach(function(stopwatchButton){
                ['click','keyup'].forEach(function(e){
                    stopwatchButton.addEventListener(e, function(event){
                        if((e === 'click') || (event.keyCode === 13)) {
                            if ((!playing) && (playButton.style.display == '')) {

                            //show timer when stopwatch clicked.
                            timerContainer.style.display = 'flex'; 
                            playing = true; 
                            
                            scrollElementIntoView();  
                            stopWatchPlay();
                            timer.addOverlay();

                            //bring the timer container above the overlay
                            timerContainer.style.zIndex = 1001;

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
                            timer.makeArrayElementsNotKeyboardTabbable();
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
                } 
            }, false)
            });
    });                         
} 
function countdownClickStartHelper(countdownType, countdownNumber){
        timer.addOverlay();
        scrollElementIntoView();
        timerContainer.style.zIndex = 1001;
        timer.makeArrayElementsNotKeyboardTabbable();

        let seconds = 0;
        let minutes = countdownNumber;
        let hours = 0;
        secondsHtml.innerHTML = `0${seconds}`;
        minutesHtml.innerHTML = `${minutes}`;
        hoursHtml.innerHTML = `0${hours}`;

        //Find the id of the task clicked on.
        let parentDiv = event.target.closest('.task');
        let taskToTargetId = parentDiv.children[2].id;
        let taskToTargetDescription = parentDiv.children[2].textContent;
    
        if ((!playing) && (seconds == 0) && (minutes == countdownNumber) && (hours==0) && (playButton.style.display == '')){
            timerContainer.style.display = 'flex';      
            let timerContainerTitle = `Countdown ${countdownNumber}`;
            let timerId = `${countdownType}-timer-title`;
            createTimerTitle(timerContainerTitle, timerId); 
            //Select the area where the title will go
            let timerTitle = document.querySelector('.timer-task-description');
            //Give it an id to match the task's id.
            timerTitle.id = taskToTargetId;
            //give it a description to match task description.
            timerTitle.textContent = taskToTargetDescription;
}
}
    function countDown15ClickStart(){
        const ellipsisArray = document.querySelectorAll('.task-options');    
        ellipsisArray.forEach(function(ellipsis){
            ['click','keyup'].forEach(function(evt){
                ellipsis.addEventListener(evt, function(elipEvent){
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {

                        const countdown15Button = document.querySelector('.countdown15-task-option');

                            $(countdown15Button).bind('click keyup', function(event){
                          
                                if((event.type === 'click') || (event.keyCode === 13)) {
                                        alarm.play()
                                        alarm.pause()
                                        countdownClickStartHelper("countdown15", 15);
                                        countDown15Play()
                                        pauseOnClick(countdownInt); 
                                        resetTime(countdownInt);
                                        closeTimer();  
                                    }
                                // $(this).unbind('click', arguments.callee);
                                // $(this).unbind('keyup', arguments.callee);          
                                })
                    }
                 })
                })
                })
            } 
    function countDown25ClickStart(){
        const ellipsisArray = document.querySelectorAll('.task-options');    
        ellipsisArray.forEach(function(ellipsis){
            ['click','keyup'].forEach(function(evt){
                ellipsis.addEventListener(evt, function(elipEvent){
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
                        const countdown25Button = document.querySelector('.countdown25-task-option');
                            $(countdown25Button).bind('click keyup', function(event){
                                if((event.type === 'click') || (event.keyCode === 13)) {
                                        countdownClickStartHelper("countdown25", 25);
                                        countDown25Play()
                                        pauseOnClick(countdownInt); 
                                        resetTime(countdownInt);
                                        closeTimer();  
                                    }
                                // $(this).unbind('click', arguments.callee);
                                // $(this).unbind('keyup', arguments.callee);
                                })
                            }
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
                } else if ((timerTitleDOM.textContent == 'Countdown 15') || (timerTitleDOM.textContent == 'Countdown 25') ){ 
                    countdown();
                    pauseOnClick(countdownInt);
                    resetTime(countdownInt);
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
    function resetTime(intervalToReset){ //,?
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
        if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`){
            alarm.play()
        }
        playing = false;  
        let countdownEndedModal = document.getElementById('countdown-ended-modal');
        countdownEndedModal.style.display = "block";
        let confirmButton = document.querySelector('.ce-confirm-button');
        let negateButton = document.querySelector('.ce-negate-button');
        let messageElement = document.querySelector('.ce-modal-p');
        let typeOfTimer = document.querySelector('.timer-title');
        let thisTask = timerTitle.textContent;
     

        if (typeOfTimer.textContent == "Countdown 15"){
            messageElement.textContent = `Congrats! You've worked for the full 15 minutes! Do you want to save 15 minutes to the task: ${thisTask}?`
            if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`){
               timer.addSilentAlarm() 
            }
            
            clearInterval(countdownInt);
        } else if (typeOfTimer.textContent == "Countdown 25"){
            messageElement.textContent = `Congrats! You've worked for the full 25 minutes! Do you want to save 25 minutes to the task: ${thisTask}?`;
            if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`){
               timer.addSilentAlarm() 
            }
            clearInterval(countdownInt);
        }
            confirmButton.addEventListener('click', function(){
                 if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`){
                    timer.removeSilentAlarm() 
                } 
                countdownEndedModal.style.display = "none"; 

                //calls save time function which will save seconds and long form time on the associated task object.
                saveTimeToTask(timerTitle.id, seconds);
                 
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
                clearInterval(countdownInt); 
                removeTimerFromDom(); 
                timer.removeOverlay();  
                playing = false;
                seconds = 0;
                minutes = 0;
                hours = 0;     
            })
            negateButton.addEventListener('click', function(){
                if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`){
                    timer.removeSilentAlarm() 
                }
                clearInterval(countdownInt);
                countdownEndedModal.style.display = "none";
                removeTimerFromDom();
                timer.removeOverlay();
                playing = false;
                seconds = 0;
                minutes = 0;
                hours = 0; 
            });         
    }
    function closeTimer(){
        let xButton = document.querySelector('.close-timer-x');

        xButton.addEventListener('keyup', function(event){
            if(event.keyCode === 13){
                event.preventDefault();
                xButton.click();
            }
        })     
        xButton.addEventListener('click', function(){
            //bring up close timer modal
            let closeTimerModal = document.getElementById('close-timer-modal');
            closeTimerModal.style.display = "block";
            let confirmButton = document.querySelector('.confirm-button');
            let negateButton = document.querySelector('.negate-button');

            let alarmButton = document.querySelector('#alarm-on');
            let pauseButton = document.querySelector('#pause');
            let playButton = document.querySelector('#play');
            let resetButton = document.querySelector('#reset');
            let closeTimerX = document.querySelector('.close-timer-x');


            makeElementsUntabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);

            confirmButton.addEventListener('click', function(){
            
            closeTimerModal.style.display = "none";
            makeElementsTabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
            
                //if user clicks X in the middle of timer playing then I need to pause it first
            let intervalToPause;
            let typeOfTimer = document.querySelector('.timer-title').textContent;

            if(typeOfTimer == "Stopwatch"){
                intervalToPause = stopwatch;
            } else if ((typeOfTimer == "Countdown 15") || (typeOfTimer == "Countdown 25")){
                intervalToPause = countdownInt;
            }
            if (playing){
                clearInterval(intervalToPause);
            }      
            removeTimerFromDom();
            timer.removeOverlay();
            timer.makeArrayElementsKeyboardTabbableAgain();  
            
            })
            negateButton.addEventListener('click', function(){
            closeTimerModal.style.display = "none"; 

            makeElementsTabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
            })                
        })       
    }
    function saveTimeButton(){
        saveButton.addEventListener('keyup', function(event){
                if(event.keyCode === 13){
                    event.preventDefault();
                    saveButton.click();
                }
            })
        saveButton.addEventListener('click', function(){
            //alert asking if the user definitely want to add {seconds} to their total time on that task.
            let timerTitle = document.querySelector('.timer-task-description');

            let thisTask = timerTitle.textContent;

            let saveTimeToTaskModal = document.getElementById('save-time-to-task-modal');
            saveTimeToTaskModal.style.display = "block";
            let confirmButton = document.querySelector('.sttt-confirm-button');
            let negateButton = document.querySelector('.sttt-negate-button');
            let messageElement = document.querySelector('.sttt-modal-p');
            let typeOfTimer = document.querySelector('.timer-title');
            
            let alarmButton = document.querySelector('#alarm-on');
            let pauseButton = document.querySelector('#pause');
            let playButton = document.querySelector('#play');
            let resetButton = document.querySelector('#reset');
            let closeTimerX = document.querySelector('.close-timer-x');

            makeElementsUntabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
           
            if (playing == true){
                pauseButton.style.display = "none";
                playButton.style.display = "inline-block";
            }
            if (typeOfTimer.textContent == "Stopwatch"){
                messageElement.textContent = `Do you want to save ${hours} hours ${minutes} minutes & ${seconds} seconds to your task: "${thisTask}"? `
                clearInterval(stopwatch);            
            } else if (typeOfTimer.textContent == "Countdown 15"){
                let timeToAddInSecs = countdown15TimeToAdd(hours, minutes, seconds);
                let timeInsert = timer.convertSecondsToTime(timeToAddInSecs);
                messageElement.textContent = `Do you want to save ${timeInsert} to to your task: "${thisTask}"? `
                clearInterval(countdownInt);
            } else if (typeOfTimer.textContent == "Countdown 25"){
                let timeToAddInSecs = countdown25TimeToAdd(hours, minutes, seconds);
                let timeInsert = timer.convertSecondsToTime(timeToAddInSecs);
                messageElement.textContent = `Do you want to save ${timeInsert} to to to your task: "${thisTask}"? `
                clearInterval(countdownInt);
            }
            
            confirmButton.addEventListener('click', function(){
                saveTimeToTask(timerTitle.id, seconds);
                //needs to update the time spent display on task list.
                let idForSavingTime = timerTitle.id;
                let taskTimeDisplay1 = document.querySelectorAll('.task-description'); //with the same id as the timertitle id.
                
                for (let i=0; i<taskTimeDisplay1.length; i++){
                    if(taskTimeDisplay1[i].id == idForSavingTime){
                        let timeDisplay = taskTimeDisplay1[i].parentElement.firstElementChild; 
                        timeDisplay.textContent = list.taskList[timerTitle.id].totalTimeFocusedOnTaskLongForm;
                    }       
                }
                saveTimeToTaskModal.style.display = "none";
                makeElementsTabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);

                removeTimerFromDom();
                timer.removeOverlay();
                timer.makeArrayElementsKeyboardTabbableAgain();
                location.reload();
            })
            negateButton.addEventListener('click', function(){
                saveTimeToTaskModal.style.display = "none";
                makeElementsTabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
            })
            return playing = false; 
        })
    }

    function makeElementsUntabbable(...elements){
        elements.forEach(element => element.setAttribute("tabindex", "-1"))
    }
    function makeElementsTabbable(...elements){
        elements.forEach(element => element.setAttribute("tabindex", "0"))
    }
    
    function saveTimeToTask(id, seconds){

        //select the timer titles to use to determine which timer is being played.
            var minutesInSeconds;
            
             let typeOfTimer = document.querySelector('.timer-title');
             let timeToAdd;
               
                if (typeOfTimer.textContent == "Countdown 15") {
                    timeToAdd = countdown15TimeToAdd(hours, minutes, seconds);
                    clearInterval(countdownInt); //necessary??
                } else if (typeOfTimer.textContent == "Countdown 25"){
                    timeToAdd = countdown25TimeToAdd(hours, minutes, seconds);
                    clearInterval(countdownInt); //necessary??
                } else if (typeOfTimer.textContent == "Stopwatch"){
                    timeToAdd = stopwatchTimeToAdd(hours, minutes, seconds);
                }
                // timeToAdd = seconds;
                let dateStamp = new Date();
                let localTime = dateStamp.toLocaleTimeString();
                let localDate = dateStamp.toLocaleDateString();
                let taskDescription = list.taskList[id].taskDescription;
            
        //Find the task object with that taskId and add the timeToAdd to its timeFocusedOnTask prop.
        list.taskList[id].totalTimeFocusedOnTask += timeToAdd;
        list.taskList[id].totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(list.taskList[id].totalTimeFocusedOnTask);
        list.taskList[id].timeSegments.push({id, timeToAdd, dateStamp, taskDescription, localDate, localTime});
        
        list.setDataToLocalStorage(); 
    }
    function alarmToggle(){
        let alarmButton = document.querySelector('.alarm');
        alarmButton.addEventListener('click', function(){
            if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`){
                alarmButton.innerHTML = `<i class="fas fa-bell-slash" aria-hidden="true"></i>`;
            } else {
                alarmButton.innerHTML = `<i class="fas fa-bell" aria-hidden="true"></i>`;
            }
        })
    }
    //Refactored editTask Helper Functions
    
    // Used to hide the task icons so they don't appear in the edit modal.
    function hideTaskIcons(taskLine){
        taskLine.children[1].classList.add('hidden');
        taskLine.children[3].classList.add('hidden');
        taskLine.children[4].classList.add('hidden');
        taskLine.children[5].classList.add('hidden');
        }
      function showTaskIcons(taskLine){
        //Checkbox
        taskLine.children[1].classList.remove('hidden');
        //Stopwatch Icon
        taskLine.children[3].classList.remove('hidden');
        //Ellipsis Icon
        taskLine.children[4].classList.remove('hidden');
        // fullTaskLine.children[5].classList.remove('hidden'); //don't need this? 
        }
    
    //Function to abstract the creation of save & cancel buttons for the edit option
    function createButton(buttonType) {
            const button = document.createElement('BUTTON');
            button.setAttribute("class", `edit-time-${buttonType}-button`);
            button.setAttribute("type", "submit");

            if (buttonType == "save"){
                button.textContent = "Save New Total Time";
                
            } else if (buttonType == "cancel"){
                button.textContent = "Cancel Changes & Exit";
                
            }
            return button;
        }

    //Function that takes an array of times as strings and turns it into an array of times as integers, formatted correctly.
     function makeTimeNumbersFromStrings(arrayOfStringTimes, arrayOfNumberTimes){
            arrayOfStringTimes.forEach(function(item){
            if (item.length === 5){
                arrayOfNumberTimes.push(parseInt(item.slice(0,2)));
            } else if(item.length === 6){
                arrayOfNumberTimes.push(parseInt(item.slice(0,3)));
            } else if(item.length === 7){
                arrayOfNumberTimes.push(parseInt(item.slice(0,4)));
            } else if(item.length === 8){
                arrayOfNumberTimes.push(parseInt(item.slice(0,5)));
            } else if(item.length === 9){
                arrayOfNumberTimes.push(parseInt(item.slice(0,6)));
            } else if(item.length === 10){
                arrayOfNumberTimes.push(parseInt(item.slice(0,7)));
            } else if(item.length === 11){
                arrayOfNumberTimes.push(parseInt(item.slice(0,8)));
            }else {
                arrayOfNumberTimes.push(parseInt(item.slice(0,1)));
            }
        });
        return arrayOfNumberTimes;
        }

    //A function that creates labels and inputs for each measure of time in the edit task modal.
    function createNewInputsForManualTimeEdit(measureOfTime, timeVariableToEdit, longFormTime){
            const newLabel = document.createElement('LABEL');
            newLabel.setAttribute("for", "edit"+measureOfTime);
            newLabel.textContent = measureOfTime+":";
            newLabel.setAttribute("class", "editTime edit-time-"+measureOfTime.toLowerCase()+"-label");
            longFormTime.parentNode.insertBefore(newLabel, longFormTime);

            const newTime = document.createElement("INPUT");
            newTime.setAttribute("type", "number")
            newTime.setAttribute("value", `${timeVariableToEdit}`);
            newTime.setAttribute("id", "edit"+measureOfTime);
            newTime.setAttribute("class", "editTime edit-time-"+measureOfTime.toLowerCase());
            newTime.setAttribute("oninput", "validity.valid||(value='')");
            newTime.setAttribute("min", "0");      
            longFormTime.parentNode.insertBefore(newTime, longFormTime);
        }

    /* This function removes the elements & classes created for the edit modal and restores the original task 
    list icons, classes & div elements. */
    function removeEditOptionElements(taskLine, saveButton, cancelButton, longFormTime) {                              
        taskLine.removeChild(saveButton);
        taskLine.classList.remove('edit-time-task');
        taskLine.removeChild(cancelButton);
        taskLine.removeChild(document.getElementById('editSeconds'));
        taskLine.removeChild(document.querySelector('.edit-time-seconds-label'));
        taskLine.removeChild(document.getElementById('editMinutes'));
        taskLine.removeChild(document.querySelector('.edit-time-minutes-label'));
        taskLine.removeChild(document.getElementById('editHours'));
        taskLine.removeChild(document.querySelector('.edit-time-hours-label')); 
        taskLine.style.zIndex = 0;
        //Bring back the updated longform time <p>  
        let insertBeforeNode = taskLine.children[0];
        let updatedTime = document.createElement('P');
        updatedTime.setAttribute('class', 'total-task-time');
        updatedTime.textContent = `${longFormTime}`;
        taskLine.insertBefore(updatedTime, insertBeforeNode);
        taskLine.children[2].classList.remove('edit-time-task-description');
    }

    function editTask(){  
        const ellipsisArray = document.querySelectorAll('.task-options');
        ellipsisArray.forEach(function(ellipsis){
             //for each of these event types do the following:
            ['click','keyup'].forEach(function(evt){
                 //listen for either of the above on ind. elipsises. passing on the specific elip in elipEvent
                ellipsis.addEventListener(evt, function(elipEvent){
                     //if the evt is click or the keyup event is a tab...
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
                        const manuallyEditTimeButton = document.querySelector('.edit-task-option');
                      
                        // manuallyEditTimeButton.addEventListener('click', function(event){
                        $(manuallyEditTimeButton).bind('click keyup', function(event){

                            if((event.type === 'click') || (event.type === 'keyup') && (event.keyCode === 13)) {

                                //V1. The Specific Task Line
                                let fullTaskLine = event.target.closest('.task');
                               
                                //V2. Targeted task's ID
                                let taskToTargetId = fullTaskLine.children[2].id;
                                //V3. Select the task description
                                let taskToTarget = fullTaskLine.children[2];
                                //V4. The Specific Long Form Time <p> 
                                let longFormTimeToTarget = fullTaskLine.firstElementChild;
                                //V5. Array of time strings
                                /*
                                take that <p> string</p> and divide it on the spaces to isolate the numbers. 
                                Gives us an array of strings - Eg: ["0hrs", "6mins", "5secs"] 
                                */
                                let timeToEdit = longFormTimeToTarget.textContent.split(" ");
                                //V6. Array of time numbers
                                let timeArray = []

                                //F1. Calls the function that transforms the strings into integers and uses the two arrays created above.
                                makeTimeNumbersFromStrings(timeToEdit, timeArray);

                                //V7, V8, V9 Creates variables for each of the time categories and sets them as numbers.
                                let hoursToEdit = timeArray[0];
                                let minutesToEdit = timeArray[1];
                                let secondsToEdit = timeArray[2];

                                // V10. Save Button Creation
                                let editTaskSaveButton = createButton("save");
                                // V11. Cancel Button Creation
                                let editTaskCancelButton = createButton("cancel");

                                //F2. Calls the function that hides the task icons.
                                hideTaskIcons(fullTaskLine);

                                //F3.  Calls the function that adds an overlay to focus user on editing the time and not doing anything else. 
                                timer.addOverlay();

                                //P1. Bring the task above the overlay so the user can access the edit boxes.
                                fullTaskLine.style.zIndex = 1001;
                                //F4. Make elements not tabbable
                                timer.makeArrayElementsNotKeyboardTabbable();
                                //P2, P3, P4 - Add the classes for this layout
                                fullTaskLine.classList.add('edit-time-task');
                                taskToTarget.classList.add('edit-time-task-description');
                                taskToTarget.classList.remove('task');
                              
                                //F5, F6, F7 - Call the time input creation function for each of the measures of time.
                                createNewInputsForManualTimeEdit("Hours", hoursToEdit, longFormTimeToTarget);
                                createNewInputsForManualTimeEdit("Minutes", minutesToEdit, longFormTimeToTarget);
                                createNewInputsForManualTimeEdit("Seconds", secondsToEdit, longFormTimeToTarget);

                                //P5. Remove the time in longform ( a <p> tag )
                                fullTaskLine.removeChild(longFormTimeToTarget);

                                //P6. Add the save button after the seconds input.
                                document.getElementById('editSeconds').after(editTaskSaveButton);
                                
                                //P7. Add the cancel button after the save button.
                                editTaskSaveButton.after(editTaskCancelButton);
                              
                                //V12. Edit Task Name 
                                let editTaskName = document.querySelector('.edit-time-task-description');
                                
                                //P8. Scroll title into view.
                                editTaskName.scrollIntoView(); //check this

                                //V13. Text to Edit
                                let taskTextToEdit = editTaskName.innerText;

                                //P9. Create Edit Task Name Input & populate with task name.
                                const editTaskNameInput = document.createElement("INPUT");
                                editTaskNameInput.setAttribute("type", "text")
                                editTaskNameInput.setAttribute("value", `${taskTextToEdit}`);
                                editTaskNameInput.setAttribute("class", "editedTask")
                                editTaskNameInput.style.zIndex="1001";
                                editTaskName.parentNode.replaceChild(editTaskNameInput, editTaskName);

                                //V14, V15, V16 - Time Measure Input Variables Created Earlier 
                                let hoursInput = document.getElementById('editHours');
                                let minutesInput = document.getElementById('editMinutes');
                                let secondsInput = document.getElementById('editSeconds');

                                //V17, V18, V19 - Time Measure Input Values 
                                let originalHours = hoursInput.value;
                                let originalMinutes = minutesInput.value;
                                let originalSeconds = secondsInput.value;

                                //V20, V21 Original (pre-edited) Minutes & Hours In Seconds
                                let minutesInSeconds = originalMinutes * 60;
                                let hoursInSeconds = originalHours * 3600;

                                //V22 Base Time In Seconds
                                let baseTime = parseInt(originalSeconds) + minutesInSeconds + hoursInSeconds;

                                //V23 New task Element for when edit modal closes
                                const newTaskLi = document.createElement('LI');
                                newTaskLi.setAttribute("class", "task-description");
                                newTaskLi.setAttribute("id", `${taskToTargetId}`);
                                newTaskLi.textContent = editTaskNameInput.value; //set the value of the li to the edited task value.

                                // Event Listener for when the save button is clicked/selected: 
                                editTaskSaveButton.addEventListener('click', function(){

                                    /* 1. Look at the task name / description currently in the input box & create a new LI element to display the new information in the task list when the edit modal is closed. */       
                                    newTaskLi.textContent = editTaskNameInput.value; //set the value of the li to the edited task value.
                                    editTaskNameInput.parentNode.replaceChild(newTaskLi, editTaskNameInput); //Replace the input box with the new Li. 

                                    /* 2 Loop through the taskList in local storage and when the ids match, update the storage task with the input task description & make sure that the checkmark info is passed to the newly created LI */
                                    list.taskList.forEach(task => {
                                        if(task.id == newTaskLi.id){
                                            task.taskDescription = newTaskLi.textContent;
                                        }
                                        if((task.id == newTaskLi.id) && (task.completed == true)){
                                            newTaskLi.classList.add('completed');
                                        }
                                    })
                                    // 3.Collect any new time measure inputs and save them too.
                                    let hoursToAdd = hoursInput.value;
                                    let minutesToAdd = minutesInput.value;
                                    let secondsToAdd = secondsInput.value;
                    
                                    //4. Convert those times to seconds
                                    let minutesInSeconds = minutesToAdd * 60;
                                    let hoursInSeconds = hoursToAdd * 3600;

                                    /* 5. Take a snapshot of the date & time these changes were made in order to keep the "today" chart information accurate. If a task is edited, the new amount of time minused from the original time is added as a time segment in an array. */
                                    let dateStamp = new Date();
                                    let localTime = dateStamp.toLocaleTimeString();
                                    let localDate = dateStamp.toLocaleDateString();
                                    let taskDescription = list.taskList[taskToTargetId].taskDescription;
                                    let id = parseInt(taskToTargetId);
                                    let totalTimeToAdd = parseInt(secondsToAdd) + minutesInSeconds + hoursInSeconds;
                                    let timeToAdd = totalTimeToAdd - baseTime;

                                    list.taskList[taskToTargetId].timeSegments.push({id, timeToAdd, dateStamp, taskDescription, localDate, localTime});
                                        
                                    //6. Convert those seconds to long form time
                                    let longFormTimeToAdd = timer.convertSecondsToTime(totalTimeToAdd);

                                    //7. ID matching loop - updates the totalTimeFocusedOnTask by taking into account any changes to the time made in the edit task window. 
                                    for (let i=0; i<list.taskList.length; i++){
                                        if (list.taskList[i].id == taskToTargetId){
                                            list.taskList[i].totalTimeFocusedOnTask = totalTimeToAdd;
                                            list.taskList[i].totalTimeFocusedOnTaskLongForm = longFormTimeToAdd; 
                                        }
                                    }                 
                                    //8. Remove all the new created elements using a function & bring back original Divs
                                    removeEditOptionElements(fullTaskLine, editTaskSaveButton, editTaskCancelButton, longFormTimeToAdd);
                                    //9. Bring back the icons.
                                    showTaskIcons(fullTaskLine);

                                    timer.removeOverlay();
                                    timer.makeArrayElementsKeyboardTabbableAgain();
                                    
                                    list.setDataToLocalStorage();
                                    location.reload();
                                    })
                                    
                                //If the Cancel button is clicked: 
                                editTaskCancelButton.addEventListener('click', function(){

                                    //1. Set the long form time as the time before the edit option was selected.
                                    let longFormTimeToAdd = list.taskList[taskToTargetId].totalTimeFocusedOnTaskLongForm;

                                    //2. Replace the task name input with just the task name
                                    editTaskNameInput.parentNode.replaceChild(newTaskLi, editTaskNameInput);

                                    //3. Remove all the new created elements using a function & bring back original Divs
                                    removeEditOptionElements(fullTaskLine, editTaskSaveButton, editTaskCancelButton, longFormTimeToAdd);

                                    //4. Bring back the icons.
                                    showTaskIcons(fullTaskLine);
                                        
                                    timer.removeOverlay(); 
                                    timer.makeArrayElementsKeyboardTabbableAgain();
                                    list.setDataToLocalStorage();
                                    location.reload();
                                                          
                                    })
                                $(this).unbind('click', arguments.callee);
                                $(this).unbind('keyup', arguments.callee);
                            }
                            });
                        }
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
        editTask();
}
// Thank you to Wilson Lee on Stack Overflow for this code - attributed in README. 
convertSecondsToTime(seconds){ 
    let hoursConverted = Math.floor(seconds / 3600);
    let minutesConverted = Math.floor(seconds % 3600 / 60);
    let secondsConverted = Math.floor(seconds % 3600 % 60);
    return `${hoursConverted}hrs ${minutesConverted}mins ${secondsConverted}secs`;
}
addOverlay(){
    let pageBody = document.getElementsByTagName('BODY')[0]
    let overlayEl = document.createElement("DIV");
    overlayEl.setAttribute("class", "overlay");
    pageBody.appendChild(overlayEl);
    }
removeOverlay(){
    let overlay = document.querySelector('.overlay');
    let pageBody = document.getElementsByTagName('BODY')[0];
    pageBody.removeChild(overlay);
    }
addSilentAlarm(){
    let overlay = document.querySelector('.overlay');
    overlay.removeAttribute("class", "overlay");
    overlay.setAttribute("class", "silent-alarm");
}
removeSilentAlarm(){
    let silentAlarm = document.querySelector('.silent-alarm');
    let pageBody = document.getElementsByTagName('BODY')[0];
    pageBody.removeChild(silentAlarm);
}
makeArrayElementsNotKeyboardTabbable(){
    const addNewTaskButton = document.querySelector('#add-new-task');
    const newTaskInput = document.querySelector('#new-task-input');
    const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
    // const arrayOfSortIcons = document.querySelectorAll('.task-sort');
    const arrayOfOptionIcons = document.querySelectorAll('.task-options');
    let startStopwatchButtonArray = document.querySelectorAll('.start-stopwatch');
    const skipTasks = document.querySelector('#skip-tasks');
    let chartsSelectBox = document.querySelector('#chart-selections');

    newTaskInput.setAttribute("tabindex", "-1");
    addNewTaskButton.setAttribute("tabindex", "-1");
    arrayOfCheckboxes.forEach(function(checkbox){
        checkbox.setAttribute("tabindex", "-1")
    });  
        startStopwatchButtonArray.forEach(function(stopwatch){
        stopwatch.setAttribute("tabindex", "-1")
    });   
    //     arrayOfSortIcons.forEach(function(sorticon){
    //     sorticon.setAttribute("tabindex", "-1")
    // });
    arrayOfOptionIcons.forEach(function(optionicon){
        optionicon.setAttribute("tabindex", "-1")
    });
    skipTasks.setAttribute("tabindex", "-1");
    chartsSelectBox.setAttribute("tabindex", "-1");
    
}
makeArrayElementsKeyboardTabbableAgain(){
    const addNewTaskButton = document.querySelector('#add-new-task');
    const newTaskInput = document.querySelector('#new-task-input');
    const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
    const arrayOfSortIcons = document.querySelectorAll('.task-sort');
    const arrayOfOptionIcons = document.querySelectorAll('.task-options');
    let startStopwatchButtonArray = document.querySelectorAll('.start-stopwatch');
    const skipTasks = document.querySelector('#skip-tasks');
    let chartsSelectBox = document.querySelector('#chart-selections');
    

    newTaskInput.setAttribute("tabindex", "0");
    addNewTaskButton.setAttribute("tabindex", "0");
    arrayOfCheckboxes.forEach(function(checkbox){
        checkbox.setAttribute("tabindex", "0")
    });  
        startStopwatchButtonArray.forEach(function(stopwatch){
        stopwatch.setAttribute("tabindex", "0")
    });   
        arrayOfSortIcons.forEach(function(sorticon){
        sorticon.setAttribute("tabindex", "0")
    });
    arrayOfOptionIcons.forEach(function(optionicon){
        optionicon.setAttribute("tabindex", "0")
    });
    skipTasks.setAttribute("tabindex", "0");
    chartsSelectBox.setAttribute("tabindex", "0");
          
}
}
class Task {
    constructor(taskDescription){
        this.taskDescription = taskDescription; //obvz - the only essential prop to create a new task obj.
        this.id = null;
        this.completed = false; 
        this.totalTimeFocusedOnTask = 0; //running total of time focused on a specific task saved in seconds. 
        this.totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(this.totalTimeFocusedOnTask);
        this.timeSegments = [];
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
                    <input class="taskCheckbox" type="checkbox" tabindex=0 checked>
                    <li class="task-description completed" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a class="task-stopwatch task-list-icon" ><i class="fas fa-stopwatch start-stopwatch" tabindex=0></i></i></a>
                    <a class="task-options task-list-icon" aria-label="task-options-ellipsis" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;
            } else if(taskList[i].completed === false) {
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox" tabindex=0>
                    <li class="task-description" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a class="task-stopwatch task-list-icon"><i class="fas fa-stopwatch start-stopwatch"  tabindex=0 ></i></i></a>
                    <a class="task-options task-list-icon" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
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
        const newTaskInput = document.querySelector('#new-task-input');

        newTaskInput.addEventListener('keyup', function(event){
            if(event.keyCode === 13){
                event.preventDefault();
                addNewTaskButton.click();
            }
        })
        addNewTaskButton.addEventListener('click', function(){ //event listener working. 
            
            let newTaskInputValue = newTaskInput.value;

            function myTrim(x) {
            return x.replace(/^\s+|\s+$/gm,'');
            }

            newTaskInputValue = myTrim(newTaskInputValue);

            if((newTaskInputValue !== null) && (newTaskInputValue !== "") ){
               
                let newTask = new Task(newTaskInputValue); //creates a new Task obj. & sets its props.
                newTask.id = list.taskList.length; //it will always be 1to1.
                newTask.totalTimeFocusedOnTask = 0;
                list.taskList.push(newTask); //adds the new task into the taskList array.
                //adds the task to the list in html  
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${newTask.totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox" tabindex=0>
                    <li class="task-description" id="${newTask.id}">${newTask.taskDescription}</li>
                    <a class="task-stopwatch task-list-icon" ><i class="fas fa-stopwatch start-stopwatch" tabindex=0 ></i></i></a>
                    <a class="task-options task-list-icon" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

               //clears the input value
                document.querySelector('#new-task-input').value = "";

                //calls these functions so they are operational on the new task.
                list.toggleTaskComplete(list.taskList); //checks for completion tasks when new tasks are added.
                list.deleteTask();
                list.dynamicPopoverNav();
                timer.timers();
                list.setDataToLocalStorage();
                location.reload(); //to fix stopwatch click start bug on new tasks that are added.
               
            } else if ((newTaskInputValue === "") || (newTaskInputValue === null)){
                
                let addValidTaskModal = document.getElementById('enter-task-modal');
                addValidTaskModal.style.display = "block";
                timer.makeArrayElementsNotKeyboardTabbable();
                let okButton = document.querySelector('.valid-task-confirm-button');

                okButton.addEventListener('click', function(){
                
                addValidTaskModal.style.display = "none";
                timer.makeArrayElementsKeyboardTabbableAgain();  

            })  
        }
    })
}
    toggleTaskComplete(){
        //listen for checkbox clicks on specific task.
        const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
        arrayOfCheckboxes.forEach(function(checkbox){  
            
            let checkboxId = checkbox.nextElementSibling.id;
            let chartSelection = document.getElementById('chart-selections');
            checkbox.addEventListener('change', function(){ 
                if(checkbox.checked == true){
                    checkbox.nextElementSibling.classList.add('completed');
                    checkbox.setAttribute("checked", true); 
                    let dateStamp = new Date();
                    let localTime = dateStamp.toLocaleTimeString();
                    let localDate = dateStamp.toLocaleDateString();
                        
                    list.taskList.forEach(function(task){
                        if (task.id == checkboxId){ 
                            task.completed = true;
                            task.timeSegments.push({id:task.id, timeToAdd:0, dateStamp, localTime, localDate, taskDescription: task.taskDescription});
                            // list.taskList[id].timeSegments.push({id, timeToAdd, dateStamp, taskDescription, localDate, localTime});   
                        }
                    })           
                    if ((chartSelection.value === "tasks-completed") || (chartSelection.value === "tasks-completed-today")) {
                        list.setDataToLocalStorage()
                        location.reload();
                    }
            
                } else if (checkbox.checked == false){
                    checkbox.nextElementSibling.classList.remove('completed'); //I think this is causing the issue? 
                     
                    list.taskList.forEach(function(task){
                        if (task.id == checkboxId){
                            task.completed = false;
                            
                        }
                    })
                    if ((chartSelection.value === "tasks-completed") || (chartSelection.value === "tasks-completed-today")) {
                        list.setDataToLocalStorage()
                        location.reload();
                    }
                    }
                    list.setDataToLocalStorage()
                })       
            })
            
        }
    deleteTask(){
        const ellipsisArray = document.querySelectorAll('.task-options');
        ellipsisArray.forEach(function(ellipsis){
            ['click','keyup'].forEach(function(evt){
                ellipsis.addEventListener(evt, function(elipEvent){
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
                         const deleteTaskButton = document.querySelector('.delete-task-option');
                        ['click','keyup'].forEach(function(e){
                            deleteTaskButton.addEventListener(e, function(event){
                                if((e === 'click') || (event.keyCode === 13)) {
                                    let taskToDelete = event.target.closest('.task');
                                    let taskToDeleteId = taskToDelete.children[2].id;
                                    let confirmDeletionModal = document.getElementById('confirm-deletion-modal');
                                    let confirmDeletionBtn = document.querySelector('.deletion-confirm-button');
                                    let negateDeletionBtn = document.querySelector('.deletion-negate-button');
                                    let messageElement = document.querySelector('.confirm-deletion-modal-p');
                                    let taskNameToDelete = taskToDelete.children[2].textContent;    
                                    timer.makeArrayElementsNotKeyboardTabbable();
                                    confirmDeletionModal.style.display = "block";
                                    messageElement.textContent = `Are you sure you want to delete ${taskNameToDelete}?`;
                                    
                                    
                                    
                                    confirmDeletionBtn.addEventListener('click', function(){
                                        //Removes the task from the DOM
                                        taskToDelete.remove();

                                        //Removes the Task from the taskList array.
                                        list.taskList.splice(list.taskList.findIndex(task => task.id == taskToDeleteId), 1);

                                        //resets the Task object ids & timeSegment ids to run from 0 upwards.
                                        let tList = list.taskList;
                                        for (let i=0; i<tList.length; i++){
                                            tList[i].id = i;
                                            for (let j=0; j<tList[i].timeSegments.length; j++){
                                                tList[i].timeSegments[j].id = i;
                                            }
                                        }
                                        let arrOfDomTasks = document.querySelectorAll('.task-description');
                                        for (let i=0; i<arrOfDomTasks.length; i++){
                                            arrOfDomTasks[i].id = i.toString();
                                        }

                                         confirmDeletionModal.style.display = "none";
                                         list.setDataToLocalStorage();
                                         timer.makeArrayElementsKeyboardTabbableAgain();
                                    })

                                    negateDeletionBtn.addEventListener('click', function(){
                                        confirmDeletionModal.style.display = "none";
                                        timer.makeArrayElementsKeyboardTabbableAgain();
                                        
                                    })
                                    
                                    list.setDataToLocalStorage();
                                }
                            })
                        })
                    }
                })
            })
        }) 
    } 
        dynamicPopoverNav(){   
            // This code is all taken exactly as written from the tippy.js documentation including the hideOnPopperBlur plugin directly below 
            const popover = document.getElementById('popover');
            const hideOnPopperBlur = {
                name: 'hideOnPopperBlur',
                defaultValue: true,
                fn(instance) {
                    return {
                    onCreate() {
                        instance.popper.addEventListener('focusout', (event) => {
                        if (
                            instance.props.hideOnPopperBlur &&
                            event.relatedTarget &&
                            !instance.popper.contains(event.relatedTarget)
                        ) {
                            instance.hide();
                        }
                        });
                    },
                    };
                },
                };


            const hideOnEsc = {
                name: 'hideOnEsc',
                defaultValue: true,
                fn({hide}) {
                    function onKeyDown(event) {
                    if (event.keyCode === 27) {
                        hide();
                    }
                    }

                    return {
                    onShow() {
                        document.addEventListener('keydown', onKeyDown);
                    },
                    onHide() {
                        document.removeEventListener('keydown', onKeyDown);
                    },
                    };
                },
            };

            const hideOnOptionSelect = {
                name: 'hideOnOptionSelect',
                defaultValue: true,
                fn({hide}) {
                    function onSelect(event) {
                        const editTaskOpt = document.querySelector('.edit-task-option');
                        const deleteTaskOpt = document.querySelector('.delete-task-option');
                        const countdown15TaskOpt = document.querySelector('.countdown15-task-option');
                        const countdown25TaskOpt = document.querySelector('.countdown25-task-option');
                        const manualEditTaskOpt = document.querySelector('.edit-task-time-task-option');
                    if ((event.target == editTaskOpt) || (event.target == deleteTaskOpt) || (event.target == countdown15TaskOpt ) || (event.target == countdown25TaskOpt ) || (event.target == manualEditTaskOpt )  )  {
                        hide();
                    }
                    }

                    return {
                    onShow() {
                        document.addEventListener('click', onSelect);
                    },
                    onHide() {
                        document.removeEventListener('click', onSelect); 
                    },
                    };
                },
            };

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
                // sticky: true,
                plugins: [hideOnPopperBlur, hideOnEsc, hideOnOptionSelect], 
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
list.dynamicPopoverNav();
timer.initialiseTimer();
timer.timers();

/************************************************ CHARTS & D3.js  **************************************************/


var totalTimeFocusedOnEachTask = list.taskList; //dataset 1 - total time spent on each task.
var totalTimeFocusedOnEachTaskToday =  getTodayTasks(); //dataset 2 total time spent on each task today.

    
selectChart(totalTimeFocusedOnEachTask);

function clearChartArea(){
    var chartSvg = document.querySelector('.chart-svg');
    var circleLeg = document.querySelectorAll('.circle-legend');
    let completedTaskList = document.querySelector('.completed-task-list');

     if(chartSvg){
        d3.select(chartSvg).remove(); 
        }
    if(circleLeg){
        circleLeg.forEach(leg => leg.remove())
    }
    if(completedTaskList){
        completedTaskList.remove();
    }
}

function selectChart(data){

    clearChartArea()

    var width = function(){
        if(window.innerWidth < 576){
                return 300
            } else if (window.innerWidth > 575){
                return 550
            }
    };
    var height = function(){
            if(window.innerWidth < 576){
                return 250
            } else if (window.innerWidth > 575){
                return 320
            }
        }
    var radius = 150;
    var donutWidth = 75;
    var color = d3.scaleOrdinal()
        .range(["#33A8C7", "#52E3E1", "#A0E426", "#FDF148", "#FFAB00", "#F77976", "#F050AE", "#D883FF", "#9336FD"]); //colours for slices/ arcs
    var svg = d3.select('.chart-area') //select the charts div
        .append("svg") //create an svg el
        .attr("class", "chart-svg")
        .attr("width", width)
        .attr("height", height)
        .call(responsivefy)
        .append("g")
        .attr('transform', function(){
            if (window.innerWidth < 576){
                 return 'translate(' + 200 + ',' + 155 + ')';
            } else if (window.innerWidth > 575){
                 return 'translate(' + (305) + ',' + (155) + ')'
            }
        })

    var arc = d3.arc()
        .innerRadius(donutWidth)
        .outerRadius(radius);
        
    var pie = d3.pie()
        .value(function(d){
            return d.totalTimeFocusedOnTask //what data will the chart use to create the slices.
        })
        .sort(null); //stops the chart sorting in order of size. 
    var legendRectSize = 14;
    var legendSpacing = 7;
    var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

    var path = svg.selectAll("path")
        .data(pie(data)) 
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d){   
            return color(d.data.taskDescription)
            
        })
        .attr("stroke", "white")
       
        .on('mouseover', function (event, d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');

        //Makes the new div appear on hover:
        div.transition()
            .duration(50)
            .style("opacity", 1);
        let task = d.data.taskDescription
        let longTime = d.data.totalTimeFocusedOnTaskLongForm
        div.html(task + "<br>" + longTime ) //put label to display here
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 15) + "px");        
     })

     .on('mouseout', function (event, d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');  
        //Makes the new div disappear:
        div.transition()
            .duration('50')
            .style("opacity", 0);
     });

    var legendRectSize = 14;
    var legendSpacing = 7;
  
    var svgLegend = d3.select('.legend-area');
        
    var legend = svgLegend.selectAll('.legend') //the legend and placement
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'circle-legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;   
            var offset = -10;    
            var horz = 25;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';    
        });
    
    legend.append('circle') //keys
        .style('fill', color)
        .style('stroke', color)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', '0.5rem'); //size of circles

    legend.append('text') //labels
    .data(data)
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {  
        let taskDescrip = d.taskDescription;
        if(window.innerWidth < 781) {
            if (taskDescrip.length > 15){
            taskDescrip = taskDescrip.slice(0,15) + "...";
        }
        } else {
            if (taskDescrip.length > 25){
            taskDescrip = taskDescrip.slice(0,25) + "...";
        }
        }
        return  `${taskDescrip} : ${d.totalTimeFocusedOnTaskLongForm}`; 
    });

    var legendItems = document.querySelectorAll('.circle-legend');

    // dynamically set the height of the legend box depending on how many items are added to it. 
    svgLegend
        .attr('height', function(){
            if (legendItems.length > 6) {
              return legendItems.length * 30;
            }   
        })
        // .attr('width', function(){
        //     return 500;
        // })
}
d3.select('#chart-selections')
    .on("change", function(event){
        var option = event.target.value;
        totalTimeFocusedOnEachTaskToday =  getTodayTasks();
        if(option === "total-time-focused-on-each-task"){
            selectChart(totalTimeFocusedOnEachTask);
        } else if(option === "total-time-focused-on-each-task-today"){
            selectChart(totalTimeFocusedOnEachTaskToday); 
        } else if (option === "tasks-completed"){
            completedTaskList(list.taskList);
        } else if(option === "tasks-completed-today"){
            completedTaskList(totalTimeFocusedOnEachTaskToday);
            
        }
    })

function getTodayTasks(){ 
    let tasks = list.taskList;
    let dateTimeNow = new Date();
    let dateNow = dateTimeNow.toLocaleDateString();
    let timeNow = dateTimeNow.toLocaleTimeString();
    let todaysTasks = [];
    let i;

    for (i=0; i<tasks.length; i++){
        
        for (let j=0; j<tasks[i].timeSegments.length; j++){
            let individualTimeSegment = tasks[i].timeSegments[j];

            if(individualTimeSegment.localDate === dateNow){
                todaysTasks.push(individualTimeSegment);
            }
        }
    }
    //The following code was written by user2736012 on Stack Overflow and altered (spread operator) by myself - link in Readme. 
    //1. if there is nothing in temp with this id then put the whole task in there as an object.
    //2 Puts the task in the temp object as an object with the key 0 i.e. {0:{id: "0", timeToAdd: 17}, 1:{Another obj}, 2: {Another Object} }
    //3.if there is already a task in there with that id then add the current tasks[i] timeToAdd to it. 
        //temp.0.timeToAdd + current task's time to Add. 

    var temp = {};
    var task = null;
    for(i=0; i < todaysTasks.length; i++) {
        task = {...todaysTasks[i]}; 
        if(!temp[task.id]) { //1
            temp[task.id] = task; //2
        } else {
            temp[task.id].timeToAdd += task.timeToAdd;//3
        }
    }
    var todaysTasksFiltered = [];
    for (var prop in temp){
        todaysTasksFiltered.push(temp[prop]);
    }

    //for each task in todaysTasksFiltered look at that tasks id and then go through the list.tasklist array and find the task with the same id and then check to see whether it is completed or not. 
    //issue here is that IF no time has been added, but somehow the task is marked complete, it will not appear in the completed today list. 

    for (let i=0; i<todaysTasksFiltered.length; i++){
        for (let j=0; j< list.taskList.length; j++){
            if(todaysTasksFiltered[i].id == list.taskList[j].id){
                todaysTasksFiltered[i].completed = list.taskList[j].completed;
            }
        }
    }

    todaysTasksFiltered.forEach(task => task.totalTimeFocusedOnTask = task.timeToAdd);
    
    todaysTasksFiltered.forEach(task => task.totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(task.totalTimeFocusedOnTask));
    return todaysTasksFiltered;
    
}

function completedTaskList(data){
    
    clearChartArea();

    let legendArea = document.querySelector('.legend-area');
    
    legendArea.setAttribute("width", 0);
    legendArea.setAttribute("height", 0);
    let taskList = data;
    let comTasksDiv = document.querySelector('.completed-tasks');
    comTasksDiv.innerHTML += `<ol class="completed-task-list">`;
    let comTaskListDiv = document.querySelector('.completed-task-list');
    
    taskList.forEach(function(task){
        if(task.completed === true){
            comTaskListDiv.innerHTML+= `<li>${task.taskDescription}</li>`
        }
    })
    comTasksDiv.innerHTML += `</ol>`;
}

/* The below function is taken from Ben Clinkenbeard's Blog Article and originally written by Brendan Sudol (attributed in README) */
function responsivefy(svg) {
  // container will be the DOM element
  // that the svg is appended to
  // we then measure the container
  // and find its aspect ratio
  const container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width'), 10),
      height = parseInt(svg.style('height'), 10),
      aspect = width / height;
 
  // set viewBox attribute to the initial size
  // control scaling with preserveAspectRatio
  // resize svg on inital page load
  svg.attr('viewBox', function(){
      if(window.innerWidth < 576) {
        return `0 0 ${width} ${height + 70}`
      } else if(window.innerWidth > 575) {
        return `0 0 ${width} ${height}`
      }
  })
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);
 
  // add a listener so the chart will be resized
  d3.select(window).on(
      'resize.' + container.attr('id'), 
      resize
  );

  function resize() {
      const w = parseInt(container.style('width'));
      svg.attr('width', w);
      svg.attr('height', Math.round(w / aspect));
  }

}

/* The resize code below that specifically targets screen width change. 
Taken from: https://stackoverflow.com/questions/10750603/detect-a-window-width-change-but-not-a-height-change */
// window.onresize = function() {
//     let lastWidth;
// 	if (window.innerWidth != lastWidth) {
// 		location.reload();
// 		lastWidth = window.innerWidth;
// 	}
// };

