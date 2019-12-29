// Copyright (c) 2020 Kari Karvonen, OH1KK

var iframe_ext_name = 'iframe';      // NB: must match iframe.c:iframe_ext.name
var iframe_first_time = true;
var iframe_poll_interval;
var iframe_data_canvas;
var iframe_title = ext_get_cfg_param_string('iframe.title', '', EXT_NO_SAVE);
var iframe_help = ext_get_cfg_param_string('iframe.help', '', EXT_NO_SAVE);
var iframe_url = ext_get_cfg_param_string('iframe.url', '', EXT_NO_SAVE);
var iframe_width = ext_get_cfg_param_string('iframe.width', '', EXT_NO_SAVE);
var iframe_height = ext_get_cfg_param_string('iframe.height', '', EXT_NO_SAVE);

function iframe_main()
{
   ext_switch_to_client(iframe_ext_name, iframe_first_time, iframe_recv);     // tell server to use us (again)
   if (!iframe_first_time) iframe_controls_setup();
   iframe_first_time = false;
}

var iframe_cmd_e = { CMD1:0 };

function iframe_recv(data)
{
   var firstChars = arrayBufferToStringLen(data, 3);
   
   // process data sent from server/C by ext_send_data_msg()
   if (firstChars == "DAT") {
      var ba = new Uint8Array(data, 4);
      var cmd = ba[0];

      if (cmd == iframe_cmd_e.CMD1) {
         // do something ...
      } else {
         console.log('iframe_recv: DATA UNKNOWN cmd='+ cmd +' len='+ (ba.length-1));
      }
      return;
   }
   
   // process command sent from server/C by ext_send_msg() or ext_send_encoded_msg()
   var stringData = arrayBufferToString(data);
   var params = stringData.substring(4).split(" ");

   for (var i=0; i < params.length; i++) {
      var param = params[i].split("=");

      switch (param[0]) {

         case "ready":
            iframe_controls_setup();
            break;
         default:
            console.log('iframe_recv: UNKNOWN CMD '+ param[0]);
            break;
      }
   }
}

function iframe_controls_setup()
{
   /* sanity checks */
   iframe_width=parseInt(iframe_width);
   iframe_height=parseInt(iframe_height);
   var iframe_margin=26; 
   if (iframe_width<=0) iframe_width=450;
   if (iframe_height<=0) iframe_height=450;
   if (iframe_help == null) iframe_help='';
   if (iframe_url == null) iframe_url='/gfx/kiwi-with-headphones.51x67.png';
   if (iframe_title == null) iframe_title='iframe extension';
   console.log("iframe_url="+iframe_url+" title="+iframe_title+" width="+iframe_width+" height="+iframe_height+" help="+iframe_help);
  
   var data_html =
      '<div id="id-iframe-data"></div>';
   var controls_html =
      w3_div('id-ant_display-controls w3-text-white', '',
         data_html,
            w3_div('w3-container',
                 w3_div('', '<b>'+iframe_title+'</b>'),
                     w3_div('', '','<iframe src="'+iframe_url+'" style="width: '+(iframe_width)+'px; height: '+(iframe_height)+'px; border: 0;"></iframe>'),
                     w3_div('', '','')
            )
      );

   ext_panel_show(controls_html, null, null);
   iframe_data_canvas = w3_el('id-iframe-data-canvas');
   ext_set_controls_width_height((iframe_width+iframe_margin), (iframe_height+iframe_margin));
}

function iframe_blur()
{
   kiwi_clearInterval(iframe_poll_interval);
   console.log('### iframe_blur');
}

// called to display HTML for configuration parameters in admin interface
function iframe_config_html()
{
   ext_admin_config(iframe_ext_name, 'iframe',
      w3_div('id-iframe w3-text-teal w3-hide', '', '<b>iframe extension configuration</b>' + '<hr>' +
         w3_div('',
           w3_input_get_param('Title text', 'iframe.title', 'w3_string_set_cfg_cb', ''),
           w3_input_get_param('URL', 'iframe.url', 'w3_string_set_cfg_cb', ''),
           w3_input_get_param('Window width', 'iframe.width', 'w3_string_set_cfg_cb', ''),
           w3_input_get_param('Window height', 'iframe.height', 'w3_string_set_cfg_cb', ''),
           w3_input_get_param('Help text', 'iframe.help', 'w3_string_set_cfg_cb', '')
         ), '', ''
      )
   );
}

function iframe_help(show)
{
   if (show) {
      var s = 
         w3_text('w3-medium w3-bold w3-text-aqua', iframe_title) +
         '<br>'+iframe_help+'';
      confirmation_show_content(s, 610, 125);
   }
   return true;
}
