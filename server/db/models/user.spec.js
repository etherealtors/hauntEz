/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');
const Bluebird = require('bluebird');
const chai = require('chai');
const chaiThings = require('chai-things');
chai.use(chaiThings);

describe('User model', () => {
	// beforeEach(() => {
	// 	return db.sync({ force: true });
	// });
	// afterEach(() => {
	// 	return db.sync({ force: true });
	// });
	describe('Validations', () => {
		it('requires name', async () => {
			const user = User.build();
			try {
				await user.validate();
				throw Error('Validation was successful but should have failed without name');
			} catch (err) {
				expect(err.message).to.contain('name cannot be null');
			}
		});
		it('requires email', async () => {
			const user = User.build({
				name: 'Userly Johnson'
			});

			try {
				await user.validate();
				throw Error('Validation was successful but should have failed without email');
			} catch (err) {
				expect(err.message).to.contain('email cannot be null');
			}
		});

		it('should have a role attribute of either NULL, "buyer", or "seller"', async () => {
			const users = User.build({
				name: 'Capser',
				email: 'casper@User.com'
			});
			await users.save();
			users.role = 'buyer';
			await users.save();
			users.role = 'seller';
			await users.save();
			try {
				users.role = 'reaper';
				await users.save();
			} catch (err) {
				expect(err.message).to.contain('role');
				return;
			}
			throw Error('Trying to `save` a ghost with invalid role');
		});
	});

	describe('instanceMethods', () => {
		describe('correctPassword', () => {
			let cody;

			beforeEach(async () => {
				cody = await User.create({
					email: 'cody@puppybook.com',
					password: 'bones'
				});
			});

			it('returns true if the password is correct', () => {
				expect(cody.correctPassword('bones')).to.be.equal(true);
			});

			it('returns false if the password is incorrect', () => {
				expect(cody.correctPassword('bonez')).to.be.equal(false);
			});
		}); // end describe('correctPassword')
	}); // end describe('instanceMethods')
}); // end describe('User model')
