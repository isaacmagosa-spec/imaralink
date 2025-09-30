const { spawn } = require(" child_process\);
const port = process.env.PORT || process.env.port || 3000;
console.log(\PORT=\ + port);
const child = spawn(\node_modules/.bin/next\, [\start\,\-H\,\0.0.0.0\,\-p\, String(port)], { stdio: \inherit\, shell: true });
child.on(\exit\, code => process.exit(code));
