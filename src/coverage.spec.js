"use strict";
require("chai").should();

const mockery = require("mockery");
const xml2jsMock = getXml2JsMock();
const mockParam = getCoverageParamMock();

describe("Coverage", () => {
	var covModule;

	it("should require an object param", () => {
		(() => {
			covModule([]);
		}).should.throw;

		(() => {
			covModule("oops");
		}).should.throw;

		(() => {
			covModule(mockParam);
		}).should.not.throw;
	});

	it("should be a function", () => {
		covModule(mockParam).should.contain(`<coverage version="1">`);
		covModule(mockParam).should.contain(`</coverage>`);
	});

	describe("~buildXmlFromObj", () => {

	});

	describe("~mapReportStruct", () => {

	});


	before(() => {
		mockery.enable();
		mockery.registerMock("xml2js", xml2jsMock);
		covModule = require("./coverage");
	});

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});

function getXml2JsMock () {
	return {
		Builder: function (config) {
			return {
				buildObject: (objectToBuildIntoXml) => {
					return "<xml>";
				}
			}
		}
	};
}

function getCoverageParamMock () {
	return {
		coverage: {
			project: [{
				metrics: [
					{
						package: []
					}
				]
			}]
		}
	};
}
