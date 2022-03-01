import { Injectable } from '@nestjs/common';
import { TimeLine } from '../models/timeline.model';
import { Detail } from '../models/detail.model';
import { Duration } from '../models/duration.model';
import { TimeLineItem } from '../models/timelineItem.model';

@Injectable()
export class TimeLineService {
  timeline: TimeLine[] = [];
  detail: Detail[] = [];
  duration: Duration[] = [];
  timeLineItem: TimeLineItem[] = [];
  visitedPlace: string[] = [];
  visitedType: string[] = ['outdoor', 'travelling'];

  createTimeLine(
    age: number,
    gender: string,
    occupation: string,
    dateFrom: string,
    dateTo: string,
    desc: string,
    locationType: string,
    location: string,
  ) {
    const detail = new Detail(desc, location, locationType);
    this.detail.push(detail);
    const duration = new Duration(
      new Date(dateFrom),
      new Date(dateTo),
      this.detail,
    );
    this.duration.push(duration);
    const timelineItem = new TimeLineItem(new Date(dateFrom), this.duration);
    this.timeLineItem.push(timelineItem);

    if (this.visitedType.includes(locationType)) {
      this.visitedPlace.push(location);
    }
    const TimeLine_ = new TimeLine(
      gender,
      age,
      occupation,
      this.visitedPlace,
      this.timeLineItem,
    );
    this.timeline = [];
    this.detail = [];
    this.duration = [];
    this.timeLineItem = [];
    this.visitedPlace = [];

    return TimeLine_;
  }

  insertTimeLine(
    age: number,
    gender: string,
    occupation: string,
    dateFrom: string,
    dateTo: string,
    desc: string,
    locationType: string,
    location: string,
    timeLine: TimeLineItem[],
    visitedPlaces: string[],
  ) {
    const mainDate_ = new Date(dateFrom).toLocaleDateString();
    const dateFrom_ = new Date(dateFrom).getTime();
    const dateTo_ = new Date(dateTo).getTime();

    let found = 0;
    const newTimeLineItem = this.createTimeLine(
      age,
      gender,
      occupation,
      dateFrom,
      dateTo,
      desc,
      locationType,
      location,
    );

    timeLine.forEach((item: TimeLineItem) => {
      if (new Date(item.dateMain).toLocaleDateString() === mainDate_) {
        item.durations.forEach((item: Duration) => {
          if (
            new Date(item.dateFrom).getTime() === dateFrom_ &&
            new Date(item.dateTo).getTime() === dateTo_
          ) {
            item.details.push(
              newTimeLineItem.timeLines[0].durations[0].details[0],
            );
            ++found;
          }
        });
        if (found === 0) {
          //sort
          item.durations.push(newTimeLineItem.timeLines[0].durations[0]);
          item.durations.sort((a, b) => {
            if (
              new Date(a.dateFrom).getTime() === new Date(b.dateFrom).getTime()
            ) {
              if (new Date(a.dateTo).getTime() > new Date(b.dateTo).getTime())
                return 1;

              if (new Date(a.dateTo).getTime() < new Date(b.dateTo).getTime())
                return -1;

              return 0;
            }
            if (new Date(a.dateFrom).getTime() > new Date(b.dateFrom).getTime())
              return 1;

            if (new Date(a.dateFrom).getTime() < new Date(b.dateFrom).getTime())
              return -1;

            return 0;
          });
          ++found;
        }
      }
    });
    if (found === 0) {
      timeLine.push(newTimeLineItem.timeLines[0]);
    }

    if (this.visitedType.includes(locationType)) {
      visitedPlaces.push(location);
    }
    let visited_ = new Set(visitedPlaces.sort());

    return {
      timelines: this.sortTime(timeLine),
      visitedPlaces: Array.from(visited_),
    };
  }

  sortTime(timelines: TimeLineItem[]) {
    timelines.sort((a: TimeLineItem, b: TimeLineItem) => {
      return new Date(a.dateMain).getTime() - new Date(b.dateMain).getTime();
    });

    return timelines;
  }

  deleteDuration(
    timelines: TimeLineItem[],
    dateToDelete: string,
    mainDateToDelete: string,
  ) {
    const timelines_ = timelines.map((item) => {
      if (
        new Date(item.dateMain).getTime() ===
        new Date(mainDateToDelete).getTime()
      ) {
        item.durations.filter(
          (item) =>
            new Date(item.dateFrom).getTime() !==
            new Date(dateToDelete).getTime(),
        );
      }
    });
    return { timelines: timelines_ };
  }

  deleteMainDate(timelines: TimeLineItem[], mainDateToDelete: string) {
    const tl = timelines.filter(
      (item) =>
        new Date(item.dateMain).getTime() !==
        new Date(mainDateToDelete).getTime(),
    );
    return tl;
  }
}
