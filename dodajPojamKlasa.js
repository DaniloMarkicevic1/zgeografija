export class Dodajpojam {
    constructor(k, ko, p, ps) {

        this.kategorija = k;
        this.korisnik = ko;
        this.pojam = p;
        this.pojmovi = db.collection('pojmovi');
        this.pocetnoSlovo = ps;
    }

    set kategorija(k) {
        this._kategorija = k;
    }
    get kategorija() {
        return this._kategorija;
    }
    set korisnik(ko) {
        this._korisnik = ko;
    }
    get korisnik() {
        return this._korisnik;
    }
    set vreme(v) {
        this._vreme = v;
    }
    get vreme() {
        return this._vreme;
    }
    set pocetnoSlovo(ps) {
        this._pocetnoSlovo = ps;
    }
    get pocetnoSlovo() {
        return this._pocetnoSlovo;
    }
    set pojam(str) {
        let regEx = /[!@#$%^&*(),.?":;{}|<>0-9_\s]/g;
        // Korigovanje stringa 
        str = str.replace(regEx, '');
        str = str.toLowerCase();
        let pomStr = str.slice(1,str.length);
        str = str[0].toUpperCase() + pomStr;
        this._pojam = str;
    }
    get pojam() {
        return this._pojam;
    }
    // Dodavanje
    async dodajPojam() {

        let date = new Date();

        let docPojam = {
            kategorija: this.kategorija,
            pojam: this.pojam,
            pocetnoSlovo: this.pocetnoSlovo,
            korisnik: localStorage.usernameLS,
            vreme: firebase.firestore.Timestamp.fromDate(date)
        }

        let response = await this.pojmovi.add(docPojam);
        return response;
    }
    // Provera pojma

    proveriPojam(callback) {
        let bool = true;
        this.pojmovi
        .where('kategorija', '==', this.kategorija)
        .where('pojam', '==', this.pojam)
        .where('pocetnoSlovo', '==', this.pocetnoSlovo)
        .get()
        .then(snapshot => {

            if (snapshot.docs.length == 0) {
                bool = false;
            }
            callback(bool);

        })
        .catch(error => {
            console.log('Error', error);
        });
    }
}