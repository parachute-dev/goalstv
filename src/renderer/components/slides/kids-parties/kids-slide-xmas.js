import * as React from 'react'
import {version} from "../../../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../../../context/GlobalContextProvider.js'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import Snowfall from 'react-snowfall'
import logo from '../../../static/kids-parties/kp-christmas-party-logo.png'

import '@splidejs/react-splide/css';


const {parseISO, differenceInYears, add} = require('date-fns');

const KidsSlideXmas = ({items, night}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);
  // Get the current date
  const currentDate = new Date();

  const dobDate = parseISO(items.dateOfBirth);

  function addMonthsToDate(date, monthsToAdd) {
    return add(date, { months: monthsToAdd });
  }

  // Need to add 2 months on incase the boy/girl has not yet turned the age.
  const newDate = addMonthsToDate(currentDate, 2);


  // Calculate the difference in years
  const age = differenceInYears(newDate, dobDate);

  return (
    <SplideSlide data-splide-interval={40000}>
      <Snowfall   snowflakeCount={500}/>
      <div className="kids-parties-background kids-parties-background-xmas">
        <div className="container">
          <div className="row">
            <div className="col-md-6">

            </div>
            <div className="col-md-6">
              <div class="xmas-content">
              <img src={logo}/>

              <h3>Have a great party & a merry Christmas</h3>
              <h2>{items.childsName}</h2>

              </div>
            </div>
          </div>
        </div>
      </div>
    </SplideSlide>

  )
}
export default KidsSlideXmas
