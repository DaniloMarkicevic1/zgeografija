let formPredlog = document.querySelector('#predlog');
let birajKategoriju = document.querySelector('#birajKategoriju');
let inputNoviPojam = document.querySelector('#noviPojam');

formPredlog.addEventListener('submit', e => {
    let bool = false;

    e.preventDefault();
    console.log(birajKategoriju.value);

    let regEx = /[!@#$%^&*(),.?":{}|<>0-9_\s]/g;

    let str = inputNoviPojam.value; 
    str = str.replace(regEx, '');
    str = str.toLowerCase();
    let pomStr = str.slice(1,str.length);
    str = str[0].toUpperCase() + pomStr;

    let date = new Date();

    console.log(str);

    db.collection("pojmovi")
    .where('kategorija', '==', `${birajKategoriju.value}`)
    .where('pocetnoSlovo', '==', `${str[0]}`)
    .get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(str == doc.data().pojam) {
                bool = true;
                console.log('Postoji');
            }
        });

        if(bool) {
            alert('Pojam postoji')
        }
        else {
            db.collection('pojmovi').doc().set({
                kategorija: `${birajKategoriju.value}`,
                pojam: `${str}`,
                pocetnoSlovo: `${str[0]}`,
                korisnik: localStorage.usernameLS,
                vreme: firebase.firestore.Timestamp.fromDate(date)
            })
            .then(function() {
                console.log('Pojam uspesno dodat');
            })
            .catch(function(error) {
                console.error("Greska pri dodavanju ", error);
            });
        }
    
    })
    .catch(error => {
        console.error('Greska', error);
    });

    formPredlog.reset();
});


