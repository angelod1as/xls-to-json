const transformer = require('./transformer');

// builds json structure
const structureCity = async (sheet, progressBar) => {
	const obj = {};

	progressBar.start(sheet.length, 0);

	for (let i = 0; i < sheet.length; i += 1) {
		progressBar.increment();
		const line = sheet[i];

		// code for SP = 3550308
		// code for RJ = 3304557

		let municipio = '';

		if (line['Código do município'] === 3550308) {
			municipio = `city-${line['Código do município']}-${line.Zona ? line.Zona.toLowerCase() : 'semzona'}`;
			if (line.Zona === undefined || line.Zona === 'undefined') {
				// municipio = `city-${line['Código do município']}-${line.Zona ? line.Zona.toLowerCase() : ''}`;
			}
		} else {
			municipio = `city-${line['Código do município']}`;
		}
		// create empty object for each city
		if (!obj[municipio]) {
			obj[municipio] = {};
		}

		// Transforming repeating data into numbers
		const tran = transformer(line);

		// populate city with schools
		obj[municipio][line['Código da entidade']] = {
			code: line['Código da entidade'],
			name: tran.name ? tran.name : line['Nome da escola'],
			public_private: tran.public_private ? tran.public_private : line['Pública ou privada'],
			type: tran.type ? tran.type : line.Tipo,
			address: {
				city_code: line['Código do município'],
				city: tran.city ? tran.city : line['Município'],
				location: tran.location ? tran.location : line['Localização'],
				// address_type: tran.address_type ? tran.address_type : line['Tipo de logradouro'],
				zone: tran.zone ? tran.zone : line.Zona,
			},
			utilities: {
				computer_lab: tran.computer_lab ? tran.computer_lab : line['Laboratório de informática'],
				science_lab: tran.science_lab ? tran.science_lab : line['Laboratório de ciências'],
				sports_court: tran.sports_court ? tran.sports_court : line['Quadra de esportes'],
				library: tran.library ? tran.library : line.Biblioteca,
				pne_dep: tran.pne_dep ? tran.pne_dep : line['Dependências acessíveis para pessoas com necessidades especiais'],
				internet: tran.internet ? tran.internet : line.Internet,
			},
			school_type: {
				fundamental: tran.fundamental ? tran.fundamental : line['Ensino fundamental'],
				medio: tran.medio ? tran.medio : line['Ensino médio'],
			},
			languages: {
				english: tran.english ? tran.english : line['Disciplina de inglês'],
				spanish: tran.spanish ? tran.spanish : line['Disciplina de espanhol'],
				french: tran.french ? tran.french : line['Disciplina de francês'],
			}
		};
	}
	progressBar.stop();

	return obj;
};

module.exports = structureCity;