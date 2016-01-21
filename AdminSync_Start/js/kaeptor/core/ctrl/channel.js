/**
 * Kaeptor API Controller Channel Component
 * 
 */

kaeptor.channel = {
    //Persistence class
    persistent          : "Must be initiated!",
    //DAO init table
    init                : function(){/**nop
        //Table definition
        this.persistent = kaeptor.db.define(
            'Channel',                  //Name
            {                           //Columns
                channel_id  : "TEXT",
                name        : "TEXT",
                icon        : "TEXT",
                topic       : "TEXT",
                number      : "TEXT",
                monitored   : "TEXT"
            }
        );
        //Primary Key
        this.persistent.index( 
            ['channel_id'], 
            {
                unique:true
            } 
        );
        */
    },
    //tranfer to persistentObject from a model
    toPO            : function( object ){
        //Transfer kaeptor to psj
        var objPSJChannel = new this.persistent(
            {
                id          : object.id,
                channel_id  : object.id,
                name        : object.name,
                icon        : object.icon,
                topic       : object.topic,
                number      : object.number,
                monitored   : object.monitored
            }
        );
        
        return objPSJChannel;        
    },
    //return a kaeptor object from a persistent one
    fromPO          : function( object ){
        
        var objChannel = new KaeptorChannel();
         if( object !== null ){
            //Set attributes
            objChannel.id           = object.channel_id;
            objChannel.name         = object.name;
            objChannel.icon         = object.icon;
            objChannel.topic        = object.topic;
            objChannel.number       = object.number;
            objChannel.monitored    = object.monitored;
         }
        
        return objChannel;        
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
        if( $.classOf(object) === 'KaeptorChannel' ){
            /**nop
            //Add the object and related objects in persitence list
            kaeptor.db.add( this.toPO( object ) );
            */
            //Callback
            success();
            
        } else {
            //Error
            error( err={message:"Object not a KaeptorChannel!"} );
            
        }                
        
    },
    //DAO retrieve all objects from db
    retrieveAll         : function( args ){
        var objList   = new Array();    //Returning var
        
        var offset    = false;
        var limit     = false;
        var success   = function(){};
        var error     = function(){};
        
        //Arguments
        if( args ){
            if( args.offset ){
                //Arguments setted
                if( args.offset    != ""
                    && args.offset != null  ){
                    //Set attribute
                    offset = args.offset;
                }
            }
            if( args.limit ){
                //Arguments setted
                if( args.limit    != ""
                    && args.limit != null  ){
                    //Set attribute
                    limit = args.limit;
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
                
        var qcChannels;
        if( offset
            && limit ){
            //Retrieve from db a querycollection
            qcChannels = this.persistent.all().skip( offset ).limit( limit );
            
        } else if( offset ){
            qcChannels = this.persistent.all().skip( offset );
            
        } else if( limit ){
            qcChannels = this.persistent.all().limit( limit );
            
        } else {
            qcChannels = this.persistent.all();
        }
        
        qcChannels.list( 
            function( arrObjects ){
                if( arrObjects !== null
                    && arrObjects.length > 0 ){
                    //Transfer each pjs object to a kaeptor one and push in list
                    for( var c=0; c<arrObjects.length; c++ ){
                        //KaeptorChannel
                        var objChannel = new KaeptorChannel();

                        objChannel.id           = arrObjects[ c ].channel_id;
                        objChannel.name         = arrObjects[ c ].name;
                        objChannel.icon         = arrObjects[ c ].icon;
                        objChannel.topic        = arrObjects[ c ].topic;
                        objChannel.number       = arrObjects[ c ].number;
                        objChannel.monitored    = arrObjects[ c ].monitored;
                        //Add kaeptor object to list
                        objList.push( objChannel );
                    }

                    //Callback
                    success( objList );

                } else {
                    //No objects retrieved
                    error( err={message:"Channell objects list is empty!"} );
                }
            }
        );
        
    },
    isUpdated       : function(){
        //Update check vars
        var current          = new Date();
        var stringExpiration = kaeptor.ls.select( kaeptor.config.CHANNEL_EXPIRATION );
        
        if( stringExpiration != null
            && stringExpiration != "" ){
            
            var dateExpiration = new Date( stringExpiration );
            
            //If there is a last updated date compare it with current date
            ////console.log( "%s : %o", "Updated Channel List", dateUpdated.getDate() );
            if( current < dateExpiration ){
                return true;
            }
        }
        
        return false;
    },
    //List all channels given a token and a max number to list, use callback, return a object channel array.
    list            : function( args ){
        var channelList = new Array();    //Return Var
        
        var token         = "";
        var offset        = 0;
        var max           = 100;
        var callSuccess   = function(){};
        var callError     = function(){};
        
        //Arguments
        if( args ){
            if( args.token ){
                //Arguments setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set attribute
                    token = args.token;
                }
            }
            if( args.offset ){
                //Arguments setted
                if( args.offset    != ""
                    && args.offset != null  ){
                    //Set attribute
                    offset = args.offset;
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
        }
        /**nop
        //If the data is updated
        if( this.isUpdated() ){
            //Select channels from storage
            //var cl = kaeptor.ls.select( kaeptor.config.CHANNEL_LIST );
            this.retrieveAll({
                offset      : offset,
                limit       : max,
                success     : function( cl ){
                    //Set channelList
                    channelList = cl;

                    ////console.log( channelList );                        
                    //Callback
                    callSuccess( channelList );

                },
                error       : function( err ){
                    //console.log( err.message );
                }
            });

            //Return current channel list (local)
            return channelList;
        }*/
        //Else request a new channel list from backend
        $.ajax({
            type:     kaeptor.config.REST_TYPE,
            url:      kaeptor.config.SERVER + 'channel/list',
            data:     'token=' + token + '&max=' + max + '&offset=' + offset,
            dataType: kaeptor.config.REST_DATA,
            success:  function( data ){
                if( typeof(data.result) != 'undefined' ){
                    
                    $.each(data.result, function( index, value ){
                        //List to access values of each attribute
                        var objChannel = new KaeptorChannel();
                        
                        objChannel.id           = value.id;
                        objChannel.name         = value.name;
                        objChannel.icon         = value.icon;
                        objChannel.number       = value.number;
                        objChannel.monitored    = value.monitored;
                        objChannel.topic        = value.topic;
                                            
                        //Add obj to list
                        channelList.push( objChannel );/**nop
                        //Create object in persistence layer
                        kaeptor.channel.save({
                            object  : objChannel,
                            error   : function( err ){
                                //console.log( objChannel.name + ": " + err.message );
                            }
                        });
                        */
                    });
                    /**nop
                    //Flush all objects from persistence queue to database
                    kaeptor.db.flush(
                        function(){//Persisted all objects
                            
                            var current =   new Date();

                            //Save current date (string date) + CHANNEL_EXPIRE_DAYS for update channel list check
                            current.setDate( current.getDate() + kaeptor.config.CHANNEL_EXPIRE_DAYS );
                            kaeptor.ls.save( kaeptor.config.CHANNEL_EXPIRATION, current.toString() );

                            //Callback
                            callSuccess( channelList );
                        }
                    );
                    */callSuccess( channelList );
                } else if( typeof(data.error) != 'undefined' ){
                    
                    //Callback
                    callError( data.error.type );
                }
            },
            error:    function( XMLHttpRequest ){
                
                //Callback
                callError( XMLHttpRequest.status );
            }
        });
        
        return channelList;
    },
    //List all channels bookmarked given a token, call callback funcitons, return a object channel array.
    bookmarked        : function( args ){
        var myChannelList = new Array();    //Return Var
        var token         = "";
        var callSuccess   = function(){};
        var callError     = function(){};
        
        //Arguments
        if( args ){
            if( args.token ){
                //Arguments setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set attribute
                    token = args.token;
                }
            }
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
        }
        
        $.ajax({
            type:     kaeptor.config.REST_TYPE,
            url:      kaeptor.config.SERVER + 'channel/bookmarked',
            data:     'token=' + token,
            dataType: kaeptor.config.REST_DATA,
            success:  function( data ){
                if( typeof(data.result) != 'undefined' ){
                                        
                    $.each( data.result, function( index, value ){
                        var objChannel = new KaeptorChannel();
                        
                        objChannel.id           = value.id;
                        objChannel.name         = value.name;
                        objChannel.icon         = value.icon;
                        objChannel.number       = value.number;
                        objChannel.monitored    = value.monitored;
                        objChannel.topic        = value.topic;
                                                
                        myChannelList.push( objChannel );
                    });
                    
                    //$(window).trigger( kaeptor.config.MY_LIST_OK );
                    ////console.log("My Channel List: "+channelList);
                    //Callback
                    callSuccess( myChannelList );
                    
                } else if( typeof(data.error) != 'undefined' ){
                    
                    //$(window).trigger( kaeptor.config.MY_LIST_ERROR, [data.error.type] );
                    ////console.log("My Channel List Error: "+data.error.type);
                    //Callback
                    callError( data.error.type );
                }
            },
            error:    function( XMLHttpRequest ){
                //$(window).trigger( kaeptor.config.MY_LIST_ERROR, [XMLHttpRequest.status] );
                //Callback
                callError( XMLHttpRequest.status );
            }
        });
        
        return myChannelList;
    },
    //List all channels subscribed given a token, call callback funcitons, return a object channel array.
    subscribed       : function( args ){
        var subChannelList = new Array();    //Return Var
        var token         = "";
        var callSuccess   = function(){};
        var callError     = function(){};
        
        //Arguments
        if( args ){
            if( args.token ){
                //Arguments setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set attribute
                    token = args.token;
                }
            }
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
        }
        
        $.ajax({
            type:     kaeptor.config.REST_TYPE,
            url:      kaeptor.config.SERVER + 'channel/subscribed',
            data:     'token=' + token,
            dataType: kaeptor.config.REST_DATA,
            success:  function( data ){
                if( typeof(data.result) != 'undefined' ){
                                        
                    $.each( data.result, function( index, value ){
                        var objChannel = new KaeptorChannel();
                        
                        objChannel.id           = value.id;
                        objChannel.name         = value.name;
                        objChannel.icon         = value.icon;
                        objChannel.number       = value.number;
                        objChannel.monitored    = value.monitored;
                        objChannel.topic        = value.topic;
                                                
                        subChannelList.push( objChannel );
                    });
                    
                    //Callback
                    callSuccess( subChannelList );
                    
                } else if( typeof(data.error) != 'undefined' ){
                    //Callback
                    callError( data.error.type );
                }
            },
            error:    function( XMLHttpRequest ){
                //Callback
                callError( XMLHttpRequest.status );
            }
        });
        
        return subChannelList;
    },
    //Bookmark the passed channel object to the favorites, call callback functions
    bookmark        : function( args ){
        var object        = {};             //Argument channel object
        
        var token         = "";
        var argSuccess    = {};
        var callSuccess   = function(){};
        var callError     = function(){};
        
        //Arguments
        if( args ){
            if( args.object ){
                //Arguments setted
                if( args.object    != ""
                    && args.object != null  ){
                    //Set token
                    object = args.object;
                }
            }
            if( args.token ){
                //Arguments setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set token
                    token = args.token;
                }
            }
            if( args.success ){
                //Arguments setted
                if( args.success    != ""
                    && args.success != null  ){
                    //Set callbacks
                    callSuccess = args.success;
                }
            }
            if( args.argSuccess ){
                //Arguments setted
                if( args.argSuccess    != ""
                    && args.argSuccess != null  ){
                    //Set callbacks
                    argSuccess = args.argSuccess;
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
        }       
        
        //Check if object is correctly setted
        if( $.classOf(object) === 'KaeptorChannel' ){
            $.ajax({
                type:     kaeptor.config.REST_TYPE,
                url:      kaeptor.config.SERVER + 'channel/bookmark',
                data:     'token=' + token + '&channel=' + object.id,
                dataType: kaeptor.config.REST_DATA,
                success:  function( data ){
                    if( typeof(data.result) != 'undefined' ){
                        //Callback
                        callSuccess( argSuccess );
                        //$(window).trigger( kaeptor.config.BOOKMARK_OK, [view] );
                        ////console.log("Channel List: "+channelList);


                    } else if( typeof(data.error) != 'undefined' ){
                        //Callback
                        callError( data.error.type );
                        //$(window).trigger( kaeptor.config.BOOKMARK_ERROR, [data.error.type] );
                        ////console.log("Channel List Error: "+data.error.type);
                    }
                },
                error:    function( XMLHttpRequest ){
                    //Callback
                    callError( XMLHttpRequest.status );
                    //$(window).trigger( kaeptor.config.BOOKMARK_ERROR, [XMLHttpRequest.status] );
                }
            });
            
        } else {
            //Error
            callError( err={message:"Object not a KaeptorChannel!"} );
            
        }
        
    },
    //Unbookmark passed channel object from favorites, call callback functions
    unbookmark      : function( args ){
        var object        = {};             //Argument channel object
        
        var token         = "";
        var argSuccess    = {};
        var callSuccess   = function(){};
        var callError     = function(){};
        //Arguments
        if( args ){
            if( args.object ){
                //Arguments setted
                if( args.object    != ""
                    && args.token != null  ){
                    //Set token
                    object = args.object;
                }
            }
            if( args.token ){
                //Arguments setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set token
                    token = args.token;
                }
            }
            if( args.success ){
                //Arguments setted
                if( args.success    != ""
                    && args.success != null  ){
                    //Set callbacks
                    callSuccess = args.success;
                }
            }
            if( args.argSuccess ){
                //Arguments setted
                if( args.argSuccess    != ""
                    && args.argSuccess != null  ){
                    //Set callbacks
                    argSuccess = args.argSuccess;
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
        }        
        
        //Check if object is correctly setted
        if( $.classOf(object) === 'KaeptorChannel' ){
            $.ajax({
                type:     kaeptor.config.REST_TYPE,
                url:      kaeptor.config.SERVER + 'channel/unbookmark',
                data:     'token=' + token + '&channel=' + object.id,
                dataType: kaeptor.config.REST_DATA,
                success:  function( data ){
                    if( typeof(data.result) != 'undefined' ){
                        //Callback
                        callSuccess( argSuccess );
                        //$(window).trigger( kaeptor.config.UNBOOKMARK_OK, [view] );
                        ////console.log("Channel List: "+channelList);


                    } else if( typeof(data.error) != 'undefined' ){
                        //Callback
                        callError( data.error.type );
                        //$(window).trigger( kaeptor.config.UNBOOKMARK_ERROR, [data.error.type] );
                        ////console.log("Channel List Error: "+data.error.type);
                    }
                },
                error:    function( XMLHttpRequest ){
                    //Callback
                    callError( XMLHttpRequest.status );
                    //$(window).trigger( kaeptor.config.UNBOOKMARK_ERROR, [XMLHttpRequest.status] );
                }
            });
            
        } else {
            //Error
            callError( err={message:"Object not a KaeptorChannel!"} );
            
        }
        
    },
    //Subscribe  passed channel object to the monitored channels of the user, call callback functions
    subscribe       : function( args ){
        var object        = {};             //Argument channel object
        
        var token         = "";
        var argSuccess    = {};
        var amqAddListener   = function(){};
        var callSuccess   = function(){};
        var callError     = function(){};
        
        //Arguments
        if( args ){
            if( args.object ){
                //Arguments setted
                if( args.object    != ""
                    && args.object != null  ){
                    //Set object
                    object = args.object;
                }
            }
            if( args.token ){
                //Arguments setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set token
                    token = args.token;
                }
            }
            if( args.amqAddListener ){
                //Arguments setted
                if( args.amqAddListener    != ""
                    && args.amqAddListener != null  ){
                    //Set callbacks
                    amqAddListener = args.amqAddListener;
                }
            }
            if( args.success ){
                //Arguments setted
                if( args.success    != ""
                    && args.success != null  ){
                    //Set callbacks
                    callSuccess = args.success;
                }
            }
            if( args.argSuccess ){
                //Arguments setted
                if( args.argSuccess    != ""
                    && args.argSuccess != null  ){
                    //Set callbacks
                    argSuccess = args.argSuccess;
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
        }        
        
        //Check if object is correctly setted
        if( $.classOf(object) === 'KaeptorChannel' ){
            $.ajax({
                type:     kaeptor.config.REST_TYPE,
                url:      kaeptor.config.SERVER + 'channel/subscribe',
                data:     'token=' + token + '&channel=' + object.id,
                dataType: kaeptor.config.REST_DATA,
                success:  function( data ){
                    if( typeof(data.result) != 'undefined' ){
                        //Set AMQ Handler
                        amqAddListener( object.id );
                        
                        //Callback
                        callSuccess( argSuccess );                    

                    } else if( typeof(data.error) != 'undefined' ){
                        //Callback
                        callError( data.error.type );

                    }
                },
                error:    function( XMLHttpRequest ){
                    //Callback
                    callError( XMLHttpRequest.status );

                }
            });
            
        } else {
            //Error
            callError( err={message:"Object not a KaeptorChannel!"} );
            
        }
    
    },
    //Unsubscribe passed channel object from the monitored channels of the user, call callback functions
    unsubscribe         : function( args ){
        var object        = {};             //Argument channel object
        
        var token         = "";
        var amqRemoveListener   = function(){};
        var argSuccess    = {};
        var callSuccess   = function(){};
        var callError     = function(){};
        //Arguments
        if( args ){
            if( args.object ){
                //Arguments setted
                if( args.object    != ""
                    && args.object != null  ){
                    //Set object
                    object = args.object;
                }
            }
            if( args.token ){
                //Arguments setted
  
                if( args.token    != ""
                    && args.token != null  ){
                    //Set token
                    token = args.token;
                }
            }
            if( args.amqRemoveListener ){
                //Arguments setted
                if( args.amqRemoveListener    != ""
                    && args.amqRemoveListener != null  ){
                    //Set callbacks
                    amqRemoveListener = args.amqRemoveListener;
                }
            }
            if( args.success ){
                //Arguments setted
                if( args.success    != ""
                    && args.success != null  ){
                    //Set callbacks
                    callSuccess = args.success;
                }
            }
            if( args.argSuccess ){
                //Arguments setted
                if( args.argSuccess    != ""
                    && args.argSuccess != null  ){
                    //Set callbacks
                    argSuccess = args.argSuccess;
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
        }        
        
        //Check if object is correctly setted
        if( $.classOf(object) === 'KaeptorChannel' ){
            $.ajax({
                type:     kaeptor.config.REST_TYPE,
                url:      kaeptor.config.SERVER + 'channel/unsubscribe',
                data:     'token=' + token + '&channel=' + object.id,
                dataType: kaeptor.config.REST_DATA,
                success:  function( data ){
                    if( typeof(data.result) != 'undefined' ){
                        //Unset AMQ Handler
                        amqRemoveListener( object.id );
                        
                        //Callback
                        callSuccess( argSuccess );


                    } else if( typeof(data.error) != 'undefined' ){
                        //Callback
                        callError( data.error.type );
                    }
                },
                error:    function( XMLHttpRequest ){
                    //Callback
                    callError( XMLHttpRequest.status );
                }
            });
            
        } else {
            //Error
            callError( err={message:"Object not a KaeptorChannel!"} );
            
        }
    }
};
