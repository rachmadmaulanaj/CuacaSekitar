import React from 'react';
import Autosuggest from 'react-autosuggest';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Country, State, City } from 'country-state-city';

class SearchLocationForecast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cityMap: '',
			search: '',
			suggestions: []
		};
	}

	allCity = City.getAllCities();

	escapeRegexCharacters = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	getSuggestions = (value) => {
		const escapedValue = this.escapeRegexCharacters(value.trim());
		if (escapedValue === '') return [];
		const regex = new RegExp('^' + escapedValue, 'i');
		let result = [];

		if (value.length >= 4) {
			const cityFilter = this.allCity.filter(language => regex.test(language.name));
			result = cityFilter.map((val) => {
				const countryCity = Country.getCountryByCode(val.countryCode);
				const stateCity = State.getStateByCodeAndCountry(val.stateCode, val.countryCode);
				return {
					...val,
					countryName: countryCity.name,
					stateName: stateCity.name,
				}
			});
		}
		return result;
	}
	// getSuggestionValue = (suggestion) => suggestion.name;
	getSuggestionValue = (suggestion) => `${suggestion.name}, ${suggestion.stateName}, ${suggestion.countryName}`;
	// renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;
	renderSuggestion = (suggestion) => <span>{`${suggestion.name}, ${suggestion.stateName}, ${suggestion.countryName}`}</span>;

	onChange = (event, { newValue, method }) => {
		this.setState({ search: newValue }, () => {
			// this.props.onSearchInputChange(this.state.search);
		});
	};
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({ suggestions: this.getSuggestions(value) });
	};
	onSuggestionsClearRequested = () => {
		this.setState({ suggestions: [] });
	};
	onSuggestionSelected = (event, { suggestion, method }) => {
		this.setState({ cityMap: suggestion });
	};

	handleButtonClick = () => {
		const cityMap = this.state.cityMap;
		if (!this.state.search) {
			alert('Masukkan nama kota');
			this.setState({ cityMap: '' });
			return false;
		}
		if (!cityMap) {
			alert('Kota tidak ditemukan!');
			return false;
		}

		this.setState({ search: `${cityMap.name}, ${cityMap.stateName}, ${cityMap.countryName}` });
		this.props.onSearchButtonClick(cityMap);
	};

	render() {
		const suggestions = this.state.suggestions;
		const search = this.state.search;
		const inputProps = {
			placeholder: "Contoh: 'Surabaya'",
			value: search,
			onChange: this.onChange,
			className: 'form-control'
		};

		return (
			<div className='d-flex align-items-center'>
				<div className='d-inline-block mb-0 pe-3 h3 text-nowrap'>Cuaca untuk kota</div>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={this.getSuggestionValue}
					renderSuggestion={this.renderSuggestion}
					onSuggestionSelected={this.onSuggestionSelected}
					inputProps={inputProps}
				/>
				<div className='d-inline-block py-3 ms-3'>
					<button type='submit' className='btn btn-primary' style={{ width: '100px' }} onClick={this.handleButtonClick}>Cari</button>
				</div>
			</div>
		);
	}
}

export default SearchLocationForecast;