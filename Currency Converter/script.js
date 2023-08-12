// API key set up
const api_key = "6d7f79622e028df476b0e3e5";
const base_url = `https://v6.exchangerate-api.com/v6/${api_key}`;

// TEST if the fetch function working
// fetch(`${base_url}/codes`).then((response)=>{
//     return response.json();
// }).then((data)=>{
//     console.log(data);
// });


// 1. DEFINE FUNCTIONS - CORE LOGICS
// Get supported codes from API. Support code is the pair of code and name of the currency
async function getSupportedCodes(){
    try{
        // await keyword is used in JavaScript to pause the execution of a function until a Promise is settled (i.e., either fulfilled or rejected)
        let response = await fetch(`${base_url}/codes`);
        if (response.ok){
            let data = await response.json();
            const codes = data["supported_codes"];
            return codes;
        }
        return;
    }
    catch(error){
        console.log(error);
        return [];
    }   
}

// Get conversion rate from API
async function getConversionRate(baseCode, targetCode){
    try {
        let response = await fetch(`${base_url}/pair/${baseCode}/${targetCode}`);
        if (response.ok){
            let data = await response.json();
            const rate = data["conversion_rate"];
            return rate;
        }
    } catch (e){
        console.log(e);
        errorMsg.textContent = "Cannot get conversion rate from API";
        return;
    }
}

// 2. IMPLEMENT EVENT LISTENER
const baseUnit = document.getElementById("base-unit");
const targetRate = document.getElementById("target-rate");

const inputBaseAmount = document.getElementById("base-amount");
const selectBaseCode = document.getElementById("base-code");
const inputTargetAmount = document.getElementById("target-amount");
const selectTargetCode = document.getElementById("target-code");

const errorMsg = document.querySelector(".error-message");

let supportedCodes = [];
let conversionRate = 0;

const updateExchangeRate = async () => {
    const baseCode = selectBaseCode.value;
    const targetCode = selectTargetCode.value;
    conversionRate = await getConversionRate(baseCode, targetCode);
    if (conversionRate === 0){
        errorMsg.textContent = "Cannot get conversion rate from API";
        console.log("Cannot get conversion rate from API");
        return;
    }

    errorMsg.textContent = "";
    const baseName = supportedCodes.find(code => code[0] === baseCode)[1];
    const targetName = supportedCodes.find(code => code[0] === targetCode)[1];
    baseUnit.textContent = `1 ${baseName} equals `;
    targetRate.textContent = `${conversionRate} ${targetName}`;
}

const initialize = async () => {
    // Get support  from API
    supportedCodes = await getSupportedCodes();
    errorMsg.textContent = "Loading data...";
    
    // Put options into the select boxs
    if (supportedCodes.length > 0){
        supportedCodes.forEach((code)=>{
            let option = document.createElement("option");
            option.value = code[0];
            option.textContent = code[1];
            selectBaseCode.appendChild(option);

            let targetOption = document.createElement("option");
            targetOption.value = code[0];
            targetOption.textContent = code[1];
            selectTargetCode.appendChild(targetOption);
        });
        selectBaseCode.value = "VND";
        selectTargetCode.value = "USD";
        errorMsg.textContent = "";
    }
    else{
        errorMsg.textContent = "Cannot get supported codes from API";
        console.log("Cannot get supported codes from API");
        return;
    }
    // Get conversion rate from API

}

// 2 EVENT LISTENER
selectBaseCode.addEventListener("change", updateExchangeRate);
selectTargetCode.addEventListener("change", updateExchangeRate);
inputBaseAmount.addEventListener("input", ()=>{
    inputTargetAmount.value = inputBaseAmount.value * conversionRate;
});
inputTargetAmount.addEventListener("input", ()=>{
    inputBaseAmount.value = inputTargetAmount.value / conversionRate;
});
initialize();

// Debug
// getSupportedCodes().then((codes)=>{console.log(codes);});
// getConversionRate("VND", "USD").then((codes)=>{console.log(codes);});

