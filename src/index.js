/**
 * Created by james on 07/09/15.
 *
 * @class Checksum
 */

'use strict';

import Promise from 'bluebird';
import _ from 'lodash';
import filter from 'async/filter';
import eachOf from 'async/eachOf';
import child_process from 'child_process';
import checkCommand from 'command-exists';
import * as Md5Adapters from './adapters/index';

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

    getMd5Adapter () {
        var self = this,
            result = null;

        return new Promise ( (resolve, reject) => {

            eachOf(Md5Adapters, (adapter, key, cb) => {

                self.commandExists(adapter.CMD)
                    .then(exists => {
                        if (exists === true && result === null) {
                            result = adapter;
                        }

                        cb();
                    })
                    .catch(cb);

                
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(new result());
            });

        });
    }

    fileChecksum(filePath) {
        var self = this;

        return new Promise( (resolve, reject) => {
            self.getMd5Adapter()
                .then(adapter => {
                    var cmd = adapter.formatCmd(filePath);
                    
                    child_process.exec(cmd, (err, stdout ,stderr) => {
                        if (err) {
                            return reject(err);
                        }
                        
                        return resolve(adapter.formatResult(stdout));
                    });
                });
        });
        
    }

}