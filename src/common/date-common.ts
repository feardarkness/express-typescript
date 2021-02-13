import { add } from "date-fns";

export default class DateCommon {
  /**
   * Add to a Date
   * @param date Date to operate with
   * @param duration Duration to be added
   */
  addTime(date: number | Date, duration: Duration) {
    return add(date, duration);
  }
}
