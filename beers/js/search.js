//LOGIC
const getBeerNames = async () => {
    const response = await axios.get("https://api.punkapi.com/v2/beers?brewed_after=10-1990&per_page=80");
    const beerNames = [];
    response.data.forEach((beer)=>{
        beerNames[beerNames.length] = beer.name;
    })

    return beerNames;
}

const getBeerByName = async (name) => {
    const response = await axios.get(`https://api.punkapi.com/v2/beers?beer_name=${name}`)
    return response.data[0];
}

//UI
//important, async and await...
const populateAutoComplete = async () => {
    //without await, we only get a promise, not the actual array.
    const names = await getBeerNames();
    $("#tags").autocomplete({source:names});
}

//this populated the autocomplete, using jQuery UI
populateAutoComplete();

const displaySelection = async (name,tagline,date,description,image_url) => {
    const html = 
    `
    <h3>${name}</h3>
    <h5>${tagline}</h5>
    <h5>First Brewed in ${date}</h5>
    <p>${description}</p>
    <img src="${image_url}" alt="beer">
    `;
    get("display_area").innerHTML = html;
}

//we need the await to get the actual obj, not just a promise...
get("display").addEventListener("click", async ()=>{
    const selection = get("tags").value;
    const beer = await getBeerByName(selection);
    console.log(beer)
    displaySelection(beer.name, beer.tagline, beer.first_brewed, beer.description, beer.image_url);
})


