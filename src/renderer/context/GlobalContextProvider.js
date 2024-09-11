import React, {Context, createContext, useReducer, useEffect} from 'react';

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  loading: false,
  localIP: window.electron.store.get('LOCALIPADDRESS') != null ? window.electron.store.get('LOCALIPADDRESS') : "",
  current_club: window
    .electron
    .store
    .get('CLUB') != null
    ? parseInt(window.electron.store.get('CLUB'))
    : 2,
  clubs: null,
  leagues: null,
  league_tables: null,
  kids_parties: null,
  parties_and_ads: false,
  tournaments: null,
  tournament_results : null,
  ads: null,
  kids_date: window
  .electron
  .store
  .get('KIDS_DATE') != null
  ? window.electron.store.get('KIDS_DATE')
  : null,
  tournament_date: window
  .electron
  .store
  .get('TOURNAMENT_DATE') != null
  ? window.electron.store.get('TOURNAMENT_DATE')
  : null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      {
        return {
          ...state,
          loading: action.payload
        };
      }

      case 'SET_KIDS_DATE':
        {
          return {
            ...state,
            kids_date: action.payload
          }
        }
        case 'SET_KIDS_PARTIES_AND_ADS':
          {
            return {
              ...state,
              parties_and_ads : action.payload
            }
          }


        case 'SET_TOURNAMENT_DATE':
          {
            return {
              ...state,
              tournament_date: action.payload
            }
          }
      case 'SET_LEAGUES':
        {
          return {
            ...state,
            leagues: action.payload
          }
        }
    case 'SET_LEAGUE_TABLES':
      {
        return {
          ...state,
          league_tables: action.payload
        }
      }

      case 'SET_TOURNAMENT_RESULTS':
        {
          return {
            ...state,
            tournament_results: action.payload
          }
        }
    case 'SET_ADS':
      {
        return {
          ...state,
          ads: action.payload
        }
      }
    case 'SET_TOURNAMENTS':
      {
        return {
          ...state,
          tournaments: action.payload
        }
      }
    case 'SET_KIDS_PARTIES':
      {
        return {
          ...state,
          kids_parties: action.payload
        }
      }
      case 'SET_CLUBS':
        {
          return {
            ...state,
            clubs: action.payload
          }
        }
    case 'SET_CURRENT_CLUB':
      {
        return {
          ...state,
          current_club: action.payload
        };
      }

    default:
      throw new Error('Bad Action Type');
  }
}

const GlobalContextProvider = ({children}) => {

  const [state,
    dispatch] = React.useReducer(reducer, initialState, (state) => {
    return {
      ...state
    }
  })

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
