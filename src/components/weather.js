import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../app.scss';

class Weather extends Component {
	constructor(props) {
		super(props);

		document.title = props.title;

		this.state = {
			cities: props.cities,
			selectedCity: '',
			units: {},
			weather: {}
		};

		this.handleCitySelection = this.handleCitySelection.bind(this);
		this.fetchForecast = this.fetchForecast.bind(this);
	}

	handleCitySelection(event) {
		this.fetchForecast(event.target.value);
	}

	async fetchForecast(location) {
		try {
			const query = `
				SELECT * \
				FROM weather.forecast \
				WHERE woeid IN (
					SELECT woeid \
					FROM geo.places(1) \
					WHERE text="${location.toLowerCase()}"
				)`;

			const res = await fetch(`https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(query)}&format=json&env=store://datatables.org/alltableswithkeys`);

			if (!res.ok) {
				throw new Error('An unknown error has occurred.');
			}

			const data = await res.json();

			this.setState({
				units: data.query.results.channel.units,
				weather: data.query.results.channel.item
			});
		} catch (error) {
			this.setState({ error });
		}
	}

	render() {
		return (
			<div styleName="app">
				<header>
					{<h1>Choose a city</h1>}
				</header>
				<main>
					<select onChange={this.handleCitySelection} defaultValue="-- SELECT A CITY">
						<option disabled>-- SELECT A CITY</option>
						{this.state.cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
					</select>
					{this.state.weather.condition && <div className="condition">
						<div className="condition-date">{this.state.weather.condition.date}</div>
						<div className="condition-temp">{this.state.weather.condition.temp}&deg;{this.state.units.temperature}</div>
						<div className="condition-text">{this.state.weather.condition.text}</div>
					</div>}
					<div className="forecast">
					{this.state.weather.forecast && this.state.weather.forecast.map((item, i) => (
						<div key={i} className="forecast-item">
							<div className="forecast-item-date">{item.day} {item.date}</div>
							<div className="forecast-item-high">{item.high}</div>
							<div className="forecast-item-low">{item.low}</div>
							<div className="forecast-item-text">{item.text}</div>
						</div>
					))}
					</div>
					{this.state.error && <div className="error">{this.state.error.message}</div>}
				</main>
			</div>
		);
	}
}

Weather.propTypes = {
	title: React.PropTypes.string,
	cities: React.PropTypes.array
};

export default CSSModules(Weather, styles);
