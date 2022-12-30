import { Duration } from 'date-fns';
import { isDefined } from 'utils/typeguards';

let locale = 'en';

const format = (options: Intl.DateTimeFormatOptions) => (dateOrString: Date | string | undefined | null) => {
  if (!dateOrString) {
    return '';
  }
  const date = typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString;
  if (Number.isNaN(date.valueOf())) {
    return '';
  }
  const dateTimeFormat = Intl.DateTimeFormat(locale, options);
  return dateTimeFormat.format(date);
};

const formatDuration = ({ hours, minutes }: Duration) => {
  const isNegativeHours = isDefined(hours) && hours < 0;
  const isNegativeMinutes = isDefined(minutes) && minutes < 0;
  if (isNegativeHours || isNegativeMinutes) {
    return `00:00`;
  }

  const hh = String(hours || 0).padStart(2, '0');
  const mm = String(minutes || 0).padStart(2, '0');
  return `${hh}:${mm}`;
};

export const DF = Object.freeze({
  setLocale(l: string) {
    locale = l;
  },
  get locale() {
    return locale;
  },
  format,
  formatWeekDay: format({ weekday: 'long' }),
  formatDate: format({ month: 'long', day: 'numeric' }),
  formatTime: format({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
  formatDuration,
});
