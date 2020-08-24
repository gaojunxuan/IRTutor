function load(file) {
  const jmolInfo = {
    height: 160,
    width: 160,
    debug: false,
    color: "white",
    addSelectionOptions: false,
    use: "HTML5",
    coverImage: "https://a.fsdn.com/allura/p/jmol/icon?1520184400?&w=180",        // initial image instead of applet
    coverScript: "",	// special script for click of cover image (otherwise equal to script)
    deferApplet: false,                  // wait to load applet until click
    deferUncover: false,                 // wait to uncover applet until script completed
    //The paths below assume your server is set up with standard JSmol directory.  If not
    //they will need modification for the page to work.
    jarPath: "https://chemapps.stolaf.edu/jmol/jsmol/java", //path to applet .jar files on server.
    j2sPath: "https://chemapps.stolaf.edu/jmol/jsmol/j2s",//path to javascript version.
    serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php", //if your own server does not allow php, you can change to http://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php
    makeLiveImg:"http://chemapps.stolaf.edu/jmol/jsmol/j2s/img/play_make_live.jpg",//path to activate 3-D image.
    isSigned: true,
    //disableJ2SLoadMonitor: true,
    disableInitialConsole: true,
    script: "load ./static/hexane.txt",
    appletLoadingImage: "none",
    disableJ2SLoadMonitor: true
  };
  $("#jsmolContainer").ready(function(){
    var jmol0 = Jmol.getApplet("jmol0", jmolInfo);
    $("#jsmolContainer").html(Jmol.getAppletHtml(jmol0));
    //Jmol.script(jmol0, "frame 4");
    //Jmol.script(jmol0, "vibration ON");
  });
}





