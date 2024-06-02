function gaps(event) {
    if (event.target.value.includes(" ")) {
      event.target.value = event.target.value.replace(/\s/g, "");
    }
  }

const testCases = [
    {
      description: "Should remove spaces from input",
      input: "John Doe",
      expectedOutput: "JohnDoe"
    },
    // Add more test cases as needed
  ];
  
  // Define a function to run the tests
  function runTests() {
    testCases.forEach(testCase => {
      console.log(`Test Case: ${testCase.description}`);
      const mockEvent = {
        target: { value: testCase.input }
      };
      gaps(mockEvent);
      const actualOutput = mockEvent.target.value;
      if (actualOutput === testCase.expectedOutput) {
        console.log("Test Passed");
      } else {
        console.error(`Test Failed. Expected: ${testCase.expectedOutput}, Actual: ${actualOutput}`);
      }
    });
  }
  
  // Run the tests
  runTests();
  