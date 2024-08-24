import * as React from 'react'
import logo from '../static/logo.png'
import {version} from "../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const TournamentResult = ({items, night}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);
  console.log("in league slide")
  return (
    <SplideSlide data-splide-interval={10000}>
      <div className="fixture-background">
        <div className="league-table">
      <div className="league-header">
      <h2>{night}</h2>
      </div>
      <ul>
        {items.map((row, index) => (
          <li key={index} className="result-row">
            <span className="team-position">{row.team1.name}</span>
            <span className="team-position">Vs</span>
            <span className="team-position">{row.team2.name}</span>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </SplideSlide>

  )
}
export default TournamentResult
