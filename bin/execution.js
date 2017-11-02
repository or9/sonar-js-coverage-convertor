#!/usr/bin/env node

// @flow
"use strict";

const { Builder } = require("xml2js");

console.info(`here we go executin`);
console.log(`duration not provided for failures`);

/*
<testExecutions version="1">
	<file path="testx/ClassOneTest.xoo">
		<testCase name="test1" duration="5"/>		testCase 	: required
								name 		: required
								duration 	: required
		<testCase name="test2" duration="500">
			<skipped message="short message">other</skipped> 	[failure|error|skipped] : optional
											message 	: required
											stacktrace 	: optional
		</testCase>
		<testCase name="test3" duration="100">
			<failure message="short">stacktrace</failure>
		</testCase>
		<testCase name="test4" duration="500">
			<error message="short">stacktrace</error>
		</testCase>
	</file>
</testExecutions>

const reportStruct = jsObjContent.coverage.project
		.find(project => project.package).package
		.map(pkg => pkg.file)
		.map(mapReportStruct)
		.map(buildXmlFromObj)
		.join("\n");

	const reportXml = `<coverage version="1">
		${reportStruct}
	</coverage>`;
*/