# Github Actions

## Context and Problem Statement

What Github actions should be included in our pipeline?


## Considered Options

- We considered the option of adding different Github Actions. Basically, we wanted to include one html validator, one documentator, one linter, and one code quality checker.
- For the Linter, we considered ESLinter which was recommended by the professor, and a SuperLinter. The superlinter seemed to have a much more thorough code review process.
- For the Documentation and Validators, we used the ones recommended in the course which were JSDoc and HTML5 Validator. These were found in the CI/CD pipeline assignment and Build and Dev Part 2 slid deck. We considered other HTML validators and documentators, but these seemed to be the easiest and safest option. 
- Finaly for the code quality checker we used Codacy to generate our quality code review. We considered CodeClimate as well. 

## Decision Outcome

Our pipeline includes the following tools: Github SuperLinter, Codacy, HTML5 Validator, and JSDoc. 