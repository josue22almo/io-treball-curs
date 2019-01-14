import { MyActivity } from "./my.activity";

export interface IMyNode {
  id: string;
  edges: string[];
}

export class MyActivityList {
  public list: { [s: string]: MyActivity; };
  public criticalPath: string[];

  constructor() {
    this.list = {};
    this.criticalPath = [];
  }

  public addActivity(activity: MyActivity) {
    this.list[activity.config.id] = activity;
  }

  public generateSucessors() {
    Object.keys(this.list).forEach((key: string) => {
      this.list[key].config.predecessors.forEach((id: string) => {
        if (!this.list[id].config.successors) {
          this.list[id].config.successors = [];
        }
        this.list[id].config.successors!.push(key);
      });
    });
  }

  public createGraphs() {
    this.generateSucessors();
    const original: { [id: string]: IMyNode} = {};
    const shadowed: { [id: string]: IMyNode} = {};

    for (const key of Object.keys(this.list)) {
      const currentActivity: MyActivity = this.list[key];
      const originalNode = {
        id: currentActivity.config.id,
        edges: [],
      };
      const shadowedNode = {
        id: currentActivity.config.id,
        edges: [],
      };
      original[originalNode.id] = originalNode;
      shadowed[shadowedNode.id] = shadowedNode;
    }

    for (const key of Object.keys(this.list)) {
      const currentActivity: MyActivity = this.list[key];
      for (const predecessorId of currentActivity.config.predecessors) {
        shadowed[predecessorId].edges.push(currentActivity.config.id);
        original[currentActivity.config.id].edges.push(predecessorId);
      }
    }
    return {
      original,
      shadowed,
    };
  }

  public filter(original: any) {
    return Object.keys(original).filter((key) => {
        return original[key].edges.length === 0;
      }).map((key) => {
        return original[key].id;
      });
  }

  public rounds() {
    const {
      original,
      shadowed } = this.createGraphs();

    const rounds: any = [];

    let filtered = this.filter(original);
    while (filtered.length !== 0) {
      rounds.push(filtered);
      filtered.forEach((item) => {
        delete original[item!];
        for (const originalKey of Object.keys(original)) {
          original[originalKey].edges = original[originalKey].edges.filter((value) => {
            return value !== item;
          });
        }
      });
      filtered = this.filter(original);
    }
    return rounds;
  }

  public getFinalNodes() {
      return Object.keys(this.list).filter((key) => this.list[key].config.successors.length === 0);
  }

  public setEarliest(rounds: any[]) {
    let maxEET: number;

    rounds.forEach((x) => {
        for (const id of x) {
            const currentActivity = this.list[id];
            const predsEET: number[] = currentActivity.config.predecessors.map((p) => this.list[p].config.eet!);
            if (predsEET!.length !== 0) {
                maxEET = Math.max(...predsEET!);
                currentActivity.config.est = maxEET;
            } else {
                currentActivity.config.est = 0;
            }
            currentActivity.config.eet = currentActivity.config.est! + currentActivity.config.duration;
        }
    });

    return Math.max(rounds[rounds.length - 1].map((id: string) => this.list[id].config.eet));
  }

  public setLatest(node: string) {
    const currentActivity: MyActivity = this.list[node];
    for (const id of currentActivity.config.predecessors) {
      if (!this.list[id].config.lst) {
        this.list[id].config.lst = currentActivity.config.lst! - this.list[id].config.duration;
      } else {
        this.list[id].config.lst = Math.min(this.list[id].config.lst!, currentActivity.config.lst! - this.list[id].config.duration);
      }
      this.setLatest(id);
    }
  }

  public setCriticalPath() {
    const rounds: any[] = this.rounds();
    this.list.START = new MyActivity({
      id: "START",
      duration: 0,
      est: 0,
      lst: 0,
      // let: 0,
      eet: 0,
      predecessors: [],
      successors: rounds[0],
    });
    rounds[0].forEach((id: string) => {
      this.list[id].config.predecessors = ["START"];
    });
    const earliestFinishTime: number = this.setEarliest(rounds);
    this.list.FINISH = new MyActivity({
      id: "FINISH",
      duration: 0,
      est: earliestFinishTime,
      lst: earliestFinishTime,
      predecessors: this.getFinalNodes(),
      successors: [],
    });
    this.list.FINISH.config.predecessors.forEach((id: string) => {
      this.list[id].config.successors.push("FINISH");
    });
    this.setLatest("FINISH");
  }

  public getCriticalPath(id: string, criticalPath: any[]) {
    if (id === "FINISH") {
      criticalPath.pop();
      this.criticalPath = criticalPath.map((act: MyActivity) => {
        return act.config.id;
      });
    } else {
      const currNode: MyActivity = this.list[id];
      currNode.config.successors.forEach((id: string) => { /* tslint:disable-line */
        const node: MyActivity = this.list[id];
        if (Math.abs(node.config.est! - node.config.lst!) === 0) {
          criticalPath.push(node);
          // console.log(id, criticalPath);
          this.getCriticalPath(id, criticalPath.slice());
          criticalPath.pop();
        }
      });
    }
  }

  public cpm() {
    this.setCriticalPath();
    this.getCriticalPath("START", []);
    console.log("Critical path", this.criticalPath);
    // this.print();
  }

  public print() {
    console.log("======================");
    for (const key of Object.keys(this.list)) {
      this.list[key].print();
      console.log("======================");
    }
  }
}
