import styled, { css } from 'styled-components';
import switchTheme from 'utils/themeSwitch';

const Button = styled.div<{ $themeCtx: string; $big?: boolean; $isActive?: boolean }>`
    padding: 0;
    margin: 0;
    cursor: pointer;
    border: none;
    font-weight: 400;
    transition: background-color 0.3s;
    font-weight: ${({ theme }) => theme.light};
    color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorText1', theme)};
    transition: color 0.3s;
    ${({ $big }) =>
        $big &&
        css`
            font-weight: ${({ theme }) => theme.bold};
        `}
    ${({ $isActive }) =>
        $isActive &&
        css`
            color: hsl(220, 98%, 61%);
        `}    
    &:hover {
        color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorTextActive', theme)};
    }
`;

export default Button;
