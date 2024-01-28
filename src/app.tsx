import { Suspense, useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import ControlBar from './components/control-bar/control-bar';

import Loader from './components/loader/loader';
import logo from './assets/logo.svg';
import { VideoPlayer } from './components/video-player/video-player';
import type { YouTubePlayerInstance } from './components/video-player/video-player';
import { isContentfulString } from './utils/strings';

const defaultVideoUrl = 'https://www.youtube.com/embed/_3-fYqCFbHQ?si=wpfe9Jhnnc7gCYUW';

function App(): ReactElement {
  const [player, setPlayer] = useState<YouTubePlayerInstance>();
  const [videoURL, setVideoURL] = useState(defaultVideoUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  useEffect(() => {
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

  const onModalButtonClick = () => {
    const element = document.getElementById('videoURL') as HTMLInputElement;

    if (!element) {
      return;
    }

    const url = isContentfulString(element.value) ? element.value : defaultVideoUrl;

    setVideoURL(url);
    setIsModalOpen(false);
  };

  const toggleFullscreen = () => {
    if (isFullScreen && document.fullscreenElement) {
      return void document.exitFullscreen();
    }

    const element = document.getElementById('player-section');

    void element?.requestFullscreen();
  };

  const playOrPauseMedia = (): void => {
    const shouldPlay = !isVideoPlaying;
    setIsVideoPlaying(shouldPlay);

    shouldPlay ? player?.playVideo() : player?.pauseVideo();
  };

  const stopMedia = (): void => {
    setIsVideoPlaying(false);
    player?.stopVideo();
  };

  const muteOrUnmuteMedia = (): void => {
    if (isVideoPlaying) {
      const shouldMute = !isVideoMuted;
      setIsVideoMuted(shouldMute);

      shouldMute ? player?.mute() : player?.unMute();
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col h-full w-full items-center bg-slate-900">
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

        <section
          className="flex justify-center gap-6 mt-[9rem] w-5/6 h-[45rem] border z-10"
          id="player-section"
        >
          <VideoPlayer url={videoURL} onReady={setPlayer} />
          <ControlBar
            onCloseModal={() => setIsModalOpen(false)}
            onChangeVideoButtonClick={() => setIsModalOpen(true)}
            onFullscreenClick={toggleFullscreen}
            onModalButtonClick={onModalButtonClick}
            isModalOpen={isModalOpen}
            isVideoMuted={isVideoMuted}
            onMuteUnmuteButtonClick={muteOrUnmuteMedia}
            onPlayPauseButtonClick={playOrPauseMedia}
            onStopButtonClick={stopMedia}
          />
        </section>

        <footer className="h-full pt-20 pb-5 flex flex-col gap-4 justify-center items-center sm:text-base lg:text-lg mt-10">
          {/* bg-gradient-to-r from-purple-500 from-0% via-blue-700 via-50% to-pink-600 to-100% */}
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
    </Suspense>
  );
}

export default App;
