/*******************************************************************************
 * Program Class for EPG
 */
function EPGProgram( args ){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var id;
    var titles;
    var genres;
    
    /**************************************************************************\ 
    | Constructor:
    \**************************************************************************/
    
    //Initiate properties
    id         = "-1";
    titles     = new EPGTitles();
    genres     = new Array( new EPGGenre() );
    
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
        if( args.titles != null ){
            //Set attribute
            titles = args.titles;
        }
        if( args.genres != null ){
            //Set attribute
            genres = args.genres;
        }
    }
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    //Getters:
    this.__defineGetter__("id", function(){
        return id;
    });
    this.__defineGetter__("titles", function(){
        return titles;
    });
    this.__defineGetter__("genres", function(){
        return genres;
    });
    
    //Setters:
    this.__defineSetter__("id", function(val){
        id = val;
    });
    this.__defineSetter__("titles", function(val){
        titles = val;
    });
    this.__defineSetter__("genres", function(val){
        genres = val;
    });
    
} 

/******************************************************************************\
| Public:
\******************************************************************************/

