let shell = require('shelljs');
exports.deleteDump = () => {
    shell.exec('rm -rf dump');
    console.log('Deleted Dump');
}

exports.deleteDatabase = (databaseServer, database) => {
    shell.exec(`mongo ${databaseServer}/${database} --eval "db.dropDatabase()"`);
    console.log('Deleted Database');
}

/**
 * @param {object} zip 
 */
exports.unzipDump = (zip) => {
    shell.exec(`unzip -o  ${zip}`, () => {
        console.log('unziped');
    });
}

//Restores the database without indexes
exports.restoreDataBase = (databaseServer, database) => {
    shell.exec(`mongorestore --host ${databaseServer} --port 27017 --db ${database} --noIndexRestore dump/${database}`, () => {
        console.log('restored');
    });
}
