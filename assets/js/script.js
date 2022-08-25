// Define HTML Elements
var btnEl = $(".btn-lg")
var saveBtnEl = $(".btn-warning")
var clearBtnEl = $(".btn-danger")

// Set event listeners
$(btnEl).click(saveTasks);
$(clearBtnEl).click(resetContents)

// Define global variables
var text8aEl= $("#8-am")
var textBoxTest = text8aEl.text()

// Set master value for time to start scripts: 8-AM
var v = 8
var amPm = "-am"
var taskTime = v + amPm;
var textEl = $("#" + v + amPm)
// console.log(textEl.text())

// Scheduler Code---------------------------------------------------------------------------------//

// $(btnEl).click(CheckContents); // This is for testing
// Test function
// function CheckContents() {
//     console.log(text8aEl.text()) 
// } 

// Write function to move text values to localStorage
function saveTasks() {
    console.log("start saveTasks")
    v = 8
    amPm = "-am"
    // console.log(v + amPm);

    // Loop starts at 8AM and rolls through to 5PM
    for (var i = 8 ; i < 18; i++) {
        if (i == 12) {
            amPm = "-pm"
        } else if (i == 13) {
            v = 1;
        }
        textEl = $("#" + v + amPm)
        taskTime = v + amPm;
        localStorage.setItem(taskTime, textEl.val()) // Use .val instead of .text for items in the input field
        v++;
    }
    // Un-hide the "saved" button
    saveBtnEl.removeClass("d-none");
    // After it's unhidden, this command will show it temporarily
    saveBtnEl.show();
    // Get rid of the button after a couple seconds
    savePop();
}

// Write a function to make a save button pop up (or go away, more accurately)
function savePop() {
    console.log("start savePop()")
    setTimeout(function() {
        saveBtnEl.hide()
    }, 1500)
}

// Write a function for clearing storage and resetting the Scheduler
function resetContents() {
    console.log("start resetContents()")
    v = 8
    amPm = "-am"
    console.log(v + amPm);
    localStorage.clear()

    // Loop starts at 8AM and rolls through to 5PM
    for (var i = 8 ; i < 18; i++) {
        if (i == 12) {
            amPm = "-pm"
        } else if (i == 13) {
            v = 1;
        }
        textEl = $("#" + v + amPm)
        textEl.val("No task entered") // Use .val instead of .text to update words in the input field
        v++;
    }
}

// Timer Code---------------------------------------------------------------------------------//

// Create a timer to check the current time
var timerEl = $("#currentDay")

// Define global variables 
var now = moment()
var nowHero = moment().format("dddd, Do of MMMM YYYY")
// Defined these twice, but the variables are re-defined inside the functions
// var timeCheck1 = moment("12-AM", "h-A").format ("h-A")
// var timeCheck2 = now.format("h-A")
var timeCheck1 = moment(now.format("mm"), "mm");
var timeCheck2 = moment('00', 'mm')

// console.log(now.format("hh:mm:ss"))
// console.log(nowHero)
// console.log(moment("5-PM", "h-a").format("h-A")) // moment format for the text-box ID
// console.log(now.format("h-A"))
// console.log(timeCheck1)
// console.log(timeCheck2)

function bgTimer() {
    console.log("start bgTimer()")
    v = 8
    amPm = "-am"
    // console.log(v + amPm);

    // Loop starts at 8AM and rolls through to 5PM
    for (var i = 8 ; i < 19; i++) {
        if (i == 12) {
            amPm = "-pm"
        } else if (i == 13) {
            v = 1;
        }

        // Update the moment() variables
        timeCheck1 = moment(textEl[0].id, "h-a")
        timeCheck2 = moment(now.format("h-a"), "h-a");

        // console.log(timeCheck1, timeCheck2)
        // console.log(textEl[0].id, now.format("h-a")) // , now.format("h-a"))

        // If the current hour is === the hour for the text box, it's red
        if (timeCheck1.isSame(timeCheck2)) {

            // console.log(timeCheck1.isSame(timeCheck2))
            textEl.addClass("bg-danger")
            textEl.removeClass("bg-secondary")
            textEl.removeClass("bg-success")

        //If the current hour is > than the hour for the text box, it's grey
        } else if (timeCheck1.isBefore(timeCheck2)) {

            // console.log(timeCheck1.isBefore(timeCheck2))
            textEl.removeClass("bg-danger")
            textEl.addClass("bg-secondary")
            textEl.removeClass("bg-success")

        // If the current hour is < than the hour for the text box, then it's green
        } else if (timeCheck1.isAfter(timeCheck2)) {

            // console.log(timeCheck1.isAfter(timeCheck2))
            textEl.removeClass("bg-danger")
            textEl.removeClass("bg-secondary")
            textEl.addClass("bg-success")
        }
        textEl = $("#" + v + amPm)
        v++;
        taskTime = v + amPm;
    }
}


function updateColors() {
    console.log("Start updateColors()")
    now = moment()
    timeCheck1 = moment(now.format("mm"), "mm");
    timeCheck2 = moment('00', 'mm')

    // This code pulled values, but that broke the .isSame method for moment().
    // timeCheck1 = timeCheck1['_i'];
    // timeCheck2 = timeCheck2['_i'];

    // console.log(timeCheck1, timeCheck2)
    // console.log(timeCheck1)

    if (moment(timeCheck1).isSame(timeCheck2)) {
        bgTimer();
    }
}

// Check if the time is on the hour every minute. 
setInterval(updateColors, 60000)

// Initialize---------------------------------------------------------------------------------//
// Initialize base parameters. Load local storage and run time scripts
function init() {
    console.log("Start init()")
    $(timerEl).text(nowHero);
    for (var i = 8 ; i < 18; i++) {
        if (i == 12) {
            amPm = "-pm"
        } else if (i == 13) {
            v = 1;
        }

        textEl = $("#" + v + amPm)
        taskTime = v + amPm;

        if (localStorage.getItem(taskTime)) {
            textEl.text(localStorage.getItem(taskTime)) 
        }
        v++;
    }
    updateColors()
    bgTimer()
}

// Run init
init();
