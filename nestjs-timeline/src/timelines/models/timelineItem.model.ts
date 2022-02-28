import { Duration } from './duration.model';
export class TimeLineItem {
  constructor(public dateMain: Date, public durations: Duration[]) {}
}
