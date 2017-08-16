require('dotenv').config()
let extend = require('./lib/extend');
let fs = require("fs");
let shell = require('shelljs');
const globby = require('globby');
let path = require('path');

let database = process.env.MONGO_URI;
database = database.split('/').pop();

let databaseServer = process.env.MONGO_URI;
databaseServer = databaseServer.split('/')[2];

class DumpAndRestoreDB{

    constructor(options){

        this.defaults = {
            safeMode: true,
            deleteDump :true,
            deleteDatabase: true
        };

		this.settings = extend({}, this.defaults, options);
        
    }

    init(){
        let totalZips = [];
        if(!this.settings.safeMode){
            if(!this.settings.deleteDump){
                deleteDump();
            }
            if(!this.settings.deleteDatabase){
            deleteDatabase();
            }
        }
        globby(['*.zip']).then(zip => {
            let allZips = Object.keys(zip).map(function(key){
                let eachZip = (zip[key]);
                totalZips.push(eachZip);
            });
            let splitArray = [];
            for (let i = 0; i< totalZips.length; i++){
                splitArray[i] = [];
            }

            for(let [index, date] of totalZips.entries()) {
                let splitDate = date.split(`${database}.zip`).join('_').split('_').join('');
                splitArray[index].push(splitDate);
                splitArray[index].push(date);
            }
            for(let i = 0 ; i< totalZips.length; i ++){
                splitArray.sort(function(a, b){
                    if (a[i] === b[i]) {
                        return 0;
                    }
                    else {
                        if(a[i] < b[i]){
                            return(b[i][i]);
                        }
                    }
                });
            };
            let latestZip = splitArray[0][1];
            unzipDump(latestZip);
        }).then(zip => {
            restoreDataBase();
        });
    }
}




let testing = () => {
    console.log('testing');
};

let deleteDump = () => {
    shell.exec('rm -rf dump');
    console.log('Deleted Dump');
}

let deleteDatabase =  () => {
    shell.exec(`mongo ${databaseServer}/${database} --eval "db.dropDatabase()"`);
    console.log('Deleted Database');
}

/**
 * @param {object} zip 
 */
let unzipDump = (zip) =>{
    shell.exec(`unzip -o  ${zip}`, () => {
        console.log('unziped');
    });
}

//Restores the database without indexes
let restoreDataBase = () =>{
    shell.exec(`mongorestore --host ${databaseServer} --port 27017 --db ${database} --noIndexRestore dump/${database}`, () => {
        console.log('restored');
    });
}

module.exports = DumpAndRestoreDB;