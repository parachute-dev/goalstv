import {format} from 'date-fns';
import {useContext} from 'react';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';
import {renderAds} from './Ads'
import KidsSlideXmas from '../components/slides/kids-parties/kids-slide-xmas';
import KidsSlide from '../components/slides/kids-parties/kids-slide';
import Snowfall from 'react-snowfall'

export const getKidsParties = async(state, dispatch) => {

  var currDate = new Date(Date.now());
  if (state.kids_date != null && state.kids_date != "") {
    var chosenDay = new Date(state.kids_date);
    currDate = new Date(chosenDay.getFullYear(), chosenDay.getMonth(), chosenDay.getDate());

  }

  //currDate = new Date("2024-08-31T15:00:00.0000000")

  const fromDate = format(currDate, "yyyy-MM-dd'T00:00:00");
  const toDate = format(currDate, "yyyy-MM-dd'T22:59:59");

  fetch(`${goalsApiBase}/branches/${state.current_club}/kidsparty?fromDate=${fromDate}&toDate=${toDate}`, {
    headers: goalsHeaders,
    method: 'GET'
  }).then((response) => response.json()).then((responseJson) => {
    if (responseJson.kidsParties != null) {
      console.log("KIDS PARTIES")
      console.log(responseJson.kidsParties)

      if (responseJson.kidsParties !== undefined && responseJson.kidsParties.length != 0) {
        var curatedParties = [];
        var currentTime = new Date();

        if (state.kids_date != null && state.kids_date != "") {
          currentTime = new Date(state.kids_date);

        }
        //currentTime = new Date("2024-08-31T15:00:00.0000000");

        for (let j = 0; j < responseJson.kidsParties.length; j++) {

          var bookingDate = new Date(responseJson.kidsParties[j].bookingDate);

          var minutesBeforePartyStarts = new Date(bookingDate.getTime() - 10 * 60 * 1000);

          var minutesAfterPartyStarts = new Date(bookingDate.getTime() + 10 * 60 * 1000);


          var minutesBeforeFood = new Date(bookingDate.getTime() + 50 * 60 * 1000);

          var minutesAfterFood = new Date(bookingDate.getTime() + 70 * 60 * 1000);

          var minutesBeforePartyFinishes = new Date(bookingDate.getTime() + 110 * 60 * 1000);
          var minutesAfterPartyFinishes = new Date(bookingDate.getTime() + 119 * 60 * 1000);


          if (currentTime >= minutesBeforePartyStarts && currentTime <= minutesAfterPartyFinishes) {
            curatedParties.push(responseJson.kidsParties[j]);

            if ((currentTime >= minutesAfterPartyStarts && currentTime <= minutesBeforeFood) || (currentTime >= minutesAfterFood && currentTime <= minutesBeforePartyFinishes)){
            curatedParties.push(responseJson.kidsParties[j]);
            curatedParties.push(responseJson.kidsParties[j]);
            curatedParties.push(responseJson.kidsParties[j]);
            curatedParties.push(responseJson.kidsParties[j]);
            curatedParties.push(responseJson.kidsParties[j]);
            curatedParties.push(responseJson.kidsParties[j]);
            }

            curatedParties = shuffleArray(curatedParties);
            curatedParties = shuffleArray(curatedParties);

            if ((currentTime >= minutesAfterPartyStarts && currentTime <= minutesBeforeFood) || (currentTime >= minutesAfterFood && currentTime <= minutesBeforePartyFinishes)){
              if (state.parties_and_ads != true){
              dispatch({type: 'SET_KIDS_PARTIES_AND_ADS', payload: true});
              }

            } else {
              if (state.parties_and_ads != false){

              dispatch({type: 'SET_KIDS_PARTIES_AND_ADS', payload: false});
              }
            }
          }

        }


        if (curatedParties != state.kids_parties) {
          dispatch({type: 'SET_KIDS_PARTIES', payload: shuffleArray(curatedParties)});
        }

      }
    }

  }).catch((error) => {
    console.log(error);
  });
};

export const renderParties = (parties) => {

  var partySlides = [];
  if (parties != null) {
    if (parties.length > 0) {
      for (let j = 0; j < parties.length; j++) {
        var description = parties[j].description.toLowerCase();
        if (description.includes("christmas") ||  description.includes("xmas")){
          partySlides.push(<KidsSlideXmas items={parties[j]}/>);

        }else{
        partySlides.push(<KidsSlide items={parties[j]}/>);
        }
      }
      return partySlides;
    }
  }
  return partySlides;
}
