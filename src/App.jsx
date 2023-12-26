import { useState, useEffect } from 'react';
import './App.css'
import MapLocation from './components/MapLocation';
import CardWeatherForecast from './components/CardWeatherForecast';
import SearchLocationForecast from './components/SearchLocationForecast';
import ReactLoading from 'react-loading';
import Moment from 'moment';
import 'moment/locale/id';
import BackgroundDaySky from './images/day-sky.jpg';
import BackgroundNightSky from './images/night-sky.jpg';

const api_key = '109083f9414ac2ab1b82f7e6d47db2e3';
const api_url_current_weather = `https://api.openweathermap.org/data/2.5/weather?lang=id&appid=${api_key}`;
const api_url_forecast_3hours_weather = `https://api.openweathermap.org/data/2.5/forecast?lang=id&appid=${api_key}`;
const url_image_icon = `https://openweathermap.org/img/wn/`;
const convertTemperature = (temp, fromUnit, toUnit) => {
	if (typeof temp !== 'number') return false;
	if (fromUnit === toUnit) return temp;
	let tempConvert = temp;

	switch (`${fromUnit}-${toUnit}`) {
		case 'Celsius-Fahrenheit':
			tempConvert = (temp * 9 / 5) + 32;
			break;
		case 'Celsius-Kelvin':
			tempConvert = temp + 273.15;
			break;
		case 'Fahrenheit-Celsius':
			tempConvert = (temp - 32) * 5 / 9;
			break;
		case 'Fahrenheit-Kelvin':
			tempConvert = (temp - 32) * 5 / 9 + 273.15;
			break;
		case 'Kelvin-Celsius':
			tempConvert = temp - 273.15;
			break;
		case 'Kelvin-Fahrenheit':
			tempConvert = (temp - 273.15) * 9 / 5 + 32;
			break;
		default:
			tempConvert = temp;
			break;
	}

	return tempConvert.toFixed(1);
}
const convertDate = (utcTimestamp, timestampDiff, format) => {
	const currentDate = Moment.utc((utcTimestamp * 1000) + (timestampDiff * 1000));

	return currentDate.format(format);
}
const convertLanguage = (textEn) => {
	const weather_lang = [
		{ en: 'Thunderstorm', id: 'Hujan badai' },
		{ en: 'Drizzle', id: 'Gerimis' },
		{ en: 'Rain', id: 'Hujan' },
		{ en: 'Snow', id: 'Salju' },
		{ en: 'Mist', id: 'Kabut' },
		{ en: 'Smoke', id: 'Asap' },
		{ en: 'Haze', id: 'Kabut' },
		{ en: 'Dust', id: 'Debu' },
		{ en: 'Fog', id: 'Kabut Asap' },
		{ en: 'Sand', id: 'Pasir' },
		{ en: 'Ash', id: 'Abu' },
		{ en: 'Squall', id: 'Badai' },
		{ en: 'Tornado', id: 'Angin topan' },
		{ en: 'Clear', id: 'Cerah' },
		{ en: 'Clouds', id: 'Berawan' },
	];

	const result = weather_lang.find(v => v.en === textEn);
	return result ? result.id : '';
}

