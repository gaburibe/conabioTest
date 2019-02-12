
// $(document).ready(function() {
    
// });
function getG2 (){
	$.ajax({
        type: "GET",
        url: "enegramas/n3_nostop.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
}
function getG1 (){
	$.ajax({
        type: "GET",
        url: "enegramas/n2_nostop.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
}
$( "#dosene" ).click(function() {
	getG1();
  	$("#dosene").css("border-bottom","solid");
  	$("#tresene").css("border-bottom","solid 0px");
});
$( "#tresene" ).click(function() {
	getG2();
  	$("#tresene").css("border-bottom","solid");
  	$("#dosene").css("border-bottom","solid 0px")
});


