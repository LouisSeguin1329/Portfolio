//Importation du fichier Utils.js
import Utils from '../utils/Utils';

// Composante hover compétences
export default class Hover {
  //Méthode Constructeur
  constructor(element) {
    this.element = element;
    this.modalId = this.element.dataset.modalId;
    this.parent = this.element.parentElement.parentElement;

    this.creation = document.getElementById('creation');

    this.init();
  }

  //Méthode d'Initialisation
  init() {
    this.element.addEventListener('mouseenter', this.open.bind(this));

    this.element.addEventListener('mouseleave', this.close.bind(this));

    // console.log(this.parent.getAttribute('id'));
    // this.close = this.close.bind(this);
  }

  //Méthode de mise à jour du contenue
  updateContent() {
    //condition pour déterminer le titre de la modale selon le titre du h3
    if (this.modalId == 'modal-dynamic') {
      this.modalElement.innerHTML = Utils.parseTemplate(
        this.modalElement.innerHTML,
        { title: this.element.querySelector('h6').innerHTML }
      );
      //changer le texte de la modale selon le texte de l'élement
      const txtAChanger1 = this.element.querySelector('.description-logiciel');
      const txtModal1 = this.modalElement.querySelector('.txt_modal');

      txtModal1.textContent = txtAChanger1.innerHTML;

      const txtAChanger2 = this.element.querySelector('.explication-logiciel');
      const txtModal2 = this.modalElement.querySelector('.txt_modal2');

      txtModal2.textContent = txtAChanger2.innerHTML;
    }
  }

  //Méthode pour ouvrir la modale
  open(event) {
    this.appendModal();
    console.log('open');
  }

  //Méthode pour fermer la modale
  close(event) {
    console.log('out');
    document.documentElement.classList.remove('modal-is-active');
    this.destroy();
    // this.closeButton.removeEventListener('click', this.close);
    //setTimeout(this.destroy.bind(this), 500);
  }

  //Méthode pour fermer la modale en appuyant sur la touche ESC
  /*  closeEscape(event) {
    if (event.key == 'Escape') {
      document.documentElement.classList.remove('modal-is-active');
      this.closeButton.removeEventListener('keydown', this.closeEscape);
      this.closeButton.removeEventListener('click', this.close);
      setTimeout(this.destroy.bind(this), 1000);
    }
  } */

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

      // document.body.appendChild(this.modalElement);
      this.parent.appendChild(this.modalElement);

      /*  if (this.parent.getAttribute('id') == 'creation') {
        this.creation.appendChild(this.modalElement);
      } */

      this.element.getBoundingClientRect();
      document.documentElement.classList.add('modal-is-active');
      this.element.classList.add('modal-is-active');
      // this.closeButton = this.modalElement.querySelector('.js-close');
      //  this.closeButton.addEventListener('click', this.close);
      //document.addEventListener('keydown', this.closeEscape.bind(this));
      /* 
      this.modalElement
        .querySelector('.modal__scrim')
        .addEventListener('click', this.close);
      console.log(this.closeButton); */
    } else {
      console.log(`Le <template> avec le id ${this.modalId} n'existe pas`);
    }
  }
}
