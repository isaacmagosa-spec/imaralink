const { spawn } = require("child_process");
const nextBin = require.resolve("next/dist/bin/next");

const port = Number(process.env.PORT) || Number(process.env.port) || 3000;
console.log("PORT=" + port);

const child = spawn(process.execPath, [nextBin, "start", "-H", "0.0.0.0", "-p", String(port)], {
  stdio: "inherit"
});
child.on("exit", (code) => process.exit(code));
