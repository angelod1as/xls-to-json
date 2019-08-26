// Author: Angelo Dias
// Version: 0.0.1
const path = require('path');
const { MultiSelect } = require('enquirer');
const fs = require('fs').promises;

const filterFiles = require('./components/filter-files');
const structure = require('./components/structure');
const xlsxToJson = require('./components/xlsx');
const writeFiles = require('./components/write-files');

// eslint-disable-next-line
console.clear();

const input = path.join(__dirname, 'input');
const output = path.join(__dirname, 'output');

const expected = ['municipios.xlsx', 'escolas.xlsx'];

// runs script synchronously
const run = async () => {
	// create output folder
	await fs.mkdir(output, { recursive: true} );

	// eslint-disable-next-line
	console.log(`Running\n\nFiles expected:\n${expected.join(', ')}\n\n`);
	const files = await filterFiles(input);

	// eslint-disable-next-line
	console.log(`Found ${files.length} .xlsx files \n`);

	const prompt = new MultiSelect({
		name: 'Files',
		message: 'What json file do you want to build? (Multiple choices)',
		choices: files
	});

	const inPrompt = async (answers) => {
		for (let i = 0; i < answers.length; i += 1) {
			const selected = answers[i];

			// eslint-disable-next-line
			console.log(`\n\nReading file ${i + 1} of ${answers.length}\n\n`);
			const filename = selected.split('.xlsx')[0];

			if (expected.includes(selected)) {

				// eslint-disable-next-line
				console.log(`Working file "${filename}"\n`);
				const sheet = await xlsxToJson(input, selected);

				const documents = await structure(sheet, filename);

				writeFiles(documents, output);

			} else {
				// eslint-disable-next-line
				console.log(`File "${filename}" not expected. Check filename. \n\tExpected: ${expected.join(', ')}\n\n`);
			}
		}
	};

	if (process.env.NODE_ENV === 'development') {
		const answers = ['escolas.xlsx'];
		inPrompt(answers);
	} else {
		prompt.run()
			.then(async (answers) => {
				inPrompt(answers);
			})
			.catch(() => {
				// eslint-disable-next-line
				console.log('Oops, no files were selected\nTry again\n\n');
			});
	}
};

run();
