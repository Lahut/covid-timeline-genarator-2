import { Detail } from './detail.model';
export class Duration {
  constructor(
    public dateFrom: Date,
    public dateTo: Date,
    public details: Detail[],
  ) {}
}
