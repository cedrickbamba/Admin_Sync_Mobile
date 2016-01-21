/**
 * EPG API Controller Program Component
 * 
 */

epg.program = {
    //Persistence class
    persistent          : "Must be initiated!",
    //DAO init table
    init                : function(){
        //Table definition
        this.persistent = kaeptor.db.define(
            'Program',                //Name
            {                         //Columns
                program_id  : "TEXT"
            }
        );
        //Primary Key
        this.persistent.index(  
            ['program_id'], 
            {
                unique:true
            } 
        );
        //1-1
        this.persistent.hasOne( 
            'titles', 
            epg.titles.persistent
        );
        //M-N{
        epg.genre.persistent.hasMany(
            'programs', 
            this.persistent, 
            'genres'
        );
        this.persistent.hasMany(
            'genres', 
            epg.genre.persistent, 
            'programs'
        );
        //}
        
    },
    //tranfer to persistentObject from a model
    toPO            : function( object ){
        //Transfer kaeptor to psj
        var objPSJProgram = new this.persistent(
            {
                id          : object.id,     //Must be a string
                program_id  : object.id,
                titles      : epg.titles.toPO( object.titles )
            }
        );
        
        for( var c=0; c<object.genres.length; c++ ){
            //Add to program.genres query collection each genre
            objPSJProgram.genres.add( epg.genre.toPO( object.genres[ c ] ) );
        }
        
        return objPSJProgram;        
    },
    //return a epg object from a persistent one
    fromPO          : function( object, cb_success ){
         if( object !== null ){
             
            //Fetch Program.Titles
            object.fetch("titles", function(){

                //Fetch Program.Genres
                object.genres.list(
                    function( arrResultGenre ){
                        
                        var arrGenres = new Array();
                        var objProgram = new EPGProgram();

                        objProgram.id       = object.program_id;
                        objProgram.titles   = epg.titles.fromPO( object.titles );

                        for( var c=0; c<arrResultGenre.length; c++ ){
                            arrGenres.push( epg.genre.fromPO( arrResultGenre[ c ] ) );
                        }
                        objProgram.genres   = arrGenres;
                        
                        cb_success( objProgram );
                        return objProgram;
                    }
                );
            });
            
         } else {
             var objProgram = new EPGProgram();
             cb_success( objProgram );
             
             return objProgram;
         }
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
        if( $.classOf(object) === 'EPGProgram' ){
            
            //Add the object and related objects in persitence list
            kaeptor.db.add( this.toPO( object ) );
            
            //Callback
            success();
                    
            
        } else {
            //Error
            error( err={message:"Object not a EPGProgram"} );
            
        }                
        
    }
};
