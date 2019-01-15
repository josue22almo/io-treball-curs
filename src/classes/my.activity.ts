export interface IActivityConfig {
  id: string;
  duration: number;
  est?: number; // Earliest start time
  lst?: number; // latest start time
  eet?: number; // Earliest end time
  let?: number; // Latest end time
  cost: number;
  maxWorkers: number;
  successors: string[];
  predecessors: string[];
}

export class MyActivity {
  public config: IActivityConfig;

  constructor(config: IActivityConfig) {
    this.config = config;
  }

  public print() {
    console.log({
      ...this.config,
    });
  }
}
