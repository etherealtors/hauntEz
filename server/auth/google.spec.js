const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Sequelize = require('sequelize')

describe('Google OAuth', () => {
  it('keeps secrets in the node environment', () => {
    expect(process.env.GOOGLE_CLIENT_ID).to.exist
    expect(process.env.GOOGLE_CLIENT_SECRET).to.exist
    expect(process.env.GOOGLE_CALLBACK).to.exist
  })
  it('redirects to google when /auth/google is accessed and allows login')
  it('does not break existing login/logout routes')
  it('creates a new user in the database with the sign-in email', async () => {
    expect(
      await User.findAll({where: {googleId: {[Sequelize.Op.ne]: null}}})
    ).to.equal(1)
  })
})
