var searchInput = $('#search-input')
var searchBtn = $('#search-btn')
var forcastCardsDiv = $('.forecast-cards')
var currentWeatherDiv = $('.current-weather-div')
var searchHistoryBtns = $('.search-history-btns')
var currentDate = dayjs()
var weekDate = dayjs()


var cityName = searchInput.val()

var apiKey = '95034a892cd8054a8bdfbc0bb94fcc69'
var currentURL = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=imperial`
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?&appid=${apiKey}&units=imperial`

// Function to output weather data to DOM
function weatherOutput() {
    var cityName = searchInput.val()
    $.get(forecastURL + `&q=${cityName}`)
        .then(function (data) {
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

    $.get(currentURL + `&q=${cityName}`)
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

function getWeather() {
    var history = getSearchHistory()
    // 2. Console logging getSearchHistoryFunction 4. rawData or empty array gets logged 
    // console.log(cityName)
    // If history doesn't include city name save it local storage
    if (!history.includes(cityName)) {
        // Add the city to the history array
        history.push(cityName)
        // Replace the old history array in local with the new array
        localStorage.setItem('search-history', JSON.stringify(history))
    }
    // Make a function that retrieves search history (min. 32)
    weatherOutput()
}

// Function that outputs history as buttons
function outputHistory() {
    var cityNameHistory = JSON.parse(localStorage.getItem('search-history'))

    for (i = 0; i < cityNameHistory.length; i++) {
        searchHistoryBtns.append(`
        <button>${cityNameHistory[i]}</button>
        `)
        // var historyBtnText = cityNameHistory[i]
        if (i === 8) {
            break;
        }

        if (null){
            return
        }
    }
    console.log(cityNameHistory)
    // console.log(historyBtnText)
}

// Call function to output history buttons
getSearchHistory()
outputHistory()


// 1. Click activates getWeather function
searchBtn.click(getWeather)
searchHistoryBtns.on('click', 'button', getWeather)



