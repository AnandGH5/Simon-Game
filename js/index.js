$(".btn").prop("disabled",true);
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
var audio = [];
var originalcolour;
var content;
var score=0; 
var colours=["red","blue","green","yellow"];
var start=0;
var EasyHardMod=1;
var modeselect=0; 

audio[0] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
audio[1] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
audio[2] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
audio[3] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

$("#plus").click(function(){
  if(start===1)
    return;
    content=$("#value").html();
    content++;
    var zeroset="";
    if(content<10)
      zeroset="0";
  $("#value").html(zeroset+content);
   navigator.vibrate(100);
});

$("#minus").click(function(){
   if(start===1)
    return;
   content=$("#value").html();
   if(content==1)
     return;
   if(content>=2)
     content--;
   var zeroset="";
   if(content<10)
    zeroset="0";
  $("#value").html(zeroset+content);
   navigator.vibrate(100);
});
  
$("#red").click(function(){
   $(".result").html("");
   audio[0].play();
   simon.getcolour("red")});  

  $("#blue").click(function(){
     $(".result").html("");
     audio[1].play(); 
     simon.getcolour("blue")}); 

  $("#green").click(function(){
     $(".result").html("");
     audio[2].play(); 
     simon.getcolour("green")}); 

  $("#yellow").click(function(){
     $(".result").html("");
     audio[3].play();
     simon.getcolour("yellow")});     

$("#start").click(function(){
    navigator.vibrate(300);
  if(start===1)
    {
      simon.sequence=[];
      simon.step=0;  
      start=0;
      $(".result").html("");
       $(".level").html("0");
      $(".btn").prop("disabled",true);
      $("#start").css("color", "white");
      modeselect=0;
      return;
    }
   $(".result").html("");
   $(".level").html("0");
   simon.nextsequence(); 
   $("#start").css("color", "#FFEB3B");
   start=1;
   modeselect=1;
});     

var simon={
  getcolour:function(colour){
  
    if(start===0)
        return;
    
    if(simon.step===(content-1) && (colour===simon.sequence[simon.step])){
       $(".level").html(simon.sequence.length);
       $(".result").html("Congratulations! You won!");
        navigator.vibrate(300);
       $(".btn").prop("disabled",true);
       simon.sequence=[];
       simon.step=0;  
       start=0;
       modeselect=0;
       $("#start").css("color", "white");
       return; 
    } 
      if(colour===simon.sequence[simon.step]){      
        if(simon.step===simon.sequence.length-1){
           $(".level").html(simon.sequence.length);
            $(".btn").prop("disabled",true);
            simon.step=0;
            simon.nextsequence();
        }
        else
          simon.step++; 
      }  
      else{
        if(!EasyHardMod){
           $(".result").html("Sorry, you lost.");
            navigator.vibrate(300);
           $(".btn").prop("disabled",true);
           simon.sequence=[];
           simon.step=0;  
           start=0;
           modeselect=0;
           $("#start").css("color", "white");
           return;
        }
        else{
           $(".result").html("Wrong, please try again.");
            $(".btn").prop("disabled",true);
            navigator.vibrate(1000);
           simon.step=0;
          setTimeout(function(){
          colourit(simon.sequence.length,simon.sequence,0);},2000);}}}, 
  
  sequence:[],
  
  step:0, 
  
  nextsequence:function(){
    var nextcolour=colours[Math.floor(Math.random()*4)];
    simon.sequence.push(nextcolour);  
    setTimeout(function(){
    colourit(simon.sequence.length,simon.sequence,0);},2000);}};
 
function colourit(flag,sequence,element) {
  if(start===0)
    return;
   $(".btn").prop("disabled",true);
  if(element===0)
    {
     if(sequence[element]==="red")
           audio[0].play();
     else if(sequence[element]==="blue")
           audio[1].play();
     else if(sequence[element]==="green")
           audio[2].play();
     else if(sequence[element]==="yellow")
           audio[3].play();
     setTimeout(function(){
     originalcolour=$("#"+sequence[element]).css("background-color");
     document.getElementById(sequence[element]).style.backgroundColor =sequence[element];
   }, 200);       
     setTimeout(function(){ 
     document.getElementById(sequence[element]).style.backgroundColor = originalcolour;
     }, 500);
  } 
    if(flag>0){
       if(element!==0)
         {
  if(sequence[element]==="red")
           audio[0].play();
  else if(sequence[element]==="blue")
           audio[1].play();
  else if(sequence[element]==="green")
           audio[2].play();
  else if(sequence[element]==="yellow")
           audio[3].play();          
}
      setTimeout(function() {      
      setTimeout(function(){
      originalcolour=$("#"+sequence[element]).css("background-color");
      document.getElementById(sequence[element]).style.backgroundColor =sequence[element];},200); 
      setTimeout(function(){
      document.getElementById(sequence[element]).style.backgroundColor = originalcolour;},500);
      flag=flag-1;
      element++;    
      colourit(flag,sequence,element);}, 1000);
      return;
    }
  if(start===1){
     $(".result").html("Go!");
     $(".btn").prop("disabled",false);
    }
}

function fun(obj){  
  if(modeselect){
   if (!obj.checked) 
      obj.checked=true;
    else 
      obj.checked=false;      
  }
  else{
     navigator.vibrate(300);
EasyHardMod=!EasyHardMod;
  }
}