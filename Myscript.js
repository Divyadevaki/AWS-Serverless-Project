// Add your API endpoint here
var API_ENDPOINT = "https://g7ngehn395.execute-api.us-east-1.amazonaws.com/Prod/";

// number validation
$('.Numericvalidate').bind('keypress', function (event) {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.preventDefault();
        }
    });

// text validation
   $('.textvalidate').bind('keypress', function (event) {
        if ((event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122) && (event.keyCode != 32)) {
            event.preventDefault();
        }
    });

// Clear the records
$('#cancelid').click(function(){
	document.getElementById("EmployeeSaved").innerHTML = "";
   $('#employee_id').val('');
   $('#employee_name').val('');
   $('#department').val('');
   $('#salary').val('');
   $('#dob').val('');
});

    function FormValidation() {
    var empid = $('#employee_id').val();
    var empname =  $('#employee_name').val();
    var dept = $('#department').val();
    var salary =  $('#salary').val();
    var dob = $('#dob').val();


        if (empid == "") {
            document.getElementById("EmployeeSaved").innerHTML="Enter the Employee ID";
        } else if (empname == "") {
            document.getElementById("EmployeeSaved").innerHTML="Enter the Employee Name";
        } else if (dept == "") {
            document.getElementById("EmployeeSaved").innerHTML="Enter the Department";
        }else if (salary == "") {
            document.getElementById("EmployeeSaved").innerHTML="Enter the salary";
        } else if (dob == "") {
            document.getElementById("EmployeeSaved").innerHTML="Select the Data of Birth";
        } else{
			 document.getElementById("EmployeeSaved").innerHTML="";
		}       
    }

$('#closebtn').click(function(){
	$('#showEmployee').hide();	
});

// Ajax POST request to save data in Database
 $('#Idsavedata').click(function () {
	 debugger
	 document.getElementById("EmployeeSaved").innerHTML = "";
	 FormValidation();
  var msg = $('#EmployeeSaved').val();
  if( msg==""){
     var inputData = {
        "employee_id": $('#employee_id').val(),
        "employee_name": $('#employee_name').val(),
        "department": $('#department').val(),
        "salary": $('#salary').val(),
		"dob": $('#dob').val(),
    };

    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data:  JSON.stringify(inputData),		
        contentType: 'application/json; charset=utf-8',
        success: function (response) {			
            document.getElementById("EmployeeSaved").innerHTML = "Employee Data Saved!";
        },
        error: function (data) {		
            alert("Error saving Employee data.");
        }
  });
  }
});

// Ajax GET request to Retrive datas from Database
$("#idViewdetails").click(function(){  
	$('#showEmployee').show();	
	document.getElementById("EmployeeSaved").innerHTML = "";
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {			
            $('#EmployeeTable tr').slice(1).remove();
            jQuery.each(response, function(i, data) {          
                $("#EmployeeTable").append("<tr> \
                    <td>" + data['employee_id'] + "</td> \
                    <td>" + data['employee_name'] + "</td> \
                    <td>" + data['department'] + "</td> \
                    <td>" + data['salary'] + "</td> \
					<td>" + data['dob'] + "</td> \
                    </tr>");
            });
        },
        error: function (data) {
            alert("Error retrieving Employee data.");
        }
    });
});
