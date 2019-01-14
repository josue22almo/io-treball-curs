
import { MyActivity, MyActivityList, IActivityConfig } from "./classes";

const activityList = new MyActivityList();
activityList.addActivity(new MyActivity({
    id: "A",
    duration: 7,
    successors: [],
    predecessors: [],
}));

activityList.addActivity(new MyActivity({
    id: "B",
    duration: 2,
    successors: [],
    predecessors: [],
}));

activityList.addActivity(new MyActivity({
    id: "C",
    duration: 15,
    predecessors: [],
    successors: [],
}));

activityList.addActivity(new MyActivity({
    id: "D",
    duration: 8,
    predecessors: ["E"],
    successors: [],
}));

activityList.addActivity(new MyActivity({
    id: "E",
    duration: 10,
    predecessors: ["A", "B"],
    successors: [],
}));

activityList.addActivity(new MyActivity({
    id: "F",
    duration: 2,
    predecessors: ["D", "G"],
    successors: [],
}));

activityList.addActivity(new MyActivity({
    id: "G",
    duration: 5,
    predecessors: ["E"],
    successors: [],
}));

activityList.addActivity(new MyActivity({
    id: "H",
    duration: 8,
    predecessors: ["G"],
    successors: [],
}));

activityList.addActivity(new MyActivity({
    id: "I",
    duration: 2,
    predecessors: ["F", "C"],
    successors: [],
}));

activityList.addActivity(new MyActivity({
    id: "J",
    duration: 3,
    predecessors: ["I"],
    successors: [],
}));

// const graphs = activityList.createGraphs();
// const rounds = activityList.rounds();
// console.log(rounds);
activityList.cpm();

// console.log(graphs.original);
// console.log("====================");
// console.log(graphs.shadowed);
// console.log('activityList', activityList.getList());

// var path = activityList.getCriticalPath('E');

// //RETURNS E->F->B
// console.log(path);
