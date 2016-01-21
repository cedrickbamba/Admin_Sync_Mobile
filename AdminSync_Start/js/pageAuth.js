/*******************************************************************************
 * Page Controller for the Authentication page Class
 */
function PageAuth(){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var textUsername;
    var textPassword;
    var checkRemainConected;
    var buttonLogin;
    
    /**************************************************************************\ 
    | Constructor / Public Attributes:
    \**************************************************************************/
    textUsername        = "";
    textPassword        = "";
    checkRemainConected = "";
    buttonLogin         = "";
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    this.init            = function( args ){
        //Arguments
        if( args ){
            if( args.textUsername ){
                //Arguments setted
                if( args.textUsername    != ""
                    && args.textUsername != null  ){
                    //Set attribute
                    textUsername = args.textUsername;
                }
            }
            if( args.textPassword ){
                //Arguments setted
                if( args.textPassword    != ""
                    && args.textPassword != null  ){
                    //Set attribute
                    textPassword = args.textPassword;
                }
            }
            if( args.checkRemainConected ){
                //Arguments setted
                if( args.checkRemainConected    != ""
                    && args.checkRemainConected != null  ){
                    //Set attribute
                    checkRemainConected = args.checkRemainConected;
                }
            }
            if( args.buttonLogin ){
                //Arguments setted
                if( args.buttonLogin    != ""
                    && args.buttonLogin != null  ){
                    //Set attribute
                    buttonLogin = args.buttonLogin;
                }
            }
        }/*
        //Bind checkbox change
        checkRemainConected.live(
            'change',
            function(){
                //disable text username
                if( textUsername.is(':disabled') ){
                    textUsername.removeAttr('disabled');
                } else {
                    textUsername.attr('disabled','disabled');
                }
                //disable text password
                if( textPassword.is(':disabled') ){
                    textPassword.removeAttr('disabled');
                } else {
                    textPassword.attr('disabled','disabled');
                }
            }
        );*/
        //Bind button tap
        buttonLogin.live(
            'tap', 
            function(){/*
                //If secret is stored
                if( kaeptor.ls.select( kaeptor.config.USER_SECRET )    != ""
                    && kaeptor.ls.select( kaeptor.config.USER_SECRET ) != null ){
                    //Try get a new token
                    objUser.token({
                        success:    function(){
                            kaeptor.ls.save( 
                                kaeptor.config.USER_TOKEN, 
                                objUser.getToken() 
                            );
                            kaeptor.ls.save( 
                                kaeptor.config.USER_EXPIRATION, 
                                objUser.getExpiration() 
                            );

                            console.log("Token generated2: "+objUser.getToken());
                            $.mobile.changePage("#mychannel-page");
                        },
                        error:      function( error ){
                            console.log( "Token Error: " + error );
                        }
                    });
                //Try login
                } else {*/
                    kaeptor.auth.login({ 
                        username:   textUsername.val(),
                        password:   textPassword.val(),
                        success:    function(){
                            if( checkRemainConected.is(':checked') ){
                                kaeptor.ls.save( 
                                    kaeptor.config.USER_SECRET, 
                                    kaeptor.auth.user.secret 
                                );
                            } else {
                                kaeptor.ls.save( 
                                    kaeptor.config.USER_SECRET, 
                                    ""
                                );
                            }

                            kaeptor.ls.save( 
                                kaeptor.config.USER_TOKEN, 
                                kaeptor.auth.user.tokenid 
                            );
                            kaeptor.ls.save( 
                                kaeptor.config.USER_EXPIRATION, 
                                kaeptor.auth.user.expiration 
                            );

                            /*
                            kaeptor.ls.setItem( kaeptor.config.USER_BEEP, "true" );
                            kaeptor.ls.setItem( kaeptor.config.USER_VIBRATE, "true" );
                            kaeptor.ls.setItem( kaeptor.config.USER_N10NTIME, "0" );
                            kaeptor.ls.setItem( kaeptor.config.USER_N10NREPEAT, "0" );*/

                            console.log("Token generated1: "+kaeptor.auth.user.tokenid);
                            $.mobile.changePage("#mychannel-page");

                        },
                        error:      function( error ){
                            console.log( "Login Error: " + error );
                        }
                    });
                //}
            }
        );
    };
    this.loadPreferences = function(){
        if( kaeptor.ls.select( kaeptor.config.USER_SECRET )    == ""
            || kaeptor.ls.select( kaeptor.config.USER_SECRET ) == null ){
            
            checkRemainConected.removeAttr('checked').checkboxradio("refresh");
            textUsername.removeAttr('disabled');
            textPassword.removeAttr('disabled');

        } else {
            checkRemainConected.attr('checked','checked').checkboxradio("refresh");
            textUsername.attr('disabled','disabled');
            textPassword.attr('disabled','disabled');
        }
    };
} 

/******************************************************************************\
| Public:
\******************************************************************************/


