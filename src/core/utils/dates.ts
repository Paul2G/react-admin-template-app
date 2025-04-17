import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

const tz = "America/Tijuana";

export function getDefaultFormatDate(dateString: string) {
  return dayjs(dateString).tz(tz).format("DD/MM/YYYY hh:mm A");
}

export function calculateTimeLeft(targetDateString: string) {
  if (!dayjs(targetDateString).isValid()) {
    return false;
  }

  const targetDate = dayjs(targetDateString).tz(tz);
  const dateNow = dayjs().tz(tz);

  return {
    days: targetDate.diff(dateNow, "days"),
    hours: targetDate.diff(dateNow, "hours") % 24,
    minutes: targetDate.diff(dateNow, "minutes") % 60,
    seconds: targetDate.diff(dateNow, "seconds") % 60,
  };
}

export function isAfterDate(targetDateString: string) {
  if (targetDateString === undefined || !dayjs(targetDateString).isValid()) {
    return false;
  }

  const dateNow = dayjs().tz(tz);
  const targetDate = dayjs(targetDateString).tz(tz);

  return dateNow.isSameOrAfter(targetDate);
}

export function hasHappenedNDays(targetDateString: string, days: number) {
  if (targetDateString === undefined || !dayjs(targetDateString).isValid()) {
    return true;
  }

  const dateNow = dayjs().tz(tz);
  const targetDate = dayjs(targetDateString).tz(tz);

  return dateNow.diff(targetDate, "day") > days;
}
