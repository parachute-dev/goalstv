import React, {useState, useEffect, useRef} from 'react';

import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider';
import {useInterval} from '../hooks/useInterval.js';
import {shuffleArray, interleaveSlides, goalsHeaders, version} from '../global';

import {getKidsParties, renderParties} from '../services/KidsParties';
import {getAds, renderAds} from '../services/Ads';
import {getClubs} from '../services/Clubs';
import {getTournaments, renderTournaments} from '../services/Tournaments';
import {getLeagues, renderLeagueTables} from '../services/Leagues';

import Slides from '../components/Slides';
import Layout from '../components/Layout';

const Index = () => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  const logUptime = () => {

    fetch("https://locker-room.goalsfootball.co.uk/log-uptime-tv", {
      method: "POST",
      headers: goalsHeaders,
      body: JSON.stringify({"Branch": state.current_club, "Version": version, "Status": "up"})
    }).then((response) => response.text()).then((result) => console.log(result)).catch((error) => console.error(error));

  }

  useEffect(() => {
    logUptime();
    getAds(state, dispatch);
    getClubs(state, dispatch);
    getTournaments(state, dispatch);
    getKidsParties(state, dispatch);
    getLeagues(state, dispatch);
  }, [state.location]);

  useInterval(() => {
    logUptime();
    getLeagues(state, dispatch);
  }, 600000);

  useInterval(() => {
    getKidsParties(state, dispatch);
    getTournaments(state, dispatch);
  }, 300000);

  useInterval(() => {

    getTournaments(state, dispatch);
  }, 100000);

  const renderSlides = () => {
    var allAds = [];
    var league_tables = renderLeagueTables(state.league_tables);
    var parties = renderParties(state.kids_parties);
    console.log("STATE TOURMANENTS");
    console.log(state.tournament_results);
    var all_tournaments = renderTournaments(state.tournament_results);
    console.log(all_tournaments);
    var displayAds = renderAds(state.ads);

    if (parties.length > 0) {
      return parties;
    }

    if (all_tournaments.length > 0) {

      allAds = interleaveSlides(all_tournaments, displayAds);
      return allAds;
    }

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
