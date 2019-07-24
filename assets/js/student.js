
let modal = document.getElementById("mStudent");

let btnAddStudent = document.getElementById("btnAddStudent");

let span = document.getElementsByClassName("close")[0];

let btnSelectClass = document.getElementById("btnSelectClass");

var json; 
var studnetId;
var edit;
var selection;
var selectedClassName = "";
var selectedClassId;

function getStudents(callback) {   
  let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', "assets/data/students.json", true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function getClasses(callback){
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
    getClasses(function(response) {
    let classes = JSON.parse(response);
    console.log(classes);
 
    let x = "";

    console.log("count > "+classes.length);
    for(i in classes){
      let mClass = classes[i];
    
      x+= '<h6 class="dropdown-item" role="presentation" onClick="showStudentByClass('+mClass.id+",\'" + mClass.name + '\')" >'+mClass.name+"</h6>";
    }

    document.getElementById("menuClassList").innerHTML = x;

  });
}

function loadClassListToAddStudent() {
    getClasses(function(response) {
    let classes = JSON.parse(response);
    console.log(classes);

    let x = "";

    console.log("count > "+classes.length);
    for(i in classes){
      let mClass = classes[i];
    
      x+= '<h6 class="dropdown-item" role="presentation" onClick="selectClassToRegister('+mClass.id+",\'" + mClass.name + '\')" >'+mClass.name+"</h6>";
    }
    document.getElementById("modalClassList").innerHTML = x;

  });
}


function showStudentByClass(id,name){
  console.log(id+" name > "+name);
  let x = "<h4>"+name+"</h4>";
  document.getElementById("selectedClass").innerHTML = x;
}


function loadStudentList() {
    getStudents(function(response) {
    json = JSON.parse(response);
    console.log(json);
    showList(json);
  });
}



function showList(json){
  let x = "";

  console.log("count > "+json.length);
  for(i in json){
    let student = json[i];
    var stId = "st_tr_"+student.id;

    console.log("class > "+stId+"");

    x+=  "<tr id= st_tr_"+student.id+" >"+
          "<td><img class='rounded-circle' src='assets/img/girl.png' style='width: 64px;'></td>"+
          "<td>"+student.first_name+" "+student.last_name+"</td>"+
          "<td>"+student.class_name+"</td>"+
          "<td class='text-center'><button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editStudent("+i+")'>Edit</button></td>"+
          "<td></td>"+
        "</tr>";
   }

   document.getElementById("studentList").innerHTML = x;
}
  
function saveStudent(mForm) {

  mForm.preventDefault();
  
  let inFirstName   = document.getElementById("fFirstName");
  let inLastName    = document.getElementById("fLastName");
  let inRollNumber  = document.getElementById("fRollNumber");
 
  if(selectedClassName == ""){
    alert("Please select Class!");
    return false;
  }

  var x = "";

      if(edit){
        var student = {
          "id":studnetId,
          "first_name":inFirstName.value,
          "last_name":inLastName.value,
          "class_name":selectedClassName,
          "class_id":selectedClassId,
          "account_id":inRollNumber.value,
          "photo":"student.png",
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "status":1
        }

        json[selection] = student;
        
        x =  "<tr id= st_tr_"+student.id+" >"+
                "<td><img class='rounded-circle' src='assets/img/girl.png' style='width: 64px;'></td>"+
                "<td>"+student.first_name+" "+student.last_name+"</td>"+
                "<td>"+student.class_name+"</td>"+
                "<td class='text-center'><button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editStudent("+selection+")'>Edit</button></td>"+
                "<td></td>"+
              "</tr>";

          document.getElementById("st_tr_"+studnetId).innerHTML = x;

          console.log(x);

      }else{
        var student = {
          "id":json.length,
          "first_name":inFirstName.value,
          "last_name":inLastName.value,
          "class_name":"Nursery",
          "account_id":inRollNumber.value,
          "photo":"student.png",
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "status":1
        }

        console.log("before add > "+json.length);
        json[json.length] = student;
        console.log("after add > "+json.length);
        var index = json.length-1;
 
        x =  "<tr id= st_tr_"+student.id+" >"+
              "<td><img class='rounded-circle' src='assets/img/girl.png' style='width: 64px;'></td>"+
              "<td>"+student.first_name+" "+student.last_name+"</td>"+
              "<td>"+student.class_name+"</td>"+
              "<td class='text-center'><button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editStudent("+index+")'>Edit</button></td>"+
              "<td></td>"+
            "</tr>";

        $(x).appendTo("#studentTable tbody");

        console.log(x);
      }
      modal.style.display = "none";
}
 
$(document).ready(function(){
  
  loadClassList();
  loadStudentList();

  btnAddStudent.onclick = function() {
    document.getElementById("formStudent").reset();

    edit = false;
    loadClassListToAddStudent();
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




function selectClassToRegister(id,name){
  console.log(id+" name > "+name);
  //let x = "<h4>"+name+"</h4>";
  
  selectedClassName = name;
  selectedClassId = id;

  document.getElementById("classToRegister").innerHTML = name;
}


function editStudent(position){
  document.getElementById("formStudent").reset();

  loadClassListToAddStudent();

  console.log(position+" count > "+json.length);

  let student = json[position];

  var stId = "st_tr_"+student.id+"";    
  console.log("edit > "+stId);

  let inFirstName   = document.getElementById("fFirstName");
  let inLastName    = document.getElementById("fLastName");
  let inRollNumber  = document.getElementById("fRollNumber");

  inFirstName.value = student.first_name;
  inLastName.value  = student.last_name;
  inRollNumber.value= student.account_id;

  edit = true;
  selection = position;

  studnetId = student.id;
  
  modal.style.display = "block";

}






