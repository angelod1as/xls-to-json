const transformer = require('./transformer');

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

		// create empty object for each state
		if (!obj[uf]) {
			obj[line['Código do município']] = {};
		}

		// populate states
		obj[line['Código do município']] = {
			code: line['Código do município'],
			city_name: line['Município'],
			uf_code: line['Código da UF'],
			uf: line.UF,
			uf_name: line.Estado,
			avg: {
				enem: {
					quiz: line['Enem 2018 - provas objetivas'],
					essay: line['Enem 2018 - redação'],
				},
				students: {
					fundamental: line['Média de alunos / turma (ensino fundamental)'],
					medio: line['Média de alunos / turma (ensino médio)']
				},
				hour_class: {
					fundamental: line['Média horas/aula diária (ensino fundamental)'],
					medio: line['Média horas/aula diária (ensino médio)']
				},
				age_distortion_rate: {
					fundamental: line['Taxa distorção idade-série (ensino fundamental)'],
					medio: line['Taxa distorção idade-série (ensino médio)']
				},
				teacher_percent: {
					fundamental: line['% de docentes com curso superior (ensino fundamental)'],
					medio: line['% de docentes com curso superior (ensino médio)']
				},
				approval_rate: {
					fundamental: line['Taxa de aprovação (ensino fundamental)'],
					medio: line['Taxa de aprovação (ensino médio)']
				},
				reproval_rate: {
					fundamental: line['Taxa de reprovação (ensino fundamental)'],
					medio: line['Taxa de reprovação (ensino médio)']
				},
				abandon_rate: {
					fundamental: line['Taxa de abandono (ensino fundamental)'],
					medio: line['Taxa de abandono (ensino médio)']
				},
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
						mt: line['Saeb 2017 (média - 3º ano do médio - matemática)'],
					},
				},
			},
		};
	}
	progressBar.stop();

	return obj;
};

module.exports = structureAverages;