/**
*   Kaeptor API object:
*/
var kaeptor = {
    /**************************************************************************\ 
    | Initialization:
    \**************************************************************************/
    init        : function( cb_success, cb_before){  
        
        //Init all tables from objects definitions
        kaeptor.channel.init();
        
        //Callback beforeSync
        cb_before();
        /**nop
        //Syncronize persistence layer schema with db
        kaeptor.db.schemaSync(
            function( tx ){
                cb_success( tx );
            }   
        );
        */
    }
    
};

/**
*   Includes API default components:
*/
include( 'js/kaeptor/core/storage.js' );          //Storage component
include( 'js/kaeptor/core/config.js' );           //Configuration component
include( 'js/kaeptor/core/cache.js' );            //Cache component
include( 'js/kaeptor/core/view.js' );             //View modifiers component

/**
*   Includes API controller components:
*/
include( 'js/kaeptor/core/ctrl/channel.js' );     //Channel controller
//include( 'js/kaeptor/core/ctrl/content.js' );     //Content controller
include( 'js/kaeptor/core/ctrl/auth.js' );     //Authentication controller
