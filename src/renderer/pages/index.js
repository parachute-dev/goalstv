import React, {useState, useEffect, useRef} from 'react';

import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider';
import {useInterval} from '../hooks/useInterval.js';
import {shuffleArray, interleaveSlides, goalsHeaders, version, logUptime} from '../global';

import {getKidsParties, renderParties} from '../services/KidsParties';
import {getAds, renderAds} from '../services/Ads';
import {getClubs, getCurrentClub} from '../services/Clubs';
import {getTournaments, renderTournaments} from '../services/Tournaments';
import {getLeagues, renderLeagueTables} from '../services/Leagues';

import Slides from '../components/slides/slides';
import Layout from '../components/layout';

const Index = () => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  // Load everything on startup
  useEffect(() => {
    logUptime(state.current_club);
    getAds(state, dispatch);
    getClubs(state, dispatch);
    getCurrentClub(state,dispatch);
    getTournaments(state, dispatch);
    getKidsParties(state, dispatch);
    getLeagues(state, dispatch);
  }, [state.location]);


  // Loop for Getting league info and pinging uptime logs
  useInterval(() => {
    logUptime();
    getAds(state, dispatch);
    getLeagues(state, dispatch);
  }, 600000);

  // Loop for Getting New Kids Party Updates (More Frequent)
  useInterval(() => {
    getKidsParties(state, dispatch);
  }, 300000);

// Loop for Getting Tournaments (More Frequent Still)
  useInterval(() => {
    getTournaments(state, dispatch);
  }, 100000);

  const renderSlides = () => {

    var allAds = [];
    var league_tables = renderLeagueTables(state.league_tables);
    var parties = renderParties(state.kids_parties);
    var all_tournaments = renderTournaments(state.tournament_results, state.tournament_date);
    var displayAds = renderAds(state.ads);

    //Any Kids Parties - lock it down to only KP
    if (parties.length > 0) {
      if (state.parties_and_ads){
        return interleaveSlides(parties, displayAds);
      }
      return parties;
    }

    //Any Tournaments - just ads & Tournaments
    if (all_tournaments.length > 0) {
      allAds = interleaveSlides(all_tournaments, displayAds);
      return allAds;
    }

    //Else just ads & leagues
    allAds = interleaveSlides(league_tables, displayAds);
    return allAds;

  }

  return (
    <Layout>
      <Slides items={renderSlides()}/>
    </Layout>
  );
};

export default Index;
