import {format} from 'date-fns';
import {useContext} from 'react';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';

export const getClubs = (state,dispatch) => {
  fetch(`${goalsApiBase}/branches`, {
    headers: goalsHeaders,
    method: 'GET'
  }).then((response) => response.json()).then((responseJson) => {
    if (responseJson.branches != null) {

    //Give an option to be clever and try and guess the club based on current IP but still give overwrites
     var auto = {
      "id":0,
      "name":"AUTO"
     }
     var branches = responseJson.branches;
     branches.unshift(auto);
      dispatch({type: 'SET_CLUBS', payload: branches});
    }
  }).catch((error) => {
    console.log(error);
  });
};

export const getCurrentClub = (state,dispatch) => {
  fetch(`${adsBase}/whats-my-club`, {
    method: 'POST',
    body: JSON.stringify({
      "ip_address": state.localIP
  })
  }).then((response) => response.json()).then((responseJson) => {
    if (responseJson != null) {
      console.log(responseJson);
      if (state.current_club == "0"){
      dispatch({type: 'SET_CURRENT_CLUB', payload: responseJson.branchId});
      }
    }
  }).catch((error) => {
    console.log(error);
  });
};
