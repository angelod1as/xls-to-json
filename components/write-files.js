const _cliProgress = require('cli-progress');

const fs = require('fs').promises;
const filesize = require('filesize');
const path = require('path');

const writeFiles = async (array, output) => {

	// eslint-disable-next-line
	console.log('\tWriting files...\n');

	const progressBar = new _cliProgress.Bar({
		format: 'writing: {bar} {percentage}% | {value}/{total} | {duration_formatted}',
		barCompleteChar: '\u2588',
		barIncompleteChar: '\u2591',
		hideCursor: true,
		synchronousUpdate: true,
	});

	for (let z = 0; z < array.length; z += 1) {
		let bigger = 0;

		const [obj, folder] = array[z];

		const keys = Object.keys(obj);

		progressBar.start(keys.length, 0);

		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];
			const string = JSON.stringify(obj[key]);
			// create folder name
			const dirpath = path.join(output, folder);
			// create folders in system
			await fs.mkdir(dirpath, { recursive: true} );
			// create filename
			const newName = `${key}.json`.toLowerCase();
			// create each file
			await fs.writeFile(path.join(dirpath, newName), string);
			const {size} = await fs.stat(path.join(dirpath, newName));

			if (size > bigger) bigger = size;

			progressBar.increment();
			// eslint-disable-next-line
			// console.log(`\t\tfile ${i + 1}/${keys.length} => ${newName} => ${size}`);
		}
		progressBar.stop();
		// eslint-disable-next-line
		console.log(`\n\t\t bigger file: ${filesize(bigger)}\n`);
	}
	// eslint-disable-next-line
	console.log('\n\t...Finished writing files\n');
};

module.exports = writeFiles;