import React, { Dispatch, ReactElement } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeCompletion as changeCompletionAction } from 'store/actions';
import switchTheme from 'utils/themeSwitch';
import themeContext from 'context/themeContext';

const StyledInput = styled.input<{ $themeCtx: string }>`
    &[type='radio'] {
        width: 22px;
        height: 22px;
        appearance: none;
        margin-right: 20px;
        position: relative;
        border-radius: 50% !important;
        transition: all 0.3s;
        border: 1px solid ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorBorder', theme)};
    }
    &[type='radio']:hover {
        cursor: pointer !important;
        border: 2px solid ${({theme}) => theme.gradientPrimary};
    }
    &[type='radio']:before {
        content: '';
        width: 20px;
        height: 20px;
        overflow: hidden;
        position: absolute;
        border-radius: 50%;
        transition: background-color .3s ease;
        background-color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorSurface', theme)};
    }
    &[type='radio']:checked:before {
        background: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorRadio', theme)};
        width: 12px;
        height: 12px;
        left: calc(50% - 6px);
        top: calc(50% - 6px);
    }
`;

interface IRadioButton {
    item: string;
    completion: boolean;
    themeContext: string;
    changeCompletion: (arg0: string, arg1: boolean) => void;
}
const RadioButton: React.FC<IRadioButton> = ({ completion, changeCompletion, item, themeContext }): ReactElement => (
    <StyledInput $themeCtx={themeContext} type="radio" onChange={() => {}} checked={completion} onClick={() => changeCompletion(item, !completion)} />
);

const DispatchToProps = (dispatch: Dispatch<any>) => ({
    changeCompletion: async (item: string, completion: boolean) => dispatch(await changeCompletionAction(item, completion)),
});

export default connect(null, DispatchToProps)(themeContext(RadioButton));
