import { Dodajpojam } from "./dodajPojamKlasa.js";
import { Korisnik } from "./korisnik.js";
import { sortByFrequencyAndRemoveDuplicates } from "./hallOfFame.js"
//-------------------------------------------------
let formPredlog = document.querySelector('#predlog');
let birajKategoriju = document.querySelector('#birajKategoriju');
let inputNoviPojam = document.querySelector('#noviPojam');
//-------------------------------------------------
let formUsername = document.querySelector('#formUsername');
let inputUsername = document.querySelector('#inputUsername');
let btnUsername = document.querySelector('#btnUsername');
//-------------------------------------------------

formUsername.addEventListener('submit', () => {

    let korisnik = new Korisnik(`${inputUsername.value}`);
    localStorage.setItem('usernameLS', korisnik.korisnik);

})
//-------------------------------------------------
console.log()
formPredlog.addEventListener('submit', e => {
    e.preventDefault();

    let k = `${birajKategoriju.value}`;
    let ko = localStorage.usernameLS;
    let p = `${inputNoviPojam.value}`;
    let ps = p[0].toUpperCase();
    let noviPojam = new Dodajpojam(k, ko, p, ps);

    if(localStorage.usernameLS == '') {
        alert('Niste uneli korisnicko ime')
    }
    else {
        noviPojam.proveriPojam(bool => {
            if(bool) {
                alert('Pojam postoji');
            }
            else {
                noviPojam.dodajPojam();
                console.log('Pojam dodat uspesno')
            }
        });
    }
    formPredlog.reset();
});
//-------------------------------------------------
db.collection('pojmovi')
.orderBy('korisnik')
.get()
.then(snapshot => {
    let arr = [];
    let counter = 0;
    let name = []
    let altarr = [];
    
    snapshot.docs.forEach((doc, i) => {
 
            arr.push(doc.data().korisnik);

    });
    console.log(sortByFrequencyAndRemoveDuplicates(arr));
    // console.log(arr);
    // for (let i = arr.length; i >= 0 ; i--) {
    //     counter++
    //     if(arr[i] != arr[i-1]) {
    //         if(name[4]) {
    //             break;
    //         }
    //         else {
    //             altarr.push(counter);
    //             name.push([counter,arr[i]]);
    //             counter = 0;}
    //     }
    // }
    
    // console.log(name);
})
.catch(error => {
    console.log('Error', error);
});
