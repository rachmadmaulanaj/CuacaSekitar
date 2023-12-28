import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)


/*
Akun OpenWeather
	username : rachmadmaulanaaa@gmail.com
	password : soerabaja46
Aturan Penulisan
	- property = snake_case
	- variable = snake_case
	- state = camelCase
	- function = camelCase
	- attribute = camelCase
	- component = PascalCase 
	- event name format = on + nama aksi + nama event
	- function name format = handle + nama aksi + nama event
*/
