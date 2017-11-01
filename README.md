# sonar-js-coverage-convertor
Convert Istanbul clover coverage reports to [SonarQube Generic Data](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) format for Polymer app usage.  
## Usage
### From npm run scripts  
```json
{
	…,
	"preSonarCoverage": "wct",
	"sonarCoverage": "sonar-generic-coverage-convertor"
	…
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
## Dev  
