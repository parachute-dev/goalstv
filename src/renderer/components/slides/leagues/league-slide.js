import * as React from 'react'
import {version} from "../../../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../../../context/GlobalContextProvider.js'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import MondayLogo from '../../../static/league-logos/monday-logo.png'
import TuesdayLogo from '../../../static/league-logos/tuesday-logo.png'
import WednesdayLogo from '../../../static/league-logos/wednesday-logo.png'
import ThursdayLogo from '../../../static/league-logos/thursday-logo.png'
import FridayLogo from '../../../static/league-logos/friday-logo.png'
import SundayLogo from '../../../static/league-logos/sunday-logo.png'
import SaturdayLogo from '../../../static/league-logos/saturday-logo.png'

import '@splidejs/react-splide/css';
const LeagueSlide = ({items, night}) => {

  const renderLeagueLogo = (night) => {
    var logo = MondayLogo;
    if (night != null) {

      var leagueNight = night.toLowerCase();
      switch (leagueNight) {
        case "monday league":
          return MondayLogo
          break;
        case "tuesday league":
          return TuesdayLogo
          break;
        case "thursday league":
          return ThursdayLogo
          break;
        case "friday league":
          return FridayLogo
          break;
        case "wednesday league":
          return WednesdayLogo
          break;
          case "sunday league":
            return SundayLogo
            break;
        default:
      }
    }

      return logo;
  }



    const dispatch = React.useContext(GlobalDispatchContext);
    const state = React.useContext(GlobalStateContext);
    return (
      <SplideSlide
      data-type={"league-table"} data-splide-interval={6000}>
        <div className="fixture-background">
          <div className="league-table">
            <div className="league-header">
              <div className="league-logo">
                <img  src={renderLeagueLogo(night)}/>
              </div>
              <div className="league-name">
                <h2>{night}</h2>
                <h3>{items.name}</h3>
              </div>
            </div>
            <div className="league-table-header">
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
              {items
                .rows
                .slice(0, 8)
                .map((row, index) => (
                  <li key={index} className="team-row">
                    <span className="team-position">{row.position}</span>
                    <span className="team-name">{row.name}</span>
                    <span className="team-played">{row.played}</span>
                    <span className="team-won">
                      {row.won}</span>
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
  export default LeagueSlide
