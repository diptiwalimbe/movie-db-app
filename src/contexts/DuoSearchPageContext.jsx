import { createContext, useReducer } from 'react';

export const DuoSearchPageContext = createContext();

export const initialState = {
  actor1: '',
  actor2: '',
  moviesList: [],
};

const actions = {
  SET_MOVIES_LIST: 'SET_MOVIES_LIST',
  CLEAR_MOVIES_LIST: 'CLEAR_MOVIES_LIST',
  SET_ACTOR1: 'SET_ACTOR1',
  SET_ACTOR2: 'SET_ACTOR2',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_MOVIES_LIST: {
      return {
        ...state,
        moviesList: action.moviesList,
      };
    }
    case actions.CLEAR_MOVIES_LIST: {
      return {
        ...state,
        moviesList: [],
      };
    }
    case actions.SET_ACTOR1: {
      return {
        ...state,
        actor1: action.actor1,
      };
    }
    case actions.SET_ACTOR2: {
      return {
        ...state,
        actor2: action.actor2,
      };
    }
    default:
      return initialState;
  }
};
export const DuoSearchPageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    moviesList: state.moviesList,
    actor1: state.actor1,
    actor2: state.actor2,
    setMoviesList: (moviesList) => {
      dispatch({ type: actions.SET_MOVIES_LIST, moviesList });
    },
    clearMoviesList: () => {
      dispatch({ type: actions.CLEAR_MOVIES_LIST });
    },
    setActor1: (actor1) => {
      dispatch({ type: actions.SET_ACTOR1, actor1 });
    },
    setActor2: (actor2) => {
      dispatch({ type: actions.SET_ACTOR2, actor2 });
    },
  };

  return (
    <DuoSearchPageContext.Provider value={value}>
      {children}
    </DuoSearchPageContext.Provider>
  );
};
