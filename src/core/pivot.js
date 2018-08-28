'use strict'

const path = require('path')
const _ = require('underscore')

module.exports = {
  transform: function (data, options, callback) {
    var rowLabels = _.uniq(_.pluck(data, options.rows[0]).sort(), true)
    var columnLabels = _.uniq(_.pluck(data, options.cols[0]).sort(), true)

    var rows = setColumns(data, options, rowLabels, columnLabels)
    setCount(data, rows, options, rowLabels, columnLabels)
    callback(null, rows)
  }
}

function setCount (data, rows, options, rowLabels, columnLabels) {
  rows.forEach(function (k, v, m) {
    m.set('asdf', 'asdfasdf')
    columnLabels.forEach(function (col) {
      var filteredRows = _.filter(data, function (f) { return f[options.rows[0]] == v && f[options.cols[0]] == col })
      //m.set(k, filteredRows.length)
    })
  })

  /*
  for(var rowIndex in rows) {
    for(var column in columnLabels) {
      var filteredRows = _.filter(data, function (f) { return f[options.rows[0]] == rows[rowIndex].get(options.rows[0]) &&
          f[options.cols[0]] == columnLabels[column] })
      console.log(filteredRows.length)
      rows[rowIndex].set([columnLabels[column]], filteredRows.length)
    }
  }
  */
}

function setColumns (data, options, rowLabels, columnLabels) {
  var result = []
  for(var rowIndex in rowLabels) {
    var row = new Map()
    row.set(options['rows'], rowLabels[rowIndex])
    for(var columnIndex in columnLabels) {
      row.set(columnLabels[columnIndex], null)
    }
    result.push(row)
  }

  //console.log(result)
  return result
}
