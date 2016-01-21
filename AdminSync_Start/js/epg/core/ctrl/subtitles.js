/**
 * EPG API Controller Subtitles Component
 * 
 */

epg.subtitles = {
    //Persistence class
    persistent          : "Must be initiated!",
    //DAO init table
    init                : function(){
        //Table definition
        this.persistent = kaeptor.db.define(
            'Subtitles',              //Name
            {                         //Columns
                subtitles_id    : "TEXT",
                pt              : "TEXT",
                en              : "TEXT"
            }
        );
        //Primary Key
        this.persistent.index(  
            ['subtitles_id'], 
            {
                unique:true
            } 
        );
        
    },
    //tranfer to persistentObject from a model
    toPO            : function( object ){
        //Transfer kaeptor to psj
        var objPSJSubtitles = new this.persistent(
            {
                id             : object.id,     //Must be a string
                subtitles_id   : object.id,
                pt             : object.pt,
                en             : object.en
            }
        );
        
        return objPSJSubtitles;        
    },
    //return a epg object from a persistent one
    fromPO          : function( object ){
        
        var objSubtitles = new EPGSubtitles();

        if( object !== null ){
            //Set attributes
            objSubtitles.id         = object.subtitles_id;
            objSubtitles.pt         = object.pt;
            objSubtitles.en         = object.en;
        }
        
        return objSubtitles;        
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
        if( $.classOf(object) === 'EPGSubtitles' ){

            //Add the object and related objects in persitence list
            kaeptor.db.add( this.toPO( object ) );
            
            //Callback
            success();
            
        } else {
            //Error
            error( err={message:"Object not a EPGSubtitles!"} );
            
        }                
        
    }
};
