export class NoOlderThanXDaysFilter {
  constructor(configuration) {
    this.numberOfDays = configuration.numberOfDays;
  }

  applyFilter(data) {
    const xDaysAgo = new Date(Date.now() - this.numberOfDays * 24 * 60 * 60 * 1000); // Look into using Moment.js
    return data.filter((datum) => !(new Date(datum.date) < xDaysAgo));
  }
}
