import React, { Component } from 'react';
import { styled } from 'styletron-react';
import Condition from './condition.jsx';
import Forecast from './forecast.jsx';

class App extends Component {
	constructor(props) {
		super(props);

		document.title = props.title;

		this.state = {
			selectedCity: '-- SELECT A CITY',
			units: {},
			weather: {},
			error: null
		};

		this.handleCitySelection = this.handleCitySelection.bind(this);
		this.fetchForecast = this.fetchForecast.bind(this);
	}

	handleCitySelection(event) {
		this.setState({
			selectedCity: event.target.value,
			units: {},
			weather: {},
			error: null
		}, () => {
			this.fetchForecast(this.state.selectedCity);
		});
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

			const res = await fetch(`https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(query.replace(/\s+/, ' '))}&format=json&env=store://datatables.org/alltableswithkeys`);

			if (!res.ok) {
				throw new Error('An unknown error has occurred.');
			}

			const data = await res.json();

			if (process.env.NODE_ENV === 'dev') {
				console.info(data);
			}

			if (data.query.results) {
				this.setState({
					units: data.query.results.channel.units,
					weather: data.query.results.channel.item
				});
			} else {
				this.setState({
					error: new Error(`No weather available for ${this.state.selectedCity}`)
				});
			}
		} catch (error) {
			this.setState({
				error
			});
		}
	}

	render() {
		const Container = styled('div', {
			fontSize: '12px',
			margin: '0 20px'
		});

		const Title = styled('h1', {
			fontWeight: 'normal'
		});

		const CitySelect = styled('select', {
			height: '2em',
			lineHeight: '2',
			backgroundColor: '#eee',
			border: '1px solid #ddd'
		});

		const CityOption = (props) => <option {...props} />;

		const ErrorMessage = styled('div', {
			color: 'red'
		});

		return (
			<Container>
				<Title>Choose a city</Title>

				<CitySelect onChange={this.handleCitySelection} value={this.state.selectedCity}>
					<CityOption disabled>-- SELECT A CITY</CityOption>
					{this.props.cities.map((city, i) => (
						<CityOption key={i} value={city}>{city}</CityOption>
					))}
				</CitySelect>

				{this.state.weather.condition && <Condition
					date={this.state.weather.condition.date}
					temp={`${this.state.weather.condition.temp}${this.props.symbols.DEGREE}${this.state.units.temperature}`}
					text={this.state.weather.condition.text}
				/>}

				{this.state.weather.forecast && <Forecast
					items={this.state.weather.forecast}
					symbols={this.props.symbols}
					units={this.state.units}
				/>}

				{this.state.error && <ErrorMessage>{this.state.error.message}</ErrorMessage>}
			</Container>
		);
	}
}

App.propTypes = {
	title: React.PropTypes.string,
	cities: React.PropTypes.array,
	symbols: React.PropTypes.object
};

export default App;
