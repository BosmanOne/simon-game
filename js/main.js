//GLOBALS//
var sequence = [];
var level = 0;
var currentStep = 0;
var playerMove = false;
var gameStarted = false;
var strictMode = false;
var colorsNormal = ['#45bb27', '#df2908', '#f0db0f', '#2a8eea'];
var colorsLighted = ['#56e732', '#fd4a29', '#ffec2e', '#55adff'];
initiation();

function initiation(){
  sequence = [];
  level = 0;
  currentStep = 0;
  playerMove = false;
  updateDisplay(level+1);
  for (i=0; i<= 19; i++){
    var rand = Math.floor(Math.random() *4);
    sequence.push(rand);
  }
}

function start(){
  if (gameStarted === false){
    gameStarted = true;
    playSequence();
  }
}


function restart(){
  if (gameStarted === true){
    clearInterval(sequenceHandle);
    playerMove = false;
    initiation();
    gameStarted = false;
  }
}

function strictModeSwitch(){
  if (strictMode === false){
    strictMode = true;
    $("div.strict-mode-display").html('Strict mode: on');
  }else{
    strictMode = false;
    $("div.strict-mode-display").html('Strict mode: off');
  }
}


function buttonClick(btn){
  if (playerMove === true){
    console.log("true");
    var cellId = btn.id;
    var id = cellId.slice(-1);
    console.log(cellId);
    buttonActionOn(cellId);
  }
}
function listener(id){
  playerMove = false;
  if (currentStep < level){
    if (sequence[currentStep] == id){
      currentStep = currentStep+1;
      playerMove = true;
    }else{
      currentStep = 0;
      updateDisplay("WRONG");
      
      if (strictMode === true){
        initiation();
      }
      
      setTimeout(function() {
        playSound(200, 0.4, 0.3);
        playSequence();
      }, 750)
    }
  } else if (currentStep == level){
    if (sequence[currentStep] == id){
      if (level == 19){
        console.log("YOU WIN");
        initiation();
        updateDisplay("WIN");
        setTimeout(function() {
          playSound(1500, 0.5, 0.3);
          updateDisplay(level+1);
          playSequence();
        }, 1500)
      }else{
        console.log("CORRECT");
        currentStep = 0;
        level = level + 1;
        playSequence();
      }
    }else{
      currentStep = 0;
      updateDisplay("WRONG");
      
      if (strictMode === true){
        initiation();
      }
      
      setTimeout(function() {
        playSound(200, 0.4, 0.3);
        playSequence();
      }, 750)
    }
  }

}
function playSequence(){
  var i = 0;
  updateDisplay(level+1);
  sequenceHandle = setInterval(function(){
    playerMove = false;
    buttonActionOn('cell'+sequence[i]);
    console.log("Iteracja: "+i);
    
    if(i == level){
      clearInterval(sequenceHandle);
      setTimeout(function() {
        playerMove = true;
      }, 750)
    }else{
      i++;
    }
    setTimeout(function() {
        buttonActionOff();
      }, 500)
    
  },1000);
};


function buttonActionOn(cellId){
  var id = cellId.slice(-1);
  $('#'+cellId).css("background-color", colorsLighted[id]);
  var freq = 300+(parseInt(id)*100);
  playSound(freq, 0, 0.1)
}

function buttonActionOff(cellId){
  if (playerMove === true){
    var id = cellId.slice(-1);
    listener(id);
    console.log("btn off");
  }
  
  $('#cell0').css("background-color", colorsNormal[0]);
  $('#cell1').css("background-color", colorsNormal[1]);
  $('#cell2').css("background-color", colorsNormal[2]);
  $('#cell3').css("background-color", colorsNormal[3]);
}

function updateDisplay(value){
  $("div.display").html(value);
}

function playSound(freq, dissonance, decay) {
 
  soundEffect(
    freq,       //frequency
    0,         //attack
    decay,          //decay
    "sine",       //waveform
    0.5,            //volume
    0.1,          //pan
    0,            //wait before playing
    10,          //pitch bend amount
    false,         //reverse
    0,          //random pitch range
    dissonance,            //dissonance
    undefined,    //echo array: [delay, feedback, filter]
    undefined     //reverb array: [duration, decay, reverse?]
  );
}
