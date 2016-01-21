/**
 * EPG API Controller Genre Component
 * 
 */

epg.genre = {
    //Persistence class
    persistent          : "Must be initiated!",
    //DAO init table
    init                : function(){
        //Table definition
        this.persistent = kaeptor.db.define(
            'Genre',                  //Name
            {                         //Columns
                genre_id    : "TEXT",
                name        : "TEXT"
            }
        );
        //Primary Key
        this.persistent.index(  
            ['genre_id'], 
            {
                unique:true
            } 
        );
        
    },
    //tranfer to persistentObject from a model
    toPO            : function( object ){
        //Transfer kaeptor to psj
        var objPSJGenre = new this.persistent(
            {
                id          : object.id,     //Must be a string
                genre_id    : object.id,
                name        : object.name
            }
        );
        
        return objPSJGenre;        
    },
    //return a epg object from a persistent one
    fromPO          : function( object ){
        
        var objGenre = new EPGGenre();
         if( object !== null ){
            //Set attributes
            objGenre.id           = object.genre_id;
            objGenre.name         = object.name;
         }
        
        return objGenre;        
    },
    //DAO create passed object in db
    save            : function( args ){
        var object    = {};     //Object to save
        
        var success   = function(){};
        var error     = function(){};
        
        //Arguments
        if( args ){
            if( args.object ){
                //Arguments setted
                if( args.object    != ""
                    && args.object != null  ){
                    //Set attr
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
        
        //Check if object is correctly setted
        if( $.classOf(object) === 'EPGGenre' ){

            //Add the object and related objects in persitence list
            kaeptor.db.add( this.toPO( object ) );
            
            //Callback
            success();
            
        } else {
            //Error
            error( err={message:"Object not a EPGGenre!"} );
            
        }                
        
    }
};
