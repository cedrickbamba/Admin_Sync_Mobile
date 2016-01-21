/*******************************************************************************
 * Page Controller for the ChannelDetail page Class
 */
function PageChannelDetail(){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var listViewChannelDetail;
    var working;
    
    /**************************************************************************\ 
    | Constructor / Public Attributes:
    \**************************************************************************/
    listViewChannelDetail   = "";
    working             = false;
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    //Getters
    this.getListViewChannelDetail   = function(){
        return listViewChannelDetail;
    }
    //Setters
    this.setListViewChannelDetail   = function( listViewChannelDetailVal ){
        listViewChannelDetail = listViewChannelDetailVal;
    }
    //Controller
    this.init               = function( args ){
        var token;
        
        //Arguments
        if( args ){
            if( args.listViewChannelDetail ){
                //Arguments setted
                if( args.listViewChannelDetail    != ""
                    && args.listViewChannelDetail != null  ){
                    //Set attribute
                    listViewChannelDetail = args.listViewChannelDetail;
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
        }
        
        //Bind a event for refreshing listview
        listViewChannelDetail.live(
            "listviewRefreshed",
            function( e ){
                //Hide loading
                //$(".status").css({"background":"#333 url('images/clock.png')"});
                $.mobile.hidePageLoadingMsg();
            }
        );
        
        console.log( "Bind Tap on List Items" );
        $('#'+listViewChannelDetail.attr('id')+' .channeldetail-listitem').live(
            'tap',
            function( event, data ){
                //window.alert(currChannelDetail);
            }
        );
        
    };
    this.addChannelDetail        = function( args ){
        var objChannelDetail      = {};
        
        var checkIcon       = "";
        var selectedClass   = "";
        var argSuccess      = {};
        var callSuccess     = function(){};
        var callError       = function(){};
        
        //Arguments
        if( args ){
            if( args.objChannelDetail ){
                //Arguments setted
                if( args.objChannelDetail    != ""
                    && args.objChannelDetail != null  ){
                    //Set attribute
                    objChannelDetail = args.objChannelDetail;
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
        //if( $.classOf(objChannel) === 'KaeptorChannel' ){
            //Logo image cache retrieve
            /*kaeptor.cache.image({ 
                imgURL      : kaeptor.config.STATIC_SERVER+"logos/"+objChannel.icon,
                success     : function( imgData ){*/
                    //var imgPath = kaeptor.config.STATIC_SERVER+"images/"+objChannelDetail.icon;//imgData;

                    //Append and Refresh listItem
                    listViewChannelDetail.append("\
                        <li data-kaeptorcontent-id=\""+objChannelDetail.id+"\" data-icon=\"\" >\
                            <a style=\"padding-left: 0px;\" href=\"\">\
                                <img src=\""+objChannelDetail.icon+"\" style=\"margin-top: 5px;\"/>\
                                <h3 style=\"margin-left: 52px;\"><strong class=\"kaeptor-program-title\">"+objChannelDetail.title+"</strong></h3>\
                            </a>\
                        </li>"
                    );

                    listViewChannelDetail.listview("refresh");

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
            
        /*} else {
            //Error
            callError( err={message:"Object not a KaeptorChannel!"} );
            
        }*/
        
    };
    this.loadList          = function( token ){
        
        //Aux var
        var myself = this;
        
        //Check which elements should be updated if list is not empty
        var arrListElem = this.getListViewChannelDetail().children( "li" );
        //console.log( arrListElem );
        
        $.ajax({
            type:     kaeptor.config.REST_TYPE,
            url:      kaeptor.config.SERVER + 'content/list',
            data:     'token=' + token + '&channel=' + currChannelDetail.id,
            dataType: kaeptor.config.REST_DATA,
            success:  function( data ){
                if( typeof(data.result) != 'undefined' ){
                    
                    $.each(
                        data.result, 
                        function( index, value ){
                            myself.addChannelDetail({
                                objChannelDetail:   value.content
                            });
                        }
                    );
                } else {
                    console.log("Error: ChannelDetail Load list");
                }
            }
        });
        
        
        $.mobile.hidePageLoadingMsg();
    };
} 

/******************************************************************************\
| Public:
\******************************************************************************/


