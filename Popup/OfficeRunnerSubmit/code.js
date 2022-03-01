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

  var postURL = window.location.href.includes('localhost') ? 'https://localhost:44347/GGDash/postSubmission' : 'https://gamesgalore.azurewebsites.net/GGDash/postSubmission'
  console.log('Post URL: ' + postURL);
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
  window.open(`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fgamesgalorefrontend.azurewebsites.net%2FGGDash%2Fshare%3Ftoken%3D${sharetoken}`);
  //window.open(`https://www.facebook.com/sharer.php?u=gamesgalorefrontend.azurewebsites.net/GGDash/Share?token=HqceX4jppeTclh%2fKo9PMXIKjF3JDTB5FW5wV5dJJA29%2fDCW%2bgX5j6arhn8G14WvQGjWi5tZ5dBYWrio4utSMyaWGQViMzKuPrDb1MPamgbHdRRRA3OssAg0oa82wjyc2k4UqCPlSkywTqT3VjW0vmIwFaCIZFKrRGqsqWwRr0P3DFsscu4YwSpRSEIo5bv%2bVwVF9gQRanQ4eE4u0DWMmsE0fm%2fnI4ZIwBNPcQVPzhHk%3d`);
}

function returnToGame(){
  var modal = document.getElementById("myModal");
  
  modal.style.display = "none";

  document.getElementById("submitframe").src = "";
}

function GetShareUrl(){
  return `https://gamesgalorefrontend.azurewebsites.net/ggDash/share?token=${sessionStorage.getItem('shareToken')}`;
}
