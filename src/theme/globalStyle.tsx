import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');

    *,*::before,*::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html{
        font-size:62.5%;
    }
    body{
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        font-family: 'Josefin Sans', sans-serif;
        @media (max-width: 600px) {
            font-size: 1.2rem;
        }
    }
    
    
`;
