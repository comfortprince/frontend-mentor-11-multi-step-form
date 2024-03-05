export function Addons(addons) {
	let tempStr = 
	`
		<!-- Addons -->
        <div class="py-4 flex flex-col gap-4">
          
	`
	addons.forEach(addon => {
		tempStr += 
		`
			<div class="text-sm flex justify-between">
                <div class="text-cool-gray capitalize">
                  ${ addon.name }
                </div>
                <div class="text-sm text-marine-blue">
                  +$${ addon.price }/${ addon.duration === "yearly" ? 'yr' : 'mo' }
                </div>
            </div>
		`
	})

	tempStr += 
	`
		</div>
	`

	return tempStr
}