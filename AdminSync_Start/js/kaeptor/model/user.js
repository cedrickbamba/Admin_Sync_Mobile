/*******************************************************************************
 * User info/Preferences Class
 */
function KaeptorUser(){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var logged;
    var username;
    var password;
    var tokenid;
    var secret;
    var device;
    var expiration;
    
    /**************************************************************************\ 
    | Constructor:
    \**************************************************************************/
    logged     = false;
    expired    = true;
    username   = "";
    password   = "";
    tokenid      = "";
    secret     = "";
    device     = "";
    expiration = "";
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    //Getters:
    /*Security works?
    this.getUsername = function(){
        return username;
    };
    this.getPassword = function(){
        return password;
    };
    this.isLogged = function(){
        return logged;
    };*/
    //Return true if the token is expired
    this.isExpired = function(){
        //There is a token stored
        if( kaeptor.ls.select( kaeptor.config.USER_TOKEN )         != ""
            && kaeptor.ls.select( kaeptor.config.USER_TOKEN)       != null
            && kaeptor.ls.select( kaeptor.config.USER_EXPIRATION ) != ""
            && kaeptor.ls.select( kaeptor.config.USER_EXPIRATION ) != null   ){
            //Update expiration and token
            expiration = kaeptor.ls.select( kaeptor.config.USER_EXPIRATION );
            tokenid      = kaeptor.ls.select( kaeptor.config.USER_TOKEN );
            
            //Set Date object from string received and Now
            var expirationDate = $.gmtToDate( expiration );
            var now = new Date();
        
            //Conpare dates
            if( expirationDate > now ){
                expired = false;
            } else {
                expired = true;
            }
        } else {
            expired = true;
        }
        
        return expired;
    };
    
    this.__defineGetter__("username", function(){
        return username;
    });
    this.__defineGetter__("password", function(){
        return password;
    });
    this.__defineGetter__("tokenid", function(){
        return tokenid;
    });
    this.__defineGetter__("secret", function(){
        return secret;
    });
    this.__defineGetter__("device", function(){
        return device;
    });
    this.__defineGetter__("expiration", function(){
        return expiration;
    });
    this.__defineGetter__("logged", function(){
        return logged;
    });
    
    //Setters:
    /*
    this.setUsername = function( usernameVal ){
        username = usernameVal;
    };
    this.setPassword = function( passwordVal ){
        password = passwordVal;
    };*/
    this.__defineSetter__("username", function(val){
        username = val;
    });
    this.__defineSetter__("password", function(val){
        password = val;
    });
    this.__defineSetter__("tokenid", function(val){
        tokenid = val;
    });
    this.__defineSetter__("secret", function(val){
        secret = val;
    });
    this.__defineSetter__("device", function(val){
        device = val;
    });
    this.__defineSetter__("expiration", function(val){
        expiration = val;
    });
    this.__defineSetter__("logged", function(val){
        logged = val;
    });
    
    //View
    this.domLoadPreferences = function( domCheckbox, domUsernameText, domPasswordText ){
        if( kaeptor.ls.select(kaeptor.config.USER_SECRET) == ""
            || kaeptor.ls.select(kaeptor.config.USER_SECRET) == null ){

            domCheckbox.removeAttr('checked').checkboxradio("refresh");
            domUsernameText.removeAttr('disabled');
            domPasswordText.removeAttr('disabled');

        } else {
            domCheckbox.attr('checked','checked').checkboxradio("refresh");
            domUsernameText.attr('disabled','disabled');
            domPasswordText.attr('disabled','disabled');
        }
    };
} 

/******************************************************************************\
| Public:
\******************************************************************************/

