import form from './Data/form-data.js'
import { TotalCost } from './Components/TotalCost.js'
import { Addons } from './Components/Addons.js'
import { BillingPlan } from './Components/BillingPlan.js'
import { validateName, validateEmail, validatePhoneNumber } from './Helpers/validators.js'

// Step Navigation Logic
const progressIndicators = document.querySelectorAll('[data-indicator-status]')
const formSections = Array.from(document.querySelector('#sections-wrapper').children)
const mobileBackBtn = document.querySelector('#mobile-back-btn')
const mobileNextBtn = document.querySelector('#mobile-next-btn')
const mobileConfirmBtn = document.querySelector('#mobile-confirm-btn')
const desktopBackBtn = document.querySelector('#desktop-back-btn')
const desktopNextBtn = document.querySelector('#desktop-next-btn')
const desktopConfirmBtn = document.querySelector('#desktop-confirm-btn')
const optionsAndAddonsSummary = document.querySelector('#options-addons-summary')
const optionErrorTag = document.querySelector('#optionErrorTag')
const totalCostWrapper = document.querySelector('#total-cost-wrapper')

let currentFormSection = 0

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

	// validate current form
	switch (currentFormSection) {
		case 0:
			const name = form.name
			const email = form.email
			const phoneNumber = form.phoneNumber

			try {
				// validate personal info form
				validateName(name)
				validateEmail(email)
				validatePhoneNumber(phoneNumber)
			} catch(e) {
				// show errors
				switch (e.associatedField) {
					case "name":
						setErrorStatus('name', e.message)
						return;
					case "email":
						setErrorStatus('email', e.message)
						return;
					case "phoneNumber":
						setErrorStatus('phoneNumber', e.message)
						return;
					default:
						break;
				}
				return
			}

			break;
		case 1:
			if(form.billingPlanId === 0){
				// show errors
				optionErrorTag.innerText = "Select an option"
				return
			} else {
				// remove errors
				optionErrorTag.innerText = ""
			}
			break;
		case 2:
			// dynamically render summary
			optionsAndAddonsSummary.innerHTML = BillingPlan(form.getBillingPlan())

			optionsAndAddonsSummary.innerHTML += Addons(form.getAddOns())

			let totalCost = form.getBillingPlan().price
			form.getAddOns().forEach(addon => { totalCost += addon.price })
			
			totalCostWrapper.innerHTML = TotalCost(form.getBillingPlan().duration, totalCost)

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

const jumpToStep2 = () => {
	desktopBackBtn.click()
	desktopBackBtn.click()
}

window.jumpToStep2 = jumpToStep2

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
