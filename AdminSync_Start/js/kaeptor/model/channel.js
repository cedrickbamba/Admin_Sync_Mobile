/*******************************************************************************
 * Channel Class Model
 */
function KaeptorChannel(){     
    
    
    /**************************************************************************\ 
    | Private Attribute:
    \**************************************************************************/ 
    var id;
    var name;
    var icon;
    var topic;
    var number;
    var monitored;
        
    /**************************************************************************\ 
    | Constructor:
    \**************************************************************************/    
    //Initiate properties
    id        = "-1";
    name      = "";
    icon      = "";
    topic     = "";
    number    = "";
    monitored = "";
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    //Getters
    this.__defineGetter__("id", function(){
        return id;
    });
    this.__defineGetter__("name", function(){
        return name;
    });
    this.__defineGetter__("icon", function(){
        return icon;
    });
    this.__defineGetter__("topic", function(){
        return topic;
    });
    this.__defineGetter__("number", function(){
        return number;
    });
    this.__defineGetter__("monitored", function(){
        return monitored;
    });
    
    //Setters
    this.__defineSetter__("id", function(val){
        id = val;
    });
    this.__defineSetter__("name", function(val){
        name = val;
    });
    this.__defineSetter__("icon", function(val){
        icon = val;
    });
    this.__defineSetter__("topic", function(val){
        topic = val;
    });
    this.__defineSetter__("number", function(val){
        number = val;
    });
    this.__defineSetter__("monitored", function(val){
        monitored = val;
    });
    
} 

/******************************************************************************\
| Public:
\******************************************************************************/