

// Bind listeners to HTML Elements
var btnEl = $(".btn-lg")
var saveBtnEl = $(".btn-warning")
var clearBtnEl = $(".btn-danger")

$(btnEl).click(CheckContents);
$(clearBtnEl).click(resetContents)



var text8aEl= $("#8-am")

var textBoxTest = text8aEl.text()

function CheckContents() {
    console.log(text8aEl.text()) 
} 
//-----------------------------------------------------//

// When you click the save icon, the page needs to save.
// We're going to save all items, not just the one on the line. It will be simpler that way.

// Create local value for each time: 8-AM to 5-PM
var v = 8
var amPm = "-am"
var taskTime = v + amPm;
var textEl = $("#" + v + amPm)
console.log(textEl.text())

// Add event listener for saveTasks
$(btnEl).click(saveTasks);

// Add function to move text values to localStorage
function saveTasks() {
    v = 8
    amPm = "-am"
    console.log(v + amPm);
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

    saveBtnEl.removeClass("d-none");
    saveBtnEl.show();
    savePop();

}

function savePop() {
    setTimeout(function() {
        saveBtnEl.hide()
    }, 1500)
}

function resetContents() {
    v = 8
    amPm = "-am"
    console.log(v + amPm);
    localStorage.clear
    for (var i = 8 ; i < 18; i++) {
        if (i == 12) {
            amPm = "-pm"
        } else if (i == 13) {
            v = 1;
        }
        textEl = $("#" + v + amPm)
        textEl.val("No Tasks Entered") // Use .val instead of .text for items in the input field
        v++;
    }
}


// Pull the specific text box's value as a string to add to local memory.

// Pull the specific local memory values and paste them into the text boxes


//-----------------------------------------------------//

// Create a timer to check the current time
var timeEl = $("#currentDay")
var now = moment()
var nowHero = moment().format("dddd, Do of MMMM YYYY")

init();
function init() {
    $(timeEl).text(nowHero);

    for (var i = 8 ; i < 18; i++) {
        if (i == 12) {
            amPm = "-pm"
        } else if (i == 13) {
            v = 1;
        }
        textEl = $("#" + v + amPm)
        taskTime = v + amPm;
        textEl.text(localStorage.getItem(taskTime)) 
        v++;
    }
}

console.log(now.format("hh:mm:ss"))
console.log(nowHero)
console.log(moment("5-PM", "h-a").format("h-A")) // moment format for the text-box ID
console.log(now.format("h-A"))

var timeCheck1 = moment("12-AM", "h-A").format ("h-A")
var timeCheck2 = now.format("h-A")
console.log(timeCheck1)
console.log(timeCheck2)
// compare timecheck against timecheck
if (timeCheck1 == timeCheck2) {
    console.log("huehuehuehuehuehue")
}
// compare string against timecheck
if ("12-AM" == timeCheck2) {
    console.log("bwehehehehe")
}


// If the current hour is < the hour listed for the text box, then it's green

// setInterval(currentTime, 6000)
// function currentTime() {
    
// }

// If the current hour is  === the hour listed for the text box, it's red

//If the current hour is > the hour listed for the text box, it's grey

// Create a timer that shows a date and time (DayOf, Month Year)