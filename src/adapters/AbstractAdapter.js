export default class AbstractAdapter {
  constructor() {
    if (this.formatCmd === undefined) {
      // or maybe test typeof this.method === "function"
      throw new TypeError('Must override method formatCmd');
    }
  }

  /**
   * Method to format the reuslt outputted form the command so that it is just an md5 string
   *
   * @return {String}
   */
  static formatCmdForFile() {
    throw Error('formatCmdForFile has not been declared for this adapter');
  }

  /**
   * Method to format the result outputted form the command so that it is just an md5 string
   *
   * @return {String}
   */
  static formatCmdForString() {
    throw Error('formatCmdForString has not been declared for this adapter');
  }

  /**
   * Method to format the reuslt outputted form the command so that it is just an md5 string
   *
   * @param {String} string
   *
   * @return {String}
   */
  static formatResult(string) {
    return string;
  }
}
