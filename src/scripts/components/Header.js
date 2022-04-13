// Composante Header de Légume
export default class Header {
    //Méthode constructeur
    constructor(element) {
      this.element = element;
  
      //Option pour le scroll
      this.scrollLimit = document.querySelector('header').dataset.scrollLimit;
      this.scrollPosition = 0;
      this.html = document.documentElement;
      this.autoHide = document.querySelector('header').dataset.autoHide;
  
      this.init();
      this.initNavMobile();
    }
  
    //Méthode d'initialisation
    init() {
      console.log('Init du header marche');
  
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  
    //Méthode durant le scroll
    onScroll(event) {
      this.lastScrollPosition = this.scrollPosition;
      this.scrollPosition = document.scrollingElement.scrollTop;
  
      this.setHeaderState();
      this.setDirectionState();
    }
  
    //Méthode pour cacher le header et ajouter ou enlever la classe 'header-is-hidden'
    setHeaderState() {
      const scrollHeight = document.scrollingElement.scrollHeight;
  
      if (this.autoHide == 'true') {
        if (this.scrollPosition > scrollHeight * this.scrollLimit) {
          this.html.classList.add('header-is-hidden');
        } else {
          this.html.classList.remove('header-is-hidden');
        }
      } else {
        console.log('autoHide est pas vrai');
      }
    }
  
    //Méthode pour ajouter ou enlever les classe 'is-scrolling-down' et 'is-scrolling-up' pour déterminer si
    //l'utilisateur scroll vers le haut ou vers le bas
    setDirectionState() {
      if (this.scrollPosition >= this.lastScrollPosition) {
        this.html.classList.add('is-scrolling-down');
        this.html.classList.remove('is-scrolling-up');
      } else {
        this.html.classList.remove('is-scrolling-down');
        this.html.classList.add('is-scrolling-up');
      }
    }
  
    //Méthode d'initialisation du navigateur sur la version mobile
    //Ajout d'un addEventListener sur le bouton pour ouvrir et fermer le menu mobile
    initNavMobile() {
      const toggle = this.element.querySelector('.js-toggle');
  
      toggle.addEventListener('click', this.onToggleNav.bind(this));
    }
  
    //Méthode pour ajouter ou enlever la classe 'nav-is-active' sur le html
    onToggleNav() {
      this.html.classList.toggle('nav-is-active');
    }
  }