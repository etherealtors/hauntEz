'use strict';
/* global describe beforeEach it */

const seed = require('./seed');
const { expect } = require('chai');
//const db = require('../index');

describe('seed script', () => {
	it('completes successfully', seed);
});
