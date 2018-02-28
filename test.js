const NUMBER_OF_FIGHTS = process.env.NUMBER || 1

const f = require('./index.js')

let stats = {
	'con': 0,
	'int': 0,
	'agl': 0,
	'str': 0,
	'wlp': 0
}

// test for level difference
function levelDifferenceTest() {
	let levelDifference = 0
	for(let i=0; i<NUMBER_OF_FIGHTS; i++) {
		const d1 = f.generateRandomDragon(40)
		const d2 = f.generateRandomDragon(42)

		const result = f.fight(d1, d2)
		if(result.winner == 'd1') levelDifference++
	}

	console.log("Level difference", levelDifference)
}

// test for counters
function countersTest() {
	for(let i=0; i<NUMBER_OF_FIGHTS; i++) {
		for(let stat in stats) {
			const d1 = f.generateFocusedDragon(600, stat, 70)
			for(let enemy in stats) {
				const d2 = f.generateFocusedDragon(600, enemy, 70)

				const result = f.fight(d1, d2)

				if(result.winner == 'd1') stats[stat]++
				else if(result.winner == 'd2') stats[enemy]++
			}
		}
	}
	console.log("Counters", stats)
}

// test for balanced dragons
function balanceTest() {
	let resultGraph = ''
	for(let i=1; i<=NUMBER_OF_FIGHTS; i++) {
		const d1 = { con: 10, int: 10, agl: 10, str: i, wlp: 10, lck: 1, level: i+40, terrain: 0 }
		const d2 = { con: i, int: 10, agl: 10, str: 10, wlp: 10, lck: 1, level: i+40, terrain: 0 }

		const result = f.fight(d1, d2)

		if(result.winner == 'd1') resultGraph += '+'
		else if(result.winner == 'draw') resultGraph += 'o'
		else resultGraph += '-'
	}

	console.log("Balanced", resultGraph)
}

levelDifferenceTest()
countersTest()
balanceTest()
