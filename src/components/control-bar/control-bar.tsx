import type { ReactElement } from 'react';

import { ArrowsOut, PlayPause, Sliders, SpeakerHigh, SpeakerSlash, Stop, YoutubeLogo } from '@phosphor-icons/react';

import ControlBarButton from './control-bar-button';

import dinoHead from '../../assets/dino-head.png';
import useIsTouchableDevice from '../../hooks/use-is-touchable-device';
import ControlBarModal from './control-bar-modal';

interface ControlBarProps {
  isModalOpen: boolean;
  isVideoMuted: boolean;
  onChangeVideoButtonClick: () => void;
  onModalButtonClick: () => void;
  onCloseModal: () => void;
  onFullscreenClick: () => void;
  onMuteUnmuteButtonClick: () => void;
  onPlayPauseButtonClick: () => void;
  onStopButtonClick: () => void;
}

function ControlBar(props: ControlBarProps): ReactElement {
  const {
    isModalOpen,
    isVideoMuted,
    onChangeVideoButtonClick,
    onCloseModal,
    onFullscreenClick,
    onModalButtonClick,
    onMuteUnmuteButtonClick,
    onPlayPauseButtonClick,
    onStopButtonClick,
  } = props;

  const isTouchable = useIsTouchableDevice();

  return (
    <>
      <div
        id="controls"
        className="absolute flex items-center mx-auto gap-6 bg-slate-900 backdrop-blur bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 rounded-full px-6 py-4 bottom-[6.5rem]"
      >
        <img src={dinoHead} alt="Lo-fi Dino head logo" width={32} />
        <div className="h-10 w-px bg-white"></div>
        <ControlBarButton onClick={onChangeVideoButtonClick} icon={YoutubeLogo} tip="Change video" />
        <ControlBarButton icon={PlayPause} onClick={onPlayPauseButtonClick} tip="Play/pause" />
        <ControlBarButton icon={Stop} onClick={onStopButtonClick} tip="Stop" />
        <ControlBarButton
          icon={isVideoMuted ? SpeakerSlash : SpeakerHigh}
          onClick={onMuteUnmuteButtonClick}
          tip={isVideoMuted ? 'Unmute' : 'Mute'}
        />
        <ControlBarButton icon={Sliders} tip="Volume mixer" />
        {isTouchable ? null : <ControlBarButton icon={ArrowsOut} tip="Full screen" onClick={onFullscreenClick} />}
      </div>

      <ControlBarModal onClose={onCloseModal} onModalButtonClick={onModalButtonClick} open={isModalOpen} />
    </>
  );
}

export default ControlBar;
