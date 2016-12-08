import React from 'react';
import { styled } from 'styletron-react';

export default ({ date, temp, text }) => {
	const Condition = styled('div', {
		margin: '1em 10px'
	});

	const ConditionDate = styled('div', {
		fontSize: '1.25em'
	});

	const ConditionTemp = styled('div', {
		fontSize: '1.25em'
	});

	const ConditionText = styled('div', {
		fontSize: '1.25em'
	});

	return (
		<Condition>
			<ConditionDate>{date}</ConditionDate>
			<ConditionTemp>{temp}</ConditionTemp>
			<ConditionText>{text}</ConditionText>
		</Condition>
	);
};
