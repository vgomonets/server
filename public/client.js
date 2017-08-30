
var host = window.document.location.host.replace(/:.*/, '');
var socket = new WebSocket('ws://' + host + ':8080');

socket.onopen = function (event) {
    console.log("ready", event);
    socket.send("next-command");
};

socket.onmessage = function (event) {
    console.log("message", event.data);
    if(event.data === 'open-tab') {
        window.postMessage({
            direction: "open-my-page",
            message: event.data
        }, '*');
    }
}
