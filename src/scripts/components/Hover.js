// Composante hover compétences
export default class Hover {
  //Méthode constructeur
  constructor(element) {
    this.element = element;

    this.init();
  }
  //Méthode d'initialisation
  init() {
    const logo = this.element.querySelectorAll('.icon-creation');

    const txt = this.element.querySelectorAll('[hover-txt]');

    logo.addEventListener('mouseover', hover);
  }

  hover() {
    console.log('hahah');
  }
}
