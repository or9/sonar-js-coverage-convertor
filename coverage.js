#!/usr/bin/env node
// @flow
"use strict";

const { Builder } = require("xml2js");

/*
<coverage version="1">
	<file path="xources/hello/NoConditions.xoo">
		<lineToCover lineNumber="6" covered="true"/>
		<lineToCover lineNumber="7" covered="false"/>
	</file>
	<file path="xources/hello/WithConditions.xoo">
		<lineToCover lineNumber="3" covered="true" branchesToCover="2" coveredBranches="1"/>
	</file>
</coverage>
*/

console.info(`doing coverage`);

module.exports = (jsObjContent) => {
	console.info(`writing file content`);
	console.log(`jsObjContent tho`);
	// console.log(jsObjContent.coverage.project.package);
	// if it includes 0 files, package will be `undefined`
	const reportStruct = jsObjContent.coverage.project
		.find(project => project.package).package
		.map(pkg => pkg.file)
		.map(mapReportStruct)
		.map(buildXmlFromObj)
		.join("\n");

	const reportXml = `<coverage version="1">
		${reportStruct}
	</coverage>`;

	// fs.writeFile("coverage/sonar-report.xml", reportXml, (err) => {
	// 	if (err) throw new Error(`Failed to write xml ${err}`);
	// 	else console.log(`Great success. File written to coverage/sonar-coverage.xml`);
	// });

	return reportXml;

	function buildXmlFromObj (objForXml) {
		return new Builder({
			headless: true,
			explicitRoot: false
		}).buildObject(objForXml);
	}

	function mapReportStruct (srcObj) {
		srcObj = srcObj[0];

		return {
			file: {
				$: {
					path: srcObj.$.path
					// path: "../".concat(/src-client.+/g.exec(srcObj.$.path)[0])
				},
				lineToCover: srcObj.line.map(line => {
					line = line.$;
					// $ indicates an attribute assignment
					console.log("mapping lines to srcObj", line);
					const lineObj = {
						$: {
							lineNumber: line.num,
							covered: !!parseInt(line.count) // line.count === 0 || 1 === "covered" || "not-covered"
						}
					};

					if (line.type === "cond") {
						let totalLinesToCover = parseInt(line.truecount) + parseInt(line.falsecount, 10);
						let linesCovered = totalLinesToCover - parseInt(line.truecount);

						lineObj.$.branchesToCover = totalLinesToCover;
						lineObj.$.coveredBranches = linesCovered;

					}

					return lineObj;
				})
			}
		};
	}
};
