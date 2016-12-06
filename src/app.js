import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
	constructor(props) {
		super(props);

		document.title = props.title;

		this.state = {
			cities: [],
			forecast: {}
		};

		this.handleCitySelection = this.handleCitySelection.bind(this);
		this.fetchCities = this.fetchCities.bind(this);
		this.fetchForecast = this.fetchForecast.bind(this);
	}

	componentDidMount() {
		this.fetchCities();
	}

	handleCitySelection(event) {
		this.fetchForecast(event.target.value);
	}

	async fetchCities() {
		try {
			const res = await fetch('/data/cities.json');

			if (!res.ok) {
				throw new Error('An unknown error has occurred.');
			}

			const cities = await res.json();

			this.setState({ cities });
		} catch (error) {
			console.error(error);
			this.setState({ error });
		}
	}

	async fetchForecast(location) {
		try {
			const res = await fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(location.toLowerCase())}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`);

			if (!res.ok) {
				throw new Error('An unknown error has occurred.');
			}

			const data = await res.json();

			// query.results.channel.item.forecast

			this.setState({ forecast: data }, () => {
				console.log(this.state.forecast);
			});
		} catch (error) {
			console.error(error);
			this.setState({ error });
		}
	}

	render() {
		return (
			<div className="app">
				<header>
					{<h1>Choose a city</h1>}
				</header>
				<main>
					<select onChange={this.handleCitySelection} defaultValue="-- SELECT A CITY">
						<option disabled>-- SELECT A CITY</option>
						{this.state.cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
					</select>
					<div className="forecast"></div>
				</main>
			</div>
		);
	}
}

render((
	<App title="Weather" />
), document.getElementById('root'));
