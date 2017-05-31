#!/usr/bin/env node
// @flow
"use strict";

global.fs = require("fs");
global.xml2js = require("xml2js");
global.CLOVER_COVERAGE_LOCATION = process.env.argv.find("-p") || process.env.argv.find("--path") || "coverage/clover.xml";

const parser = new xml2js.Parser();
const runStyle = (process.env.argv.find("-s") || process.env.argv.find("--style") || "coverage").toUpperCase();

readFile(CLOVER_COVERAGE_LOCATION)
	.then(parseString)
	.then(runMethodPartial(runStyle))
	.catch(console.error);

function readFile (fileLocation) {
	console.info(`~readFile ${fileLocation}`);

	return new Promise((resolve, reject) => {
		fs.readFile(fileLocation, (err, data) => {
			if (err) return reject(err);
			else return resolve(data);
		})
	});
}

function parseString (fileData) {
	console.info(`~fileData ${fileData}`);

	return new Promise((resolve, reject) => {
		parser.parseString(data, (parserErr, result) => {
			if (parserErr) return reject(`Encountered an error ${parserErr}`);
			return resolve(result);
		});
	});
}

function runMethodPartial (genericCoverageType = "coverage") {
	console.info(`~runMethodPartial ${genericCoverageType}`);

	return (parsedString) => new Promise((resolve, reject)) => {
		require(genericCoverageType)(parsedString);
	});
}
