require('dotenv').config()
let extend = require('./lib/extend');
let fs = require("fs");
let shell = require('shelljs');
const globby = require('globby');
let path = require('path');
let util = require('./util/util');

let database = process.env.MONGO_URI;
database = database.split('/').pop();

let databaseServer = process.env.MONGO_URI;
databaseServer = databaseServer.split('/')[2];

let mongoPort;
if(process.env.MONGO_PORT){
    let mongoPort = process.env.MONGO_PORT;
}
else{
    mongoPort = '27017';
}
class DumpAndRestoreDB{

    constructor(options){

        this.defaults = {
            safeMode: true,
            deleteDump :false,
            deleteDatabase: false
        };

		this.settings = extend({}, this.defaults, options);
    }

    init(){
        let totalZips = [];
        if(!this.settings.safeMode){
            if(this.settings.deleteDump){
                util.deleteDump();
            }
            if(this.settings.deleteDatabase){
                util.deleteDatabase(databaseServer, database);
            }
        }
        globby(['*.zip']).then(zip => {
            let allZips = Object.keys(zip).map(function(key){
                let eachZip = (zip[key]);
                totalZips.push(eachZip);
            });
            if(totalZips.length > 1){
                let splitArray = [];
                for (let i = 0; i< totalZips.length; i++){
                    splitArray[i] = [];
                }

                for(let [index, date] of totalZips.entries()) {
                    let splitDate = date.split(`${database}.zip`).join('_').split('_').join('');
                    splitArray[index].push(splitDate);
                    splitArray[index].push(date);
                }
                for(let i = 0 ; i < totalZips.length; i ++){
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
                util.unzipDump(latestZip);
            }
            else{
                util.unzipDump(zip);
            }
        }).then(zip => {
            util.restoreDataBase(databaseServer, database, mongoPort);
        });
    }
}

module.exports = DumpAndRestoreDB;
