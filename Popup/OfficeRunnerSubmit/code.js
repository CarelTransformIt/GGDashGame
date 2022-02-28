let userName = document.getElementById('name');
let mobileNr = document.getElementById('mobilenr');
let email = document.getElementById('email');

function submitClick(){
  document.getElementById('submit').style = "Transform:scale(0.9);"
  document.getElementById('submit').src='./Images/Bt2.png';

  var userName = document.getElementById("name").value;
  var userNumber = document.getElementById("mobilenr").value;
  var userEmail = document.getElementById("email").value;

  var userInfoObject = {
    name: userName,
    number: userNumber,
    email: userEmail
  }

  var payloadObject = JSON.parse(sessionStorage.getItem("payload"));

  var objectToSubmit = Object.assign(userInfoObject,payloadObject);

  var postURL = window.location.href.includes('localhost') ? 'https://localhost:44347/GGDash/postSubmission' : ''

  $.post(postURL,
    objectToSubmit,
    function(data, status){
      if(data){
        parent.postMessage("CloseSubmitModal", "*");
        sessionStorage.setItem('shareToken',data);
      }
    }
  );
}

function cancelClick(){
    userName.value = "";
    mobileNr.value = "";
    email.value = "";
    document.getElementById('cancel').style = "Transform:scale(0.9);"
    document.getElementById('cancel').src='./Images/Bt4.png';
    

}

//Mounted
window.onload = (event) => {
  setScore();
};

function setScore(){
  var data = JSON.parse(sessionStorage.getItem("payload"));
  var item = document.getElementById("score-count");
  if(item){
    item.textContent = data.Score;
  }
}

function shareToFacebook(){
  var sharetoken = sessionStorage.getItem('shareToken');
  window.open(`https://www.facebook.com/sharer.php?u=gamesgalorefrontend.azurewebsites.net/GGDash/Share?token=${sharetoken}`);
}

function returnToGame(){
  var modal = document.getElementById("myModal");
  
  modal.style.display = "none";

  document.getElementById("submitframe").src = "";
}
