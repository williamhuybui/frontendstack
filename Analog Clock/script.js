const hourHand = document.querySelector("#hour-hand");
const minuteHand = document.querySelector("#minute-hand");
const secondHand = document.querySelector("#second-hand");
const date = document.querySelector("#date");
const month = document.querySelector("#month");

function setRotation(hand, rotation){
    hand.style.setProperty('--rotation', rotation);
}

function setClock(){
    const currentDate = new Date();
    const seconds = currentDate.getSeconds();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const miliseconds = currentDate.getMilliseconds();
    
    const secondsRotation = (seconds / 60) * 360 + (miliseconds / 1000) * 6;
    const minutesRotation = ((minutes + seconds / 60) / 60) * 360;
    const hoursRotation = ((hours + minutes / 60) / 12) * 360;

    setRotation(secondHand, secondsRotation);
    setRotation(minuteHand, minutesRotation);
    setRotation(hourHand, hoursRotation);

    date.textContent = currentDate.getDate();
    month.textContent = currentDate.toLocaleString('default', { month: 'short' });
}

setInterval(setClock, 10);
