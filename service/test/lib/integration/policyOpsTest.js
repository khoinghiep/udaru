'use strict'

const expect = require('code').expect
const Lab = require('lab')
const lab = exports.lab = Lab.script()

const PolicyOps = require('../../../lib/policyOps')
const dbConn = require('../../../lib/dbConn')
const logger = require('pino')()

const db = dbConn.create(logger)
const policyOps = PolicyOps(db.pool)

lab.experiment('PolicyOps', () => {

  lab.test('list all organization policies', (done) => {
    policyOps.listByOrganization({ organizationId: 'WONKA' }, (err, result) => {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.length).to.equal(8)

      const policy = result[0]
      expect(policy.id).to.exist()
      expect(policy.name).to.exist()
      expect(policy.version).to.exist()
      expect(policy.statements).to.exist()

      done()
    })
  })

  lab.test('read a specific policy', (done) => {
    policyOps.readPolicyById(1, (err, policy) => {
      expect(err).to.not.exist()
      expect(policy).to.exist()

      expect(policy.id).to.exist()
      expect(policy.name).to.exist()
      expect(policy.version).to.exist()
      expect(policy.statements).to.exist()

      done()
    })
  })

  lab.test('create, update and delete a policy', (done) => {
    const policyData = {
      version: '2016-07-01',
      name: 'Documents Admin',
      organizationId: 'WONKA',
      statements: '{"Statement":[{"Effect":"Allow","Action":["documents:Read"],"Resource":["wonka:documents:/public/*"]}]}'
    }

    policyOps.createPolicy(policyData, (err, policy) => {
      expect(err).to.not.exist()
      expect(policy).to.exist()

      const policyId = policy.id

      expect(policy.name).to.equal('Documents Admin')
      expect(policy.version).to.equal('2016-07-01')
      expect(policy.statements).to.equal({ Statement: [{ Effect: 'Allow', Action: ['documents:Read'], Resource: ['wonka:documents:/public/*'] }] })

      const updateData = {
        id: policyId,
        version: '2016-07-02',
        name: 'Documents Admin v2',
        statements: '{"Statement":[{"Effect":"Deny","Action":["documents:Read"],"Resource":["wonka:documents:/public/*"]}]}'
      }

      policyOps.updatePolicy(updateData, (err, policy) => {
        expect(err).to.not.exist()
        expect(policy).to.exist()

        expect(policy.name).to.equal('Documents Admin v2')
        expect(policy.version).to.equal('2016-07-02')
        expect(policy.statements).to.equal({ Statement: [{ Effect: 'Deny', Action: ['documents:Read'], Resource: ['wonka:documents:/public/*'] }] })

        policyOps.deletePolicyById(policyId, done)
      })
    })
  })
})
