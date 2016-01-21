/**
 * Kaeptor API View Modifiers Component
 */

kaeptor.view = {
    //Load the default header with nav
    headerNav: function(){
        document.write( "\
<div data-role=\"header\">\
	<h3>\
        Kaeptor\
    </h3>\
    <div data-role=\"navbar\" data-theme=\"a\">\
        <ul>\
            <li><a id=\"mychannel-menu\" href=\"#mychannel-page\" data-icon=\"star\" >Voltou</a></li>\
            <li><a id=\"more-menu\" href=\"#more-page\" data-icon=\"plus\">Mais</a></li>\
            <li><a id=\"epg-menu\" href=\"#epg-page\" data-icon=\"info\">EPG</a></li>\
            <li><a id=\"settings-menu\" href=\"#settings-page\" data-icon=\"gear\">Config</a></li>\
        </ul>\
    </div>\
</div>" );
    },
    //Load the default header
    header: function(){
        document.write( '\
<div data-role="header" data-position="fixed">\
	<h3>\
        Kaeptor\
    </h3>\
</div>' );
    },
    //Load the default header
    headerBack: function(){
        document.write( '\
<div data-role="header" data-position="fixed">\
	<h3>\
            Kaeptor\
        </h3>\
        <a href="#" data-rel="back" data-theme="a">Back</a>\
</div>' );
    },
    //Load the default footer >> data-position="fixed"
    footer: function(){
        document.write( '\
<div data-role="footer">\
    <h3>footer</h3>\
</div>' );
    }
};
