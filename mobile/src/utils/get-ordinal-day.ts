// Helper function to get ordinal suffix for numbers
export const getOrdinalDay = (day: string | number) => {
  const num = Number(day);

  // Handle special cases 11, 12, 13
  if (num % 100 === 11 || num % 100 === 12 || num % 100 === 13) {
    return `${num}th`;
  }

  // Handle normal cases
  switch (num % 10) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
};
