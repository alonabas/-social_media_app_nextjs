import React from 'react';
import BoldDarkText24 from './BoldDarkText24';
import RegularDark14 from './RegularDark14';

const Bio = ({ bio = '' }) => {
	if (!bio) return '';
	return (
		<div className="d-flex flex-column align-items-start align-self-start">
			<BoldDarkText24>About me: </BoldDarkText24>
			<RegularDark14>{bio}</RegularDark14>
		</div>
	);
};

export default Bio;
