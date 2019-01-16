# Critical Path Method

This repository contents the code of a implementation of the critical path method algorith.

# System requirements

In order to be able to follow with this guide, your system needs these requirements:

1. NPM latest version [Installation guide](https://www.npmjs.com/get-npm)
2. Node JS latest version [Installation guide](https://nodejs.org/en/download/)

## Installing

Before running/testing the code, first install the package dependencies. Run the following command: 

```
  $ npm install
```

This command will install all the package dependencies.

## How to run the code

The tasks are defined at in the inputs folder. There are three files in that folder:

1. garage.json: contents the description of a set of tasks to construct a garage
2. omega.json: the definition of a set of tasks of a OMEGA squad.
2. alpha.json: the definition of a set of tasks of a ALPHA squad.

To test each file, run the command:

```
  $ npm run $INPUT_NAME (-- --time)
```

#### Input name values:
- omega
- alpha
- garage

#### Options
To add options use '--' and then write the option name

The available options are:
- --time: runs the cpm algorithm using the time implementation.


You can define new inputs files following the structure of the given ones.