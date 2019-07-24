
let modal = document.getElementById("mSchool");

let btnAddSchool = document.getElementById("btnAddSchool");

let span = document.getElementsByClassName("close")[0];

var json; 
var schoolId;
var edit;
var selection;

function loadJSON(callback) {   
  let xobj = new XMLHttpRequest();
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
    let school = json[i];
    var scId = "sc_tr_"+school.id;

    
    console.log("school > "+scId+"");
    
    x+="<tr id= "+scId+" >"+
        "<td><img class='rounded-circle' src='assets/img/university.png' style='width: 64px;'></td>"+
        "<td>"+school.name+"</td>"+
        "<td>"+school.username+"</td>"+
        "<td>"+school.phone+"</td>"+
        "<td class='text-center'>"+
        "<button id=sc_"+school.id+" class='btn btn-primary scEdit' style='background-color: rgb(45,200,32);' onclick='editSchool("+i+")'>Edit</button>"+
        "</td><td></td>"+
      "</tr>";


   }
   document.getElementById("schoolList").innerHTML = x;
}
 
function checkUsername() {
  let username     = document.getElementById("fUsename").value;
   if (username === "imran") {
     alert("Username "+username+" already exist");
     return false;
   }

   let inPswd     = document.getElementById("fPswd");
   let inConfPaswd = document.getElementById("fConformPswd");

   if(inPswd.value != inConfPaswd.value ){
      alert("Password is not matching!");
      return false;
   }

   registerSchool();

 }
 
function registerSchool() {
  
  let inName     = document.getElementById("fName");
  let inUsername = document.getElementById("fUsename");
  let inPswd     = document.getElementById("fPswd");
  let inPhone    = document.getElementById("fPhone");
  let inEmail    = document.getElementById("fEmail");
  let inAddress  = document.getElementById("fAddress");

  let msg = inName.value+" School Registered Successfully"
  alert(msg);

      if(edit){

        var school = {
          "id":schoolId,
          "name":inName.value,
          "username":inUsername.value,
          "password":inPswd.value,
          "email":inEmail.value,
          "phone":inPhone.value,
          "address":inAddress.value
        }
        

        json[selection] = school;
        var x = "<tr id= sc_tr_"+schoolId+" >"+
            "<td><img class='rounded-circle' src='assets/img/university.png' style='width: 64px;'></td>"+
            "<td>"+school.name+"</td>"+
            "<td>"+school.username+"</td>"+
            "<td>"+school.phone+"</td>"+
            "<td class='text-center'><button id='sc_"+school.id+"' class='btn btn-primary scEdit'  style='background-color: rgb(45,200,32);' onclick='editSchool("+selection+")'>Edit</button></td><td></td>"+
          "</tr>";

          document.getElementById("sc_tr_"+schoolId).innerHTML = x;

          console.log(x);

      }else{
        
        var school = {
          "id":json.length,
          "name":inName.value,
          "username":inUsername.value,
          "password":inPswd.value,
          "email":inEmail.value,
          "phone":inPhone.value,
          "address":inAddress.value
        }
        

        console.log("before add > "+json.length);
        json[json.length] = school;
        console.log("after add > "+json.length);
        var index = json.length-1;



        var x = "<tr id= sc_tr_"+json.length+" >"+
            "<td><img class='rounded-circle' src='assets/img/university.png' style='width: 64px;'></td>"+
            "<td>"+school.name+"</td>"+
            "<td>"+school.username+"</td>"+
            "<td>"+school.phone+"</td>"+
            "<td class='text-center'><button id='sc_"+school.id+"' class='btn btn-primary scEdit'  style='background-color: rgb(45,200,32);' onclick='editSchool("+index+")'>Edit</button></td><td></td>"+
          "</tr>";

        $(x).appendTo("#schoolTable tbody");

        console.log(x);
      }
      modal.style.display = "none";
}
 
$(document).ready(function(){
  loadSchoolList();

  btnAddSchool.onclick = function() {
    document.getElementById("formSchool").reset();

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

function editSchool(position){
  document.getElementById("formSchool").reset();

  console.log(position+" count > "+json.length);

  let school = json[position];

  var scId = "sc_tr_"+school.id+"";    
  console.log("edit > "+scId);

  let inName      = document.getElementById("fName");
  let inUsername  = document.getElementById("fUsename");
  let inPswd      = document.getElementById("fPswd");
  let inConfPaswd = document.getElementById("fConformPswd");
  let inPhone     = document.getElementById("fPhone");
  let inEmail     = document.getElementById("fEmail");
  let inAddress   = document.getElementById("fAddress");

  inName.value          = school.name;
  inUsername.value      = school.username;
  inPswd.value          = school.password;
  inConfPaswd.value     = school.password;
  inPhone.value         = school.phone;
  inEmail.value         = school.email;
  inAddress.value       = school.address;

  edit = true;
  selection = position;

  schoolId = school.id;
  
  modal.style.display = "block";

}

function updateSchool(){


}






