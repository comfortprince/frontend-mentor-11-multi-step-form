// Step Navigation Logic
const progressIndicators = document.querySelectorAll('[data-indicator-status]')
const formSections = Array.from(document.querySelector('#sections-wrapper').children)
const mobileBackBtn = document.querySelector('#mobile-back-btn')
const mobileNextBtn = document.querySelector('#mobile-next-btn')
const mobileConfirmBtn = document.querySelector('#mobile-confirm-btn')
const desktopBackBtn = document.querySelector('#desktop-back-btn')
const desktopNextBtn = document.querySelector('#desktop-next-btn')
const desktopConfirmBtn = document.querySelector('#desktop-confirm-btn')
const monthlyOptionsCards = Array.from(document.querySelector('#monthly-options').children)
const yearlyOptionsCards = Array.from(document.querySelector('#yearly-options').children)
const monthlyAddonCards = Array.from(document.querySelector('#monthlyAddonsWrapper').children)
const yearlyAddonCards = Array.from(document.querySelector('#yearlyAddonsWrapper').children)
const optionsAndAddonsSummary = document.querySelector('#options-addons-summary')

const personalInfoForm = document.querySelector('#personal-info-form')
personalInfoForm.addEventListener('submit', (e) => e.preventDefault())

const optionErrorTag = document.querySelector('#optionErrorTag')

let currentFormSection = 0

const billingPlans = [
	{
		id: 1,
		name: "arcade",
		price: 9,
		duration: "monthly"
	},
	{
		id: 2,
		name: "advanced",
		price: 12,
		duration: "monthly"
	},
	{
		id: 3,
		name: "pro",
		price: 15,
		duration: "monthly"
	},
	{
		id: 4,
		name: "arcade",
		price: 90,
		duration: "yearly"
	},
	{
		id: 5,
		name: "advanced",
		price: 120,
		duration: "yearly"
	},
	{
		id: 6,
		name: "pro",
		price: 150,
		duration: "yearly"
	},
]

const addOns = [
	{
		id: 1,
		name: "online Service",
		price: 1,
		duration: "monthly"
	},
	{
		id: 2,
		name: "larger Storage",
		price: 2,
		duration: "monthly"
	},
	{
		id: 3,
		name: "customizable Profile",
		price: 2,
		duration: "monthly"
	},
	{
		id: 4,
		name: "online Service",
		price: 10,
		duration: "yearly"
	},
	{
		id: 5,
		name: "larger Storage",
		price: 20,
		duration: "yearly"
	},
	{
		id: 6,
		name: "customizable Profile",
		price: 20,
		duration: "yearly"
	},
]

const form = {
	name: '',
	email: '',
	phoneNumber: '',
	billingPlanId: 0,
	addOns: []
}

mobileBackBtn.addEventListener('click', goToPrevSection)
mobileNextBtn.addEventListener('click', goToNextSection)
desktopBackBtn.addEventListener('click', goToPrevSection)
desktopNextBtn.addEventListener('click', goToNextSection)

desktopConfirmBtn.addEventListener('click', confirm)
mobileConfirmBtn.addEventListener('click', confirm)

function confirm () {
	const desktopNavSection = document.querySelector('#desktop-nav-section')
	const mobileNavSection = document.querySelector('#mobile-nav-section')
	const formSection = document.querySelector('#form-section')

	// Hide Desktop Nav Section
	desktopNavSection.classList.toggle('md:flex')

	// Hide Mobile Nav Section
	mobileNavSection.classList.toggle('flex')
	mobileNavSection.classList.toggle('hidden')

	formSection.classList.toggle('pb-12')

	// Go to next section
	currentFormSection++
	changeSection()
}

