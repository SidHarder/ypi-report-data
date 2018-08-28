'use strict'

const assert = require('assert')
const molecularData = require('../src/core/molecular-data')

describe('getHPVTATTest', function() {
  it('HPVTAT', function(done) {
    var params = { StartDate: '2018-01-01', EndDate: '2018-07-01' }
    molecularData.getHPVTAT(params, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })
})
