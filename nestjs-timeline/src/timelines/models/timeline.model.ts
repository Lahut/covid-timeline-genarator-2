import { TimeLineItem } from './timelineItem.model';

export class TimeLine {
  constructor(
    public gender: string,
    public age: number,
    public occupation: string,
    public visitedPlace: string[],
    public timeLines: TimeLineItem[],
  ) {}
}
