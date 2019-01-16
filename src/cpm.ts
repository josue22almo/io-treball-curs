
import { MyActivity, MyActivityList, IActivityConfig } from "./classes";
import fs = require("fs");
import Ajv = require("ajv");

if (!process.argv[2]) {
  console.log("Provide an input file to run this code");
  process.exit(0);
}

let time: boolean = false;

if (process.argv[3]) {
  if (process.argv[3] !== "--time") {
    console.log("Third argument should be 'time'");
    process.exit(0);
  }
  time = true;
}

const inputJSON: Buffer = fs.readFileSync(process.argv[2]);
const data = JSON.parse(inputJSON.toString("utf8"));

if (!data.activities) {
  console.log("No activities found at input file");
  process.exit(0);
}

const activityList = new MyActivityList();
const schema = {
  name: "activity-schema",
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    duration: {
      type: "number",
    },
    cost: {
      type: "number",
    },
    maxWorkers: {
      type: "number",
    },
    successors: {
      type: "array",
      items: {
        type: "string",
      },
    },
    predecessors: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["id", "duration", "cost", "maxWorkers", "successors", "predecessors"],
};

const myajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validate = myajv.compile(schema);

for (const activityConfig of data.activities) {
  const valid = validate(activityConfig);
  if (!valid) {
    console.log("Schema errors with activity:", activityConfig, {
      errors: validate.errors,
    });
    process.exit(0);
  }
  const act = new MyActivity(activityConfig);
  activityList.addActivity(act);
}

console.log(activityList.cpm(time));
