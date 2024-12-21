import { CheckSquare } from '@phosphor-icons/react';

type ControlBarURLFormProps = {
  videoURLInputRef: React.RefObject<HTMLInputElement>;
  onSubmit: () => void;
}

export function ControlBarURLForm(props: ControlBarURLFormProps): React.ReactElement {
  const { videoURLInputRef, onSubmit } = props;

  return (
    <div className="flex flex-col md:w-[400px] gap-4 px-4">
      <label>Enter YouTube Video URL</label>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=_3-fYqCFbHQ"
          className="input input-bordered w-full"
          ref={videoURLInputRef}
        />
        <button className="btn btn-square" onClick={onSubmit}>
          <CheckSquare size={28} />
        </button>
      </div>
    </div>
  );
}