function goToNextSection() {
	if(onlastSection())
		return

	console.log(currentFormSection)

	// validate current form
	switch (currentFormSection) {
		case 0:
			const name = personalInfoForm.name.value
			const email = personalInfoForm.email.value
			const phoneNumber = personalInfoForm.phoneNumber.value

			// try {
			// 	// validate personal info form
			// 	validateName(name)
			// 	validateEmail(email)
			// 	validatePhoneNumber(phoneNumber)
			// } catch(e) {
			// 	// show errors
			// 	switch (e.associatedField) {
			// 		case "name":
			// 			setErrorStatus('name', e.message)
			// 			return;
			// 		case "email":
			// 			setErrorStatus('email', e.message)
			// 			return;
			// 		case "phoneNumber":
			// 			setErrorStatus('phoneNumber', e.message)
			// 			return;
			// 		default:
			// 			break;
			// 	}
			// 	return
			// }

			// save form info
			form.name = name
			form.email = email
			form.phoneNumber = phoneNumber

			break;
		case 1:
			let planId = 0

			monthlyOptionsCards.forEach(card => {
				if(card.getAttribute("data-option-status") === "active")
					planId = Number(card.getAttribute("data-option-id"))
			})

			yearlyOptionsCards.forEach(card => {
				if(card.getAttribute("data-option-status") === "active")
					planId = Number(card.getAttribute("data-option-id"))
			})

			if(planId === 0){
				// show errors
				optionErrorTag.innerText = "Select an option"
				return
			} else {
				// remove errors
				optionErrorTag.innerText = ""
			}

			// save plan id
			form.billingPlanId = planId

			break;
		case 2:
			monthlyAddonCards.forEach(card => {
				if(card.getAttribute("data-addon-status") === "active")
					if(!form.addOns.includes(Number(card.getAttribute("data-addon-id"))))
						form.addOns.push(Number(card.getAttribute("data-addon-id")))
			})

			yearlyAddonCards.forEach(card => {
				if(card.getAttribute("data-addon-status") === "active")
					if(!form.addOns.includes(Number(card.getAttribute("data-addon-id"))))
						form.addOns.push(Number(card.getAttribute("data-addon-id")))
			})

			// dynamically render summary
			let billingPlan = billingPlans[form.billingPlanId - 1]
			
			optionsAndAddonsSummary.innerHTML = 	
			`
				<!-- Selected Option -->
	            <div class="text-sm flex items-center justify-between border-b border-b-light-gray py-4">
	              <div class="flex flex-col justify-start">
	                <span class="font-bold text-marine-blue capitalize">
	                  ${billingPlan.name} (${billingPlan.duration})
	                </span>
	                <div>
	                  <button id="change-options-btn" class="text-cool-gray underline">
	                    Change
	                  </button>
	                </div>
	              </div>
	              <div class="font-bold text-marine-blue">
	                $${billingPlan.price}/${billingPlan.duration === "year" ? 'yr' : 'mo' }
	              </div>
	            </div>
			`

			let tempStr = 
			`
				<!-- Addons -->
                <div class="py-4 flex flex-col gap-4">
                  
			`
			form.addOns.forEach(addonId => {
				let addonObj = addOns[addonId - 1]
				tempStr += 
				`
					<div class="text-sm flex justify-between">
	                    <div class="text-cool-gray capitalize">
	                      ${ addonObj.name }
	                    </div>
	                    <div class="text-sm text-marine-blue">
	                      +$${ addonObj.price }/${ addonObj.duration === "year" ? 'yr' : 'mo' }
	                    </div>
	                </div>
				`
			})

			tempStr += 
			`
				</div>
			`

			optionsAndAddonsSummary.innerHTML += tempStr
		
			break;
		default:
			break;
	}

	// Go to next section
	currentFormSection++
	changeSection()
	updateIndicators()

	// show back button
	showBackBtn()

	if(onlastSection()){
		hideNextBtn()
		showConfirmBtn()
	} else {
		showNextBtn()
		hideConfirmBtn()
	}
}

function setErrorStatus(fieldId, errorMessage) {
	document.querySelectorAll(`.${fieldId}ErrorTags`).forEach( errorTag => {
		errorTag.innerText = errorMessage
		errorTag.setAttribute("data-field-status", "error")
	} );
	document.getElementById(fieldId).setAttribute("data-field-status", "error")
}

