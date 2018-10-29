const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Ghost = db.define('ghost', {
	email: {
		type: Sequelize.STRING,
		unique: true,
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
	}
});

module.exports = Ghost;

/**
 * instanceMethods
 */
Ghost.prototype.correctPassword = function(candidatePwd) {
	return Ghost.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
Ghost.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

Ghost.encryptPassword = function(plainText, salt) {
	return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = (ghost) => {
	if (ghost.changed('password')) {
		ghost.salt = Ghost.generateSalt();
		ghost.password = Ghost.encryptPassword(ghost.password(), ghost.salt());
	}
};

Ghost.beforeCreate(setSaltAndPassword);
Ghost.beforeUpdate(setSaltAndPassword);
