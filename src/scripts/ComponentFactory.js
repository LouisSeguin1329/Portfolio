//import Carousel from './components/Carousel';
import Header from './components/Header';
//import Modal from './components/Modal';
//import Scrolly from './components/Scrolly';
//import Accordeon from './components/Accordeon';
import Form from './components/Form';
import Video from './components/Video';
import Hover from './components/Hover';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      //  Carousel,
      Header,
      Hover,
      // Modal,
      // Scrolly,
      // Accordeon,
      Video,
      Form,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
