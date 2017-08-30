
var host = window.document.location.host.replace(/:.*/, '');
var socket = new WebSocket('ws://' + host + ':8080');

socket.onopen = function (event) {
    socket.send("next-command");
};

socket.onmessage = function (event) {
    if(event.data === 'open-tab') {
        window.postMessage(event.data, '*');
    }
}
