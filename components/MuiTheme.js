import { createTheme } from "@mui/material";
import COLORS from "./colors";

const theme = createTheme({
	palette: {
		custom: {
			light: COLORS.second,
			main: COLORS.third,
			dark: COLORS.first,
			contrastText: COLORS.fifth
		}
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
			defaultProps: {
				style: {
					color: COLORS.third
				}
			}
		},
		MuiInputLabel: {
			defaultProps: {
				style: {
					color: COLORS.fifth
				},
			},
		},
		MuiOutlinedInput: {

			styleOverrides: {
				root: {
					':hover .MuiOutlinedInput-notchedOutline': {
						borderColor: COLORS.second,
					}
				},

				notchedOutline: {
					borderColor: COLORS.fifth,
				},

			}
		},
		MuiButton: {
			styleOverrides: {
				containedCustom: {
					color: COLORS.contrast2,
					"&:hover": {
						backgroundColor: COLORS.fourth,
					}
				},
				 
			}
		}
	}
});

export default theme;