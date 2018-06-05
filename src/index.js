/**
 * Created by james on 07/09/15.
 *
 * @class Checksum
 */

import Promise from 'bluebird';
import eachOf from 'async/eachOf';
import { exec } from 'child_process';
import checkCommand from 'command-exists';
import * as Md5Adapters from './adapters/index';

function commandExists(cmdString) {
  return new Promise((resolve, reject) => {
    checkCommand(cmdString, (err, cmdExists) => {
      if (err) {
        return reject(err);
      }
      return resolve(cmdExists);
    });
  });
}

export default class {}

export class MDFive {
  constructor() {
    this.commandExists = commandExists;
  }

  getMd5Adapter() {
    let Result = null;

    return new Promise((resolve, reject) => {
      eachOf(Md5Adapters, (Adapter, key, cb) => {
        const a = new Adapter();
        this.commandExists(a.getCmd())
          .then((exists) => {
            if (exists === true && Result === null) {
              Result = Adapter;
            }

            cb();
          })
          .catch(cb);
      }, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(Result);
      });
    });
  }

  fileChecksum(filePath) {
    return new Promise((resolve, reject) => {
      this.getMd5Adapter()
        .then((Adapter) => {
          const adapter = new Adapter();
          const cmd = adapter.formatCmd(filePath);

          exec(cmd, (err, stdout) => {
            if (err) {
              return reject(err);
            }

            return resolve(Adapter.formatResult(stdout));
          });
        });
    });
  }
}
