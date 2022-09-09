import mongoose from "mongoose";
import app from "./src/server.js";
import yargs from "yargs";
import * as dotenv from "dotenv";
dotenv.config();

const args = yargs(process.argv.slice(2))
	.alias("p", "port")
	.describe("p", "Puerto del servidor")
	.help("h")
	.alias("h", "help")
	.argv;

const portArgs = args.port || 8080;

const PORT = process.env.PORT || portArgs;

const server = app.listen(PORT, async () => {
	await mongoose.connect(process.env.MONGO_CONNECT);
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));
