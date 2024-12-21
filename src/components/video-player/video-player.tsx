import type { ReactElement } from 'react';

import YouTube from 'react-youtube';
import type { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { extractVideoID } from '../../utils/media';

interface YouTubePlayerInstance extends YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  unMute: () => void;
  mute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
}

interface VideoPlayerProps {
  url: string;
  onReady: (player: YouTubePlayer) => void;
}

function VideoPlayer(props: VideoPlayerProps): ReactElement {
  const { onReady, url } = props;

  const videoId = extractVideoID(url) ?? '';

  const options = {
    height: '100%',
    playerVars: {
      autohide: 0,
      autoplay: 0,
      cc_load_policy: 0,
      controls: 0,
      fs: 0,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      start: 0,
    },
    width: '100%',
  };

  function onPlayerReady(event: YouTubeEvent) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    event.target?.setVolume(30);

    onReady(event.target as YouTubePlayerInstance);
  }

  return (
    <div className="border-2 w-full h-full">
      <YouTube
        style={{
          height: '100%',
          width: '100%',
        }}
        iframeClassName="pointer-events-none"
        videoId={videoId}
        opts={options}
        onReady={onPlayerReady}
      />
    </div>
  );
}

export { VideoPlayer };

export type { YouTubePlayerInstance };
