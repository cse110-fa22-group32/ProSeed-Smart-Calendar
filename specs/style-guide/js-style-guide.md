# Group 32 JS Style Guidelines
Summarized/modified from the Google JS style guide ([link](https://google.github.io/styleguide/jsguide.html))
## Basics
1. File names are all lowercase and may include underscores or dashes
2. Use spaces for indentation, not tabs
3. Source file structure (in order): license/copyright, `@fileoverview` JSDoc, import statements, file implementation
4. Separate each source file section with one blank line
## Imports
1. Do not line wrap (exception to 80 column limit)
2. Always include `.js` file extension in import path
3. Use lowerCamelCase for module import names
4. Module import names should be derived from the imported file name
5. Named imports should keep the same name
## Exports
1. Do not use default exports, always use named exports
2. Do not create circular dependencies (import/export cycles) between files
## Formatting
1. Use braces for if, else, for, while, etc. (Exception: simple if statements that can fit on a single line)
2. Use K&R style for braces ([link](https://google.github.io/styleguide/jsguide.html#formatting-nonempty-blocks))
3. Indent new blocks with two spaces
4. Do not add semicolon after class methods or class declarations
5. Indent anonymous functions in function calls by two spaces
6. Indent switch case contents by two spaces
## Statements
1. One statement per line
2. Each statement must be terminated with semicolon
3. 80 column limit (except for URLs, string literals, imports)
4. When line wrapping, break at higher syntactical levels ([link](https://google.github.io/styleguide/jsguide.html#formatting-where-to-break))
5. Indent continuation lines with at least four spaces
## Whitespace
1. Vertical whitespace (blank lines) between class/object methods, file sections
2. Trailing whitespace is forbidden
3. Use a single space 
   1. Between reserved words (if, for, etc.) and open parenthesis `(`, except for function and super
   2. Between reserved words and closing curly brace on same line
   3. Before open curly braces
   4. On both sides of operators (except unary)
   5. After commas (never before)
   6. After colons in objects
   7. On both sides of end of line comments `//`
4. Do not horizontally align tokens on previous lines
## Parentheses
1. Use parentheses to group expressions
2. Do not use parentheses around the entire expression following `delete`, `typeof`, `void`, `return`, `throw`, `case`, `in`, `of`, `yield`
## Implementation comments
1. Block comments may use single or multi-line `/* ... */` or `//`, but not JSDOc `/** ... */`
2. Use parameter name comments for clarity
## Local variables
1. Do not use var
2. One variable per declaration on their own lines
3. Declare when needed (doesn't have to be at block start)
4. Initialize as soon as possible
## Arrays
1. Use trailing commas
2. Do not use `Array()` constructor, use square bracket initializer
## Objects
1. Use trailing commas
2. Do not use `Object()` constructor, use curly brace initializer
3. Do not mix quoted and unquoted keys in the same object
## Classes
1. Optional constructors
2. Set fields in constructor and use JSDoc annotations
3. Do not use Javascript getter/setter properties, instead provide methods
## Functions
1. Use arrow functions over function keyword
2. Use parentheses around single parameters of arrow functions
3. Document parameters and return types with JSDoc
## String literals
1. Use single quotes not double quotes
2. Use template literals to avoid multiple string concatenations
3. Template literals do not need to follow the indentation of enclosing block
4. Do not use line continuations in string/template literals (backslashes followed by newline)
## For loops
1. Use for-of loops when possible
2. Do not use for-in loops over arrays
## Throwing exceptions
1. Always throw Errors using new
2. Never throw strings or other objects
3. Use custom exceptions if Error is insufficient
## Switch statements
1. Use fall through comments
2. Always include a default case at end, even if empty
## Equality checks
1. Use strict equality/inequality unless checking for null or undefined
## Miscellaneous do-not-dos
1. Do not use new for primitive objects, just call them as functions
2. Do not modify built-in object types
3. When using new, always use parentheses for constructor call
## Naming
1. Read the entire section on naming: [link](https://google.github.io/styleguide/jsguide.html#naming)
2. In short: Make names readable, use only letters and numbers
3. Package names: lowerCamelCase
4. Class names: UpperCamelCase, nouns
5. Method names: lowerCamelCase, verbs; private methods end with underscore
6. Constant names: CONSTANT_CASE, nouns; use judiciously: not every const variable is truly a constant
7. Non-constant field names: lowerCamelCase, nouns; private fields end with underscore
8. Parameter names: lowerCamelCase
9. Local variables: lowerCamelCase; constants within functions are lowerCamelCase
10. For ambiguous camel case: [link](https://google.github.io/styleguide/jsguide.html#naming-camel-case-defined)
## JSDoc
1. Read the entire section on documentation: [link](https://google.github.io/styleguide/jsguide.html#jsdoc)
2. In short: document all classes, fields, methods, enums/typedefs, property types
3. Each `@tag` is on their own line unless it does not require additional data (`@private`, `@const`, `@final`, etc.)
4. Indent block tags with four spaces
5.  `@fileoverview` file-level comments at the top of the file are recommended, may include author information
6. Methods and named functions must be documented
7. Method/named functions descriptions should start with a verb phrase, e.g. "Operates on ..."
8. Anonymous functions can be optionally documented
9. Use type annotations enclosed in braces to indicate variable type
10. Nullability modifiers must precede the type
11. Always use nullability modifiers when documenting reference types (classes/enums/typedefs/etc.)
12. When using function type expressions (e.g. when a parameter is a function), always specify return types