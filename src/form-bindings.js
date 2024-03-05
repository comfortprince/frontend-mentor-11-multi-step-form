import form from './Data/form-data.js'

const monthlyBillingPlanCards = Array.from(document.querySelector('#monthly-options').children)
const yearlyBillingPlanCards = Array.from(document.querySelector('#yearly-options').children)
const monthlyAddonCards = Array.from(document.querySelector('#monthlyAddonsWrapper').children)
const yearlyAddonCards = Array.from(document.querySelector('#yearlyAddonsWrapper').children)

// Stop form submissions
const personalInfoForm = document.querySelector('#personal-info-form')
personalInfoForm.addEventListener('submit', (e) => e.preventDefault())

const nameField = document.querySelector('#name')
const emailField = document.querySelector('#email')
const phoneNumberField = document.querySelector('#phoneNumber')

// save personal info
nameField.addEventListener('input', (e) => {
	form.name = e.target.value
})

emailField.addEventListener('input', (e) => {
	form.email = e.target.value
})

phoneNumberField.addEventListener('input', (e) => {
	form.phoneNumber = e.target.value
})

// save billing plan
monthlyBillingPlanCards.forEach(card => {
	card.addEventListener('click', (e) => {
		const clickedCard = e.currentTarget
		form.billingPlanId = Number(clickedCard.dataset.optionId)
	})
});

yearlyBillingPlanCards.forEach(card => {
	card.addEventListener('click', (e) => {
		const clickedCard = e.currentTarget
		form.billingPlanId = Number(clickedCard.dataset.optionId)
	})
});

// save addons
monthlyAddonCards.forEach(card => {
	card.addEventListener('click', e => {
		const clickedCard = e.currentTarget

		// Toggle the addon cards
		if(clickedCard.getAttribute('data-addon-status') === 'active')
			form.deleteAddOnId(Number(clickedCard.getAttribute('data-addon-id')))
		else if(clickedCard.getAttribute('data-addon-status') !== 'active')
			form.saveAddOnId(Number(clickedCard.getAttribute('data-addon-id')))
	})
});

yearlyAddonCards.forEach(card => {
	card.addEventListener('click', e => {
		const clickedCard = e.currentTarget

		// Toggle the addon cards
		if(clickedCard.getAttribute('data-addon-status') === 'active')
			form.deleteAddOnId(Number(clickedCard.getAttribute('data-addon-id')))
		else if(clickedCard.getAttribute('data-addon-status') !== 'active')
			form.saveAddOnId(Number(clickedCard.getAttribute('data-addon-id')))
	})
});

setInterval(() => {
	// binding form data to billing plan cards
	monthlyBillingPlanCards.forEach(card => {
		if(card.dataset.optionId === String(form.billingPlanId))
			card.setAttribute('data-option-status', 'active')
		else
			card.setAttribute('data-option-status', '')
	});

	yearlyBillingPlanCards.forEach(card => {
		if(card.dataset.optionId === String(form.billingPlanId))
			card.setAttribute('data-option-status', 'active')
		else
			card.setAttribute('data-option-status', '')
	});

	// binding form data to add on cards
	monthlyAddonCards.forEach(card => {
		if(form.hasAddOnId(Number(card.dataset.addonId))){
			card.setAttribute('data-addon-status', 'active')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', 'active')
			} )
		}else{
			card.setAttribute('data-addon-status', '')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', '')
			} )
		}
	});

	yearlyAddonCards.forEach(card => {
		if(form.hasAddOnId(Number(card.dataset.addonId))){
			card.setAttribute('data-addon-status', 'active')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', 'active')
			} )
		}else{
			card.setAttribute('data-addon-status', '')
			Array.from(card.children).forEach( child => {
				if(child.hasAttribute('data-addon-status'))
					child.setAttribute('data-addon-status', '')
			} )
		}
	});
}, 1)