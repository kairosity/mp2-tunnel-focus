xdescribe("Task List", function(){
    describe("New list created", function(){
        xit("should add a new List object called 'list' automatically on page load", function(){
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
    xdescribe("addNewTask()", function(){
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
        it("The new task should have an id", function(){
            let taskListArray = document.getElementsByClassName('task-description');
            var newTask = taskListArray[taskListArray.length-1];
            expect(newTask.id).toBeTruthy();
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

    