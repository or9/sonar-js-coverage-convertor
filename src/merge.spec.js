"use strict";
require("chai").should();
const mockery = require("mockery");

describe("Merge", () => {
	it("should show usage", () => {

	});


	before(() => {
		mockery.enable();
	});

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});
