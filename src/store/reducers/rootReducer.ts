/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ActionType, Action } from 'store/actions';

const initialState = {};

export interface TodoItems {
    [key: string]: boolean;
}

const rootReducer = (state: TodoItems = initialState, action: Action): TodoItems => {
    switch (action.type) {
        case ActionType.ADD_ITEM:
            return {
                ...state,
                [action.payload]: false,
            };
        case ActionType.EDIT_ITEM:
            const { value, prevValue } = action.payload;
            const newState = Object.assign(
                {},
                ...Object.keys(state).map((key) => {
                    return { [key === prevValue ? value : key]: state[key] };
                })
            );

            return { ...newState };
        case ActionType.REMOVE_ITEM: {
            const newState = Object.assign({}, ...Object.keys(state).map((key) => key !== action.payload && { [key]: state[key] }));

            return { ...newState };
        }
        case ActionType.CHANGE_COMPLETION:
            return {
                ...state,
                [action.payload]: !state[action.payload],
            };
        case ActionType.REMOVE_COMPLETED: {
            const newState: TodoItems = {};
            for (const [key, value] of Object.entries(state)) {
                value === false ? (newState[key] = value) : {};
            }
            return { ...newState };
        }
        default:
            return state;
    }
};

export default rootReducer;
