import React from 'react';
import VideoFile from './video/Video4.mp4';

function MainHeader() {
  return (
    <div className="absolute w-full -z-20 h-[700px] -translate-y-40 overflow-hidden">
      <video className="top-0 left-0  w-full h-[800px] sm:h-[800px] lg:h-[800px] object-cover " loop autoPlay muted src={VideoFile} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span id='MainText' className={`p-2 text-white text-[100px]`}>Beats<br /> Store</span>
      </div>
    </div>
  );
}

export default MainHeader;
