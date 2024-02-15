# SBA 308: JavaScript Fundamentals

* **Name**: Richard Tillies
* **Date**: February 19, 2024

## Description
This JavaScript application gathers and processes data for a course (including assignments, learners, submissions, and scores). The application processes the data and outputs an array of objects. For example, for a given data set, the application returns output as follows:

```javascript
{
  id: 125, avg: 0.985, 1: 0.94, 2: 1.0
},
{
  id: 132, avg: 0.82, 1: 0.78, 2: 0.833
}
```

Each object represents an individual learner.
* `id`: Learner ID
* `avg`: weighted average for all assignments
* `1`, `2`, etc.: individual grades per assignment

## How to run in Chrome browser

1. Clone repo to local machine
1. Open `index.html` in browser
1. Right-click and choose **Inspect** to open developer tools
1. Choose **Console** tab in Dev Tools
1. Expand section under **Final Results** to view output

## Requirements

| Status             | Requirement                                                                                                                                          | Weight |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| :white_check_mark: | Declare variables properly using let and const where appropriate.                                                                                    | 5%     |
| :white_check_mark: | Use operators to perform calculations on variables and literals.                                                                                     | 5%     |
| :white_check_mark: | Use strings, numbers, and Boolean values cached within variables.                                                                                    | 5%     |
| :white_check_mark: | Use at least two if/else statements to control program flow. Optionally, use at least one switch statement.                                          | 10%    |
| :white_check_mark: | Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program.            | 5%     |
| :white_check_mark: | Utilize at least two different types of loops.                                                                                                       | 5%     |
| :white_check_mark: | Utilize at least one loop control keyword such as break or continue.                                                                                 | 3%     |
| :white_check_mark: | Create and/or manipulate arrays and objects.                                                                                                         | 10%    |
| :white_check_mark: | Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object.                                                | 5%     |
| :white_check_mark: | Use functions to handle repeated tasks.                                                                                                              | 10%    |
| :white_check_mark: | Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior.      | 20%    |
| :white_check_mark: | Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). | 10%    |
| :white_check_mark: | Commit frequently to the git repository.                                                                                                             | 5%     |
| :white_check_mark: | Include a README file that contains a description of your application.                                                                               | 2%     |
