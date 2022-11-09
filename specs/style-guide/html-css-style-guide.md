# Group 32 HTML/CSS Style Guidelines
Summarized/modified from the Google HTML/CSS style guide ([link](https://google.github.io/styleguide/htmlcssguide.html))
## Formatting
1. Indent using 2 spaces, not tabs
2. All code must be lowercase (except strings)
3. Remove trailing whitespace
## Meta
1. Use UTF-8
2. Comment code as needed
3. Mark todos with TODO
## HTML
1. Use HTML5
2. Use valid HTML, check with W3C HTML validator before opening PR
3. Use semantic HTML
4. Provide alternative content for media, e.g. alt text
5. Separate HTML, CSS, JS into separate files 
6. Avoid unnecessary id attributes: Use class attributes for styling, data attributes for JS
7. If ids are needed, include a hyphen
8. For each block, list, or table element, use a new line and indent
9. Wrap long lines for readability and indent 4 spaces from original line
10. Use double quotes instead of single quotes
## CSS
1. Use valid CC, check with W3C CSS validator
2. Use meaningful class names of appropriate length
3. Separate words with hyphens in class names
4. Avoid using element names in type selectors, e.g. p.class
5. Avoid id selectors and use class selectors instead
6. Use shorthand properties
7. Omit units after 0 values unless needed
8. Include leading 0s, e.g. 0.8em
9. Use 3 character hex notation if possible
10. Avoid using !important, use selector specificity
11. Avoid "hacky" CSS
12. Alphabetize declarations
13. Indent blocks
14. Use semicolons after declarations
15. Use a single space after property name's colon
16. Use a single space between last selector and declaration block
17. Separate multiple selectors with newlines
18. Separate rules with blank line
19. Use single quotes instead of double quotes unless required
20. Group sections with comments