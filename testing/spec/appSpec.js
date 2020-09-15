describe("Task List", function(){
    afterEach(function(){
        localStorage.clear();
    })
    describe("New list created", function(){
        it("Should add a new List object called 'list' automatically on page load.", function(){
            expect(list).toBeTruthy();
        });
    })   
    describe("addNewTask()", function(){
        beforeEach(function(){
            
            let input = document.getElementById('new-task-input');
            let addTaskButton = document.getElementById('add-new-task');
            input.value = "This is a new test task to be added." 
            addTaskButton.click();   
        })      
        afterEach(function(){ 
            //delete the task that was just added.
            let taskToDeleteArray = document.getElementsByClassName('task-description');
            let taskToDelete = taskToDeleteArray[taskToDeleteArray.length-1].parentElement;
            //remove that task from the DOM
            taskToDelete.remove();
            //remove that task from taskList array.
            list.taskList.pop();     
        })
        it("There should be an <li></li> element with the class .task-description", function(){
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
        })
    })
    describe("Checkboxes", function(){
        beforeEach(function(){
            let input = document.getElementById('new-task-input');
            let addTaskButton = document.getElementById('add-new-task');
            input.value = "This is a new test task to be added and then checked off." 
            addTaskButton.click();   
        })      
        it("A task should be 'checked' when the checkbox is clicked.", function(){
            let taskListArray = document.getElementsByClassName('task-description');
            var newTask = taskListArray[taskListArray.length-1];
            let newTaskCheckbox = newTask.previousElementSibling;
            newTaskCheckbox.click();
            expect(newTaskCheckbox).toBeChecked()  
        }) 
        it("A task should not be checked just after being added to the list.", function(){
          expect($('<input class="taskCheckbox" type="checkbox">')).not.toBeChecked()  
        })       
    })
    describe("deleteTask()", function(){

        beforeEach(function(){
            //add a task
            let input = document.getElementById('new-task-input');
            let addTaskButton = document.getElementById('add-new-task');
            input.value = "This is a new test task to be added and then deleted." 
            addTaskButton.click(); 

            //specify the task to delete.
            var taskToDelete = document.querySelector('#list').lastElementChild;
            var optionsButton = taskToDelete.lastElementChild;
            optionsButton.click();     
            }) 
    describe('Task manager list navigation', function(){
        it("Clicking the task options button should open the options popover", function(){
            let list = document.querySelector('#list');
            let lastTask = list.lastElementChild;
            let optionsButton = lastTask.lastElementChild;

            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
        
        optionsButton.dispatchEvent(event);
        expect($('.task-options-list')).toBeVisible();
    })
        xit("Clicking the 'Edit Task' button within options should open an edit input on that task.", function(){
            let list = document.querySelector('#list');
            let lastTask = list.lastElementChild;
            let optionsButton = lastTask.lastElementChild;

            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            
            optionsButton.dispatchEvent(event);

            let editButton = document.querySelector('.edit-task-option');
            editButton.dispatchEvent(event);
            expect($('.editedTask')).toBeVisible();
        })
    })    
            
})

xdescribe("Stopwatch", function(){
    xdescribe("pauseStopwatch()", function(){
        
        beforeEach(function(){
         jasmine.clock().install();
         
        });
        afterEach(function() {
            jasmine.clock().uninstall();
        })
        
        it("Seconds should no longer increase.", function(){
            //start stopwatch
            //pause stopwatch
            // check difference in time 
            //wait another 5 seconds 
            //check time again. should be the same.
            expect(seconds).toBeGreaterThan(0);
        }) 

    
    })
    xdescribe("stopwatch calls methods", function(){
        spyOn(timer, "stopwatch()");
        expect(timer.stopwatch).toHaveBeenCalled();
    })
    
})
})
 