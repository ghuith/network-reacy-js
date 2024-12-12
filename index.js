let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let cityName = document.querySelector('.city-name'); // Ville
let flag = document.querySelector('.location img'); // Drapeau
let form = document.querySelector("form"); // Formulaire
let temperatureValue = document.querySelector('.temperature .temp-value'); // Température
let weatherIcon = document.querySelector('.temperature img'); // Icône météo
let description = document.querySelector('.description'); // Description météo
let valueSearch = document.getElementById('name'); // Input
let clouds = document.getElementById('clouds'); // Nuages
let humidity = document.getElementById('humidity'); // Humidité
let pressure = document.getElementById('pressure'); // Pression
let main = document.querySelector('main'); // Section principale

// Événement de soumission du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value !== '') {
        searchWeather();
    }
});

// Fonction pour rechercher la météo
const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === 200) {
                cityName.innerText = data.name; // Nom de la ville
                flag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`; // Drapeau
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`; // Icône météo
                temperatureValue.innerText = data.main.temp; // Température
                description.innerText = data.weather[0].description; // Description

                clouds.innerText = data.clouds.all; // Nuages
                humidity.innerText = data.main.humidity; // Humidité
                pressure.innerText = data.main.pressure; // Pression
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = ''; // Réinitialiser le champ de saisie
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météo :", error);
            main.classList.add('error');
            setTimeout(() => {
                main.classList.remove('error');
            }, 1000);
        });
};

// Initialisation avec une recherche par défaut
const initApp = () => {
    valueSearch.value = 'london';
    valueSearch.value = 'paris';
    valueSearch.value = 'new york';

    searchWeather();
};
initApp();
