const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner.scan(
    {
        serverUrl: 'http://localhost:9000',
        token: 'sqp_5e4ad8feb3e1ae7967c0df5344837f70cf2e93bd',
        options: {
            'sonar.projectKey': 'exercice_tabla_datos',
            'sonar.projectName': 'exercice_tabla_datos',
            'sonar.projectVersion': '1.0',
            'sonar.sources': 'src',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.inclusions': '**/*.ts,**/*.tsx',
            'sonar.typescript.tsconfigPath': 'tsconfig.json',
            'sonar.tests': 'src',
            'sonar.test.inclusions': '**/*.test.ts,**/*.test.tsx',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.exclusions': '**/vite.config.ts,**/eslint.config.js,**/*.d.ts,**/sonar-project.cjs,**/main.tsx,**/setup.ts'
        }
    },
    () => process.exit()
);