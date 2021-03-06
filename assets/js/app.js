// --------------------------------------GLOBAL VARIABLES-------------------------------//
var taskToDel = "";
var confirmDeletionModal = document.getElementById('confirm-deletion-modal');
let confirmDeletionBtn = document.querySelector('.deletion-confirm-button');
let negateDeletionBtn = document.querySelector('.deletion-negate-button');
// --------------------------------------GLOBAL EVENT LISTENERS--------------------------//
confirmDeletionBtn.addEventListener('click', confirmDeletion);
negateDeletionBtn.addEventListener('click', negateDeletion);
// --------------------------------------GLOBAL FUNCTIONS-------------------------------//
/**
 * This function runs when a user confirms a task deletion. 
 * It first removes a task from the taskList array in localStorage and then resets the localStorage task ids and timeSegment array ids to run from 0 upwards, so that the tasks always perfectly sync. 
 * It then resets the ids of the DOM tasks so they match the tasks in localStorage. 
 * Then it hides the delete task modal and saves changes. 
 */
function confirmDeletion() {
	let taskToDeleteId = taskToDel.children[2].id;
	taskToDel.remove();
	//Removes the Task from the taskList array.
	list.taskList.splice(list.taskList.findIndex(task => task.id == taskToDeleteId), 1);
	//resets the Task object ids & timeSegment ids to run from 0 upwards.
	let tList = list.taskList;
	for (let i = 0; i < tList.length; i++) {
		tList[i].id = i;
		for (let j = 0; j < tList[i].timeSegments.length; j++) {
			tList[i].timeSegments[j].id = i;
		}
	}
	//resets the ids of the DOM tasks to link up with the tasks in local Storage so they all sync. 
	let arrOfDomTasks = document.querySelectorAll('.task-description');
	for (let i = 0; i < arrOfDomTasks.length; i++) {
		arrOfDomTasks[i].id = i.toString();
	}
	confirmDeletionModal.style.display = "none";
	list.setDataToLocalStorage();
	timer.makeArrayElementsKeyboardTabbableAgain();
	location.reload();
}
/**
 * This function runs when a user cancels a task deletion. 
 * It hides the delete task modal and sets the global variable of taskToDel back to empty. 
 */
