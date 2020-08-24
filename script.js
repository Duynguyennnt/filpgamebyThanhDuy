var dem ;
var count = 60;
var clear1, clear2;
const stick = document.querySelectorAll(".memory-stick") 
var x = document.getElementById("tg");
function start() {
  rd();
  document.getElementById("hidden").innerHTML = "Chơi lại";
  x.style.color = "black";
  settime();
  dem = 0;
  stick.forEach(stick => stick.addEventListener('click', click));
  let frist, second;
  let stickflip = false;
  let lockBoard = false; 
  function click() {
    if (lockBoard)
      return;
    if (this == frist)
      return;
    this.classList.add('flip');
    if (stickflip != true) {
      stickflip = true;
      frist = this;
    } else {
      stickflip = false;
      second = this;
      if (frist.dataset.framework == second.dataset.framework) {
        lockBoard = true;
        dem += 1;
        // console.log(dem);
        console.log(frist.dataset.framework);
        frist.removeEventListener('click', click);
        second.removeEventListener('click', click);               
        setTimeout(function () {        
          frist.style.opacity = "0";
          second.style.opacity = "0"; 
          lockBoard =false;                  
        }, 800);        
      }
      else {
        lockBoard = true;
        setTimeout(function () {
          frist.classList.remove('flip');
          second.classList.remove('flip');
          lockBoard = false;
        }, 800);
      }
    }

  }
}
// xóa lật và hiện images trở lại
function again() {
  stick.forEach(stick => stick.classList.remove('flip'));
  stick.forEach(stick => stick.style.opacity = "1");
}
function checkTimeToWin() {
  clear1 = setInterval(starttimer, 1000);
  clear2 = setInterval(checkwin, 1000)
  count = 60;
}
// set color cho time dưới 10s
function starttimer() {
  count -= 1;
  if (count < 10) {
    x.style.color = "red";
  }
  document.getElementById("time").innerHTML = "Time remaining: " + count;
}
// check win or lose
function checkwin() {

  if (count <= 0) {
    if (dem < 12) {
      alert("you lose");
      settime();
    }
  }
  if (dem == 12) {
    if (count > 0) {
      alert("you win");
      settime();
    }
    else {
      alert("you lose");
      settime();
    }
  }
}
// bỏ kiểm time và win lose
function stoptime() {
  if (count == 0) {
    clearInterval(clear1);
    clearInterval(clear2);
  }
}
// reset
function settime() {
  count = 0;
  stoptime();
  dem =0;
  again();
}
// random ảnh
function rd() {
  stick.forEach(sticks => {
    let radoms = Math.floor(Math.random() * 24);
    sticks.style.order = radoms; 
    console.log(radoms);
  });
}