
let divHide = document.querySelector('#hide');

if(localStorage.usernameLS == '') {
    divHide.classList.add("hidden");
}
else{
    divHide.classList.remove("hidden");
}
let coll = db.collection('pojmovi');

