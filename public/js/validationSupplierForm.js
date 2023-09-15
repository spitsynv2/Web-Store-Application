function validateForm(){
    const Country_of_originInput = document.getElementById('Country_of_origin');
    const NameInput = document.getElementById('Name');
    const InternationalInput = document.getElementById('International');
    const Delivery_costInput = document.getElementById('Delivery_cost');

    const errorCountry_of_origin = document.getElementById('errorCountry_of_origin');
    const errorName = document.getElementById('errorName');
    const errorInternational = document.getElementById('errorInternational');
    const errorDelivery_cost = document.getElementById('errorDelivery_cost');

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([Country_of_originInput, NameInput,InternationalInput,Delivery_costInput],
        [errorCountry_of_origin,errorName,errorInternational,errorDelivery_cost],errorsSummary);


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

    if (!checkRequired(Country_of_originInput.value)){
        valid=false;
        Country_of_originInput.classList.add("error-input");
        errorCountry_of_origin.classList.add("errors-text");
        errorCountry_of_origin.innerText = "Pole jest wymagane";
    }

    else if (!checkTextLengthRange(Country_of_originInput.value, 2, 60)){
        valid = false;
        Country_of_originInput.classList.add("error-input");
        errorCountry_of_origin.classList.add("errors-text");
        errorCountry_of_origin.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    }

    else {
        resetError(Country_of_originInput,errorCountry_of_origin);
    }

    if (!checkSelectInput(InternationalInput.value)){
        valid=false;
        InternationalInput.classList.add("error-input");
        errorInternational.classList.add("errors-text");
        errorInternational.innerText = "Pole jest wymagane";
    }

    else if(!checkBoolSelect(InternationalInput.value)){
        valid=false;
        InternationalInput.classList.add("error-input");
        errorInternational.classList.add("errors-text");
        errorInternational.innerText = "Pole musi zawierać: True or False";
    }

    else {
        resetError(InternationalInput,errorInternational);
    }

     if(!checkNumber(Delivery_costInput.value)){
        valid=false;
        Delivery_costInput.classList.add("error-input");
        errorDelivery_cost.classList.add("errors-text");
        errorDelivery_cost.innerText = "Pole musi być liczbą";
    }

    else if(!checkPositive(Delivery_costInput.value)){
        valid=false;
        Delivery_costInput.classList.add("error-input");
        errorDelivery_cost.classList.add("errors-text");
        errorDelivery_cost.innerText = "Pole nie może być ujemne";
    }

    else {
        resetError(Delivery_costInput,errorDelivery_cost);
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

function checkSelectInput(value){

    if (!value){
        return false;
    }

    if (value == "-- Select option --"){
        return false;
    }

    return true;
}

function checkBoolSelect(value) {

    console.log(value);

    if (!value){
        return false;
    }

    if (value == 1){
        return true;
    }

    if (value == 0){
        return true;
    }

    return false;

}
