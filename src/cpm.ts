
import { MyActivity, MyActivityList, IActivityConfig } from "./classes";
import fs = require("fs");

if (!process.argv[2]) {
  console.log("Provide an input file to run this code");
  process.exit(0);
}
const inputJSON: Buffer = fs.readFileSync(process.argv[2]);
const data = JSON.parse(inputJSON.toString("utf8"));

if (!data.activities) {
  console.log("No activities found at input file");
  process.exit(0);
}

const activityList = new MyActivityList();

for (const activityConfig of data.activities) {
  const act = new MyActivity(activityConfig);
  activityList.addActivity(act);
}

console.log(activityList.cpm(false));
