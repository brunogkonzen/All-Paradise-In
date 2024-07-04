const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');

const child = spawn(electron, [path.join(__dirname, 'main.js')]);

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
