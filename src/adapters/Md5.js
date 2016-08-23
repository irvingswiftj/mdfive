'use strict';

import AbstractAdapter from './AbstractAdapter';

const CMD = 'md5';

export default class Md5 extends AbstractAdapter {

	static get CMD () {
		return CMD;
	}

	formatCmd (filePath) {
        return CMD + ' -q ' + filePath;
    }
    	
}