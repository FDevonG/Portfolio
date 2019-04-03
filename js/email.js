/*jshint esversion: 6 */

const form = document.querySelector('#contact-form');

const formSubmissionsResponses = document.querySelector('#form-messages');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

const messageSentMessage = 'Your email has been sent';
const messageProblemMessage = 'There appears to have been an issue';

form.addEventListener('submit', event => {
	'use strict';
	event.preventDefault();
	
	const name = nameInput.value;
	const email = emailInput.value;
	const message = messageInput.value;
	
	const emailRequest = new XMLHttpRequest();
	emailRequest.onreadystatechange = () => {
		if (emailRequest.readyState === 4) {
			displayMessage(emailRequest);
		}
	};
	emailRequest.open('POST', '../php/mailer.php', true);
	emailRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	const emailData = 'name='+name+'&email='+email+'&message='+message;
	emailRequest.send(emailData);
});

function displayMessage (emailRequest) { //Builds and displays the status message
	'use strict';
	clearContactForm();
	removeChildren();
	
	let message;
	const node = document.createElement('span');
	if (emailRequest.status === 200) {
		message = document.createTextNode(messageSentMessage);
		node.classList.add('form-sent-message');
	} else {
		message = document.createTextNode(messageProblemMessage);
		node.classList.add('form-sent-message');
	}

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

function clearContactForm () {
	'use strict';
	nameInput.value = '';
	emailInput.value = '';
	messageInput.value = '';
}

//NOTIFICATION-CLOSER
let notificationExiter;
function setUpNtotificationExit () {
	'use strict';
	notificationExiter = document.querySelector('.notification-cancel-icon');
	notificationExiter.addEventListener('click', () => {
		removeChildren();
		formSubmissionsResponses.style.height = '0';
	});
}

function removeChildren () {
	'use strict';
	while (formSubmissionsResponses.firstChild) {
		formSubmissionsResponses.removeChild(formSubmissionsResponses.firstChild);
	}
}
