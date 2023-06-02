import React, { KeyboardEvent, createRef, useEffect, Dispatch, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    Action,
    addItem as addItemAction,
    removeCompleted as removeCompletedAction,
} from 'store/actions';
import Todos from 'components/Todos/Todos';
import TodosController from 'components/TodosControler/TodosController';
import themeContext from 'context/themeContext';
import switchTheme from 'utils/themeSwitch';

interface IThemeCtx {
    $themeCtx: string;
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const StyledInput = styled.input<IThemeCtx>`
    width: 100%;
    height: 64px;
    border: none;
    border-radius: 5px;
    padding-left: 9rem;
    margin-bottom: 50px;
    transition: background-color 0.3s;
    box-shadow: 0px 3px 10px 0px rgba(76, 77, 82, 0.4);
    font-weight: ${({ theme }) => theme.bold};
    font-size: ${({ theme }) => theme.fontSize.s};
    color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorText1', theme)};
    background-color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorSurface', theme)};

    ::placeholder {
        color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorText1', theme)};
    }
    &:focus {
        box-shadow: 0px 0px 2px red;
        outline: 2px dotted ${({ $themeCtx, theme }) => ($themeCtx === 'light' ? theme.darkTheme.colorBg : theme.lightTheme.colorBg)};
    }
    @media (max-width: 600px) {
        height: 48px;
    }
`;

interface ITodoList {
    themeContext: string;
    removeCompleted: () => void;
    addItem: (arg0: string, arg1?: boolean) => void;
}
const TodoList: React.FC<ITodoList> = ({ themeContext, addItem, removeCompleted }) => {
    const inputRef = createRef<HTMLInputElement>();
    const [itemsLeft, setItemsLeft] = useState<number>(0);
    const [showType, setShowType] = useState<'all' | 'completed' | 'active'>('all');

    const handleTodoCreate = (event: KeyboardEvent): void => {
        if (event.key === 'Enter' && inputRef?.current && inputRef.current.value !== '') {
            const value = inputRef.current.value;
            inputRef.current.value = '';
            addItem(value);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', (e) => handleTodoCreate(e as unknown as KeyboardEvent));
    });

    return (
        <StyledWrapper>
            <StyledInput
                maxLength={38}
                ref={inputRef}
                $themeCtx={themeContext}
                placeholder="Create a new todo..."
                onMouseEnter={() => inputRef.current?.focus()}
            />
            <Todos showType={showType} setItemsLeft={setItemsLeft} />
            <TodosController removeCompletedFn={removeCompleted} showTodos={setShowType} showType={showType} itemsLeft={itemsLeft} />
        </StyledWrapper>
    );
};

const DispatchToProps = (dispatch: Dispatch<Action>) => ({
    addItem: async (item: string, storeOnly: boolean) => dispatch(await addItemAction(item, storeOnly)),
    removeCompleted: async () => dispatch(await removeCompletedAction()),
});
export default connect(null, DispatchToProps)(themeContext(TodoList));
