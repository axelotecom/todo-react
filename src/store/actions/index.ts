import { AxeloteError, AxeloteVoidResponse } from '@axelote/js';
import { axelote } from 'config/axelote-config';
import { todoRepository } from 'repositories/todo-repository';

export enum ActionType {
    ADD_ITEM = 'ADD_ITEM',
    EDIT_ITEM = 'EDIT_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    REMOVE_COMPLETED = 'REMOVE_COMPLETED',
    CHANGE_COMPLETION = 'CHANGE_COMPLETION',
    DISCARD_ACTION = 'DISCARD_ACTION',
}
export interface IAddItem {
    type: ActionType.ADD_ITEM;
    payload: string;
}
export interface IRemoveItem {
    type: ActionType.REMOVE_ITEM;
    payload: string;
}
export interface IRemoveCompleted {
    type: ActionType.REMOVE_COMPLETED;
}
export interface IChangeCompletion {
    type: ActionType.CHANGE_COMPLETION;
    payload: string;
}
export interface IEditItem {
    type: ActionType.EDIT_ITEM;
    payload: { value: string; prevValue: string };
}

export interface IDiscardAction {
    type: ActionType.DISCARD_ACTION;
}

export type Action = IAddItem | IRemoveItem | IChangeCompletion | IRemoveCompleted | IEditItem | IDiscardAction;

export const addItem = async (title: string, storeOnly?: boolean): Promise<Action> => {
    const addItemResponse: AxeloteVoidResponse | null = storeOnly
        ? null
        : await axelote.void(todoRepository.get('create'), {
              title: title,
              completed: false,
          });

    if (addItemResponse instanceof AxeloteError) return { type: ActionType.DISCARD_ACTION };

    return {
        type: ActionType.ADD_ITEM,
        payload: title,
    };
};

export const editItem = async (newTitle: string, prevTitle: string): Promise<Action> => {
    const editItemResponse: AxeloteVoidResponse = await axelote.void(todoRepository.get('editByTitle'), {
        newTitle: newTitle,
        prevTitle: prevTitle,
    });

    if (editItemResponse instanceof AxeloteError) return { type: ActionType.DISCARD_ACTION };

    return {
        type: ActionType.EDIT_ITEM,
        payload: { value: newTitle, prevValue: prevTitle },
    };
};

export const removeItem = async (title: string): Promise<Action> => {
    const removeItemResponse: AxeloteVoidResponse = await axelote.void(todoRepository.get('deleteByTitle'), {
        title: title,
    });

    if (removeItemResponse instanceof AxeloteError) return { type: ActionType.DISCARD_ACTION };

    return {
        type: ActionType.REMOVE_ITEM,
        payload: title,
    };
};

export const changeCompletion = async (title: string, completed: boolean, storeOnly?: boolean): Promise<Action> => {
    const changeCompletionResponse: AxeloteVoidResponse | null = storeOnly
        ? null
        : await axelote.void(todoRepository.get('changeCompletionByTitle'), {
              title: title,
              completed: completed,
          });

    if (changeCompletionResponse instanceof AxeloteError) return { type: ActionType.DISCARD_ACTION };

    return {
        type: ActionType.CHANGE_COMPLETION,
        payload: title,
    };
};

export const removeCompleted = async (): Promise<Action> => {
    const removeCompletedResponse: AxeloteVoidResponse = await axelote.void(todoRepository.get('removeCompleted'));

    if (removeCompletedResponse instanceof AxeloteError) return { type: ActionType.DISCARD_ACTION };

    return {
        type: ActionType.REMOVE_COMPLETED,
    };
};
