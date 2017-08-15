# Dump-and-restore-db


## Warning Only use this if you have database backups - This will drop your db


Current Implementation only works with mongo and specific env file

Getting Started
```javascript
npm install
```

Make sure your env var has a mongo url i.e
```javascript
MONGO_URI=mongodb://localhost/bah-cobc
```

Currently have this implemented as an npm script inside package.json
```javascript
npm run restore
```

The restore.js file (lives at root)
```javascript
let dumpAndRestore = require('dump-and-restore-db');
dumpAndRestore();
```

