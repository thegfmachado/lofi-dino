import { YoutubeLogo, PlayPause, Stop, SpeakerHigh, Sliders, FrameCorners, ArrowsOut, Cube } from '@phosphor-icons/react';

import ControlBarButton from './control-bar-button';

import dinoHead from '../../assets/dino-head.png'
import { useIsTouchableDevice } from '../../hooks/use-is-touchable-device';

function ControlBar() {
  const isTouchable = useIsTouchableDevice();

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
      {isTouchable
        ? null
        : <ControlBarButton icon={FrameCorners} />
      }
      {isTouchable
        ? null
        : <ControlBarButton icon={ArrowsOut} />
      }
      <Cube color="darkorchid" weight="duotone">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4s"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="5s"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        ></animateTransform>
      </Cube>
    </div>
  )
}

export default ControlBar;
