import billingPlans from './billing-plans.js'
import importedAddons from './add-ons.js'

const form = {
	// properties
	name: '',
	email: '',
	phoneNumber: '',
	billingPlanId: 0,
	addOns: new Set(),

	// methods
	saveAddOnId: function (addOnId) {
		this.addOns.add(addOnId)
	},
	deleteAddOnId: function (addOnId) {
		this.addOns.delete(addOnId)
	},
	deleteAddOns: function () {
		this.addOns = new Set()
	},
	getBillingPlan: function () {
		for (let i = 0; i < billingPlans.length; i++)
			if( this.billingPlanId === billingPlans[i].id )
				return billingPlans[i]

		return null;
	},
	getAddOns: function () {
		let addons = []

		importedAddons.forEach(addon => {
			if( this.addOns.has(addon.id) )
				addons.push(addon)
		});

		return addons
	},
	hasAddOnId: function (addOnId) {
		if( this.addOns.has(addOnId) )
			return true
	}
}

export default form