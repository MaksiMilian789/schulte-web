export interface Results {
  efficiency: number;
  workability: number;
  sustainability: number;
}

export interface httpResults extends Results {
  time: number;
  mistakes: number;
  date: string;
}

export interface httpAllResults extends Results {
  login: string;
  time: number;
  mistakes: number;
  date: string;
}
