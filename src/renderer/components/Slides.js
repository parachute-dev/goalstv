// Slides.js
import React, { useEffect, useRef } from 'react';
import Leaderboard from '../components/Leaderboard';
import ReactGA from 'react-ga4';
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'

import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Video} from '@splidejs/splide-extension-video';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';

const Slides = ({items}) => {

  const splideRef = useRef(null);
  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);


  useEffect(() => {
    if (splideRef.current) {
      const splide = splideRef.current.splide;

      splide.on('moved', (newIndex) => {
        const currentSlide = splide.Components.Slides.getAt(newIndex).slide;
        const assetSrc = currentSlide.querySelector('img, video')?.src || 'Unknown asset';
        var slideType = currentSlide.getAttribute('data-type');


      if (slideType == null || slideType == ""){
        slideType = "Ad";
      }

        console.log('Asset shown:', assetSrc);

        // Trigger Google Analytics event
        ReactGA.event({
          category: state.current_club,
          action: slideType,
          label: assetSrc,
        });
      });
    }
  }, []);



  return (

    <Splide
      hasTrack={false}
      extensions={{
      Video
    }}
    ref={splideRef}
      options={{
      reducedMotion: {
        autoplay: "play"
      },
      rewind: true,
      type: 'fade',
      autoplay: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      resetProgress: false,
      video: {
        autoplay: true,
        mute: true,
        loop: true
      }
    }}>
      <SplideTrack>
        <SplideSlide data-splide-interval={10}>
          <Leaderboard type="today"/>
        </SplideSlide>
        {items}
        <SplideSlide data-splide-interval={10}>
          <Leaderboard type="today"/>
        </SplideSlide>
      </SplideTrack>
      <div className="splide__progress">
        <div className="splide__progress__bar"/>
      </div>
    </Splide>
  )
};

export default Slides;
