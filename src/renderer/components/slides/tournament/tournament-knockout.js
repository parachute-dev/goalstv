import * as React from 'react'
import {version} from "../../../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../../../context/GlobalContextProvider.js'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const TournamentKnockout = ({items, night}) => {

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
    <SplideSlide data-splide-interval={10000}>
      <div className="fixture-background">
        <div className="league-table">
          <div className="league-header">


                  {/* <div className="league-logo">
                <img src={renderLeagueLogo()}/>
              </div> */}
              <div className="league-name">
                <h2>{night}</h2>
                <h3>Knockouts</h3>
              </div>

          </div>
          <div className="league-row">
            {items.map((row, index) => (row.team1Name && (
              <>
              <div className="knockoutType">
                <h3>{row.roundName}</h3>
                </div>
              <div key={index} className="league-item">
            <span className="team-a">{row.team1Name}</span>
            <span className="team-vs">{renderScore(row)}</span>
            <span className="team-b">{row.team2Name}</span>
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
