#!/usr/bin/env node
// @flow
"use strict";

const { promisify } = require("util");
// const params = require("./cli-options");
const params = require("ara-cli-options");
var { readFile, writeFile } = require("fs");
console.log("readfile tho? ", typeof readFile);
console.log("writefile tho? ", typeof writeFile);
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

	const fileOutputContent = await generateGenericTestData(parsedFileContent);

	const result = await __writeFile("coverage/sonar-report.xml", fileOutputContent);
})();

