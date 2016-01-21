Number.prototype.toUInt=function(){ return this<0?this+4294967296:this; };
Number.prototype.bytes32=function(){ return [(this>>>24)&0xff,(this>>>16)&0xff,(this>>>8)&0xff,this&0xff]; };
Number.prototype.bytes16sw=function(){ return [this&0xff,(this>>>8)&0xff]; };

Array.prototype.adler32=function(start,len){
	switch(arguments.length){ case 0:start=0; case 1:len=this.length-start; }
	var a=1,b=0;
	for(var i=0;i<len;i++){
		a = (a+this[start+i])%65521; b = (b+a)%65521;
	}
	return ((b << 16) | a).toUInt();
};

Array.prototype.crc32=function(start,len){
	switch(arguments.length){ case 0:start=0; case 1:len=this.length-start; }
	var table=arguments.callee.crctable;
	if(!table){
		table=[];
		var c;
		for (var n = 0; n < 256; n++) {
			c = n;
			for (var k = 0; k < 8; k++)
				c = c & 1?0xedb88320 ^ (c >>> 1):c >>> 1;
			table[n] = c.toUInt();
		}
		arguments.callee.crctable=table;
	}
	var c = 0xffffffff;
	for (var i = 0; i < len; i++)
		c = table[(c ^ this[start+i]) & 0xff] ^ (c>>>8);

	return (c^0xffffffff).toUInt();
};
