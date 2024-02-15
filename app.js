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

function getLearnerData(course, ag, submissions) {
  let allAssignments = createAssignmentList(course, ag)
  let learnIDlist = createLearnerList(submissions)
  // let allLearners = createLearnerObjectList(submissions)
  const result = createLearnerObjectList(learnIDlist, allAssignments)

  submissions.forEach((sub) => {
    // let learnerID = sub.learner_id
    // const assignID = sub.assignment_id
    // const lScore = sub.submission.score
    // let maxScore, grade, learnerID, assignID;
    let grade, learnerID, assignID;

    for (const assign of allAssignments) {
      // console.log(assign);
      // console.log(`Assign ID: ${assign.id}`);
      if (assign.id == sub.assignment_id) {
        grade = sub.submission.score / assign.points_possible
        // maxScore = assign.points_possible
        // learnerID = sub.learner_id
        // assignID = assign.id
        
        // console.log("All Learners:");
        // console.log(result);

        const foundLearner = result.find((learner) => {
          return learner.id === sub.learner_id
        })  

        console.log("Found learner");
        console.log(foundLearner);
        console.log(`POST: assignID: ${assign.id} learnerID: ${sub.learner_id} Grade: ${grade}`);

        let gradeObject = {}
        gradeObject.id = assign.id
        gradeObject.points = sub.submission.score
        gradeObject.max = assign.points_possible
        foundLearner[assign.id] = gradeObject
  
        break
      }
    }
  })

  return result
}

function calcAverage(learners) {
  let total = 0

}

function createLearnerObjectList(learners, assignments) {
  const objectList = []

  for (let i = 0; i < learners.length; i++) {
    const learner = {}
    learner.id = learners[i]
    objectList.push(learner)
  }

  console.log("Learner List:");
  console.log(objectList);
  return objectList
}

function createLearnerList(ls) {
  const learnerList = []
  ls.forEach(learner => {
    let id = learner.learner_id
    if(!learnerList.includes(id))
      learnerList.push(id)
  })
  return learnerList
}

function createAssignmentList(c, ag) {
  const assignList = []
  const today = new Date().toJSON();

  if (ag.course_id !== c.id) {
    console.log("Assignment Group does not belong to Course");
  } else {
    ag.assignments.forEach((assign) => {
      if(assign.due_at < today) {
        assignList.push(assign)
      }
    })
  }

  console.log("Assignment List:");
  console.log(assignList);
  return assignList
}


// Main program
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("Final Results");
console.log(result);
