// All scripts included in lib.js are property of Alldorm, Inc.
// They are private and must NOT be replicated or used in any way.

function OpenWin(Url) {
	helpWnd = open(Url, "helpWindow", "width=320,height=550,status=no,toolbar=no,menubar=no,scrollbars=yes,location=no,directories=no");
}
	
function swapImage() {
  var i,j=0,x,a=swapImage.arguments; 
  document.sr=new Array; 
  for(i=0;i<(a.length-2);i+=3)
   if ((x=findObj(a[i]))!=null){document.sr[j++]=x; 
   if (!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function swapImgRestore() {
  var i,x,a=document.sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function findObj(n, d) {
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

// Preload images at welcome.tpl
function preloadImages() {
  var d=document; if(d.images){ if(!d.p) d.p=new Array();
    var i,j=d.p.length,a=preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.p[j]=new Image; d.p[j++].src=a[i];}}
}

// For the "jump to..." menu
function jumpMenu(targ,selObj,restore){
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

// popup browse window
function popupWindow(URL,window_name,specs) {
  window.open(URL,window_name,specs);
}

// Clears the search text box once the user has clicked into it.
function SearchClear()
{
	if (document.news.email.value == '<Your Email>') 
		document.news.email.value = '';
}	
	
	
