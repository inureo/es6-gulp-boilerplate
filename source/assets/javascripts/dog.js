'use strict';

import Animal from './animal';

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  bow() {
    Animal.prototype.speak.call(this, 'bow');
  }
}

const dog = new Dog('John');
dog.bow();
