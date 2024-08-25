import {format} from 'date-fns';
import {useContext} from 'react';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';

import KidsSlide from '../components/KidsSlide';

export const getKidsParties = async(state,dispatch) => {

  var currDate = new Date(Date.now());

  if (state.kids_date != null && state.kids_date != "") {
    currDate = new Date(kids_date);
  }

  // currDate = new Date("2024-08-23T11:35:00.0000000")

  const fromDate = format(currDate, "yyyy-MM-dd'T00:00:00");
  const toDate = format(currDate, "yyyy-MM-dd'T22:59:59");

  fetch(`${goalsApiBase}/branches/${state.current_club}/kidsparty?fromDate=${fromDate}&toDate=${toDate}`, {
    headers: goalsHeaders,
    method: 'GET'
  }).then((response) => response.json()).then((responseJson) => {
    if (responseJson.kidsParties != null) {

      console.log(responseJson);
      if (responseJson.kidsParties !== undefined && responseJson.kidsParties.length != 0) {
        var curatedParties = [];
        var currentTime = new Date();
        // currentTime = new Date("2024-08-24T11:35:00.0000000");

        for (let j = 0; j < responseJson.kidsParties.length; j++) {

          var bookingDate = new Date(responseJson.kidsParties[j].bookingDate);

          var minutesBeforePartyStarts = new Date(bookingDate.getTime() - 15 * 60 * 1000);
          var minutesAfterPartyStarts = new Date(bookingDate.getTime() + 15 * 60 * 1000);

          var minutesBeforePartyEnds = new Date(bookingDate.getTime() + 20 * 60 * 1000);
          var minutesAfterPartyEnds = new Date(bookingDate.getTime() + 40 * 60 * 1000);

          if ((currentTime >= minutesBeforePartyStarts && currentTime <= minutesAfterPartyStarts) || (currentTime >= minutesBeforePartyEnds && currentTime <= minutesAfterPartyEnds)) {

            curatedParties.push(responseJson.kidsParties[j]);
          }

        }
        if (curatedParties != state.kids_parties) {
          dispatch({type: 'SET_KIDS_PARTIES', payload: curatedParties});
        }

      }
    }

  }).catch((error) => {
    console.log(error);
  });
};


export const renderParties = (parties) => {

  var partySlides = [];
  if (parties != null){
  if (parties.length > 0) {
    for (let j = 0; j < parties.length; j++) {
      partySlides.push(<KidsSlide items={parties[j]}/>);
    }
    return partySlides;
  }
}
  return partySlides;
}
