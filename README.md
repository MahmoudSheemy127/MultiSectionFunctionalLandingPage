# Landing Page Project

------------Documentation of the script------------------------

the script of this project is divided upon 4 main functions:

-------------------
    windowScrollEvent();
    navClickEvent();
    createNavItemsArrayOfObjects();
    buildNavBar();
-------------------    

HTML sections are stored in a one dimensional array.

To help building the nav bar and link the nav bar item to it's targeted section an array of objects is created  (as shown in the function createNavItemsArrayOfObjects). Where each object of this array hold the information of each navigation bar item such as: 
{
    navData:"",  // navData of the section
    id:"",   // id of the section
    index: 0 // ordered index of the nav item which is the id of the navbar item 
}
Navbar element is built using this array of objects that hold the data of each navbar item (as shown in the function buildNavBar).

A click event is added to the whole navbar container and not to each navbar item to imporve performance.
when a nav item is clicked the id of the nav item is used to index the nav bar array of objects from which we can get the id of the linked section. After getting the id of the linked section we can scroll to this targeted section using it's coordinates (as shown in the function navClickEvent)
The main purpose of this nav bar array of objects is to have a linking method between the navbar items and their adjacent sections as well as to easily build the nav bar element with a reduced performance.

A scroll event is added to the document as when the page is scrolled the script loops through the 1D array of sections to detect whether or not each section lies inside the viewport using each section's relative coordinates (as shown in the function windowScrollEvent).

inside the scroll event a settimeout event is added to detect the nonscrolling activity of the user where according to the nonscrolling activity the navbar is hidden/shown.  






## Table of Contents

* [Instructions](#instructions)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.
