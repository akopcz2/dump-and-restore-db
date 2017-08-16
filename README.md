# Dump-and-restore-db

Current Implementation only works via env file and default mongo port

these are required for the script to run and a zip of the database in the root

example of zip database name
> 7_15_2017_1502825122_databaseName.zip

Make sure your env var has a mongo url
```javascript
MONGO_URI=mongodb://localhost/databaseName
```

Getting Started
```javascript
npm install
```
example of restore.js settings with dump and database deletion enabled
the default config is set to fault to prevent any kind unwanted of database and dump deletion

```javascript
let dumpAndRestore = require('dump-and-restore-db');

var config = {
    safeMode:false,
    deleteDump:false,
    deleteDatabase:false,
};

let dumpp = new dumpAndRestore(config).init();
```

Currently have this implemented as an npm script inside package.json
```javascript
npm run restore
```



