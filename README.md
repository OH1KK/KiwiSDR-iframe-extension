KiwiSDR iframe extension allows you to embed another webpage into KiwiSDR gui

![GUI](https://oh1kk.toimii.fi/iframe-extension/iframe_extension_gui.jpg)
![Settings](https://oh1kk.toimii.fi/iframe-extension/iframe_extension_settings.jpg)


Place files on /root/extensions folder

Modify /root/Beagle_SDR_GPS/extensions/ext.cpp and add iframe extension to ext_register function

````
void ext_register(ext_t *ext)
{
        check(n_exts < N_EXT);
        ext_list[n_exts] = ext;
        if (strcmp(ext->name, "ant_switch") == 0)
            have_ant_switch_ext = true;
        if (strcmp(ext->name, "iframe") == 0)
            have_iframe_ext = true;
        printf("ext_register: #%d \"%s\"\n", n_exts, ext->name);
        n_exts++;
}
````
Modify /root/Beagle_SDR_GPS/main.cpp

add have_iframe_ext

````
bool create_eeprom, need_hardware, no_net, test_flag, sdr_hu_debug, have_ant_switch_ext, have_iframe_ext, gps_e1b_only,
    disable_led_task, is_BBAI;
````

Modify /root/Beagle_SDR_GPS/kiwi.h

add have_iframe_ext

````
extern bool background_mode, need_hardware, no_net, test_flag, is_BBAI,
        DUC_enable_start, rev_enable_start, web_nocache, auth_su, sdr_hu_debug,
        have_ant_switch_ext, have_iframe_ext, gps_e1b_only, disable_led_task, conn_nolocal;
````

then recompile kiwisdr

````
make stop
make
make install
make start
````

