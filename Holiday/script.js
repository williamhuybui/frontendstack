const API_KEY = "a7dbd841-ac59-4403-aa6c-aee2dabefd06"
let defaultCountry = 'US'
let defaultLanguage = 'en'

// COUNTRY
const getCountries = async () => {
  try {
    const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("Country API status:", data.status);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderCountries = async () => {
  try {
    const data = await getCountries();
    const countriesList = data.countries;
    options = document.getElementById("country-select");
    options.innerHTML = "";

    countriesList.forEach((country) => {
      const x = document.createElement("option");
      if (country.code === defaultCountry) {
        x.setAttribute("selected", "selected");
      }
      x.setAttribute("value", country.code);
      x.innerHTML = country.name;
      options.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};
renderCountries();

// LANGUAGE
const getLanguage = async () => {
  try {
    const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("Country API status:", data.status);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderLanguages = async () => {
  try {
    const data = await getLanguage();
    const languagesList = data.languages;
    options = document.getElementById("language-select");
    options.innerHTML = "";
    languagesList.forEach((language) => {
      const x = document.createElement("option");
      if (language.code === defaultLanguage) {
        x.setAttribute("selected", "selected");
      }
      x.setAttribute("value", language.code);
      x.innerHTML = language.name;
      options.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};
renderLanguages();

// MONTH
const renderMonth = () => {
  options = document.getElementById("month-select");
  options.innerHTML = "";
  for (let i = 0; i <= 12; i++) {
    const x = document.createElement("option");
    if(i === 0){
      x.setAttribute("value", "all");
      x.innerHTML = "All Months";
    }
    else {
      x.setAttribute("value", i);
      x.innerHTML = i;
    }
      options.appendChild(x);
  }
};
renderMonth();

//DAY
const renderDay = () => {
  options = document.getElementById("day-select");
  options.innerHTML = "";
  for (let i = 0; i <= 31; i++) {
    const x = document.createElement("option");
    if(i === 0){
      x.setAttribute("value", "all");
      x.innerHTML = "All Days";
    }
    else {
      x.setAttribute("value", i);
      x.innerHTML = i;
    }
    options.appendChild(x);
  }
};
renderDay();

//HOLIDAY
const getHoliday = async (country, year, month, day, language, search) => {
  try {
    let url = `https://holidayapi.com/v1/holidays?pretty=true&key=${API_KEY}`
    if (month !== "all") url += `&month=${month}`;
    if (day !== "all") url += `&day=${day}`;
    if (country) url += `&country=${country}`;
    if (year) url += `&year=${year}`;
    if (language) url += `&language=${language}`;

    // Correct the condition here
    if (search && search.length >= 5) {
      url += `&search=${search}`;
    } else if (search && search.length > 0) {
      alert("The search parameter must be at least 5 characters")
      return;
    }

    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};


const createHolidayList = (holidayList) => {
  const holidayName = document.querySelector(".holiday-list ul");
  holidayName.innerHTML = "";
  holidayList.forEach((holiday) => {
    const li_container = document.createElement("li");
    li_container.setAttribute("class", "li-container");

    const title = document.createElement("div");
    title.setAttribute("class", "li-title");
    title.textContent = holiday.name;

    const date = document.createElement("div");
    date.setAttribute("class", "li-date");
    date.textContent = holiday.date;  

    li_container.appendChild(title);
    li_container.appendChild(date);
    holidayName.appendChild(li_container);
  });
};


const initializeHoliday = async () => {
  data = await getHoliday(defaultCountry, 2022, 'all', 'all', 'en');
  createHolidayList(data.holidays);
};

const renderHolidayEvent = async () => { 
  try{
    const country = document.getElementById("country-select").value;
    const year = document.getElementById("year-select").value;
    const month = document.getElementById("month-select").value;
    const day = document.getElementById("day-select").value;
    const language = document.getElementById("language-select").value;
    const search = document.getElementById("search").value;

    console.log(country, year, month, day, language, search);

    const data = await getHoliday(country, year, month, day, language, search);
    if (data) {
      const holidayList = await data.holidays;
      createHolidayList(holidayList);
    }
    } catch (err) {
      console.log("err", err);
    }
  };


initializeHoliday();
const button = document.getElementById("search-btn");
button.addEventListener("click", renderHolidayEvent);