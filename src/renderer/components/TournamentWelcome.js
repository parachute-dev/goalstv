import * as React from 'react'
import logo from '../static/logo.png'
import {version} from "../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const TournamentWelcome = ({tournament}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);
  console.log("in league slide")
  return (
    <SplideSlide data-type={"tournament-welcome"} data-splide-interval={90000}>
      <div className="fixture-background">
        <div className="welcome-tournament">
          <h1>Welcome to the
          </h1>
          <h2>{tournament.name}</h2>
          <img src={logo}/>
        </div>
      </div>
    </SplideSlide>

  )
}
export default TournamentWelcome
