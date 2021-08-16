export const toRadians = (angle = 0) => {
  return angle * (Math.PI / 180);
}

export const inverseDebounce = (fn: VoidFunction, ms = 0) => {
  let timer;
  let canCall = true;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    if (canCall) {
      fn();
      canCall = false;
    }

    timer = setTimeout(() => canCall = true, ms);
  }
}