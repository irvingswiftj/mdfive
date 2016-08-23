# mdfive

[![Build Status](https://travis-ci.org/irvingswiftj/mdfive.svg?branch=master)](https://travis-ci.org/irvingswiftj/mdfive)

node.js md5 module

##Features

File over 2Gb

```
$ node index.js
Unhandled rejection RangeError: File size is greater than possible Buffer: 0x7fffffff bytes
    at FSReqWrap.readFileAfterStat [as oncomplete] (fs.js:330:11)
```

```
$ node index.js
4ff02042d751f1acfd7c1c18d856ceb6
```

#Usage

```
var MDFive = require('mdfive').MDFive;

var md5 = new MDFive();

md5.fileChecksum('path/to/myfile.txt')
	.then(cksum => {
		console.log(cksum);
	});
```

##Benchmark
N.B. Tested on OSX using md5 installed via homebrew.

Test on 40MB file

|Native node|0.272secs|
|MdFive|0.281secs|
