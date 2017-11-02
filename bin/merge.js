#!/usr/bin/env node
"use strict";
// @flow

const { Collector, Report } = require('istanbul');
const files = process.argv.slice(2);
const collector = new Collector();
const report = Report.create('clover');

console.info("files: ", files);

files.forEach(function (f) {
	//each coverage object can have overlapping information about multiple files
	collector.add(require(f));
});

collector.files().forEach(file => {
	const fileCoverage = collector.fileCoverageFor(file);
	console.info('Coverage for ', file, ' is:', JSON.stringify(fileCoverage));
});

// convenience method: do not use this when dealing with a large number of files
const finalCoverage = collector.getFinalCoverage();

report.writeReport(collector, false);

report.on('done', () => {
	console.info('done writing report');
	process.exit(0);
});

report.on('error', (err) => {
	console.error(err);
	process.exit(1);
});
