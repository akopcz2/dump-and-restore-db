# Dump-and-restore-db


## Warning Only use this if you have database backups - This will drop your db


Current Implementation only works with mongo and specific env file

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


Make sure your env var has a mongo url i.e
```javascript
MONGO_URI=mongodb://localhost/databaseName
```

Currently have this implemented as an npm script inside package.json
```javascript
npm run restore
```



