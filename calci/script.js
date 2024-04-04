document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('.buttons button');
  let currentValue = '0';
  let operator = '';
  let prevValue = '';
  
  // Add event listener to each button
  buttons.forEach(button => {
      button.addEventListener('click', handleClick);
  });

  function handleClick(e) {
      const value = e.target.value;
      
      switch (value) {
          case 'clear':
              currentValue = '0';
              operator = '';
              prevValue = '';
              break;
          case 'backspace':
              currentValue = currentValue.slice(0, -1);
              if (currentValue === '') currentValue = '0';
              break;
          case '=':
              if (prevValue !== '') {
                  currentValue = operate(prevValue, operator, currentValue);
                  operator = '';
                  prevValue = '';
              }
              break;
          default:
              if (!isNaN(value) || value === '.') {
                  if (currentValue === '0' && value !== '.') currentValue = '';
                  currentValue += value;
              } else {
                  if (prevValue !== '') {
                      currentValue = operate(prevValue, operator, currentValue);
                      operator = value;
                      prevValue = currentValue;
                      currentValue = '';
                  } else {
                      operator = value;
                      prevValue = currentValue;
                      currentValue = '';
                  }
              }
      }
      
      display.textContent = currentValue;
  }

  function operate(a, operator, b) {
      a = parseFloat(a);
      b = parseFloat(b);
      switch (operator) {
          case '+':
              return a + b;
          case '-':
              return a - b;
          case '*':
              return a * b;
          case '/':
              if (b === 0) return 'Error';
              return a / b;
          case '%':
              return a % b;
          default:
              return b;
      }
  }
});
