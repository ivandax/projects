console.log("marfeel");

//helper functions

const get = (id) => {
    return document.getElementById(id);
}

//connect to github api

const connect = () => {

    const request = new XMLHttpRequest();

    
}

// var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

// request.onload = function() {
//     var data = JSON.parse(this.response)

//     if (request.status >= 200 && request.status < 400) {
//       data.forEach(movie => {
//         console.log(movie.title)
//       })
//     } else {
//       console.log('error')
//     }
// }

// request.send()

var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.github.com/users/ivandax', true)

request.onload = function() {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        console.log(data);
    } else {
        console.log('error')
    }
}

request.send()