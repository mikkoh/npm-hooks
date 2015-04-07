var npmHooksManager = require('./..');
var test = require('tape');
var fs = require('fs');
var path = require('path');

var PATH_TEST_FOLDER = path.join('test', 'test_node_modules');
var PATH_INSTALL = path.join(PATH_TEST_FOLDER, 'node_modules', '.hooks', 'install');

try {
	fs.mkdirSync(PATH_TEST_FOLDER);
} catch(e) {}

try {
  fs.unlinkSync(PATH_INSTALL);
} catch(e) {}

test('creating install', function(t) {

  npmHooksManager.install('a', PATH_TEST_FOLDER, function(err) {

    if(err) {

      t.fail(err);
      t.end();
      return;
    }

    t.ok(fs.existsSync(PATH_INSTALL), 'created install script');
    t.equal(fs.readFileSync(PATH_INSTALL, 'utf8'), 'a', 'contents were correct after write');
    t.end();
  });
});

test('appending to install', function(t) {

  npmHooksManager.install('b', PATH_TEST_FOLDER, function(err) {

    if(err) {

      t.fail(err);
      t.end();
      return;
    }

    t.equal(fs.readFileSync(PATH_INSTALL, 'utf8'), 'a && b', 'contents were correct after write');
    t.end();
  });
});