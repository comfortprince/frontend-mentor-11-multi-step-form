export function validateName(name) {
	if(name === "")
		throw { message: "This field cannot be empty", associatedField: "name" }
}

export function validateEmail(email) {
	let errorObj = { message: "", associatedField: "email" }

	if(email === ""){
		errorObj.message = "This field cannot be empty"
		throw errorObj
	}

	const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailIsValid = emailRegex.test(String(email).toLowerCase());

	if(!emailIsValid){
		errorObj.message = "Invalid email pattern. Try the form username@domain"
		throw errorObj
	}
}

export function validatePhoneNumber(phoneNumber) {
	let errorObj = { message: "", associatedField: "phoneNumber" }

	if(phoneNumber === ""){
		errorObj.message = "This field cannot be empty"
		throw errorObj
	}

	const phoneRegex = /^\+?[\d\s]{6,25}$/;  
  	let phoneIsValid = phoneRegex.test(phoneNumber);

	if(!phoneIsValid){
		errorObj.message = "Invalid phone number. Try the pattern +263 784 988 345"
		throw errorObj
	}
}