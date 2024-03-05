export function BillingPlan(billingPlan) {
	let str = 
	`
		<!-- Selected Option -->
        <div class="text-sm flex items-center justify-between border-b border-b-light-gray py-4">
          <div class="flex flex-col justify-start">
            <span class="font-bold text-marine-blue capitalize">
              ${billingPlan.name} (${billingPlan.duration})
            </span>
            <div>
              <button onclick='jumpToStep2()'' id="change-options-btn" class="text-cool-gray underline">
                Change
              </button>
            </div>
          </div>
          <div class="font-bold text-marine-blue">
            $${billingPlan.price}/${billingPlan.duration === "yearly" ? 'yr' : 'mo' }
          </div>
        </div>
	`

	return str
}