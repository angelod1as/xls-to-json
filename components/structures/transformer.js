const transformer = (line) => {
	// Transforming repeating data into numbers

	const lower = (it) => {
		if(it && typeof it === 'string') {
			return it.toLowerCase();
		} return it;
	};

	const tran = {
		public_private: lower(line['Pública ou privada']) === 'privada' ? 1 : 2,
		location : lower(line['Localização']) === 'urbana' ? 1 : 2,
		computer_lab: lower(line['Laboratório de informática']) === 'não' ? 1 : 2,
		science_lab: lower(line['Laboratório de ciências']) === 'não' ? 1 : 2,
		sports_court: lower(line['Quadra de esportes']) === 'não' ? 1 : 2,
		library: lower(line.Biblioteca) === 'não' ? 1 : 2,
		pne_dep: lower(line['Dependências acessíveis para pessoas com necessidades especiais']) === 'não' ? 1 : 2,
		internet: lower(line.Internet) === 'não' ? 1 : 2,
		fundamental: lower(line['Ensino fundamental']) === 'não' ? 1 : 2,
		medio: lower(line['Ensino médio']) === 'não' ? 1 : 2,
		english: lower(line['Disciplina de inglês']) === 'não' ? 1 : 2,
		spanish: lower(line['Disciplina de espanhol']) === 'não' ? 1 : 2,
		french: lower(line['Disciplina de francês']) === 'não' ? 1 : 2,
	};

	if (lower(line.Tipo) === 'privada') {
		tran.type = 0;
	} else if (lower(line.Tipo) === 'federal') {
		tran.type = 1;
	} else if (lower(line.Tipo) === 'estadual') {
		tran.type = 2;
	} else {
		tran.type = 3;
	}

	if (lower(line.Zona) === 'centro') {
		tran.zone = 2;
	} else if (lower(line.Zona) === 'norte') {
		tran.zone = 3;
	} else if (lower(line.Zona) === 'leste') {
		tran.zone = 4;
	} else if (lower(line.Zona) === 'sul') {
		tran.zone = 5;
	} else if (lower(line.Zona) === 'oeste') {
		tran.zone = 6;
	} else {
		tran.zone = 1;
	}

	return tran;
};

module.exports = transformer;