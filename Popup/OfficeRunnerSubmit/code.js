const postURLBase = window.location.href.includes('localhost') ? 'https://localhost:44347/' : 'https://gamesgalore.azurewebsites.net/'

let userName = document.getElementById('name');
let mobileNr = document.getElementById('mobilenr');
let email = document.getElementById('email');

function appendError(message){
  var error = document.getElementById("error-text");
  var errorSpan = document.createElement("span");
  errorSpan.textContent = message;
  error.appendChild(errorSpan);
}

function clearErrors(){
  var error = document.getElementById("error-text");
  error.innerHTML = ``;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateMobile = (mobile) => {
  return String(mobile)
    .toLowerCase()
    .match(
      /^(\+27|0)[6-8][0-9]{8}$/
    );
};

function submitClick(){
  clearErrors();
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  document.getElementById('submit').style = "Transform:scale(0.9);"
  document.getElementById('submit').src='./Images/Bt2.png';
  
  //var userName = document.getElementById("name").value;
  var userNumber = document.getElementById("mobilenr").value;
  var userEmail = document.getElementById("email").value;
  var userAgree = document.getElementById("iagree").checked;
  debugger;

  if(userName == "") {
    appendError("Invalid user name")
    return false;
  }

  if(!validateMobile(userNumber)) {
    appendError("Invalid mobile number")
    return false;
  }
  
  // if(!validateEmail(userEmail))
  // {
  //   appendError("Invalid Email")
  //   return false;
  // }
  if (userAgree == false) {
    appendError("You need to accept the terms and conditions")
    return false;
  }

  var userInfoObject = {
    number: userNumber,
    email: userEmail
  }

  var payloadObject = JSON.parse(sessionStorage.getItem("payload"));

  var objectToSubmit = Object.assign(userInfoObject,payloadObject);

  var postURL = window.location.href.includes('localhost') ? 'https://localhost:44347/GGDash/postSubmission' : 'https://gamesgalore.azurewebsites.net/GGDash/postSubmission'

  $.post(postURL,
    objectToSubmit,
    function(data, status){
      if(data){
        parent.postMessage("CloseSubmitModal", "*");
        sessionStorage.setItem('nickName',data);
        // sessionStorage.setItem('shareToken',data);
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

function returnToGame(){
  var modal = document.getElementById("myModal");
  
  modal.style.display = "none";

  document.getElementById("submitframe").src = "";
}

function GetShareUrl(){
  return `https://gamesgalorefrontend.azurewebsites.net/ggDash/share?token=${sessionStorage.getItem('shareToken')}`;
}

//#region NickName
function NickNamePageMount(){

  //Get nicknames
  $.get( `${postURLBase}/GGDash/getNicknames`, function( data ) {
    
  });

  $.get( `${postURLBase}/GGDash/getNicknames`, function( data ) {
    
  });
}
//#endregion
