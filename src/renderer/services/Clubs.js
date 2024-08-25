import {format} from 'date-fns';
import {useContext} from 'react';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';

export const getClubs = (state,dispatch) => {
  fetch(`${goalsApiBase}/branches`, {
    headers: goalsHeaders,
    method: 'GET'
  }).then((response) => response.json()).then((responseJson) => {
    if (responseJson.branches != null) {
      dispatch({type: 'SET_CLUBS', payload: responseJson.branches});
    }
  }).catch((error) => {
    console.log(error);
  });
};
