
let modal = document.getElementById("mRobot");

let btnAddRobot = document.getElementById("btnAddRobot");

let span = document.getElementsByClassName("close")[0];

var json; 
var roboId;
var edit;
var selection;

function loadJSON(callback) {   
  let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', "assets/data/robots.json", true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function loadRoboList() {
    loadJSON(function(response) {
    json = JSON.parse(response);
    console.log(json);
    showList(json);
  });
}

function showList(json){
  let x = "";

  console.log("count > "+json.length);

  for(i in json){
    let robot = json[i];
    var rbId = "rb_tr_"+robot.id;

    console.log("class > "+rbId+"");

    x+= "<div id= rb_tr_"+robot.id+" class='col-sm-4 col-lg-3 col-md-3 col-xl-2' style='margin-bottom: 30px;' onclick='editRobot("+i+")'>"+
              "<div class='card text-nowrap text-truncate text-break d-inline-block'>"+
                "<div class='card-body text-center' style='width: 100%;'><img class='d-xl-flex align-items-xl-center' style='margin: 0 auto;width: 315px;max-width: 100%;' src='assets/img/robo-snow.png'>"+
                  "<h4 class='text-center card-title' style='margin: 15px;'><strong>"+robot.type+"</strong><br></h4>"+
                  "<h6 class='text-center text-muted card-subtitle mb-2'>S/N "+robot.sr_no+"</h6>"+
                "</div>"+
              "</div>"+
        "</div>";

   }

   document.getElementById("roboList").innerHTML = x;
}
  
function saveRobot() {
  
  let inSrNo   = document.getElementById("fSrNo");
  let inType   = document.getElementById("fType");
 

      if(edit){
        var robot = {
          "id":roboId,
          "sr_no":inSrNo.value,
          "type":inType.value,
          "account_id": 1
        }

        json[selection] = robot;
        var x = "<div id= rb_tr_"+robot.id+" class='col-sm-4 col-lg-3 col-md-3 col-xl-2' style='margin-bottom: 30px;' onclick='editRobot("+selection+")'>"+
                  "<div class='card text-nowrap text-truncate text-break d-inline-block'>"+
                    "<div class='card-body text-center' style='width: 100%;'><img class='d-xl-flex align-items-xl-center' style='margin: 0 auto;width: 315px;max-width: 100%;' src='assets/img/robo-snow.png'>"+
                      "<h4 class='text-center card-title' style='margin: 15px;'><strong>"+robot.type+"</strong><br></h4>"+
                      "<h6 class='text-center text-muted card-subtitle mb-2'>S/N "+robot.sr_no+"</h6>"+
                    "</div>"+
                  "</div>"+
                "</div>";
          document.getElementById("cl_tr_"+classId).innerHTML = x;

          console.log(x);

      }else{
        var robot = {
          "id":roboId,
          "sr_no":inSrNo.value,
          "type":inType.value,
          "account_id": 1
        }

        console.log("before add > "+json.length);
        json[json.length] = mClass;
        console.log("after add > "+json.length);
        var index = json.length-1;
 
        var x = "<div id= rb_tr_"+robot.id+" class='col-sm-4 col-lg-3 col-md-3 col-xl-2' style='margin-bottom: 30px;' onclick='editRobot("+index+")'>"+
                  "<div class='card text-nowrap text-truncate text-break d-inline-block'>"+
                    "<div class='card-body text-center' style='width: 100%;'><img class='d-xl-flex align-items-xl-center' style='margin: 0 auto;width: 315px;max-width: 100%;' src='assets/img/robo-snow.png'>"+
                      "<h4 class='text-center card-title' style='margin: 15px;'><strong>"+robot.type+"</strong><br></h4>"+
                      "<h6 class='text-center text-muted card-subtitle mb-2'>S/N "+robot.sr_no+"</h6>"+
                    "</div>"+
                  "</div>"+
                "</div>";

        $(x).appendTo("#classTable tbody");

        console.log(x);
      }
      modal.style.display = "none";
}
 
$(document).ready(function(){
  loadRoboList();

  btnAddRobot.onclick = function() {
    document.getElementById("formRobot").reset();

    edit = false;

    modal.style.display = "block";
 }
 
 btnCancel.onclick = function() {
    modal.style.display = "none";
 }
 
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
});

function editRobot(position){
  document.getElementById("formRobot").reset();

  console.log(position+" count > "+json.length);

  let robot = json[position];

  var clId = "cl_tr_"+robot.id+"";    
  console.log("edit > "+clId);

  let inSrNo   = document.getElementById("fSrNo");
  let inType   = document.getElementById("fType");

  inSrNo.value = robot.sr_no;
  inType.value = robot.type;

  edit = true;
  selection = position;

  roboId = robot.id;
  
  modal.style.display = "block";

}






