import React from 'react';
import { Player , ControlBar }  from 'video-react';

export default props => {
  return (
    <Player
      playsInline
      autoPlay
      src="https://www.meicai.cn/assets/images/video.mp4"
    >
    <ControlBar disableCompletely={true}  />
    </Player>
  );
};