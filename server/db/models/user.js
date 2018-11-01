const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		isEmail: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		// Making `.password` act like a func hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('password');
		}
	},
	salt: {
		type: Sequelize.STRING,
		// Making `.salt` act like a function hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('salt');
		}
	},
	googleId: {
		type: Sequelize.STRING
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	role: {
		type: Sequelize.STRING,
		validate: {
			isIn: [ [ 'buyer', 'seller' ] ]
		}
	},
	image: {
		type: Sequelize.STRING,
		defaultValue:
			'https://cdn.vox-cdn.com/thumbor/gm4o5aqfVGJ11jM6JRugpXfOFgE=/0x0:3733x2100/1200x800/filters:focal(1042x347:1638x943)/cdn.vox-cdn.com/uploads/chorus_image/image/56282285/1508_promo_stills_12001692731.0.jpg'
	}
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
	return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
	return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
};

User.findBySearch = (input) => {
	return User.findAll({
		where: {
			[Sequelize.Op.or]: [
				{ name: { [Sequelize.Op.iLike]: `%${input}%` } },
				{ role: { [Sequelize.Op.iLike]: `%${input}%` } }
			]
		}
	});
};
/**
 * hooks
 */
const setSaltAndPassword = (user) => {
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password(), user.salt());
	}
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
