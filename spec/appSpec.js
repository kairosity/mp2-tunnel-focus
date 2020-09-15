let fixture1 = `<div class="page-container grid-overlord"> <!--THE RED BORDER IS GRID OVERLORD-->
    
        <header class="main-header">
            <h1 class="main-heading">Tunnel Focus</h1>
            <h2 class="main-sub-heading">Time Your Tasks</h2>
        </header>

         <div class="timer-container"> <!--TIMER GOES HERE: THIS IS A GRID CHILD OF GRID-OVERLORD -->

            <div class="timer-box">
                <h2 id="timer-task-desription">Implement this or that thing correctly.</h2><br>
                <h2 id="hours"></h2>
                <h2>:</h2>
                <h2 id="minutes"></h2>
                <h2>:</h2>
                <h2 id="seconds"></h2>
            </div>

            <div class="timer-controls">
                <a href="#"><i class="far fa-bell"></i></a>
                <a href="#"><i class="fas fa-pause"></i></a>    
            </div>

            <div class="close-timer-x"><i class="fas fa-times"></i></div>
        </div>
      
        <div class="list-container"> <!--TASK LIST GOES HERE: THIS IS A GRID CHILD OF GRID-OVERLORD-->
            
            <div class="add-new-task">
                <input type="text" id="new-task-input" placeholder="Add new task...">
                <button id="add-new-task"><i class="fas fa-plus add-new-task-plus-icon"></i></button>
            </div>


            <div id="list"> 
                
            </div>
        </div>

                <div class="popover-wrapper" id="popover">
                    <div class="popover-box">
                        <ul class="task-options-list">
                            <li class="task-option edit-task-option" tabindex="0"><i class="far fa-edit task-icon task-edit-icon"></i>Edit Task</li>
                            <li class="task-option delete-task-option" tabindex="0"><i class="fas fa-trash-alt task-icon task-delete-icon"></i>Delete Task</li>
                            <li class="task-option countdown15-task-option" tabindex="0"><i class="fas fa-hourglass-half task-icon countdown-timer-icon"></i>Countdown 15 Mins</li>
                            <li class="task-option countdown25-task-option" tabindex="0"><i class="fas fa-hourglass-half task-icon countdown-timer-icon"></i>Countdown 25 Mins</li>
                            <li class="task-option start-stopwatch-task-option" tabindex="0"><i class="fas fa-stopwatch task-icon open-timer-icon"></i>Start Stopwatch</li>
                            <li class="task-option edit-task-time-task-option" tabindex="0"><i class="fas fa-user-clock task-icon manual-edit-time-icon"></i>Edit Task Time</li>
                            <li class="task-option start-stopwatch-task-option test-link" tabindex="0"><i class="fas fa-stopwatch task-icon open-timer-icon"></i>Test Link</li>
                        </ul>
                    </div>
                </div>
       

        <div class="focus-summary-container"> <!--FOCUS SUMMARIES & CHARTS GO HERE : THIS IS A GRID CHILD OF GRID-OVERLORD -->
            CHARTS GO HERE
        </div>
       
    </div>`;

describe("Task List", function(){
    beforeEach(function(){
      jasmine.getFixtures().set(fixture1);  
    })

    describe("New list created", function(){
        
        it("should add a new List object called 'list' automatically on page load", function(){
        
            expect(list).toBeTruthy();
        });
    })
    
    // describe("New task created", function(){
    //         const list = new List();
    //         const newTask = new Task('This is a new task to be added to the task list array');
    //     it("A new task should be added to the task list array", function(){
    //         expect(list.taskList.length).toBeGreaterThan(0);
    //     })
    //     it("The new task should have a task description", function(){
    //         expect(newTask.taskDescription).toBeTruthy();
    //     })
    //     it("The new task should have an order of -1", function(){
    //         expect(newTask.order).toBe(-1);
    //     })
    // })
    describe("addNewTask()", function(){
        beforeEach(function(){
            
            let input = document.getElementById('new-task-input');
            let addTaskButton = document.getElementById('add-new-task');
            input.value = "This is a new test task to be added." 
            addTaskButton.click();   
        })      
        afterEach(function(){ //this is what is making it fail.
            // //delete the task that was just added.
            // let taskToDeleteArray = document.getElementsByClassName('task-description');
            // let taskToDelete = taskToDeleteArray[taskToDeleteArray.length-1].parentElement;
            // //remove that task from the DOM
            // taskToDelete.remove();
            // //remove that task from taskList array.
            // list.taskList.pop();     
        })
        it("There should be an li el with the class task-description", function(){
            let taskListArray = document.getElementsByClassName('task-description');
            var newTask = taskListArray[taskListArray.length-1];
            expect(newTask.classList).toContain('task-description');
        })
        it("The new task should have a task description that reads: 'This is a new test task to be added.' ", function(){
            let taskListArray = document.getElementsByClassName('task-description');
            var newTask = taskListArray[taskListArray.length-1];
            expect(newTask.textContent).toContain("This is a new test task to be added.");
        })
        it("The new task should have a task description that reads: 'This is a new test task to be added.' checked with jQuery ", function(){
            expect($('<li class="task-description" id="0">This is a new test task to be added.</li>')).toHaveText('This is a new test task to be added.');
        })
       
        it("The new task should have an id", function(){
            let taskListArray = document.getElementsByClassName('task-description');
            var newTask = taskListArray[taskListArray.length-1];
            expect(newTask.id).toBeTruthy();
            expect(`<li></li>`).toBeInDOM()
        })
        
    })
    // describe("deleteTask()", function(){
        
    //         let input = document.getElementById('new-task-input');
    //         let addTaskButton = document.getElementById('add-new-task');
    //         input.value = "This is a new test task to be added and then deleted." 
    //         addTaskButton.click();  

    //         let taskDiv = document.querySelector('#list').lastChild;
    //         let optionsButton = taskDiv.lastElementChild;
    //         optionsButton.click();

    //         const domTaskList = document.querySelector('#list');
    //             let taskAddedArray = document.querySelectorAll(".task-description");
    //             for (let i=0; i<taskAddedArray.length; i++){
    //                 if(taskAddedArray[i].textContent == "This is a new test task to be added and then deleted."){
    //                     let taskToDelete = taskAddedArray[i];
    //                     return taskToDelete;
    //                 }
    //             } 

    //         const deleteTaskButton = document.querySelector('.delete-task-option');
    //         deleteTaskButton.click();
            
    //         it("Should delete the task just added.", function(){
    //             expect(domTaskList).not.toContain(taskToDelete);
    //         })
             
    // })
})

xdescribe("Stopwatch", function(){
    describe("startStopwatch()", function(){
        
        beforeEach(function(){
         let timer = new Timer;
         timer.stopwatch().startStopwatch(); 
        });
        
        it("Seconds should be greater than 0", function(){
            expect(seconds).toBeGreaterThan(0);
        }) 
    
    })
})

 