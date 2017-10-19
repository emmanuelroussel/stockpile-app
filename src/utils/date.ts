// Returns a date in MySQL datetime format
export function dateToMySQLFormat(date: Date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}
