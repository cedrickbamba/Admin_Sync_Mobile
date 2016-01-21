/*******************************************************************************
 * Genre Class for EPG
 */
function EPGGenre( args ){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var id;
    var name;
    
    /**************************************************************************\ 
    | Constructor:
    \**************************************************************************/
    
    //Initiate properties
    id         = "-1";
    name       = "";
    
    //Arguments
    if( args ){
        if( args.id ){
            //Arguments setted
            if( args.id    != ""
                && args.id != null ){
                //Set attribute
                id = args.id;
            }
        }
        if( args.name ){
            //Arguments setted
            if( args.name    != ""
                && args.name != null ){
                //Set attribute
                name = args.name;
            }
        }
    }
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    //Getters:
    this.__defineGetter__("id", function(){
        return id;
    });
    this.__defineGetter__("name", function(){
        return name;
    });
        
    //Setters:
    this.__defineSetter__("id", function(val){
        id = val;
    });
    this.__defineSetter__("name", function(val){
        name = val;
    });
} 


/******************************************************************************\
| Public:
\******************************************************************************/

