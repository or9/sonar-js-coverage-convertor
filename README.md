# sonar-js-coverage-convertor
Because Sonarqube is unable to generate coverage for Javascript applications, this module will convert Istanbul reports to a generic format which Sonarqube can interpret. Convert Istanbul clover coverage reports to [SonarQube Generic Data](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) format for Polymer app usage.  
## Usage
If you have multiple coverage files which you need to merge, do so prior to running the convertor. See `Merge Module` for details.  

### From npm run scripts  
```json
{
	"…": "…",
	"presonarCoverage": "wct",
	"sonarCoverage": "istanbul-merge coverage-server/coverage-final.json coverage-client/coverage-final.json",
	"postsonarCoverage": "sonar-generic-coverage-convertor",
	"…": "…"
}
```
`npm run sonarCoverage`  

### Example `wct.conf.json`  
```json
{
	"plugins": {
		"istanbul": {
			"dir": "./coverage-client",
			"reporters": ["lcov", "clover", "json"],
			"include": [
				"**/spec*.html",
				"**/spec*.js"
			],
			"exclude": [
				"**/polymer/polymer.js",
				"**/platform/platform.js",
				"**/bower_components/**",
				"**/node_modules/**"
			],
			"thresholds": {
				"global": {
					"statements": 90
				}
			}
		}
	}
}

```

### Example `mocha`  
Generate server-side coverage reports  
`nyc --report-dir ./coverage-server --reporter lcov --reporter json --reporter clover mocha server/**/*.spec.js`   

### Merge Module  
This module is used to merge multiple coverage reports prior to converting the single resulting report to Sonarqube's generic coverage format.  
```bash
COVERAGE_DIR=coverage istanbul-merge coverageDir1/coverage-final.json coverageDir2/coverage-final.json
COVERAGE_DIR=outDir istanbul-merge dir1/in.json dir2/in.json
istanbul-merge dir1/in.json dir2/in.json
```
## Dev  
