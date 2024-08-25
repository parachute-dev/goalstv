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

  const renderScore = (fixture) => {

    if (fixture != null){


    if (fixture.team1Score !== undefined && fixture.team1Score != ""){
      return(
       <><span>{fixture.team1Score}</span><i>-</i><span>{fixture.team2Score}</span></>
      )
    }

  }
    return (
      <><span></span><i>VS</i><span></span></>
      )

  }
  return (
    <SplideSlide data-type={"tournament-result"} data-splide-interval={10000000}>
      <div className="fixture-background">
        <div className="league-table">
      <div className="league-header">

      {/* <div className="league-logo">
                <img src={renderLeagueLogo()}/>
              </div> */}
              <div className="league-name">
                <h2>{night}</h2>
                <h3>Results & Fixtures</h3>
              </div>


      </div>
      <ul>
        {items.map((row, index) => (
          <li key={index} className="result-row">
            <span className="team-a">{row.team1.name}</span>
            <span className="team-vs">{renderScore(row)}</span>
            <span className="team-b">{row.team2.name}</span>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </SplideSlide>

  )
}
export default TournamentResult
