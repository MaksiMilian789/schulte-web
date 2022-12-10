import { Injectable } from '@angular/core';
import { Results } from '../shared/models/results';

@Injectable({
  providedIn: 'root',
})
export class resultService {
  constructor() {}

  calcResult(timeStage: number[]): Results {
    let efficiency = this.calcEfficiency(timeStage);
    let workability = timeStage[0] / efficiency;
    let sustainability = timeStage[3] / efficiency;

    let res: Results = {
      efficiency: efficiency,
      workability: workability,
      sustainability: sustainability,
    };

    return res;
  }

  calcEfficiency(timeStage: number[]): number {
    let res = 0;
    timeStage.forEach((element) => {
      res += element;
    });
    return res / 5;
  }
}
