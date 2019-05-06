/*jshint esversion: 6 */

//DROP DOWN MENU
const menuIcon = document.querySelector('.nav-icon-container');
const nav = document.querySelector('.nav');
const navIcon = document.querySelector('.nav-arrow');

menuIcon.addEventListener('click', () => {
	'use strict';
	if (nav.style.height !== "87px") {
		nav.style.height = "87px";
		navIcon.style.transform = 'rotate(180deg)';
	} else if (nav.style.height !== '0px') {
		nav.style.height = '0px';
		navIcon.style.transform = 'rotate(0deg)';
	}
});

window.onload = () => {
	'use strict';
	document.querySelector('body').style.opacity = '100';
};

//add a event to the nav to fade the page out when clicked
//nav.addEventListener('click', changePage(event));

function changePage (url) {
	'use strict';
	document.querySelector('body').style.opacity = '0';
	setTimeout(() => window.location = url, 500);
}
