const sumar = () => {
	let suma = 0;
	for (let i = 0; i < 4e9; i++) {
		suma += i;
	}
	return suma;
};

process.on("message", (msg) => {
	if (msg === "start") {
		process.send(sumar());
		process.exit();
	} else {
		process.send("No se ha iniciado el calculo.");
		process.exit();
	}
});

export default sumar;
