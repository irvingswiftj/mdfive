/**
 * Created by james on 07/09/15.
 *
 * @class Checksum
 */

'use strict';

import Promise from 'bluebird';
import _ from 'lodash';
import async from 'async';
import child_process from 'child_process';
import checkCommand from 'command-exists';
import * as Md5Adapters from './adapters/index';

console.log(Md5Adapters);

export class MDFive {

    commandExists(cmdString) {
        return new Promise ((resolve, reject) => {
            checkCommand(cmdString, (err, cmdExists) => {
                if (err) {
                    return reject(err);
                }
                return resolve(cmdExists);
            });
        });
    }

    getMd5Command() {
        return new BPromise( (resolve, reject) => {
            async.filter(Object.keys(md5Commands), (cmd, cb) => {
                return commandExists(cmd)
                    .then(result => {
                        return cb(null, result);
                    })
                    .catch(err => {
                        return cb(err);
                    });
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result[0] || null);
            });
        });
        
    }

    getCheckSumForFile(filePath) {

        return new Promise( (resolve, reject) =>{
            getMd5Command()
                .then(result => {
                    var cmd = md5Commands[result].formatCmd();
                    
                    child_process.exec(cmd, (err, stdout ,stderr) => {
                        if (err) {
                            return reject(err);
                        }
                        
                        return resolve(md5Commands[result].formatResult(stdout));
                    });
                });
        });
        
    }

    getCheckSumForString(string) {

        return new Promise( (resolve, reject) =>{
            getMd5Command()
                .then(result => {
                    var cmd = md5Commands[result].formatCmd();
                    
                    child_process.exec(cmd, (err, stdout ,stderr) => {
                        if (err) {
                            return reject(err);
                        }
                        
                        return resolve(md5Commands[result].formatResult(stdout));
                    });
                });
        });

    }
}