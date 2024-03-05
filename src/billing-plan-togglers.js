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

		// Clear Addons
		form.deleteAddOns() 

		// Clear billing plan
		form.billingPlanId = 0
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

		// Clear Addons
		form.deleteAddOns()

		// Clear billing plan
		form.billingPlanId = 0
	}
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