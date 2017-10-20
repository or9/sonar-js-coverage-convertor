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

const CLOVER_COVERAGE_LOCATION = params("location") || "coverage/clover.xml";
const runStyle = params("--style", "-s") || "coverage";
const generateGenericTestData = require(`./${runStyle}`);

(async () => {
	const fileContent = await __readFile(CLOVER_COVERAGE_LOCATION);
	const parsedFileContent = await parseString(fileContent);

	console.log("so that there clover parsedFileContent? ", parsedFileContent);

	const fileOutputContent = await generateGenericTestData(parsedFileContent);
	console.log("file out content --- ", fileOutputContent);

	const result = await __writeFile("coverage/sonar-report.xml", fileOutputContent);

	console.log("boom done wrote the file");
})();

