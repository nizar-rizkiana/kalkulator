
const calculator = {
   displayNumber: '',
   operator: null,
   firstNumber: null,
   waitingForSecondNumber: false
};
 
function updateDisplay() {
   document.getElementById("displayNumber").focus();
   if(calculator.displayNumber){

        document.querySelector("#displayNumber").value = calculator.displayNumber;
    }else{

       document.querySelector("#displayNumber").value = calculator.firstNumber;
    }
}

function inputClick(){
    document.getElementById("displayNumber").focus();
}

function inputSecondChange(a){
    if(calculator.firstNumber != null){
        let lastDigit = a.slice(a.length-1, a.length);
        if(calculator.displayNumber == calculator.firstNumber){
            document.getElementById('displayNumber').value = lastDigit;
            calculator.displayNumber = lastDigit;
        }else{
            calculator.displayNumber += lastDigit;
        }
    }

}

function inputHapus(h){
    if(h.length < calculator.displayNumber.length){
        calculator.displayNumber = h.slice(0, h.length-1);
    }
}

function inputChange() {
    let angka = document.getElementById('displayNumber').value;

   inputSecondChange(angka);
   inputHapus(angka);
   if(calculator.firstNumber == null){
        inputDigit(angka.slice(angka.length-1, angka.length));
   }
}
 
function clearCalculator() {
   calculator.displayNumber = '';
   calculator.operator = null;
   calculator.firstNumber = null;
   calculator.waitingForSecondNumber = false;
}
 
function inputDigit(digit) {
   if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
       calculator.displayNumber = digit;
   } else {
       if (calculator.displayNumber === '') {
           calculator.displayNumber = digit;
       } else {
           calculator.displayNumber += digit;
       }
   }
}
 
function handleOperator(operator) {
   if (!calculator.waitingForSecondNumber) {
       calculator.operator = operator;
       calculator.waitingForSecondNumber = true;
       calculator.firstNumber = calculator.displayNumber;
       // calculator.firstNumber = document.getElementById("displayNumber").value;
       // calculator.displayNumber = '';

   } else {
       alert('Anda sudah menetapkan operator ( '+ calculator.operator + ' ). Silahkan masukkan angka berikutnya')
   }
}
 
function performCalculation() {
   if (calculator.firstNumber == null || calculator.operator == null) {
       alert("Anda belum menetapkan operator");
       return;
   }
   let result = 0;
   if (calculator.operator === "+") {
       // result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
       result = parseInt(calculator.firstNumber) + parseInt(document.getElementById("displayNumber").value);
   }
   if(calculator.operator === "-") {
       result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
   }
   if(calculator.operator === "x") {
       result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
   }
   if(calculator.operator === "/") {
       result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
   }
 
   // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
   const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
   }
   putHistory(history);
   calculator.displayNumber = result;
   renderHistory();
}

 
 
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
   button.addEventListener('click', function(event) {
 
       // mendapatkan objek elemen yang diklik
       const target = event.target;
 
       if (target.classList.contains('clear')) {
           clearCalculator();
           updateDisplay();
           return;
       }
 
       if (target.classList.contains('equals')) {
           performCalculation();
           updateDisplay();
           return;
       }
 
       if (target.classList.contains('operator')) {
           handleOperator(target.innerText)
            // inputDigit(target.innerText);
           updateDisplay();
           return;
       }
       inputDigit(target.innerText);
       updateDisplay();
   });
}

const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
}




