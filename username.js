let formUsername = document.querySelector('#formUsername');
let inputUsername = document.querySelector('#inputUsername');
let btnUsername = document.querySelector('#btnUsername');

formUsername.addEventListener('submit', e => {
    // e.preventDefault();

    let username = inputUsername.value;
    console.log(username);
    localStorage.setItem('usernameLS', username);
});
