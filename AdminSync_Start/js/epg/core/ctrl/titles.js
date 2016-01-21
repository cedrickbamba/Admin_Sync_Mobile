/**
 * EPG API Controller Titles Component
 * 
 */

epg.titles = {
    //Persistence class
    persistent          : "Must be initiated!",
    //DAO init table
    init                : function(){
        //Table definition
        this.persistent = kaeptor.db.define(
            'Titles',                 //Name
            {                         //Columns
                titles_id       : "TEXT",
                pt              : "TEXT",
                en              : "TEXT"
            }
        );
        //Primary Key
        this.persistent.index(  
            ['titles_id'], 
            {
                unique:true
            } 
        );
        
    },
    //tranfer to persistentObject from a model
    toPO            : function( object ){
        //Transfer kaeptor to psj
        var objPSJTitles = new this.persistent(
            {
                id         : object.id,     //Must be a string
                titles_id  : object.id,
                pt         : object.pt,
                en         : object.en
            }
        );
        
        return objPSJTitles;        
    },
    //return a epg object from a persistent one
    fromPO          : function( object ){
        
        var objTitles = new EPGTitles();
        
        if( object !== null ){
            //Set attributes
            objTitles.id         = object.titles_id;
            objTitles.pt         = object.pt;
            objTitles.en         = object.en;
        }
        
        return objTitles;        
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
        if( $.classOf(object) === 'EPGTitles' ){

            //Add the object and related objects in persitence list
            kaeptor.db.add( this.toPO( object ) );
            
            //Callback
            success();
            
        } else {
            //Error
            error( err={message:"Object not a EPGTitle!"} );
            
        }                
        
    }
};
