'use strict'

const axios = require('axios')

module.exports.getHPVTAT = function (params, callback) {
	var sqlStatement = 'DROP TEMPORARY TABLE if exists tReportData; ' +
	'Create Temporary Table tReportData ' +
	'Select pso.ReportNo, ao.CollectionTime, ao.AccessionTime, pso.OrderTime, pso.FinalTime,  ' +
		'timestampdiff(HOUR, ao.CollectionTime, pso.FinalTime) `TAT_CollectionTime`, ' +
	    'timestampdiff(HOUR, ao.AccessionTime, pso.FinalTime) `TAT_AccessionTime`, ' +
	    'timestampdiff(HOUR, pso.OrderTime, pso.FinalTime) `TAT_OrderTime`, ' +
	    '(timestampdiff(HOUR, ao.CollectionTime, pso.FinalTime)/24) `TAT_CollectionTime_Days`, ' +
	    '(timestampdiff(HOUR, ao.AccessionTime, pso.FinalTime)/24) `TAT_AccessionTime_Days`, ' +
	    '(timestampdiff(HOUR, pso.OrderTime, pso.FinalTime)/24) `TAT_OrderTime_Days`, ' +
	    'year(pso.FinalTime) `FinalYear`, ' +
	    'month(pso.FinalTime) `FinalMonth`, ' +
		'(Select wh.OrderHPV from tblPanelSetOrder pso ' +
			'join tblWomensHealthProfileTestOrder wh on pso.ReportNo = wh.ReportNo ' +
	        'where pso.MasterAccessionNo = ao.MasterAccessionNo) `OrderHPV` ' +
	  'from tblAccessionOrder ao ' +
	  'join tblPanelSetOrder pso on ao.MasterAccessionNo = pso.MasterAccessionNo ' +
	  'where pso.FinalDate between \'2018-01-01\' and \'2018-07-01\' ' +
	  'and panelSetId = 14; ' +
	  'Select FinalYear, FinalMonth, avg(TAT_CollectionTime) `CollectionHours`, avg(TAT_OrderTime) `OrderHours`, avg(TAT_AccessionTime) `AccessionHours`,  ' +
			'avg(TAT_CollectionTime_Days) `CollectionDays`, avg(TAT_OrderTime_Days) `OrderDays`, avg(TAT_AccessionTime_Days) `AccessionDays` ' +
		'from tReportData ' +
	  'group by FinalYear, FinalMonth; ' +
	  'DROP TEMPORARY TABLE tReportData;';

	sqlStatement = sql.replace('[StartDate]', params.StartDate)
	sqlStatement = sql.replace('[EndDate]', params.EndDate)

	axios.post('http://localhost:3000/', { sql: sqlStatement })
	.then(function (response) {
		callback(null, response.data)
	})
	.catch(function (error) {
		callback(error)
	})
	.then(function () {
		// always executed
	})

}
