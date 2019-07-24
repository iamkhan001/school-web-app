
var json; 
var selectedDate = "";

function loadJSON(callback) {   
  let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', "assets/data/health.json", true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function loadHealthRecords() {
    loadJSON(function(response) {
    json = JSON.parse(response);
    console.log(json);
    showList(json);
  });
}

function showList(json){
  let x = "";

  console.log("count > "+json.length);
  let temerature = json.temerature;
  for(i in temerature){
    let health = temerature[i];
    
    x+= " <tr>"+
            "<td><img class='rounded-circle' src='assets/img/girl.png' style='width: 64px;'></td>"+
            "<td>"+health.first_name+" "+health.last_name+"</td>"+
            "<td>"+health.class_name+"</td>"+
            "<td>"+health.tempertaure+"</td>"+
            "<td>"+health.created_at+"</td>"+
          "</tr>"

   }

   document.getElementById("countNormal").innerHTML = json.normal;
   document.getElementById("countFever").innerHTML = json.fever;
   document.getElementById("countHyperthermia").innerHTML = json.hyperthermia;
   document.getElementById("countHypothermia").innerHTML = json.hepothermia;
   
   document.getElementById("heathRecords").innerHTML = x;
   
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
  
    x+= '<h6 class="dropdown-item" role="presentation" onClick="showRecordsByClass('+mClass.id+",\'" + mClass.name + '\')" >'+mClass.name+"</h6>";
  }

  document.getElementById("menuClassList").innerHTML = x;

});
}

function showRecordsByClass(id,name){
  console.log(id+" name > "+name);
  let x = "<h4>"+name+"</h4>";
  document.getElementById("selectedClass").innerHTML = x;
}

$(document).ready(function(){
  loadHealthRecords(); 
  loadClassList();

 
  $('#mDatePicker').datepicker({ dateFormat: 'd M, y',  maxDate: 0});
 
  $("#mDatePicker").on("change",function(){  
    selectedDate = $(this).val();  
    console.log("date > "+selectedDate);
    document.getElementById("selectedDate").innerHTML = "Date: "+selectedDate;
  }); 


});

