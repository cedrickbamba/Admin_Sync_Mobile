/* 
 * Class to control logger function (console.log)
 */
function LoggerControl(){
    
    var oldConsoleLog = null;

    this.enable  =  function(){
        
        if(oldConsoleLog === null){
            return;
        }

        window['console']['log'] = oldConsoleLog;
        console.log("[logger]{ Console Logger Enabled }");
    };

    this.disable = function(){
        
        console.log("[logger]{ Console Logger Disabled }");
        
        oldConsoleLog = console.log;
        window['console']['log'] = function(){};
        
    };

};

