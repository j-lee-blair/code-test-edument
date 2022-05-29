# code-test-edument

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### A note on my process  
```
I am a big fan of TDD and testing (once he initial setup is out of the way!)
There is a mixture of unit tests (component tests) and integration tests (App.spec.js) 
and together they provide a nice bit of psychological (and logical) scaffolding while writing new code. 
Having them ensures that when I am working in Component A, 
I am not inadvertently breaking component B that shares it as a dependency.

After the test switches from red to green, I then look over the entire test file to see if I can 
refactor and make the testing suite more efficient (see helpers.js)
Doing this means that as I write more tests, it becomes easier and easier to write more tests :)

There are various other comments sprinkled throughout the project. 
I have only commented things that I learned along the way or that I thought you might think were 'cool'.

Ok, enjoy!

```