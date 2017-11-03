"use strict";
require("chai").should();
const mockery = require("mockery");
const mock = {
	get index () {
		return require("./index");
	}
};

describe("index", () => {
	it("should run ", () => {

	});


	before(() => {
		mockery.enable();
	});

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});
