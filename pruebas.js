import express from "express";
import { fork } from "child_process";
import sumar from "./prueba-hijo.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let visitas = 0;
app.get("/", (req, res) => {
	res.send(`Visitas totales: ${++visitas}`);
});

app.get("/calculo-bloq", (req, res) => {
	res.send(`Calculo: ${sumar()}`);
});

app.get("/calculo-nobloq", (req, res) => {
	const forked = fork("./prueba-hijo.js");
	forked.send("start");
	forked.on("message", (msg) => {
		res.send(`El calculo es: ${msg}`);
	});
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));
