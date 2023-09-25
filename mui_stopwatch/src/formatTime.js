export const formatTime = (time) => {
  const ms = time % 60;
  const s = Math.floor(time / 60) % 60;
  const m = Math.floor(time / 3600);
  const two_decimal = (val) => val >= 10 ? val : '0' + String(val);
  return `${two_decimal(m)}:${two_decimal(s)}.${two_decimal(ms)}`;
};
