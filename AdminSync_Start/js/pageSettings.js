/*******************************************************************************
 * Page Controller for the Settings page Class
 */
function PageSettings(){     
    
    /**************************************************************************\ 
    | Private:
    \**************************************************************************/ 
    var beep;
    var vibrate;
    var n10nTime;
    var n10nRepeat;
    
    /**************************************************************************\ 
    | Constructor / Public Attributes:
    \**************************************************************************/
    beep        = "";
    vibrate     = "";
    n10nTime    = "";
    n10nRepeat  = "";
    
    /**************************************************************************\ 
    | Privileged Methods:
    \**************************************************************************/
    //Getters
    
    //Setters
    
    //Controller
    this.init               = function( args ){
        var token;
        
        //Arguments
        if( args ){
            if( args.beep ){
                //Arguments setted
                if( args.beep    != ""
                    && args.beep != null  ){
                    //Set attribute
                    beep = args.beep;
                }
            }
            if( args.vibrate ){
                //Arguments setted
                if( args.vibrate    != ""
                    && args.vibrate != null  ){
                    //Set attribute
                    vibrate = args.vibrate;
                }
            }
            if( args.n10nTime ){
                //Arguments setted
                if( args.n10nTime    != ""
                    && args.n10nTime != null  ){
                    //Set attribute
                    n10nTime = args.n10nTime;
                }
            }
            if( args.n10nRepeat ){
                //Arguments setted
                if( args.n10nRepeat    != ""
                    && args.n10nRepeat != null  ){
                    //Set attribute
                    n10nRepeat = args.n10nRepeat;
                }
            }
        }
        
        
        console.log( "Bind on Change in form elements" );
        beep.live(
            'change',
            function( event, data ){
                var elem = $(this);
                
                //Save value
                kaeptor.ls.setItem( 
                    kaeptor.config.USER_BEEP, 
                    ((elem.attr("checked") === "checked")?(true):(false))
                );
            }
        );
        vibrate.live(
            'change',
            function( event, data ){
                var elem = $(this);
                
                //Save value
                kaeptor.ls.setItem( 
                    kaeptor.config.USER_VIBRATE, 
                    ((elem.attr("checked") === "checked")?(true):(false))
                );
            }
        );
        n10nTime.live(
            'change',
            function( event, data ){
                var elem = $(this);
                
                //Save value
                kaeptor.ls.setItem( 
                    kaeptor.config.USER_N10NTIME, 
                    ( ($("#"+elem.attr('id')+" option:selected").val() === "short")?(0):(1) )
                );
            }
        );
        n10nRepeat.live(
            'change',
            function( event, data ){
                var elem = $(this);
                
                //Save value
                kaeptor.ls.setItem( 
                    kaeptor.config.USER_N10NREPEAT, 
                    $("#"+elem.attr('id')+" option:selected").val()
                );
            }
        );
        
    };
    this.update     = function(){
        
        //Load data
        var bBeep       = kaeptor.ls.getItem( kaeptor.config.USER_BEEP );
        var bVibrate    = kaeptor.ls.getItem( kaeptor.config.USER_VIBRATE );
        var iN10nTime   = kaeptor.ls.getItem( kaeptor.config.USER_N10NTIME );
        var iN10nRepeat = kaeptor.ls.getItem( kaeptor.config.USER_N10NREPEAT );
        
        //Beep check
        if( bBeep ){
            beep.attr("checked",true).checkboxradio("refresh");
        } else {
            beep.removeAttr("checked").checkboxradio("refresh");
        }
        
        //Vibrate check
        if( bVibrate ){
            vibrate.attr("checked",true).checkboxradio("refresh");
        } else {
            vibrate.removeAttr("checked").checkboxradio("refresh");
        }
        
        //Notification Time
        if( iN10nTime !== ""
            && iN10nTime !== null ){
            $("#"+n10nTime.attr("id")+" option:eq("+iN10nTime+")").attr("selected",true);
            n10nTime.selectmenu("refresh");
        } else {
            $("#"+n10nTime.attr("id")+" option:eq(0)").attr("selected",true);
            n10nTime.selectmenu("refresh");
        }
        
        //Notification Repeat
        if( iN10nRepeat !== "" 
            && iN10nRepeat !== null ){
            $("#"+n10nRepeat.attr("id")+" option:eq("+iN10nRepeat+")").attr("selected",true);
            n10nRepeat.selectmenu("refresh");
        } else {
            $("#"+n10nRepeat.attr("id")+" option:eq(0)").attr("selected",true);
            n10nRepeat.selectmenu("refresh");
        }
        
    };
} 

/******************************************************************************\
| Public:
\******************************************************************************/