function removeErrorStatus(fieldId) {
	document.querySelectorAll(`.${fieldId}ErrorTags`).forEach( errorTag => {
		errorTag.innerText = ""
		errorTag.setAttribute("data-field-status", "")
	} );
	document.getElementById(fieldId).setAttribute("data-field-status", "")
}

// personal info validation methods
function validateName(name) {
	if(name === "")
		throw { message: "This field cannot be empty", associatedField: "name" }
}

function validateEmail(email) {
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

function validatePhoneNumber(phoneNumber) {
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

function personalInfoFormIsValid() {

}

function goToPrevSection() {
	if(onfirstSection())
		return

	// Go to previous section
	currentFormSection--
	changeSection()
	updateIndicators()

	if(onfirstSection())
		hideBackBtn()

	if(!onlastSection()) {
		showNextBtn()
		hideConfirmBtn()
	}
}

function showConfirmBtn() {
	if(mobileConfirmBtn.classList.contains('hidden')) {
		mobileConfirmBtn.classList.toggle('hidden')
		desktopConfirmBtn.classList.toggle('hidden')
	}
}

function hideConfirmBtn() {
	if(!mobileConfirmBtn.classList.contains('hidden')) {
		mobileConfirmBtn.classList.toggle('hidden')
		desktopConfirmBtn.classList.toggle('hidden')
	}
}

function showNextBtn() {
	if(mobileNextBtn.classList.contains('invisible')) {
		mobileNextBtn.classList.toggle('invisible')
		desktopNextBtn.classList.toggle('invisible')
	}
}

function hideNextBtn() {
	if(!mobileNextBtn.classList.contains('invisible')) {
		mobileNextBtn.classList.toggle('invisible')
		desktopNextBtn.classList.toggle('invisible')
	}
}

function showBackBtn() {
	if(mobileBackBtn.classList.contains('invisible')) {
		mobileBackBtn.classList.toggle('invisible')
		desktopBackBtn.classList.toggle('invisible')
	}
}

function hideBackBtn() {
	if(!mobileBackBtn.classList.contains('invisible')) {
		mobileBackBtn.classList.toggle('invisible')
		desktopBackBtn.classList.toggle('invisible')
	}
}

function toggleBackBtn() {
	mobileBackBtn.classList.toggle('invisible')
	desktopBackBtn.classList.toggle('invisible')
}

function changeSection() {
	formSections.forEach( formSection => {
		if( Number(formSection.dataset.index) === currentFormSection )
			formSection.setAttribute('data-form-sect-status', 'active')
		else
			formSection.setAttribute('data-form-sect-status', '')
	});
}

function updateIndicators() {
	progressIndicators.forEach( progressIndicator => {
		if( Number(progressIndicator.dataset.index) === currentFormSection )
			progressIndicator.setAttribute('data-indicator-status', 'active')
		else
			progressIndicator.setAttribute('data-indicator-status', '')
	});
}

function onfirstSection() { return currentFormSection === 0 }

function onlastSection() { return currentFormSection === 3 }

// Plans Toggler
const monthlyOptionsToggler = document.querySelector('#monthly-options-toggler')
const yearlyOptionsToggler = document.querySelector('#yearly-options-toggler')
const monthlyOptionsWrapper = document.querySelector('#monthly-options')
const yearlyOptionsWrapper = document.querySelector('#yearly-options')
const monthlyAddonsWrapper = document.querySelector('#monthlyAddonsWrapper')
const yearlyAddonsWrapper = document.querySelector('#yearlyAddonsWrapper')

monthlyOptionsToggler.addEventListener('click', () => {
	if (monthlyOptionsWrapper.getAttribute('data-option-status') !== "active"){
		// Show Monthly Options
		monthlyOptionsWrapper.setAttribute('data-option-status', 'active')
		monthlyAddonsWrapper.setAttribute('data-option-status', 'active')
		monthlyOptionsToggler.setAttribute('data-option-status', 'active')
		
		// Hide Yearly Options
		yearlyOptionsWrapper.setAttribute('data-option-status', '')
		yearlyOptionsToggler.setAttribute('data-option-status', '')

		// Hide Yearly Addons
		yearlyAddonsWrapper.setAttribute('data-option-status', '')		
	}
})

yearlyOptionsToggler.addEventListener('click', () => {
	if (yearlyOptionsWrapper.getAttribute('data-option-status') !== "active"){
		// Show Yearly Options
		yearlyOptionsWrapper.setAttribute('data-option-status', 'active')
		yearlyAddonsWrapper.setAttribute('data-option-status', 'active')
		yearlyOptionsToggler.setAttribute('data-option-status', 'active')
		
		// Hide Monthly Options
		monthlyOptionsWrapper.setAttribute('data-option-status', '')
		monthlyOptionsToggler.setAttribute('data-option-status', '')

		// Hide Monthly Addons
		monthlyAddonsWrapper.setAttribute('data-option-status', '')
	}
})

// Plans Click Event Listeners
monthlyOptionsCards.forEach(card => {
	card.addEventListener('click', () => {
		// Deselect all cards
		monthlyOptionsCards.forEach(_card => {
			_card.setAttribute('data-option-status', '')
		})

		yearlyOptionsCards.forEach(_card => {
			_card.setAttribute('data-option-status', '')
		})

		// Activate the selected card
		card.setAttribute('data-option-status', 'active')
	})
})

yearlyOptionsCards.forEach(card => {
	card.addEventListener('click', e => {
		// Deselect all cards
		monthlyOptionsCards.forEach(_card => {
			_card.setAttribute('data-option-status', '')
		})

		yearlyOptionsCards.forEach(_card => {
			_card.setAttribute('data-option-status', '')
		})

		// Activate the selected card
		card.setAttribute('data-option-status', 'active')
	})
}) 

// Addons Click Event Listeners
monthlyAddonCards.forEach(card => {
	card.addEventListener('click', () => {
		if(card.getAttribute('data-addon-status') === 'active') {
			card.setAttribute('data-addon-status', '')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', '')
			} )
		}else if(card.getAttribute('data-addon-status') !== 'active') {
			card.setAttribute('data-addon-status', 'active')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', 'active')
			} )
		}
	})
})

