const myNameEl=document.getElementById("myName");
const clockEl = document.getElementById("myClock");

let myName = prompt("Enter your name");
myName
 ?myNameEl.innerHTML=myName.toUpperCase().toString()
 : myNameEl.innerHTML= "No Name"

window.addEventListener("load", function () {
  startTime();
});


function startTime() {
 const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  let d = days[today.getDay()]
  m = checkTime(m);
  s = checkTime(s);
  clockEl.innerHTML = h + ":" + m + ":" + s+ " "+d;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

