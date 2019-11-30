//helper functions

const get = (id) => {
    return document.getElementById(id);
}

//function to connect to github API.

const connect = (username) => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://api.github.com/users/${username}`, true);

    request.onload = function() {
        const data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
        } else {
            console.log('error')
        }
    }
    request.send();
}

const form = get("form").addEventListener('submit', (event) => {
    event.preventDefault();
    user = get("input").value;
    console.log(user)
    connect(user);
})


