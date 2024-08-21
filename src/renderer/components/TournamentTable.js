import * as React from 'react'
import logo from '../static/logo.png'
import {version} from "../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const TournamentTable = ({items, night}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);
  console.log("in league slide")
  return (
    <SplideSlide data-splide-interval={155000}>
      <div className="fixture-background">
        <div className="league-table">
      <div class="league-header">
      <h2>{night}</h2>
      <h3>{items.name}</h3>
      </div>
      <div class="league-table-header">
        <span className="team-position">&nbsp;</span>
        <span className="team-name">Team</span>
        <span className="team-played">P</span>
        <span className="team-won">W</span>
        <span className="team-drawn">D</span>
        <span className="team-lost">L</span>
        <span className="team-goalsFor">GF</span>
        <span className="team-goalsAgainst">GA</span>
        <span className="team-goalDifference">GD</span>
        <span className="team-points">PTS</span>

      </div>
      <ul>
        {items.rows.map((row, index) => (
          <li key={index} className="team-row">
            <span className="team-position">{row.position}</span>
            <span className="team-name">{row.name}</span>
            <span className="team-played">{row.played}</span>
            <span className="team-won"> {row.won}</span>
            <span className="team-drawn">{row.drawn}</span>
            <span className="team-lost">{row.lost}</span>
            <span className="team-goalsFor">{row.goalsFor}</span>
            <span className="team-goalsAgainst">{row.goalsAgainst}</span>
            <span className="team-goalDifference">{row.goalDifference}</span>
            <span className="team-points">{row.points}</span>

          </li>
        ))}
      </ul>
      </div>
      </div>
    </SplideSlide>

  )
}
export default TournamentTable
