import {format} from 'date-fns';
import {useContext} from 'react';
import {adsBase, dataHeaders, goalsHeaders, goalsApiBase, shuffleArray} from '../global';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';

export const getAds = (state,dispatch) => {
  if (state.current_club != null) {
    fetch(`${adsBase}/tv-screen?location=${state.current_club}`, {
      headers: {
        'content-type': 'text/json'
      },
      method: 'GET'
    }).then((response) => response.json()).then((responseJson) => {

      if (responseJson != null && responseJson != state) {
        dispatch({type: 'SET_ADS', payload: responseJson});
      }
    }).catch((error) => {
      console.log(error);
    });
  }
};


export const renderAds = (ads) => {

  const adSlides = []
  if (ads != null) {
    var slides = ads
      .map((value) => {
        if (value.type == 'image') {
          adSlides.push(
            <SplideSlide data-splide-interval={value.duration * 1000}>
              <img src={value.url}/>
            </SplideSlide>
          );

        } else {
          adSlides.push(
            <SplideSlide
              data-splide-html-video={value.url}
              data-splide-interval={value.duration * 1000}></SplideSlide>
          );
        }
      });

  }
  return adSlides;
};
