import React, { Dispatch, useEffect, useState } from 'react';
import TodoList from 'components/TodoList/TodoList';
import Header from 'components/Header/Header';
import styled, { css } from 'styled-components';
import ThemeToggler from 'components/ThemeToggler/ThemeToggler';
import PageContext from 'context';
import switchTheme from 'utils/themeSwitch';
import Tooltip from 'utils/tooltip';
import { axelote } from 'config/axelote-config';
import { todoRepository } from 'repositories/todo-repository';
import { Action } from 'store/actions';
import { addItem as addItemAction, changeCompletion as changeCompletionAction } from 'store/actions';
import { connect } from 'react-redux';
import { AxeloteError, AxeloteResponse } from '@axelote/js';

interface ThemeHandling {
    readonly $themeCtx: string;
    readonly theme: string;
}
const StyledBackgroundTop = styled.div<ThemeHandling>`
    width: 100%;
    height: 300px;
    transition: background-image 0.3s;
    background-color: white;
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: hard-light;
`;
const StyledBackgroundBottom = styled.div<ThemeHandling>`
    width: 100%;
    min-height: calc(100vh - 300px);
    height: auto;
    display: flex;
    position: relative;
    justify-content: center;
    transition: background-color 0.3s;
    background-color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorBg', theme)};
`;
const StyledWrapper = styled.div`
    top: -250px;
    width: 540px;
    position: relative;
    z-index: 999;
    @media (max-width: 600px) {
        max-width: 85%;
        margin-top: 30px;
    }
`;
const HeaderWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const StyledLightTheme = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
`;
const StyledAxelote = styled.div<{$themeCtx: string, $dark?: boolean}>`
    background-position: center;
    position: absolute;
    bottom: 10px;
    right: 0;
    width: 510px;
    height: 380px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${({ theme, $themeCtx }) => switchTheme($themeCtx, 'axelote2', theme)});
    animation: 0.7s ease-in-out slideLeft;
    animation-fill-mode: forwards;

    ${({ $dark }) => $dark && css`
            width: 540px;
            height: 340px;

            @media (max-height: 900px) {
                width: 335px !important;
                height: 210px !important;
            }
        `}


    @media (max-width: 1100px) {
        width: 320px;
        height: 240px;
        bottom: 30px;
    }

    @media (max-height: 900px) {
        width: 320px;
        height: 240px;
        bottom: 30px;
    }
    
    &:nth-of-type(2) {
        background-image: url(${({ theme, $themeCtx }) => switchTheme($themeCtx, 'axelote1', theme)});
        animation: 0.8s ease-in-out slideRight;
        left: 0;
        width: 470px;
        height: 280px;
        bottom: 24px;
        animation-fill-mode: forwards;

        ${({ $dark }) => $dark && css`
            width: 435px;
            height: 500px;
            left: 50px;
            bottom: 60px;

            @media (max-height: 900px) {
                width: 352px !important;
                height: 405px !important;
                bottom: 45px;
                left: 50px;
            }
        `}

        @media (max-width: 1100px) {
            display: none;
        }
    }
    @keyframes slideLeft {
        from {
            transform: translateX(280px) scale(0.9);
        }

        to {
            transform: translateX(-40px) scale(0.9);
        }
    }
    @keyframes slideRight {
        from {
            transform: translateX(-390px);
        }

        to {
            transform: translateX(-20px);
        }
    }
`;
const StyledSimple = styled.div`
    position: absolute;
    top: 36px;
    right: 0px;
    width: 250px;
    height: 180px;
    background-size: cover;
    background-image: url(${({ theme }) => theme.lightTheme.simple});
    animation: 0.7s ease-in-out slideLeftSimple;
    animation-fill-mode: forwards;
    @media (max-width: 1100px) {
        display: none;
    }

    @keyframes slideLeftSimple {
        from {
            transform: translateX(280px) scale(1.1);
        }

        to {
            transform: translateX(calc(-15vw)) scale(1.1);
        }
    }
`;

interface Todo {
    completed: boolean;
    title: string;
}
interface IUserPageTemplate {
    addItem: (arg0: string, arg1?: boolean) => void;
    changeCompletion: (arg0: string, arg1?: boolean, arg2?: boolean) => void;
}
const UserPageTemplate: React.FC<IUserPageTemplate>  = ({ addItem, changeCompletion }) => {
    const [activeTheme, setActiveTheme] = useState<string>('light');
    const [disableToggle, setDisableToggle] = useState<boolean>(false);

    const handleThemeToggle = (): void => {
        setDisableToggle(!disableToggle);
        setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark')
        setTimeout(() => {
            setDisableToggle(false);
        }, 400);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            let todos: AxeloteResponse<Array<Todo>> = await axelote.returning<Array<Todo>>(todoRepository.get("findAll"));
            !(todos instanceof AxeloteError) && todos.forEach(todo => {
                addItem(todo.title, true);
                if(todo.completed){
                    changeCompletion(todo.title, true, true);
                }
            });
        }

        fetchTodos();
    }, []);
    
        return (
            <PageContext.Provider value={{ activeTheme, Tooltip }}>
                <StyledBackgroundTop $themeCtx={activeTheme} />
                <StyledBackgroundBottom $themeCtx={activeTheme}>
                    <StyledWrapper>
                        <HeaderWrapper>
                            <Header $themeCtx={activeTheme} $big>
                                T O D O
                            </Header>
                            <ThemeToggler onClickFn={disableToggle ? null : handleThemeToggle} $disableToggle={disableToggle} />
                        </HeaderWrapper>
                        <TodoList />
                    </StyledWrapper>
                    {activeTheme === 'light' && (
                        <StyledLightTheme>
                            <StyledAxelote $themeCtx={activeTheme}/>
                            <StyledAxelote $themeCtx={activeTheme}/>
                            <StyledSimple/>
                        </StyledLightTheme>
                    )}
                    {activeTheme === 'dark' && (
                        <StyledLightTheme>
                            <StyledAxelote $dark $themeCtx={activeTheme}/>
                            <StyledAxelote $dark $themeCtx={activeTheme}/>
                            <StyledSimple />
                        </StyledLightTheme>
                    )}
                </StyledBackgroundBottom>
            </PageContext.Provider>
        );
    
}
const DispatchToProps = (dispatch: Dispatch<Action>) => ({
    addItem: async (item: string, storeOnly: boolean) => dispatch(await addItemAction(item, storeOnly)),
    changeCompletion: async (item: string, completion: boolean, storeOnly: boolean) => dispatch(await changeCompletionAction(item, completion, storeOnly))
});
export default connect(null, DispatchToProps)(UserPageTemplate as any);