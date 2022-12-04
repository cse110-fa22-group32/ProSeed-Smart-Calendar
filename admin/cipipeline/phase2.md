# CI/CD Pipeline Overview

## Summary

- Currently, our phase 2 build pipeline starts with linking an issue with a branch. These issues are created during our initial sprint meeting and defined in our Projects  
- Next, our developers will code on this branch and make a pull request to our main
- We will implement unit and end to end tests for developers to check functionality (still integrating)
- The code undergoes a series of github checks, an HTML5 valdator, Codacy Quality Check, SuperLinter, and JSDoc generator.
- If these pass, and one of the scrum masters approves, the code is pushed to main. 
- The code in the main is deployed to our live github pages application

