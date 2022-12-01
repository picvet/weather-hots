'use strict';

// 0ae0cfdbfadc45679e9185801223011 - API KEY
// http://api.weatherapi.com/v1/forecast.json?key=0ae0cfdbfadc45679e9185801223011&q=London&days=1&aqi=yes&alerts=yes   - API CALL

const API_KEY = '0ae0cfdbfadc45679e9185801223011';

function getCityName() {

    var city;
    var input_city = document.getElementById("cityInput").value;

    if ((input_city.trim().length === 0)) {
        alert('Enter something!')
    } else {
        city = input_city;
    }

    return city;

}

function getJSONFile(city) {

}

window.addEventListener('load', () => {

    var city = 'London';


    // const TEST_API_CALL = 'http://api.weatherapi.com/v1/forecast.json?key=0ae0cfdbfadc45679e9185801223011&q=London&days=1&aqi=yes&alerts=yes';
    const API_CALL = 'http://api.weatherapi.com/v1/forecast.json?key=0ae0cfdbfadc45679e9185801223011&q=' + city + '&days=1&aqi=yes&alerts=yes';

    const xmlhttp = new XMLHttpRequest(),
        method = 'GET',
        url = API_CALL;

    xmlhttp.open(method, url, true);
    xmlhttp.onerror = function() {
        alert('We seem to be experiencing some techincal issue!')
    };
    xmlhttp.send();

    xmlhttp.onload = () => {
        const data = JSON.parse(xmlhttp.response);

        // change the fields in the HTML
        console.log(data.location.name);

        // changing HTML elements using data
        var cities = document.getElementsByClassName('header-location');
        for (let i = 0; i < cities.length; i++) {
            cities[i].innerHTML = data.location.name;
        }

        var temperature = document.getElementsByClassName('header-temperature');
        for (let i = 0; i < temperature.length; i++) {
            temperature[i].innerHTML = data.current.temp_c;
        }

        var header_weather_icon = document.getElementsByClassName('header-weather-icon');
        for (let i = 0; i < header_weather_icon.length; i++) {
            header_weather_icon[i].src = 'https:' + data.current.condition.icon;
        }

        document.getElementById('condition').innerHTML = data.current.condition.text;
        // var condition = document.getElementsByClassName('condition');
        // for (let i = 0; i < condition.length; i++) {
        //     condition[i].innerHTML = data.current.condition.text;
        // }

        document.getElementById('time').innerHTML = data.location.localtime;

        document.getElementById('wind').innerHTML = data.current.wind_kph + ' ';


    }



});

// function to call when I get an onclick even
function checkCity() {

    var city = getCityName();

    const API_CALL = 'http://api.weatherapi.com/v1/forecast.json?key=0ae0cfdbfadc45679e9185801223011&q=' + city + '&days=1&aqi=yes&alerts=yes';

    const xmlhttp = new XMLHttpRequest(),
        method = 'GET',
        url = API_CALL;

    xmlhttp.open(method, url, true);
    xmlhttp.onerror = function() {
        alert('We seem to be experiencing some techincal issue!')
    };
    xmlhttp.send();

    xmlhttp.onload = () => {
        const data = JSON.parse(xmlhttp.response);

        // change the fields in the HTML
        // console.log(data.location.name);

        // check if the data is empty
        if (data.error.message.includes('No matching location found.')) {
            alert("Sorry we don't know that city! Try another one.");
        } else {

            // changing HTML elements using data
            var cities = document.getElementsByClassName('header-location');
            for (let i = 0; i < cities.length; i++) {
                cities[i].innerHTML = data.location.name;
            }

            var temperature = document.getElementsByClassName('header-temperature');
            for (let i = 0; i < temperature.length; i++) {
                temperature[i].innerHTML = data.current.temp_c;
            }

            var header_weather_icon = document.getElementsByClassName('header-weather-icon');
            for (let i = 0; i < header_weather_icon.length; i++) {
                header_weather_icon[i].src = 'https:' + data.current.condition.icon;
            }

            document.getElementById('condition').innerHTML = data.current.condition.text;
            // var condition = document.getElementsByClassName('condition');
            // for (let i = 0; i < condition.length; i++) {
            //     condition[i].innerHTML = data.current.condition.text;
            // }

            document.getElementById('time').innerHTML = data.location.localtime;

            document.getElementById('wind').innerHTML = data.current.wind_kph + ' ';

        }
    }
}