export class NoNegativeCasesFilter {
  applyFilter(data) {
    return data.map((datum) => {
      return {
        confirmed: positiveDataOrZero(datum.confirmed),
        deaths: positiveDataOrZero(datum.deaths),
        recovered: positiveDataOrZero(datum.recovered),
        dailyCases: positiveDataOrZero(datum.dailyCases),
        date: datum.date,
      };
    });
  }
}
function positiveDataOrZero(datum) {
  if (datum === null) {
    return 0;
  }

  return datum >= 0 ? datum : 0;
}
