/**
 * Created by Dylan on 8/01/2016.
 */

var i = 0;

var newSubs = []; // store the new subscribers in here, so we don't push the same one twice.
var invariantMessage = "_has_subscribed_to_you_on_YouTube"; // the text without username.
var displayedUsers = 0;


function setup() {
    readMails();

    // hide the field for the fade effect

    $("subscriber").hide();

}


function continueExecution() {

}


function readMails() {
    $.ajax({
        type: "GET",
        url: "phpindex.php?action=readmails",
        success: function (result) // return as xml
        {
            console.log(result);

            // We can parse the results

            $(result).find("subscriber").each(function () // loop over all subscribers.
            {
                var registerText = $(this).text();
                var userName = registerText.substr(0, registerText.indexOf(invariantMessage));
                userName = userName.replace("_", " ");
                console.log("username: " + userName);
                // we log these.
                if ($.inArray(userName, newSubs) === -1) {
                    newSubs.push(userName);
                }

            });

            displayNewSubscribers();

            setTimeout(readMails, 100000);
        }
    });
}

function displayNewSubscribers() // we need to know who the new subscribers are. So we keep an index of the ones we have printed? for each one we print, we advance the pointer.
{
    // we display it for some time.

    setInterval(function () {
        if (displayedUsers < newSubs.length) {
            $("#subscriber").text("New Sub: " + newSubs[displayedUsers]).fadeIn(1000).delay(7000).fadeOut(1000).delay(1000);
            displayedUsers++;
            playMusic();
        }
    }, 5000);


}


/* music function */
function playMusic() {
    var audio = new Audio("sound/newsubsound.mp3");
  /*  audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);*/
    audio.play();
}

