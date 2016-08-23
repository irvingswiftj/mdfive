'use strict';

export default class AbstractAdapter {

	constructor() {
    	if (this.formatCmd === undefined) {
      		// or maybe test typeof this.method === "function"
      		throw new TypeError("Must override method formatCmd");
    	}
  	}

  	/**
     * Method to format the reuslt outputted form the command so that it is just an md5 string
     *
     * @param {String} filePath 
     *
     * @return {String}
     */
  	formatCmdForFile (filePath) {
  		throw Error('formatCmdForFile has not been declared for this adapter');
    }

    /**
     * Method to format the reuslt outputted form the command so that it is just an md5 string
     *
     * @param {String} string 
     *
     * @return {String}
     */
    formatCmdForString (string) {
  		throw Error('formatCmdForString has not been declared for this adapter');
    }

    /**
     * Method to format the reuslt outputted form the command so that it is just an md5 string
     *
     * @param {String} string 
     *
     * @return {String}
     */
    formatResult (string) {
        return string;
    }
}