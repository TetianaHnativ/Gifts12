import { gaps } from "../scripts/functions.js";

const testCases = [
  {
    description: "Should remove spaces from input",
    input: "john  doe",
    expectedOutput: "johndoe"
  },
  {
    description: "Should remove spaces from input",
    input: " Lorem ipsum Dolor sit ",
    expectedOutput: "LoremipsumDolorsit"
  },
  {
    description: "Should remove spaces from input",
    input: "  ",
    expectedOutput: ""
  },
];

function runTests() {
  testCases.forEach(testCase => {
    console.log(`Test Case: ${testCase.description}`);
    const testEvent = {
      target: { value: testCase.input }
    };
    gaps(testEvent);
    const actualOutput = testEvent.target.value;
    if (actualOutput === testCase.expectedOutput) {
      console.log("Test Passed");
    } else {
      console.error(`Test Failed. Expected: ${testCase.expectedOutput}, Actual: ${actualOutput}`);
    }
  });
}

runTests();
