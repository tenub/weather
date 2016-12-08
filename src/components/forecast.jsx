import React from 'react';
import { styled } from 'styletron-react';

export default ({ items, symbols, units }) => {
	const Forecast = styled('div', {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		margin: '0 5px'
	});

	const ForecastItem = styled('div', {
		boxSizing: 'border-box',
		flexBasis: '20%',
		padding: '.5em 5px'
	});

	const ForecastItemDay = styled('div');

	const ForecastItemHigh = styled('div');

	const ForecastItemLow = styled('div');

	const ForecastItemText = styled('div');

	return (
		<Forecast>
		{items.map((item, i) => (
			<ForecastItem key={i}>
				<ForecastItemDay>{item.day} {item.date}</ForecastItemDay>
				<ForecastItemHigh>High: {item.high}{symbols.DEGREE}{units.temperature}</ForecastItemHigh>
				<ForecastItemLow>Low: {item.low}{symbols.DEGREE}{units.temperature}</ForecastItemLow>
				<ForecastItemText>{item.text}</ForecastItemText>
			</ForecastItem>
		))}
		</Forecast>
	);
};
