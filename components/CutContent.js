import React from 'react';
import { styled } from '@mui/system';

import ItalicDiv from './styled/ItalicDiv';
import COLORS from './colors';

const VISIBLE_NUMBER_OF_CHARS = 200;

const SpanStyled = styled('span')(({ $withDots = false }) => ({
	...($withDots ? {
		'&:after': {
			content: "'...'",
		},
	} : {}),
}));

const StyledDiv = styled('div')({
	color: COLORS.contrast2,
	cursor: 'pointer',
	'&:hover, &:focus': {
		color: COLORS.contrast,
		textDecoration: 'underline',
	},
});

const MoreLess = ({ children, toggle }) => (
	<StyledDiv onClick={toggle} className="text-end">
		{children}
	</StyledDiv>
);

const CutContent = ({ content = '', className = '' }) => {
	const [isWholePostShown, setIsWholePostShown] = React.useState(false);
	const [isPostCuttable, setIsPostCuttable] = React.useState(
		content.length > VISIBLE_NUMBER_OF_CHARS,
	);
	React.useEffect(() => {
		setIsPostCuttable(content.length > VISIBLE_NUMBER_OF_CHARS);
	}, [content]);
	return (
		<ItalicDiv className={className}>
			<SpanStyled $withDots={!isWholePostShown}>
				{isWholePostShown ? content : content.substring(0, VISIBLE_NUMBER_OF_CHARS)}
			</SpanStyled>
			{isPostCuttable
				&& (
					<MoreLess toggle={() => setIsWholePostShown((prev) => !prev)}>
						{isWholePostShown ? '...Less' : 'More...'}
					</MoreLess>
				)}
		</ItalicDiv>
	);
};

export default CutContent;
