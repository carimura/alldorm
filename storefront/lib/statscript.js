// MODIFY THE FOLLOWING VARIABLES TO WORK WITH ARIEL
var WS_site = 12;

// YOU SHOULD NOT CHANGE ANYTHING BELOW HERE
/////////////////////////////////////////////




// ///////////////
// name - name of the cookie
// value - value of the cookie
// [expires] - expiration date of the cookie (defaults to end of current session)
// [path] - path for which the cookie is valid (defaults to path of calling document)
// [domain] - domain for which the cookie is valid (defaults to domain of calling document)
// [secure] - Boolean value indicating if the cookie transmission requires a secure transmission
// * an argument defaults when it is assigned null as a placeholder
// * a null placeholder is not required for trailing omitted arguments
function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

// name - name of the desired cookie
// * return string containing value of specified cookie or null if cookie does not exist
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

// name - name of the cookie
// [path] - path of the cookie (must be same as path used to create cookie)
// [domain] - domain of the cookie (must be same as domain used to create cookie)
// * path and domain default if assigned null or omitted if no explicit argument proceeds
function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" + 
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// date - any instance of the Date object
// * hand all instances of the Date object to this function for "repairs"
function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}

var WS_rand = Math.random();

var WS_ref = escape(document.referrer);
var WS_visid = getCookie("visid");
var WS_nvisid;
if(!WS_visid){
	// not set yet, so set
	//if(WS_nvisid > 0){
		// create an instance of the Date object
		var WS_inayear = new Date();
		// fix the bug in Navigator 2.0, Macintosh
		fixDate(WS_inayear);
		// cookie expires in one year (actually, 365 days)
		// 365 days in a year
		// 24 hours in a day
		// 60 minutes in an hour
		// 60 seconds in a minute
		// 1000 milliseconds in a second
		WS_nvisid = WS_inayear.getTime() + "_" + WS_rand; // time and rand
		WS_inayear.setTime(WS_inayear.getTime() + 30 * 24 * 60 * 60 * 1000); // only 30 days
		
		setCookie("visid", WS_nvisid, WS_inayear, "/");
		WS_visid = WS_nvisid;
	//}
}

var WS_version; // = parseInt(navigator.appVersion); // use parseFloat to get full version
var WS_navigator; // = escape(navigator.appName);
// navigator.appCodeName // ex: Mozilla
var WS_platform = escape(navigator.platform);

// following from Netscape browser sniffer, trimmed to keep small
 // convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();

    // *** BROWSER VERSION ***
    // Note: On IE5, these return 4, so use is_ie5up to detect IE5.
    var is_major = parseInt(navigator.appVersion);
    var is_minor = parseFloat(navigator.appVersion);

    // Note: Opera and WebTV spoof Navigator.  We do strict client detection.
    // If you want to allow spoofing, take out the tests for opera and webtv.
    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav2 = (is_nav && (is_major == 2));
    var is_nav3 = (is_nav && (is_major == 3));
    var is_nav4 = (is_nav && (is_major == 4));
    var is_nav4up = (is_nav && (is_major >= 4));
    var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) ||
                          (agt.indexOf("; nav") != -1)) );
    var is_nav6 = (is_nav && (is_major == 5));
    var is_nav6up = (is_nav && (is_major >= 5));
    var is_gecko = (agt.indexOf('gecko') != -1);


    var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    var is_ie3    = (is_ie && (is_major < 4));
    var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
    var is_ie4up  = (is_ie && (is_major >= 4));
    var is_ie5    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
    var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
    var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
    var is_ie5_5up =(is_ie && !is_ie3 && !is_ie4 && !is_ie5);
    var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
    var is_ie6up  = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);

    // KNOWN BUG: On AOL4, returns false if IE3 is embedded browser
    // or if this is the first browser window opened.  Thus the
    // variables is_aol, is_aol3, and is_aol4 aren't 100% reliable.
    var is_aol   = (agt.indexOf("aol") != -1);
    var is_aol3  = (is_aol && is_ie3);
    var is_aol4  = (is_aol && is_ie4);
    var is_aol5  = (agt.indexOf("aol 5") != -1);
    var is_aol6  = (agt.indexOf("aol 6") != -1);

    var is_opera = (agt.indexOf("opera") != -1);
    var is_opera2 = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
    var is_opera3 = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
    var is_opera4 = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
    var is_opera5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
    var is_opera5up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);

    var is_webtv = (agt.indexOf("webtv") != -1); 

    var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1)); 
    var is_AOLTV = is_TVNavigator;

    var is_hotjava = (agt.indexOf("hotjava") != -1);
    var is_hotjava3 = (is_hotjava && (is_major == 3));
    var is_hotjava3up = (is_hotjava && (is_major >= 3));
    
if(is_ie3){
	WS_version = 3;
	WS_navigator = "ie";
}
else if(is_ie4){
	WS_version = 4;
	WS_navigator = "ie";
}
else if(is_ie5){
	WS_version = 5;
	WS_navigator = "ie";
}
else if(is_ie6){
	WS_version = 6;
	WS_navigator = "ie";
}
else if(is_nav2){
	WS_version = 2;
	WS_navigator = "nav";
}
else if(is_nav3){
	WS_version = 3;
	WS_navigator = "nav";
}
else if(is_nav4){
	WS_version = 4;
	WS_navigator = "nav";
}
else if(is_nav6){
	WS_version = 6;
	WS_navigator = "nav";
}
else if(is_aol3){
	WS_version = 3;
	WS_navigator = "aol";
}
else if(is_aol4){
	WS_version = 4;
	WS_navigator = "aol";
}
else if(is_aol5){
	WS_version = 5;
	WS_navigator = "aol";
}
else if(is_aol6){
	WS_version = 6;
	WS_navigator = "aol";
}
else if(is_opera2){
	WS_version = 2;
	WS_navigator = "opera";
}
else if(is_opera3){
	WS_version = 3;
	WS_navigator = "opera";
}
else if(is_opera4){
	WS_version = 4;
	WS_navigator = "opera";
}
else if(is_opera5){
	WS_version = 5;
	WS_navigator = "opera";
}
else if(is_webtv){
	WS_version = 0;
	WS_navigator = "webtv";
}
else if(is_hotjava){
	WS_version = 0;
	WS_navigator = "hotjava";
}


var qstr = "&s=" + WS_site + "&ref=" + WS_ref + "&visid=" + WS_visid + "&jsver=" + WS_version + "&jsnav=" + WS_navigator + "&jspl=" + WS_platform;

// ecomm variables
var orderid;
var total; 
var shipping = 0.0;

function arielSetShipping(x){
	shipping = x;
}
function arielSetTotal(x){
	total = x;
}
function arielSetOrderId(x){
	orderid = "" + x;
}

//document.write(qstr);
function statImage(){
	if(total){ // ecomm set
		qstr += "&total=" + total + "&shipping=" + shipping + "&orderid=" + orderid;
	}
	if(document.location.href.substring(0,5) == "https"){
		document.write("<a href=\"http://www.spaceprogram.com/\" target=new><img src=\"https://ariel1.spaceprogram.com/webstats/statimg.jsp?r=" + Math.random() + qstr + "\" border=\"0\" alt=\"Ariel Web Stats by Space Program\"></a>");
	}
	else document.write("<a href=\"http://www.spaceprogram.com/\" target=new><img src=\"http://ariel1.spaceprogram.com/webstats/statimg.jsp?r=" + Math.random() + qstr + "\" border=\"0\" alt=\"Ariel Web Stats by Space Program\"></a>");
}