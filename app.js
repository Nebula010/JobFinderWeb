const express = require('express');
const { createEngine } = require('express-react-views');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

const app = express();
const port = 3000;

db.serialize(function() {

	db.run('CREATE TABLE lorem (info TEXT)');
	var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

	for (var i = 0; i < 10; i++) {
		stmt.run('Ipsum ' + i);
	}

	stmt.finalize();

	db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
		console.log(row.id + ': ' + row.info);
	});
});

db.close();


app.set('views', __dirname + '/views');
app.set('view engine', 'js');
app.engine('js', createEngine());

app.get('/', (req, res, next) => {
	res.render('index.js', { name: 'world' });
});

app.listen(
	port,
	() => console.log(`\uD83C\uDF0F running at http://localhost:${port}`)
);