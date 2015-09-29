$(document).ready(function(){


	$("#divAjudas").hide();
	$("#divAjudando").hide();
    $("#showDivAjudando").click(function(){
        if(document.getElementById('divAjudando').style.display == 'none'){
            $("#divAjudando").show();
            $("#divAjudas").hide();
        }
        else{
           $("#divAjudando").hide();
           $("#divAjudas").hide();
        }
    });
    $("#showDivAjudas").click(function(){
        if(document.getElementById('divAjudas').style.display == 'none'){
            $("#divAjudando").hide();
            $("#divAjudas").show();
        }
        else{
            $("#divAjudas").hide();
            $("#divAjudando").hide();
        }
    });
});