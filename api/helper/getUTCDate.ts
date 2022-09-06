module.exports = (hour: number, minut: number, second: number): Date => {
  let date = new Date();
  date = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours() + hour,
    date.getUTCMinutes() + minut,
    date.getUTCSeconds() + second
  );
  return date;
};
