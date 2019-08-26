const template = require('./structures/template');

const structure = async (sheet, filename) => {
	const array = [];

	if (filename === 'municipios') {
		array.push(await template(sheet, 'states'));
		array.push(await template(sheet, 'avgs'));
	} else if (filename === 'escolas') {
		array.push(await template(sheet, 'city'));
		array.push(await template(sheet, 'school'));
	} else {
		// eslint-disable-next-line
		console.log('Structure file not found');
	}
	if (array.length > 0) {
		return array;
	} throw new Error('Structure file not found');
};

module.exports = structure;