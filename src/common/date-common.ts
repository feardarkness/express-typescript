import { add } from "date-fns";
import { formatISO } from "date-fns";

export default class DateCommon {
  /**
   * Add to a Date
   * @param date Date to operate with
   * @param duration Duration to be added
   */
  static addTime(date: number | Date, duration: Duration) {
    return add(date, duration);
  }

  /**
   * Return s the current date
   */
  static getCurrentDate(): Date {
    return new Date();
  }

  /**
   * Return the date in ISO 8601 format
   * @param date A javascript date
   */
  static getIsoDate(date: Date): string {
    return formatISO(date);
  }
}
