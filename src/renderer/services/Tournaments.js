import {useContext} from 'react';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';
import {format, isBefore, addHours} from 'date-fns';

import TournamentTable from '../components/slides/tournament/TournamentTable';
import TournamentKnockOut from '../components/slides/tournament/TournamentKnockOut';
import TournamentResult from '../components/slides/tournament/TournamentResult';
import TournamentWelcome from '../components/slides/tournament/TournamentWelcome';

export const getTournaments = async(state, dispatch) => {

  var currDate = new Date(Date.now());
  var todaysDate = format(currDate, "dd-MM-yyyy");





  if (state.tournament_date != undefined && state.tournament_date != null && state.tournament_date != "") {
    var todaysDateObj = new Date(state.tournament_date);
    todaysDate =  format( todaysDateObj, "dd-MM-yyyy");

  }


  const response = await fetch(`${goalsApiBase}/tournaments/?branchId=${state.current_club}&tourdate=${todaysDate}`, {
    headers: goalsHeaders,
    method: 'GET'
  });

  const responseJson = await response.json();
  console.log("TOURNAMENTS");
  console.log(responseJson);

  if (responseJson.tournaments != null) {
    if (responseJson.tournaments.length > 0) {
      dispatch({type: 'SET_TOURNAMENTS', payload: responseJson.tournaments[0]});

      var results = await getTournamentResults(responseJson.tournaments[0].id);
      console.log("TOURNAMENT RESULTS");
      console.log(results);

      if (results != state.tournament_results) {
        dispatch({type: 'SET_TOURNAMENT_RESULTS', payload: results});
      }
    }
  }

};

const getTournamentResults = async(tournamentId) => {
  try {
    const response = await fetch(`${goalsApiBase}/tournaments/fullresults/${tournamentId}`, {
      headers: goalsHeaders,
      method: 'GET'
    });
    const responseJson = await response.json();

    if (responseJson != null) {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
};

export const renderTournaments = (tournament_results) => {

  var allTournamentSlides = [];
  var tournamentTableSlides = [];
  var tournamentKnockoutSlides = [];
  var tournamentResultSlides = [];

  if (tournament_results != null && tournament_results.hoursToGo > -4 ) {

    const tournament_date = new Date(tournament_results.Date);

    const now = new Date();


  const fromDate = format(currDate, "yyyy-MM-dd'T00:00:00");
  const toDate = format(currDate, "yyyy-MM-dd'T22:59:59");
  if (state.tourmanent_date != null && state.tourmanent_date != "") {
    currDate = new Date(state.tourmanent_date);
    tournament_date = new Date(state.tourmanent_date);
  }

  // currDate = new Date("2024-08-23T11:35:00.0000000")



    const twoHoursEarlier = addHours(now, -2);

    if (isBefore(tournament_date, twoHoursEarlier) && tournament_results.hoursToGo > -2 ){
      allTournamentSlides.push(<TournamentWelcome tournament={tournament_results} />)
    }

0

    if ( tournament_results.feederDivisions !== undefined &&  tournament_results.feederDivisions.length > 0){
    for (let i = 0; i < tournament_results.feederDivisions.length; i++) {
      var divisions = tournament_results.feederDivisions[i];
      tournamentTableSlides.push(<TournamentTable night={tournament_results.name} items={divisions}/>)
    }
  }

    if (tournament_results.feederResults !== undefined && tournament_results.feederResults.length != 0) {

      for (let i = 0; i < tournament_results.feederResults.length; i++) {
        var matches = tournament_results.feederResults[i];

        if (matches.matches != null) {
          if (matches.matches !== undefined && matches.matches.length > 0) {

            const pageSize = 8;
            const numberOfPages = Math.ceil(matches.matches.length / pageSize);

            for (let i = 0; i < numberOfPages; i++) {

              const start = i * pageSize;
              const end = start + pageSize;
              const currentPageItems = matches
                .matches
                .slice(start, end);

              tournamentResultSlides.push(<TournamentResult night={tournament_results.name} items={currentPageItems}/>);
            }
          }
        }

      }
    }
    if (tournament_results.knockOutMatches !== undefined && tournament_results.knockOutMatches.length != 0) {
      var knockouts = tournament_results.knockOutMatches;
      if (tournament_results.knockOutMatches[0].team1Name != undefined && tournament_results.knockOutMatches[0].team1Name != "" ){
      tournamentKnockoutSlides.push(<TournamentKnockOut night={tournament_results.name} items={knockouts}/>)
      }
    }

    if (tournament_results.winnerName !== undefined && tournament_results.winnerName != "") {
      tournamentKnockoutSlides.push(<TournamentWinner tournament={tournament_results}/>)

    }

    allTournamentSlides = allTournamentSlides.concat(tournamentTableSlides);
    allTournamentSlides = allTournamentSlides.concat(tournamentResultSlides);
    allTournamentSlides = allTournamentSlides.concat(tournamentKnockoutSlides);


  }
  return allTournamentSlides
}
