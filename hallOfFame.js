export class HallOfFame {
    constructor() {
        this.baza = db.collection('pojmovi');
    }

    nizKorisnika(ul) {
            let arr = [];
            let altarr = [];
            let counter = 0;
            this.baza
            .orderBy('korisnik')
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    arr.push(doc.data().korisnik);
                })

                for (let i = arr.length; i >= 0 ; i--) {
                    counter++
                    if(arr[i] != arr[i-1]) {
                        if(altarr.length == 5) {
                            break;
                        }
                        else {
                            altarr.push(counter);
                            counter = 0;}              
                    }
                }
                altarr.sort((a, b) => b - a);
                // console.log(altarr);

                sortByFrequencyAndRemoveDuplicates(arr).forEach((e, i) => {
                    let li = document.createElement('li');
                    li.innerHTML += `${e} - ${altarr[i]}`;
                    ul.appendChild(li);
                });

            })
            .catch(error => {
                console.log('Error', error);
            });
        }
}
//-------------------------------------------------
function sortByFrequencyAndRemoveDuplicates(array) {
    var frequency = {}, value;
    // compute frequencies of each value
    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }
    // make array from the frequency object to de-duplicate
    var uniques = [];
    for(value in frequency) {
        if(uniques.length == 5) {
            break;
        }
        else {
            uniques.push(value);
        }
    }
    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }
    
    return uniques.sort(compareFrequency);
    };
//-------------------------------------------------
let hofBtn = document.querySelector('#btnHOF');
let hofBtnClear = document.querySelector('#btnHOFClear');

hofBtn.addEventListener('click', () => {
    let ul = document.querySelector('#ulHOF');
    ul.classList.remove("hidden");
    let hof = new HallOfFame;
    ul.innerHTML = '';
    hof.nizKorisnika(ul);
});

hofBtnClear.addEventListener('click', () => {
    let ul = document.querySelector('#ulHOF');
    ul.classList.add("hidden");
});

