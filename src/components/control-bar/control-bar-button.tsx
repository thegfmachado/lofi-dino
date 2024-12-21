import * as React from 'react';

import type { ReactElement } from 'react';

import type { Icon } from '@phosphor-icons/react';
import classNames from '../../utils/class-names';

interface ControlBarButton {
  icon: Icon;
  onClick?: () => void;
  size?: number;
  tip?: string;
  keepActive?: boolean;
}

function ControlBarButton(props: ControlBarButton): ReactElement {
  const { icon: Icon, onClick, tip, keepActive = false, size } = props;

  const [isActive, setIsActive] = React.useState(false);

  const className = classNames({
    'btn': true,
    'btn-active': keepActive && isActive,
    'btn-ghost': true,
    'btn-md': true,
    'btn-square': true,
  });

  const handleClick = () => {
    setIsActive((prev) => !prev);
    onClick?.();
  };

  return (
    <div className="tooltip" data-tip={tip}>
      <button className={className} onClick={handleClick}>
        <Icon size={size ?? 28} />
      </button>
    </div>
  );
}

export default ControlBarButton;
