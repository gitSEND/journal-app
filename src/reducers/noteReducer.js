import { types } from '../types/types';

const initialState = {
  note: [],
  active: null,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesLoad:
      return {
        ...state,
        note: [...action.payload],
      };
    default:
      return state;
  }
};
