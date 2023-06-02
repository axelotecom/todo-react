import moonIcon from 'assets/icon-moon.svg';
import sunIcon from 'assets/icon-sun.svg';
import axelote1 from 'assets/illu7_prime.png';
import axelote2 from 'assets/axelote_rocket.png';
import axelote3 from 'assets/illu1.png';
import axelote4 from 'assets/3_illu1.png';
import simple from 'assets/illu8_simple.png';

export const theme = {
    lightTheme: {
        colorRadio: "#ff0e9c",
        colorBg: 'hsl(0, 0%, 96%)',
        colorSurface: 'hsl(0, 0%, 100%)',
        colorBorder: '#dcdde2',
        colorTextActive: 'hsl(235, 20%, 35%)',
        colorTextCompleted: 'hsl(235, 12%, 85%)',
        colorText1: 'hsl(235, 10%, 60%)',
        boxShadow: '0px 35px 50px -15px rgba(76, 78, 82, 0.7)',
        themeIcon: moonIcon,
        axelote1: axelote1,
        axelote2: axelote2,
        simple: simple,
    },
    darkTheme: {
        colorRadio: "#0049ef",
        colorBg: 'hsl(230, 22%, 12%)',
        colorSurface: 'hsl(230, 25%, 20%)',
        colorBorder: '#383842',
        colorTextActive: 'hsl(235, 40%, 85%)',
        colorTextCompleted: 'hsl(230, 15%, 35%)',
        colorText1: 'hsl(235, 16%, 45%)',
        boxShadow: '0px 35px 50px -15px hsla(0, 0%, 0%, 0.7)',
        themeIcon: sunIcon,
        axelote1: axelote3,
        axelote2: axelote4,
        simple: simple,
    },
    gradientPrimary: 'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
    gradientSecondary: 'linear-gradient(#1a0d8d9e, #811085a6)',
    light: 400,
    bold: 700,
    fontSize: {
        xxs: '1.2rem',
        xs: '1.4rem',
        s: '1.6rem',
        m: '2.1rem',
        l: '2.8rem',
        xl: '4rem',
    },
};
