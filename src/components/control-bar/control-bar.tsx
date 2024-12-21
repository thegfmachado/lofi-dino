import type { ReactElement } from 'react';

import { ArrowsOut, PlayPause, Sliders, SpeakerHigh, SpeakerSlash, Stop, YoutubeLogo } from '@phosphor-icons/react';

import ControlBarButton from './control-bar-button';

import dinoHead from '../../assets/dino-head.png';
import useIsTouchableDevice from '../../hooks/use-is-touchable-device';
import { ControlBarModal } from './control-bar-modal';
import type { ControlBarModalProps } from './control-bar-modal';

type ControlBarProps = Pick<ControlBarModalProps, 'mode' | 'onURLFormSubmit' | 'onSoundEffectButtonClick' | 'videoURLInputRef'> & {
  isModalOpen: boolean;
  isVideoMuted: boolean;
  onChangeVideoButtonClick: () => void;
  onCloseModal: () => void;
  onSoundEffectsButtonClick: () => void;
  onFullscreenButtonClick: () => void;
  onMuteUnmuteButtonClick: () => void;
  onPlayPauseButtonClick: () => void;
  onStopButtonClick: () => void;
}

function ControlBar(props: ControlBarProps): ReactElement {
  const {
    videoURLInputRef,
    isModalOpen,
    isVideoMuted,
    mode,
    onChangeVideoButtonClick,
    onSoundEffectsButtonClick,
    onCloseModal,
    onFullscreenButtonClick,
    onURLFormSubmit,
    onSoundEffectButtonClick,
    onMuteUnmuteButtonClick,
    onPlayPauseButtonClick,
    onStopButtonClick,
  } = props;

  const isTouchable = useIsTouchableDevice();

  return (
    <>
      <div
        id="controls"
        className="absolute flex flex-wrap justify-center items-center mx-auto gap-2 sm:gap-4 bg-slate-900 backdrop-blur bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 rounded-full px-4 py-3 sm:px-6 bottom-8 sm:bottom-[3.5rem] w-[90%] sm:w-auto"
      >
        <img src={dinoHead} alt="Lo-fi Dino head logo" className="w-8 sm:w-10" />
        <div className="h-8 sm:h-10 w-px bg-white"></div>
        <div className="flex sm:gap-2">
          <ControlBarButton
            onClick={onChangeVideoButtonClick}
            icon={YoutubeLogo}
            tip="Change video"
          />
          <ControlBarButton
            icon={PlayPause}
            onClick={onPlayPauseButtonClick}
            tip="Play/pause"
          />
          <ControlBarButton
            icon={Stop}
            onClick={onStopButtonClick}
            tip="Stop"
          />
          <ControlBarButton
            icon={isVideoMuted ? SpeakerSlash : SpeakerHigh}
            onClick={onMuteUnmuteButtonClick}
            tip={isVideoMuted ? 'Unmute' : 'Mute'}
          />
          <ControlBarButton
            icon={Sliders}
            tip="Sound Effects"
            onClick={onSoundEffectsButtonClick}
          />
          {isTouchable ? null : (
            <ControlBarButton

              icon={ArrowsOut}
              tip="Full screen"
              onClick={onFullscreenButtonClick}
            />
          )}
        </div>
      </div>

      <ControlBarModal
        onClose={onCloseModal}
        onSoundEffectButtonClick={onSoundEffectButtonClick}
        onURLFormSubmit={onURLFormSubmit}
        open={isModalOpen}
        mode={mode}
        videoURLInputRef={videoURLInputRef}
      />
    </>
  );
}

export default ControlBar;
