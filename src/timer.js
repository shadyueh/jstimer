window.onload = function () {

    var fragmentTime;

    jQuery('.timeout_message_show').hide();

    var txtMinutes = jQuery('span.minute').text();
    var txSeconds = jQuery('span.second').text();





    document.querySelector("#play").onclick =
        function () {
            var minutes = parseInt(txtMinutes);
            var seconds = parseInt(txSeconds);
            if (isNaN(minutes)) {
                minutes = 00;
            }

            if (isNaN(seconds)) {
                seconds = 00;
            }

            if (minutes == 60) {
                minutes = 59;
            }

            if (seconds == 60) {
                seconds = 59;
            }
            setDisplay(txtMinutes,txSeconds);
            fragmentTime = (60 * minutes) + (seconds);
            displayMinute = document.querySelector('span.minute');
            displaySecond = document.querySelector('span.second');
            startTimer(fragmentTime, displayMinute, displaySecond);
        }

};

function getDisplay(txtMin,txSec) {
    jQuery('span.minute').text(txtMin);
    jQuery('span.second').text(txSec);
}


function setDisplay(txtMin,txSec) {
    jQuery('span.minute').text(txtMin);
    jQuery('span.second').text(txSec);
}


function startTimer(duration, displayMinute, displaySecond) {

    var timer = duration, displayMinute, displaySecond;

    var timeIntervalID = setInterval(function () {

        if (--timer < 0) {
            timer = 0;
            clearInterval(timeIntervalID);
            this.disabled = 'false';
            alert(jQuery('.timeout_message_show').text());
        }

        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        displayMinute.textContent = minutes;
        displaySecond.textContent = seconds;

    }, 1000);

}