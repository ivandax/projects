//helper functions

const get = (id) => { //get from id
    return document.getElementById(id);
}

const createElement = (elementType, content='') => {
    const node = document.createElement(elementType);
    node.appendChild(document.createTextNode(content));
    return node;
}

//simplifies modifying the DOM.
const modifyInfo = (img,login,name,bio) => {
    get('avatar').src = img;
    get('username').innerHTML = `@${login}`;
    const nameString = name ? name : "Name not available";
    get('name').innerHTML =  nameString;
    const bioString = bio ? bio : "Bio not available";
    get('desc').innerHTML =  bioString;    
}

const listRepos = (array) => {
    const list = get('repoList');
    array.forEach( (repo) => {
        const repoDetail = createElement("li");
        const link = createElement("a",repo.name);
        link.setAttribute("href",repo.html_url);
        link.setAttribute("target","_blank");
        repoDetail.appendChild(link);
        repoDetail.appendChild(createElement("span",repo.stargazers_count))
        list.appendChild(repoDetail);
    })
}

//functions to connect to API.
//We are using axios to handle the requests to API.

const fetch = async (url) => {
    const result = await axios.get(url)
    .catch( function(error){
        return false;
    });

    if(result.status === 200){
        return result.data;
    }
}

const fetchUserData = async (username) => {
    const url = `https://api.github.com/users/${username}`;
    const result = await fetch(url);

    if(result){
        const repos = await fetch(result.repos_url)
        const userData = {...result, repoArray: repos} //combines user data + repos
        return userData;
    } else {
        return undefined;
    }
}

const form = get("form").addEventListener('submit', async (event) => {
    get('repoList').innerHTML = ''; //eliminate previous searched repos
    get('success').classList.remove("show"); //reset success
    get('fail').classList.remove("show"); //reset fail
    event.preventDefault();

    user = get("input").value;
    if(user){
        data = await fetchUserData(user);

        if(data){
            modifyInfo(data.avatar_url,data.login,data.name,data.bio); //user info
            listRepos(data.repoArray); //user repos
            get('success').classList.add("show"); //show it when ready
        } else{
            get('fail').classList.add("show"); //show error if data is undefined
        }
        get('input').value = '';//reset input to blank
    }
})