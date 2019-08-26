// builds json structure
const structureStates = async (sheet, progressBar) => {
	const obj = {};

	progressBar.start(sheet.length, 0);

	for (let i = 0; i < sheet.length; i += 1) {
		progressBar.increment();
		const line = sheet[i];
		const uf = `state-${line.UF}`;

		// create empty object for each state
		if (!obj[uf]) {
			obj[uf] = {};
		}

		// populate states
		obj[uf][line['Código do município']] = {
			city_name: line['Município'],
		};
	}
	progressBar.stop();

	return obj;
};

module.exports = structureStates;