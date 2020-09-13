# **Tunnel Focus Testing**

# Application Logic / Structure

This task manager application is based on the principles of Object-Oriented Programming. Its logic is structured around 3 objects that interact: a Task object, a List object and a Timer object. 
In its incipient stages I had sketched out functionality based on a series of functions and event listeners and I saw how quickly that structure becomes unwieldly. The classes I have used compartmentalize 
the code and make it far easier to manage. I've noticed particularly how useful objects are for maintaining a clean global scope, with almost no variables.



# JavaScript


## **Timer Class**

## Timer.buildTimer():





## Timer.stopwatch():
This method encapsulates the Stopwatch or "open timer" functionality. The idea being that a user might want to start timing 
their work on a particular task and then manually stop it when they are finished. It includes a series of functions that make the 
stopwatch work correctly. It intialises three local variables in which to store the passage of time.



- ## startStopwatch() 

    __FUNCTION SUMMARY:__ This function starts the stopwatch. When it is called, the seconds variable is incremented by 1, if the seconds variable is at 60, it is reset to 0. The same
    logic is applied to minutes. The hours variable increases ad infinitum. Three DOM variables are used to represent this logic in the DOM. This function is then passed 
    to a setInterval function, and called once every second, thus updating the timer.

    ### __*Manual Testing*__

    __ISSUE 1:__ When creating my Timer object, I tried initialising the times to 00:00:00 and discovered that ```"Octal literals are not allowed in strict mode."``` 
    This refers to prefixing numbers with 0. 

    __FIX 1:__ I used template literals to add leading 0s for numbers less than 9. 

    __ISSUE 2:__ Even though I initialised the time properties to integers - when they are written dynamically in the DOM they are converted to strings. Here is an example of 
    one of the unanticipated side-effects of this:

    ![issue2](misc-images/timer-issue-1.png)

    __FIX 2:__ I found that for the purpose of this application it's fine that the html representation of time is in string form. The conversion  to strings is automatic, 
    and when I work with the total time I will convert those strings back to numbers. To fix the multiplying 1s, I left the conversion from strings to numbers up to the browser.

    __ISSUE 3:__ The stopwatch timer was working perfectly for counting seconds, but when it got to 59 minutes & 59 seconds it then showed: 00:60:00 for a second before changing to 01:00:01.
    ![issue3](misc-images/timer-issue-3.png)![issue3](misc-images/timer-issue-2.png)

    __FIX:__ I had written an IF / ELSE IF statement for my timing logic:


            if(seconds >= 60){
                seconds = 0;
                minutes = minutes + 1;
            } else if(minutes >= 60){
                minutes = 0;
                hours = hours + 1;
            }

The ELSE IF was making it impossible for the seconds to be greater or equal to 60 at the same time as the minutes were greater or equal to 60. 
So the program was just running the seconds logic first and pushing them to 0 and only then running the minutes logic, at which point minutes were already at 60.


            if(seconds >= 60){
                seconds = 0;
                minutes = minutes + 1;
            } 
            if(minutes >= 60){
                minutes = 0;
                hours = hours + 1;
            }

Changing the code to two IF statements as above, fixed the issue. 

### __Unit Testing__





- ## pauseStopWatch()
    __FUNCTION SUMMARY:__ Pauses the stopwatch. 
    ### __*Manual Testing*__

    ### __*Unit Testing*__

- ## resetStopWatch()
    __FUNCTION SUMMARY:__ Resets the stopwatch. 
    ### __*Manual Testing*__

    ### __*Unit Testing*__


## Task Class

### *Properties*: 
- taskDescription (string)
- id (integer)
- completed (boolean)
- order (integer)
- totalTimeFocusedOnTask (integer)

### *Methods*:
- 
- 

## Task.addTimeToTask()
### __*Manual Testing*__

### __*Unit Testing*__


## List Class
### *Properties*: 
- taskList (array of objects)