function App() {
	const [cityMap, setCityMap] = useState({
		status: 'default',
		name: "Indonesia",
		countryCode: "",
		stateCode: "",
		latitude: "-5.00000000",
		longitude: "120.00000000",
		zoom: 4
	});
	const [weather, setWeather] = useState({});
	const [forecast3Hours, setForecast3Hours] = useState([]);

	// const [cityMap, setCityMap] = useState({
	// 	"status": "search",
	// 	"name": "Surabaya",
	// 	"countryCode": "ID",
	// 	"stateCode": "JI",
	// 	"latitude": "-7.24917000",
	// 	"longitude": "112.75083000",
	// 	"zoom": 12
	// });
	// const [weather, setWeather] = useState({
	// 	"date": "Rabu, 20 Desember 2023",
	// 	"time": "10:10 Pagi",
	// 	"temperature": "30.9",
	// 	"icon": "04d",
	// 	"icon_link": "https://openweathermap.org/img/wn/04d@2x.png",
	// 	"main": "Berawan",
	// 	"description": "awan pecah"
	// });
	// const [forecast3Hours, setForecast3Hours] = useState([
	// 	{
	// 		"day": "Rabu",
	// 		"date": "20 Desember 2023",
	// 		"time": "6:00 Pagi",
	// 		"temperature": "31.2",
	// 		"icon": "04d",
	// 		"icon_link": "https://openweathermap.org/img/wn/04d@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan pecah"
	// 	},
	// 	{
	// 		"day": "Rabu",
	// 		"date": "20 Desember 2023",
	// 		"time": "9:00 Pagi",
	// 		"temperature": "30.5",
	// 		"icon": "04d",
	// 		"icon_link": "https://openweathermap.org/img/wn/04d@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan mendung"
	// 	},
	// 	{
	// 		"day": "Rabu",
	// 		"date": "20 Desember 2023",
	// 		"time": "12:00 Siang",
	// 		"temperature": "28.4",
	// 		"icon": "04n",
	// 		"icon_link": "https://openweathermap.org/img/wn/04n@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan mendung"
	// 	},
	// 	{
	// 		"day": "Rabu",
	// 		"date": "20 Desember 2023",
	// 		"time": "3:00 Sore",
	// 		"temperature": "26.6",
	// 		"icon": "04n",
	// 		"icon_link": "https://openweathermap.org/img/wn/04n@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan mendung"
	// 	},
	// 	{
	// 		"day": "Rabu",
	// 		"date": "20 Desember 2023",
	// 		"time": "6:00 Sore",
	// 		"temperature": "25.9",
	// 		"icon": "04n",
	// 		"icon_link": "https://openweathermap.org/img/wn/04n@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan mendung"
	// 	},
	// 	{
	// 		"day": "Rabu",
	// 		"date": "20 Desember 2023",
	// 		"time": "9:00 Malam",
	// 		"temperature": "25.5",
	// 		"icon": "04n",
	// 		"icon_link": "https://openweathermap.org/img/wn/04n@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan mendung"
	// 	},
	// 	{
	// 		"day": "Kamis",
	// 		"date": "2 Desember 2023",
	// 		"time": "12:00 Malam",
	// 		"temperature": "27.4",
	// 		"icon": "04d",
	// 		"icon_link": "https://openweathermap.org/img/wn/04d@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan mendung"
	// 	},
	// 	{
	// 		"day": "Kamis",
	// 		"date": "2 Desember 2023",
	// 		"time": "3:00 Pagi",
	// 		"temperature": "30.7",
	// 		"icon": "03d",
	// 		"icon_link": "https://openweathermap.org/img/wn/03d@2x.png",
	// 		"main": "Berawan",
	// 		"description": "awan tersebar"
	// 	}
	// ]);
	
	const [isLoading, setIsLoading] = useState(false);

	/*
	const weatherCode = {
		AngryClouds: [],
		Cloudy: [000],
		DayClear: [800],
		DayPartialCloud: [000],
		DayRain: [000],
		DayRainThunder: [000],
		DaySleet: [000],
		DaySnow: [000],
		DaySnowThunder: [000],
		Fog: [000],
		Mist: [000],
		NightFullMoonClear: [800],
		NightFullMoonPartialCloud: [000],
		NightFullMoonRain: [000],
		NightFullMoonRainThunder: [000],
		NightFullMoonSleet: [000],
		NightFullMoonSnow: [000],
		NightFullMoonSnowThunder: [000],
		Overcast: [000],
		Rain: [500,501,502,503,504],
		RainThunder: [200,201,202],
		Sleet: [511,611,612,613,615,616],
		Snow: [600,601,602,620,621,622],
		SnowThunder: [000],
		Thunder: [210,211,212,221],
		Tornado: [000],
		Wind: [000],
	};

	function findWeatherCodeByValue(valueToFind) {
		const foundEntry = Object.entries(weatherCode).find(([key, values]) => {
			return values.includes(valueToFind);
		});

		return foundEntry ? foundEntry : null;
	}

	const valueToFind = 403;
	const result = findWeatherCodeByValue(valueToFind);

	if (result) {
		const [key, values] = result;
		console.log(`Key: ${key}, Values: ${values}`);
	} else {
		console.log(`Nilai ${valueToFind} tidak ditemukan dalam objek weatherCode.`);
	}
	*/

	const getForecastCurrentWeather = (lat, lon) => {
		const full_url = api_url_current_weather + `&lat=${lat}&lon=${lon}`;
		return fetch(full_url).then(response => response.json());
	}
	const getForecast3HourstWeather = (lat, lon) => {
		const full_url = api_url_forecast_3hours_weather + `&lat=${lat}&lon=${lon}`;
		return fetch(full_url).then(response => response.json());
	}

	const handleSearchButtonClick = (value) => {
		setIsLoading(true);
		setCityMap({
			status: 'search',
			name: value.name,
			countryCode: value.countryCode,
			stateCode: value.stateCode,
			latitude: value.latitude,
			longitude: value.longitude,
			zoom: 12
		});
	};

	useEffect(() => {
		Moment.updateLocale('id', {
			weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
			months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
			meridiem: (hour) => {
				if (hour >= 3 && hour < 11) {
					return 'Pagi';
				} else if (hour >= 11 && hour < 15) {
					return 'Siang';
				} else if (hour >= 15 && hour < 19) {
					return 'Sore';
				} else {
					return 'Malam';
				}
			}
		});
	}, []);

	useEffect(() => {
		if (cityMap.status === 'search') {
			Promise.all([
				getForecastCurrentWeather(cityMap.latitude, cityMap.longitude),
				getForecast3HourstWeather(cityMap.latitude, cityMap.longitude)
			])
				.then(([currentWeather, forecast3Hours]) => {
					setWeather({
						date: convertDate(currentWeather.dt, currentWeather.timezone, 'dddd, D MMMM YYYY'),
						time: convertDate(currentWeather.dt, currentWeather.timezone, 'LT'),
						temperature: convertTemperature(currentWeather.main.temp, 'Kelvin', 'Celsius'),
						icon: currentWeather.weather[0].icon,
						icon_link: url_image_icon + currentWeather.weather[0].icon + '@2x.png',
						main: convertLanguage(currentWeather.weather[0].main),
						description: currentWeather.weather[0].description,
					});
					let forecast3HoursArr = [];
					for (let i = 0; i < 8; i++) {
						const list = forecast3Hours.list[i];
						forecast3HoursArr.push({
							day: convertDate(list.dt, 0, 'dddd'),
							date: convertDate(list.dt, 0, 'D MMMM YYYY'),
							time: convertDate(list.dt, 0, 'LT'),
							temperature: convertTemperature(list.main.temp, 'Kelvin', 'Celsius'),
							icon: list.weather[0].icon,
							icon_link: url_image_icon + list.weather[0].icon + '@2x.png',
							main: convertLanguage(list.weather[0].main),
							description: list.weather[0].description,
						});
					}
					setForecast3Hours(forecast3HoursArr);
					setIsLoading(false);
				})
				.catch(error => {
					console.error('Error fetching data:', error);
					setIsLoading(false);
				});
		}
	}, [cityMap]);

	const backgroundHeader = {
		backgroundImage: `url(${BackgroundDaySky})`,
        WebkitMaskImage: `linear-gradient(#fff 90%, transparent)`,
		// backgroundImage: `url(${BackgroundNightSky})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
	}

	let defaultTitlePart = cityMap.status === 'default' ? { textAlign: 'center' } : { textAlign: 'left' };
	let defaultShowPart = cityMap.status === 'default' ? { display: 'none' } : { display: 'block' };
	return (
		<div style={{
			fontFamily: 'Yanone Kaffeesatz',
			display: 'flex',
			flexDirection: 'column',
			height: '100vh'
		}}>
			{
				isLoading && (
					<div className='overlay'>
						<ReactLoading type='spinningBubbles' color='#000000' height='10%' width='10%' />
					</div >
				)
			}
			<div className='p-2 d-flex flex-fill' style={backgroundHeader}>
				<div className='row h-100 w-100 m-0'>
					<div className='col-lg-6 m-auto' style={defaultTitlePart}>
						<h1 className='display-1 fw-bold'>Cuaca Sekitar</h1>
						<h3>Cari perkiraan cuaca untuk kota yang Anda ingin tahu</h3>
						<SearchLocationForecast onSearchButtonClick={handleSearchButtonClick} />
						{
							cityMap.status === 'search' ? (
								<div className='d-flex align-items-center justify-content-center h1'>
									<div className='text-center'>
										<div>{weather.date}</div>
										<div>{weather.time}</div>
									</div>
									<img src={weather.icon_link} alt={'weather '+weather.main} className='current-weather-icon' />
									<div className='text-center'>
										<div>{weather.main}</div>
										<div>{weather.temperature}&deg;</div>
									</div>
								</div>
							) : ''
						}
					</div>
					<div className='col-lg-5 mx-auto' style={defaultShowPart}>
						<div className='d-flex justify-content-center align-items-center mb-4'>
							<MapLocation city={cityMap} />
						</div>
					</div>
				</div>
			</div>	
			{
				cityMap.status === 'search' ? (
					<div className='row m-auto'>
						<div className='mb-2'>
							<h2 className='text-center pt-3'>Perkiraan cuaca kota {cityMap.name} 3 Jam selanjutnya</h2>
							<div style={{ border: '2px solid #aeaeae', width: '300px', margin: 'auto' }}></div>
						</div>
						{
							forecast3Hours.map((v, i) => {
								return (<CardWeatherForecast data={v} key={i} />)
							})
						}
					</div>
				) : ''
			}
		</div>
	)
}

export default App;