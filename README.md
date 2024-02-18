# SBA 308: JavaScript Fundamentals

* **Name**: Richard Tillies
* **Date**: February 19, 2024

## Description
This JavaScript application gathers and processes data for a course (including assignments, learners, submissions, and scores). The application processes the data and outputs an array of objects. For example, for a given data set, the application returns output as follows:

```javascript
{ id: 125, avg: 0.985, 1: 0.94, 2: 1.0   },
{ id: 132, avg: 0.82,  1: 0.78, 2: 0.833 }
```

Each object represents an individual learner. *Note*: the order of the key-value pairs may differ from the example.
* `id`: Learner ID
* `avg`: weighted average for all assignments, as a decimal (e.g. `0.985 = 98.5%`)
* `1`, `2`, etc.: individual grades per assignment, as a decimal

## How to run in Chrome browser

1. Clone repo to local machine
1. Open `index.html` in browser
1. Right-click and choose **Inspect** to open developer tools
1. Choose **Console** tab in Dev Tools
1. Expand section under **Final Results** to view output

## Requirements

Requirements and grading rubric can be found [here](rubric.md)
