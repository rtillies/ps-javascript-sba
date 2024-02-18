// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Today's date
const TODAY = new Date().toJSON();

/**
 * Main function that does all the work
 * Wasn't sure if we were supposed to keep this declaration as is
 * @param {object} course: info about the course
 * @param {object} ag: info about the assignments in a course
 * @param {[object]} submissions: array of learner submissions
 * @returns array of learners and grade summaries
 */
function getLearnerData(course, ag, submissions) {
  const allAssignments = createAssignmentList(course, ag) // valid assignment objects
  const result = createLearnerList(submissions) // valid learner objects

  // console.log("All Assignments:");
  // console.log(allAssignments);
  // console.log("All Learners:");
  // console.log(result);
  // console.log("All Submissions:");
  // console.log(submissions);

  // Iterate through each submission
  submissions.forEach((sub) => {
    let score, grade // , learnerID, assignID;
    // console.log(`Sub assign id ${sub.assignment_id}`);
    
    let found = false // flag for matching assignment
    // Iterate through assignments array of objects
    for (const assign of allAssignments) {
      // console.log(`Assign id ${assign.id}`);

      // Find the submission that matches the assignment
      if (assign.id == sub.assignment_id) {
        found = true // found a matching assignment

        // Determine if assignment is late
        // and adjust score accordingly
        const lateSub = sub.submission.submitted_at > assign.due_at
        score = lateSub 
          ? sub.submission.score - assign.points_possible / 10
          : sub.submission.score

        // Calculate individual assignment score
        grade = score / assign.points_possible

        // Find the learner object for this assignment submission
        const foundLearner = result.find((learner) => {
          return learner.id === sub.learner_id
        })  

        // console.log("Found learner");
        // console.log(foundLearner);
        // console.log(`POST: assignID: ${assign.id} learnerID: ${sub.learner_id} Grade: ${grade}`);

        // Attach a "temporary" grade object to the learner
        // Will be fixed in calcAverage
        let gradeObject = {}
        gradeObject.id = assign.id
        gradeObject.points = score
        gradeObject.max = assign.points_possible
        gradeObject.grade = Number((score / assign.points_possible).toFixed(3))
        foundLearner[assign.id] = gradeObject
  
        break // when assign.id == sub.assignment_id
      }

    }
    if (!found) {
      const missingAssign = ag.assignments.find((assign) => {
        return assign.id === sub.assignment_id
      })
      // console.log(missingAssign);

      if (!missingAssign) { // not in assignment list
        console.log(`Error: Assignment ${sub.assignment_id} does not exist`);
      }
      else if (missingAssign.due_at > TODAY) { // not yet due
        console.log(`Note to Learner ${sub.learner_id}: Assignment ${missingAssign.id} is not yet due`);
      } else { // assignment exists but invalid
        console.log(`Error: Assignment ${missingAssign.id} is invalid`);
      }
    }
  })
  
  // Loop through each learner and call calcAverage function
  for(const learner of result) {
    calcAverage(learner)
  }

  return result // this is the final output
}

/**
 * Calcuate average grade for an individual learner
 * @param {object} learner : learner object with id and grade info
 */
function calcAverage(learner) {
  let pointTotal = 0
  let maxTotal = 0

  // iterate through objects within the learner object
  // add up total score and total possible points
  // replace the "grade object" with just the grade for the individual assignment
  Object.keys(learner).forEach(key => {
    // skip the id key
    if (key !== "id") {
      pointTotal += learner[key].points
      maxTotal += learner[key].max
      learner[key] = learner[key].grade
    }

    // calculate weighted average to 3 decimal places
    let average = Number((pointTotal / maxTotal).toFixed(3));

    // attach average to learner object
    learner.avg = average;
  });
}

/**
 * Create array of Learner objects
 * @param {*} subs : Array of submission objects
 * @returns array of learner objects with id key
 */
function createLearnerList(subs) {
  const learnerList = []
  const idList = []

  subs.forEach(learner => {
    let id = learner.learner_id
    if(!idList.includes(id)) {
      idList.push(id)
      const learner = {}
      learner.id = id
      learnerList.push(learner)
    }
  })

  // console.log(learnerList);
  // return idList
  return learnerList
}

/**
 * Create an array of assignments that have been due
 * @param {object} c : course info 
 * @param {object} ag : group of assignments
 * @returns array of assignment objects
 */
function createAssignmentList(c, ag) {
  const assignList = []
  // const today = new Date().toJSON();

  // Errors to check:
  // - course ids do not match
  // - course group weight <= 0
  // - assignment possible points <= 0 
  // Otherwise, push assignment into array if due date has passed
  if (ag.course_id !== c.id) {
    console.log("Error: Assignment Group does not belong to Course");
  } else if (ag.group_weight <= 0) {
    console.log("Error: Assignment Group weight must greater than 0");
  } else {
    ag.assignments.forEach((assign) => {
      if (assign.points_possible <= 0) {
        console.log(`Error: Assignment ${assign.id}, points possible must greater than 0`);
      } else if(assign.due_at < TODAY) {
        assignList.push(assign)
      }
    })
  }

  // console.log("Assignment List:");
  // console.log(assignList);
  return assignList
}


// Main program
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("Final Results");
console.log(result);
