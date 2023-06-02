import styled, { css } from 'styled-components';

const Header = styled.h1<{ $big: boolean; $themeCtx: string }>`
    font-size: ${({ theme, $big }) => ($big ? theme.fontSize.xl : theme.fontSize.l)};
    font-weight: ${({ theme }) => theme.bold};
    color: "#1a1a1a";
    transition: all 0.3s ease;
    @media (max-width: 600px) {
        font-size: ${({ theme }) => theme.fontSize.l};
    }

    ${({ $big }) =>
        $big &&
        css`
            position: relative;

            &::after {
                content: 'Axelote';
                position: absolute;
                color: #ff0e9c;
                font-size: 22px;
                right: -129px;
                top: -8px;
            }

            &::before {
                content: 'with';
                position: absolute;
                color: #000000;
                font-size: 22px;
                right: -46px;
                top: -8px;
            }
        `}

    &::first-letter {
        text-transform: uppercase;
    }
`;

export default Header;
