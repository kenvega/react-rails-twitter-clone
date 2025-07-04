import { formatDistanceToNow, parseISO, format } from "date-fns";

export const formatToMMMdd = (tweetDate: string) => {
  const now = new Date();
  const tweetDateObj = new Date(tweetDate);
  const oneDayInMs = 24 * 60 * 60 * 1000;

  const isMoreThanADayAgo = now.getTime() - tweetDateObj.getTime() > oneDayInMs;

  if (isMoreThanADayAgo) {
    return tweetDateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  } else {
    return formatDistanceToNow(tweetDateObj, { addSuffix: true });
  }
};

export const formatToTimeMMMddYYYY = (tweetDate: string): string => {
  const date = parseISO(tweetDate); // converts string to Date object
  return format(date, "h:mm a · MMM dd, yyyy");
};