yearlyAddonCards.forEach(card => {
	card.addEventListener('click', e => {
		if(card.getAttribute('data-addon-status') === 'active') {
			card.setAttribute('data-addon-status', '')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', '')
			} )
		}else if(card.getAttribute('data-addon-status') !== 'active') {
			card.setAttribute('data-addon-status', 'active')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', 'active')
			} )
		}
	})
})

/*
	Francis Mawindi Advice
		Networking is indispensible
		Fit into the culture
		Soft skills

		If you want to transition from technical side into management:
			Get an MBA

		I have a network of venture capitalists who can help you get your project of the ground
		If you have a good business case, you can reach out

	Lawrence Mutenda Advice
		Network
		Update Your Skills / Read Extensively 
		Workhard (Very Hard)
		Apply to a lot of institutes outside Zimbabwe
		Apply to many scholarships
		Use online resources
		Get your hands on any qualification that you can get
		Network

		If you want to get into finance
			Get a CFA
			I have a CFA level 1
			I have a CFA level 2
			What is a CFA

		Be the best at whatever you do
		Network

		Hone your software development skills mainly because you can make 
		money from it and yet its capital light

	Max Dondo Advice
	
	Hillary Mangwanya
		Network

	Stan
		There are individuals doing consulting for MNCs who are situated in Harare

	Sam
		Update your knowledge
		Upgrade your soft skills ( Be a team player, Company culture, Develop interpersonal skills )
		Don't have a sense of entitlement

*/