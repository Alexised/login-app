
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const [recaptchaValue, setRecaptchaValue] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el reCAPTCHA se ha resuelto
    // if (!recaptchaValue) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'Por favor, complete el reCAPTCHA.',
    //   });
    //   return;
    // }

    // Verificar el usuario y la contraseña
    if (usuario === 'admin@admin.com' && contrasena === 'Admin') {
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido, administrador!',
      });
      navigate('/characters');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
      });
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Iniciar Sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUsuario(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setContrasena(e.target.value)}
              />
                      <ReCAPTCHA
          sitekey="6Lch_QgoAAAAAEISWhQymoganGy5gpgPBwb5whAq"
          onChange={(value) => setRecaptchaValue(value)}
        />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                iniciar session
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    olvidaste tu contraseña
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}