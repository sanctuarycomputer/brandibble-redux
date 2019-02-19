const HOUR = 1;
const MINS_IN_HOUR = 60;

export default (luxonDateTime) => {
  const { hour, minute } = luxonDateTime.toObject();

  // Convert hour to minutes
  const hourInMinutes = hour * (MINS_IN_HOUR / HOUR);
  return hourInMinutes + minute;
};