### *Methods*:
- buildTaskList()
- addNewTask()
- toggleTaskComplete()
- editTask()
- deleteTask()
- dynamicPopoverNav()
- setDataToLocalStorage()


## List.buildTaskList()

__METHOD SUMMARY__: This method takes the tasks stored in local storage and writes them to the DOM for use. If there is nothing saved in local storage an empty array is returned from the Class definition and that is used. 
The method loops through each task stored in the taskList array and divides them into complete and incomplete tasks. 
### __*Manual Testing*__
__ISSUE 1:__ When writing tasks to the DOM, I needed to find a way to distinguish between completed and not completed tasks.

__FIX 1:__ Firstly I used the aforementioned if / else if conditional logic within the loop of tasks in the task array, dividing the html blocks into those with "checked" and those without.

__FIX 2:__ The other necessity to logging the completed tasks correctly was to call the toggleTaskComplete() method within buildTaskList()

### __*Unit Testing*__
## addNewTask()
__METHOD SUMMARY__: This method adds a new task to the DOM and also saves it into the taskList array as a Task Object. 
### __*Manual Testing*__
__ISSUE 1:__ Empty strings are being loggied as new tasks. I have conditional code saying ```if((newTaskInput !== null) && (newTaskInput !== "")){``` only then allow a new task 
to be created, and this works to a degree. If a user doesn't write anything and tries to add a task, they are blocked from doing so. However if they press the space bar a few times, 
a new empty string is added as a task. 

__FIX 1:__ -- As yet unfixed. 

__ISSUE 2:__ I needed to find a way to connect the Task Object in memory to the representation of the task in the DOM. 

__FIX 2:__ My first solution was to link the objects and DOM elements using the task descriptions. I figured that if I pushed the tasks into the array based on comparing what the user 
has entered as a task - then the task descriptions are always going to be identical, and I can therefore summon the task object using the html task and vice-versa.

__ISSUE 3:__ When manually testing this function, conjointly with the editTask() and deleteTask() functions, I discovered a massive flaw.  If a user writes in two identical tasks, and proceeds
to edit or delete one of them, the entire app would break as it would not be able to discern between the two and know which to delete or edit. 

__FIX 3:__ My solution was to change from using task descriptions to using ids. The Task object ids are set when they are initialised and they are based on the current length of the taskList array.
This way the ids will always run from 0 upwards and they will always match the id attributes of their html counterparts, which are set on the ```<li>``` task elements. This solution also led to a series
of bugs discussed [here](LINK TO delete() bugs).  


### __*Unit Testing*__

## editTask()

__METHOD SUMMARY__: This method takes the ```<li>``` that holds the task description and replaces it in the DOM with an input element that uses the li's task description attribute as it's value. The user can then edit the input and click on a save button to save the new task description.

### __*Manual Testing*__

__ISSUE 1:__ Once the user had clicked to "edit task" button, they were free to click on it again, as many times as they wanted which could lead to this situation:  

![edit-task-issue](misc-images/edit-task-issue.png)

__FIX 1:__ I added a conditional that only allowed the edit method to be called if the save button was not already in the DOM: ```if (!document.querySelector('.save-button')){```

### __*Unit Testing*__

## 4. toggleTaskComplete()

__METHOD SUMMARY__:

### __*Manual Testing*__

### __*Unit Testing*__

## 5. deleteTask()
__METHOD SUMMARY__:

### __*Manual Testing*__

__ISSUE 1:__ When I changed the connection between Task objects and their html representations from the task descriptions to the task ids, it led to 
the following bug: when a user deletes a task, it is removed from the html and the taskList array. Therefore when a new task in instantiated based on 
the length of the taskList array, it is most likely that there will be two tasks with the same id number in the array. Again this would completely break the application.

__FIX 1:__ I fixed this by using two small for loops that run just after tasks are deleted. The first re-numbers the task object ids from 0 upwards: 
        
                        let tList = list.taskList;
        
                        for (let i=0; i<tList.length; i++){
                            tList[i].id = i;
                        }

