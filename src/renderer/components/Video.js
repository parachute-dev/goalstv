// src/Video.jsx
import React from 'react';
const Video = (props) => {
    const {src, id, muted, autoplay, ratio, loop} = props;
    let mutedParam = '';
    if(muted){
        mutedParam = 'muted';
    }
    let autoplayParam = '';
    if(autoplay){
        autoplayParam = 'autoplay';
    }
    let loopParam = '';
    if(loop){
        loopParam = 'loop';
    }
    return (
        <div className={`videoContainer ratio-${ratio}`} dangerouslySetInnerHTML={{
            __html: `
          <video

            ${autoplayParam}
            ${loopParam}
            playsinline
            src="${src}"
            id="${id}"
          />`
        }}
        />
    );
}

export default Video
