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

const CLOVER_COVERAGE_LOCATION = params("location") || `${DIR}/clover.xml`;
const runStyle = params("--style", "-s") || "coverage";
const generateGenericTestData = require(`./${runStyle}`);

(async () => {
	const fileContent = await __readFile(CLOVER_COVERAGE_LOCATION);
	const parsedFileContent = await parseString(fileContent);


	const fileOutputContent = await generateGenericTestData(parsedFileContent);

	const result = await __writeFile(`${DIR}/sonar-report.xml`, fileOutputContent);

	console.info(`Successfully wrote coverage to ${DIR}/sonar-report.xml`);

})();

