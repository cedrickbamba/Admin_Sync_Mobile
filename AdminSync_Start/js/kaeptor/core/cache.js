/**
 * Kaeptor API Static Resources Cache Component
 */

kaeptor.cache   = {
    //Fetch image and return base64 string, if necessary update the cache
    image: function( args ){
        var strBase64     = "";     //Return Var
        var imgURL        = "";
        var callSuccess   = function(){};
        var callError     = function(){};
        //Updated check vars
        var objImg        =  new Object();
        var currentDate   = new Date();

        //Arguments
        if( args ){
            if( args.imgURL ){
                //Arguments setted
                if( args.imgURL    != ""
                    && args.imgURL != null  ){
                    //Set var
                    imgURL = args.imgURL;
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
        //console.log( "Requesting a image cache:" );
        //If img array is stored
        if( kaeptor.ls.select( kaeptor.config.PREFIX + imgURL )    != ""
            && kaeptor.ls.select( kaeptor.config.PREFIX + imgURL ) != null ){

            objImg = kaeptor.ls.select( kaeptor.config.PREFIX + imgURL );
            //Img date expiration
            var dateExpiration   = new Date( objImg.expiration );

            //Check if is updated                
            if( currentDate < dateExpiration ){
                strBase64 = objImg.img;

                //Callback
                callSuccess( strBase64 );

                return strBase64;                    
            }
        }
        //Else request the image and cache it
        var img = new Image();

        $(img)
            // once the image has loaded, execute this code
            .load(function () {

                //console.log( "Img to be encoded:" );
                //console.log( this.src );
                //To base64 encode
                var canvas = document.createElement("canvas");
                canvas.width = this.width; 
                canvas.height = this.height;
                //Set canvas
                var ctx = canvas.getContext("2d");
                ctx.drawImage( this, 0, 0 ); 

                //Img to string Base64 URL
                strBase64 = $.canvasToDataURL( canvas );
                //console.log( "Img cache base64:" );
                //console.log( strBase64 );

                //Save img and date expiration (plus CACHE_EXPIRE_DAYS) to a array
                currentDate.setDate( currentDate.getDate() + kaeptor.config.CACHE_EXPIRE_DAYS );
                var objCacheImg = {
                    expiration  : currentDate.toString(),
                    img         : strBase64
                };

                kaeptor.ls.save( kaeptor.config.PREFIX + imgURL, objCacheImg );
                //console.log( "Img cache obj saved:" );
                //console.log( kaeptor.ls.select( kaeptor.config.PREFIX + imgURL ).img );

                //Callback
                callSuccess( strBase64 );

            })
            // if there was an error loading
            .error( function( evt ) {
                console.log( "Cache image error:" );
                console.log( this.src );

                //Save "" to 404 and date expiration (plus a day) to a array
                currentDate.setDate( currentDate.getDate() + 1 );
                var objCacheImg = {
                    expiration  : currentDate.toString(),
                    img         : ""
                };

                kaeptor.ls.save( kaeptor.config.PREFIX + imgURL, objCacheImg );

                //Callback
                callError( evt );

            })
            //set the src attribute of the new image to our image requesting it
            .attr( "src", imgURL )
        ;


        return strBase64;
    }
};