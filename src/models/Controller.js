import { GerichteRepository } from './GerichteRepository';

export class Controller {
  constructor() {
    this.profil = null;
    this.repo = new GerichteRepository();
  }

  empfehleGericht() {
    if (!this.profil) return null;
    const passende = this.repo.findePassende(this.profil);
    return passende;
  }

  gerichtHinzufuegen(tag, gericht) {
    if (this.profil && this.profil.wochenplan) {
      this.profil.wochenplan.addGericht(tag, gericht);
    }
  }

  gerichtEntfernen(tag, index) {
    if (this.profil && this.profil.wochenplan) {
      this.profil.wochenplan.removeGericht(tag, index);
    }
  }

  profilBearbeiten(profil) {
    this.profil = profil;
  }

  getPlan() {
    return this.profil ? this.profil.wochenplan : null;
  }

  getProfil() {
    return this.profil;
  }
}