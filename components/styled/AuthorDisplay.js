import React from 'react';
import StyledLink from './StyledLink';

const Author = ({ author = {}, selected = false }) => (
	<StyledLink href={`/user${author.id}`} className="align-self-end mt-2" $selected={selected}>
		{author.email}
	</StyledLink>
);

export default Author;
