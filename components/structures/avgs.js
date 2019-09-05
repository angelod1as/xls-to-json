// const transformer = require('./transformer');

// builds json structure
const structureAverages = async (sheet, progressBar) => {
	const obj = {};

	progressBar.start(sheet.length, 0);

	for (let i = 0; i < sheet.length; i += 1) {
		progressBar.increment();
		const line = sheet[i];
		const uf = `avgs-${line.UF}`;

		// Transforming repeating data into numbers
		// const tran = transformer(line);

		// create empty object for each uf
		if (!obj[uf]) {
			obj[line['Código do município']] = {};
		}

		// separate public and private avgs
		const getNumbers = (fm, pp) => {
			// fm = fundamental or medio
			return {
				students: line[`${pp}_Média alunos/ turma Ensino ${fm}`],
				age_distortion_rate: line[`${pp}_Taxa distorção idade série Ensino ${fm}`],
				hour_class: line[`${pp}_Média horas/aula diária Ensino ${fm}`],
				teacher_percent: line[`${pp}_% Docentes curso superior Ensino ${fm}`],
				approval_rate: line[`${pp}_Taxa de aprovação Ensino ${fm}`],
				reproval_rate: line[`${pp}_Taxa de reprovação Ensino ${fm}`],
				abandon_rate: line[`${pp}_Taxa de abandono Ensino ${fm}`],
			};
		};

		const getTypes = (pp) => {
			// pp = public or private
			return {
				enem: {
					quiz: line[`${pp}_ENEM 2018 provas objetivas`],
					essay: line[`${pp}_ENEM 2018 redação`],
				},
				fundamental: getNumbers('Fundamental', pp),
				medio: getNumbers('Médio', pp),
			};
		};

		// populate ufs
		obj[line['Código do município']] = {
			code: line['Código do município'],
			city_name: line['Município'],
			uf_code: line['Código da UF'],
			uf: line.UF,
			uf_name: line.Estado,
			avg: {
				saeb: {
					ef5: {
						lp: line['Saeb 2017 (média - 5º ano -português)'],
						mt: line['Saeb 2017 (média - 5º ano -matemática)'],
					},
					ef9: {
						lp: line['Saeb 2017 (média - 9º ano -português)'],
						mt: line['Saeb 2017 (média - 9º ano -matemática)'],
					},
					em3 :{
						lp: line['Saeb 2017 (média - 3º ano do médio -português)'],
						mt: line['Saeb 2017 (média - 3º ano do médio -matemática)'],
					},
				},
				public: getTypes('Pública'),
				private: getTypes('Privada'),
			},
		};
	}
	progressBar.stop();

	return obj;
};

module.exports = structureAverages;