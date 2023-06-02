import React from 'react';
import styled, { css } from 'styled-components';
import themeContext from 'context/themeContext';
import switchTheme from 'utils/themeSwitch';

interface IStyledIcon {
    $themeCtx: string;
    onClick?: () => void;
    $disableToggle: boolean;
}
const StyledIcon = styled.a<IStyledIcon>`
    color: white;
    background-image: url(${({ $themeCtx, theme }) => switchTheme($themeCtx, 'themeIcon', theme)});
    background-size: contain;
    align-self: center;
    height: 27px;
    width: 27px;
    cursor: ${({ $disableToggle }) => (!$disableToggle ? 'pointer' : 'default')};

    ${({ $themeCtx }) =>
        $themeCtx === 'light' &&
        css`
            height: 30px;
            width: 30px;
        `}
`;
interface ThemeTogglerProps {
    onClickFn?: () => void;
    themeContext: 'dark' | 'light';
    $disableToggle: boolean;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ onClickFn, themeContext, $disableToggle }) => (
    <StyledIcon
        onClick={typeof onClickFn == 'function' ? () => onClickFn() : undefined}
        $themeCtx={themeContext}
        $disableToggle={$disableToggle}></StyledIcon>
);

export default themeContext(ThemeToggler);
