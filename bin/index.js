#!/usr/bin/env node
// @flow
"use strict";

const { promisify } = require("util");
const params = require("ara-cli-options");
const { readFile, writeFile } = require("fs");
const __readFile = promisify(readFile);
const __writeFile = promisify(writeFile);
const parser = new require("xml2js").Parser();
const parseString = promisify(parser.parseString);
const DIR = `${process.env.PWD}/coverage`;

if (process.argv[2] === "help" || process.argv[2] ===  "-h" || process.argv[2] === "--help") {
	console.info(`-l --location: [./coverage]
	             -s --style: [coverage]||execution`);
	process.exit(0);
}

const CLOVER_COVERAGE_LOCATION = params("--location", "-l") || `${DIR}`;
const runStyle = params("--style", "-s") || "coverage";
const generateGenericTestData = require(`./${runStyle}`);

(async () => {
	const fileContent = await __readFile(`${CLOVER_COVERAGE_LOCATION}/clover.xml`);
	const parsedFileContent = await parseString(fileContent);

	const fileOutputContent = await generateGenericTestData(parsedFileContent);

	const result = await __writeFile(`${CLOVER_COVERAGE_LOCATION}/sonar-report.xml`, fileOutputContent);

	console.info(`Successfully wrote coverage to ${CLOVER_COVERAGE_LOCATION}/sonar-report.xml`);
})();

