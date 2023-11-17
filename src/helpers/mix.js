const vscode = require('vscode');

function mix({ prefix = null, command, args = null, flags = null }) {
  const config = vscode.workspace.getConfiguration('vscode-elixir-test');
  let mixEnv = '';

  if (config.mixEnv !== null && config.mixEnv.length > 0) {
    mixEnv = `MIX_ENV=${config.mixEnv}`;
  }

  const p = prefix ? `${prefix} ` : mixEnv;
  const c = command ? `${command} ` : '';
  const a = args ? `${args} ` : '';
  const f = flags ? `${flags} ` : '';

  return `${p} mix ${c}${a}${f}`.trim();
}

function test() {
  return mix({ command: 'test' });
}

function testFailed() {
  return mix({ command: 'test', flags: '--failed' });
}

function testStale() {
  return mix({ command: 'test', flags: '--stale' });
}

function testPath(fileOrDirectory) {
  return mix({ command: 'test', args: fileOrDirectory });
}

function testFileAt(fileName, cursorPosition) {
  return mix({ command: 'test', args: `${fileName}:${cursorPosition}` });
}

function testWatch() {
  return mix({ command: 'test.watch' });
}

function testWatchPath(fileOrDirectory) {
  return mix({ command: 'test.watch', args: fileOrDirectory });
}

module.exports = {
  test,
  testFailed,
  testStale,
  testPath,
  testFileAt,
  testWatch,
  testWatchPath,
};
