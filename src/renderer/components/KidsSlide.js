import * as React from 'react'
import logo from '../static/logo.png'
import {version} from "../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const { parseISO, differenceInYears } = require('date-fns');

const KidsSlide = ({items, night}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);
  console.log(items)

  const dobDate = parseISO(items.dateOfBirth);

// Get the current date
const currentDate = new Date();

// Calculate the difference in years
const age = differenceInYears(currentDate, dobDate);


  return (
    <SplideSlide data-splide-interval={155000}>
      <div className="kids-parties-background">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="badge-container">
                <img class="badge-image" src="https://locker-room.goalsfootball.co.uk/badge-no-name.png" alt=""/>
                <div class="enquiry-image">
                  <img src={`https://locker-room.goalsfootball.co.uk/get-kp-image?enquiry=${items.enquiryId}`} alt=""/>
                </div>
                <div class="name">{items.childsName}</div>
                <div class="age">AGE: {age}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h3>Welcome To</h3>
              <h2>{items.childsName}'s</h2>
              <h1>FOOTBALL
                PARTY!</h1>
            </div>
          </div>
        </div>
      </div>
    </SplideSlide>

  )
}
export default KidsSlide
