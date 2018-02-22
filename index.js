const D1 = {
	level: 50,
	con: 20,
	int: 20,
	agl: 10,
	str: 60,
	wlp: 0,
	lck: 5,
	terrain: 0
}

const D2 = {
	level: 50,
	con: 20,
	int: 20,
	agl: 10,
	str: 20,
	wlp: 0,
	lck: 5,
	terrain: 0
}

let d1hp = D1.level * (15 + D1.con/15)
let d2hp = D2.level * (15 + D2.con/15)

console.log("COMBAT START")
const d1strco = ((D1.str + D2.str) * 2) / D2.str
const d2strco = ((D1.str + D2.str) * 2) / D1.str

console.log(`STR: D1 [ ${d1strco} ] D2 [ ${d2strco} ]`)

let phase = 1

while(d1hp > 0 && d2hp > 0) {
	console.log("")
	console.log(`PHASE ${phase}`)

	let d1 = 0
	let d2 = 0

	const d1die = Math.random() * 20
	const d2die = Math.random() * 20

	console.log(`DICE: D1 [ ${d1die} ] D2 [ ${d2die} ]`)

	d1 = d1die
	d2 = d2die

	console.log(`DAMAGE: D1 [ ${d1} ] D2 [ ${d2} ]`)

	d1hp -= d2
	d2hp -= d1

	console.log(`HP:   D1 [ ${d1hp} ] D2 [ ${d2hp} ]`)

	phase++
	
}
