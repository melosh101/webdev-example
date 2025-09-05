/*
* API functions for the application
* Det er ikke meningen at denne fil skal vises til kommende elever
* I kan selv vælge om i vil men disse dele vil ikke være lige så læselige som dem i main.js
*/

const apiBaseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '/api';


export function gemHilsen(name, message) {
    console.log("gemmer hilsen")
    var response;
    
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
        response = {
            success: true,
            response: data
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Der skete en fejl under gemning af hilsen');
    });
}
