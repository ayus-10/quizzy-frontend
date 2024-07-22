export default function getUTCTimeStamp(date: string | undefined) {
  const utcDateString = (date ? new Date(date) : new Date()).toISOString();
  const timeStamp = new Date(utcDateString).getTime();
  return timeStamp;
}
