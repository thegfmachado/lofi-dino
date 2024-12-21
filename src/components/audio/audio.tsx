import * as React from 'react';

type AudioProps = {
  ref: React.RefObject<HTMLAudioElement>;
  src: string;
}

export const Audio = React.forwardRef<HTMLAudioElement, AudioProps>(({ src }, ref) => {
  return <audio ref={ref} src={src} loop />;
});

Audio.displayName = 'Audio';
