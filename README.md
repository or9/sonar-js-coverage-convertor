# sonar-js-coverage-convertor
Because Sonarqube is unable to generate coverage for Javascript applications, this module will convert Istanbul reports to a generic format which Sonarqube can interpret. Convert Istanbul clover coverage reports to [SonarQube Generic Data](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) format for Polymer app usage.  
## Usage
If you have multiple coverage files which you need to merge, do so prior to running the convertor. See `Merge Module` for details.  

### From npm run scripts  
```json
{
	"…": "…",
	"preSonarCoverage": "wct",
	"sonarCoverage": "istanbul-merge coverage-server/coverage-final.json coverage-client/coverage-final.json",
	"postsSonarCoverage": "sonar-generic-coverage-convertor"
	"…": "…"
}
```
`npm run sonarCoverage`  

### Example `wct.conf.json`  
```json
{
	"plugins": {
		"istanbul": {
			"dir": "./coverage",
			"reporters": ["lcov", "clover"],
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

### Merge Module  
This module is used to merge multiple coverage reports prior to converting the single resulting report to Sonarqube's generic coverage format.  
```javascript
/**
 * @module istanbul-merge
 * @param filePath[0] {string}
 * @returns {status}
 */
```
## Dev  
