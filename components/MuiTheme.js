import { createTheme } from '@mui/material';
import COLORS from './colors';

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor, contrast = '#fff') => ({
	...augmentColor({ color: { main: mainColor } }),
	contrastText: contrast,
});

const theme = createTheme({
	palette: {
		custom: createColor(COLORS.third, COLORS.contrast2),
		customWithError: createColor(COLORS.third, COLORS.contrast),
		customDark: createColor(COLORS.contrast2, COLORS.third),
		customSemiDark: createColor(`${COLORS.contrast2}ee`, COLORS.second),
		error: {
			main: COLORS.error,
		},
	},
	typography: {
		fontFamily: [
			'"Raleway"',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	components: {
		MuiTypography: {
			// defaultProps: {
			// 	style: {
			// 		color: COLORS.third,
			// 	},
			// },
		},
		MuiInputLabel: {
			defaultProps: {
				style: {
					color: COLORS.fifth,
				},
			},
		},
		MuiOutlinedInput: {

			styleOverrides: {
				root: {
					':hover .MuiOutlinedInput-notchedOutline': {
						borderColor: COLORS.second,
					},
					color: COLORS.second,
				},

				notchedOutline: {
					borderColor: COLORS.fifth,
				},

			},
		},
		MuiButton: {
			styleOverrides: {
				containedCustom: {
					color: COLORS.contrast2,
					'&:hover': {
						backgroundColor: COLORS.fourth,
					},
				},
			},
		},
	},
});

export default theme;
