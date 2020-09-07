// A main task list that should be an array of task Objects

let taskList = {};
let timeSegment = 0;

// A Task Class that has all the properties and methods associated with a task

class Task {
    constructor(taskDescription){
        this.taskDescription = taskDescription; //obvz - the only essential prop to create a new task obj.
        this.completed = false; //obvz.
        this.order = -1; //order of priority in list - will use to structure list order
        this.totalTimeFocusedOnTask = null; //running total of time focused on a specific task
    }

    //Add all the methods associated with a task here:

    //edit a task
    edit(){
        return "This should run a function that edits the task in the DOM."
    }

    //countdown15 - should this be a method on  task or should it just be its own function and the method is to call that function on a task? Ask Femi?
    countdown15(){
        setTimeout(function(){
            alert("15 Minutes is up! This is an alarm!")
        }, 900000)
    }
    //countdown25 - same as above - I think the method should just call a countdown25 function.
    countdown25(){
        setTimeout(function(){
            alert("15 Minutes is up! This is an alarm!")
        }, 15000000)
    }
    //opentimer - open ended timer applying time to the task - but I need a separate time segment in case the time needs to be deleted / cancelled
    // before being added - should there be a time segment object? Or just a global variable? probably just need a global var.

    
}

let newTask45 = new Task("Testing this function");

console.log(newTask45);


//FUNCTIONS TO WRITE

function createNewTask(){
    let taskDescription = document.querySelector('#new-task-input').value;
    if (taskDescription) {
        let newTask = new Task(taskDescription);
        document.getElementById('list').innerHTML +=
            `<div class="task">
                <p>0h0m0s</p>
                <input type="checkbox" id="task${newTask.order}" name="task${newTask.order}">
                <li>${newTask.taskDescription}</li>
                <i class="fas fa-sort"></i>
                <i class="fas fa-ellipsis-v"></i>
            </div>`;
        document.querySelector('#new-task-input').value = "";
        }
    
}


//1. createNewTask() --> instantiates a new task object and adds it to the list & saves to local storage.

//2. countDown15 --> starts a countdown timer for 15 mins. 

//3 CountDown25 --> starts a countdown timer for 25 mins.

//4. Pause timer - function to apply to all timers to pause them?

//5. Reset timer.

//6. Save countdown time to total task focus time. --> Applies to either countdown or open ended timer. When the user clicks save or X they are prompted to "Save this time to task(better
//phrasing"

//7. Take total task time and create pie/bubble charts from it - D3.js? 



//Should there be a "TIME" object? - no. Maybe just a series of functions that the Task obj calls? 

// Time segment obj - properties:
// - timeSaved temporarily
//  countdown 15 method - as time countsdown that time is pushed into the temp.time segment var.
// countdown 25 - same as above. 
// save time -- saves time in the temp time segment var into the task time variable of the associated task. 
// clear time. -- clears out the temp time segment - if the timer is cancelled. or after use. 




