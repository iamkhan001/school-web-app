
let modalRobot;

let btnAddRobot;

let spanRobot;

var listRobot; 
var roboId;
var edit;
var selection;

function initRobot(){
  modalRobot = document.getElementById("mRobot");
  btnAddRobot = document.getElementById("btnAddRobot");
  spanRobot= document.getElementsByClassName("close")[0];

  loadRoboList();

  btnAddRobot.onclick = function() {
    document.getElementById("formRobot").reset();

    edit = false;

    modalRobot.style.display = "block";
  }
 
 
 
  spanRobot.onclick = function() {
    modalRobot.style.display = "none";
  }
  
 
}

function getRobotList(callback) {   
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
    getRobotList(function(response) {
    listRobot = JSON.parse(response);
    console.log(listRobot);
    showRobotList(listRobot);
  });
}

function showRobotList(listRobot){
  let x = "";

  console.log("count > "+listRobot.length);

  for(i in listRobot){
    let robot = listRobot[i];
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

        listRobot[selection] = robot;
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

        console.log("before add > "+listRobot.length);
        listRobot[listRobot.length] = mClass;
        console.log("after add > "+listRobot.length);
        var index = listRobot.length-1;
 
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
      modalRobot.style.display = "none";
}
 


function editRobot(position){
  document.getElementById("formRobot").reset();

  console.log(position+" count > "+listRobot.length);

  let robot = listRobot[position];

  var clId = "cl_tr_"+robot.id+"";    
  console.log("edit > "+clId);

  let inSrNo   = document.getElementById("fSrNo");
  let inType   = document.getElementById("fType");

  inSrNo.value = robot.sr_no;
  inType.value = robot.type;

  edit = true;
  selection = position;

  roboId = robot.id;
  
  modalRobot.style.display = "block";

}






