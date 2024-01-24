import { YoutubeLogo, PlayPause, Stop, SpeakerHigh, Sliders, FrameCorners, ArrowsOut } from '@phosphor-icons/react';

import ControlBarButton from './control-bar-button';

import dinoHead from '../../assets/dino-head.png'

function ControlBar() {
  return (
    <div
      id='controls'
      className="absolute flex items-center mx-auto gap-12 bg-slate-900 bg-clip-padding backdrop-blur bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 rounded-full p-4 bottom-[6.5rem]"
    >
      <img
        src={dinoHead}
        alt="Lo-fi Dino head logo"
        width={32}
      />
      <ControlBarButton icon={YoutubeLogo} />
      <ControlBarButton icon={PlayPause} />
      <ControlBarButton icon={Stop} />
      <ControlBarButton icon={SpeakerHigh} />
      <ControlBarButton icon={Sliders} />
      <ControlBarButton icon={FrameCorners} />
      <ControlBarButton icon={ArrowsOut} />
    </div>
  )
}

export default ControlBar;
