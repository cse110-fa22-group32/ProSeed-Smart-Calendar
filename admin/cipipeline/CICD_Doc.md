The CI pipeline has 7 actions right now.

1. Codacy: This action is not shown udner Actions tab. It is a free service provided by Codacy company. As for now, it will check the main branch only and prevanting any pull request which it considers to have issue of critical severity to be merged to the main branch.
2. HTML5Validator: Test the quality of HTML file.
3. JSDoc_generation: This action is used to autogenerate documentation for .js file inside source/assets/scripts/ in main branch for every pull request to the main branch. For it to generate documentation, .js files have to have comments that obeys rules defined in https://jsdoc.app/. Until now, it will put all documentation into JSDoc_generation branch using force push. The documentation there will be merged into main after human review. 
4. Lint Code Base: Not known now.
5. Deploy Jekyll with GitHub Pages dependencies preinstalled: it is a action to deploy GitHub Page. The only difference between it and usually way is that it read index.html from source instead of root directory.
6. Test: This is for automatic E2E test. It tests all E2E test in login.test.js file.
7. Unit Test: This is for unit test. For now, it tests all unit test in calendar_helper.test.js file.
