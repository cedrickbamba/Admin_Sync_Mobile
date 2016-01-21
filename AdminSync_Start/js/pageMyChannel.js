/*******************************************************************************
 * Page Controller for the MyChannel page Class
 */
function PageMyChannel(){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var listViewMyChannel;
    var working;
    var app;
    
    /**************************************************************************\ 
    | Constructor / Public Attributes:
    \**************************************************************************/
    listViewMyChannel   = "";
    working             = false;
    app                 = "";
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    //Getters
    this.getListViewMyChannel   = function(){
        return listViewMyChannel;
    }
    //Setters
    this.setListViewMyChannel   = function( listViewMyChannelVal ){
        listViewMyChannel = listViewMyChannelVal;
    }
    //Controller
    this.init               = function( args ){
        var token;
        
        //Arguments
        if( args ){
            if( args.listViewMyChannel ){
                //Arguments setted
                if( args.listViewMyChannel    != ""
                    && args.listViewMyChannel != null  ){
                    //Set attribute
                    listViewMyChannel = args.listViewMyChannel;
                }
            }
            if( args.token ){
                //Arguments setted
                if( args.token    != ""
                    && args.token != null  ){
                    //Set attribute
                    token = args.token;
                }
            }
            if( args.app ){
                //Arguments setted
                if( args.app    != ""
                    && args.app != null  ){
                    //Set attribute
                    app = args.app;
                }
            }
        }
        
        //Bind a event for refreshing listview
        listViewMyChannel.live(
            "listviewRefreshed",
            function( e ){
                //Hide loading
                $(".status").css({"background":"#333 url('images/clock.png')"});
                $.mobile.hidePageLoadingMsg();
            }
        );
        
        console.log( "Bind Tap on List Items" );
        //subscribe button
        $("#btnSubscribe").live(
            "tap",
            function(){
                var channel = currChannel;
                var elem    = currChannelItem;
                
                elem.find("span.ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-refresh");

                kaeptor.channel.subscribe({
                    object      : channel,
                    token       : token,
                    amqAddListener      : amqAddListener,
                    argSuccess  : {
                        element     : elem
                    },
                    success     : function( argSuccess ){
                        argSuccess.element.addClass("kaeptor-selected");
                    },
                    error       : function( error ){
                        console.log( "Subscribe Error: ");
                        console.log( error );
                    }
                });                
            }
        );
        $('#'+listViewMyChannel.attr('id')+' .channel-more').live(
            'tap',
            function( event, data ){
                currChannelDetail = {
                    id          :   $(this).attr("data-kaeptorchannel-id"),
                    icon        :   $("li[data-kaeptorchannel-id='"+$(this).attr("data-kaeptorchannel-id")+"'] img").attr("src"),
                    title       :   $("li[data-kaeptorchannel-id='"+$(this).attr("data-kaeptorchannel-id")+"'] .kaeptor-program-title").html(),
                    synopsis    :   $("li[data-kaeptorchannel-id='"+$(this).attr("data-kaeptorchannel-id")+"'].channel-more").attr("data-kaeptorprogram-synopsis")
                }
                $.mobile.changePage("#channeldetail-page");
            }
        );
        $('#'+listViewMyChannel.attr('id')+' .channel-listitem').live(
            'tap',
            function( event, data ){
                //var id = $(this).attr("data-kaeptorchannel-id");
                //var elem = $("li[data-kaeptorchannel-id='"+id+"']");
                var elem = $(this);
                var channel = new KaeptorChannel();
                channel.id    = elem.attr("data-kaeptorchannel-id");
                channel.topic = elem.attr("data-kaeptorchannel-topic");
                
                currChannel = channel;
                currChannelItem = elem;

                if( elem.find("span.ui-icon").hasClass("ui-icon-checkbox-off") ){
                    
                    if( npsubscribe ){
                        elem.find("span.ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-refresh");

                        kaeptor.channel.subscribe({
                            object      : channel,
                            token       : token,
                            amqAddListener      : amqAddListener,
                            argSuccess  : {
                                element     : elem
                            },
                            success     : function( argSuccess ){
                                argSuccess.element.addClass("kaeptor-selected");
                            },
                            error       : function( error ){
                                console.log( "Subscribe Error: ");
                                console.log( error );
                            }
                        });
                    } else {
                        $("#lnkSubscribeDialog").click();
                        //$.mobile.changePage('#subscribe-dialog', {transition: 'pop', role: 'dialog'});
                    }
                } else {
                    elem.find("span.ui-icon").removeClass("ui-icon-refresh").addClass("ui-icon-checkbox-off");

                    //console.log( "Trying to unsubscribe" );

                    kaeptor.channel.unsubscribe({
                        object      : channel,
                        token       : token,
                        amqRemoveListener   : amqRemoveListener,
                        argSuccess  : {
                            element     : elem
                        },
                        success     : function( argSuccess ){
                            argSuccess.element.removeClass("kaeptor-selected");
                    //logger.disable();
                        },
                        error       : function( error ){
                            console.log( "Unsubscribe Error: "+error );
                        }
                    });
                }
            }
        );
        
    };
    this.addChannel        = function( args ){
        var objChannel      = {};
        
        var checkIcon       = "";
        var selectedClass   = "";
        var argSuccess      = {};
        var callSuccess     = function(){};
        var callError       = function(){};
        
        //Arguments
        if( args ){
            if( args.objChannel ){
                //Arguments setted
                if( args.objChannel    != ""
                    && args.objChannel != null  ){
                    //Set attribute
                    objChannel = args.objChannel;
                }
            }
            if( args.checkIcon ){
                //Arguments setted
                if( args.checkIcon    != ""
                    && args.checkIcon != null  ){
                    //Set attribute
                    checkIcon = args.checkIcon;
                }
            }
            if( args.selectedClass ){
                //Arguments setted
                if( args.selectedClass    != ""
                    && args.selectedClass != null  ){
                    //Set attribute
                    selectedClass = args.selectedClass;
                }
            }
            if( args.argSuccess ){
                //Arguments setted
                if( args.argSuccess    != ""
                    && args.argSuccess != null  ){
                    //Set attribute
                    argSuccess = args.argSuccess;
                }
            }
            if( args.success ){
                //Arguments setted
                if( args.success    != ""
                    && args.success != null  ){
                    //Set callback
                    callSuccess = args.success;
                }
            }
            if( args.error ){
                //Arguments setted
                if( args.error    != ""
                    && args.error != null  ){
                    //Set callback
                    callError = args.error;
                }
            }
        }
        
        //Check if object is correctly setted
        if( $.classOf(objChannel) === 'KaeptorChannel' ){
            //Logo image cache retrieve
            /*kaeptor.cache.image({ 
                imgURL      : kaeptor.config.STATIC_SERVER+"logos/"+objChannel.icon,
                success     : function( imgData ){*/
                    var imgPath = kaeptor.config.STATIC_SERVER+"logos/"+objChannel.icon;//imgData;

                    //Append and Refresh listItem
                    listViewMyChannel.append("\
                        <li data-kaeptorchannel-id=\""+objChannel.id+"\" data-kaeptorchannel-topic=\""+objChannel.topic+"\" data-role=\"list-divider\" style=\"height:40px; cursor: pointer;\" class=\"channel-listitem "+selectedClass+" \">\
                            <img src=\""+imgPath+"\" style=\"margin-top: 5px;\"/>\
                            <h3 style=\"margin-left: 52px;\">"+objChannel.number+": "+objChannel.name+"</h3>\
                            <span class=\"ui-icon ui-icon-"+checkIcon+" ui-icon-shadow\" style=\"float: right; margin-top: -25px\">&nbsp;</span>\
                        </li>\
                        <li data-kaeptorchannel-id=\""+objChannel.id+"\" data-kaeptorchannel-topic=\""+objChannel.topic+"\" data-kaeptorprogram-synopsis=\"\" data-icon=\"plus\" class=\"channel-more \">\
                            <a style=\"padding-left: 0px;\" href=\"\">\
                                <h3 style=\"margin-top: 0;\"><strong class=\"kaeptor-program-title\">Carregando programação..</strong></h3>\
                                <div>\
                                    <span  class=\"kaeptor-begin-date\">Carregando..</span>\
                                    <span  class=\"kaeptor-end-date\">..</span><br />\
                                    <span class=\"kaeptor-progressbar\" ><span></span></span>\
                                </div>\
                            </a>\
                        </li>"
                    );

                    listViewMyChannel.listview("refresh");

                    //Callback
                    callSuccess( argSuccess );

                /*},
                error   : function(){

                    //Append without a image
                    listViewMyChannel.append("\
                        <li data-kaeptorchannel-id=\""+objChannel.id+"\" data-kaeptorchannel-topic=\""+objChannel.topic+"\" data-icon=\""+checkIcon+"\" class=\"channel-listitem "+selectedClass+" \" >\
                            <a style=\"padding-left: 0px;\" href=\"\">\
                                <img src=\"\" />\
                                <h3 style=\"margin-left: 52px;\">"+objChannel.number+": "+objChannel.name+"</h3>\
                                <div>\
                                    <span  class=\"kaeptor-begin-date\">Carregando..</span>\
                                    <span  class=\"kaeptor-end-date\">..</span><br />\
                                    <span class=\"kaeptor-progressbar\" ><span></span></span>\
                                </div>\
                                <div style=\"display: block; width: 97%; height: 130px; margin-left: 5px; margin-top: 25px; font-size: 14px;\">\
                                    <strong class=\"kaeptor-program-title\">Carregando programação..</strong><br />\
                                    <div class=\"kaeptor-synopsis kaeptor-wraptext\" style=\"width: 97%; height: 110px; font-style: italic; font-weight: normal; border: none;\" disabled=\"true\" >Carregando sinopse..</div>\
                                </div>\
                            </a>\
                        </li>"
                    );

                    //Refresh
                    listViewMyChannel.listview("refresh");

                    //Callback
                    callError( "Image not loaded", argSuccess );
                }
            });  */          
            
        } else {
            //Error
            callError( err={message:"Object not a KaeptorChannel!"} );
            
        }
        
    };
    this.addSchedule       = function( args ){
        
        var objChannel;
        var objSchedule;
        var arrayIndex;
        var arrayLength;
        
        //Arguments
        if( args ){
            if( args.channel ){
                //Arguments setted
                if( args.channel    != ""
                    && args.channel != null  ){
                    //Set attribute
                    objChannel = args.channel;
                }
            }
            if( args.schedule ){
                //Arguments setted
                if( args.schedule    != ""
                    && args.schedule != null  ){
                    //Set attribute
                    objSchedule = args.schedule;
                }
            }
            if( args.arrayIndex != null  ){
                //Set attribute
                arrayIndex = args.arrayIndex;
            }
            if( args.arrayLength ){
                //Arguments setted
                if( args.arrayLength    != ""
                    && args.arrayLength != null  ){
                    //Set attribute
                    arrayLength = args.arrayLength;
                }
            }
        }
        
        //Dates
        var begin        = $.gmtToDate( objSchedule.begin );
        var end          = $.gmtToDate( objSchedule.end );
                
        var strBegin     = /*( (begin.getDate().toString().length === 1)?("0"+begin.getDate()):(begin.getDate()) )+"/"+( ((begin.getMonth() + 1).toString().length === 1)?("0"+(begin.getMonth() + 1)):(begin.getMonth() + 1) )+" - "+*/( (begin.getHours().toString().length == 1)?("0"+begin.getHours().toString()):(begin.getHours()) )+":"+( (begin.getMinutes().toString().length == 1)?("0"+begin.getMinutes()):(begin.getMinutes()) )+" ";
        var strEnd       = /*( (end.getDate().toString().length === 1)?("0"+end.getDate()):(end.getDate()) )+"/"+( ((end.getMonth() + 1).toString().length === 1)?("0"+(end.getMonth() + 1)):(end.getMonth() + 1) )+" - "+*/( (end.getHours().toString().length == 1)?("0"+end.getHours().toString()):(end.getHours()) )+":"+( (end.getMinutes().toString().length == 1)?("0"+end.getMinutes()):(end.getMinutes()) )+" ";
                
        //Program attributes
        var synopsis     = ( ($.trim( objSchedule.synopsis ) == "")?("Synopse indisponível"):(objSchedule.synopsis) );
        var programTitle = ( (typeof(objSchedule.program.titles.pt) == 'undefined')?("Programação indisponível"):(objSchedule.program.titles.pt) );
        
        //Data
        var percentCompleted = 100 - ( ( end - (new Date()) )/( end - begin ) )*100;
        
        $("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-program-title").html( programTitle );
        //$("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-synopsis").html( synopsis );
        $("li[data-kaeptorchannel-id='"+objChannel.id+"'].channel-more").attr("data-kaeptorprogram-synopsis", synopsis);
        $("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-begin-date").attr( "data-kaeptor-begin", begin );
        $("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-begin-date").html( strBegin );
        $("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-end-date").attr( "data-kaeptor-end", end );
        $("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-end-date").html( strEnd );
        $("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-progressbar span").css({"width" : percentCompleted+"%"});
        
        //If last item refresh counter
        if( arrayIndex + 1 === arrayLength ){
            //Refresh
            listViewMyChannel.listview('refresh').trigger( "listviewRefreshed" );
        }
        
        
    };
    this.loadList          = function( token ){
        
        //Aux var
        var myself = this;
        
        //Check which elements should be updated if list is not empty
        var arrListElem = this.getListViewMyChannel().children( "li" );
        //console.log( arrListElem );
        
        //Get bookmarked channels list
        kaeptor.channel.bookmarked({
            token       : token,
            success     : function( myChannelList ){
                //Get subscribed channels list
                kaeptor.channel.subscribed({
                    token       : token,
                    success     : function( subscribedList ){
                        
                        //Length of array of channels
                        var len = myChannelList.length;
                        //console.log("Subscribed");
                        $.each( 
                            myChannelList, 
                            function( index, objChannel ){
                            
                                var checkiconVal     = "checkbox-off";
                                var classselectedVal = "";
                                var objSchedule = new EPGSchedule({
                                    channel     : objChannel
                                });

                                $.each( subscribedList, function( index2, subChannel ){
                                    if( objChannel.id === subChannel.id ){
                                        //Set classes
                                        checkiconVal       = "refresh";
                                        classselectedVal   = "kaeptor-selected";
                                        
                                        //Add listener(subscribe) for the subscribed channel
                                        kaeptor.channel.subscribe({
                                            object      : objChannel,
                                            token       : token,
                                            amqAddListener      : amqAddListener,
                                            success     : function(){
                                            },
                                            error       : function( error ){
                                                console.log( "Subscribe Error: ");
                                                console.log( error );
                                            }
                                        });

                                        return false;   //Break the $.each iteration
                                    }
                                });

                                //Arguments to callbacks
                                var objArguments = {
                                    channel           : objChannel,
                                    schedule          : objSchedule,
                                    arrayIndex        : index,
                                    arrayLength       : len
                                };
                                var isDisplayed = false;
                                var elementLi;

                                $.each(
                                    arrListElem,
                                    function( index3, liElem ){
                                        //Check if the channel is current displayed
                                        var jqElem = $( liElem );
                                        if( objChannel.id === jqElem.data("kaeptorchannel-id") ){
                                            //Control var for check if update is required
                                            isDisplayed = true;
                                            elementLi   = jqElem;

                                            return false;   //Break iterations proccess
                                        }
                                    }
                                );
                                    
                                //Decide if it should be updated or completely retrieved
                                if( isDisplayed ){
                                    //Now and current end date
                                    var dtNow   = new Date();
                                    var dtEnd   = new Date( $("li[data-kaeptorchannel-id='"+objChannel.id+"'] .kaeptor-end-date").attr("data-kaeptor-end") );
                                    
                                    
                                    //console.log(">>> Schedule channel "+objChannel.id);
                                    //console.log(">>> Now Schedule Data "+dtNow);
                                    //console.log(">>> End Schedule Data "+dtEnd);
                                    //console.log(">>> End < Now = "+(dtEnd < dtNow));
                                    
                                    
                                    //Check if it was subscribed and is no more subscribed
                                    if( classselectedVal === ""
                                        && elementLi.hasClass( "kaeptor-selected" ) ){
                                        //Remove class from it
                                        elementLi.removeClass( "kaeptor-selected" );
                                        elementLi.attr("data-icon", "");

                                    //If it was not subscribed and is now subscribed
                                    } else if( classselectedVal !== ""
                                        && !(elementLi.hasClass( "kaeptor-selected" )) ){
                                        //Add class to it
                                        elementLi.addClass( "kaeptor-selected" );
                                        elementLi.attr("data-icon", "refresh");
                                    }

                                    //Check if is not current schedule
                                    if( dtEnd < dtNow ){
                                        //Schedule is not up to date, update it!
                                        
                                        
                                        //console.log(">>> Updating schedule for channel "+objChannel.id);
                                        
                                        //Working flag setted
                                        working = true;
                                        
                                        epg.schedule.now({
                                            channelId   : objChannel.id,
                                            token       : token,
                                            argSuccess  : objArguments,
                                            success     : function( argSuccess ){
                                                
                                                //console.log(">>> Schedule for channel "+argSuccess.channel.id);
                                                //console.log(">>> Schedule "+argSuccess.schedule.id);
                                                
                                                //Flag off
                                                working = false;
                                                //Method to insert the schedule info
                                                myself.addSchedule( argSuccess );
                                                
                                                //console.log(">>> Updated schedule for channel "+objChannel.id);

                                            },
                                            error       : function( error ){
                                                console.log( "Schedule Error: "+error );
                                            }
                                        });
                                    //All schedule is updated
                                    } else {
                                        
                                        //console.log(">>> Schedule up to date "+objChannel.id);
                                        
                                        //Last item checked
                                        if( index + 1 === len ){
                                            myself.getListViewMyChannel().listview("refresh").trigger( "listviewRefreshed" );
                                        }
                                    }
                                
                                //Or retrieve and attach a new element
                                } else {
                                    //Flag on
                                    working = true;
                                    
                                    //Method to append a new listItem
                                    myself.addChannel({
                                        objChannel      : objChannel, 
                                        checkIcon       : checkiconVal,
                                        selectedClass   : classselectedVal,
                                        argSuccess      : objArguments,
                                        success         : function( argSuccess ){                                            
                                            
                                            epg.schedule.now({
                                                channelId   : objSchedule.channel.id,
                                                token       : token,
                                                argSuccess  : argSuccess,
                                                success     : function( argSuccess2 ){
                                                    //Flag off
                                                    working = false;
                                                    
                                                    //Method to insert the schedule info
                                                    myself.addSchedule( argSuccess2 );

                                                },
                                                error       : function( error ){
                                                    console.log( "Schedule Error: "+error );
                                                }
                                            });

                                        },
                                        error           : function( error, argSuccess ){
                                            if( error === "Image not loaded" ){
                                                
                                                //Load without image
                                                epg.schedule.now({
                                                    channelId   : objSchedule.channel.id,
                                                    token       : token,
                                                    argSuccess  : argSuccess,
                                                    success     : function( argSuccess2 ){
                                                        //Flag off
                                                        working = false;
                                                        
                                                        //Method to insert the schedule info
                                                        myself.addSchedule( argSuccess2 );

                                                    },
                                                    error       : function( error ){
                                                        console.log( "Schedule Error: "+error );
                                                    }
                                                });

                                            } else {
                                                console.log( "Channel Add Error: "+objChannel.name );
                                            }
                                        }
                                    });

                                }
                            });
                            
                    },
                    error       : function( error ){
                        console.log( "Subscribed Error: "+error );
                    }
                });

            },
            error       : function( error ){
                console.log( "MyChannel Error List: " + error.message );
            }
        });
        
        $.mobile.hidePageLoadingMsg();
    };
} 

/******************************************************************************\
| Public:
\******************************************************************************/


