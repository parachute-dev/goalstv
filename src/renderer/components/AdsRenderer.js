// AdsRenderer.js
import React from 'react';
import {SplideSlide} from '@splidejs/react-splide';
import {Video} from '@splidejs/splide-extension-video';
import Slides from '../components/Slides';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';

const AdsRenderer = ({ads}) => {
  return ads.map((value) => (&& value.type === 'image' (
    <SplideSlide
    data-typeA={"image"}
      key={value.url}
      data-splide-interval={value.duration * 1000}>
      <img src={value.url} alt="Ad"/>
    </SplideSlide>
  ) : (
    <SplideSlide
    data-typeA={"video"}
      key={value.url}
      data-splide-interval={value.duration * 1000}>
      <div data-splide-html-video={value.url}></div>
    </SplideSlide>
  ))));
};

export default AdsRenderer;
