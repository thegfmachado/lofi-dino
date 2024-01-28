/**
 * This method returns if the current device is touchable
 * @returns if the current device is touchable
 */
function isTouchableDevice(): boolean {
  return ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

export default isTouchableDevice;
