#!/usr/bin/env node
"use strict";
// @flow

const { Collector, Reporter } = require('istanbul');
const files = process.argv.slice(2);
const collector = new Collector();
const COVERAGE_LOCATION = process.env.COVERAGE_DIR || `${process.env.PWD}/coverage`;
const reporter = new Reporter(false, COVERAGE_LOCATION);

console.info("files: ", files);

if (!files.length || (files.includes("help") || files.includes("--help") || files.includes("-h"))) {
	displayUsage();
}

files.forEach(function (f) {
	//each coverage object can have overlapping information about multiple files
	collector.add(require(`${process.env.PWD}/${f}`));
});

reporter.add("clover");
reporter.write(collector, false, (err) => {
	if (!err) return;

	console.error(err);
	process.exit(1);
});

function displayUsage () {
	console.error("Usage:");
	console.error("\tistanbul-merge file1 file2 file[n]");
	console.error("\tCOVERAGE_DIR=./coverage istanbul-merge file1 file[n]");
	process.exit(1);
}
