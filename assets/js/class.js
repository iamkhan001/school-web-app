
let modal = document.getElementById("mClass");

let btnAddClass = document.getElementById("btnAddClass");

let span = document.getElementsByClassName("close")[0];

var json; 
var classId;
var edit;
var selection;

function loadJSON(callback) {   
  let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', "assets/data/classes.json", true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function loadClassList() {
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
    let mClass = json[i];
    var clId = "cl_tr_"+mClass.id;

    
    console.log("class > "+clId+"");
    
    x+= "<tr id= cl_tr_"+mClass.id+" >"+
      "<td>"+mClass.name+"</td>"+
      "<td>"+mClass.teacher_name+"</td>"+
      "<td>"+mClass.no_of_students+"</td>"+
      "<td class='text-center'>"+
        "<button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editClass("+i+")'>Edit</button>"+
      "</td>"+
      "<td></td>"+
      "</tr>";

   }
   document.getElementById("classList").innerHTML = x;
}
  
function saveClass() {
  
  let inClassName   = document.getElementById("fClassName");
  let inTeacher     = document.getElementById("fTeacherName");
 

      if(edit){
        var mClass = {
          "id":classId,
          "name":inClassName.value,
          "teacher_name":inTeacher.value,
          "account_id": 123,
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "no_of_students":100,
          "status":1
        }

        json[selection] = mClass;
        var x = "<tr id= cl_tr_"+json.length+" >"+
          "<td>"+mClass.name+"</td>"+
          "<td>"+mClass.teacher_name+"</td>"+
          "<td>"+mClass.no_of_students+"</td>"+
          "<td class='text-center'>"+
            "<button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editClass("+i+")'>Edit</button>"+
          "</td>"+
          "<td></td>"+
          "</tr>";
          document.getElementById("cl_tr_"+classId).innerHTML = x;

          console.log(x);

      }else{
        var mClass = {
          "id":json.length,
          "name":inClassName.value,
          "teacher_name":inTeacher.value,
          "account_id": 123,
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "no_of_students":100,
          "status":1
        }

        console.log("before add > "+json.length);
        json[json.length] = mClass;
        console.log("after add > "+json.length);
        var index = json.length-1;
 
        var x = "<tr id= cl_tr_"+json.length+" >"+
        "<td>"+mClass.name+"</td>"+
        "<td>"+mClass.teacher_name+"</td>"+
        "<td>"+mClass.no_of_students+"</td>"+
        "<td class='text-center'>"+
          "<button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editClass("+index+")'>Edit</button>"+
        "</td>"+
        "<td></td>"+
        "</tr>";

        $(x).appendTo("#classTable tbody");

        console.log(x);
      }
      modal.style.display = "none";
}
 
$(document).ready(function(){
  loadClassList();

  btnAddClass.onclick = function() {
    document.getElementById("formClass").reset();

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

function editClass(position){
  document.getElementById("formClass").reset();

  console.log(position+" count > "+json.length);

  let mClass = json[position];

  var clId = "cl_tr_"+mClass.id+"";    
  console.log("edit > "+clId);

  let inClassName   = document.getElementById("fClassName");
  let inTeacher     = document.getElementById("fTeacherName");

  inClassName.value = mClass.name;
  inTeacher.value   = mClass.teacher_name;

  edit = true;
  selection = position;

  classId = mClass.id;
  
  modal.style.display = "block";

}






