/**
 * Kaeptor API Controller Authentication Component
 */

kaeptor.auth = {
    user        : new KaeptorUser(),
    //Login or try renew token, call callback functions, return bool
    login       : function( args ){
        //Local vars
        var callSuccess = function(){};
        var callError = function(){};
        //Optional arguments
        if( args ){
            if( args.username 
                && args.password ){
                //Arguments setted
                if( args.username    != ""
                    && args.username != null
                    && args.password != ""
                    && args.password != null  ){
                    //Set attributes
                    kaeptor.auth.user.username = args.username;
                    kaeptor.auth.user.password = args.password;
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
        
        var username = kaeptor.auth.user.username;
        var password = kaeptor.auth.user.password;
        var device = kaeptor.auth.user.device;
        
        console.log("login1");
        //Try to login
        if( username    != null 
            && username != "" 
            && password != null 
            && password != ""
            && device   != null   
            && device   != ""   ){
            console.log("login2-Device "+device);
            //Start transaction AJAX
            $.ajax({
                type:     kaeptor.config.REST_TYPE,
                url:      kaeptor.config.SERVER + 'user/login',
                data:     'username=' + username + '&password=' + password + '&device=' + device,
                dataType: kaeptor.config.REST_DATA,
                success:  function( data ){
                    console.log("login2");
                    if( typeof(data.result) != 'undefined' ){
                        //Set Attributes
                        kaeptor.auth.user.tokenid     = data.result.token;
                        kaeptor.auth.user.secret      = data.result.secret;
                        kaeptor.auth.user.expiration  = data.result.expiration;

                        //Control
                        kaeptor.auth.user.expired     = false;
                        kaeptor.auth.user.logged      = true;

                        //Callback
                        callSuccess();
                        //$(window).trigger( kaeptor.config.LOGIN_OK );

                    } else if( typeof(data.error) != 'undefined' ){
                        //Control Attributes
                        kaeptor.auth.user.logged      = false;

                        //Callback
                        $( window ).trigger( kaeptor.config.TOKEN_ERROR, [data.error] );
                        callError( data.error );
                    }                    
                },
                error:    function( XMLHttpRequest ){
                    //Control Attributes
                    kaeptor.auth.user.logged      = false;

                    console.log("login3");
                    
                    //Callback
                    $( window ).trigger( kaeptor.config.TOKEN_ERROR, [XMLHttpRequest] );
                    callError( XMLHttpRequest.status );
                }
            });
        } else {
            //Control Attributes
            kaeptor.auth.user.logged      = false;

            console.log("login4");
        }
        
        /*
        if( kaeptor.ls.select( kaeptor.config.USER_SECRET )    != ""
            && kaeptor.ls.select( kaeptor.config.USER_SECRET ) != null ){
            //Secret setted. login possible
            kaeptor.auth.user.logged = true;
        } else {
            //Callback
            callError( 'WrongData' );
        }*/
        
        return kaeptor.auth.user.logged;
    },
    //Try renew token if logged/!expired return true
    token         : function( args ){
        //Local vars
        var authentication = false;     //Return var
        var callSuccess = function(){};
        var callError = function(){};
        //Optional arguments
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
        }
        
        this.user.secret = kaeptor.ls.select( kaeptor.config.USER_SECRET );
        
        //Check logged and expired
        if( kaeptor.auth.user.logged
            && !kaeptor.auth.user.isExpired() ){
            //All is ok
            authentication = true;
        //If the token is expired
        } else if( kaeptor.auth.user.isExpired() ){
            
            if( kaeptor.auth.user.secret    != null 
                && kaeptor.auth.user.secret != "" 
                && kaeptor.auth.user.device != null 
                && kaeptor.auth.user.device != ""     ){
                //Try get a new token
                $.ajax({
                    type:     kaeptor.config.REST_TYPE,
                    url:      kaeptor.config.SERVER + 'user/token',
                    data:     'secret=' + kaeptor.auth.user.secret + '&device=' + kaeptor.auth.user.device,
                    dataType: kaeptor.config.REST_DATA,
                    success:  function( data ){
                        //Result OK
                        if( typeof(data.result) != 'undefined' ){
                            //Set attributes
                            kaeptor.auth.user.tokenid      = data.result.token;
                            kaeptor.auth.user.expiration = data.result.expiration;
                            
                            //Control
                            kaeptor.auth.user.expired     = false;
                            kaeptor.auth.user.logged      = true;
                            
                            //Response
                            //$(window).trigger( kaeptor.config.TOKEN_OK );
                            
                            //Return
                            authentication = true;
                            
                        //Result Error
                        } else if( typeof(data.error) != 'undefined' ){
                            //Response
                            $(window).trigger( kaeptor.config.TOKEN_ERROR, [data.error.type] );
                            //Callback
                            callError( data.error );
                        }
                    },
                    error:    function( XMLHttpRequest ){
                        //Response
                        $(window).trigger( kaeptor.config.TOKEN_ERROR, [XMLHttpRequest] );
                        //Callback
                        callError( XMLHttpRequest );
                    }
                });
            } else {
                //Response
                $(window).trigger( kaeptor.config.TOKEN_ERROR, ['WrongSecretOrData'] );
                //Callback
                callError( 'WrongSecretOrData' );
                
            }
        //Not logged, try login
        } else {
            authentication = this.login({
                success:    callSuccess,
                error:      callError
            });
        }
        
        if( authentication ){
            //Callback
            callSuccess();
        }
        
        return authentication;        
    }
};

