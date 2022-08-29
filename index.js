const express = require('express');
const path = require('path');
const port = process.env.PORT || 3002;
const mysql = require('mysql2');
const hbs = require('hbs');
require('dotenv').config();
const app = express();

// Conexión a la Base de Datos
/*const conexion = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
}); */
/*
conexion.connect((err) => {
	if (err) {
		console.error(`Error en la conexión: ${err.stack}`);
		return;
	}
	console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
});*/

//Configurar Middelwares

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html', 'hbs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: false }));

//Configuración del Motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('index');
});
app.get('/nosotros', (req, res) => {
	res.render('nosotros');
});
/*
app.get('/contacto', (req, res) => {
	let sql = 'SELECT * FROM decatloncontacto';

	conexion.query(sql, (err, result) => {
		if (err) throw err;
		res.render('contacto', {
			results: result
		});
	});
});*/
app.post('/contacto', (req, res) => {
	const { dirEmail, nombre } = req.body;

	if (dirEmail == '' || nombre == '') {
        console.log("Campos vacios");
        let Error = 'Rellene los campos correctamente..';
        res.render('contacto', {
            Error
        });
	} else {
        let SinError = `Tus datos han sido recibidos: Email: ${dirEmail} y Nombre: ${nombre}`;
		let datos = {
			dirEmail: dirEmail,
			nombre: nombre
		};

		let sql = 'INSERT INTO decatloncontacto SET ?';

		conexion.query(sql, datos, (err, result) => {
			if (err) throw err;
			res.render('contacto', {
                SinError
            });
		});
	}
});
app.get('/servicios', (req, res) => {
	res.render('servicios');
});
app.get('/terminos-y-condiciones', (req, res) => {
	res.render('terminos-y-condiciones');
});
app.listen(process.env.PORT || port, () => {console.log(`El servidor está trabajando en http://localhost:${port}`);});
