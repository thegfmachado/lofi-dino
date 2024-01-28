import type { ReactElement } from 'react';

import type { Icon } from '@phosphor-icons/react';

interface ControlBarButton {
  icon: Icon;
  onClick?: () => void;
  size?: number;
  tip?: string;
}

function ControlBarButton(props: ControlBarButton): ReactElement {
  const { icon: Icon, onClick, tip, size } = props;

  return (
    <div className="tooltip" data-tip={tip}>
      <button className="btn btn-md btn-square btn-ghost" onClick={onClick}>
        <Icon size={size ?? 28} />
      </button>
    </div>
  );
}

export default ControlBarButton;
