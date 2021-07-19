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
var sections = document.querySelectorAll('section');
var navBuildList = document.createElement('ul');
var navList = document.querySelector('ul');
var selectedIndex = 0;
var navArray = [];
var highlightedNavItem;
var scrollFlag = false; 
var isScrolling;
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function unSelectSelectedSection()
{
    var navItem;
    navItem = document.querySelector("#"+sections[selectedIndex].id);
    navItem.classList.remove("your-active-class");
}

function selectNewSection(id)
{
    var navItem;
    navItem = document.querySelector("#"+sections[id].id);
    navItem.classList.add("your-active-class");
}

function HideHeader()
{
    var header = document.querySelector('.page__header');
    header.style.position = "absolute";
}
function ShowHeader()
{
    var header = document.querySelector('.page__header');
    header.style.position = "fixed";
}

function highlightNavItem(itemNum)
{    
    var item = document.getElementById(itemNum);
    highlightedNavItem.classList.remove("item-highlited");
    item.classList.add("item-highlited");
    highlightedNavItem = item;
}
function Scroll(navItem)
{
    //Use ScrollTo event
    window.scrollTo({
        left: navItem.getBoundingClientRect().x + window.pageXOffset,
        top: navItem.getBoundingClientRect().y + window.pageYOffset,
        behavior: 'smooth'
    })    
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function createNavItemsArrayOfObjects()
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
        //console.log("So "+section.attributes);
            //console.log("lol");
    })
}
function buildNavBar()
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

//
function navClickEvent()
{
    
    navList.addEventListener('click',(event) =>{
        //Check for the target id whether it is a Nav list item or not
        if(event.target.id >= 0)
        {
            var navItem = document.querySelector("#"+sections[event.target.id].id);
            //Window Scroll to the Section
            Scroll(navItem);
        }
        //TODO Stlye Selected for the Nav Item    
    })
}

function windowScrollEvent()
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
            var sectionDimen = section.firstElementChild.firstElementChild.getBoundingClientRect();
            //Check for the element to be within the viewport
            if( sectionDimen.top >= 0 && sectionDimen.bottom <= (window.innerHeight || document.documentElement.clientHeight) )
            {
                unSelectSelectedSection(selectedIndex);
                selectNewSection(index);
                selectedIndex = index;
                highlightNavItem(index);
            }
            index++;
        })
        isScrolling = setTimeout(()=>{
            console.log("Rest");
            scrollFlag = false;
            //Hide Header
            HideHeader();
        },5000)

    })
}
function navBarHideEvent()
{
    document.addEventListener('mouseup',()=>{
        console.log("Hey");
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
navBarHideEvent();
createNavItemsArrayOfObjects();
buildNavBar();


