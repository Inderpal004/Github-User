const APIUrl = 'https://api.github.com/users/';
const defaultUsername = 'Inderpal004';

const form = document.getElementById('form');
const inputBox = document.getElementById('search');
const nameUser = document.querySelector('.username')
const avatar = document.querySelector('.avatar');
const userBio = document.querySelector('.userBio');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const repositories = document.querySelector('.repositries');

const fetchData = async (username) => {
    try {
        let response = await fetch(APIUrl + username);

        if (!response.ok) {
            throw new Error('User not found');
        }

        let data = await response.json();
         console.log(data);
        avatar.src = data.avatar_url;
        nameUser.innerHTML = data.name;
        userBio.innerHTML = data.bio;
        followers.innerHTML = `Followers: ${data.followers}`;
        following.innerHTML = `Following: ${data.following}`;
        repositories.innerHTML = `Repositories: ${data.public_repos}`;

        getRepos(username)
        inputBox.value = '';
    } catch (error) {
        console.error(error.message);
    }
};

fetchData(defaultUsername);

const getRepos = async (username) => {
    const repos = document.querySelector("#repos");
    repos.innerHTML = '';  
    const response = await fetch(APIUrl + username + "/repos");
    const data = await response.json();
    
    data.forEach((item) => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "_blank";
        repos.appendChild(elem);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputUsername = inputBox.value.trim();

    if (inputUsername !== '') {
        fetchData(inputUsername);
    }
});
