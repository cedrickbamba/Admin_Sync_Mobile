/**
 * Kaeptor API Configuration Component
 */

kaeptor.config  = {
    //URL-------------------------------------------------------------------
    SERVER              : "http://kaeptor.i-brasil.com/kaeptor/api/",//"http://192.168.98.152:8080/kaeptor/api/",
    STATIC_SERVER       : "http://kaeptor.i-brasil.com/",
    CALLBACK            : "jsonpKaeptorCallback",
    AMQCALLBACK         : "jsonpTest",
    AMQURL              : "http://lince.dc.ufscar.br/~arthur/index.php?callback="+this.AMQCALLBACK,
    BROKER              : "http://kaeptor.i-brasil.com/demo/amq",//'http://14bis.i-brasil.com:8161/demo/amq',
    //REST------------------------------------------------------------------
    REST_TYPE           : "GET",
    REST_DATA           : "jsonp",
    //Storage Keys----------------------------------------------------------
    PREFIX              : "kaeptor-storage-",
    CACHE_EXPIRE_DAYS   : 7,
    USER_SECRET         : "kaeptor-storage-user-secret",
    USER_TOKEN          : "kaeptor-storage-user-token",
    USER_EXPIRATION     : "kaeptor-storage-user-expiration",
    USER_BEEP           : "kaeptor-storage-user-beep",
    USER_VIBRATE        : "kaeptor-storage-user-vibrate",
    USER_N10NTIME       : "kaeptor-storage-user-n10ntime",
    USER_N10NREPEAT     : "kaeptor-storage-user-n10nrepeat",
    CHANNEL_EXPIRE_DAYS : 3,
    CHANNEL_EXPIRATION  : "kaeptor-storage-channel-expiration",
    CHANNEL_LIST        : "kaeptor-storage-channel-list",
    SCHEDULE_EXPIRATION : "kaeptor-storage-schedule-expiration",
    //Layout----------------------------------------------------------------
    MAXLISTVIEWED       : 15,
    //Event-----------------------------------------------------------------
    TOKEN_OK            : "kaeptor-event-token-ok",
    TOKEN_ERROR         : "kaeptor-event-token-error",
    //Classes supported-----------------------------------------------------
    SUPPORTED_CLASSES   : { KaeptorChannel:'' }
};