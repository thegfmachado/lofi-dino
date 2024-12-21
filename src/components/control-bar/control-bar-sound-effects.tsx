import * as React from 'react';

import ControlBarButton from './control-bar-button';
import { AUDIO_METADATA } from '../../constants/constants';

type ControlBarSoundEffectsProps = {
  onButtonClick: (key: string) => void;
}

export function ControlBarSoundEffects(props: ControlBarSoundEffectsProps): React.ReactElement {
  const { onButtonClick } = props;

  return (
    <div className="p-2 flex gap-2 flex-wrap max-w-[320px]">
      {Object.entries(AUDIO_METADATA).map(([key, { icon }]) => (
        <ControlBarButton key={key} icon={icon} keepActive onClick={() => onButtonClick(key)} tip={key} />
      ))}
    </div>
  );
}
