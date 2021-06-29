const calculatorMathLine = document.getElementById("calculator-math-line");
const calculatorResult = document.getElementById('calculator-result');
const calculatorActions = document.getElementById('calculator-actions');
const buttons = document.querySelectorAll('.calculator__button');

let firstNumber = '';
let operation = '';
let secondNumber = '';

calculatorActions.addEventListener('click', event => {
	const button = event.target;
	const buttonValue = button.textContent;

	if (buttonValue === 'C') {
		calculatorMathLine.textContent = '';
		calculatorResult.textContent = '';
		firstNumber = '';
		operation = '';
		secondNumber = '';
	} else if (button.classList.contains('number')) {
		if (operation.length === 0) {
			firstNumber += buttonValue;
		} else {
			secondNumber += buttonValue;
		}
	} else if (buttonValue === '%') {
		if (secondNumber !== '') {
			switch (operation) {
				case '*':
				case '/':
					secondNumber /= 100;
					break;
				default:
					secondNumber *= firstNumber / 100;
					break;
			}
		} else {
			firstNumber /= 100;
		}
	} else if (button.classList.contains('operation')) {
		operation = buttonValue;
	} else if (buttonValue === "=") {
		console.log(parseFloat(firstNumber));
		console.log(parseFloat(secondNumber));
		switch (operation) {
			case '*':
				result = parseFloat(firstNumber) * parseFloat(secondNumber);
				break;
			case '/':
				result = parseFloat(firstNumber) / parseFloat(secondNumber);
				break;
			case '+':
				result = parseFloat(firstNumber ?? '') + parseFloat(secondNumber ?? '');
				break;
			case '-':
				result = parseFloat(firstNumber) - parseFloat(secondNumber);
				break;
			default:
				result = calculatorMathLine.textContent;
				break;
		}
		console.log(result);
		let array = result.toString().split('.');
		console.log('array: ', array);
		if (array.length === 2) {
			array[1] = array[1].slice(0, 3);
			result = array.join('.');
		}
				
		calculatorResult.textContent = (result.toString().length <= 13) ? result : 'Too big number';
		
		firstNumber = '';
		operation = '';
		secondNumber = '';
	} else if (buttonValue === '.') {
		const number = (operation.length === 0) ? firstNumber : secondNumber;

		if (number.match(/\./)) {
			return;
		} else {
			if (operation.length === 0) {
				firstNumber += buttonValue;
			} else {
				secondNumber += buttonValue;
			}
		}
	} 
	
	calculatorMathLine.textContent = `${firstNumber} ${operation} ${secondNumber}`;
});

calculatorResult.addEventListener('click', () => {
	firstNumber = calculatorResult.textContent;
	calculatorMathLine.textContent = `${firstNumber} ${operation} ${secondNumber}`;
});

document.addEventListener('keydown', event => {
	for (const key in buttons) {
		if (Object.hasOwnProperty.call(buttons, key)) {
			const button = buttons[key];
			if (button.textContent === event.key) {
				button.click();
			} else if (event.key === "Delete" && button.textContent === 'C') {
				button.click();
			} else if (event.key === "Enter" && button.textContent === '=') {
				button.click();
			} else if (event.key === "," && button.textContent === '.') {
				button.click();
			}
		}
	}

	switch (event.key) {
		case "ArrowUp":
			calculatorResult.click();
			break;
		case "Backspace":
			if (secondNumber !== '') {
				secondNumber = secondNumber.slice(0, secondNumber.length - 1);
			} else {
				firstNumber = firstNumber.slice(0, secondNumber.length - 1);
			}
			calculatorMathLine.textContent = `${firstNumber} ${operation} ${secondNumber}`;
			break;
	
		default:
			break;
	}
});