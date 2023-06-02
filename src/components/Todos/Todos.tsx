import themeContext from 'context/themeContext';
import React, { Dispatch, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import switchTheme from 'utils/themeSwitch';
import { ReactComponent as CrossIcon } from 'assets/icon-cross.svg';
import { ReactComponent as PenIcon } from 'assets/pen.svg';
import { Action, removeItem as removeItemAction, editItem as editItemAction } from 'store/actions';
import RadioButton from 'components/RadioButton/RadioButton';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TodoItems } from 'store/reducers/rootReducer';
import PageContext from 'context';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import useHandleEditConfirmation from 'utils/handleEditConfirmation';

const StyledItem = styled.li<{ $themeCtx: string }>`
    width: 100%;
    height: 64px;
    padding: 24px;
    display: flex;
    overflow: hidden;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    font-weight: ${({ theme }) => theme.bold};
    transition: border 0.3s, background-color 0.3s, color 0.3s;
    box-shadow: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'boxShadow', theme)};
    color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorTextActive', theme)};
    background-color: ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorSurface', theme)};
    border-bottom: 1px solid ${({ $themeCtx, theme }) => switchTheme($themeCtx, 'colorBorder', theme)};

    .edit-input {
        text-decoration: none;
        border: none;
        border-radius: 4px;
        padding: 6px;
        color: #484b6a;
        font-weight: 700;
        width: 65%;

        &:focus {
            outline: none;
        }
    }

    &:nth-of-type(1) {
        border-radius: 5px 5px 0 0;
    }
    &:hover > svg:nth-of-type(1) {
        opacity: 0.7;
    }
    &:hover > svg:nth-of-type(2) {
        opacity: 1;
    }
    @media (max-width: 600px) {
        height: 52px;
    }
`;
const StyledList = styled.ul<{ $themeCtx: string }>`
    margin: 0;
    padding: 0;
    width: 100%;

    .transition-enter {
        opacity: 0.01;
        transform: translate(0, -10px);
    }

    .transition-enter-active {
        opacity: 1;
        transform: translate(0, 0);
        transition: all 300ms ease-in;
    }

    .transition-exit {
        opacity: 1;
        transform: translate(0, 0);
    }

    .transition-exit-active {
        opacity: 0.01;
        transform: translate(-250px, 0);
        transition: all 500ms ease-in-out;
    }
`;
const StyledCrossIcon = styled(CrossIcon)`
    opacity: 0;
    cursor: pointer;
    margin-left: 12px;
`;
const StyledEditIcon = styled(PenIcon)`
    opacity: 0;
    height: 32px;
    width: 32px;
    cursor: pointer;
    margin-left: auto;
`;
const StyledContent = styled.div`
    &::first-letter {
        text-transform: uppercase;
    }
`;

interface ITodosProps {
    items: { key: string; value: boolean }[];
    removeItem: (arg0: string) => void;
    editItem: (arg0: string) => void;
    showType: 'all' | 'active' | 'completed';
    setItemsLeft: (arg0: number) => void;
    themeContext: string;
}
interface IItemProps {
    content: string;
    completion: boolean;
    removeItemFn: (arg0: string) => void;
    editItemFn: (arg0: string, arg1: string) => void;
    index: number;
}

const Item: React.FC<IItemProps> = ({ removeItemFn, editItemFn, content, completion, index }) => {
    const [isEditMode, toggleEditMode] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(content);
    const { activeTheme } = useContext(PageContext);
    const wrapperRef = useRef<any>(null);

    const editActions = {
        initEditItem: () => {
            toggleEditMode(!isEditMode);
            setTimeout(() => (document.querySelector('.edit-input') as HTMLElement)?.focus(), 100);
        },
        editItemValue: (evt: FormEvent<HTMLInputElement>) => {
            setEditValue(evt.currentTarget.value);
        },
        finalizeEdit: () => {
            toggleEditMode(!isEditMode);
            if (editValue !== content) {
                editItemFn(editValue, content);
            }
        },
    };

    useHandleEditConfirmation(wrapperRef, editActions.finalizeEdit, isEditMode);

    return (
        <Draggable key={content} draggableId={content} index={index}>
            {(provided) => (
                <StyledItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} $themeCtx={activeTheme}>
                    <RadioButton item={content} completion={completion} />
                    {isEditMode ? (
                        <input ref={wrapperRef} value={editValue} onChange={editActions.editItemValue} className="edit-input" type="text" />
                    ) : (
                        <StyledContent>{content}</StyledContent>
                    )}
                    <StyledEditIcon onClick={editActions.initEditItem} />
                    <StyledCrossIcon onClick={() => removeItemFn(content)} />
                </StyledItem>
            )}
        </Draggable>
    );
};

type itemType = {
    key: string;
    value: boolean;
};
const Todos: React.FC<ITodosProps> = ({ removeItem, editItem, items, showType, setItemsLeft, themeContext }) => {
    const [todos, updateTodos] = useState<itemType[]>(items);

    useEffect(() => {
        let itemsLeft = 0;
        items.forEach((val) => {
            val.value === false && itemsLeft++;
        });
        setItemsLeft(itemsLeft);
    }, [items, setItemsLeft]);

    useEffect(() => {
        const newTodos: itemType[] = [];
        items.forEach((todo: itemType) => {
            const { key, value } = todo;
            switch (showType) {
                case 'completed':
                    value === true && newTodos.push({ key, value });
                    break;
                case 'active':
                    value !== true && newTodos.push({ key, value });
                    break;
                default:
                    newTodos.push({ key, value });
            }
        });

        updateTodos(newTodos);
    }, [showType, items]);

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const Items = Array.from(todos);
        const [reorderedItem] = Items.splice(result.source.index, 1);
        Items.splice(result.destination.index, 0, reorderedItem);

        updateTodos(Items);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={'StyledList'}>
                {(provided) => (
                    <StyledList $themeCtx={themeContext} {...provided.droppableProps} ref={provided.innerRef}>
                        <TransitionGroup className={'TransitionGroup'} component={null}>
                            {todos.map((item: itemType, index: number) => (
                                <CSSTransition key={item.key} timeout={350} classNames="transition">
                                    <Item
                                        index={index}
                                        removeItemFn={removeItem}
                                        editItemFn={editItem}
                                        content={item.key}
                                        completion={item.value ? true : false}
                                        key={item.key}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                        {provided.placeholder}
                    </StyledList>
                )}
            </Droppable>
        </DragDropContext>
    );
};

const StateToProps = (state: TodoItems) => {
    const items = [];
    for (const [key, value] of Object.entries(state)) {
        items.push({ key, value });
    }
    return { items };
};
const dispatchToProps = (dispatch: Dispatch<Action>) => ({
    removeItem: async (item: string) => dispatch(await removeItemAction(item)),
    editItem: async (value: string, prevValue: string) => dispatch(await editItemAction(value, prevValue)),
});

export default connect(StateToProps, dispatchToProps)(themeContext(Todos));
