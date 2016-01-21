/*******************************************************************************
 * Schedule info Class for EPG
 */
function EPGSchedule( args ){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var id;
    var begin;
    var end;
    var program;
    var subtitles;
    var synopsis;
    var episode;
    var channel;
    
    /**************************************************************************\ 
    | Constructor:
    \**************************************************************************/
    
    //Initiate properties
    id         = "-1";
    begin      = "0000-00-00T00:00:00Z";
    end        = "0000-00-00T00:00:00Z";
    synopsis   = "";
    episode    = "";
    subtitles  = new EPGSubtitles();
    program    = new EPGProgram();
    channel    = new KaeptorChannel();
    
    //Optional arguments
    if( args ){
        if( args.id ){
            //Arguments setted
            if( args.id    != ""
                && args.id != null ){
                //Set attribute
                id = args.id;
            }
        }
        if( args.begin ){
            //Arguments setted
            if( args.begin    != ""
                && args.begin != null ){
                //Set attribute
                begin = args.begin;
            }
        }
        if( args.end ){
            //Arguments setted
            if( args.end    != ""
                && args.end != null ){
                //Set attribute
                end = args.end;
            }
        }
        if( args.program ){
            //Arguments setted
            if( args.program    != ""
                && args.program != null ){
                //Set attribute
                program = args.program;
            }
        }
        if( args.subtitles != null ){
            //Set attribute
            subtitles = args.subtitles;
        }
        if( args.synopsis ){
            //Arguments setted
            if( args.synopsis    != ""
                && args.synopsis != null ){
                //Set attribute
                synopsis = args.synopsis;
            }
        }
        if( args.episode ){
            //Arguments setted
            if( args.episode    != ""
                && args.episode != null ){
                //Set attribute
                episode = args.episode;
            }
        }
        if( args.channel ){
            //Arguments setted
            if( args.channel    != ""
                && args.channel != null ){
                //Set attribute
                channel = args.channel;
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
    this.__defineGetter__("begin", function(){
        return begin;
    });
    this.__defineGetter__("end", function(){
        return end;
    });
    this.__defineGetter__("program", function(){
        return program;
    });
    this.__defineGetter__("subtitles", function(){
        return subtitles;
    });
    this.__defineGetter__("synopsis", function(){
        return synopsis;
    });
    this.__defineGetter__("episode", function(){
        return episode;
    });
    this.__defineGetter__("channel", function(){
        return channel;
    });
    
    //Setters:
    this.__defineSetter__("id", function(val){
        id = val;
    });
    this.__defineSetter__("begin", function(val){
        begin = val;
    });
    this.__defineSetter__("end", function(val){
        end = val;
    });
    this.__defineSetter__("program", function(val){
        program = val;
    });
    this.__defineSetter__("subtitles", function(val){
        subtitles = val;
    });
    this.__defineSetter__("channel", function(val){
        channel = val;
    });
    this.__defineSetter__("synopsis", function(val){
        synopsis = val;
    });
    this.__defineSetter__("episode", function(val){
        episode = val;
    });
    
} 

/******************************************************************************\
| Public:
\******************************************************************************/

