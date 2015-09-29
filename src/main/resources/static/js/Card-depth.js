function shadow(int){
  return "0px "+int/5+"px "+int/3+"px #555"; //shadow equation. accurate to the material design standards (approximately)
}

function update(){
  var list = document.getElementsByClassName("card");

  var len = list.length;
  for(i=0;i<len;i++){
    list[i].style.display="block";
    if(!list[i].hasAttribute("no-margin"))
    	list[i].style.margin="5px";
    if(!list[i].hasAttribute("no-height"))
    	list[i].style.height="auto";
    if(!list[i].hasAttribute("no-transition"))
    	list[i].style.transition=".15s box-shadow";
    if(!list[i].hasAttribute("no-material-border"))
    	list[i].style.borderBottom="1px solid #AAA";
    if(!list[i].hasAttribute("no-padding"))
      list[i].style.padding="10px";
    doDepth(list[i]);
  }
}

function setDepth(int,obj,type){
  if(int==null)
    return
  obj.style.boxShadow = shadow(int);
  if(type==="hover")
  	obj.setAttribute("z",obj.getAttribute("z-hover"));
}

function doDepth(i){
  function ga(x) {return i.getAttribute(x);}

  var zh = ga("z-default") || null;
  var zhc = ga("z-click") || null;
  var zhh = ga("z-hover") || null;
  setDepth(zh,i);

  i.onmouseup   = function(){ setDepth(ga("z"),i)};
  i.onmouseout  = function(){ setDepth(zh,i)};

  i.onmousedown = function(){ setDepth(zhc,i)};
  i.onmouseover = function(){setDepth(zhh,i,"hover")};
}

update();