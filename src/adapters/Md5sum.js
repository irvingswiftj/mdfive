import AbstractAdapter from './AbstractAdapter';

export default class Md5sum extends AbstractAdapter {
  constructor() {
    super();

    this.cmd = 'md5sum';
  }

  getCmd() {
    return this.cmd;
  }

  formatCmd(filePath) {
    return `${this.getCmd()} ${filePath}`;
  }

  static formatResult(string) {
    // example: aaec4956a2be31743c91a0d80ce3ef7b  myFile.txt
    return string.split(' ')[0];
  }
}
