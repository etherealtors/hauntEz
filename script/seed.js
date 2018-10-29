'use strict';

const db = require('../server/db');
const { User } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const users = await Promise.all([
		User.create({
			name: 'Elizabeth Faucet',
			email: 'Liz@Faucet.com',
			password: '123',
			role: 'buyer',
			image: 'https://amp.thisisinsider.com/images/5bd3280a8b03df232c6a9592-750-562.jpg'
		}),
		User.create({
			name: 'Hank Horrible',
			email: 'murphy@email.com',
			password: '234',
			role: 'seller',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EO40pPzRET-MS570WOt-4i0K4AB2FgJh5eyH39sWa1huRgUjmw'
		})
		// User.create({
		// 	name:,
		// 	email:,
		// 	password:
		// 	role:,
		// 	image:
		// }),
		// User.create({
		// 	name:,
		// 	email:,
		// 	password:
		// 	role:,
		// 	image:
		// }),	User.create({
		// 	name:,
		// 	email:,
		// 	password:
		// 	role:,
		// 	image:
		// })
	]);

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
