/**
 * EPG API Controller Schedule Component
 * 
 */

epg.schedule = {
    //Persistence class
    persistent          : "Must be initiated!",
    //DAO init table
    init                : function(){/**nop
        //Table definition
        this.persistent = kaeptor.db.define(
            'Schedule',               //Name
            {                         //Columns
                schedule_id : "TEXT",
                begin       : "DATE",
                end         : "DATE",
                synopsis    : "TEXT",
                episode     : "TEXT"
            }
        );
        //Primary Key
        this.persistent.index( 
            'schedule_id', 
            {
                unique:true
            } 
        );
        //1-1
        this.persistent.hasOne( 
            'channel', 
            kaeptor.channel.persistent
        );
        this.persistent.hasOne( 
            'program', 
            epg.program.persistent
        );
        this.persistent.hasOne( 
            'subtitles', 
            epg.subtitles.persistent
        );
        */
    },
    //tranfer to persistentObject from a model
    toPO            : function( object ){
        //Transfer kaeptor to psj
        var objPSJSchedule = new this.persistent(
            {
                id          : object.id,     //Must be a string
                schedule_id : object.id,
                begin       : object.begin,
                end         : object.end,
                synopsis    : object.synopsis,
                episode     : object.episode,
                channel     : kaeptor.channel.toPO( object.channel ),
                program     : epg.program.toPO( object.program ),
                subtitles   : epg.subtitles.toPO( object.subtitles )
            }
        );
        
        return objPSJSchedule;        
    },
    //return a epg object from a persistent one
    fromPO          : function( object, cb_success ){
        
        var objSchedule = new EPGSchedule();
        if( object !== null ){
            //Fetch Channel
            object.fetch("channel", function(){
                //Fetch Subtitles
                object.fetch("subtitles", function(){ 
                    //Fetch Subtitles
                    object.fetch("program", function(){ 
                        //Set attributes
                        objSchedule.id          = object.schedule_id;
                        objSchedule.begin       = object.begin;
                        objSchedule.end         = object.end;
                        objSchedule.episode     = object.episode;
                        objSchedule.synopsis    = object.synopsis;
                        objSchedule.channel     = kaeptor.channel.fromPO( object.channel );
                        objSchedule.subtitles   = epg.subtitles.fromPO( object.subtitles );
                        
                        epg.program.fromPO( object.program, function( objProgramSetted ){
                        
                            objSchedule.program = objProgramSetted;
                            
                            cb_success( objSchedule );

                            return objSchedule;
                        
                        });
                        
                    });
                });
            });
            
        } else {
            
            cb_success( objSchedule );
            
            return objSchedule; 
            
        }
        
    },
    //DAO create passed object in db
    save            : function( args ){
        var object      = {};     //Object to save
        var argSuccess = {};
        var success     = function(){};
        var error       = function(){};
        
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
            if( args.argSuccess ){
                //Arguments setted
                if( args.argSuccess    != ""
                    && args.argSuccess != null  ){
                    //Set attr
                    argSuccess = args.argSuccess;
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
        if( $.classOf(object) === 'EPGSchedule' ){
            /*
            //Add the object and related objects in persitence list
            kaeptor.db.add( this.toPO( object ) );
            //Callback*/
            success( argSuccess );
            
        } else {
            //Error
            error( err={message:"Object not a EPGSchedule!"} );
            
        }                
        
    },
    //DAO retrieve current schedule to given channel id from db
    retrieveNowByChannelId         : function( args ){
        
        var channelId = "-1";
        var success   = function(){};
        var error     = function(){};
        
        //Arguments
        if( args ){
            if( args.channelId ){
                //Arguments setted
                if( args.channelId    != ""
                    && args.channelId != null  ){
                    //Set attribute
                    channelId = args.channelId;
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
        
        //console.log("Trying to retrieve from db");
        //if channel is setted
        if( channelId !== "-1" ){
            //Select current schedule info
            var now = new Date();
            this.persistent
                .all()
                    .filter("channel", "=", channelId)
                    .and(new persistence.PropertyFilter("begin", "<=", now))
                    .and(new persistence.PropertyFilter("end", ">=", now))
                        .prefetch("channel")    //Syncronos load Channel relationship
                        .prefetch("subtitles")  //Syncronos load Subtitles relationship
                        .prefetch("program")    //Syncronos load Program relationship
                        .one(                   //Get first element or null
                            function( obj ){
                                if( obj !== null ){
                                    //Return current schedule filtered                                    
                                    epg.schedule.fromPO( obj, function( objScheduleSetted ){
                                        
                                       ////console.log("Retrieved now schedule "+objScheduleSetted.id);
                                       success( objScheduleSetted ); 
                                        
                                    });
                                    
                                } else {
                                    error( err={message:"EPGSchedule: No object returned!"} );
                                    
                                }                          
                            }
                        );
                
        } else {
            error( err={message:"EPGSchedule: Channel id is not correctly setted!"} );
        }
        
    },
    //DAO retrieve current schedule to given channel id from db
    retrieveByChannelId         : function( args ){
        
        var channelId = "-1";
        var max       = 1;
        var success   = function(){};
        var error     = function(){};
        
        //Arguments
        if( args ){
            if( args.channelId ){
                //Arguments setted
                if( args.channelId    != ""
                    && args.channelId != null  ){
                    //Set attribute
                    channelId = args.channelId;
                }
            }
            if( args.max ){
                //Arguments setted
                if( args.max    != ""
                    && args.max != null  ){
                    //Set attribute
                    max = args.max;
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
        
        var scheduleList = new Array();
        
        //console.log("Trying to retrieve from db");
        //if channel is setted
        if( channelId !== "-1" ){
            //Select current schedule info
            //var now = new Date();
            this.persistent
                .all()
                    .filter("channel", "=", channelId)
                    .limit( max )
                        .prefetch("channel")    //Syncronos load Channel relationship
                        .prefetch("subtitles")  //Syncronos load Subtitles relationship
                        .prefetch("program")    //Syncronos load Program relationship
                        .list(                   //Get first element or null
                            function( arrObjects ){
                                if( arrObjects !== null ){
                                    
                                    var len = parseInt( arrObjects.length, 10 );
                                    
                                    $.each( 
                                        arrObjects,
                                        function( index, objSetted ){
                                            
                                            var indexArray = parseInt( index, 10 );
                                            
                                            //Return current schedule filtered                                    
                                            epg.schedule.fromPO( objSetted, function( objScheduleSetted ){
                                                
                                                scheduleList.push( objScheduleSetted );
                                                
                                                if( indexArray + 1 === len ){
                                                    if( max === 1 ){
                                                        success( objScheduleSetted );
                                                    } else {
                                                        success( scheduleList );
                                                    }
                                                }                                                 

                                            });
                                            
                                        }
                                    );
                                    
                                    
                                } else {
                                    error( err={message:"EPGSchedule: No object returned!"} );
                                    
                                }                          
                            }
                        );
                
        } else {
            error( err={message:"EPGSchedule: Channel id is not correctly setted!"} );
        }
        
    },
    isUpdated       : function( channel ){
        //Updated check vars
        var current          = new Date();
        var stringExpiration = kaeptor.ls.select( kaeptor.config.SCHEDULE_EXPIRATION + "_" + channel );
        
        if( stringExpiration != null
            && stringExpiration != "" ){
            //Set expiration
            var dateExpiration = new Date( stringExpiration );
            
            //date compare with current date
            if( current < dateExpiration ){
                return true;
            }
        }
        
        return false;
    },
    //Get the current shedule (now === list 1) to given channel, call callback functions, auto set
    now         : function( args ){
        //Local vars
        var token       = "";
        var argSuccess  = {};
        var channelId   = "-1";
        var max         = 1;          //Get one
        var callSuccess = function(){};
        var callError   = function(){};
        
        //Aux
        var myself      = this;
                
        //Arguments
        if( args ){
            if( args.success ){
                //Arguments setted
                if( args.success    != ""
                    && args.success != null  ){
                    //Set callbacks
                    callSuccess = args.success;
                }
            }
            if( args.error ){
                //Arguments setted
                if( args.error    != ""
                    && args.error != null  ){
                    //Set callbacks
                    callError = args.error;
                }
            }
            if( args.token ){
                //Argument setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set token
                    token = args.token;
                }
            }
            if( args.channelId ){
                //Argument setted
                if( args.channelId    != ""
                    && args.channelId != null  ){
                    //Set channelId
                    channelId = args.channelId;
                }
            }
            if( args.argSuccess ){
                //Argument setted
                if( args.argSuccess    != ""
                    && args.argSuccess != null  ){
                    //Set token
                    argSuccess = args.argSuccess;
                }
            }
        }
        
        //if channel is setted
        if( channelId !== "-1" ){
            /*
            //If the data is updated
            if( this.isUpdated( channelId ) ){
                ////console.log( channelId + ": requested in " + (new Date()).getTime());
                //Retrieve current schedule by channel id and get out
                
                this.retrieveNowByChannelId({
                    channelId   : channelId,
                    success     : function( objScheduleSetted ){
                        //////console.log( channelId + ": retrieved in " + (new Date()).getTime());

                        argSuccess.schedule = objScheduleSetted;

                        //console.log( objScheduleSetted.id + ": EPGSchedule.now... done!" );
                        //Call success and get out
                        callSuccess( argSuccess );

                    },
                    error       : function( err ){
                        //console.log( "Schedule Now Failed:" );
                        //console.log( err.message );
                    }
                });
                
                return;

            }
            */
            //Try
            if( token    != null 
                && token != "" 
                && channelId != null 
                && channelId != "" ){
                
                //console.log("Not updated "+channelId);
                
                //Start transaction AJAX
                $.ajax({
                    type:     kaeptor.config.REST_TYPE,
                    url:      kaeptor.config.SERVER + 'epg/list',
                    data:     'token=' + token + '&channel=' + channelId + '&max=' + max,
                    dataType: kaeptor.config.REST_DATA,
                    success:  function( data ){
                        if( typeof(data.result) != 'undefined' ){
                            //Max date contained in result will be setted as expiration date of the update
                            var dateMax = "";
                            
                            var len = data.result.length;

                            //Iterate over result array of objects
                            $.each(data.result, function( index, value ){ //up to max === all

                                //var dateBegin       = $.gmtToDate( value.begin_time );
                                //var dateEnd         = $.gmtToDate( value.end_time );
                                //var strChannelId    = value.channel_id;

                                //If max date not setted or < than current dateEnd
                                //if( dateMax === ""
                                //    || dateMax < dateEnd ){
                                    //Set it
                                //    dateMax = dateEnd;
                                //}

                                //var current = new Date();

                                //Channel
                                var objChannel  = new KaeptorChannel();
                                objChannel.id   = value.channel_id;
                                objChannel.name = value.channel_name;

                                //Genres
                                var arrayGenres = new Array();
                                $.each( 
                                    value.genres, 
                                    function( index, objGenre ){
                                        arrayGenres.push(
                                            new EPGGenre({
                                                id      : objGenre.genre_id,
                                                name    : objGenre.genre_name
                                            })
                                        );
                                    }
                                );

                                //Set id based in schedule
                                var objTitles = new EPGTitles({id : "TTL_" + value.schedule_id});
                                //Titles
                                $.each( 
                                    value.titles, 
                                    function( titleKey, titleVal ){
                                        objTitles[ titleKey ] = titleVal;
                                    }
                                );
                                    
                                //Set id based in schedule
                                var objSubtitles = new EPGSubtitles({id : "SUB_" + value.schedule_id});
                                //Subtitles
                                $.each( 
                                    value.sub_titles, 
                                    function( subtitleKey, subtitleVal ){
                                        objSubtitles[ subtitleKey ] = subtitleVal;
                                    }
                                );

                                //Program
                                var objProgram  = new EPGProgram({
                                    id          : value.program_id,
                                    genres      : arrayGenres,
                                    titles      : objTitles
                                });

                                //New Schedule
                                var objSchedule = new EPGSchedule({
                                    id          : value.schedule_id,
                                    begin       : value.begin_time,
                                    end         : value.end_time,
                                    channel     : objChannel,
                                    program     : objProgram,
                                    subtitles   : objSubtitles,
                                    synopsis    : value.synopsis,
                                    episode     : value.episode
                                });
                                
                                //If schedule begin <= now and end >= now then set argument
                                //if( dateBegin <= current
                                //    && dateEnd   >= current ){
                                    ////console.log( "Setted this: " + value.schedule_id );
                                    
                                    argSuccess.schedule = objSchedule;
                                    
                                //}
                                
                                
                                //console.log( objChannel.id + ": retrieved in " + (new Date()).getTime());
                                /**nop
                                //Save it
                                epg.schedule.save({
                                    object      : objSchedule,
                                    argSuccess  : argSuccess,
                                    success     : function( argSuccess ){
                                        //console.log( objChannel.id + ": saved in " + (new Date()).getTime());
                                        //If it is the last element saved
                                        if( index + 1 === len ){
                                            //Set expiration date for 
                                            kaeptor.ls.save( kaeptor.config.SCHEDULE_EXPIRATION + "_" + objChannel.id, dateMax.toString() );
                                            
                                            //Flush all schedules from persistence queue to db
                                            kaeptor.db.flush(
                                                function(){//Persisted all objects in db
                                      */              
                                                    //Callback
                                                    callSuccess( argSuccess );
                                        /*            
                                                }
                                            );
                                            
                                        }                                        
                                        
                                    },
                                    error       : function( err ){
                                        //console.log( "Not saved: " + objSchedule.id + " Error: " + err.message );
                                    }
                                });*/

                            });


                        } else if( typeof(data.error) != 'undefined' ){
                            //Callback
                            callError( data.error );

                        }                    
                    },
                    error:    function( XMLHttpRequest ){
                        //Callback
                        callError( XMLHttpRequest.status );

                    }
                });
                /*
                //DEBUG
                var data = {result:[]};
                for( var c=0; c<50; c++ ){
                    //voFake
                    voSchedule = {};
                    
                    //Dates
                    var dtBegin = new Date();
                    var dtEnd   = new Date();

                    //Set attributes
                    voSchedule.schedule_id  = c+"_"+channelId;
                    voSchedule.begin_time   = dtBegin.setMinutes( dtBegin.getMinutes() + c );
                    voSchedule.end_time     = dtEnd.setMinutes( dtEnd.getMinutes() + c + 5 );
                    voSchedule.synopsis     = "ScheduleSynopsis"+c+"_"+channelId;
                    voSchedule.episode      = "ScheduleEpisode"+c+"_"+channelId;
                    voSchedule.channel_id   = channelId;
                    voSchedule.channel_name = "Name_"+channelId;
                    voSchedule.program_id   = c+"_"+channelId;
                    voSchedule.genres       = [{"genre_id":"Genre"+c, "genre_name":"Genre"+c}, {"genre_id":"Genre"+(c+1), "genre_name":"Genre"+(c+1)}, {"genre_id":"Genre"+(c+2), "genre_name":"Genre"+(c+2)}];
                    voSchedule.titles       = {"pt":"Subtitles"+c+"_"+channelId};
                    voSchedule.sub_titles    = {"pt":"Subtitles"+c+"_"+channelId};
                    
                    data.result.push( voSchedule );
                }
                
                if( typeof(data.result) != 'undefined' ){
                    //Max date contained in result will be setted as expiration date of the update
                    var dateMax = "";

                    var len = data.result.length;

                    //Iterate over result array of objects
                    $.each(data.result, function( index, value ){ //up to max === all

                        var dateBegin       = value.begin_time;
                        var dateEnd         = value.end_time;
                        var strChannelId    = value.channel_id;

                        //If max date not setted or < than current dateEnd
                        if( dateMax === ""
                            || dateMax < dateEnd ){
                            //Set it
                            dateMax = dateEnd;
                        }

                        var current = new Date();

                        //Channel
                        var objChannel  = new KaeptorChannel();
                        objChannel.id   = value.channel_id;
                        objChannel.name = value.channel_name;

                        //Genres
                        var arrayGenres = new Array();
                        $.each( 
                            value.genres, 
                            function( index, objGenre ){
                                arrayGenres.push(
                                    new EPGGenre({
                                        id      : objGenre.genre_id,
                                        name    : objGenre.genre_name
                                    })
                                );
                            }
                        );

                        //Set id based in schedule
                        var objTitles = new EPGTitles({id : "TTL_" + value.schedule_id});
                        //Titles
                        $.each( 
                            value.titles, 
                            function( titleKey, titleVal ){
                                objTitles[ titleKey ] = titleVal;
                            }
                        );

                        //Set id based in schedule
                        var objSubtitles = new EPGSubtitles({id : "SUB_" + value.schedule_id});
                        //Subtitles
                        $.each( 
                            value.sub_titles, 
                            function( subtitleKey, subtitleVal ){
                                objSubtitles[ subtitleKey ] = subtitleVal;
                            }
                        );

                        //Program
                        var objProgram  = new EPGProgram({
                            id          : value.program_id,
                            genres      : arrayGenres,
                            titles      : objTitles
                        });

                        //New Schedule
                        var objSchedule = new EPGSchedule({
                            id          : value.schedule_id,
                            begin       : value.begin_time,
                            end         : value.end_time,
                            channel     : objChannel,
                            program     : objProgram,
                            subtitles   : objSubtitles,
                            synopsis    : value.synopsis,
                            episode     : value.episode
                        });

                        //If schedule begin <= now and end >= now then set argument
                        if( dateBegin <= current
                            && dateEnd   >= current ){
                            ////console.log( "Setted this: " + value.schedule_id );

                            argSuccess.schedule = objSchedule;

                        }


                        ////console.log( objChannel.id + ": retrieved in " + (new Date()).getTime());
                        ////console.log( objSchedule );

                        //Save it
                        epg.schedule.save({
                            object      : objSchedule,
                            success     : function(){
                                ////console.log( objChannel.id + ": saved in " + (new Date()).getTime());
                                //If it is the last element saved
                                if( index + 1 === len ){
                                    //Set expiration date for 
                                    kaeptor.ls.save( kaeptor.config.SCHEDULE_EXPIRATION + "_" + objChannel.id, dateMax.toString() );

                                    //Callback
                                    callSuccess( argSuccess );

                                }                                        

                            },
                            error       : function( err ){
                                //console.log( "Not saved: " + objSchedule.id + " Error: " + err.message );
                            }
                        });

                    });


                }*/
                        
                
            } else {
                //Callback
                callError( 'WrongData - EPGSchedule.now' );
            }
            
        }
        
    },
    
    //Get the current shedule (now === list 1) to given channel, call callback functions, auto set
    list         : function( args ){
        //Local vars
        var token       = "";
        var channelId   = "-1";
        var max         = 1;         
        var callSuccess = function(){};
        var callError   = function(){};
        
        //Aux
        var myself      = this;
                
        //Arguments
        if( args ){
            if( args.success ){
                //Arguments setted
                if( args.success    != ""
                    && args.success != null  ){
                    //Set callbacks
                    callSuccess = args.success;
                }
            }
            if( args.error ){
                //Arguments setted
                if( args.error    != ""
                    && args.error != null  ){
                    //Set callbacks
                    callError = args.error;
                }
            }
            if( args.token ){
                //Argument setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set token
                    token = args.token;
                }
            }
            if( args.channelId ){
                //Argument setted
                if( args.channelId    != ""
                    && args.channelId != null  ){
                    //Set channelId
                    channelId = args.channelId;
                }
            }
            if( args.max ){
                //Argument setted
                if( args.max    != ""
                    && args.max != null  ){
                    //Set channelId
                    max = args.max;
                }
            }
        }
        
        var scheduleList = new Array();
        
        //if channel is setted
        if( channelId !== "-1" ){
            
            //If the data is updated
            if( this.isUpdated( channelId ) ){
                ////console.log( channelId + ": requested in " + (new Date()).getTime());
                //Retrieve current schedule by channel id and get out
                
                this.retrieveByChannelId({
                    max         : 15,
                    channelId   : channelId,
                    success     : function( objScheduleSettedList ){
                        //////console.log( channelId + ": retrieved in " + (new Date()).getTime());

                        //argSuccess.schedule = objScheduleSetted;

                        //console.log( objScheduleSetted.id + ": EPGSchedule.now... done!" );
                        //Call success and get out
                        callSuccess( objScheduleSettedList );

                    },
                    error       : function( err ){
                        //console.log( "Schedule Now Failed:" );
                        //console.log( err.message );
                    }
                });
                
                return;

            }

            //Try
            if( token    != null 
                && token != "" 
                && channelId != null 
                && channelId != "" ){
                
                //console.log("Not updated "+channelId);
                
                //Start transaction AJAX
                $.ajax({
                    type:     kaeptor.config.REST_TYPE,
                    url:      kaeptor.config.SERVER + 'epg/list',
                    data:     'token=' + token + '&channel=' + channelId + '&max=' + max,
                    dataType: kaeptor.config.REST_DATA,
                    success:  function( data ){
                        if( typeof(data.result) != 'undefined' ){
                            //Max date contained in result will be setted as expiration date of the update
                            var dateMax = "";
                            
                            var len = data.result.length;

                            //Iterate over result array of objects
                            $.each(data.result, function( index, value ){ //up to max === all

                                var dateBegin       = $.gmtToDate( value.begin_time );
                                var dateEnd         = $.gmtToDate( value.end_time );
                                var strChannelId    = value.channel_id;

                                //If max date not setted or < than current dateEnd
                                if( dateMax === ""
                                    || dateMax < dateEnd ){
                                    //Set it
                                    dateMax = dateEnd;
                                }

                                var current = new Date();

                                //Channel
                                var objChannel  = new KaeptorChannel();
                                objChannel.id   = value.channel_id;
                                objChannel.name = value.channel_name;

                                //Genres
                                var arrayGenres = new Array();
                                $.each( 
                                    value.genres, 
                                    function( index, objGenre ){
                                        arrayGenres.push(
                                            new EPGGenre({
                                                id      : objGenre.genre_id,
                                                name    : objGenre.genre_name
                                            })
                                        );
                                    }
                                );

                                //Set id based in schedule
                                var objTitles = new EPGTitles({id : "TTL_" + value.schedule_id});
                                //Titles
                                $.each( 
                                    value.titles, 
                                    function( titleKey, titleVal ){
                                        objTitles[ titleKey ] = titleVal;
                                    }
                                );
                                    
                                //Set id based in schedule
                                var objSubtitles = new EPGSubtitles({id : "SUB_" + value.schedule_id});
                                //Subtitles
                                $.each( 
                                    value.sub_titles, 
                                    function( subtitleKey, subtitleVal ){
                                        objSubtitles[ subtitleKey ] = subtitleVal;
                                    }
                                );

                                //Program
                                var objProgram  = new EPGProgram({
                                    id          : value.program_id,
                                    genres      : arrayGenres,
                                    titles      : objTitles
                                });

                                //New Schedule
                                var objSchedule = new EPGSchedule({
                                    id          : value.schedule_id,
                                    begin       : value.begin_time,
                                    end         : value.end_time,
                                    channel     : objChannel,
                                    program     : objProgram,
                                    subtitles   : objSubtitles,
                                    synopsis    : value.synopsis,
                                    episode     : value.episode
                                });
                                
                                scheduleList.push( objSchedule );                                
                                
                                //console.log( objChannel.id + ": retrieved in " + (new Date()).getTime());

                                //Save it
                                epg.schedule.save({
                                    object      : objSchedule,
                                    argSuccess  : argSuccess,
                                    success     : function( argSuccess ){
                                        //console.log( objChannel.id + ": saved in " + (new Date()).getTime());
                                        //If it is the last element saved
                                        if( index + 1 === len ){
                                            //Set expiration date for 
                                            kaeptor.ls.save( kaeptor.config.SCHEDULE_EXPIRATION + "_" + objChannel.id, dateMax.toString() );
                                            
                                            //Flush all schedules from persistence queue to db
                                            kaeptor.db.flush(
                                                function(){//Persisted all objects in db
                                                    
                                                    //Callback
                                                    callSuccess( scheduleList );
                                                    
                                                }
                                            );
                                            
                                        }                                        
                                        
                                    },
                                    error       : function( err ){
                                        //console.log( "Not saved: " + objSchedule.id + " Error: " + err.message );
                                    }
                                });

                            });


                        } else if( typeof(data.error) != 'undefined' ){
                            //Callback
                            callError( data.error );

                        }                    
                    },
                    error:    function( XMLHttpRequest ){
                        //Callback
                        callError( XMLHttpRequest.status );

                    }
                });
                /*
                //DEBUG
                var data = {result:[]};
                for( var c=0; c<50; c++ ){
                    //voFake
                    voSchedule = {};
                    
                    //Dates
                    var dtBegin = new Date();
                    var dtEnd   = new Date();

                    //Set attributes
                    voSchedule.schedule_id  = c+"_"+channelId;
                    voSchedule.begin_time   = dtBegin.setMinutes( dtBegin.getMinutes() + c );
                    voSchedule.end_time     = dtEnd.setMinutes( dtEnd.getMinutes() + c + 5 );
                    voSchedule.synopsis     = "ScheduleSynopsis"+c+"_"+channelId;
                    voSchedule.episode      = "ScheduleEpisode"+c+"_"+channelId;
                    voSchedule.channel_id   = channelId;
                    voSchedule.channel_name = "Name_"+channelId;
                    voSchedule.program_id   = c+"_"+channelId;
                    voSchedule.genres       = [{"genre_id":"Genre"+c, "genre_name":"Genre"+c}, {"genre_id":"Genre"+(c+1), "genre_name":"Genre"+(c+1)}, {"genre_id":"Genre"+(c+2), "genre_name":"Genre"+(c+2)}];
                    voSchedule.titles       = {"pt":"Subtitles"+c+"_"+channelId};
                    voSchedule.sub_titles    = {"pt":"Subtitles"+c+"_"+channelId};
                    
                    data.result.push( voSchedule );
                }
                
                if( typeof(data.result) != 'undefined' ){
                    //Max date contained in result will be setted as expiration date of the update
                    var dateMax = "";

                    var len = data.result.length;

                    //Iterate over result array of objects
                    $.each(data.result, function( index, value ){ //up to max === all

                        var dateBegin       = value.begin_time;
                        var dateEnd         = value.end_time;
                        var strChannelId    = value.channel_id;

                        //If max date not setted or < than current dateEnd
                        if( dateMax === ""
                            || dateMax < dateEnd ){
                            //Set it
                            dateMax = dateEnd;
                        }

                        var current = new Date();

                        //Channel
                        var objChannel  = new KaeptorChannel();
                        objChannel.id   = value.channel_id;
                        objChannel.name = value.channel_name;

                        //Genres
                        var arrayGenres = new Array();
                        $.each( 
                            value.genres, 
                            function( index, objGenre ){
                                arrayGenres.push(
                                    new EPGGenre({
                                        id      : objGenre.genre_id,
                                        name    : objGenre.genre_name
                                    })
                                );
                            }
                        );

                        //Set id based in schedule
                        var objTitles = new EPGTitles({id : "TTL_" + value.schedule_id});
                        //Titles
                        $.each( 
                            value.titles, 
                            function( titleKey, titleVal ){
                                objTitles[ titleKey ] = titleVal;
                            }
                        );

                        //Set id based in schedule
                        var objSubtitles = new EPGSubtitles({id : "SUB_" + value.schedule_id});
                        //Subtitles
                        $.each( 
                            value.sub_titles, 
                            function( subtitleKey, subtitleVal ){
                                objSubtitles[ subtitleKey ] = subtitleVal;
                            }
                        );

                        //Program
                        var objProgram  = new EPGProgram({
                            id          : value.program_id,
                            genres      : arrayGenres,
                            titles      : objTitles
                        });

                        //New Schedule
                        var objSchedule = new EPGSchedule({
                            id          : value.schedule_id,
                            begin       : value.begin_time,
                            end         : value.end_time,
                            channel     : objChannel,
                            program     : objProgram,
                            subtitles   : objSubtitles,
                            synopsis    : value.synopsis,
                            episode     : value.episode
                        });

                        //If schedule begin <= now and end >= now then set argument
                        if( dateBegin <= current
                            && dateEnd   >= current ){
                            ////console.log( "Setted this: " + value.schedule_id );

                            argSuccess.schedule = objSchedule;

                        }


                        ////console.log( objChannel.id + ": retrieved in " + (new Date()).getTime());
                        ////console.log( objSchedule );

                        //Save it
                        epg.schedule.save({
                            object      : objSchedule,
                            success     : function(){
                                ////console.log( objChannel.id + ": saved in " + (new Date()).getTime());
                                //If it is the last element saved
                                if( index + 1 === len ){
                                    //Set expiration date for 
                                    kaeptor.ls.save( kaeptor.config.SCHEDULE_EXPIRATION + "_" + objChannel.id, dateMax.toString() );

                                    //Callback
                                    callSuccess( argSuccess );

                                }                                        

                            },
                            error       : function( err ){
                                //console.log( "Not saved: " + objSchedule.id + " Error: " + err.message );
                            }
                        });

                    });


                }*/
                        
                
            } else {
                //Callback
                callError( 'WrongData - EPGSchedule.now' );
            }
            
        }
    }
};
