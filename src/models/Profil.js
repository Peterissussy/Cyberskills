import { WochenPlan } from './WochenPlan';

export class Profil {
  constructor(username, kalorien, allergene, spezielleDiaet, makros) {
    this.username = username;
    this.kalorien = kalorien;
    this.allergene = allergene;
    this.spezielleDiaet = spezielleDiaet;
    this.makros = makros;
    this.wochenplan = new WochenPlan();
  }

  berechneTagesbedarf() {
    return this.kalorien;
  }
}