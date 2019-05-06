/*jshint esversion: 6 */

const formSubmissionsResponses = document.querySelector('#form-messages');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');

const messageSentMessage = 'Your email has been sent';
const messageProblemMessage = 'There appears to have been an issue';

document.querySelector('.contact-form__submit').addEventListener('click', event => {
	'use strict';
	event.preventDefault();
	
	const name = nameInput.value;
	const email = emailInput.value;
	const subject = subjectInput.value;
	const message = messageInput.value;
	
	if (!textValid(name)) {
		formError('#name', 'Please enter your name');
	} else {
		clearFormError('#name');
	}
	
	if (!emailValid(email)) {
		formError('#email', 'Please enter a valid email');
	} else {
		clearFormError('#email');
	}
	
	if (!textValid(subject)) {
		formError('#subject', 'Please enter the subject');
	} else {
		clearFormError('#subject');
	}
	
	if (!messageValid(message)) {
		formError('#message', 'Please enter a message');
	} else {
		clearFormError('#message');
	}
	
	if (textValid(name) && emailValid(email) && textValid(subject) && messageValid(message)) {
		sendEmail();
	}
	
});

function sendEmail () {
	'use strict';
	
	const name = nameInput.value;
	const email = emailInput.value;
	const subject = subjectInput.value;
	const message = messageInput.value;
	
	const emailRequest = new XMLHttpRequest();
	emailRequest.onreadystatechange = () => {
		if (emailRequest.readyState === 4) {
			displayResponseMessage(emailRequest);
		}
		if (emailRequest.readyState === 4 && emailRequest.status === 200) {
			clearContactForm();
		}
	};
	emailRequest.open('POST', '../php/mailer.php', true);
	emailRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	const emailData = 'name='+name+'&email='+email+'&subject='+subject+'&message='+message;
	emailRequest.send(emailData);
}

//prints error messages to the form
function formError(id, message) {
	'use strict';
	if (document.querySelector('.' + id.substring(1) + 'Error')) {
		document.querySelector('.' + id.substring(1) + 'Error').remove();
	}
	const matchingElement = document.querySelector(id);//find the element to append the new div before
	const newMessageSpan = document.createElement('SPAN');//create a new div
	newMessageSpan.classList.add(id.substring(1) + 'Error');
	newMessageSpan.innerHTML = message;//add the message to the div
	newMessageSpan.style.color = 'red';
	newMessageSpan.style.display = 'inline-block';
	newMessageSpan.style.float = 'left';
	matchingElement.parentElement.insertBefore(newMessageSpan, matchingElement);//insert the newly created div before the element it is meant for
}

//clears errors that have been displayed
function clearFormError (id) {
	'use strict';
	if (document.querySelector('.' + id.substring(1) + 'Error')) {
		document.querySelector('.' + id.substring(1) + 'Error').remove();
	}
}

function textValid(text) {//tests the values typed into text feilds
	'use strict';
	const textRegex = new RegExp(/[a-zA-Z]/);//the regex to be used to test if they are valid
	return textRegex.test(text);//return the results of the test
}

//checks to see if the email is valid
function emailValid(email) {
	'use strict';
	const emailRegex = new RegExp(/^[^@]+@[^@]+\.[a-z]+$/i);	
	return emailRegex.test(email);
}

function messageValid (message) {
	'use strict';
	const messageRex = new RegExp(/\w[a-zA-Z]/);
	return messageRex.test(message);
}

//displays the response of the emailrequest once the submit button is pressed
function displayResponseMessage (emailRequest) { //Builds and displays the status message
	'use strict';
	removeResponseMessage();
	
	let message;
	const node = document.createElement('span');
	if (emailRequest.status === 200) {
		message = document.createTextNode(messageSentMessage);
	} else {
		message = document.createTextNode(messageProblemMessage);
	}
	node.classList.add('form-sent-message');
	node.appendChild(message);
	formSubmissionsResponses.appendChild(node);
	node.classList.add('form-result-message');
	
	//build the button to close the notification
	const notificationCloserSpan = document.createElement('span');
	const notificationText = document.createTextNode('X');
	notificationCloserSpan.appendChild(notificationText);
	notificationCloserSpan.classList.add('notification-cancel-icon');
	
	formSubmissionsResponses.appendChild(notificationCloserSpan);
	
	formSubmissionsResponses.style.height = '100%';
	
	setUpNtotificationExit();
}

//clears the form of all input
function clearContactForm () {
	'use strict';
	nameInput.value = '';
	emailInput.value = '';
	subjectInput.value = '';
	messageInput.value = '';
}

//NOTIFICATION-CLOSER
let notificationExiter;
function setUpNtotificationExit () {
	'use strict';
	notificationExiter = document.querySelector('.notification-cancel-icon');
	notificationExiter.addEventListener('click', () => {
		removeResponseMessage();
		formSubmissionsResponses.style.height = '0';
	});
}

function removeResponseMessage () {
	'use strict';
	while (formSubmissionsResponses.firstChild) {
		formSubmissionsResponses.removeChild(formSubmissionsResponses.firstChild);
	}
}
