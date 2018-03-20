ngBraveAuth App for SmartAdmin AngularJS
========================================

Development
-----------
To run the code in your development environment:

1. Run `git clone --recursive git@bravelab.com:bravelab/angular-brave-auth.git angular-brave-auth`
2. Run `npm install`
3. Run `gulp` for watch changes in code

For develop module on local

1. Run `bower link` on component directory
2. Go to the app root directory and run `bower link angular-brave-auth` (Notice! You must re-link your bower module in app after changes in component) 
3. Run `gulp test` for karma tests

Production
----------
To build minified version:

1. Run `gulp dist`
2. Add files to repo `git add .`
3. Commit changes `git commit -m "Message"`
3. Make tag version `git tag -a x.y.z`
4. Push version to git `git push --tags`
