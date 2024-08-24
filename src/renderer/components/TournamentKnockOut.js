import * as React from 'react'
import logo from '../static/logo.png'
import {version} from "../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const TournamentKnockout = ({items, night}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);
  console.log("in league slide")
  return (
    <SplideSlide data-splide-interval={10000}>
      <div className="fixture-background">
        <div className="league-table">
          <div className="league-header">
            <h2>{night}</h2>
            <h3>Knockouts</h3>
          </div>
          <div className="league-row">
            {items.map((row, index) => (row.team1Name && (
              <>
              <div className="knockoutType">
                <h3>{row.roundName}</h3>
                </div>
              <div key={index} className="league-item">
                <span className="team-position">{row.team1Name}</span>
                <span className="team-position">Vs</span>
                <span className="team-position">{row.team2Name}</span>
              </div>
              </>
            )))}
          </div>
        </div>
      </div>
    </SplideSlide>

  )
}
export default TournamentKnockout
