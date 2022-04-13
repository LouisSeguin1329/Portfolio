export default class Form {
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;

    this.init();
  }

  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    if (this.validate()) {
      console.log('success');
      this.showConfirmation();
    } else {
      console.log('fail');
      event.preventDefault();
    }
  }

  validate() {
    let isValide = true;

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required && !this.validateInput(input)) {
        isValide = false;
      }
    }

    return isValide;
  }

  validateInput(event) {
    const input = event.curentTarget || event;

    if (input.validity.valid) {
      //pas d'erreur
      this.removeError(input);
    } else {
      //une erreur
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container = input.closest('.input');
    container.classList.add('error');
  }

  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
