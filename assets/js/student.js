
var modal = document.getElementById("mSchool");

var btnAddSchool = document.getElementById("btnAddSchool");

var btnSave = document.getElementById("btnSave");

var btnCancel = document.getElementById("btnCancel");

var span = document.getElementsByClassName("close")[0];


function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', "assets/data/schools.json", true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function loadSchoolList() {
  var json; 
    loadJSON(function(response) {
    json = JSON.parse(response);
    console.log(json);
    showList(json);
  });
}

function showList(json){
  var x = "";

  console.log("count > "+json.length);

  for(i in json){
    var school = json[i];
     console.log("school > "+school);
      x+="<tr>"+
        "<td><img class='rounded-circle' src='assets/img/university.png' style='width: 64px;'></td>"+
        "<td>"+school.name+"</td>"+
        "<td>"+school.username+"</td>"+
        "<td>"+school.phone+"</td>"+
        "<td class='text-center'><button id='sc_"+school.id+"' class='btn btn-primary scEdit' type='button' style='background-color: rgb(45,200,32);'>Edit</button></td><td></td>"+
      "</tr>";
   }
   console.log(x);
   document.getElementById("schoolList").innerHTML = x;

   jQuery("button.scEdit").click(function(){
    alert("click on > "+this.id);
  });

}
 
function checkUsername() {
   var username     = document.getElementById("fUsename").value;
   if (username === "imran") {
     alert("Username "+username+" already exist");
     return false;
   }
   registerSchool();
 }
 
function registerSchool() {
  
   var inName     = document.getElementById("fName");
   var inUserName = document.getElementById("fUsename");
   var inPswd     = document.getElementById("fPswd");
   var inConfPaswd = document.getElementById("fConformPswd");
   var inPhone    = document.getElementById("fPhone");
   var inEmail    = document.getElementById("fEmail");
   var inAddress  = document.getElementById("fAddress");

   var msg = inName.value+" School Registered Successfully"
   alert(msg);

}
 
$(document).ready(function(){
  loadSchoolList();

  btnAddSchool.onclick = function() {
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






