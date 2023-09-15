function validateForm(){

    const Product_idInput = document.getElementById('Product_Id');
    const Supplier_idInput = document.getElementById('Supplier_Id');
    const Delivery_dateInput = document.getElementById('Delivery_date');
    const Total_CostInput = document.getElementById('Total_Cost');
    const PerishableInput = document.getElementById('Perishable');
    const Weight_kgInput = document.getElementById('Weight_kg');


    const Product_idError = document.getElementById('errorProduct_id');
    const Supplier_idError = document.getElementById('errorSupplier_id');
    const Delivery_dateError = document.getElementById('errorDelivery_date');
    const Total_CostError = document.getElementById('errorTotal_Cost');
    const PerishableError = document.getElementById('errorPerishable');
    const Weight_kgError= document.getElementById('errorWeight_kg');

    const errorsSummary = document.getElementById('errorsSummary');

    let valid = true;

    resetErrors([Product_idInput,Supplier_idInput,Delivery_dateInput,Total_CostInput,PerishableInput,Weight_kgInput],
        [Product_idError,Supplier_idError,Delivery_dateError,Total_CostError,PerishableError,Weight_kgError],errorsSummary);

    if (!checkSelectInput(Product_idInput.value)){
        valid=false;
        Product_idInput.classList.add("error-input");
        Product_idError.classList.add("errors-text");
        Product_idError.innerText = "Pole jest wymagane";
    }

    else {
        resetError(Product_idInput,Product_idError);
    }

    if (!checkSelectInput(Supplier_idInput.value)){
        valid=false;
        Supplier_idInput.classList.add("error-input");
        Supplier_idError.classList.add("errors-text");
        Supplier_idError.innerText = "Pole jest wymagane";
    }

    else {
        resetError(Supplier_idInput,Supplier_idError);
    }

    if (!checkRequired(Delivery_dateInput.value)){
        valid=false;
        Delivery_dateInput.classList.add("error-input");
        Delivery_dateError.classList.add("errors-text");
        Delivery_dateError.innerText = "Pole jest wymagane";
    }

    else if (!checkDateIfAfter(Delivery_dateInput.value)){
        valid=false;
        Delivery_dateInput.classList.add("error-input");
        Delivery_dateError.classList.add("errors-text");
        Delivery_dateError.innerText = "Data jest nieprawidłowa";
    }

    else {
        resetError(Delivery_dateInput,Delivery_dateError);
    }


    if (!checkRequired(Total_CostInput.value)){
        valid=false;
        Total_CostInput.classList.add("error-input");
        Total_CostError.classList.add("errors-text");
        Total_CostError.innerText = "Pole jest wymagane";
    }

    else if(!checkNumber(Total_CostInput.value)){
        valid=false;
        Total_CostInput.classList.add("error-input");
        Total_CostError.classList.add("errors-text");
        Total_CostError.innerText = "Pole musi być liczbą";
    }

    else if(!checkPositive(Total_CostInput.value)){
        valid=false;
        Total_CostInput.classList.add("error-input");
        Total_CostError.classList.add("errors-text");
        Total_CostError.innerText = "Pole nie może być ujemne";
    }

    else {
        resetError(Total_CostInput,Total_CostError);
    }

    if (!checkSelectInput(PerishableInput.value)){
        valid=false;
        PerishableInput.classList.add("error-input");
        PerishableError.classList.add("errors-text");
        PerishableError.innerText = "Pole jest wymagane";
    }

    else if(!checkBoolSelect(PerishableInput.value)){
        valid=false;
        PerishableInput.classList.add("error-input");
        PerishableError.classList.add("errors-text");
        PerishableError.innerText = "Pole musi zawierać: True or False";
    }

    else {
        resetError(PerishableInput,PerishableError);
    }

    if (!checkRequired(Weight_kgInput.value)){
        valid=false;
        Weight_kgInput.classList.add("error-input");
        Weight_kgError.classList.add("errors-text");
        Weight_kgError.innerText = "Pole jest wymagane";
    }

    else if(!checkNumber(Weight_kgInput.value)){
        valid=false;
        Weight_kgInput.classList.add("error-input");
        Weight_kgError.classList.add("errors-text");
        Weight_kgError.innerText = "Pole musi być liczbą";
    }

    else if(!checkPositive(Weight_kgInput.value)){
        valid=false;
        Weight_kgInput.classList.add("error-input");
        Weight_kgError.classList.add("errors-text");
        Weight_kgError.innerText = "Pole nie może być ujemne";
    }

    else {
        resetError(Weight_kgInput,Weight_kgError);
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



    if(valueDate.getTime() > (compareDate.getTime() + 604800000))
    { 
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

    if (value == "1"){
        return true;
    }

    if (value == "0"){
        return true;
    }

    return false;

}
