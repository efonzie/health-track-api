# Health-Track API

This proejct was created from a Serverless starter that adds ES7 syntax, serverless-offline, environment variables, and unit test support. Part of the [Serverless Stack](http://serverless-stack.com) guide.

[Serverless Node.js Starter](https://github.com/AnomalyInnovations/serverless-nodejs-starter) uses the [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) plugin, [Babel](https://babeljs.io), [serverless-offline](https://github.com/dherault/serverless-offline), and [Jest](https://facebook.github.io/jest/). It supports:

- **ES7 syntax in your handler functions**
  - Use `import` and `export`
- **Package your functions using Webpack**
- **Run API Gateway locally**
  - Use `serverless offline start`
- **Support for unit tests**
  - Run `npm test` to run your tests
- **Sourcemaps for proper error messages**
  - Error message show the correct line numbers
  - Works in production with CloudWatch
- **Automatic support for multiple handler files**
  - No need to add a new entry to your `webpack.config.js`
- **Add environment variables for your stages**


## API Endpoints
Execute the following command to run functions locally to see exact return format:
``` bash
$ serverless invoke local --function funcName --path path/to/mock_file
```
###Notes
---
####createNote
- Creates new note for currently authenticated user
- Path: **/notes**
- Method: **POST**

####getNote
- Returns note with specified ID for currently authenticated user
- Path: **/notes/{id}**
- Method: **GET**

####listNotes
- Fetches all notes records for currently authenticated user
- Path: **/notes**
- Method: **GET**

####updateNote
- Updates the note with the provided ID
- Path: **/notes/{id}**
- Method: **PUT**

####removeNote
- Deletes the note with the provided ID
- Path: **/notes/{id}**
- Method: **DELETE**

###Configs
---
####listConfigs
- Fetches configurations  for currently authenticated user
- Path: **/configs**
- Method: **GET**

####updateConfigs
- Updates configurations for currently authenticated user
- Path: **/configs**
- Method: **PUT**

###Goals
---
####createGoal
- Creates a new goal for currently authenticated user
- Path: **/goals**
- Method: **POST**

####removeGoal
- Deletes goal with the provided ID
- Path: **/goals/{id}**
- Method: **DELETE**

####getGoalProgress
- Fetches list of goals for currently authenticated user with current progress field
- Path: **/goals/progress**
- Method: **GET**

####getGoalSummary
- Returns aggregate goals for each measure (Day, Week, Month) with current progress
- Path: **/goals/summary**
- Method: **GET**


### Installation
Prerequisites:
- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

Install the Node.js packages

``` bash
$ npm install
```

### Usage

To run unit tests on your local

``` bash
$ npm test
```

To run a function on your local

``` bash
$ serverless invoke local --function funcName --path path/to/mock_file
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function funcName
```

To add environment variables to project
1. Rename `env.example` to `env.yml`.
2. Add environment variables for the various stages to `env.yml`.
3. Uncomment `environment: ${file(env.yml):${self:provider.stage}}` in the `serverless.yml`.
4. Make sure to not commit your `env.yml`.

