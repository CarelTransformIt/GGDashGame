var eventMethod = window.addEventListener
			? "addEventListener"
			: "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod === "attachEvent"
  ? "onmessage"
  : "message";


function handleClosePopupMessage(event) {
  modal.style.display = "none";
}

function closeSubmitModal(){
  
  var modal = document.getElementById("myModal");
  
  modal.style.display = "none";

  document.getElementById("submitframe").src = "";
}
