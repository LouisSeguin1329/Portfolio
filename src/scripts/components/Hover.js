//Importation du fichier Utils.js
import Utils from '../utils/Utils';

// Composante hover compétences
export default class Hover {
  //Méthode Constructeur
  constructor(element) {
    this.element = element;
    this.modalId = this.element.dataset.modalId;

    this.init();
  }

  //Méthode d'Initialisation
  init() {
    this.element.addEventListener('mouseenter', this.open.bind(this));

    this.close = this.close.bind(this);
  }

  //Méthode de mise à jour du contenue
  updateContent() {
    //condition pour déterminer le titre de la modale selon le titre du h3
    if (this.modalId == 'modal-dynamic') {
      this.modalElement.innerHTML = Utils.parseTemplate(
        this.modalElement.innerHTML,
        { title: this.element.querySelector('h6').innerHTML }
      );
      //changer l'image de la modale selon l'image de l'élement
      const txtAChanger = this.element.querySelector('p');
      const txtModal = this.modalElement.querySelector('.txt_modal');

      txtModal.textContent = txtAChanger.innerHTML;
    }
  }

  //Méthode pour ouvrir la modale
  open(event) {
    this.appendModal();
  }

  //Méthode pour fermer la modale
  close(event) {
    document.documentElement.classList.remove('modal-is-active');
    this.closeButton.removeEventListener('click', this.close);
    setTimeout(this.destroy.bind(this), 1000);
  }

  //Méthode pour fermer la modale en appuyant sur la touche ESC
  closeEscape(event) {
    if (event.key == 'Escape') {
      document.documentElement.classList.remove('modal-is-active');
      this.closeButton.removeEventListener('keydown', this.closeEscape);
      this.closeButton.removeEventListener('click', this.close);
      setTimeout(this.destroy.bind(this), 1000);
    }
  }

  //Méthode pour détruire la modale
  destroy() {
    if (this.modalElement.parentElement) {
      this.modalElement.parentElement.removeChild(this.modalElement);
    }
  }

  //Méthode pour ajouter la modale
  appendModal() {
    const template = document.querySelector(`#${this.modalId}`);

    //Condition pour ajouter une modale selon l'élement qu'on a  cliquer
    if (template) {
      this.modalElement = template.content.firstElementChild.cloneNode(true);

      this.updateContent();

      document.body.appendChild(this.modalElement);

      this.element.getBoundingClientRect();
      document.documentElement.classList.add('modal-is-active');

      this.closeButton = this.modalElement.querySelector('.js-close');
      this.closeButton.addEventListener('click', this.close);
      document.addEventListener('keydown', this.closeEscape.bind(this));

      this.modalElement
        .querySelector('.modal__scrim')
        .addEventListener('click', this.close);
      console.log(this.closeButton);
    } else {
      console.log(`Le <template> avec le id ${this.modalId} n'existe pas`);
    }
  }
}
