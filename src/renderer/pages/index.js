import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useKonami from 'use-konami';
const {format} = require('date-fns')

import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider';
import Leaderboard from '../components/Leaderboard';
import {useInterval} from '../hooks/useInterval.js';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';

import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Video} from '@splidejs/splide-extension-video';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';
import SettingsModal from '../components/SettingsModal';
import KidsSlide from '../components/KidsSlide';
import TournamentTable from '../components/TournamentTable';
import TournamentKnockOut from '../components/TournamentKnockOut';

import TournamentResult from '../components/TournamentResult';

import LeagueSlide from '../components/LeagueSlide';

import Layout from '../components/Layout';

const Index = () => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  const getClubs = () => {
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

  const getLeagues = async() => {
    try {
      const response = await fetch(`${goalsApiBase}/branches/${state.current_club}/leagues`, {
        headers: goalsHeaders,
        method: 'GET'
      });
      const responseJson = await response.json();

      if (responseJson.leagueDays != null) {
        dispatch({type: 'SET_LEAGUES', payload: responseJson.leagueDays});

        const tables = await getTables(responseJson.leagueDays);
        dispatch({type: 'SET_LEAGUE_TABLES', payload: tables});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTables = async(leagues) => {

    var tables = [];

    if (leagues != null) {

      if (leagues !== undefined && leagues.length != 0) {

        for (let i = 0; i < leagues.length; i++) {
          var day = [];

          if (leagues[i].leagues !== undefined && leagues[i].leagues != 0) {

            for (let j = 0; j < leagues[i].leagues.length; j++) {
              var leagueId = leagues[i].leagues[j].leagueId;
              var leagueName = leagues[i].name;

              day[leagueName] = await getTable(leagueId);

            }
          }
          tables.push(day);
        }
      }
    }

    return tables;
  }

  const getTable = async(leagueId) => {
    try {
      const response = await fetch(`${goalsApiBase}/leagues/${leagueId}/table`, {
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

  const getTournaments = async() => {
    try {
      var currDate = new Date(Date.now());
      var todaysDate = format(currDate, "dd-MM-yyyy");

      if (state.tournament_date != null && state.tournament_date != "") {
        todaysDate = tournament_date;

      }
      todaysDate = "20/08/2024";

      const response = await fetch(`${goalsApiBase}/tournaments/?branchId=${state.current_club}&tourdate=${todaysDate}`, {
        headers: goalsHeaders,
        method: 'GET'
      });

      const responseJson = await response.json();

      if (responseJson.tournaments != null) {
        if (responseJson.tournaments.length > 0){
        dispatch({type: 'SET_TOURNAMENTS', payload: responseJson.tournaments[0]});

        var results = await getTournamentResults(responseJson.tournaments[0].id);

        if (results != state.tournament_results) {
          dispatch({type: 'SET_TOURNAMENT_RESULTS', payload: results});
        }
      }
    }
    } catch (error) {
      console.log(error);
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

  const getKidsParties = () => {

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
          if (curatedParties != state.kids_parties){
          dispatch({type: 'SET_KIDS_PARTIES', payload: curatedParties});
          }


        }
      }

    }).catch((error) => {
      console.log(error);
    });
  };

  const getAds = () => {
    if (state.current_club != null) {
      fetch(`${adsBase}/tv-screen?location=${state.current_club}`, {
        headers: {
          'content-type': 'text/json'
        },
        method: 'GET'
      }).then((response) => response.json()).then((responseJson) => {

        if (responseJson != null && responseJson != state) {
          dispatch({type: 'SET_ADS', payload: responseJson});
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  useEffect(() => {
    getAds();
    getClubs();
    getTournaments();
    getKidsParties();
    getLeagues();
  }, [state.location]);

  useInterval(() => {
    getAds();
    getLeagues();
    getTournaments();
  }, 600000);


  useInterval(() => {
    getKidsParties();
  }, 300000);

  const renderAds = () => {

    const adSlides = []
    if (state.ads != null) {
      var slides = state
        .ads
        .map((value) => {
          if (value.type == 'image') {
            adSlides.push(
              <SplideSlide data-splide-interval={value.duration * 1000}>
                <img src={value.url}/>
              </SplideSlide>
            );

          } else {

            adSlides.push(
              <SplideSlide
                data-splide-html-video={value.url}
                data-splide-interval={value.duration * 1000}></SplideSlide>
            );
          }
        });

    }
    return adSlides;
  };

  const renderSlides = () => {
    var league_tables = [];
    var allAds = [];
    const currDate = new Date(Date.now());
    var parties = [];
    var tournament_table = [];
    var tournament_results = [];
    var tournament_knockouts = [];
    var all_tournaments = [];
    var displayAds = renderAds();

    if (state.league_tables != null) {

      for (let i = 0; i < state.league_tables.length; i++) {
        var night = state.league_tables[i];
        Object
          .keys(night)
          .forEach((key) => {

            if (night[key].leagueTable != null) {

              if (night[key].leagueTable.divisionTables != null) {
                var divisions = night[key].leagueTable.divisionTables;

                if (divisions !== undefined && divisions.length != 0) {

                  for (let j = 0; j < divisions.length; j++) {
                    var obj = night[key].leagueTable.divisionTables[j];

                    var noPlay = true;
                    for (let k = 0; k < obj.rows.length; k++) {
                      if (obj.rows[k].played > 0) {
                        noPlay = false;
                      }

                    }
                    if (noPlay == false) {
                      league_tables.push(<LeagueSlide night={key} items={obj}/>)
                    }
                  }
                }
              }
            }
          });
      }
    }
    if (state.kids_parties != null && state.kids_parties !== undefined) {
      if (state.kids_parties.length > 0) {

        for (let j = 0; j < state.kids_parties.length; j++) {

          parties.push(<KidsSlide items={state.kids_parties[j]}/>);

        }
        return parties;

      }
    }

    if (state.tournament_results != null) {

      for (let i = 0; i < state.tournament_results.feederDivisions.length; i++) {
        var divisions = state.tournament_results.feederDivisions[i];

        tournament_table.push(<TournamentTable night={state.tournament_results.name} items={divisions}/>)
      }

      if (state.tournament_results.feederResults !== undefined && state.tournament_results.feederResults.length != 0) {

        for (let i = 0; i < state.tournament_results.feederResults.length; i++) {
          var matches = state.tournament_results.feederResults[i];

          if (matches.matches != null) {
            if (matches.matches !== undefined && matches.matches.length > 0) {

              const pageSize = 8; // Maximum items per page
              const numberOfPages = Math.ceil(matches.matches.length / pageSize); // Total number of pages

              for (let i = 0; i < numberOfPages; i++) {

                const start = i * pageSize;
                const end = start + pageSize;
                const currentPageItems = matches
                  .matches
                  .slice(start, end); // Get the items for the current page

                // Create a TournamentResult for the current page and push it to tournament_results
                tournament_results.push(<TournamentResult
                  night={state.tournament_results.name}
                  items={currentPageItems}/>);
              }
            }
          }

        }
      }
      if (state.tournament_results.knockOutMatches !== undefined && state.tournament_results.knockOutMatches.length != 0) {
        var knockouts = state.tournament_results.knockOutMatches;
        tournament_knockouts.push(<TournamentKnockOut night={state.tournament_results.name} items={knockouts}/>)
      }

      all_tournaments = all_tournaments.concat(tournament_table);
      all_tournaments = all_tournaments.concat(tournament_results);
      all_tournaments = all_tournaments.concat(tournament_knockouts);

      allAds = allAds
        .concat(all_tournaments)
        .concat(displayAds);
      return allAds
    }

    allAds = allAds
      .concat(league_tables)
      .concat(displayAds);

    return shuffleArray(allAds);

  }

  return (
    <Layout>
      <Splide
        hasTrack={false}
        extensions={{
        Video
      }}
        options={{
        reducedMotion: {
          autoplay: "play"
        },
        rewind: true,
        type: 'fade',
        autoplay: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        resetProgress: false,
        video: {
          autoplay: true,
          mute: true,
          loop: true
        }
      }}>
        <SplideTrack>
          <SplideSlide data-splide-interval={10}>
            <Leaderboard type="today"/>
          </SplideSlide>
          {renderSlides()}
          <SplideSlide data-splide-interval={10}>
            <Leaderboard type="today"/>
          </SplideSlide>
        </SplideTrack>
        <div className="splide__progress">
          <div className="splide__progress__bar"/>
        </div>
      </Splide>
      <SettingsModal/>
    </Layout>
  );
};
export default Index;
