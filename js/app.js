/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');  //1D array to store the sections of the page
let navBuildList = document.createElement('ul');  // ul Element variable used to build the nav bar
const navList = document.querySelector('ul'); // ul element of the existing nav bar
let selectedIndex = 0; //Index of the Selected nav item in the Array on objects
let navArray = []; //Array of objects to hold the data of each nav item
let highlightedNavItem; //highlighted Nav item
let scrollFlag = false; // Global flag for the active scrolling condition
let isScrolling; // variable to store the event settimeout
let toSelect = 0; // index of the section to be selected

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function unSelectSelectedSection()  //Helper Function to unselect the selected section
{
    var navItem;
    navItem = document.querySelector("#"+sections[selectedIndex].id);
    navItem.classList.remove("your-active-class");
}

function selectNewSection(index) //Helper Function to select the target section 
{
    var navItem;
    navItem = document.querySelector("#"+sections[index].id);
    navItem.classList.add("your-active-class");
}

function HideHeader() //Helper function to hide the Nav bar header
{
    var header = document.querySelector('.page__header');
    header.style.position = "absolute";
}

function ShowHeader() //Helper Function to show the Nav bar header
{
    var header = document.querySelector('.page__header');
    header.style.position = "fixed";
}

function highlightNavItem(itemNum) //Helper Function to Highlight the selected nav item
{    
    var item = document.getElementById(itemNum);
    highlightedNavItem.classList.remove("item-highlited");
    item.classList.add("item-highlited");
    highlightedNavItem = item;
}


function Scroll(navItem) //Helper Function to scroll the window to the given section coordinates
{
    navItem.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
    });    
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function createNavItemsArrayOfObjects()  //Main function to create the Array of objects to help building the nav bar
{
    var index = 0;
    sections.forEach((section) => {
        var listObject = {
            navData:"",
            id:"",
            index:0
        }
    
        listObject.navData = section.attributes["data-nav"].nodeValue;
        listObject.id = section.id;
        listObject.index = index;
        navArray.push(listObject);
        index++;
    })
}
function buildNavBar() //Main function to build the nav bar using the nav bar array Of objects 
{
    navArray.forEach((item) => {
        var navItem = document.createElement('li');
        navItem.textContent = item.navData;
        navItem.id = item.index;
        navItem.classList.add("menu__link");
        navBuildList.appendChild(navItem);
    })
    navList.innerHTML = navBuildList.innerHTML;
    highlightedNavItem = navList.querySelector('li');
}

function navClickEvent()  //main function to add the click event to the nav bar
{
    
    navList.addEventListener('click',(event) =>{
        //Check for the target id whether it is a Nav list item or not
        if(event.target.id >= 0)
        {
            var navItem = document.querySelector("#"+sections[event.target.id].id);
            //Window Scroll to the Section
            Scroll(navItem);
        }
    })
}

function windowScrollEvent() //main function to select the section upon manual scrolling 
{
    document.addEventListener('scroll',() => {
        window.clearTimeout(isScrolling);
        if(scrollFlag == false)
        {
            ShowHeader();
            scrollFlag = true;
        }
        var index = 0;
        sections.forEach((section) => {
            var sectionDimen = section.firstElementChild.getBoundingClientRect();
            console.log("Section "+index+" bottom:"+ sectionDimen.bottom);
            console.log("Section "+index+" top:"+ sectionDimen.top);            
            //Check for the section's container to be within the viewport
            if(sectionDimen.top + 200  <= window.innerHeight  && sectionDimen.bottom >= 0)
            {
                
                toSelect = index;
            }
            index++;
        })
        if(toSelect != selectedIndex)
        {
            unSelectSelectedSection(selectedIndex);
            selectNewSection(toSelect);
            highlightNavItem(toSelect);
            selectedIndex = toSelect;
        }

        console.log("Window innerHeight: "+ window.innerHeight);
        isScrolling = setTimeout(()=>{
            console.log("Rest");
            scrollFlag = false;
            //Hide Header
            HideHeader();
        },3000)

    })
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

//Main Program
windowScrollEvent();
navClickEvent();
createNavItemsArrayOfObjects();
buildNavBar();


