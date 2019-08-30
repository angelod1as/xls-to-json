const transformer = require('./transformer');

// builds json structure
const structureSchool = async (sheet, progressBar) => {
	const obj = {};

	progressBar.start(sheet.length, 0);

	for (let i = 0; i < sheet.length; i += 1) {
		progressBar.increment();
		const line = sheet[i];

		const school = `school-${line['Código da entidade']}`;

		// create empty object for each school
		if (!obj[school]) {
			obj[school] = {};
		}

		// Transforming repeating data into numbers
		const tran = transformer(line);

		// populate school
		obj[school] = {
			code: tran.code ? tran.code : line['Código da entidade'],
			name: tran.name ? tran.name : line['Nome da escola'],
			public_private: tran.public_private ? tran.public_private : line['Pública ou privada'],
			type: tran.type ? tran.type : line.Tipo,
			address: {
				uf_code: tran.uf_code ? tran.uf_code : line['Código da UF'],
				uf: tran.uf ? tran.uf : line.UF,
				uf: tran.uf ? tran.uf : line.Estado,
				city_code: tran.city_code ? tran.city_code : line['Código do município'],
				city: tran.city ? tran.city : line['Município'],
				location: tran.location ? tran.location : line['Localização'],
				district: tran.district ? tran.district : line.Bairro,
				cep: tran.cep ? tran.cep : line.CEP,
				address_type: tran.address_type ? tran.address_type : line['Tipo de logradouro'],
				address: tran.address ? tran.address : line['Endereço'],
				compl: tran.compl ? tran.compl : line['Complemento do endereço'],
				email: tran.email ? tran.email : line.Email,
				zone: tran.zone ? tran.zone : line.Zona,
				phone: {
					DDD: tran.DDD ? tran.DDD : line.DDD,
					phones: [tran.Fone1 ? tran.Fone1 : line.Fone1, tran.Fone2 ? tran.Fone2 : line.Fone2],
				}
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
			avg: {
				enem: {
					quiz: tran.quiz ? tran.quiz : line['Enem 2018 - provas objetivas'],
					essay: tran.essay ? tran.essay : line['Enem 2018 - redação'],
				},
				students: {
					fundamental: tran.students ? tran.students : line['Média de alunos / turma (ensino fundamental)'],
					medio: tran.students ? tran.students : line['Média de alunos / turma (ensino médio)']
				},
				hour_class: {
					fundamental: tran.hour_class ? tran.hour_class : line['Média horas/aula diária (ensino fundamental)'],
					medio: tran.hour_class ? tran.hour_class : line['Média horas/aula diária (ensino médio)']
				},
				age_distortion_rate: {
					fundamental: tran.age_distortion_rate ? tran.age_distortion_rate : line['Taxa distorção idade-série (ensino fundamental)'],
					medio: tran.age_distortion_rate ? tran.age_distortion_rate : line['Taxa distorção idade-série (ensino médio)']
				},
				teacher_percent: {
					fundamental: tran.teacher_percent ? tran.teacher_percent : line['% de docentes com curso superior (ensino fundamental)'],
					medio: tran.teacher_percent ? tran.teacher_percent : line['% de docentes com curso superior (ensino médio)']
				},
				approval_rate: {
					fundamental: tran.approval_rate ? tran.approval_rate : line['Taxa de aprovação (ensino fundamental)'],
					medio: tran.approval_rate ? tran.approval_rate : line['Taxa de aprovação (ensino médio)']
				},
				reproval_rate: {
					fundamental: tran.reproval_rate ? tran.reproval_rate : line['Taxa de reprovação (ensino fundamental)'],
					medio: tran.reproval_rate ? tran.reproval_rate : line['Taxa de reprovação (ensino médio)']
				},
				abandon_rate: {
					fundamental: tran.abandon_rate ? tran.abandon_rate : line['Taxa de abandono (ensino fundamental)'],
					medio: tran.abandon_rate ? tran.abandon_rate : line['Taxa de abandono (ensino médio)']
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

module.exports = structureSchool;