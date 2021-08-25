"use strict";

var calculatorCounter = document.querySelector('.calculator__input');
var calculatorKeys = document.querySelector('.calculator__keys'); // Indentificar todos los botones oprimidos
// Los números tecaldos antes del primer operador
// El tipo de operador
// Mientras no se oprima "clear" quiero que se acumulen los resultados

document.addEventListener('DOMContentLoaded', function () {
  calculator();
});

function calculator() {
  // const arrNumbers = []
  // const arrOperation = []
  // let arrCounter = 0
  // Una variable que voy a utilizar para guardar las operaciones y seguir aculando las sumas.
  // No puedo tomar e.target directamente desde los parámetros, por eso lo coloco debajo.
  var numbersInField = false;
  var gettingNumbers;
  var typeOperation;
  var result = '';
  calculatorKeys.addEventListener('click', function (e) {
    var t = e.target,
        d = e.target.dataset; // El textContent para tomar el número que se muestra en el HTML

    if (d.number) writeScreen(d.number);
    if (d.math) setOperation(t.textContent);
    if (d.operation) runOperation(d.operation);
  });

  function writeScreen(number) {
    // Si hay que borrar la información anterior (por un símbolo), entonces I want que borres el contenido del input. De otra medio, el input va acumular los otros números
    if (number !== '.') {
      if (numbersInField || calculatorCounter.value === '') {
        calculatorCounter.value += number;
      } else {
        calculatorCounter.value = number;
      }

      numbersInField = true;
      return;
    }

    if (calculatorCounter.value.includes('.') === false && numbersInField) {
      calculatorCounter.value += number;
    }
  }

  function setOperation(operationSymbols) {
    if (numbersInField) {
      typeOperation = operationSymbols;
      gettingNumbers = Number(calculatorCounter.value);
      numbersInField = false;
      calculatorCounter.value = typeOperation;
    }
  }

  function runOperation(operation) {
    if (operation === 'clear') {
      calculatorCounter.value = '';
      result = '';
      numbersInField = false;
      return;
    }

    switch (typeOperation) {
      case '+':
        result = gettingNumbers + Number(calculatorCounter.value);
        break;

      case '-':
        result = gettingNumbers - Number(calculatorCounter.value);
        break;

      case '*':
        result = gettingNumbers * Number(calculatorCounter.value);
        break;

      case '/':
        result = gettingNumbers / Number(calculatorCounter.value);
        break;

      default:
        break;
    }

    if (gettingNumbers === undefined || calculatorCounter.value === '' || calculatorCounter.value == 'NaN') {
      alert('Try adding some more numbers');
      return;
    }

    if (!numbersInField && typeOperation) {
      alert('You have only chosen one number');
    } // Si incluye punto y numeros luego del mismo, quiero que me restrinja los decimales a 2. De esta forma porque sino, aunque no lo tuviera el resultado siempre daría por ejemplo 20.00 


    calculatorCounter.value = result; // Luego de ejecutar un igual, no quiero que si no se define otro número tome mi último simbolo para efectuar otras operaciones con las varables ya registradas.

    typeOperation = undefined;
  }
}
