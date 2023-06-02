import React, { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';
import Button from 'components/Button/Button';
import themeContext from 'context/themeContext';
import switchTheme from 'utils/themeSwitch';
import { useMediaQuery } from 'react-responsive';
import Tooltip from 'utils/tooltip';

const StyledController = styled.div<{ $themeCtx: string }>`
    z-index: 999;
    width: 100%;
    height: 50px;
    padding: 24px;
    display: flex;
    align-items: center;
    transition: background 0.3s;
    border-radius: 0 0 5px 5px;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorText1', theme)};
    background-color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorSurface', theme)};

    @media (max-width: 600px) {
        &:nth-of-type(2) {
            margin-top: 15px;
            border-radius: 5px;
            height: 48px;
            box-shadow: 0px 10px 40px -20px rgba(76, 77, 82, 0.4);
        }
    }
`;
const StyledWrapper = styled.div`
    gap: 15px;
    display: flex;
    flex-direction: row;
`;
const ItemsLeft = styled.div`
    @media (max-width: 600px) {
        font-size: 1.2rem;
    }
`;

const ALL = 'all';
const ACTIVE = 'active';
const COMPLETED = 'completed';

interface ITodosController {
    showType: string;
    itemsLeft: number;
    themeContext: string;
    removeCompletedFn: () => void;
    showTodos: (arg0: string) => void;
}
const TodosController: React.FC<ITodosController> = ({ themeContext, removeCompletedFn, showTodos, showType, itemsLeft }) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 600px)',
    });
    const buttonRef = useRef() as MutableRefObject<HTMLDivElement>;
    const buttonRef1 = useRef() as MutableRefObject<HTMLDivElement>;
    const itemsLeftRef = useRef() as MutableRefObject<HTMLDivElement>;
    const itemsLeftRef1 = useRef() as MutableRefObject<HTMLDivElement>;

    return (
        <>
            <Tooltip component={isMobile ? buttonRef : buttonRef1} content={'completed will be removed'} />

            <Tooltip component={isMobile ? itemsLeftRef : itemsLeftRef1} content={'your items to complete'} />

            {isMobile && (
                <StyledController $themeCtx={themeContext}>
                    <ItemsLeft ref={itemsLeftRef}>
                        {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
                    </ItemsLeft>
                    <Button ref={buttonRef} $themeCtx={themeContext} onClick={() => removeCompletedFn()}>
                        Clear Completed
                    </Button>
                </StyledController>
            )}
            <StyledController $themeCtx={themeContext}>
                {!isMobile && (
                    <ItemsLeft ref={itemsLeftRef1}>
                        {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
                    </ItemsLeft>
                )}
                <StyledWrapper>
                    <Button $themeCtx={themeContext} $big onClick={() => showTodos(ALL)} $isActive={showType === ALL ? true : false}>
                        All
                    </Button>
                    <Button $themeCtx={themeContext} $big onClick={() => showTodos(ACTIVE)} $isActive={showType === ACTIVE ? true : false}>
                        Active
                    </Button>
                    <Button $themeCtx={themeContext} $big onClick={() => showTodos(COMPLETED)} $isActive={showType === COMPLETED ? true : false}>
                        Completed
                    </Button>
                </StyledWrapper>
                {!isMobile && (
                    <Button ref={buttonRef1} $themeCtx={themeContext} onClick={() => removeCompletedFn()}>
                        Clear Completed
                    </Button>
                )}
            </StyledController>
        </>
    );
};

export default themeContext(TodosController);
