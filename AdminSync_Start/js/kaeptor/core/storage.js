/**
 * Kaeptor API Storage Component
 */

//Facade to set a item(object) in local storage
Storage.prototype.save      = function( key, val ){
        
    if( typeof(val) == "object" ) {
        //If a object stringify it in a JSON format
        val = JSON.stringify({value: val});
    }

    return this.setItem( key, val );
};

//Facade to get a item(object) in local storage
Storage.prototype.select    = function( key ){
    var val = this.getItem( key );

    // If starting the string with "{" assumes it is an object that has been stringified
    if( val != null){
        if( val[0] == "{" ){
            val = JSON.parse(val);
            val = val.value;
        }
    }

    return val;
}


//Local Storage object
kaeptor.ls      = window.localStorage;
/**nop
//Persistence layer object
kaeptor.db      = persistence;

//Init persistence layer db
kaeptor.db.store.websql.config(
    kaeptor.db, 
    'kaeptor', 
    'The Kaeptor Mobile App Database', 
    10 * 1024 * 1024
);*/

/*
//WebSQL Database object
kaeptor.db      = window.openDatabase(
    "kaeptor",          //Name
    "1.0",              //Version
    "Kaeptor database", //Description
    10*1024*1024        //Size in bytes
);

var fnOriginal_Transaction = kaeptor.db.transaction;
kaeptor.db.transaction = function( fnProcess, fnErrorCallback, fnSuccessCallback ){
    var process = fnProcess;
    var errorCallback = fnErrorCallback;
    var successCallback = fnSuccessCallback;
    
    setTimeout( function(){
        fnOriginal_Transaction.apply( kaeptor.db, [ process, errorCallback, successCallback ] );
    }, 20 );
    
};

//Facade to set a supported model object in web sql database, return callback
kaeptor.db.save      = function( args ){
    var object    = {};
    var success   = function(){};
    var error     = function(){};

    //Arguments
    if( args ){
        if( args.object ){
            //Arguments setted
            if( args.object    != ""
                && args.object != null  ){
                //Set callbacks
                object = args.object;
            }
        }
        if( args.success ){
            //Arguments setted
            if( args.success    != ""
                && args.success != null  ){
                //Set callbacks
                success = args.success;
            }
        }
        if( args.error ){
            //Arguments setted
            if( args.error    != ""
                && args.error != null  ){
                //Set callbacks
                error = args.error;
            }
        }
    }
    
    var objectClass = $.classOf( object );    
    //Test if is a supported object
    if( objectClass in kaeptor.config.SUPPORTED_CLASSES ){
        
       //Translate string class to api object
       var attrKaeptor = objectClass.replace(/(Kaeptor)/,"");
       attrKaeptor = attrKaeptor[0].toLowerCase() + attrKaeptor.substr(1);
       
       //Delegate action
       kaeptor[ attrKaeptor ].save({
           object       : object,
           success      : success,
           error        : error
       });
        
    } else {
        error( err={message:"Object class not supported!"} );
    }
    
};


//Facade to select from supported model object a unique row( auto set current one = by id ) in web sql database, return callback
kaeptor.db.select     = function( args ){
    var object    = {};
    var success   = function(){};
    var error     = function(){};

    //Arguments
    if( args ){
        if( args.object ){
            //Arguments setted
            if( args.object    != ""
                && args.object != null  ){
                //Set callbacks
                object = args.object;
            }
        }
        if( args.success ){
            //Arguments setted
            if( args.success    != ""
                && args.success != null  ){
                //Set callbacks
                success = args.success;
            }
        }
        if( args.error ){
            //Arguments setted
            if( args.error    != ""
                && args.error != null  ){
                //Set callbacks
                error = args.error;
            }
        }
    }
    
    var objectClass = $.classOf( object );    
    //Test if is a supported object
    if( objectClass in kaeptor.config.SUPPORTED_CLASSES ){
        
       //Translate string class to api object
       var attrKaeptor = objectClass.replace(/(Kaeptor)/,"");
       attrKaeptor = attrKaeptor[0].toLowerCase() + attrKaeptor.substr(1);
       
       //Delegate action to select current obj
       kaeptor[ attrKaeptor ].retrieveById({
           object       : object,
           success      : success,
           error        : error
       });
        
    } else {
        error( err={message:"Object class not supported!"} );
    }

};*/
