const answerElement = document.getElementById('answer');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');

let result;
let target = '';
let previous_target = '';
let operator = '';

// Event listeners for number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    target += e.target.textContent;
    answerElement.textContent = target;
  });
});

// Event listener for operator buttons
operatorButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    operator = e.target.textContent;
    if (target !== '') {
      calculate(operator);
    }
    target = '';
  });
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
  result = undefined;
  target = '';
  operator = '';
  answerElement.textContent = '';
});

// Calculates the result based on the operator
function calculate(operator) {
  if (result === undefined) {
    result = target;
    return;
  }
  if (target === ''){
    return;
  }

  switch (operator) {
    case '+':
      result = Number(result) + Number(target);
      break;
    case '-':
      result = Number(result) - Number(target);
      break;
    case 'X':
      result = Number(result) * Number(target);
      break;
    case '/':
      result = Number(result) / Number(target);
      break;
  }
  answerElement.textContent = result;
}

// Event listener for equal button
equalButton.addEventListener('click', () => {
  if (target !== '') {
    calculate(operator);
    answerElement.textContent = result;
  }
  target = '';
  operator = '=';
});