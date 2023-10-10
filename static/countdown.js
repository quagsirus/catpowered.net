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

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element
        timers[timer_pos].innerHTML = prefix + days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            timers[timer_pos].setAttribute("hidden", "");
            document.getElementsByClassName("timer-result").namedItem(timers[timer_pos].id).removeAttribute("hidden");
        }
    }
}, 1000);
