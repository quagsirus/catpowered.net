var timers = document.getElementsByClassName("countdown-timer")
// Update the count down every 1 second
var x = setInterval(function() {
    for (var timer_pos = 0; timer_pos < timers.length; timer_pos++) {
        var countDownDate = new Date(timers[timer_pos].getAttribute("finish-time") * 1000).getTime();

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        var prefix = timers[timer_pos].getAttribute("prefix")

        // Time calculations for years, months, weeks, days, hours, minutes, and seconds
        var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
        var remainingTime = distance % (1000 * 60 * 60 * 24 * 365);

        var months = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 30)); // Assuming a month is 30 days
        remainingTime %= (1000 * 60 * 60 * 24 * 30);

        var weeks = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 7));
        remainingTime %= (1000 * 60 * 60 * 24 * 7);

        var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        remainingTime %= (1000 * 60 * 60 * 24);

        var hours = Math.floor(remainingTime / (1000 * 60 * 60));
        remainingTime %= (1000 * 60 * 60);

        var minutes = Math.floor(remainingTime / (1000 * 60));
        remainingTime %= (1000 * 60);

        var seconds = Math.floor(remainingTime / 1000);

        // Display the result in the element
        var remainingTimeStr = prefix;

        if (years > 0) {
            remainingTimeStr += years + "y ";
        }

        if (months > 0 || years > 0) {
            remainingTimeStr += months + "mo ";
        }

        if (weeks > 0 || months > 0 || years > 0) {
            remainingTimeStr += weeks + "w ";
        }

        if (days > 0 || weeks > 0 || months > 0 || years > 0) {
            remainingTimeStr += days + "d ";
        }

        if (hours > 0 || days > 0 || weeks > 0 || months > 0 || years > 0) {
            remainingTimeStr += hours + "h ";
        }

        if (minutes > 0 || hours > 0 || days > 0 || weeks > 0 || months > 0 || years > 0) {
            remainingTimeStr += minutes + "m ";
        }

        remainingTimeStr += seconds + "s";

        timers[timer_pos].innerHTML = remainingTimeStr;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            timers[timer_pos].setAttribute("hidden", "");
            document.getElementsByClassName("timer-result").namedItem(timers[timer_pos].id).removeAttribute("hidden");
        }
    }
}, 1000);