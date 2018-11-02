'use strict';

const db = require('../server/db');
const { User, Location, Amenities, Review } = require('../server/db/models');

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
			role: 'buyer',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EO40pPzRET-MS570WOt-4i0K4AB2FgJh5eyH39sWa1huRgUjmw'
		}),
		User.create({
			name: 'Davey Jones',
			email: 'Davey@jones.com',
			password: '456',
			role: 'seller',
			isAdmin: true,
			image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Piratedavyjones.JPG/220px-Piratedavyjones.JPG'
		}),
		User.create({
			name: 'Carmelita Souls',
			email: 'Carmel@apple.com',
			password: '567',
			isAdmin: true,
			role: 'seller',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5M2CFBdJ00cWFPZv4LawshY7l9ZGRsiMDMc5zhGeUC2iyt9uz4Q'
		}),
		User.create({
			name: 'Amanda Cartwright',
			email: 'amanda@busted.com',
			password: '678',
			role: 'buyer',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxEbOqBUmLbVohyEJgtbmAujAUGBO20cz7Ec5P0sSKdMtVfmxH'
		}),
		User.create({
			name: 'Abagail Hauntson',
			email: 'abagail@haunt.com',
			password: '789',
			role: 'buyer',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTik9xOrLHcsoFbkRt_Cyy0HOsxBZKOoANm_hWGhWp9z15fxa9I6Q'
		}),
		User.create({
			name: 'Earl Jackson',
			email: 'earl@jackson.com',
			password: '890',
			role: 'buyer',
			isAdmin: true,
			image:
				'https://static01.nyt.com/images/2017/01/11/blogs/11-lens-maurice-slide-XQMQ/11-lens-maurice-slide-XQMQ-superJumbo.jpg'
		})
	]);
	const amenities = await Promise.all([
		Amenities.create({
			incidents: 2013,
			humanOccupants: 3,
			ghostOccupants: 4,
			nearestChurch: 'St. Peters Catholic',
			nearestGraveyard: 'Greenwood Cemetery',
			nearestChurchDistance: 23.023,
			nearestGraveyardDistance: 0.034,
			skeletonsInCloset: 2
		}),
		Amenities.create({
			incidents: 0,
			humanOccupants: 4,
			ghostOccupants: 0,
			nearestChurch: 'Moorestown Presbyterian',
			nearestGraveyard: 'Spring Grove Cemetery',
			nearestChurchDistance: 2.5,
			nearestGraveyardDistance: 10,
			skeletonsInCloset: 0
		}),
		Amenities.create({
			incidents: 2,
			humanOccupants: 3,
			ghostOccupants: 0,
			nearestChurch: 'United Baptists',
			nearestGraveyard: 'Normandy American Cemetery',
			nearestChurchDistance: 5.34,
			nearestGraveyardDistance: 6,
			skeletonsInCloset: 4
		}),
		Amenities.create({
			incidents: 22,
			humanOccupants: 2,
			ghostOccupants: 0,
			nearestChurch: 'United Methodist',
			nearestGraveyard: 'Arlington National Cemetry',
			nearestChurchDistance: 12.02,
			nearestGraveyardDistance: 5,
			skeletonsInCloset: 9
		}),
		Amenities.create({
			incidents: 224,
			humanOccupants: 18,
			ghostOccupants: 5,
			nearestChurch: 'Prayers Palace',
			nearestGraveyard: 'Boot Hill',
			nearestChurchDistance: 17,
			nearestGraveyardDistance: 12,
			skeletonsInCloset: 47
		}),
		Amenities.create({
			incidents: 10,
			humanOccupants: 1,
			ghostOccupants: 1,
			nearestChurch: 'American Baptist Church',
			nearestGraveyard: 'Forest Hill Cemetry',
			nearestChurchDistance: 4.89,
			nearestGraveyardDistance: 8,
			skeletonsInCloset: 13
		}),
		Amenities.create({
			incidents: 400,
			humanOccupants: 8,
			ghostOccupants: 66,
			nearestGraveyard: 'Ocean',
			nearestGraveyardDistance: 0,
			skeletonsInCloset: 47105701
		})
	]);
	const locations = await Promise.all([
		Location.create({
			address: '239 Stormy Drive',
			category: 'Shack',
			imageUrl:
				'https://i.kinja-img.com/gawker-media/image/upload/s--v-rVz6NL--/c_scale,f_auto,fl_progressive,q_80,w_800/qmlxjxfvuccnfhqq8cdg.jpg',
			quantity: 5,
			price: 4000,
			description:
				'Willow trees undead wind, unknown ripped needles. Demons in fallen angel non terror decomposed rotten teeth. Witch ashes eyeball undead, in bury burn hell flames. Graves slice ominous is guns exorcism guts. Eerie needles edginess, graveyard on death rotten, disturbing non grave. chainsaw dread full moon, pushed at alley bruises, children is knife. Killer scourge scared, drowning helpless sheep at, terrifyin.',
			gallery: null,
			userId: 7,
			amenityId: 4
		}),
		Location.create({
			address: '6346 Locker Way',
			category: 'Boat',
			imageUrl:
				'https://vignette.wikia.nocookie.net/pirates/images/0/01/Flying_Dutchman_SideView.jpg/revision/latest?cb=20111117084649',
			quantity: 20,
			price: 780000,
			description:
				'And crazy gory. Suicide Slash demon at convulsing darkness a evil pain burn. chainsaw dread full moon, pushed at alley bruises, children is knife. Graves slice ominous is guns exorcism guts. screams exorcism oozed smashed. In the deranged Halloween slice. Blood ashes tearin.',
			gallery: null,
			userId: 3,
			amenityId: 5
		}),
		Location.create({
			address: '666 ShadyBrook Road',
			category: 'House',
			imageUrl: 'https://media.giphy.com/media/1V17m8MgM0fEk/giphy.gif',
			quantity: 8,
			price: 299000,
			description:
				'Death bruises moon torture demons devil or vampire werewolf wind. Demons in fallen angel non terror decomposed rotten teeth. Suicide Slash demon at convulsing darkness a evil pain burn. Serial killer, heart pumping at eyeballs killer dolls, chains edginess slicing horror, mental hospital putrid psychopath an possession. Cat at decapitated guns. Trapped flesh grotesque squeal, bloodcurdling chilling hair-raising spooky hazardous daring. Death bruises moon torture demons devil o.',
			gallery: null,
			userId: 7,
			amenityId: 6
		}),
		Location.create({
			address: '555 Ocean Drive',
			category: 'Boat',
			imageUrl: 'http://www.lipstiq.com/wp-content/uploads/2014/03/Ghost-boat.jpg',
			quantity: 2,
			price: 2300,
			description:
				'Vampire werewolf wind. Shriek terror shadow, darkness in tense ac, Motionless drowning Full moon. Cat at decapitated guns. Blood guns bury scream, stab graveyard crazed dark crying. Falling a spooky screaming. Psycho crazy mental hospital moon. . Gore at chainsaw knife crazed choking helpless. Haunt tearing murder crying an mental corpse zombies evil, chainsaw motionless gory. Graves slic.',
			gallery: null,
			userId: 3,
			amenityId: 7
		}),
		Location.create({
			address: 'Wallaby Lake',
			category: 'Boat',
			imageUrl: 'https://i.redd.it/5bo4l0xqozly.jpg',
			quantity: 4,
			price: 50000,
			description:
				'Flames at crazy slicing with murderer gore. Gore at chainsaw knife crazed choking helpless. Death bruises moon torture demons devil or vampire werewolf wind. Dungeon in a gruesome, a disembowel unknown. Virus witch demonic dripping, at werewolf psych.',
			gallery: null,
			userId: 3,
			amenityId: 4
		}),
		Location.create({
			address: '13 Criers Lane',
			category: 'Apartment',
			imageUrl: 'https://i.ytimg.com/vi/GEzd1pNS0Ug/maxresdefault.jpg',
			quantity: 32,
			price: 1250,
			description:
				'Slice flames. Children creepy deranged, ashes a killer a, monster mental hospital. Anthrax putrid, disturbing and morbid convulsing, rotten menacing fatal bleak, monstrosity dread with demon scourge terrifying. Edginess anxiety tension, claw at deteriorated in, creep a tear. Mental hospital sliced drowning. Virus witch demonic dripping, at werewolf psycho slice flames. Serial killer, heart pumpin.',
			gallery: null,
			userId: 1,
			amenityId: 5
		}),
		Location.create({
			address: '111 Grove Street',
			category: 'Apartment',
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR1qX81BIPjHvGWdfYgsEJpKiTGI8Ntj6y9tw6iYfHRbPI_m8h',
			quantity: 22,
			price: 1100,
			description:
				'At eyeballs killer dolls, chains edginess slicing horror, mental hospital putrid psychopath an possession. Graves slice ominous is guns exorcism guts. Occult at alley pushed. Worms with guts ect. Killer scourge scared, drowning helpless sheep at, terrifying and crazy gory. Screams creaking tension kettle our exorcist. Haunt suicide silent, gory as demonic alarming, buried in fallen angel. Haunt tearing murder cryin.',
			gallery: null,
			userId: 1,
			amenityId: 1
		}),
		Location.create({
			address: 'Belvedere Estate',
			category: 'Castle',
			imageUrl:
				'https://horror.ambient-mixer.com/images_template/9/1/e/91e6277bff3b739d8ba87b6be867ed02_full.jpg',
			quantity: 1,
			price: 500000000,
			description:
				'An mental corpse zombies evil, chainsaw motionless gory. In the deranged Halloween slice. . Killer scourge scared, drowning helpless sheep at, terrifying and crazy gory. Horror bowel.',
			gallery: null,
			userId: 3,
			amenityId: 3
		}),
		Location.create({
			address: '1010 Merry Road',
			category: 'House',
			imageUrl: 'https://you.stonybrook.edu/tylerfrigge/files/2015/10/DSC_0026-25xmruz.jpg',
			quantity: 2,
			price: 22000,
			description:
				'Exorcism grave cut, murderer creature ripped. Falling are graveyard graves est. Horror bowels exorcism grave cut, murderer creature ripped. Eerie needles edginess, graveyard on death rotten, disturbing non grave. Bloodcurdling decomposed zombie in virus scared cat Michael Myers worms. Disembowel stab, chains dungeon torment fiendish, gruesom.',
			gallery: null,
			userId: 7,
			amenityId: 5
		}),
		Location.create({
			address: '2232 Apple Drive',
			category: 'House',
			imageUrl:
				'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/2/22/0/front-yard-rms_cottage-style-garden-ebboy-05_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1400947347526.jpeg',
			quantity: 1,
			price: 40000,
			description:
				'Crazy slicing with murderer gore. Edginess anxiety tension, claw at deteriorated in, creep a tear. Needles at bowels alarming. Death bruises moon torture demons devil or vampire werewolf wind. Dungeon in a gruesome, a disembowe.',
			gallery: null,
			userId: 7,
			amenityId: 3
		}),
		Location.create({
			address: '422 Country Road',
			category: 'Shack',
			imageUrl: 'https://cdn-images-1.medium.com/max/1200/1*NLs6Fz77ZCqSZqjUmffhaQ.jpeg',
			quantity: 1,
			price: 800,
			description:
				'Unknown. Anthrax putrid, disturbing and morbid convulsing, rotten menacing fatal bleak, monstrosity dread with demon scourge terrifying. In horrifying, fear is gnarled murder, ominous eerie Serial killer sinister, with sick chilling agony shaking heart pumping. Gore at chainsaw knife crazed choking helpless. Creep cold graves, shadow no.',
			gallery: null,
			userId: 1,
			amenityId: 2
		}),
		Location.create({
			address: 'Fostworths Commons',
			category: 'Castle',
			imageUrl:
				'http://www.bravotv.com/sites/nbcubravotv/files/styles/blog-post--mobile/public/field_blog_image/2017/03/jet-set-beauty-beast-castles-promote-02.jpg?itok=H5ltr4BV&timestamp=1488570367',
			quantity: 10,
			price: 30000,
			description:
				'Fear a, psychotic ashes ghost. Dungeon in a gruesome, a disembowel unknown. Tearing eyeballs zombie slash. Suicide Slash demon at convulsing darkness a evil pain burn. Anthrax putrid, disturbing and morbid convulsing, rotten menacing fatal bleak, monstrosity dread with demon scourge terrifying. Killer scourge scared, drowning helpless sheep at, terrifying and crazy gory. Captive Agony deteriorated, fatal or chilling is, grotesque Halloween exorcism. Horror bowels exorcism grave cut, murderer creature ripped. killer mental psychotic sliced. Breathing heavily damp, col.',
			gallery: null,
			userId: 7,
			amenityId: 1
		})
	]);
	const reviews = await Promise.all([
		Review.create({
			content: 'In horrifying, fear is gnarled murder, ominous eerie Serial killer sinister',
			rating: 5,
			userId: 1,
			locationId: 1
		}),
		Review.create({
			content:
				'Sinister at creepy anxiety bite monster electrocution smashed in death. Blood ashes tearing in drowning spooky at fanatic with murderer',
			rating: 3,
			userId: 2,
			locationId: 1
		}),
		Review.create({
			content: 'Rotten menacing fatal bleak, monstrosity dread with demon scourge terrifying.',
			rating: 5,
			userId: 3,
			locationId: 2
		}),
		Review.create({
			content:
				' Stalking wind, drenched chilling sick mental, with mutilation zombies blood, or shaking with willow trees shriek. Stalking wind, drenched chilling sic.',
			rating: 3,
			userId: 4,
			locationId: 2
		}),
		Review.create({
			content:
				'Mental, with mutilation zombies blood, or shaking with willow trees shriek. Evil Michael Myers decomposed corpse.',
			rating: 5,
			userId: 5,
			locationId: 3
		}),
		Review.create({
			content:
				'Shriek terror shadow, darkness in tense ac, Motionless drowning Full moon. Gnarled hazardous, gore Michael Myers grave ripped.',
			rating: 4,
			userId: 6,
			locationId: 3
		}),
		Review.create({
			content:
				'Virus witch demonic dripping, at werewolf psycho slice flames. Suicide Slash demon at convulsing darkness a evil pain burn',
			rating: 2,
			userId: 7,
			locationId: 4
		}),
		Review.create({
			content: 'Trapped daring rotten worms, vampire monstrosity bleak are at flesh. Needles at bowels alarming.',
			rating: 5,
			userId: 1,
			locationId: 4
		}),
		Review.create({
			content: 'Virus witch demonic dripping, at werewolf psycho slice flames',
			rating: 5,
			userId: 2,
			locationId: 5
		}),
		Review.create({
			content: 'Virus witch demonic dripping, at werewolf psycho slice flames',
			rating: 4,
			userId: 3,
			locationId: 5
		}),
		Review.create({
			content: 'Occult at alley pushed. Haunt tearing murder crying an mental corpse zombies evil,',
			rating: 3,
			userId: 4,
			locationId: 6
		}),
		Review.create({
			content: 'chainsaw motionless gory. Anthrax putrid',
			rating: 5,
			userId: 5,
			locationId: 6
		}),
		Review.create({
			content: 'Bloodcurdling decompose.',
			rating: 5,
			userId: 6,
			locationId: 7
		}),
		Review.create({
			content: 'Zombie in virus scared cat Michael Myers worms. Cat at decapitated guns.',
			rating: 3,
			userId: 7,
			locationId: 7
		}),
		Review.create({
			content: 'Breathing heavily damp, cold and crying running, stalking slicing stabbing dripping (blood)',
			rating: 1,
			userId: 1,
			locationId: 8
		}),
		Review.create({
			content: '666 at kettle. Evil Michael Myers decompose.',
			rating: 1,
			userId: 2,
			locationId: 8
		}),
		Review.create({
			content: 'Corpse. Dungeon in a gruesome, a disembowel unknown.',
			rating: 3,
			userId: 3,
			locationId: 9
		}),
		Review.create({
			content: 'Falling are graveyard graves est. Tearing eyeballs zombie slash.',
			rating: 2,
			userId: 4,
			locationId: 9
		}),
		Review.create({
			content: 'Needles at bowels alarming. Horror bowels exorcism grave ',
			rating: 5,
			userId: 5,
			locationId: 10
		}),
		Review.create({
			content: ' Killer scourge scared, drowning helpless sheep at, terrifying and crazy gory.',
			rating: 5,
			userId: 6,
			locationId: 10
		}),
		Review.create({
			content: 'Eerie needles edginess, graveyard on death rotten',
			rating: 2,
			userId: 7,
			locationId: 11
		}),
		Review.create({
			content: 'Horror bowels exorcism grave cut, murdere.',
			rating: 5,
			userId: 1,
			locationId: 11
		}),
		Review.create({
			content: 'Gore at chainsaw knife crazed choking helpless.',
			rating: 5,
			userId: 2,
			locationId: 12
		}),
		Review.create({
			content: 'Creep cold graves, shadow non fear a, psychotic ashes ghost.',
			rating: 3,
			userId: 3,
			locationId: 12
		})
	]);
	console.log(`seeded ${users.length} users`);
	console.log(`seeded ${locations.length} locations`);
	console.log(`seeded ${amenities.length} amenities`);
	console.log(`seeded ${reviews.length} reviews`);
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
