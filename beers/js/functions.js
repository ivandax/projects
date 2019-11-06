console.log("beers")

//logic

const getBeerData = (page_number, per_page)=>{
    return axios.get(`https://api.punkapi.com/v2/beers?page=${page_number}&per_page=${per_page}`).then(response => {
        //console.log("axios response ", response.data)
        const beersData = response.data;
        return beersData;
    })
}

function getObjectFromArrayOfObjects(array, id){
    const object = array.filter(obj => { return obj.id === id} );
	return object[0];//returns the inner object from the array
}

//UI functions...

const get = (id) => {
    return document.getElementById(id);
}

const getClass = (myClass) => {
    return document.getElementsByClassName(myClass);
}

const restartPage = (nextOrPrevious) => { //1 or -1
    get("list").innerHTML = "";//deletes contents of page.
    const page_num = parseInt(get("page_number").innerHTML);
    if(page_num+nextOrPrevious>1){get("prev").classList.add("show")}
    else{get("prev").classList.remove("show")};
    return page_num+nextOrPrevious;
}

//for adding beers one by one to the list (in a loop)
const addBeer = (beer, targetId) => {
    const node = document.createElement("div");
    node.setAttribute("id", beer.id);
    node.setAttribute("class", "beers");
    const textnode = document.createTextNode(beer.name);
    node.appendChild(textnode);
    get(targetId).appendChild(node);
}

//to display the selected beer on the right...
const displayBeer = (name, tagline, image_url) => {
    const html =
    `
    <h3>${name}</h3>
    <h5>${tagline}</h5>
    <img src="${image_url}" alt="beer">
    `;
    get("display").innerHTML = html;
}

const mapBeersOnClick = (myClass, obj) => {
    const beers = Array.from(getClass(myClass)); //collection > to array
    beers.map((beer)=>{
        beer.onclick = () =>{
            selectedBeer = getObjectFromArrayOfObjects(obj, parseInt(beer.id))
            console.log(selectedBeer)
            displayBeer(selectedBeer.name, selectedBeer.tagline, selectedBeer.image_url);
        }
    })
}

//this actually builds the list with the loop
const buildList = (page_number=1, per_page=25) => {
    const beerPromise = getBeerData(page_number, per_page);
    beerPromise.then((obj)=>{
        obj.forEach(beer => {
            addBeer(beer,"list");           
        });
        get("page_number").innerHTML = page_number; //sets page number
        mapBeersOnClick("beers",obj);
        //first 
        displayBeer(obj[0].name, obj[0].tagline, obj[0].image_url)
    })
}

get("next").addEventListener("click", ()=>{
    const next = restartPage(1);
    buildList(next);
})

get("prev").addEventListener("click", ()=>{
    const prev = restartPage(-1);
    buildList(prev);
})

//execution

//first call makes the list with page 1 by default...
buildList();
//first beer to display
