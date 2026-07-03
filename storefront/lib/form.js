
// Functions related to form validation and form processing.
// Copyright (c) 2001 AllDorm, Inc.

function validRequired(formField,fieldLabel) {
	var result = true;

	if (formField.value == "") {
		alert('"' + fieldLabel + '" is required.');
		formField.focus();
		result = false;
	}
	return result;
}

function validPasswords(formField1, formField2) {
	var result = true;
	
	if (formField1.value == "" || formField2.value == "") {
		alert("Password fields required.");
		formField1.focus();
		return false;
	}
	else if (formField1.value != formField2.value) {
		alert('Passwords do not match.');
		formField1.focus();
		formField1.select();
		result = false;
	}
	return result;
}

function validEmail(formField,fieldLabel,required) {
	var result = true;
	
	if (required && !validRequired(formField,fieldLabel))
		result = false;
	if (result && ((formField.value.length < 3) || !isEmailAddr(formField.value)) ) {
		alert("Please enter a complete email address in the form: yourname@yourdomain.com");
		formField.focus();
		formField.select();
		result = false;
	}
  return result;
}

function validNum(formField,fieldLabel,required) {
	var result = true;
	
	if (required && formField.value == "") {
		alert('"' + fieldLabel + '" is required.');
		formField.focus();
		return false;
	}

	if (formField.value != "") {
 		var num = parseInt(formField.value);
 		if (isNaN(num)) {
 			alert('Please enter a number for the "' + fieldLabel +'" field.');
			formField.focus();
			formField.select();		
			result = false;
		}
	} 
	return result;
}

function validDate(formField,fieldLabel,required) {
	var result = true;
	if (required && !validRequired(formField,fieldLabel))
		result = false;
  
 	if (result) {
 		var elems = formField.value.split("/");
 		
 		result = (elems.length == 3); // should be three components
 		
 		if (result) {
 			var month = parseInt(elems[0]);
  			var day = parseInt(elems[1]);
 			var year = parseInt(elems[2]);
			result = !isNaN(month) && (month > 0) && (month < 13) &&
						!isNaN(day) && (day > 0) && (day < 32) &&
						!isNaN(year) && (elems[2].length == 4);
 		}
 		
  		if (!result) {
 			alert('Please enter a date in the format MM/DD/YYYY for the "' + fieldLabel +'" field.');
			formField.focus();		
		}
	}
	return result;
}

function isEmailAddr(email) {
	var result = false;
	var theStr = new String(email);
	var index = theStr.indexOf("@");
	if (index > 0) {
		var pindex = theStr.indexOf(".",index);
		if ((pindex > index+1) && (theStr.length > pindex+1))
		result = true;
	}
	return result;
}

// AutoFill script to copy all SHIPPING info to BILLING info as well
var bill_street_address = "";
var bill_street_address_2 = "";
var bill_city = "";
var bill_state_index = 0;
var bill_state = "";
var bill_postal_code = "";
var bill_phone = "";

function InitSaveVariables(form) {
	bill_street_address   = form.bill_street_address.value;
	bill_street_address_2 = form.bill_street_address_2.value;
	bill_city 			  = form.bill_city.value;
	bill_postal_code 	  = form.bill_postal_code.value;
	bill_phone		 	  = form.bill_phone.value;
	bill_state_index 	  = form.bill_state.selectedIndex;
	bill_state 			  = form.bill_state[bill_state_index].value;
}

function billToShip(form) {
	if (form.copy.checked) {
		InitSaveVariables(form);
		form.bill_street_address.value	 = form.ship_street_address.value;
		form.bill_street_address_2.value = form.ship_street_address_2.value;
		form.bill_city.value 			 = form.ship_city.value;
		form.bill_postal_code.value 	 = form.ship_postal_code.value;
		form.bill_state.selectedIndex	 = form.ship_state.selectedIndex;
		form.bill_phone.value			 = form.ship_phone.value;
	} 
	else {
		form.bill_street_address.value	 = bill_street_address;
		form.bill_street_address_2.value = bill_street_address_2;
		form.bill_city.value 			 = bill_city;
		form.bill_postal_code.value 	 = bill_postal_code;
		form.bill_state.selectedIndex	 = bill_state_index;
		form.bill_phone.value 	 		 = bill_phone;
		}
}