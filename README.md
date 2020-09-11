# Tunnel Focus: Time Your Tasks
## Code Institute Milestone Project 2: Interactive Front-End Development

This is a task manager with a difference. 
Breaking large projects up into smaller tasks is a great way to get things done efficiently. 

Sometimes focusing on a task "until it's done" is not a good way to get things done, as your mind can wander and concentration can lag.

Focusing in small bursts and maintaining intense focus for small periods of time, punctuated by regular breaks can yield massive benefits in terms of work effiency.

This web application has been conceptualised and designed around that premise. 

It works as a simple task manager, except that it also keeps track of how long a user works on a particular task. The app is built to encourage and track a sprint-like methodology, or focused work for 
shorter periods of time. 

# UX

## User Stories 

### First Time User Stories

- As a first time user, I want to be able to easily and clearly understand the purpose of this web application.

- As a user:
- I want to be able to add tasks to a list.
- I want to be able to edit a task.
- I want to be able to check off tasks when they are completed.
- I want to be able to delete a task.

- I want to be able to start the focus timer when I start working on a particular task.
- I want to be able to pause the focus timer if I take a break. 
- I want to be able to reset the focus timer for that particular segment of time, if for whatever reason I don't actually focus on work.

- I want to be able to start a countdown timer for work on a particular task.
- I want to be able to select whether the countdown timer runs for 15 or 25 minutes.
- When the countdown timer ends, I want to be alerted with an audio alarm and/or a visual display. 
- As a user with a small sleeping child, I want to have the option of turning off the audio alarm and relying on just 
a visual indication that the countdown is over.

- As a user, I want to be able to start an open-ended timer for longer sessions working on a particular task.
- I want to be alerted after every 30 minutes working with the open-ended timer.
- If I forget that the open-ended timer is running, I want to be able to delete that segment of time and not have it added to the total
time spent focused on that task.  

- I want to know how much time I have spent on each task today.
- I want to know how much time I have spent on each task overall. 
- I want to know how much time I have spent focused and working today.
- I would like to see this information displayed in pleasing and easy to comprehend charts and visuals.
- I would like to see a list of what tasks I completed today.

### Returning User Stories

- As a returning user, I want my tasks to be stored and recalled when I navigate to the webpage.

### Accessibility User Stories
- As a user who is hard of hearing, I want there to be a visual display when the countdown timer ends. 

## Strategy

### __*Project Goals*__
- Create a time based task manager for project development 
- Create a simple product that can be used in the browser and with local storage.
- Create a product that is intuitive and useful for anyone working on a particular set of tasks. 
- Create a product that is scalable and has potential to develop further into a fully blown application with database storage. 
- Create an application that has clean lines and is minimal in design. 
- Bright toned design, whites, light greys and an accent colour or two.
- Encourage the use of sprint methodology when working to complete tasks.

### __*Target Users*__
The target users are people working on a series of tasks and particularly people employing a sprint methodology for task completion. 

### __*Research*__
I researched other task managers online and found a number that have similar functionality, but all were behind paywalls. I could not find a free and simple
task manager with timer functionality


## Scope
- A todo list with timer functionality. 
- I resisted adding a heap of other functions that I believe would add immense value to the application, but the application itself would become 
too large and unworkable in its current manifestation as a lightweight localStorage based app. 
- I kept coming back to the original idea of todo list with timer + basic chart analysis. 
- The scope was defined because it is an app I have regularly wanted to use without committing to a monthly fee. 
- I may expand on it after this project is completed. 
- Very tempted to add an option to customise lists. To be able to create new lists for different categories.

## Structure

- I have designed this as a relatively simple application with 1 page on desktop screens and two/three views on medium and mobile screens.
- On desktop everything will be visible at once. 
    - When you click on timer via a task, the timer will open in an area above the task list.
    - the task list will take center stage 
    - The charts and summary of what has been accomplished will go beneath the tasklist.


## Skeleton

- On desktop - hierarchical tree structure top to bottom. 
- On mobile more of a new page experience - spoke and hub. Timer opens a new frame / window. As do charts. 
- This was for display purposes as well. - Too hard to view everything in the one window and unlike a typical website, the application does not espouse 
a scrolling interaction. It is more functional, therefore when you click on a timer, the timer functionality must appear. It would not be ok to have to scroll or look
for the timer. 