And the second re-numbers the DOM tasks also from 0 upwards: 

                        let arrOfDomTasks = document.querySelectorAll('.task-description');
                        
                        for (let i=0; i<arrOfDomTasks.length; i++){
                        arrOfDomTasks[i].id = i.toString();
                        }

This way the html tasks and Task objects will always have the same ids and can therefore be connected seamlessly.

__ISSUE 2:__ This solution however, created another bug that behaved oddly. If a user loads a previously saved list from local storage, adds some tasks and then checks off some of the new tasks, and then 
adds another task, the checkmarks were disappearing on some of the newer additions. They still had a "checked" attribute when investigated and they still had the "complete" class assigned to them to draw the 
line through them, but the application was not registering the visual checkmark on the page. I debugged this using the Chrome JavaScript debugger, and the breakpoints pointed at the particular method causing the 
error. The addNewTask method calls the toggleTaskComplete() method when it finishes running, to ensure that checkmark capability is available for the new task added. The debugger pointed to the part of 
the toggleTaskComplete() method where it checks if the item is 'checked' and if it is to add the class "completed". For some reason, this is where the actual ticks in the checkboxes were being removed 
from the items. I found that adding: ```checkbox.setAttribute("checked", true)``` fixed the issue by explicitly forcing the "checked" attribute on all new task additions.


### __*Unit Testing*__

## 6. dynamicPopoverNav()
__METHOD SUMMARY__:
### __*Manual Testing*__

__ISSUE1:__ The popover. For my application's wireframed design to work, I needed to dynamically summon the navigation popover (containing edit, delete, timers etc...), on a specific task, as all the options
relate to a particular task. They are not general. I created an array of ellipsis icons that I iterated through and added an event listener for clicks. When any of the icons were clicked the popover would appear over the associated icon. 
I started by using getBoundingClientRect() as illustrated below. 

            const ellipsisArray = document.querySelectorAll('.task-options');
            const popover = document.getElementById('popover');

            ellipsisArray.forEach(icon=>{
                icon.addEventListener('click', function(event){
                    let ellipsis = event.target;
                    console.log(ellipsis.getBoundingClientRect());
                    popover.style.top = (ellipsis.getBoundingClientRect().y).toString()+"px";
                    popover.style.left = (ellipsis.getBoundingClientRect().x - 95).toString()+"px";

                    window.addEventListener('scroll', function(){
                        popover.style.top = (ellipsis.getBoundingClientRect().y).toString()+"px";
                        popover.style.left = (ellipsis.getBoundingClientRect().x - 95).toString()+"px";
                    })

                    popover.style.zIndex = "1";
                    
                })
            })
            if(popover.style.zIndex === "1"){
                !ellipsisArray.addEventListener('click', function(){
                    console.log("something else clicked.")
                })
            }

__FIX 1:__ I added an amount of px to the top and left of this, but that didn't work as the top and left values are dependent on page scroll. I.e. when I scrolled 
up the page, the location of the popover shifted dramatically. I needed to make it relative to the ellipsis itself **and** responsive to scroll events. I started 
playing around with the x & y offsets on the page, and then in an angry burst of stack overflowing, I happened upon tippy.js, which enabled me to implement the exact 
functionality I wanted in less than 15 minutes. Long live tippy.js

### __*Unit Testing*__

## 7. setDataToLocalStorage()
__METHOD SUMMARY__: A short method to stringify the taskList array and save its data to localStorage. This method is called whenever the user changes or adds to their
tasks. 
### __*Manual Testing*__

- This actually required a good bit of testing and moving the method around to understand where and how it was saving the data. 

__ISSUE 1:__ Initially I had not realised that every time localStorage is set, it completely overwrites the previous save. I had initially set it to save after each individual 
task was created, which of course meant that there was only ever a single task saved. 

__FIX__ 1: I made sure that the method was placed so as to save the entire list each time localStorage is set.

### __*Unit Testing*__




