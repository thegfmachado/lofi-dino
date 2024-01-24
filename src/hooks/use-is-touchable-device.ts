import { useEffect, useState } from 'react';

import { isTouchableDevice } from '../utils/is-touchable-device';

/**
 * This hook is used to return if the current device is touchable or not.
 */
function useIsTouchableDevice(): boolean {
  const [isTouchable, setIsTouchable] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsTouchable(isTouchableDevice());
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isTouchable;
}

export {
  useIsTouchableDevice,
};
