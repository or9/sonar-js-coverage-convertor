"use strict";
require("chai").should();
const mockery = require("mockery");
const xml2jsMock = getXml2JsMock();
const execModule = require("./execution");

describe("Execution", () => {
	it("should ", () => {

	});

	before(() => {
		mockery.enable();
	});

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});

function getXml2JsMock () {
	return {

	};
}
