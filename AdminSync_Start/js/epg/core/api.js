/**
*   EPG API object:
*/
var epg = {
    /**************************************************************************\ 
    | Initialization:
    \**************************************************************************/
    init        : function( token, success ){  
        //init kaeptor persistence layer
        kaeptor.init(
            function(){

                //Pre load
                epg.loadEPG( token, success );

            },
            function(){ //beforeSync action
                //Init epg objects tables
                epg.genre.init();
                epg.subtitles.init();
                epg.titles.init();
                epg.program.init();
                epg.schedule.init();
            }
        );
        
    },
    loadEPG         : function( token, cb_success ){
        
        //Load EPG channel list in the dom
        console.log( "Inserting EPG channels" );
        
        //Get channels list
        kaeptor.channel.list({
            token       : token,
            max         : 100,
            success     : function( channelList ){
                        
                //console.log( "Loaded channels" );
                //Length of array of channels
                var len = channelList.length;

                $.each( channelList, function( index, objChannel ){
                    var classOptions = "";
                    var objSchedule = new EPGSchedule({
                        channel     : objChannel
                    });

                    console.log( "Inserting object: " + objChannel.name );           
                    
                    var argSuccess = {
                        arrIndex        : index,
                        arrLength       : len,
                        cb_success      : cb_success
                    };
                    
                    //Persist object
                    kaeptor.channel.save({
                        object  : objChannel
                    });
                    /*
                    epg.schedule.now({
                        channelId   : objSchedule.channel.id,
                        token       : token,
                        argSuccess  : argSuccess,
                        success     : function( argSuccess2 ){

                            //If it is the last
                            if( argSuccess2.arrIndex + 1 === argSuccess2.arrLength ){
                                //Flush all objects from persistence queue to database
                                kaeptor.db.flush(
                                    function(){//Persisted all objects
                                        //Hide loading
                                        $.mobile.hidePageLoadingMsg();
                                        argSuccess2.cb_success();
                                    }
                                );
                            }

                        },
                        error       : function( error ){
                            console.log( "Schedule Error: "+error );
                        }
                    });*/
                });
                
                //Flush all objects from persistence queue to database
                kaeptor.db.flush(
                    function(){//Persisted all objects in db
                        //Hide loading
                        //$.mobile.hidePageLoadingMsg();
                        cb_success();
                    }
                );

            },
            error       : function( error ){
                console.log( "ChannelList Error: " + error);
            }
        });
    }
    
};

/**
*   Includes API default components:
*/
//$.include( 'js/epg/core/storage.js' );           //Storage component

/**
*   Includes API controller components:
*/
include( 'js/epg/core/ctrl/schedule.js' );    //Schedule controller
include( 'js/epg/core/ctrl/subtitles.js' );   //Subtitles controller
include( 'js/epg/core/ctrl/titles.js' );      //Titles controller
include( 'js/epg/core/ctrl/genre.js' );       //Genre controller
include( 'js/epg/core/ctrl/program.js' );     //Program controller
