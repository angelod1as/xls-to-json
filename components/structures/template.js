const _cliProgress = require('cli-progress');
const ufs = require('./ufs');
const avgs = require('./avgs');
const city = require('./city');
const school = require('./school');

const template = async (sheet, folder) => {
	// eslint-disable-next-line
  console.log(`\n\t Structuring <${folder}> JSON...\n\n`);

	const progressBar = new _cliProgress.Bar({
		format: 'structuring: {bar} {percentage}% | {value}/{total} | {duration_formatted}',
		barCompleteChar: '\u2588',
		barIncompleteChar: '\u2591',
		hideCursor: true,
		synchronousUpdate: true,
	});

	let structure;

	if (folder === 'ufs') {
		structure = await ufs(sheet, progressBar);
	} else if (folder === 'avgs') {
		structure = await avgs(sheet, progressBar);
	} else if (folder === 'city') {
		structure = await city(sheet, progressBar);
	} else if (folder === 'school') {
		structure = await school(sheet, progressBar);
	} else {
		// eslint-disable-next-line
		console.log('Structure file not found');
		return null;
	}

  	// eslint-disable-next-line
    console.log(`\n\t ... <${folder}> JSON structured\n\n`);

	return [structure, folder];
};

module.exports = template;