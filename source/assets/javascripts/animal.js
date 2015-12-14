'use strict';

export default class Animal {
  constructor(name) {
    this.name = name;
  }

  speak(cry) {
    alert(this.name + ' was squeal with ' + cry);
  }

  static isNamed(animal) {
    return !!animal.name;
  }
}