[My full Figma workspace for this project can be viewed here](https://www.figma.com/file/3LBKUPc79uP1qAKMfSBXKs/Wireframes1?node-id=0%3A1)

__*Alternatively here are the individual wireframes in pdf format:*__

If you choose to view them this way, please click download as the GitHub viewer expands the smaller wireframes to an uncomfortably large zoom ratio.

## Surface
- Typography - Clean sans-serif
- Design puts list front and center and because there are a number of elements in play, I want to keep it as minimal as possible, to avoid
overwhelming the user with colour and charts. 


# Features

- If you write your task in without capitalizing the first letter, it does that for you.
- Affirmations API is fed in under Timer. 
- A chart to show how long you spent on each task in the past 24hours.
- A chart to show the full length of time spent on each task.
- A list of all completed tasks. 

# Accessibility

# Future Release Features

1. Connecting to a database and creating user accounts with proper storage and retrieval of data. 
2. Connect up API for Google Calendar. 
3. Add due-dates to tasks. 
4. Adding project / category functionality. 
5. Wage calculations for people who are paid per hour/ on a time basis. Very useful for freelancers who operate by time expended.
6. Daily/weekly/monthly view of time spent working on each task/project. - Automated graphs with D3.js

# Testing

- Manipulating the DOM and working out how to access the objects referred to by the HTML elements was challenging. The problem was that the objects were separate entities to the HTML classes. 
- I had to create a continuous linkage between the two. 
- First solution was to link them using the task descriptions. I figured that if I pushed the tasks into the array from what the user writes - then the task descriptions are always going 
to be identical, and I can therefore summon the task object using the html task and vice-versa. 
- I wasn't entirely happy with this solution, but it did work. But then I thought about the potential edge case whereby a user writes in two identical tasks. 
- That situation would break the entire app, because if they then went to edit or delete either of those tasks the application would not be able to discern between the two. 
- I discovered this while manually testing the functionality. 

- My solution was to change from using task descriptions to using ids. 
    - The task object ids are set when they are initialised and they are based on the current length of the taskList array.
    - This way, as long as I manage the rest of the code, the ids will always run from 0 upwards and they will always match the id attributes of their html counterparts. 

Problem:
When deleting a task - a user removes that task and its id from the task list array. Therefore when a new task in instantiated based on the length of the task List array, it is 
most likely that there will be two tasks with the same id number in the array. Again this would completely break the application. 

Solution:
I fixed this by using two small for loops that run just after tasks are deleted. The first re-numbers the task object ids from 0 upwards: 
        
                        let tList = list.taskList;
        
                        for (let i=0; i<tList.length; i++){
                            tList[i].id = i;
                        }

And the second re-numbers the DOM tasks also from 0 upwards: 

                        let arrOfDomTasks = document.querySelectorAll('.task-description');
                        
                        for (let i=0; i<arrOfDomTasks.length; i++){
                        arrOfDomTasks[i].id = i.toString();
                        }

BUG: This solution created another bug that behaved oddly. When a user loads a previously saved list from local storage and then adds some tasks and then checks off some of the new tasks, and then 
adds another task, the checkmarks were disappearing on some of the newer additions. I debugged this using the Chrome JavaScript debugger, and the breakpoints pointed at the particular method causing the 
error. The addNewTask method calls the toggleTaskComplete method when it finishes running, to ensure that checkmark capability is available for the new task added. The debugger pointed to the part of 
the toggleTaskComplete method where it checks if the item is 'checked' and if it is to add the class "completed". For some reason, this is where the actual ticks in the checkboxes were being removed 
from the items. I found that adding: ```checkbox.setAttribute("checked", true)``` fixed the issue by explicitly forcing the "checked" attribute on all new task additions.


- I started by creating only a Task class and then a heap of functions that used that class to manipulate the DOM, but after reviewing a lot of OOP videos online, I realised I could add a List class
and use them conjointly to do almost all the manipulation without having to manage a bunch of functions in the global scope.
- So each time the HTML was updated, so too was the object in the array of tasks.



- Ran into issue with local storage. Didn't realise that it overwrote each time you called. localStorage.set method. 
Fix: I created a local storage method on the List Object. 

- PROBLEM: The popover. I want to dynamically summon the navigation popover (containing edit, delete, timers etc...) 
I created an array of ellipsis icons that I iterated through and added an event listener for clicks. When any of the icons were clicked the popover would appear over the associated icon. 
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

I added an amount of px to the top and left of this, but that didn't work as the top and left values are dependent on page scroll. I.e. when I scrolled 
up the page, the location of the popover shifted dramatically. I needed to make it relative to the ellipsis itself **and** responsive to scroll events. I started 
playing around with the x & y offsets on the page, and then in an angry burst of stack overflowing, I happened upon tippy.js, which enabled me to implement the exact 
functionality I wanted in less than 15 minutes. Long live tippy.js.

PROBLEM: When creating my Timer object, I tried initialising the times to 00:00:00 and discovered that "Octal literals are not allowed in strict mode." I've discovered that this refers to prefixing numbers with 0. 
FIX: I will just add string "0"s on to my timer for numbers less than 9. 
PROBLEM: Even though I initialised the time properties to integers - when they are written dynamically in the DOM they are converted to strings. 
FIX: I found that for the purpose of this application it's ok that the html representation of time is in string form. The conversion is automatic to strings, and then when I work with the total time I will have to 
convert those strings back to numbers. 

# Issues / Room For Improvement

# Attribution

# Deployment

# Tools & Other Resources Used 

## 1. Design 

- ### **[Dribble](https://dribbble.com/)**

    Used for UX and design inspiration.


- ### **[Awwwards](https://www.awwwards.com/)**

    Used for design inspiration.

- ### **[Coolors](https://coolors.co/)**
    Used to select the colour palette for the project, as well as to generate the printed palette.

- ### **[Figma](https://www.figma.com/)**
    Used for wireframing and mock-ups

- ### **[Google Fonts]()**
    All fonts used are google fonts.

- ### **[Font Awesome]()**
    Most of the icons used are from Font Awesome.

## 2. HTML & CSS

- ### **[CSS Tooltip](https://www.w3schools.com/css/css_tooltip.asp)**
    W3Schools information about using and writing CSS tooltips.

- ### **[CSS Cursor Property](https://www.w3schools.com/cssref/pr_class_cursor.asp)**
    W3Schools information about using the different cursors.

## 3. JavaScript

- ### **[OOP in JavaScript: Made Super Simple](https://www.youtube.com/watch?v=PFmuCDHHpwk)**
    YouTube Tutorial by Mosh.

- ### **[Working with Objects - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)**
    MDN JS Objects Overview.

- ### **[The find() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)**
    MDN information on the find() array method. 

- ### **[EveryThing You Need to Know About Local Storage](https://www.boldare.com/blog/everything-you-need-to-know-about-local-storage/)**
    Useful reference for how to use local storage.

- ### **[Local Storage Info](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)**
    MDN Local Storage reference. 

- ### **[Positioning popovers & tooltips](https://dev.to/atomiks/everything-i-know-about-positioning-poppers-tooltips-popovers-dropdowns-in-uis-3nkl)**
    An excellent reference and summary of the amount of factors you have to take into account when trying to position elements dynamically in the DOM.    

- ### **[Traversing the DOM with JavaScript](https://zellwk.com/blog/dom-traversals/)**
    A super useful article on DOM traversal with Vanilla JS.

- ### **[Information about Octal Literals](https://stackoverflow.com/questions/34358331/why-are-octal-numeric-literals-not-allowed-in-strict-mode-and-what-is-the-worka?lq=1)
    A stack overflow discussion about Octal Literals and how to get around using them. 

## 4. General

- ### **[How to Write a Git Commit Message - Chris Beams](https://chris.beams.io/posts/git-commit/)**
    Great post about writing commits for Git.

- ### **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**
    More specifications about commits.

- ### **[Debugging in Chrome](https://javascript.info/debugging-chrome)**
    Information about Chrome Debugging tools. 

## 5. Frameworks

- ### **[tippy.js](https://atomiks.github.io/tippyjs/v6/getting-started/)**
    A wonderful JavaScript framework for tooltips, popovers, dropdowns & menus. Best thing since sliced bread.
# Technology Used

- HTML
- CSS
- JavaScript
- D3.js
- tippy.js 
- Git 
- GitHub
- GitPod

# Acknowledgements