function negateDeletion() {
	confirmDeletionModal.style.display = "none";
	timer.makeArrayElementsKeyboardTabbableAgain();
	taskToDel = "";
	location.reload();
}
// --------------------------------------CLASSES-------------------------------//
class Timer {
	constructor() {
		this.seconds = 0;
		this.minutes = 0;
		this.hours = 0;
	}
	/**
	 * This function initialises the timer variables and
	 * formats them with leading 0s so they look nice.
	 */
	initialiseTimer() {
		let secondsHtml = document.getElementById('seconds');
		let minutesHtml = document.getElementById('minutes');
		let hoursHtml = document.getElementById('hours');
		secondsHtml.innerHTML = `0${this.seconds}`;
		minutesHtml.innerHTML = `0${this.minutes}`;
		hoursHtml.innerHTML = `0${this.hours}`;
	}
	/**
	 * This method converts seconds into long form time. 
	 * Thank you to Wilson Lee on Stack Overflow for this code - attributed in README. 
	 */
	convertSecondsToTime(seconds) {
		let hoursConverted = Math.floor(seconds / 3600);
		let minutesConverted = Math.floor(seconds % 3600 / 60);
		let secondsConverted = Math.floor(seconds % 3600 % 60);
		return `${hoursConverted}hrs ${minutesConverted}mins ${secondsConverted}secs`;
	}
	/**
	 * This method adds an overlay to the page making certain elements inaccessible to the user.
	 */
	addOverlay() {
		let pageBody = document.getElementsByTagName('BODY')[0];
		let overlayEl = document.createElement("DIV");
		overlayEl.setAttribute("class", "overlay");
		pageBody.appendChild(overlayEl);
	}
	/**
	 * This method removes the overlay.
	 */
	removeOverlay() {
		let overlay = document.querySelector('.overlay');
		let pageBody = document.getElementsByTagName('BODY')[0];
		pageBody.removeChild(overlay);
	}
	/**
	 * This method adds a silent alarm class to the overlay. 
	 */
	addSilentAlarm() {
		let overlay = document.querySelector('.overlay');
		overlay.removeAttribute("class", "overlay");
		overlay.setAttribute("class", "silent-alarm");
	}
	/**
	 * This method removes the silent alarm class from the overlay. 
	 */
	removeSilentAlarm() {
		let silentAlarm = document.querySelector('.silent-alarm');
		let pageBody = document.getElementsByTagName('BODY')[0];
		pageBody.removeChild(silentAlarm);
	}
	/**
	 * This method makes a number of elements inaccessible to keyboard users.  
	 */
	makeArrayElementsNotKeyboardTabbable() {
		const addNewTaskButton = document.querySelector('#add-new-task');
		const newTaskInput = document.querySelector('#new-task-input');
		const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
		const arrayOfOptionIcons = document.querySelectorAll('.task-options');
		let startStopwatchButtonArray = document.querySelectorAll('.start-stopwatch');
		const skipTasks = document.querySelector('#skip-tasks');
		let chartsSelectBox = document.querySelector('#chart-selections');
		let infoIcon = document.querySelector('.fa-question-circle');
		newTaskInput.setAttribute("tabindex", "-1");
		addNewTaskButton.setAttribute("tabindex", "-1");
		arrayOfCheckboxes.forEach(function(checkbox) {
			checkbox.setAttribute("tabindex", "-1");
		});
		startStopwatchButtonArray.forEach(function(stopwatch) {
			stopwatch.setAttribute("tabindex", "-1");
		});
		arrayOfOptionIcons.forEach(function(optionicon) {
			optionicon.setAttribute("tabindex", "-1");
		});
		skipTasks.setAttribute("tabindex", "-1");
		chartsSelectBox.setAttribute("tabindex", "-1");
		infoIcon.setAttribute("tabindex", "-1");
	}
	/**
	 * This method makes a number of elements accessible again to keyboard users.  
	 */
	makeArrayElementsKeyboardTabbableAgain() {
		const addNewTaskButton = document.querySelector('#add-new-task');
		const newTaskInput = document.querySelector('#new-task-input');
		const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
		const arrayOfOptionIcons = document.querySelectorAll('.task-options');
		let startStopwatchButtonArray = document.querySelectorAll('.start-stopwatch');
		const skipTasks = document.querySelector('#skip-tasks');
		let chartsSelectBox = document.querySelector('#chart-selections');
		let infoIcon = document.querySelector('.fa-question-circle');
		newTaskInput.setAttribute("tabindex", "0");
		addNewTaskButton.setAttribute("tabindex", "0");
		arrayOfCheckboxes.forEach(function(checkbox) {
			checkbox.setAttribute("tabindex", "0");
		});
		startStopwatchButtonArray.forEach(function(stopwatch) {
			stopwatch.setAttribute("tabindex", "0");
		});
		arrayOfOptionIcons.forEach(function(optionicon) {
			optionicon.setAttribute("tabindex", "0");
		});
		skipTasks.setAttribute("tabindex", "0");
		chartsSelectBox.setAttribute("tabindex", "0");
		infoIcon.setAttribute("tabindex", "0");
	}
	/**
	 * This method brings up the information modal when the question mark is clicked. 
	 * An overlay is added. 
	 * Elements are made not keyboard tabbable.
	 * The modal is brought in front of the page.
	 * If the X close button is clicked the pages reverts as it was before.
	 */
	appInformation() {
		let infoIcon = document.querySelector('#info');
		let infoModal = document.querySelector('#information-modal');
		infoIcon.addEventListener('keyup', function(event) {
			if (event.keyCode === 13) {
				infoIcon.click();
			}
		});
		infoIcon.addEventListener('click', function() {
			timer.addOverlay();
			timer.makeArrayElementsNotKeyboardTabbable();
			infoModal.style.zIndex = 1001;
			infoModal.style.display = "table";
			let closeButton = document.querySelector('.close-info-x');
			closeButton.addEventListener('click', function() {
				timer.removeOverlay();
				timer.makeArrayElementsKeyboardTabbableAgain();
				infoModal.style.zIndex = -900;
				infoModal.style.display = "none";
			});
		});
	}
	timers() {
		// --------------------------------------TIMER CLASS VARIABLES-------------------------------//
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
		const alarm = document.createElement('AUDIO');
		alarm.setAttribute('src', 'assets/audio/alarm1.mp3');
		let alarmButton = document.querySelector('.alarm');
		const beep = document.createElement('AUDIO');
		beep.setAttribute('src', 'assets/audio/beep.mp3');
		let secondsHtml = document.getElementById('seconds');
		let minutesHtml = document.getElementById('minutes');
		let hoursHtml = document.getElementById('hours');
		// --------------------------------------HELPER FUNCTIONS-------------------------------//
		/**
		 * This function removes the timer modal from the DOM.
		 * And resets the timer variables to 0
		 * And resets the html representations of the timer variables to 0.
		 */
		function removeTimerFromDom() {
			let timerTitleInDOM = document.querySelector('.timer-title');
			timerContainer.removeChild(timerTitleInDOM);
			timerContainer.style.display = "none";
			playButton.style.display = "";
			pauseButton.style.display = "inline-block";
			seconds = 0;
			minutes = 0;
			hours = 0;
			secondsHtml.innerHTML = `0${seconds}`;
			minutesHtml.innerHTML = `0${minutes}`;
			hoursHtml.innerHTML = `0${hours}`;
			playing = false;
		}
		/**
		 * This function creates a specific title for the timer modal, based on whether the timer is stopwatch, countdown for 15 minutes or countdown for 25 minutes. 
		 */
		function createTimerTitle(timerType, timerId) {
			let timerTypeTitle = document.createElement('h2');
			timerTypeTitle.textContent = `${timerType}`;
			timerTypeTitle.setAttribute('id', `${timerId}`);
			timerTypeTitle.setAttribute('class', 'timer-title');
			timerTypeTitle.style.display = 'flex';
			timerContainer.insertAdjacentElement('afterbegin', timerTypeTitle);
		}
		/**
		 * This function formats the time and distinguishes between singular and double digits, so as to place a leading 0 on single digit time measures 00:01:09 for example, as opposed to 0:1:9.
		 */
		function formatTime(seconds, minutes, hours) {
			if (seconds <= 9) {
				secondsHtml.innerHTML = `0${seconds}`;
			} else {
				secondsHtml.innerHTML = seconds;
			}
			if (minutes <= 9) {
				minutesHtml.innerHTML = `0${minutes}`;
			} else {
				minutesHtml.innerHTML = minutes;
			}
			if (hours <= 9) {
				hoursHtml.innerHTML = `0${hours}`;
			} else {
				hoursHtml.innerHTML = hours;
			}
		}
		/**
		 * This function resets the countdown timer to either 00:15:00 or 00:25:00.
		 */
		function resetCountdownHtml(seconds, minutes, hours) {
			secondsHtml.innerHTML = `0${seconds}`;
			minutesHtml.innerHTML = `${minutes}`;
			hoursHtml.innerHTML = `0${hours}`;
		}
		/**
		 * This function scrolls a specific element into view for the user. 
		 */
		function scrollElementIntoView() {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
		/**
		 * This function loops through an indeterminate number of parameters and makes each of them untabbable.
		 */
		function makeElementsUntabbable(...elements) {
			elements.forEach(element => element.setAttribute("tabindex", "-1"));
		}
		/**
		 * This function loops through an indeterminate number of parameters and makes each of them tabbable.
		 */
		function makeElementsTabbable(...elements) {
			elements.forEach(element => element.setAttribute("tabindex", "0"));
		}
		/**
		 * This function hides the task icons.
		 */
		function hideTaskIcons(taskLine) {
			taskLine.children[1].classList.add('hidden');
			taskLine.children[3].classList.add('hidden');
			taskLine.children[4].classList.add('hidden');
			taskLine.children[5].classList.add('hidden');
		}
		/**
		 * This function shows the task icons.
		 */
		function showTaskIcons(taskLine) {
			taskLine.children[1].classList.remove('hidden');
			taskLine.children[3].classList.remove('hidden');
			taskLine.children[4].classList.remove('hidden');
		}
		/**
		 * This function creates save & cancel buttons.
		 */
		function createButton(buttonType) {
			const button = document.createElement('BUTTON');
			button.setAttribute("class", `edit-time-${buttonType}-button`);
			button.setAttribute("type", "submit");
			if (buttonType == "save") {
				button.textContent = "Save";
			} else if (buttonType == "cancel") {
				button.textContent = "Cancel";
			}
			return button;
		}
		/**
		 * This function takes an array of times as strings and turns it into an array of times as integers and formats them correctly.
		 */
		function makeTimeNumbersFromStrings(arrayOfStringTimes, arrayOfNumberTimes) {
			arrayOfStringTimes.forEach(function(item) {
				if (item.length === 5) {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 2)));
				} else if (item.length === 6) {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 3)));
				} else if (item.length === 7) {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 4)));
				} else if (item.length === 8) {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 5)));
				} else if (item.length === 9) {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 6)));
				} else if (item.length === 10) {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 7)));
				} else if (item.length === 11) {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 8)));
				} else {
					arrayOfNumberTimes.push(parseInt(item.slice(0, 1)));
				}
			});
			return arrayOfNumberTimes;
		}
		/**
		 * This function creates labels and inputs for each measure of time in the edit task modal.  
		 */
		function createNewInputsForManualTimeEdit(measureOfTime, timeVariableToEdit, longFormTime) {
			const newLabel = document.createElement('LABEL');
			newLabel.setAttribute("for", "edit" + measureOfTime);
			newLabel.textContent = measureOfTime + ":";
			newLabel.setAttribute("class", "editTime edit-time-" + measureOfTime.toLowerCase() + "-label");
			longFormTime.parentNode.insertBefore(newLabel, longFormTime);
			const newTime = document.createElement("INPUT");
			newTime.setAttribute("type", "number");
			newTime.setAttribute("value", `${timeVariableToEdit}`);
			newTime.setAttribute("id", "edit" + measureOfTime);
			newTime.setAttribute("class", "editTime edit-time-" + measureOfTime.toLowerCase());
			newTime.setAttribute("oninput", "validity.valid||(value='')");
			newTime.setAttribute("min", "0");
			newTime.setAttribute("max", "9999");
			longFormTime.parentNode.insertBefore(newTime, longFormTime);
		}
		/**
		* This function removes the elements & classes created for the edit modal and restores the original task 
		list icons, classes & div elements. 
		*/
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
			let insertBeforeNode = taskLine.children[0];
			let updatedTime = document.createElement('P');
			updatedTime.setAttribute('class', 'total-task-time');
			updatedTime.textContent = `${longFormTime}`;
			taskLine.insertBefore(updatedTime, insertBeforeNode);
			taskLine.children[2].classList.remove('edit-time-task-description');
		}
		// --------------------------------------TIMING FUNCTIONS-------------------------------//
		/**
		 * This function counts up from 0. 
		 * When seconds get to 60, they revert to 0 and 1 is added to minutes.
		 * Likewise with minutes & hours. 
		 * If the alarm is left unmuted, then every 30 seconds, the application will beep once to mark the passage of time.
		 * Finally this function calls the format time function.
		 */
		function countUp() {
			seconds = seconds + 1;
			if (seconds >= 60) {
				seconds = 0;
				minutes = minutes + 1;
			}
			if (minutes >= 60) {
				minutes = 0;
				hours = hours + 1;
			}
			if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`) {
				if ((minutes % 30 === 0) && (minutes !== 0) && (seconds === 0)) {
					beep.play();
				}
			}
			formatTime(seconds, minutes, hours);
		}
		/**
		 * This function calls the above countUp() function every second.
		 * Thus calling the formatTime() function every second. 
		 * Which is what displays the stopwatch time counting upwards from 0.  
		 */
		function stopWatchPlay() {
			stopwatch = setInterval(function() {
				countUp();
			}, 1000);
			return playing = true;
		}
		/**
		 * This function sets the initial countdown for the 15 minute countdown timer and then calls the countdown timer function.
		 */
		function countDown15Play() {
			seconds = 0;
			minutes = 15;
			hours = 0;
			countdown();
		}
		/**
		 * This function calls the countDownFunction every second. 
		 */
		function countdown() {
			countdownInt = setInterval(function() {
				countDownFunction();
			}, 1000);
			return playing = true;
		}
		/**
		 * This function countsDown by -1 second.
		 * If seconds are less than 0 and minutes are more/equal to 1 it resets seconds to 59 and substracts 1 from minutes. 
		 * It distinguishes between whether or not to play an alarm and...
		 * When seconds and minutes are both 0 it runs the clearInterval() function with countdown as a parameter.
		 * And resets the time measure variables to 0.
		 * Then it calls the countdownEnded() function.
		 * There is also an addendum if/else statement that fixes an irritating formatting bug. 
		 */
		function countDownFunction() {
			seconds = seconds - 1;
			if ((seconds < 0) && (minutes >= 1)) {
				seconds = 59;
				minutes = minutes - 1;
			}
			if ((seconds < 0) && (minutes == 0)) {
				if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`) {
					alarm.muted = true;
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
				if (seconds <= 9) {
					secondsHtml.innerHTML = `0${seconds}`;
				} else {
					secondsHtml.innerHTML = seconds;
				}
				if (minutes <= 9) {
					minutesHtml.innerHTML = `0${minutes}`;
				} else {
					minutesHtml.innerHTML = minutes;
				}
				if (hours <= 9) {
					hoursHtml.innerHTML = `0${hours}`;
				} else {
					hoursHtml.innerHTML = hours;
				}
			}
		}
		/**
		 * This function sets the initial countdown for the 25 minute countdown timer and then calls the countdown timer function. 
		 */
		function countDown25Play() {
			seconds = 0;
			minutes = 25;
			hours = 0;
			countdown();
		}
		/**
		 * The following two functions are used to determine how much time to add to a task when the 15 & 25 minute countdowns have ended.
		 * If the timer is allowed count right down to 0 then the time to add is either 900 or 1500.
		 * If not, the functions calculates the specific amount.
		 */
		function countdown15TimeToAdd(hours, minutes, seconds) {
			var minutesInSeconds = minutes * 60;
			if ((seconds == -1) && (minutesInSeconds == 0)) {
				var timeToAdd = 900;
				return timeToAdd;
			} else {
				var timeToAdd = 900 - (minutesInSeconds + seconds);
				return timeToAdd;
			}
		}

		function countdown25TimeToAdd(hours, minutes, seconds) {
			var minutesInSeconds = minutes * 60;
			if ((seconds == -1) && (minutesInSeconds == 0)) {
				var timeToAdd = 1500;
				return timeToAdd;
			} else {
				var timeToAdd = 1500 - (minutesInSeconds + seconds);
				return timeToAdd;
			}
		}
		/**
		 * This function calculates how much time to add to a task when the stopwatch function is used.
		 */
		function stopwatchTimeToAdd(hours, minutes, seconds) {
			let minutesInSeconds = minutes * 60;
			let hoursInSeconds = hours * 3600;
			var timeToAdd = seconds + minutesInSeconds + hoursInSeconds;
			return timeToAdd;
		}
		// --------------------------------------STRUCTURAL FUNCTIONS-------------------------------// 
		/**
		 * This function listens for change on the stopwatch icons.
		 * It shows the timer modal when the icon is clicked/keyboard selected. 
		 * It starts the stopwatch timer playing. 
		 * It adds an overlay to stop the user accidentially clicking elsewhere. 
		 * It sets up the timer modal using data contained in the task that was selected.
		 * And stops anything in the background of the timer from being accessible via the keyboard.
		 * It also calls all methods associated with playing, pausing, resetting & closing the timer, so they are available for use when the stopwatch is running.  
		 */
		function stopWatchClickStart() {
			startStopwatchButtonArray.forEach(function(stopwatchButton) {
				['click', 'keyup'].forEach(function(e) {
					stopwatchButton.addEventListener(e, function(event) {
						if ((e === 'click') || (event.keyCode === 13)) {
							if ((!playing) && (playButton.style.display == '')) {
								timerContainer.style.display = 'flex';
                                playing = true;
                                beep.play();
                                beep.pause();
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
								startStopwatchButtonArray.forEach(function(stopwatchButton) {
									event.preventDefault();
								});
							}
							pauseOnClick(stopwatch);
							resetTime(stopwatch);
							playOnClick();
							closeTimer();
							timer.initialiseTimer();
						}
					}, false);
				});
			});
		}
		/**
		 * This function sets up a number of foundational elements for when either of the countdown timers are selected:
		 * It adds an overlay, scrolls the timer into view, brings the timer above other elements on the z-index, and ensures that no background elements can be accessed using the keyboard. 
		 * It then formats the display time in the DOM.
		 * Then it brings up the countdown timer specific to the type of timer selected and with the specific data pertaining to the task selected (id & description etc..)
		 */
		function countdownClickStartHelper(countdownType, countdownNumber) {
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
			let tasksParentDiv = event.target.closest('.task');
			let taskToTargetId = tasksParentDiv.children[2].id;
			let taskToTargetDescription = tasksParentDiv.children[2].textContent;
			if ((!playing) && (seconds == 0) && (minutes == countdownNumber) && (hours == 0) && (playButton.style.display == '')) {
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
		/**
		 * This function listens for clicks/enters on the 15 minute countdown timer icon.
		 * If selected it initialises the alarms, calls the countdownStartHelper & plays the countdown timer.
		 * It also makes all associated countdown functions available: (pause, play, reset & close).
		 */
		function countDown15ClickStart() {
			const ellipsisArray = document.querySelectorAll('.task-options');
			ellipsisArray.forEach(function(ellipsis) {
				['click', 'keyup'].forEach(function(evt) {
					ellipsis.addEventListener(evt, function(elipEvent) {
						if ((evt === 'click') || (elipEvent.keyCode === 9)) {
							const countdown15Button = document.querySelector('.countdown15-task-option');
							countdown15Button.addEventListener('keyup', function(event) {
								if (event.keyCode === 13) {
									event.preventDefault();
									countdown15Button.click();
								}
							});
							countdown15Button.addEventListener('click', function() {
								alarm.play();
								alarm.pause();
								countdownClickStartHelper("countdown15", 15);
								countDown15Play();
								pauseOnClick(countdownInt);
								resetTime(countdownInt);
								closeTimer();
							});
						}
					});
				});
			});
		}
		/**
		 * This function listens for clicks/enters on the 25 minute countdown timer icon.
		 * If selected it initialises the alarms, calls the countdownStartHelper & plays the countdown timer.
		 * It also makes all associated countdown functions available: (pause, play, reset & close).
		 */
		function countDown25ClickStart() {
			const ellipsisArray = document.querySelectorAll('.task-options');
			ellipsisArray.forEach(function(ellipsis) {
				['click', 'keyup'].forEach(function(evt) {
					ellipsis.addEventListener(evt, function(elipEvent) {
						if ((evt === 'click') || (elipEvent.keyCode === 9)) {
							const countdown25Button = document.querySelector('.countdown25-task-option');
							countdown25Button.addEventListener('keyup', function(event) {
								if (event.keyCode === 13) {
									event.preventDefault();
									countdown25Button.click();
								}
							});
							countdown25Button.addEventListener('click', function() {
                                alarm.play();
								alarm.pause();
								countdownClickStartHelper("countdown25", 25);
								countDown25Play();
								pauseOnClick(countdownInt);
								resetTime(countdownInt);
								closeTimer();
							});
						};
					});
				});
			});
		}
		/**
		 * This function plays whichever timer is open when the play button is selected/clicked. 
		 */
		function playOnClick() {
			playButton.addEventListener('click', function() {
				let timerTitleDOM = document.querySelector('.timer-title');
				if (!playing) {
					if (timerTitleDOM.textContent == 'Stopwatch') {
						stopWatchPlay();
						resetTime(stopwatch);
						pauseOnClick(stopwatch);
					} else if ((timerTitleDOM.textContent == 'Countdown 15') || (timerTitleDOM.textContent == 'Countdown 25')) {
						countdown();
						pauseOnClick(countdownInt);
						resetTime(countdownInt);
					}
					pauseButton.style.display = "inline-block";
					playButton.style.display = "none";
				}
			});
		}
		/**
		 * This function pauses whichever timer is open for the user. 
		 */
		function pauseOnClick(intervalToPause) {
			pauseButton.addEventListener('click', function() {
				clearInterval(intervalToPause);
				pauseButton.style.display = "none";
				playButton.style.display = "inline-block";
				return playing = false;
			});
		}
		/**
		 * This function resets whichever timer the user is using.
		 * It calls on resetTimes() to reset the variables & DOM times.
		 */
		function resetTime(intervalToReset) {
			resetButton.addEventListener('click', function() {
				clearInterval(intervalToReset);
				pauseButton.style.display = "none";
				playButton.style.display = "inline-block";
				resetTimes();
				return playing = false;
			});
		}
		/**
		 * This function resets the variables & html DOM time measures of whichever timer is open. 
		 */
		function resetTimes() {
			let timerTitleDOM = document.querySelector('.timer-title');
			if (timerTitleDOM.textContent == 'Stopwatch') {
				seconds = 0;
				minutes = 0;
				hours = 0;
				secondsHtml.innerHTML = `0${seconds}`;
				minutesHtml.innerHTML = `0${minutes}`;
				hoursHtml.innerHTML = `0${hours}`;
			} else if (timerTitleDOM.textContent == 'Countdown 15') {
				seconds = 0;
				minutes = 15;
				hours = 0;
				resetCountdownHtml(seconds, minutes, hours);
			} else if (timerTitleDOM.textContent == 'Countdown 25') {
				seconds = 0;
				minutes = 25;
				hours = 0;
				resetCountdownHtml(seconds, minutes, hours);
			}
		}
		/**
		 * This function runs when either of the countdown functions have run their full course (15 or 25 minutes).
		 * If the alarm is not muted, then the alarm plays.
		 * If the alarm is muted then a silent colourful alarm plays.
		 * A modal pops up asking the user if they want to save the full time to that particular task.
		 * If they confirm the save the modal is removed & the time is saved to that particular task using the saveTimeToTask() function. 
		 * For each task in the list, if the the task id is the same as the task id in the timer then this function will display the new time to the task's long form task time property which has been updated by the saveTimeToTask() function.
		 * Then everything is cleared and reset, and the timer is removed from the DOM.
		 * If the user decides not to save the time to that task, then everything closes and nothing is saved.
		 */
		function countdownEnded() {
			if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`) {
				alarm.play();
			}
			playing = false;
			let countdownEndedModal = document.getElementById('countdown-ended-modal');
			countdownEndedModal.style.display = "block";
			let confirmButton = document.querySelector('.ce-confirm-button');
			let negateButton = document.querySelector('.ce-negate-button');
			let countdownEndedMessageElement = document.querySelector('.ce-modal-p');
			let typeOfTimer = document.querySelector('.timer-title');
			let thisTask = timerTitle.textContent;
			if (typeOfTimer.textContent == "Countdown 15") {
				countdownEndedMessageElement.textContent = `Congrats! You've worked for the full 15 minutes! Do you want to save 15 minutes to the task: ${thisTask}?`;
				if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`) {
					timer.addSilentAlarm();
				}
				clearInterval(countdownInt);
			} else if (typeOfTimer.textContent == "Countdown 25") {
				countdownEndedMessageElement.textContent = `Congrats! You've worked for the full 25 minutes! Do you want to save 25 minutes to the task: ${thisTask}?`;
				if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`) {
					timer.addSilentAlarm();
				}
				clearInterval(countdownInt);
			}
			confirmButton.addEventListener('click', function() {
				if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`) {
					timer.removeSilentAlarm();
				}
				countdownEndedModal.style.display = "none";
				saveTimeToTask(timerTitle.id, seconds);
				let idForSavingTime = timerTitle.id;
				let taskTimeDisplay1 = document.querySelectorAll('.task-description');
				for (let i = 0; i < taskTimeDisplay1.length; i++) {
					if (taskTimeDisplay1[i].id == idForSavingTime) {
						let timeDisplay = taskTimeDisplay1[i].parentElement.firstElementChild;
						timeDisplay.textContent = list.taskList[timerTitle.id].totalTimeFocusedOnTaskLongForm;
					}
				}
				clearInterval(countdownInt);
				removeTimerFromDom();
				if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`) {
					timer.removeOverlay();
				}
				playing = false;
				seconds = 0;
				minutes = 0;
				hours = 0;
				location.reload();
			});
			negateButton.addEventListener('click', function() {
				if (alarmButton.innerHTML == `<i class="fas fa-bell-slash" aria-hidden="true"></i>`) {
					timer.removeSilentAlarm();
				}
				clearInterval(countdownInt);
				countdownEndedModal.style.display = "none";
				removeTimerFromDom();
				if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`) {
					timer.removeOverlay();
				}
				playing = false;
				seconds = 0;
				minutes = 0;
				hours = 0;
				location.reload();
			});
		}
		/**
		 * This function closes the timer when the X button is entered/clicked.
		 * A modal asking the user to confirm that they want to close without saving pops up.
		 * The timer continues to run while the modal is open by design.
		 * If the user confirms closure, then the timer pauses and is removed from the DOM.
		 * If the user cancels closure the timer continues to time as before.
		 */
		function closeTimer() {
			let xButton = document.querySelector('.close-timer-x');
			xButton.addEventListener('keyup', function(event) {
				if (event.keyCode === 13) {
					event.preventDefault();
					xButton.click();
				}
			});
			xButton.addEventListener('click', function() {
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
				confirmButton.addEventListener('click', function() {
					closeTimerModal.style.display = "none";
					makeElementsTabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
					let intervalToPause;
					let typeOfTimer = document.querySelector('.timer-title').textContent;
					if (typeOfTimer == "Stopwatch") {
						intervalToPause = stopwatch;
					} else if ((typeOfTimer == "Countdown 15") || (typeOfTimer == "Countdown 25")) {
						intervalToPause = countdownInt;
					}
					if (playing) {
						clearInterval(intervalToPause);
					}
					removeTimerFromDom();
					timer.removeOverlay();
					timer.makeArrayElementsKeyboardTabbableAgain();
					location.reload();
				});
				negateButton.addEventListener('click', function() {
					closeTimerModal.style.display = "none";
					makeElementsTabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
				});
			});
		}
		/**
		 * This function listens for clicks or enter on the "save time to task" button on any of the timers. 
		 * When clicked, a modal appears asking the user to confirm that they want to save the specific time to that specific task.
		 * All elements outside the modal are rendered inaccessible.
		 * If the timer is playing, it is paused.
		 * If the save is confirmed by the user then the saveTimeToTask() function is called.
		 * Then it checks the id currently connected to the timed task against all the ids in the task list in the DOM.
		 * When the ids match it saves the time timed to the longformtime variable that displays the time next to the task. 
		 * The function then hides the modal and makes all the necessary elements accessible again.
		 * It removes the overlay and then forces a reload of the page.
		 * If the save is cancelled, the user reverts to the timer and can press play to continue timing.
		 */
		function saveTimeButton() {
			saveButton.addEventListener('keyup', function(event) {
				if (event.keyCode === 13) {
					event.preventDefault();
					saveButton.click();
				}
			});
			saveButton.addEventListener('click', function() {
				let timerTitle = document.querySelector('.timer-task-description');
				let thisTask = timerTitle.textContent;
				let saveTimeToTaskModal = document.getElementById('save-time-to-task-modal');
				saveTimeToTaskModal.style.display = "block";
				let confirmButton = document.querySelector('.sttt-confirm-button');
				let negateButton = document.querySelector('.sttt-negate-button');
				let saveTimeToTaskMessageElement = document.querySelector('.sttt-modal-p');
				let typeOfTimer = document.querySelector('.timer-title');
				let alarmButton = document.querySelector('#alarm-on');
				let pauseButton = document.querySelector('#pause');
				let playButton = document.querySelector('#play');
				let resetButton = document.querySelector('#reset');
				let closeTimerX = document.querySelector('.close-timer-x');
				makeElementsUntabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
				if (playing == true) {
					pauseButton.style.display = "none";
					playButton.style.display = "inline-block";
				}
				if (typeOfTimer.textContent == "Stopwatch") {
					saveTimeToTaskMessageElement.textContent = `Do you want to save ${hours} hours ${minutes} minutes & ${seconds} seconds to your task: "${thisTask}"? `;
					clearInterval(stopwatch);
				} else if (typeOfTimer.textContent == "Countdown 15") {
					let timeToAddInSecs = countdown15TimeToAdd(hours, minutes, seconds);
					let timeInsert = timer.convertSecondsToTime(timeToAddInSecs);
					saveTimeToTaskMessageElement.textContent = `Do you want to save ${timeInsert} to to your task: "${thisTask}"? `;
					clearInterval(countdownInt);
				} else if (typeOfTimer.textContent == "Countdown 25") {
					let timeToAddInSecs = countdown25TimeToAdd(hours, minutes, seconds);
					let timeInsert = timer.convertSecondsToTime(timeToAddInSecs);
					saveTimeToTaskMessageElement.textContent = `Do you want to save ${timeInsert} to to to your task: "${thisTask}"? `;
					clearInterval(countdownInt);
				}
				confirmButton.addEventListener('click', function() {
					saveTimeToTask(timerTitle.id, seconds);
					let idForSavingTime = timerTitle.id;
					let taskTimeDisplay1 = document.querySelectorAll('.task-description');
					for (let i = 0; i < taskTimeDisplay1.length; i++) {
						if (taskTimeDisplay1[i].id == idForSavingTime) {
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
				});
				negateButton.addEventListener('click', function() {
					saveTimeToTaskModal.style.display = "none";
					makeElementsTabbable(saveButton, alarmButton, pauseButton, playButton, resetButton, closeTimerX);
				});
				return playing = false;
			});
		}
		/**
		 * This function first checks to see which timer is being used.
		 * Then it calls a function specific to that timer than determines how much time to add to the task in seconds. 
		 * It creates a new dateStamp and creates variables to hold the date and time of when the time was added to the task.
		 * It then finds the task saved to local storage with the same id as the task being timed.
		 * And it adds the time to its time spent on task property. 
		 * It then converts the new total time in seconds to the longform time property and updates that on the task object. 
		 * Then it creates a new entry in the time Segments array of objects and includes: id, time, date & task description information for use with the charts & lists. 
		 */
		function saveTimeToTask(id, seconds) {
			let typeOfTimer = document.querySelector('.timer-title');
			let timeToAdd;
			if (typeOfTimer.textContent == "Countdown 15") {
				timeToAdd = countdown15TimeToAdd(hours, minutes, seconds);
				clearInterval(countdownInt);
			} else if (typeOfTimer.textContent == "Countdown 25") {
				timeToAdd = countdown25TimeToAdd(hours, minutes, seconds);
				clearInterval(countdownInt);
			} else if (typeOfTimer.textContent == "Stopwatch") {
				timeToAdd = stopwatchTimeToAdd(hours, minutes, seconds);
			}
			let dateStamp = new Date();
			let localTime = dateStamp.toLocaleTimeString();
			let localDate = dateStamp.toLocaleDateString();
			let taskDescription = list.taskList[id].taskDescription;
			list.taskList[id].totalTimeFocusedOnTask += timeToAdd;
			list.taskList[id].totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(list.taskList[id].totalTimeFocusedOnTask);
			list.taskList[id].timeSegments.push({
				id,
				timeToAdd,
				dateStamp,
				taskDescription,
				localDate,
				localTime
			});
			list.setDataToLocalStorage();
		}
		/**
		 * This function turns the alarm sound on and off. 
		 */
		function alarmToggle() {
			let alarmButton = document.querySelector('.alarm');
			alarmButton.addEventListener('click', function() {
				if (alarmButton.innerHTML == `<i class="fas fa-bell" aria-hidden="true"></i>`) {
					alarmButton.innerHTML = `<i class="fas fa-bell-slash" aria-hidden="true"></i>`;
				} else {
					alarmButton.innerHTML = `<i class="fas fa-bell" aria-hidden="true"></i>`;
				}
			});
		}
		/**
		 * This function listens for clicks or enters on the edit task option.
		 * It stores the task id & description,
		 * It takes the long form string of time and extracts the time numbers from that using the makeTimeNumbersFromStrings() function.  
		 * From this it stores the time measures in separate arrays to edit.
		 * It creates a save button and a cancel button using the createButton() helper function. 
		 * It hides the task icons.
		 * It adds an overlay.
		 * It brings the task above the overlay for user access.
		 * It makes elements underneath the task to edit, not tabbable. 
		 * It adds certain classes for styling the edit modal.
		 * It creates new inputs using a function for each measure of time to be edited.
		 * It removes the long form time.
		 * It adds the save & cancel buttons.
		 * It sets up the task description to edit and creates an input where that can happen.
		 * It scrolls the task description into view.
		 * It populates the time measure inputs with the time recorded on the task prior to editing.
		 * It sets the value of the edit task name input to the task description.
		 * It listens for clicks/enter on the "Save Changes" button and if confirmed and IF the task description is NOT null or an empty string...
		 * It takes what is in the input box and saves that as the new DOM task description.
		 * It then loops through the taskList in local storage and when the ids match, it updates the saved task with the input task description & makes sure that the checkmark info is passed to the newly created <li> element.
		 * It then collects any new time measure inputs and saves them too.
		 * Converting those times to seconds.
		 * It takes a snapshot of the date & time these changes were made in order to keep the "today" chart information accurate. If a task is edited, the new amount of time minused from the original time is added as a time segment in an array.
		 * Those seconds are converted to long form time.
		 * Then an ID matching loop updates the totalTimeFocusedOnTask by taking into account any changes to the time made in the edit task window. 
		 * All the new elements created for the edit modal are removed and all the original elements are brought back.
		 * The overlay is removed and the elements that were underneath it are made tabbable again. 
		 * The new data is saved to local storage and the page is reloaded to update the DOM.
		 * However IF the task description is deleted and an empty string / null value is attempted to be entered, then a modal will pop up telling the user to enter a valid task description.
		 * If the cancel button is clicked:
		 * The long form time is set as the time before the edit option was selected.
		 * The task name/description goes back to what it was.
		 * All the newly created DIVs are removed and the original elements are brought back.
		 * The icons are brought back.
		 * The overlay is removed.
		 * The data is saved & the page is reloaded.
		 */
		function editTask() {
			const ellipsisArray = document.querySelectorAll('.task-options');
			ellipsisArray.forEach(function(ellipsis) {
				['click', 'keyup'].forEach(function(evt) {
					ellipsis.addEventListener(evt, function(elipEvent) {
						if ((evt === 'click') || (elipEvent.keyCode === 9)) {
							const manuallyEditTaskButton = document.querySelector('.edit-task-option');
							manuallyEditTaskButton.addEventListener('keyup', function(event) {
								if (event.keyCode === 13) {
									event.preventDefault();
									manuallyEditTaskButton.click();
								}
							});
							manuallyEditTaskButton.addEventListener('click', function() {
								let fullTaskLine = event.target.closest('.task');
								let taskToTargetId = fullTaskLine.children[2].id;
								let taskToTarget = fullTaskLine.children[2];
								let longFormTimeToTarget = fullTaskLine.firstElementChild;
								let timeToEdit = longFormTimeToTarget.textContent.split(" ");
								let timeArray = [];
								makeTimeNumbersFromStrings(timeToEdit, timeArray);
								let hoursToEdit = timeArray[0];
								let minutesToEdit = timeArray[1];
								let secondsToEdit = timeArray[2];
								let editTaskSaveButton = createButton("save");
								let editTaskCancelButton = createButton("cancel");
								hideTaskIcons(fullTaskLine);
								timer.addOverlay();
								fullTaskLine.style.zIndex = 1001;
								timer.makeArrayElementsNotKeyboardTabbable();
								fullTaskLine.classList.add('edit-time-task');
								taskToTarget.classList.add('edit-time-task-description');
								taskToTarget.classList.remove('task');
								createNewInputsForManualTimeEdit("Hours", hoursToEdit, longFormTimeToTarget);
								createNewInputsForManualTimeEdit("Minutes", minutesToEdit, longFormTimeToTarget);
								createNewInputsForManualTimeEdit("Seconds", secondsToEdit, longFormTimeToTarget);
								fullTaskLine.removeChild(longFormTimeToTarget);
								document.getElementById('editSeconds').after(editTaskSaveButton);
								editTaskSaveButton.after(editTaskCancelButton);
								let editTaskName = document.querySelector('.edit-time-task-description');
								editTaskName.scrollIntoView();
								let taskTextToEdit = editTaskName.innerText;
								//Create Edit Task Name Input & populate with task name.
								const editTaskNameInput = document.createElement("INPUT");
								editTaskNameInput.setAttribute("type", "text");
								editTaskNameInput.setAttribute("value", `${taskTextToEdit}`);
								editTaskNameInput.setAttribute("class", "editedTask");
								editTaskNameInput.style.zIndex = "1001";
								editTaskName.parentNode.replaceChild(editTaskNameInput, editTaskName);
								let hoursInput = document.getElementById('editHours');
								let minutesInput = document.getElementById('editMinutes');
								let secondsInput = document.getElementById('editSeconds');
								let originalHours = hoursInput.value;
								let originalMinutes = minutesInput.value;
								let originalSeconds = secondsInput.value;
								//Original (pre-edited) Minutes & Hours In Seconds
								let minutesInSeconds = originalMinutes * 60;
								let hoursInSeconds = originalHours * 3600;
								//Base Time In Seconds
								let baseTime = parseInt(originalSeconds) + minutesInSeconds + hoursInSeconds;
								//New task Element for when edit modal closes
								const newTaskLi = document.createElement('LI');
								newTaskLi.setAttribute("class", "task-description");
								newTaskLi.setAttribute("id", `${taskToTargetId}`);
								newTaskLi.textContent = editTaskNameInput.value;
								editTaskSaveButton.addEventListener('click', function() {
									newTaskLi.textContent = editTaskNameInput.value;
									if ((newTaskLi.textContent !== null) && (newTaskLi.textContent !== "")) {
										newTaskLi.textContent = editTaskNameInput.value;
										editTaskNameInput.parentNode.replaceChild(newTaskLi, editTaskNameInput);
										list.taskList.forEach(task => {
											if (task.id == newTaskLi.id) {
												task.taskDescription = newTaskLi.textContent;
											}
											if ((task.id == newTaskLi.id) && (task.completed == true)) {
												newTaskLi.classList.add('completed');
											}
										});
										let hoursToAdd = hoursInput.value;
										let minutesToAdd = minutesInput.value;
										let secondsToAdd = secondsInput.value;
										let minutesInSeconds = minutesToAdd * 60;
										let hoursInSeconds = hoursToAdd * 3600;
										let totalTimeToAdd = parseInt(secondsToAdd) + minutesInSeconds + hoursInSeconds;
										let dateStamp = new Date();
										let localTime = dateStamp.toLocaleTimeString();
										let localDate = dateStamp.toLocaleDateString();
										let taskDescription = list.taskList[taskToTargetId].taskDescription;
										let id = parseInt(taskToTargetId);
										let timeToAdd = totalTimeToAdd - baseTime;
										if (totalTimeToAdd !== 0) {
											list.taskList[taskToTargetId].timeSegments.push({
												id,
												timeToAdd,
												dateStamp,
												taskDescription,
												localDate,
												localTime
											});
										}
										let longFormTimeToAdd = timer.convertSecondsToTime(totalTimeToAdd);
										for (let i = 0; i < list.taskList.length; i++) {
											if (list.taskList[i].id == taskToTargetId) {
												list.taskList[i].totalTimeFocusedOnTask = totalTimeToAdd;
												list.taskList[i].totalTimeFocusedOnTaskLongForm = longFormTimeToAdd;
											}
										}
										removeEditOptionElements(fullTaskLine, editTaskSaveButton, editTaskCancelButton, longFormTimeToAdd);
										showTaskIcons(fullTaskLine);
										timer.removeOverlay();
										timer.makeArrayElementsKeyboardTabbableAgain();
										list.setDataToLocalStorage();
										location.reload();
									} else if ((newTaskLi.textContent === "") || (newTaskLi.textContent === null)) {
										let addValidTaskModal = document.getElementById('enter-task-modal');
										addValidTaskModal.style.display = "block";
										makeElementsUntabbable(hoursInput, minutesInput, secondsInput, editTaskNameInput, editTaskSaveButton, editTaskCancelButton)
										let okButton = document.querySelector('.valid-task-confirm-button');
										okButton.addEventListener('click', function() {
											addValidTaskModal.style.display = "none";
											makeElementsTabbable(hoursInput, minutesInput, secondsInput, editTaskNameInput, editTaskSaveButton, editTaskCancelButton)
										});
									}
								});
								editTaskCancelButton.addEventListener('click', function() {
									let longFormTimeToAdd = list.taskList[taskToTargetId].totalTimeFocusedOnTaskLongForm;
									editTaskNameInput.parentNode.replaceChild(newTaskLi, editTaskNameInput);
									removeEditOptionElements(fullTaskLine, editTaskSaveButton, editTaskCancelButton, longFormTimeToAdd);
									showTaskIcons(fullTaskLine);
									timer.removeOverlay();
									timer.makeArrayElementsKeyboardTabbableAgain();
									list.setDataToLocalStorage();
									location.reload();
								});
							});
						}
					});
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
}
class Task {
	constructor(taskDescription) {
		this.taskDescription = taskDescription;
		this.id = null;
		this.completed = false;
		this.totalTimeFocusedOnTask = 0;
		this.totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(this.totalTimeFocusedOnTask);
		this.timeSegments = [];
	}
}
class List {
	constructor() {
		this.taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
		this.buildTaskList(this.taskList);
		this.addNewTask();
		this.toggleTaskComplete(this.taskList);
	}
	/**
	 * This takes all the tasks stored in taskList and adds them to the DOM on page load using a loop.
	 * The logic is divided into tasks that are completed and tasks that are not completed.
	 */
	buildTaskList() {
		let taskList = this.taskList;
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].completed === true) {
				document.getElementById('list').innerHTML += `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox" tabindex=0 aria-label="checkbox" checked>
                    <li class="task-description completed" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a class="task-stopwatch task-list-icon" aria-hidden="false" aria-label="start stopwatch"><i class="fas fa-stopwatch start-stopwatch" tabindex=0  ></i></a>
                    <a class="task-options task-list-icon" aria-hidden="false" aria-label="more options"" tabindex=0><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;
			} else if (taskList[i].completed === false) {
				document.getElementById('list').innerHTML += `<div class="task">
                    <p class="total-task-time">${taskList[i].totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox" tabindex=0 aria-label="checkbox">
                    <li class="task-description" id="${taskList[i].id}">${taskList[i].taskDescription}</li>
                    <a class="task-stopwatch task-list-icon" aria-hidden="false" aria-label="start stopwatch" ><i class="fas fa-stopwatch start-stopwatch" tabindex=0   ></i></a>
                    <a class="task-options task-list-icon" tabindex=0 aria-hidden="false" aria-label="more options"><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;
			}
		}
		this.toggleTaskComplete();
	}
	/**
	 * This method listens for a click event on the add new task button and then adds the value of the input to both the taskList 
	    and it writes it to the DOM.
	 * As long as the value is not null or an empty string. It then clears the input box ready 
	    for a new task.
	 * The function then uses the regex myTrim to remove any whitespaces from before or after the task that is inputted. (attributed in README)
	 * The function creates a new Task object & sets its properties - the new task description will be whatever the user enters into the input.
	 * The new task id will always be the length of the taskList saved in localStorage.
	 * The totalTimeFocused on that task starts at 0.
	 * Then the new task is added to both the taskList array and to the DOM. 
	 * The input is then cleared and ready to accept more new tasks.
	 * If when the user attempts to enter a task, the entry is not deemed valid, then a modal will pop up asking the user to enter a valid task. 
	 */
	addNewTask() {
		const addNewTaskButton = document.querySelector('#add-new-task');
		const newTaskInput = document.querySelector('#new-task-input');
		newTaskInput.addEventListener('keyup', function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				addNewTaskButton.click();
			}
		});
		addNewTaskButton.addEventListener('click', function() {
			let newTaskInputValue = newTaskInput.value;

			function myTrim(x) {
				return x.replace(/^\s+|\s+$/gm, '');
			}
			newTaskInputValue = myTrim(newTaskInputValue);
			if ((newTaskInputValue !== null) && (newTaskInputValue !== "")) {
				let newTask = new Task(newTaskInputValue);
				newTask.id = list.taskList.length;
				newTask.totalTimeFocusedOnTask = 0;
				list.taskList.push(newTask);
				document.getElementById('list').innerHTML += `<div class="task">
                    <p class="total-task-time">${newTask.totalTimeFocusedOnTaskLongForm}</p>
                    <input class="taskCheckbox" type="checkbox" tabindex=0 aria-label="checkbox">
                    <li class="task-description" id="${newTask.id}">${newTask.taskDescription}</li>
                    <a class="task-stopwatch task-list-icon" aria-hidden="false" aria-label="start stopwatch"  ><i class="fas fa-stopwatch start-stopwatch" aria-label="start stopwatch"  tabindex=0 ></i></a>
                    <a class="task-options task-list-icon" tabindex=0 aria-hidden="false" aria-label="more options"><i class="fas fa-ellipsis-v task-options-icon"></i></a>
                </div>`;
				document.querySelector('#new-task-input').value = "";
				list.toggleTaskComplete(list.taskList);
				list.deleteTask();
				list.dynamicPopoverNav();
				timer.timers();
				list.setDataToLocalStorage();
				location.reload();
			} else if ((newTaskInputValue === "") || (newTaskInputValue === null)) {
				let addValidTaskModal = document.getElementById('enter-task-modal');
				addValidTaskModal.style.display = "block";
				timer.makeArrayElementsNotKeyboardTabbable();
				let okButton = document.querySelector('.valid-task-confirm-button');
				okButton.addEventListener('click', function() {
					addValidTaskModal.style.display = "none";
					timer.makeArrayElementsKeyboardTabbableAgain();
				});
			}
		});
	}
	/**
	 * This method listens for checkbox clicks or enters on a specific task.
	 * If a change is detected, the method checks to see if the checkbox is checked.
	 * If it is checked then the class .completed is added and the attribute "checked" is set to true. 
	 * A date and time of the checking is also set into variables.
	 * Then the id of that task is compared to the ids of the tasks in the taskList and when they match those variables are recorded to that taskList task along with the task's new 'completed' status.
	 * When a task is checked as completed this method also checks to see if the user has got either of the completed tasks lists opened via the charts section, and if that is the case, then this method reloads the page, so as to update those lists.
	 * If the user has unchecked a task then the above steps are run in the opposite manner, completed is removed as an attribute and the completed class is also removed. The same steps apply if the user is viewing one of the completed lists in the charts section. 
	 * The changes are saved to localStorage. 
	 */
	toggleTaskComplete() {
		const arrayOfCheckboxes = document.querySelectorAll('.taskCheckbox');
		arrayOfCheckboxes.forEach(function(checkbox) {
			let checkboxId = checkbox.nextElementSibling.id;
			let chartSelection = document.getElementById('chart-selections');
			checkbox.addEventListener('change', function() {
				if (checkbox.checked == true) {
					checkbox.nextElementSibling.classList.add('completed');
					checkbox.setAttribute("checked", true);
					let dateStamp = new Date();
					let localTime = dateStamp.toLocaleTimeString();
					let localDate = dateStamp.toLocaleDateString();
					list.taskList.forEach(function(task) {
						if (task.id == checkboxId) {
							task.completed = true;
							task.timeSegments.push({
								id: task.id,
								timeToAdd: 0,
								dateStamp,
								localTime,
								localDate,
								taskDescription: task.taskDescription
							});
						}
					});
					if ((chartSelection.value === "tasks-completed") || (chartSelection.value === "tasks-completed-today")) {
						list.setDataToLocalStorage();
						location.reload();
					}
				} else if (checkbox.checked == false) {
					checkbox.nextElementSibling.classList.remove('completed');
					list.taskList.forEach(function(task) {
						if (task.id == checkboxId) {
							task.completed = false;
						}
					});
					if ((chartSelection.value === "tasks-completed") || (chartSelection.value === "tasks-completed-today")) {
						list.setDataToLocalStorage();
						location.reload();
					}
				}
				list.setDataToLocalStorage();
			})
		});
	}
	/**
	 * This method listens for clicks or enters on the delete task option.
	 * If it detects one, it brings up a modal asking the user if they are certain they want to delete that task.
	 * Then the global event listeners take over and run the confirm or negate deletion functions.
	 */
	deleteTask() {
		const ellipsisArray = document.querySelectorAll('.task-options');
		ellipsisArray.forEach(function(ellipsis) {
			['click', 'keyup'].forEach(function(evt) {
				ellipsis.addEventListener(evt, function(elipEvent) {
					if ((evt === 'click') || (elipEvent.keyCode === 9)) {
						const deleteTaskButton = document.querySelector('.delete-task-option');
						deleteTaskButton.addEventListener('keyup', function(event) {
							if (event.keyCode === 13) {
								event.preventDefault();
								deleteTaskButton.click();
							}
						});
						deleteTaskButton.addEventListener('click', function() {
							taskToDel = event.target.closest('.task');
							let deleteConfirmationMessageElement = document.querySelector('.confirm-deletion-modal-p');
							let taskNameToDelete = taskToDel.children[2].textContent;
							confirmDeletionModal.style.display = "block";
							deleteConfirmationMessageElement.textContent = `Are you sure you want to delete ${taskNameToDelete}?`;
							timer.makeArrayElementsNotKeyboardTabbable();
						});
					}
				});
			});
		});
	}
	/**
	 * This method is all taken exactly as written from the tippy.js documentation including the hideOnPopperBlur plugin directly below.
	 * It shows and hides the popover navigation using mouse and keyboard events.
	 * It has been modified to suit this application, but overall the code comes directly from tippy.js  
	 */
	dynamicPopoverNav() {
		const popover = document.getElementById('popover');
		const hideOnPopperBlur = {
			name: 'hideOnPopperBlur',
			defaultValue: true,
			fn(instance) {
				return {
					onCreate() {
						instance.popper.addEventListener('focusout', (event) => {
							if (instance.props.hideOnPopperBlur && event.relatedTarget && !instance.popper.contains(event.relatedTarget)) {
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
			fn({
				hide
			}) {
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
			fn({
				hide
			}) {
				function onSelect(event) {
					const editTaskOption = document.querySelector('.edit-task-option');
					const deleteTaskOption = document.querySelector('.delete-task-option');
					const countdown15TaskOption = document.querySelector('.countdown15-task-option');
					const countdown25TaskOption = document.querySelector('.countdown25-task-option');
					const manualEditTaskOption = document.querySelector('.edit-task-time-task-option');
					if ((event.target == editTaskOption) || (event.target == deleteTaskOption) || (event.target == countdown15TaskOption) || (event.target == countdown25TaskOption) || (event.target == manualEditTaskOption)) {
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
			plugins: [hideOnPopperBlur, hideOnEsc, hideOnOptionSelect],
		});
	}
	setDataToLocalStorage() {
		window.localStorage.setItem("taskList", JSON.stringify(list.taskList));
	}
}
let list = new List();
let timer = new Timer();
list.deleteTask();
list.dynamicPopoverNav();
timer.initialiseTimer();
timer.timers();
timer.appInformation();
// --------------------------------------CHARTS & D3.js-------------------------------//
var totalTimeFocusedOnEachTask = list.taskList;
var totalTimeFocusedOnEachTaskToday = getTodayTasks();
var emptyChartMessage = document.querySelector('.chart-message');
clearChartArea()
/**
 * This function checks to see if there is time already recorded on a particular task.
 * If the totalTimeFocusedOnTask is not equal to 0 then the function returns true.
 */
function timeOnTaskExists(dataArray) {
	var isThereTimeOnThisTask;
	var taskArray = dataArray;
	for (let i = 0; i < taskArray.length; i++) {
		if (taskArray[i].totalTimeFocusedOnTask !== 0) {
			isThereTimeOnThisTask = true;
			break;
		}
	}
	return isThereTimeOnThisTask;
}
/**
 * This runs on page load and it sets the chart default.
 * If any of the tasks have time stored on them then the first chart is shown.
 * Otherwise a message is shown that tells the user they have not timed any tasks yet.
 */
if (timeOnTaskExists(list.taskList) === true) {
	selectChart(totalTimeFocusedOnEachTask);
} else {
	emptyChartMessage.innerHTML = `<h2 class="no-timed-tasks">You have not timed any tasks yet.</h2>`;
}
/**
 * This function clears the chart area of any svgs, legends or lists.
 */
function clearChartArea() {
	var chartSvg = document.querySelector('.chart-svg');
	var circleLeg = document.querySelectorAll('.circle-legend');
	let completedTaskList = document.querySelector('.completed-task-list');
	if (chartSvg) {
		d3.select(chartSvg).remove();
	}
	if (circleLeg) {
		circleLeg.forEach(leg => leg.remove());
	}
	if (completedTaskList) {
		completedTaskList.remove();
	}
}
/**
 * This function is the main d3.js data function.
 * It takes a data set as a parameter.
 * It clears the chart area to get it ready to draw in a chart.
 * It starts by setting a different chart width & height depending on how wide the user's screen is.
 * It sets the donut chart's radius and the colour range for the data slices.
 * The chart parameters are set using various d3 attributes and their location on the page is modified slightly using translate, again depending on screen width. 
 * The arc & pie methods of d3.js are invoked to begin building the charts.
 * The pie method uses the data given to the function and it is told to use the totalTimeFocusedOnTask property to build the slices.
 * Then tooltips are created and set to appear and disappear on hover & mouseout.
 * They are set to show taskDescription & the totalTimeFocusedOnTask.
 * The legend is defined and placed and the same colour range is assigned to it. 
 * The circles & keys are positioned and set.
 * The legend labels are positioned - if the screen size is less than 781, then the legend task description is truncated at 15 characters, at larger screen sizes this is extended to 25 characters.
 * The legend box's height is dynamically set depending on how many items are added to it.
 *   
 */
function selectChart(data) {
	clearChartArea();
	var width = function() {
		if (window.innerWidth < 576) {
			return 300;
		} else if (window.innerWidth > 575) {
			return 550;
		}
	};
	var height = function() {
		if (window.innerWidth < 576) {
			return 250;
		} else if (window.innerWidth > 575) {
			return 320;
		}
	};
	var radius = 150;
	var donutWidth = 75;
	var color = d3.scaleOrdinal().range(["#33A8C7", "#52E3E1", "#A0E426", "#FDF148", "#FFAB00", "#F77976", "#F050AE", "#D883FF", "#9336FD"]);
	var svg = d3.select('.chart-area').append("svg").attr("class", "chart-svg").attr("width", width).attr("height", height).call(responsivefy).append("g").attr('transform', function() {
		if (window.innerWidth < 576) {
			return 'translate(' + 200 + ',' + 155 + ')';
		} else if (window.innerWidth > 575) {
			return 'translate(' + (305) + ',' + (155) + ')';
		}
	});
	var arc = d3.arc().innerRadius(donutWidth).outerRadius(radius);
	var pie = d3.pie().value(function(d) {
		return d.totalTimeFocusedOnTask;
	}).sort(null); //stops the chart sorting in order of size. 
	var legendRectSize = 14;
	var legendSpacing = 7;
	var div = d3.select("body").append("div").attr("class", "tooltip-donut").style("opacity", 0);
	var path = svg.selectAll("path").data(pie(data)).enter().append("path").attr("d", arc).attr("fill", function(d) {
		return color(d.data.taskDescription);
	}).attr("stroke", "white").on('mouseover', function(event, d, i) {
		d3.select(this).transition().duration('50').attr('opacity', '.85');
		//Makes the new div appear on hover:
		div.transition().duration(50).style("opacity", 1);
		let task = d.data.taskDescription;
		let longTime = d.data.totalTimeFocusedOnTaskLongForm;
		div.html(task + "<br>" + longTime) //put label to display here
			.style("left", (event.pageX + 10) + "px").style("top", (event.pageY - 15) + "px");
	}).on('mouseout', function(event, d, i) {
		d3.select(this).transition().duration('50').attr('opacity', '1');
		div.transition().duration('50').style("opacity", 0);
	});
	var legendRectSize = 14;
	var legendSpacing = 7;
	var svgLegend = d3.select('.legend-area');
	var legend = svgLegend.selectAll('.legend').data(color.domain()).enter().append('g').attr('class', 'circle-legend').attr('transform', function(d, i) {
		var height = legendRectSize + legendSpacing;
		var offset = -10;
		var horz = 25;
		var vert = i * height - offset;
		return 'translate(' + horz + ',' + vert + ')';
	});
	legend.append('circle').style('fill', color).style('stroke', color).attr('cx', 0).attr('cy', 0).attr('r', '0.5rem'); //size of circles
	legend.append('text') //labels
		.data(data).attr('x', legendRectSize + legendSpacing).attr('y', legendRectSize - legendSpacing).text(function(d) {
			let taskDescrip = d.taskDescription;
			if (window.innerWidth < 781) {
				if (taskDescrip.length > 15) {
					taskDescrip = taskDescrip.slice(0, 15) + "...";
				}
			} else {
				if (taskDescrip.length > 25) {
					taskDescrip = taskDescrip.slice(0, 25) + "...";
				}
			}
			return `${taskDescrip} : ${d.totalTimeFocusedOnTaskLongForm}`;
		});
	var legendItems = document.querySelectorAll('.circle-legend');
	svgLegend.attr('height', function() {
		if (legendItems.length > 6) {
			return legendItems.length * 30;
		}
	});
}
/**
 * This code runs whenever a user uses the dropdown chart selection menu.
 * If the option selected is total time focused on each task then the app calls the timeOnTaskExists() function and if there is time recorded on the task then it runs the selectChart() function using the totalTimeFocusedOnTask data and it sets the message to empty.
 * If there is not time recorded, then it shows a message saying that the user has not timed any tasks yet.
 * This is repeated for the total time focused on each task today chart selection option, except that the data variable is different.
 * Both list options call the completedTaskList() functions feeding in the specific list data parameters required.
 * If the today list is requested the standard message is overwritten to reflect the "todayness" of the request.
 */
d3.select('#chart-selections').on("change", function(event) {
	var option = event.target.value;
	totalTimeFocusedOnEachTaskToday = getTodayTasks();
	if (option === "total-time-focused-on-each-task") {
		if (timeOnTaskExists(list.taskList) === true) {
			selectChart(totalTimeFocusedOnEachTask);
			emptyChartMessage.innerHTML = "";
		} else {
			clearChartArea();
			emptyChartMessage.innerHTML = `<h2 class="no-timed-tasks">You have not timed any tasks yet.</h2>`;
		}
	} else if (option === "total-time-focused-on-each-task-today") {
		if (timeOnTaskExists(totalTimeFocusedOnEachTaskToday) === true) {
			selectChart(totalTimeFocusedOnEachTaskToday);
			emptyChartMessage.innerHTML = "";
		} else {
			clearChartArea();
			emptyChartMessage.innerHTML = `<h2 class="no-timed-tasks">You have not timed any tasks today.</h2>`;
		}
	} else if (option === "tasks-completed") {
		completedTaskList(list.taskList);
	} else if (option === "tasks-completed-today") {
		completedTaskList(totalTimeFocusedOnEachTaskToday);
		let completedTaskExists = document.querySelector('.completed-task');
		if (!completedTaskExists) {
			emptyChartMessage.innerHTML = `<h2>You have not marked any tasks as completed today.</h2>`;
		}
	}
});
/**
 * This function returns an array with 
 * It looks at the taskList in local storage and it loops through the timeSegments array in each task in that list. 
 * If the timeSegment was placed in the timeSegment array "today" then that time Segment is pushed into another array called todaysTasks.
 * An array of objects is created called temp. 
 * The todaysTasks array that was just created is looped through and if there is nothing in temp with the same id as the task that is being looked at, then that task is placed in temp as an object:
 * With the key 0 i.e. {0:{id: "0", timeToAdd: 17}, 1:{Another obj}, 2: {Another Object} }
 * If there is already a task in there with that id then the current tasks[i] timeToAdd is added to it. e.g. temp.0.timeToAdd + current task's time to Add. 
 * Another array is created called todaysTasksFiltered and each task in temp is placed therein.
 * For each task in todaysTasksFiltered this function looks at that task's id and then goes through the list.tasklist array and finds the task with the same id and then check to see whether it is completed or not and sets that in todaysTasksFiltered, alongside the task Description. This was added to ensure that if a task is edited, its task description in any of the today task charts/lists remains up-to-date. 
 * Then the function sets the totalTimeFocusedOnTask in the todaysTasksFiltered array to the timeToAdd variable ensuring that the totalTime data reflects only the time spent on the task "today".
 * Then it uses the convertSecondsToTime() function to convert that time to the longform time format.
 * Then it returns the array for use as a data source.
 */
function getTodayTasks() {
	let tasks = list.taskList;
	let dateTimeNow = new Date();
	let dateNow = dateTimeNow.toLocaleDateString();
	let todaysTasks = [];
	let i;
	for (i = 0; i < tasks.length; i++) {
		for (let j = 0; j < tasks[i].timeSegments.length; j++) {
			let individualTimeSegment = tasks[i].timeSegments[j];
			if (individualTimeSegment.localDate === dateNow) {
				todaysTasks.push(individualTimeSegment);
			}
		}
	}
	//The following code was written by user2736012 on Stack Overflow and altered (spread operator) by myself - link in Readme. 
	var temp = {};
	var task = null;
	for (i = 0; i < todaysTasks.length; i++) {
		task = { ...todaysTasks[i]
		};
		if (!temp[task.id]) {
			temp[task.id] = task;
		} else {
			temp[task.id].timeToAdd += task.timeToAdd;
		}
	}
	var todaysTasksFiltered = [];
	for (var prop in temp) {
		todaysTasksFiltered.push(temp[prop]);
	}
	for (let i = 0; i < todaysTasksFiltered.length; i++) {
		for (let j = 0; j < list.taskList.length; j++) {
			if (todaysTasksFiltered[i].id == list.taskList[j].id) {
				todaysTasksFiltered[i].completed = list.taskList[j].completed;
				todaysTasksFiltered[i].taskDescription = list.taskList[j].taskDescription;
			}
		}
	}
	todaysTasksFiltered.forEach(task => task.totalTimeFocusedOnTask = task.timeToAdd);
	todaysTasksFiltered.forEach(task => task.totalTimeFocusedOnTaskLongForm = timer.convertSecondsToTime(task.totalTimeFocusedOnTask));
	return todaysTasksFiltered;
}
/**
 * This function writes out a list of completed tasks either in full or for "today" dependent on the data fed to it.
 * It starts by clearing the chart area to make space for the list. 
 * Then it sets the message to empty.
 * Then it builds the list into the DOM, for each task in the data with a completed property it adds an <li> element on the page using that task's taskDescription property to identify it.
 * If no tasks are completed it shows a message to that effect.
 */
function completedTaskList(data) {
	clearChartArea();
	emptyChartMessage.innerHTML = "";
	let legendArea = document.querySelector('.legend-area');
	legendArea.setAttribute("width", 0);
	legendArea.setAttribute("height", 0);
	let taskList = data;
	let completedTasksDiv = document.querySelector('.completed-tasks');
	completedTasksDiv.innerHTML += `<ol class="completed-task-list">`;
	let completedTaskListDiv = document.querySelector('.completed-task-list');
	taskList.forEach(function(task) {
		if (task.completed === true) {
			completedTaskListDiv.innerHTML += `<li class="completed-task">${task.taskDescription}</li>`;
		}
	});
	let completedTasksExist = document.querySelector('.completed-task');
	if (completedTasksExist == null) {
		emptyChartMessage.innerHTML = `<h2>You have not marked any tasks as complete.</h2>`;
	}
	completedTasksDiv.innerHTML += `</ol>`;
}
/**
 * This function makes the svg charts fully responsive in between the width & height attributes that were set in the chart creation function. It just ensures that the charts always look their best.
 * The function is taken from Ben Clinkenbeard's Blog Article and originally written by Brendan Sudol (attributed in README) 
 */
function responsivefy(svg) {
	const container = d3.select(svg.node().parentNode),
		width = parseInt(svg.style('width'), 10),
		height = parseInt(svg.style('height'), 10),
		aspect = width / height;
	// set viewBox attribute to the initial size
	// control scaling with preserveAspectRatio
	// resize svg on inital page load
	svg.attr('viewBox', function() {
		if (window.innerWidth < 576) {
			return `0 0 ${width} ${height + 70}`;
		} else if (window.innerWidth > 575) {
			return `0 0 ${width} ${height}`;
		}
	}).attr('preserveAspectRatio', 'xMinYMid').call(resize);
	// add a listener so the chart will be resized
	d3.select(window).on('resize.' + container.attr('id'), resize);

	function resize() {
		const w = parseInt(container.style('width'));
		svg.attr('width', w);
		svg.attr('height', Math.round(w / aspect));
	}
}