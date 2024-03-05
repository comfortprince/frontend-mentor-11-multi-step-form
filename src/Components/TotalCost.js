export function TotalCost(duration, totalCost) {
	let tempStr = 
	`
		<div class="text-sm flex justify-between">
	      <div class="text-cool-gray">
	        Total (per ${duration === "year" ? 'year' : 'month'})
	      </div>
	      <div class="text-lg font-bold text-purplish-blue">
	        +$${totalCost}/${duration === "year" ? 'yr' : 'mo'}
	      </div>
	    </div>
	`

	return tempStr
}