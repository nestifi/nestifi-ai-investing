export const getDayName = (day: string | number) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const num = Number(day);
  return dayNames[num] || 'Unknown day';
};
