export interface Results {
  efficiency: number;
  workability: number;
  sustainability: number;
}

export interface httpResults extends Results {
  time: number;
  mistakes: number;
  date: Date;
}

export interface httpAllResults extends Results {
  fio: string;
  time: number;
  mistakes: number;
  date: Date;
}
