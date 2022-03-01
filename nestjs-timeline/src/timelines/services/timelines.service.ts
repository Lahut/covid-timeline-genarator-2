import { Injectable } from '@nestjs/common';
import { TimeLine } from '../models/timeline.model';
import { Detail } from '../models/detail.model';
import { Duration } from '../models/duration.model';
import { TimeLineItem } from '../models/timelineItem.model';

@Injectable()
export class TimeLineService {
  timeline: TimeLine;
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

    if (!this.timeline) {
      this.timeline = TimeLine_;
    }
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
    this.timeline.age = newTimeLineItem.age;
    this.timeline.gender = newTimeLineItem.gender;
    this.timeline.occupation = newTimeLineItem.occupation;

    this.timeline.timeLines.forEach((item: TimeLineItem) => {
      if (new Date(item.dateMain).toLocaleDateString() === mainDate_) {
        item.durations.forEach((item: Duration) => {
          if (
            new Date(item.dateFrom).getTime() === dateFrom_ &&
            new Date(item.dateTo).getTime() === dateTo_
          ) {
            item.details.push(new Detail(desc, location, locationType));
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
      this.timeline.timeLines.push(newTimeLineItem.timeLines[0]);
    }

    if (this.visitedType.includes(locationType)) {
      this.timeline.visitedPlace.push(location);
    }

    this.timeline.timeLines = this.sortTime(this.timeline.timeLines);

    let timeline_ = this.timeline;
    return timeline_;
  }

  sortTime(timelines: TimeLineItem[]) {
    timelines.sort((a: TimeLineItem, b: TimeLineItem) => {
      return new Date(a.dateMain).getTime() - new Date(b.dateMain).getTime();
    });

    return timelines;
  }

  deleteDuration(
    dateToDelete: string,
    dateFromDelete: string,
    mainDateToDelete: string,
  ) {
    const main_del = new Date(mainDateToDelete).getTime();
    const dateFrom_del = new Date(dateFromDelete).getTime();
    const dateTo_del = new Date(dateToDelete).getTime();
    var visited = '';

    // this.timeline.timeLines.filter((item) => new Date(item.dateMain).getTime() !== main_del)

    for (let i = 0; i < this.timeline.timeLines.length; i++) {
      const BigMainDate = new Date(
        this.timeline.timeLines[i].dateMain,
      ).getTime();
      if (BigMainDate === main_del) {
        const result = this.timeline.timeLines[i].durations.filter((item) => {
          new Date(item.dateFrom).getTime() !== dateFrom_del &&
            new Date(item.dateTo).getTime() !== dateTo_del;
        });

        if (result.length === 0) {
          this.timeline.timeLines.splice(i, i + 1);
        } else {
          this.timeline.timeLines[i].durations = result;
        }
      }
    }

    let timeline_ = this.timeline;
    return timeline_;
  }

  getTimeline() {
    let timeline_ = this.timeline;
    return timeline_;
  }
}
