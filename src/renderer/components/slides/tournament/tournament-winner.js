import * as React from 'react'
import {version} from "../../../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../../../context/GlobalContextProvider.js'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const TournamentWinner = ({tournament}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);
  console.log("in league slide")
  return (
    <SplideSlide data-type={"tournament-welcome"} data-splide-interval={90000}>
      <div className="fixture-background">
        <div className="welcome-tournament">
          <h1>CONGRATULATIONS TO</h1>
          <h2>{tournament.winnerName}</h2>
          <h3>The winner of {tournament.name}</h3>
        </div>
      </div>
    </SplideSlide>

  )
}
export default TournamentWinner
