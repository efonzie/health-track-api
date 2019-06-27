# Health-Track API

## API Endpoints

### Notes
- **userId (String)** - User ID
- **noteId (String)** - Note ID
- **habit (String)** - Habit the note has been recorded for
- **eventDatetime (Datetime)** - Datetime event being noted took place
- **note (String)** - Optional description of noted habit
- **attachment (String)** - Optional filename of attachment
- **createdAt (Datetime)** - Datetime record created

#### createNote
- Creates new note for currently authenticated user
- Path: **/notes**
- Method: **POST**

#### getNote
- Returns note with specified ID for currently authenticated user
- Path: **/notes/{id}**
- Method: **GET**

#### listNotes
- Fetches all notes records for currently authenticated user
- Path: **/notes**
- Method: **GET**

#### updateNote
- Updates the note with the provided ID
- Path: **/notes/{id}**
- Method: **PUT**

#### removeNote
- Deletes the note with the provided ID
- Path: **/notes/{id}**
- Method: **DELETE**

### Configs
- **userId (String)** - User ID
- **habits (String[])** - Array of strings (habits) configured for the user

#### listConfigs
- Fetches configurations  for currently authenticated user
- Path: **/configs**
- Method: **GET**

#### updateConfigs
- Updates configurations for currently authenticated user
- Path: **/configs**
- Method: **PUT**

### Goals
- **userId (String)** - User ID
- **goalId (String)** - Goal ID
- **habit (String)** - Habit the goal is tracking
- **target (Integer)** - Target number of recorded habits to reach goal
- **measure (String)** - Unit of measure for goal (Day, Week, Month)
- **createdAt (Datetime)** - Datetime record created

#### createGoal
- Creates a new goal for currently authenticated user
- Path: **/goals**
- Method: **POST**

#### removeGoal
- Deletes goal with the provided ID
- Path: **/goals/{id}**
- Method: **DELETE**

#### getGoalProgress
- Fetches list of goals for currently authenticated user with 'current' field indicating the progress towards the goal target
- Path: **/goals/progress**
- Method: **GET**

#### getGoalSummary
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

