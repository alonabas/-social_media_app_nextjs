
import { Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.css';
import BoldTypography from '../components/BoldTypography';
import Container from '../components/Container';
import LocalHead from '../components/LocalHead';
import Main from '../components/Main';
import theme from '../components/MuiTheme';

const Login = () => {
    return (
        <Container className="d-flex">
            <LocalHead name="Enter your account"/>
            <ThemeProvider theme={theme}>

                <Main className="d-flex flex-column m-auto align-items-center align-self-center my-auto">
                    <BoldTypography color="custom" className="my-2">
                        Login with your credentials
                    </BoldTypography>
                    <TextField 
                        label="E-mail" 
                        variant="outlined" 
                        size="small" 
                        color="custom" 
                        className="my-2" 
                    />
                    <TextField 
                        label="Pasword" 
                        variant="outlined" 
                        color="custom" 
                        size="small" 
                        className="my-2" 
                    />
                    <Button color="custom" variant="contained">
                        Sign in
                    </Button>

                </Main>
            </ThemeProvider>

        </Container>
    )
}

export default Login;