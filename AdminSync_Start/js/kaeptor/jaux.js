/* 
 * Auxiliary functions for jQuery/Javascript
 */
//Aux function
//Method to include js files dynamicaly
var include     = function( fullPath ){
    if( fullPath.indexOf(".") !== -1 ){
        
        var arrAux = fullPath.split(".");
        var scriptType = arrAux[ arrAux.length - 1 ];
        
        if( scriptType === "js" ){
            document.write( "\n<script type='text/javascript' src='"
            + fullPath
            +"' ></script>\n" );
        } else if( scriptType === "css" ){
            document.write( "\n<link rel='stylesheet' href='"
            + fullPath
            +"' />\n" );
        }
        
    }
};
//Extend jQuery
$.extend({
    //toDataUrl workaround (using todataurl.js definitions)
    canvasToDataURL     :function( canvas ){
            var imageData=Array.prototype.slice.call(canvas.getContext("2d").getImageData(0,0,canvas.width,canvas.height).data);
            var w=canvas.width;
            var h=canvas.height;
            var stream=[
                    0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,
                    0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52
            ];
            Array.prototype.push.apply(stream, w.bytes32() );
            Array.prototype.push.apply(stream, h.bytes32() );
            stream.push(0x08,0x06,0x00,0x00,0x00);
            Array.prototype.push.apply(stream, stream.crc32(12,17).bytes32() );
            var len=h*(w*4+1);
            for(var y=0;y<h;y++)
                    imageData.splice(y*(w*4+1),0,0);
            var blocks=Math.ceil(len/32768);
            Array.prototype.push.apply(stream, (len+5*blocks+6).bytes32() );
            var crcStart=stream.length;
            var crcLen=(len+5*blocks+6+4);
            stream.push(0x49,0x44,0x41,0x54,0x78,0x01);
            for(var i=0;i<blocks;i++){
                    var blockLen=Math.min(32768,len-(i*32768));
                    stream.push(i==(blocks-1)?0x01:0x00);
                    Array.prototype.push.apply(stream, blockLen.bytes16sw() );
                    Array.prototype.push.apply(stream, (~blockLen).bytes16sw() );
                    var id=imageData.slice(i*32768,i*32768+blockLen);
                    Array.prototype.push.apply(stream, id );
            }
            Array.prototype.push.apply(stream, imageData.adler32().bytes32() );
            Array.prototype.push.apply(stream, stream.crc32(crcStart, crcLen).bytes32() );

            stream.push(0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44);
            Array.prototype.push.apply(stream, stream.crc32(stream.length-4, 4).bytes32() );
            
            return "data:image/png;base64,"+btoa(stream.map(function(c){return String.fromCharCode(c);}).join(''));
    },
    //Method to create a instance of a class dynamicaly
    newInstance : function( classNameObj ){
        return new classNameObj();
    },
    //Method to return a class name of a object
    classOf    : function( obj ) {
        if( obj && obj.constructor && obj.constructor.toString ) {
            var arr = obj.constructor.toString().match(/function\s*(\w+)/);

            if( arr && arr.length == 2 ) {
                return arr[1];
            }
        }

        return undefined;
    },
    //Method to parse gmt received string date
    gmtToDate   : function( strGMT ){
        if( typeof(strGMT) === "string"
            && strGMT !== ""){
            //Set Date object to return
            var dateParsed = new Date();
            
            if( strGMT.indexOf("Z") !== -1 ){
                //Prepare date received
                var strAux      = strGMT.replace("Z", "");
                var arrayAux    = strAux.split("T");
                var dateArray   = arrayAux[0].split("-");
                var timeArray   = arrayAux[1].split(":");

                //Set date and time
                dateParsed.setUTCFullYear( dateArray[0], dateArray[1]-1, dateArray[2] );
                dateParsed.setUTCHours( timeArray[0], timeArray[1], timeArray[2] );
            } else {
                dateParsed = new Date( strGMT );
            }
            
            return dateParsed;
            
        } else if( Object.prototype.toString.call( strGMT ) === '[object Date]' ){
            
            return strGMT;
            
        } else {
            //console.log("%s : %o", "strGMT", strGMT);
            return new Date();
        }
    }
});

//Fake console.log to overwrite in undefined function case
if( typeof(console) === 'undefined' ){
    console = {log : function(){}};
}
if( typeof(console.log) !== 'function'){
    console.log = function(){};
}

//Control how console.log does
var logger = new LoggerControl();

//logger.disable();


//Delay function execution
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();