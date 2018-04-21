window.onload = function () {

    var fragmentTime;
    var timeIntervalID;
    var txtMinutes;
    var txtSeconds;
    var btnPlay = '#timer-play';
    var btnStop = "#timer-stop";
    var sound = new Howl({
        src: ['sound/power_star.mp3']
    });


    function getDisplay() {
        txtMinutes = document.querySelector('span.minute').textContent;
        txtSeconds = document.querySelector('span.second').textContent;
    }


    function setDisplay(txtMin, txtSec) {
        document.querySelector('span.minute').textContent = txtMin;
        document.querySelector('span.second').textContent = txtSec;
    }


    function playAlarm() {
        sound.loop(true);
        sound.play();
    }


    function stopAlarm() {
        sound.stop();
    }


    function startTimer(duration, displayMinute, displaySecond) {

        var timer = duration;

        timeIntervalID = setInterval(function () {

            if (--timer < 0) {
                timer = 0;
                clearInterval(timeIntervalID);
                playAlarm();
                document.querySelector(btnPlay).disabled = false;
                alert(jQuery('.timeout_message_show').text());
            }

            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            displayMinute.textContent = minutes;
            displaySecond.textContent = seconds;

        }, 1000);

    }

    //button play listener
    document.querySelector(btnPlay).onclick =
        function () {
            //disable button
            this.disabled = true;

            getDisplay();

            //parse time text
            var minutes = parseInt(txtMinutes);
            var seconds = parseInt(txtSeconds);

            //values validation
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

            fragmentTime = (60 * minutes) + (seconds);
            displayMinute = document.querySelector('span.minute');
            displaySecond = document.querySelector('span.second');

            startTimer(fragmentTime, displayMinute, displaySecond);
        };

    document.querySelector(btnStop).onclick =
        function () {
            stopAlarm();
            clearInterval(timeIntervalID);
            setDisplay(txtMinutes, txtSeconds);
            document.querySelector(btnPlay).disabled = false;
        };
};
