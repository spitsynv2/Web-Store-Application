
function validateForm(){

    const idInput = document.getElementById('Id');
    const NameInput = document.getElementById('Name');
    const CenaInput = document.getElementById('Cena');
    const DateInput = document.getElementById('Expiration_date');
    const TypeInput = document.getElementById('Type');
    
    
    const errorId = document.getElementById('errorId');
    const errorName = document.getElementById('errorName');
    const errorCena = document.getElementById('errorCena');
    const errorDate = document.getElementById('erorrExpiration_date');
    const errorType = document.getElementById('errorType');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([idInput,NameInput,CenaInput,DateInput,TypeInput],[errorId,errorName,errorCena,errorDate,errorType],errorsSummary);

    let valid = true;

    if (!checkRequired(NameInput.value)){
        valid=false;
        NameInput.classList.add("error-input");
        errorName.classList.add("errors-text");
        errorName.innerText = "Pole jest wymagane";
    } 

    else if (!checkTextLengthRange(NameInput.value, 2, 60)){
        valid = false;
        NameInput.classList.add("error-input");
        errorName.classList.add("errors-text");
        errorName.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    }

    else {
        resetError(NameInput,errorName);
    }

    if (!checkRequired(CenaInput.value)){
        valid=false;
        CenaInput.classList.add("error-input");
        errorCena.classList.add("errors-text");
        errorCena.innerText = "Pole jest wymagane";
    } 

   else if(!checkNumber(CenaInput.value)){
        valid=false;
        CenaInput.classList.add("error-input");
        errorCena.classList.add("errors-text");
        errorCena.innerText = "Pole musi być liczbą";
    }

    else if(!checkPositive(CenaInput.value)){
        valid=false;
        CenaInput.classList.add("error-input");
        errorCena.classList.add("errors-text");
        errorCena.innerText = "Pole nie może być ujemne";
    }

    else {
        resetError(CenaInput,errorCena);
    }

    if (!checkRequired(TypeInput.value)){
        valid=false;
        TypeInput.classList.add("error-input");
        errorType.classList.add("errors-text");
        errorType.innerText = "Pole jest wymagane";
    } 

    else {
        resetError(TypeInput,errorType);
    }

    if (!checkRequired(DateInput.value)){
        valid=false;
        DateInput.classList.add("error-input");
        errorDate.classList.add("errors-text");
        errorDate.innerText = "Pole jest wymagane";
    } 
   
    else if (!checkDateIfAfter(DateInput.value)){
        valid=false;
        DateInput.classList.add("error-input");
        errorDate.classList.add("errors-text");
        errorDate.innerText = "Produkt ma nieprawidłową datę";
    } 
    
    else {
        resetError(DateInput,errorDate);
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera bledy";
        errorsSummary.classList.add("errors-text");
    }

    return valid;
    
}


function resetErrors (inputs, errorTexts, errorInfo){
    for(let i=0; i<inputs.lengs; i++){
        inputs[i].classList.remove("error-input");
    }

    for(let i=0; i<errorTexts.lengs; i++){
        errorTexts[i].innerText = "";
    }

    errorInfo.innerText = "";
}

function resetError (input, error){
   input.classList.remove("error-input");
   error.classList.remove("error-input");
   error.innerText = "";
}

function checkRequired(value){

    if(!value){
        return false;
    }

    value=value.toString().trim();

    if (value === ""){
        return false;
    }

    return true;
}

function checkTextLengthRange(value, min, max){

    if(!value){
        return false;
    }

    value=value.toString().trim();
    const length = value.length;

    if(max && length > max){
        return false;
    }

    if (min && length < min){
        return false;
    }

    return true;
}

function checkNumber (value){
    if (!value){
        return false;
    }
    if (isNaN(value)){
        return false;
    }
    return true;
}

function checkPositive (value){
    if (!value){
        return false;
    }
    const number = parseFloat(value);
    if (number < 0 ){
        return false;
    }
    return true;
}

function checkDateIfAfter(value){

    if(!value){
        return false;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    if(!pattern.test(value)){
        return false;
    }

    const valueDate = new Date(value);
    const compareDate = new Date();

    if(valueDate.getTime() < compareDate.getTime())
    {
        return false;
    }

    return true;
}