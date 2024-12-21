import * as React from 'react';
import type { ReactElement } from 'react';

import Loader from './components/loader/loader';
import logo from './assets/logo.svg';

import ControlBar from './components/control-bar/control-bar';
import { VideoPlayer } from './components/video-player/video-player';
import type { YouTubePlayerInstance } from './components/video-player/video-player';
import { ControlBarModalMode } from './components/control-bar/control-bar-modal';
import { Audio } from './components/audio/audio';

import { AUDIO_METADATA, DEFAULT_VIDEO_URL } from './constants/constants';
import { isContentfulString } from './utils/strings';


function App(): ReactElement {
  const [player, setPlayer] = React.useState<YouTubePlayerInstance>();
  const [videoURL, setVideoURL] = React.useState(DEFAULT_VIDEO_URL);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [isVideoMuted, setIsVideoMuted] = React.useState(false);
  const [controlBarMode, setControlBarMode] = React.useState<ControlBarModalMode>(ControlBarModalMode.URL);

  const playerSectionRef = React.useRef<HTMLElement>(null);
  const videoURLInputRef = React.useRef<HTMLInputElement>(null);

  const forestAudioRef = React.useRef<HTMLAudioElement>(null);
  const fireplaceAudioRef = React.useRef<HTMLAudioElement>(null);
  const oceanAudioRef = React.useRef<HTMLAudioElement>(null);
  const keyboardAudioRef = React.useRef<HTMLAudioElement>(null);
  const rainAudioRef = React.useRef<HTMLAudioElement>(null);
  const trafficAudioRef = React.useRef<HTMLAudioElement>(null);
  const birdsAudioRef = React.useRef<HTMLAudioElement>(null);
  const coffeeAudioRef = React.useRef<HTMLAudioElement>(null);
  const snowAudioRef = React.useRef<HTMLAudioElement>(null);

  const audioMetadataToRefs = React.useMemo(() => ({
    birds: birdsAudioRef,
    coffee: coffeeAudioRef,
    fireplace: fireplaceAudioRef,
    forest: forestAudioRef,
    keyboard: keyboardAudioRef,
    ocean: oceanAudioRef,
    rain: rainAudioRef,
    snow: snowAudioRef,
    traffic: trafficAudioRef,
  }), []);

  React.useEffect(() => {
    for (const soundEffectRef of Object.values(audioMetadataToRefs)) {
      if (!soundEffectRef.current) {
        continue;
      }

      soundEffectRef.current.volume = 0.25;
    }
  }, [audioMetadataToRefs]);

  React.useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!isFullScreen);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, [isFullScreen]);

  const openModal = (mode: ControlBarModalMode) => {
    setControlBarMode(mode);
    setIsModalOpen(true);
  }

  const onURLFormSubmit = () => {
    const element = videoURLInputRef.current

    if (!element) {
      return;
    }

    const url = isContentfulString(element.value) ? element.value : DEFAULT_VIDEO_URL;

    setVideoURL(url);
    setIsModalOpen(false);
  };

  const onSoundEffectButtonClick = (key: string) => {
    playOrPauseSoundEffect(audioMetadataToRefs[key as keyof typeof AUDIO_METADATA]);
  }

  const pauseAllSoundEffects = () => {
    for (const soundEffectRef of Object.values(audioMetadataToRefs)) {
      if (!soundEffectRef.current) {
        continue;
      }

      soundEffectRef.current.pause();
    }
  };

  const muteOrUnmuteAllSoundEffects = () => {
    for (const soundEffectRef of Object.values(audioMetadataToRefs)) {
      if (!soundEffectRef.current) {
        continue;
      }

      if (soundEffectRef.current.muted) {
        soundEffectRef.current.muted = false;
      } else {
        soundEffectRef.current.muted = true;
      }
    }
  };

  const toggleFullscreen = () => {
    if (isFullScreen && document.fullscreenElement) {
      return void document.exitFullscreen();
    }

    void playerSectionRef.current?.requestFullscreen();
  };

  const playOrPauseSoundEffect = (soundEffectRef: React.RefObject<HTMLAudioElement>): void => {
    if (!soundEffectRef.current) {
      return;
    }

    if (soundEffectRef.current.paused) {
      return void soundEffectRef.current.play();
    }

    void soundEffectRef.current.pause();
  };

  const playOrPauseMedia = (): void => {
    const shouldPlay = !isVideoPlaying;
    setIsVideoPlaying(shouldPlay);

    shouldPlay ? player?.playVideo() : player?.pauseVideo();
  };

  const stopMedia = (): void => {
    setIsVideoPlaying(false);
    player?.stopVideo();
    pauseAllSoundEffects();
  };

  const muteOrUnmuteMedia = (): void => {
    if (isVideoPlaying) {
      const shouldMute = !isVideoMuted;
      setIsVideoMuted(shouldMute);

      shouldMute ? player?.mute() : player?.unMute();
      muteOrUnmuteAllSoundEffects();
    }
  };

  return (
    <React.Suspense fallback={<Loader />}>
      <div className="flex flex-col items-center bg-slate-900">
        <header className="flex fixed w-full items-center justify-between backdrop-blur-md bg-opacity-10 z-20 p-5">
          <nav className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <a className="flex items-center gap-4" href="/" target="_self" rel="noreferrer">
                <img className="w-[32px] md:w-[48px]" src={logo} alt="Lo-fi Dino logo" />
              </a>
              <h1 className="font-bold hidden md:block">Lo-fi Dino</h1>
            </div>

            <div className="flex gap-2 justify-center text-2xl md:text-5xl p-5">
              <span className="animate-text1 bg-gradient-to-r from-title-1-start-color-100 via-title-1-middle-color-100 to-title-1-end-color-100 bg-clip-text font-black text-transparent">
                Relax.
              </span>
              <span className="animate-text2 bg-gradient-to-r from-title-2-start-color-200 to-title-2-end-color-200 bg-clip-text font-black text-transparent">
                Chill.
              </span>
              <span className="animate-text3 bg-gradient-to-r from-title-3-start-color-300 to-title-3-end-color-300 bg-clip-text font-black text-transparent">
                Focus.
              </span>
            </div>
          </nav>
        </header>

        <section className="flex relative justify-center gap-6 mt-[9rem] w-full md:w-5/6 p-4 h-[45rem] z-10" ref={playerSectionRef}>
          <VideoPlayer url={videoURL} onReady={setPlayer} />
          <ControlBar
            onCloseModal={() => setIsModalOpen(false)}
            onChangeVideoButtonClick={() => openModal(ControlBarModalMode.URL)}
            onSoundEffectsButtonClick={() => openModal(ControlBarModalMode.SOUND_EFFECTS)}
            onFullscreenButtonClick={toggleFullscreen}
            onURLFormSubmit={onURLFormSubmit}
            onSoundEffectButtonClick={onSoundEffectButtonClick}
            isModalOpen={isModalOpen}
            mode={controlBarMode}
            isVideoMuted={isVideoMuted}
            onMuteUnmuteButtonClick={muteOrUnmuteMedia}
            onPlayPauseButtonClick={playOrPauseMedia}
            onStopButtonClick={stopMedia}
            videoURLInputRef={videoURLInputRef}
          />
        </section>

        <div>
          {Object.entries(AUDIO_METADATA).map(([key, { src }]) => (
            <Audio key={key} ref={audioMetadataToRefs[key as keyof typeof AUDIO_METADATA]} src={src} />
          ))}
        </div>

        <footer className="h-full pt-20 pb-5 flex flex-col gap-4 justify-center items-center sm:text-base lg:text-lg mt-10">
          <a
            className="btn btn-outline text-base md:text-lg btn-secondary"
            href="https://github.com/thegfmachado"
            target="_blank"
            rel="noreferrer"
          >
            {`<gfm />`}
          </a>
          <p>
            Made with <span>❤️</span> and <span>☕</span>
          </p>
        </footer>
      </div>
    </React.Suspense>
  );
}

export default App;
