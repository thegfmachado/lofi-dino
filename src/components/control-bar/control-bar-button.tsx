import { Icon } from '@phosphor-icons/react';

interface ControlBarButton {
  icon: Icon;
  onClick?: () => void;
  size?: number;
}

function ControlBarButton(props: ControlBarButton) {
  const { icon: Icon, onClick, size } = props;

  return (
    <Icon size={size ?? 28} onClick={onClick} />
  )
}

export default ControlBarButton;
