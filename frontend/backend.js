/*
* API functions for the application
* Det er ikke meningen at denne fil skal vises til kommende elever
* I kan selv vælge om i vil men disse dele vil ikke være lige så læselige som dem i main.js
*/

const apiBaseUrl = (window.location.hostname === 'localhost' || window.location.hostname === "127.0.0.1" )? 'http://localhost:3000' : '/api';
const pusherUrl = (window.location.hostname === 'localhost' || window.location.hostname === "127.0.0.1" )? "soketi-uowkcw8w0oscgo8gkk4ck808.milasholsting.dk": "/socket"


export function gemHilsen(name, message) {
    console.log("gemmer hilsen")
    fetch(`${apiBaseUrl}/hilsen`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ name, message }),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert(`Hilsen gemt med id ${data.id}`);
        if(data.errors) {
            response = {
                success: false,
                errors: data.properties
            };
            return;
        }
        res = {
            success: true,
            response: data
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Der skete en fejl under gemning af hilsen');
    });
}

export function hentHilsner(setHilsner) {
    fetch(`${apiBaseUrl}/hilsen`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        setHilsner(data);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Der skete en fejl under hentning af hilsner');
    });
}

const pusher = new Pusher("webdev-example", {
    wsHost: pusherUrl,
    wsPort: 80,
    forceTLS: true,
    encrypted: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss']
});



pusher.subscribe("hilsner").bind("message", (data) => {
    console.log(data)
    alert(data.content);
});
