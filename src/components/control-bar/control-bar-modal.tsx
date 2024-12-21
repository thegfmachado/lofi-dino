import type { ReactElement } from 'react';

import { EnumOrStringLiteralTypes } from '../../types/common';

import { ControlBarURLForm } from './control-bar-url-form';
import { ControlBarSoundEffects } from './control-bar-sound-effects';

import classNames from '../../utils/class-names';

export enum ControlBarModalMode {
  URL = 'url',
  SOUND_EFFECTS = 'soundEffects',
}

export type ControlBarModalProps = {
  mode: EnumOrStringLiteralTypes<ControlBarModalMode>;
  onClose: () => void;
  onURLFormSubmit: () => void;
  onSoundEffectButtonClick: (key: string) => void;
  open: boolean;
  videoURLInputRef: React.RefObject<HTMLInputElement>;
}

export function ControlBarModal(props: ControlBarModalProps): ReactElement {
  const { onClose, onURLFormSubmit, onSoundEffectButtonClick, open, mode, videoURLInputRef } = props;

  const className = classNames({
    modal: true,
    'modal-open': open,
  });

  return (
    <dialog className={className}>
      <div className="modal-box w-fit px-2 py-8 flex flex-col gap-2 backdrop-blur bg-opacity-80 backdrop-saturate-400 backdrop-contrast-300">
        {mode === ControlBarModalMode.URL ? (
          <ControlBarURLForm onSubmit={onURLFormSubmit} videoURLInputRef={videoURLInputRef} />
        ) : <ControlBarSoundEffects onButtonClick={onSoundEffectButtonClick} />}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
