'use strict'

const assert = require('assert')
const pivot = require('../src/core/pivot')
const molecularData = require('../src/core/molecular-data')

describe('pivotTest', function() {
  /*
  it('Transform', function(done) {
    pivot.transform([{
      color: "blue",
      shape: "circle"
    }, {
      color: "red",
      shape: "triangle"
    }, {
      color: "purple",
      shape: "triangle"
    }, {
      color: "purple",
      shape: "circle"
    }], {
      rows: ["color"],
      cols: ["shape"]
    }, function (err, result) {
      if(err) return console.log(err)
      //console.log(result)
      done()
    })
  })
  */
  
  it('Transform', function(done) {

    var options = {
      rows: ["month"],
      cols: ["year"]
    }

    molecularData.getHPVTAT(function (err, result) {
      if(err) return console.log(err)
      pivot.transform(result, options, function (err, result) {
        if(err) return console.log(err)
        //console.log(result)
        done()
      })
    })

  })
})
