const rl = require("readline");
const test = {};
let variants = ["A", "B", "C", "D"];
let idx = 0;
const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const handleQuestion = () => {
  readLine.question("Savol matini kiriting: ", (data) => {
    if (!data) handleQuestion();
    test.question = data;
    handleQuestionVariants(idx);
  });
};
function handleQuestionVariants(variantIndex) {
  if (variants[variantIndex]) {
    readLine.question(`${variants[variantIndex]}) `, (data) => {
      if (!data) handleQuestionVariants();
      if (variants.length == variantIndex) {
        handleQuestionData();
      } else {
        test.options = test.options || [];
        test.options.push({ [variants[variantIndex]]: data });
        handleQuestionVariants(++idx);
      }
    });
  } else {
    handleQuestionData();
  }
}
function handleQuestionData() {
  readLine.question("Javobni variantini kiriting: ", (data) => {
    if (!data) handleQuestionData();
    if (!Object.keys(test.options[0])?.includes(data)) handleQuestionData();
    test.javob = data;
    if (test.javob) {
      handleTestStart();
    }
  });
}
function handleTestStart() {
  readLine.question("Testni boshlaymizmi (Yes || No)", (data) => {
    handleUserTestResponse(data);
  });
}
function handleUserTestResponse(data) {
  let yes = "Yes";
  if (data.toLowerCase().trim() == yes.toLowerCase().trim()) {
    handleStartTest();
  } else {
    console.log("O'zingiz bilasiz");
    readLine.close();
  }
}
function handleStartTest() {
    readLine.question(
    test.question.includes(" ?") ? test.question : test.question.concat(" ?"),
    (data) => {
      if(test.javob == data){
        console.log("Tugri javob 😁", ` \n ${JSON.stringify(test, null, 4)}`)
        readLine.close()
    }else{
        console.log("Afsuski xato javob !!!")
        readLine.close()
    }
    }
  );
}
handleQuestion();
