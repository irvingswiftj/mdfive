import AbstractAdapter from './AbstractAdapter';

export default class Md5 extends AbstractAdapter {
  constructor() {
    super();

    this.cmd = 'md5';
  }

  getCmd() {
    return this.cmd;
  }

  formatCmd(filePath) {
    return `${this.getCmd()} -q ${filePath}`;
  }
}
