/*******************************************************************************
 * Title Class for EPG
 */
function EPGTitles( args ){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var id;
    var pt;
    var en;
    
    /**************************************************************************\ 
    | Constructor:
    \**************************************************************************/
    //Initiate properties
    id     = "-1";
    pt     = "";
    en     = "";
    
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
        if( args.pt ){
            //Arguments setted
            if( args.pt    != ""
                && args.pt != null ){
                //Set attribute
                pt = args.pt;
            }
        }
        if( args.en ){
            //Arguments setted
            if( args.en    != ""
                && args.en != null ){
                //Set attribute
                en = args.en;
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
    this.__defineGetter__("pt", function(){
        return pt;
    });
    this.__defineGetter__("en", function(){
        return en;
    });
    
    //Setters:
    this.__defineSetter__("id", function(val){
        id = val;
    });
    this.__defineSetter__("pt", function(val){
        pt = val;
    });
    this.__defineSetter__("en", function(val){
        en = val;
    });
    
} 

/******************************************************************************\
| Public:
\******************************************************************************/

