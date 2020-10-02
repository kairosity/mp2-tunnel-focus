 
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

        const addNewTaskButton = document.querySelector('#add-new-task');
        const newTaskInput = document.querySelector('#new-task-input');
        const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
        const arrayOfSortIcons = document.querySelectorAll('.task-sort');
        const arrayOfOptionIcons = document.querySelectorAll('.task-options');
        
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
    function makeElementsNotKeyboardTabbable(){

        //add new task input
        newTaskInput.setAttribute("tabindex", "-1");

        //the add task button
        addNewTaskButton.setAttribute("tabindex", "-1");

        //all the checkboxes
        arrayOfCheckboxes.forEach(function(checkbox){
            checkbox.setAttribute("tabindex", "-1")
        });  

            // all the stopwatches
            startStopwatchButtonArray.forEach(function(stopwatch){
            stopwatch.setAttribute("tabindex", "-1")
        });   

            // all the sort icons
            arrayOfSortIcons.forEach(function(sorticon){
            sorticon.setAttribute("tabindex", "-1")
        });

            // all the ellipses. 
        arrayOfOptionIcons.forEach(function(optionicon){
            optionicon.setAttribute("tabindex", "-1")
        });

    }

    function makeElementsKeyboardTabbableAgain(){

        //add new task input
        newTaskInput.setAttribute("tabindex", "0");

        //the add task button
        addNewTaskButton.setAttribute("tabindex", "0");

        //all the checkboxes
        arrayOfCheckboxes.forEach(function(checkbox){
            checkbox.setAttribute("tabindex", "0")
        });  

            // all the stopwatches
            startStopwatchButtonArray.forEach(function(stopwatch){
            stopwatch.setAttribute("tabindex", "0")
        });   

            // all the sort icons
            arrayOfSortIcons.forEach(function(sorticon){
            sorticon.setAttribute("tabindex", "0")
        });

            // all the ellipses. 
        arrayOfOptionIcons.forEach(function(optionicon){
            optionicon.setAttribute("tabindex", "0")
        });          
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
                clearInterval(countdown15);
                clearInterval(countdown25);
                countdownEnded();
                
            } else {
                alarm.play()
                clearInterval(countdown15);
                clearInterval(countdown25);
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

                ['click','keyup'].forEach(function(e){

                    stopwatchButton.addEventListener(e, function(event){
                        if((e === 'click') || (event.keyCode === 13)) {

                            // && (seconds == 0) && (minutes == 0) && (hours==0)
                           
                            //if there are no timers playing then... automatically run StopWatchPlay
                            if ((!playing) && (playButton.style.display == '')) {

                            //show timer when stopwatch clicked.
                            timerContainer.style.display = 'flex'; 
                            playing = true;

                            // starts playing the stopwatch automatically.
                            stopWatchPlay();

                            addOverlay();

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

                            makeElementsNotKeyboardTabbable();

                        } else {
                            startStopwatchButtonArray.forEach(function(stopwatchButton){
                                    event.preventDefault();
                            }) //may not need any of this? 
                            console.log("We cannot play the timer because one of these things is true: 1-playing==true 2-seconds, minutes or hours are not at 0 or the play button is visible.");
                        }             
                    pauseOnClick(stopwatch); 
                    resetTime(stopwatch);
                    playOnClick();
                    closeTimer();
                    timer.initialiseTimer();
                } //if statement
            }, false) //stopwatch button event listener.
      
            }); //event arr forEach  
    }); //start stopwatch button array
                        
} 
    function countDown15ClickStart(){
        const ellipsisArray = document.querySelectorAll('.task-options');
        
        ellipsisArray.forEach(function(ellipsis){
            ['click','keyup'].forEach(function(evt){
                ellipsis.addEventListener(evt, function(elipEvent){
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
                        const countdown15Button = document.querySelector('.countdown15-task-option');
                        ['click','keyup'].forEach(function(e){
                            countdown15Button.addEventListener(e, function(event){
                                if((e === 'click') || (event.keyCode === 13)) {

                                    addOverlay();

                                    //bring the timer container above the overlay
                                    timerContainer.style.zIndex = 1001;

                                    makeElementsNotKeyboardTabbable();

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
                                }
                    }) 
                 })
                }

                })

            })

        }); 
    }

    function countDown25ClickStart(){

        const ellipsisArray = document.querySelectorAll('.task-options');

        ellipsisArray.forEach(function(ellipsis){
            ['click','keyup'].forEach(function(evt){
                ellipsis.addEventListener(evt, function(elipEvent){
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
                        const countdown25Button = document.querySelector('.countdown25-task-option');
                        ['click','keyup'].forEach(function(e){
                            countdown25Button.addEventListener(e, function(event){
                                if((e === 'click') || (event.keyCode === 13)) {
                                    makeElementsNotKeyboardTabbable();

                                    //Add the overlay
                                    addOverlay();

                                    //bring the timer container above the overlay
                                    timerContainer.style.zIndex = 1001;
                                    

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
                                }
                                })
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

        // let countdownType = document.getElementById('countdown15-timer-title').textContent;

        // if (countdownType === "Countdown 15"){
        //     clearInterval(countdown15);
        // } else if (countdownType === "Countdown 25"){
        //     clearInterval(countdown25); 
        // }

        //cant clear interval here. It will save 15 minutes. 
          
        // pauseButton.style.display = "none";
        // playButton.style.display = "inline-block";
        
        
        //!FIX: change this to a well styled modal.
        if(confirm("Do you want to save this time to this task?")){

                //calls save time function which will save seconds and long form time on the associated task object.
                saveTimeToTask(timerTitle.id, seconds);
                 
                removeTimerFromDom(); //test this when get chance.

                removeOverlay();

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

            xButton.addEventListener('keyup', function(event){
                if(event.keyCode === 13){
                    event.preventDefault();
                    xButton.click();
                }
            })
            
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
                
                removeTimerFromDom();
                removeOverlay();
                makeElementsKeyboardTabbableAgain();        
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

            let typeOfTimer = document.querySelector('.timer-title');
            if (playing == true){
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

            let thisTask = timerTitle.textContent;
            
            if(confirm(`Do you want to save this time to ${thisTask}?`)){
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
                removeTimerFromDom();
                removeOverlay();
                makeElementsKeyboardTabbableAgain();
                location.reload();
         
            } 
            return playing = false; 
        })
    }
    function saveTimeToTask(id, seconds){

        //select the timer titles to use to determine which timer is being played.
            var minutesInSeconds;
            
             let typeOfTimer = document.querySelector('.timer-title');
               
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
        
        const ellipsisArray = document.querySelectorAll('.task-options');
        ellipsisArray.forEach(function(ellipsis){
             //for each of these event types do the following:
            ['click','keyup'].forEach(function(evt){
                 //listen for either of the above on ind. elipsises. passing on the specific elip in elipEvent
                ellipsis.addEventListener(evt, function(elipEvent){
                     //if the evt is click or the keyup event is a tab...
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
        
                const manuallyEditTimeButton = document.querySelector('.edit-task-time-task-option');
                      
                // manuallyEditTimeButton.addEventListener('click', function(event){
                    $(manuallyEditTimeButton).bind('click keyup', function(event){

                        if((event.type === 'click') || (event.type === 'keyup') && (event.keyCode === 13)) {
                              
                                //Find the task clicked on and save in parentDiv.
                                let parentDiv = event.target.closest('.task');

                                //get the id of that task
                                let taskToTargetId = parentDiv.children[2].id;

                                //get the <p> where the time is described long form.
                                let pElementToTarget = parentDiv.firstElementChild;

                                //take that <p> string</p> and divide it on the spaces to isolate the numbers.
                                let timeToEdit = pElementToTarget.textContent.split(" ");
                                let timeArray = []

                                //transform each of the string time numbers into numbers and push them to timeArray
                                timeToEdit.forEach(function(item){
                                    if (item.length === 5){
                                        timeArray.push(parseInt(item.slice(0,2)));
                                    } else if(item.length === 6){
                                        timeArray.push(parseInt(item.slice(0,3)));
                                    } else if(item.length === 7){
                                        timeArray.push(parseInt(item.slice(0,4)));
                                    } else if(item.length === 8){
                                        timeArray.push(parseInt(item.slice(0,5)));
                                    } else if(item.length === 9){
                                        timeArray.push(parseInt(item.slice(0,6)));
                                    } else if(item.length === 10){
                                        timeArray.push(parseInt(item.slice(0,7)));
                                    } else if(item.length === 11){
                                        timeArray.push(parseInt(item.slice(0,8)));
                                    }else {
                                        timeArray.push(parseInt(item.slice(0,1)));
                                    }
                                });
                                let hoursToEdit = timeArray[0];
                                let minutesToEdit = timeArray[1];
                                let secondsToEdit = timeArray[2];

                                //Hide icons for when edit time is open so user can't go clicking around places.
                            
                                parentDiv.children[1].classList.add('hidden');
                                parentDiv.children[3].classList.add('hidden');
                                parentDiv.children[4].classList.add('hidden');
                                parentDiv.children[5].classList.add('hidden');

                                //if there's no save time button already there then ....
                                if (!document.querySelector('.edit-time-save-button')){ 

                                    //adding overlay to focus user on editing the time and not doing anything else. 
                                    addOverlay();

                                    //bring the task above the overlay so the user can access the edit boxes.
                                    parentDiv.style.zIndex = 1001;

                                    makeElementsNotKeyboardTabbable();
                                    
                                    //add the class for this layout
                                    parentDiv.classList.add('edit-time-task');

                                    //select the task description
                                    let taskToTarget = parentDiv.children[2];
                                   
                                    taskToTarget.classList.add('edit-time-task-description');
                                    taskToTarget.classList.remove('task');

                                    function createNewInputsForManualTimeEdit(timeMeasure, timeToEdit){
                                        const newLabel = document.createElement('LABEL');
                                        newLabel.setAttribute("for", "edit"+timeMeasure);
                                        newLabel.textContent = timeMeasure+":";
                                        newLabel.setAttribute("class", "editTime edit-time-"+timeMeasure.toLowerCase()+"-label");
                                        pElementToTarget.parentNode.insertBefore(newLabel, pElementToTarget);
                                        const newTime = document.createElement("INPUT");
                                        newTime.setAttribute("type", "number")
                                        newTime.setAttribute("value", `${timeToEdit}`);
                                        newTime.setAttribute("id", "edit"+timeMeasure);
                                        newTime.setAttribute("class", "editTime edit-time-"+timeMeasure.toLowerCase());
                                        newTime.setAttribute("oninput", "validity.valid||(value='')");
                                        newTime.setAttribute("min", "0");
                                        
                                        pElementToTarget.parentNode.insertBefore(newTime, pElementToTarget);
                                    }

                                    createNewInputsForManualTimeEdit("Hours", hoursToEdit);
                                    createNewInputsForManualTimeEdit("Minutes", minutesToEdit);
                                    createNewInputsForManualTimeEdit("Seconds", secondsToEdit);

                                    //remove the <p></p> time in longform.
                                    parentDiv.removeChild(pElementToTarget);

                                    //create the save button. REFACTOR
                                    const saveButton2 = document.createElement('BUTTON');
                                    saveButton2.setAttribute("class", "edit-time-save-button");
                                    saveButton2.setAttribute("type", "submit");
                                    saveButton2.textContent = "Save New Total Time";

                                    //add the save button after the seconds input.
                                    document.getElementById('editSeconds').after(saveButton2);

                                    //create the cancel button. REFACTOR
                                    const cancelButton = document.createElement('BUTTON');
                                    cancelButton.setAttribute("class", "edit-time-cancel-button");
                                    cancelButton.setAttribute("type", "submit");
                                    cancelButton.textContent = "Cancel Changes & Exit";

                                    //add the cancel button after the save button.
                                    saveButton2.after(cancelButton);

                                    //click event listener on the save button. //no need for both save button vars.
                                    let saveBtn = document.querySelector('.edit-time-save-button');
                                    saveBtn.addEventListener('click', function(){

                                        //take the value in each of the time segments. 
                                        let hoursToSave = document.getElementById('editHours');
                                        let minutesToSave = document.getElementById('editMinutes');
                                        let secondsToSave = document.getElementById('editSeconds');

                                        let hoursToAdd = hoursToSave.value;
                                        let minutesToAdd = minutesToSave.value;
                                        let secondsToAdd = secondsToSave.value;
                    
                                        //translate that time to seconds
                                        let minutesInSeconds = minutesToAdd * 60;
                                        let hoursInSeconds = hoursToAdd * 3600;
                                        let timeToAdd = parseInt(secondsToAdd) + minutesInSeconds + hoursInSeconds;

                                        //translate those seconds to long form

                                        let longFormTimeToAdd = timer.convertSecondsToTime(timeToAdd);


                                        //id matching loop - updates the totalTimeFocusedOnTask.
                                        for (let i=0; i<list.taskList.length; i++){
                                            if (list.taskList[i].id == taskToTargetId){
                                                list.taskList[i].totalTimeFocusedOnTask = timeToAdd;
                                                list.taskList[i].totalTimeFocusedOnTaskLongForm = longFormTimeToAdd; 
                                            }
                                        }
                                        
                                        //remove the save button
                                        parentDiv.removeChild(saveBtn);
                                        parentDiv.classList.remove('edit-time-task');

                                        //remove the cancel button
                                        parentDiv.removeChild(cancelButton);

                                        //remove / destroy all the new elements 
                                        parentDiv.removeChild(document.getElementById('editSeconds'));
                                        parentDiv.removeChild(document.querySelector('.edit-time-seconds-label'));
                                        parentDiv.removeChild(document.getElementById('editMinutes'));
                                        parentDiv.removeChild(document.querySelector('.edit-time-minutes-label'));
                                        parentDiv.removeChild(document.getElementById('editHours'));
                                        parentDiv.removeChild(document.querySelector('.edit-time-hours-label'));    
                                        
                                        parentDiv.style.zIndex = 0;

                                        //bring back all the required elements in correct order
                                        
                                        //bring back the updated longform time <p>  
                                        let insertBeforeNode = parentDiv.children[0];

                                        let updatedTime = document.createElement('P');
                                        updatedTime.setAttribute('class', 'total-task-time');
                                        updatedTime.textContent = `${longFormTimeToAdd}`;
                                        // let newTime = 
                                        parentDiv.insertBefore(updatedTime, insertBeforeNode);

                                        //bring back checkbox
                                        parentDiv.children[1].classList.remove('hidden');
                                     
                                        //remove special class from description
                                        parentDiv.children[2].classList.remove('edit-time-task-description');
                                        //bring back the icons
                                        parentDiv.children[3].classList.remove('hidden');
                                        parentDiv.children[4].classList.remove('hidden');
                                        parentDiv.children[5].classList.remove('hidden');

                                        makeElementsKeyboardTabbableAgain();
                                        removeOverlay();
                                        list.setDataToLocalStorage();
                                        location.reload();//updates the charts with new times - ask FEMI
                                    })

                                    let cancelBtn = document.querySelector('.edit-time-cancel-button');
                                    cancelBtn.addEventListener('click', function(){

                                        let longFormTimeToAdd = list.taskList[taskToTargetId].totalTimeFocusedOnTaskLongForm;
                                        
                                        //remove the save button
                                        parentDiv.removeChild(saveBtn);
                                        parentDiv.classList.remove('edit-time-task');

                                        //remove the cancel button
                                        parentDiv.removeChild(cancelButton);

                                        //remove / destroy all the new elements 
                                        parentDiv.removeChild(document.getElementById('editSeconds'));
                                        parentDiv.removeChild(document.querySelector('.edit-time-seconds-label'));
                                        parentDiv.removeChild(document.getElementById('editMinutes'));
                                        parentDiv.removeChild(document.querySelector('.edit-time-minutes-label'));
                                        parentDiv.removeChild(document.getElementById('editHours'));
                                        parentDiv.removeChild(document.querySelector('.edit-time-hours-label'));    
                                        
                                        parentDiv.style.zIndex = 0;

                                        //bring back all the required elements in correct order
                                        
                                        //bring back the updated longform time <p>  
                                        let insertBeforeNode = parentDiv.children[0];

                                        let updatedTime = document.createElement('P');
                                        updatedTime.setAttribute('class', 'total-task-time');
                                        updatedTime.textContent = `${longFormTimeToAdd}`;
                                        // let newTime = 
                                        parentDiv.insertBefore(updatedTime, insertBeforeNode);

                                        //bring back checkbox
                                        parentDiv.children[1].classList.remove('hidden');
                                     
                                        //remove special class from description
                                        parentDiv.children[2].classList.remove('edit-time-task-description');
                                        //bring back the icons
                                        parentDiv.children[3].classList.remove('hidden');
                                        parentDiv.children[4].classList.remove('hidden');
                                        parentDiv.children[5].classList.remove('hidden');

                                        makeElementsKeyboardTabbableAgain();
                                        removeOverlay();                   
                                    })
                                }
                                $(this).unbind('click', arguments.callee);
                                $(this).unbind('keyup', arguments.callee);
                            }
                            });
                        }
                    })
                })
            })
        }
  
    function addOverlay(){
        let pageBody = document.getElementsByTagName('BODY')[0]
        let overlayEl = document.createElement("DIV");
        overlayEl.setAttribute("class", "overlay");
        // let overlay = document.querySelector('.overlay');

        pageBody.appendChild(overlayEl);
    }
    function removeOverlay(){
        let overlay = document.querySelector('.overlay');
        let pageBody = document.getElementsByTagName('BODY')[0];
        pageBody.removeChild(overlay);
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
                    <input class="taskCheckbox" type="checkbox" checked>
                    <li class="task-description completed" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a class="task-stopwatch" ><i class="fas fa-stopwatch start-stopwatch" tabindex=0></i></i></a>
                    <a class="task-sort" tabindex=0><i class="fas fa-sort sort-tasks-icon"></i></a>
                    <a class="task-options" aria-label="task-options-ellipsis" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;

            } else if(taskList[i].completed === false) {
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox">
                    <li class="task-description" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a class="task-stopwatch"><i class="fas fa-stopwatch start-stopwatch"  tabindex=0 ></i></i></a>
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
        const newTaskInput = document.querySelector('#new-task-input');

        newTaskInput.addEventListener('keyup', function(event){
            if(event.keyCode === 13){
                event.preventDefault();
                addNewTaskButton.click();
            }
        })

        addNewTaskButton.addEventListener('click', function(){ //event listener working. 
        
            let newTaskInputValue = newTaskInput.value;

            if((newTaskInputValue !== null) && (newTaskInputValue !== "")){
                let newTask = new Task(newTaskInputValue); //creates a new Task obj. & sets its props.
                newTask.id = list.taskList.length; //it will always be 1to1.
                newTask.totalTimeFocusedOnTask = 0;
                list.taskList.push(newTask); //adds the new task into the taskList array.

                //adds the task to the list in html  
                document.getElementById('list').innerHTML +=
                `<div class="task">
                    <p class="total-task-time">${newTask.totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox">
                    <li class="task-description" id="${newTask.id}">${newTask.taskDescription}</li>
                    <a class="task-stopwatch" ><i class="fas fa-stopwatch start-stopwatch" tabindex=0 ></i></i></a>
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
                location.reload(); //to fix stopwatch click start bug on new tasks that are added. ASK FEMI
               

            } else if ((newTaskInputValue === "") || (newTaskInputValue === null)){ //this doesn't fire with spaces - look into that. 
                alert("Please add a task."); 
            }
            
        })
    }
    editTask(){
        const ellipsisArray = document.querySelectorAll('.task-options');

        ellipsisArray.forEach(function(ellipsis){
            ['click','keyup'].forEach(function(evt){
                ellipsis.addEventListener(evt, function(elipEvent){
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
                         const editTaskButton = document.querySelector('.edit-task-option');
                        ['click','keyup'].forEach(function(e){
                            editTaskButton.addEventListener(e, function(event){
                                if((e === 'click') || (event.keyCode === 13)) {
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

                                }
                            })
                        })
                    }
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
            ['click','keyup'].forEach(function(evt){
                ellipsis.addEventListener(evt, function(elipEvent){
                    if((evt === 'click') || (elipEvent.keyCode === 9)) {
                         const deleteTaskButton = document.querySelector('.delete-task-option');
                        ['click','keyup'].forEach(function(e){
                            deleteTaskButton.addEventListener(e, function(event){
                                if((e === 'click') || (event.keyCode === 13)) {
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
                plugins: [hideOnPopperBlur],
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

/************************************************ CHARTS & D3.js  **************************************************/

// var radius = Math.min(width, height) / 2;

// change(data);





d3.select("button#total")
     .on("click", function () {

var chartSvg = document.querySelector('.chart-svg');

console.log(chartSvg);

    if(chartSvg){
       d3.select(chartSvg).remove(); 
    }

    

const data = list.taskList;

    var width = 1350;
    var height = 550;
    var radius = 150;
    var donutWidth = 75;
    var color = d3.scaleOrdinal()
        .range(["#33A8C7", "#52E3E1", "#A0E426", "#FDF148", "#FFAB00", "#F77976", "#F050AE", "#D883FF", "#9336FD"]); //colours for slices/ arcs
    
    var svg = d3.select('#charts') //select the charts div
        .append("svg") //create an svg el
        .attr("class", "chart-svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr('transform', 'translate(' + (250) + ',' + (height  / 2) + ')'); //where the chart sits in the svg box
        
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

    var path = svg.selectAll("path") // the different slices as paths.
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d){   
            return color(d.data.taskDescription)
            
        })
        .attr("stroke", "white")
        .style("stroke-width", "4px")
       
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

    var legend = svg.selectAll('.legend') //the legend and placement
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'circle-legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = 20 * legendRectSize + 13;
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
        return  `${d.taskDescription} : ${d.totalTimeFocusedOnTaskLongForm}`; 
    });

     });

            // change(getTodayTasks());
            // console.log(getTodayTasks())
    
    d3.select("button#today")
        .on("click", function () {

            var chartSvg = document.querySelector('.chart-svg');

            console.log(chartSvg);

            if(chartSvg){
            d3.select(chartSvg).remove(); 
            }

        const data = getTodayTasks();

    var width = 1350;
    var height = 550;
    var radius = 150;
    var donutWidth = 75;
    var color = d3.scaleOrdinal()
        .range(["#33A8C7", "#52E3E1", "#A0E426", "#FDF148", "#FFAB00", "#F77976", "#F050AE", "#D883FF", "#9336FD"]); //colours for slices/ arcs
    
    var svg = d3.select('#charts') //select the charts div
        .append("svg") //create an svg el
        .attr("width", width)
        .attr("height", height)
        .attr("class", "chart-svg")
        .append("g")
        .attr('transform', 'translate(' + (250) + ',' + (height  / 2) + ')'); //where the chart sits in the svg box
        
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

    var path = svg.selectAll("path") // the different slices as paths.
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d){   
            return color(d.data.taskDescription)
            
        })
        .attr("stroke", "white")
        .style("stroke-width", "4px")
       
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

    var legend = svg.selectAll('.legend') //the legend and placement
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'circle-legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = 20 * legendRectSize + 13;
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
        return  `${d.taskDescription} : ${d.totalTimeFocusedOnTaskLongForm}`; 
    });
            
        })

function change(dataToChange) {
     var pie = d3.pie()
     .value(function (d) {
          return d.totalTimeFocusedOnTask;
     }).sort(null)(dataToChange);
     var width = 350;
     var height = 350;
     var radius = Math.min(width, height) / 2;
     var donutWidth = 75;
     path = d3.select("#charts")
          .selectAll("path")
          .data(pie); // Compute the new angles
     var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
     path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition

     var legend = svg.selectAll('.legend');
     legend
    .data(dataToChange)
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {       
        return  `${d.taskDescription} : ${d.totalTimeFocusedOnTaskLongForm} : this should change`; 
    });
}

function getTodayTasks(){
    
    let tasks = list.taskList;
    let dateTimeNow = new Date();
    let dateNow = dateTimeNow.toLocaleDateString();
    let timeNow = dateTimeNow.toLocaleTimeString();
    let todaysTasks = [];

    for (let i=0; i<tasks.length; i++){
        
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
    for(var i=0; i < todaysTasks.length; i++) {
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
   
    
    todaysTasksFiltered.forEach(task => task.totalTimeFocusedOnTask = task.timeToAdd );
    todaysTasksFiltered.forEach(task => task.totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(task.totalTimeFocusedOnTask));

    return todaysTasksFiltered;
}

