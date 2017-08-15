#Dump-and-restore-db

Current Implementation only works with mongo and specific env file


Currently have this implemented as an npm script inside package.json
```javascript
npm run restore
```

The restore.js file (lives at root)
```javascript
let dumpAndRestore = require('dump-and-restore-db');
dumpAndRestore();
```

