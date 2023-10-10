function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}
function submitForm(fromdiscord) {
    date = new Date();
    date.setTime(date.getTime() + 1*24*60*60*1000);
    expires = (';expires=' + date.toUTCString());
    if (fromdiscord == 1) {
        document.getElementById('login').action = window.location.href + '&next=' + getCookie('nextpage');
        document.cookie = ('nextpage=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;secure;samesite=Lax');
        document.getElementById('login').submit();
    }
    else {
        next = getUrlParameter('next')
        if (next == undefined) {
            next = ''
        }
        document.cookie = ('nextpage=/' + next.substring(1) + expires + ';path=/;secure;samesite=Lax');
        window.location.replace('https://discordapp.com/api/oauth2/authorize?client_id=636254553372884992&response_type=code&scope=identify%20guilds.join%20email&redirect_uri=https://catpowered.net/login');
    }
}
if (getUrlParameter('code') && (getCookie('nextpage') != '')) (
    submitForm(1)
)
else (
    submitForm(0)
)
