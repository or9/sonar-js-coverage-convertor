#!/usr/bin/env node
"use strict";

const { ncp } = require('ncp');

ncp.stopOnErr = false;
ncp.clobber = true;

const SRC = Object.freeze({
	BROWSER: `browsers.js`,
	SELENIUM: `node_modules/selenium-standalone`
});

const DEST = Object.freeze({
	BROWSER: `node_modules/wct-local/lib/`,
	SELENIUM: `node_modules/wct-local/node_modules/`
});

for (let key in PATH.SRC) {
	ncp(SRC[key], DEST[key], err => {
		if (err) return console.error(err);
 		else console.info(`Done writing ${DEST[key]}`);
	});
}
