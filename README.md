
iframe extension is merged in to KiwiSDR main code from version KiwiSDR_v1.371. This extension is not needed anymore.
If you have installed iframe extension from this repository, uninstall this extension before upgrading to KiwiSDR >= v1.371. Otherwise your KiwiSDR compile might fail.

THIS EXTENSION IS DEPRECATED AND UNMAINTAINED.

KiwiSDR iframe extension allows you to embed another webpage into KiwiSDR gui

![GUI](https://oh1kk.toimii.fi/iframe-extension/iframe_extension_gui.jpg)
![Settings](https://oh1kk.toimii.fi/iframe-extension/iframe_extension_settings.jpg)


Place github extension files on KiwiSDR's /root/extensions folder

then recompile kiwisdr

````
make stop
make
make install
make start
````

