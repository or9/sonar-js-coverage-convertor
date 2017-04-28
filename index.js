#!/usr/bin/env node
"use strict";
const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

fs.readFile("coverage/clover.xml", (err, data) => {
	if (err) throw new Error(`fs read error ${err}`);

	parser.parseString(data, (parserErr, result) => {
		if (parserErr) throw new Error(`Encountered an error ${parserErr}`);

		writeGenericReportFile(result);
	});
});

function writeGenericReportFile (jsObjContent) {
	const reportStruct = jsObjContent.coverage.project
		.find(project => project.package).package
		.map(pkg => pkg.file)
		.map(mapReportStruct)
		.map(buildXmlFromObj)
		.join("\n");

	const reportXml = `<coverage version="1">
		${reportStruct}
	</coverage>`;

	fs.writeFile("coverage/sonar-report.xml", reportXml, (err) => {
		if (err) throw new Error(`Failed to write xml ${err}`);
		else console.log(`Great success. File written to coverage/sonar-coverage.xml`);
	});

	function buildXmlFromObj (objForXml) {
		return new xml2js.Builder({
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
					const lineObj = {
						$: {
							lineNumber: line.num,
							covered: true
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
}
