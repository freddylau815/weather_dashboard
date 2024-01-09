var searchInput = $('#search-input')
var searchBtn = $('#search-btn')
var forcastCardsDiv = $('.forecast-cards')
var currentWeatherDiv = $('.current-weather-div')
var searchHistoryBtnsDiv = $('.search-history-btns')
var searchHistoryBtns = $('.history-btn')

var currentDate = dayjs()
var weekDate = dayjs()

var apiKey = '95034a892cd8054a8bdfbc0bb94fcc69'
var currentURL = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=imperial`
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?&appid=${apiKey}&units=imperial`

// Function to output weather data to DOM
function weatherOutput(city) {
     if(city === "" || !city) {
        console.log('no city')
        return
     }

    $.get(forecastURL + `&q=${city}`)
        .then(function (data) {
            console.log(data)
            var blocks = data.list;
            for (var i = 0; i < blocks.length; i++) {
                var blockObj = blocks[i]
                // Only work with noon time blocks
                if (blockObj.dt_txt.includes('12:00')) {
                    // Output an element for each block into the DOM/ Window 
                    var temp = blockObj.main.temp
                    var wind = blockObj.wind.speed
                    var humidity = blockObj.main.humidity
                    forcastCardsDiv.append(`
                <div>
                <h4>${weekDate.format('M/D/YYYY')}</h4>
                <p>Temp: ${temp}&#8457</p>
                <p>Wind: ${wind} MPH</p>
                <p>Humidity: ${humidity}%</p>
                </div
                `)
                }
            }
        });

    $.get(currentURL + `&q=${city}`)
        .then(function (data) {
            var temp = data.main.temp
            var wind = data.wind.speed
            var humidity = data.main.humidity
            console.log(data)
            currentWeatherDiv.append(`
                <h2>${cityName} ${currentDate.format('M/D/YYYY')}</h2>
                <p>Temp: ${temp}&#8457</p>
                <p>Wind: ${wind} MPH</p>
                <p>Humidity: ${humidity}%</p>
                `)
        })
}

function getSearchHistory() {
    var rawData = localStorage.getItem('search-history')
    var history = JSON.parse(rawData) || []
    // 3. Returtning rawData or empty array if no history
    return history
}

function getWeather(event) {
    var target = event.target;
    var city = undefined;

    // Finds which event is happening search or history
    if(target.id === 'search-btn') {
        city = searchInput.val();
    }
    else {
        // convert to jquery
        city = $(target).text()
    }
    
    var history = getSearchHistory()
    // 2. Console logging getSearchHistoryFunction 4. rawData or empty array gets logged 
    console.log(city)
    // If history doesn't include city name save it local storage
    if (!history.includes(city)) {
        // Add the city to the history array
        history.push(city)
        // Replace the old history array in local with the new array
        localStorage.setItem('search-history', JSON.stringify(history))
    }
    // Weather output function called with city 
    weatherOutput(city)
}

// Function that outputs history as buttons
function outputHistory() {
    var cityNameHistory = JSON.parse(localStorage.getItem('search-history'))
    // If there is nothing in history it returns value and for loop doesn't 
    if(cityNameHistory === null) {
        console.log('No city search history')
        return
     }
     console.log(cityNameHistory)
    for (i = 0; i < cityNameHistory.length; i++) {
        searchHistoryBtnsDiv.append(`
        <button class="history-btn">${cityNameHistory[i]}</button>
        `)
        var searchHistoryBtns = $('.history-btn')
        console.log(searchHistoryBtns.text())
     
        if (i === 8) {
            break;
        }
    }

    historySearch()
}

// Call function to output history buttons
getSearchHistory()
outputHistory()


// 1. Click activates getWeather function
searchBtn.click(getWeather)
function historySearch() {
searchHistoryBtns.on('click', '.history-btn', getWeather)
}

function test() {
    console.log('search history button')
}


