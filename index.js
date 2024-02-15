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

/* 
function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}
 */

function getLearnerData(course, ag, submissions) {
  let allAssignments = createAssignmentList(course, ag)
  let allLearners = createLearnerList(submissions)
  const result = createLearnerObjectList(allLearners, allAssignments)

  submissions.forEach((sub) => {
    // const learnerID = sub.learner_id
    // const assignID = sub.assignment_id
    // const lScore = sub.submission.score
    // let maxScore;

    // for (const assign in allAssignments) {
    //   if (assign == sub.assignment_id) {
    //     maxScore = ag.assignments.points_possible
    //     console.log(`FOUND: assign: ${assign} id: ${sub.assignment_id} max: ${ag.assignments.points_possible}`);
    //     break
    //   }
    // }

    // console.log(`Learner ID: ${sub.learner_id}`);
    // console.log(`Assign ID:  ${sub.assignment_id}`);
    // console.log(`Sub Score:  ${sub.submission.score}`);
    // console.log(`Max Score: ${maxScore}`);
  })

  return result
}

function calcGrade(learnerObjs, submissions) {
}

function createLearnerObjectList(learners, assignments) {
  const objectList = []

  for (let i = 0; i < learners.length; i++) {
    const learner = {}
    learner.id = learners[i]
    learner.avg = 0
    for (const assign of assignments) {
      learner[assign] = 0
    }
    objectList.push(learner)
  }

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
  console.log(assignList);
  return assignList
}



// Main program
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

/* Final Results
[
  { '1': 0.94, '2': 1, id: 125, avg: 0.985 },
  { '1': 0.78, '2': 0.833, id: 132, avg: 0.82 }
]
 */