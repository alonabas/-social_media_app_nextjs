import { createTheme } from '@mui/material';
import COLORS from './colors';

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
	palette: {
		custom: createColor(COLORS.third),
		customDark: createColor(COLORS.contrast2),
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
