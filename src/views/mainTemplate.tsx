import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '../theme/globalStyle';
import { theme } from '../theme/themes';
import styled, { ThemeProvider, css } from 'styled-components';
import logoutIcon from 'assets/logout-icon.svg';
import { isUserAuthenticated, logout } from 'services/session-service';
import logo from 'assets/logo-axelote.webp';

const StyledWrapper = styled.div<{$isAuthenticated: boolean}>`
    width: 100vw;
    height: 100vh;
    display: block;
    position: relative;
    overflow-x: hidden;

    ${({ $isAuthenticated }) =>
        $isAuthenticated &&
        css`
            background-color: white;
        `}
`;
const Logout = styled.div`
    background-image: url(${logoutIcon});
    transition: all .2s ease;
    background-repeat: no-repeat;
    position: absolute;
    margin: 14px 10px;
    cursor: pointer;
    height: 30px;
    z-index: 999;
    width: 30px;
    right: 0;
`;
const AxeloteLogo = styled.a`
    background-image: url(${logo});
    background-repeat: no-repeat;
    position: absolute;
    top: 12px;
    left: 20px;
    height: 100px;
    width: 300px;
    z-index: 999;
    cursor: pointer;
    transition: all .2s ease;
    &:hover{
        transform: scale(1.05);
    }
    @media (max-width: 1100px) {
        display: none;
    }
`;
interface IMainTemplate {
    children: React.ReactNode
}
const MainTemplate: React.FC<IMainTemplate> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (isUserAuthenticated()) {
            setIsAuthenticated(true);
        }
    }, []);

    return <StyledWrapper $isAuthenticated={!isAuthenticated}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <AxeloteLogo href='https://axelote.com/tutorials/creating-todo-list-using-react-and-axelote'/>
            {isAuthenticated && <Logout onClick={logout}/>}
            {children}
        </ThemeProvider>
    </StyledWrapper>
};

export default MainTemplate;
