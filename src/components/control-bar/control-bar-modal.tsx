import type { ReactElement } from 'react';

import { CheckSquare } from '@phosphor-icons/react';

import classNames from '../../utils/class-names';

interface ControlBarModalProps {
  onClose: () => void;
  onModalButtonClick: () => void;
  open: boolean;
}

function ControlBarModal(props: ControlBarModalProps): ReactElement {
  const { onClose, onModalButtonClick, open } = props;

  const className = classNames({
    modal: true,
    'modal-open': open,
  });

  return (
    <dialog className={className}>
      <div className="modal-box flex flex-col gap-2 backdrop-blur bg-opacity-80 backdrop-saturate-400 backdrop-contrast-300">
        <label htmlFor="videoURL">Enter YouTube Video URL</label>
        <div className="flex gap-4">
          <input
            type="text"
            id="videoURL"
            placeholder="https://www.youtube.com/watch?v=_3-fYqCFbHQ"
            className="input input-bordered w-full"
          />
          <button className="btn btn-square" onClick={onModalButtonClick}>
            <CheckSquare size={28} />
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}

export default ControlBarModal;
