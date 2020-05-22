export class Korisnik {
    constructor(k) {
        this.korisnik = k;
    }
    set korisnik(k) {
        this._korisnik = k;
    }
    get korisnik() {
        return this._korisnik;
    }
}

