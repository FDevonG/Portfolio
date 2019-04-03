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

