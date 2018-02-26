const DEBUG = process.env.DEBUG || false //eslint-disable-line
const STATS = [ 'con', 'int', 'agl', 'str', 'wlp', 'lck' ]

const BLANK_DRAGON = {
	level: 0,
	terrain: 0,
	con: 1,
	int: 1,
	agl: 1,
	str: 1,
	wlp: 1,
	lck: 1
}

module.exports = {
	generateRandomDragon: function(level, terrain) {
		let dragon = Object.assign({}, BLANK_DRAGON)
		dragon.level = level
		dragon.terrain = terrain || 0
		
		for(let i=0; i<level; i++) {
			let j = Math.floor(Math.random() * 6)
			dragon[STATS[j]]++
		}

		if(DEBUG) console.log(dragon)

		return dragon
	},
	generateFocusedDragon: function (level, ability, howFocused, terrain) {
		if(!STATS.includes(ability)) return false

		let dragon = Object.assign({}, BLANK_DRAGON)
		let customStats = Object.assign([], STATS)
		dragon.level = level
		dragon.terrain = terrain || 0

		let index = customStats.findIndex(el => el === ability)
		customStats.splice(index, 1)

		for(let i=0; i<level; i++) {
			if(Math.random() < howFocused / 100) {
				dragon[ability]++
			}
			else {
				let j = Math.floor(Math.random() * 5)
				dragon[customStats[j]]++
			}
		}

		if(DEBUG) console.log(dragon)

		return dragon
	},
	fight: function(D1, D2) {
		let d1hp = D1.level * 10 + (D1.con * 5)
		let d2hp = D2.level * 10 + (D2.con * 5)

		if(DEBUG) console.log('COMBAT START')
		if(DEBUG) console.log(`HP: D1 [ ${d1hp} ] D2 [ ${d2hp} ]`)
		const d1strco = ( D1.str / ( D1.str + D2.str ) ) * 6
		const d2strco = ( D2.str / ( D1.str + D2.str ) ) * 6

		const d1intco = ( D1.int / ( D1.int + D2.int ) ) * 6
		const d2intco = ( D2.int / ( D1.int + D2.int ) ) * 6

		const d1bonus = ( D1.wlp / D2.agl ) * 2 
		const d2bonus = ( D2.wlp / D1.agl ) * 2

		if(DEBUG) console.log(`STR: D1 [ ${d1strco} ] D2 [ ${d2strco} ]`)
		if(DEBUG) console.log(`INT: D1 [ ${d1intco} ] D2 [ ${d2intco} ]`)
		if(DEBUG) console.log(`BONUS: D1 [ ${d1bonus} ] D2 [ ${d2bonus} ]`)

		let phase = 0

		let type // true = melee

		if(Math.random() > .5) {
			type = true
		}
		else type = false
		let result = {
			phases: []
		}

		while(d1hp > 0 && d2hp > 0) {
			if(DEBUG) console.log('')
			if(DEBUG) console.log(`PHASE ${phase} - ${type ? 'MELEE' : 'MAGIC'}`)

			let d1 = 0
			let d2 = 0

			const d1die = Math.random() * 10
			const d2die = Math.random() * 10

			if(DEBUG) console.log(`DICE: D1 [ ${d1die} ] D2 [ ${d2die} ]`)

			d1 = d1die
			d2 = d2die

			if(type) {
				d1 += d1strco
				d2 += d2strco
			}
			else {
				d1 += d1intco
				d2 += d2intco
			}

			if(DEBUG) console.log(`DAMAGE: D1 [ ${d1} ] D2 [ ${d2} ]`)

			d1hp -= (d2 * d2bonus) * (D2.level / 10)
			d2hp -= (d1 * d1bonus) * (D1.level / 10)

			result.phases.push({ type, d1, d2, d1die, d2die })

			if(DEBUG) console.log(`HP:   D1 [ ${d1hp} ] D2 [ ${d2hp} ]`)

			phase++
			type = !type
		}

		if(d1hp <= 0 && d2hp <= 0) {
			if(DEBUG) console.log('DRAW')
			result.winner = 'draw'
		}
		else if(d1hp <= 0) {
			if(DEBUG) console.log('D2 WINS')
			result.winner = 'd2'
		}
		else {
			if(DEBUG) console.log('D1 WINS')
			result.winner = 'd1'
		}

		return result
	}
}
