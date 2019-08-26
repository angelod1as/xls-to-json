const XLSX = require('xlsx');
const path = require('path');

const xlsxToJson = (input, file) => {
	// eslint-disable-next-line
	console.log('\tGetting workbook...\n\t(This may take from 1 to 10 minutes)\n');
	// eslint-disable-next-line
	console.time('\t\tduration');
	const workbook = XLSX.readFile(path.join(input, file));
	// eslint-disable-next-line
	console.timeEnd('\t\tduration');
	const sheetNameList = workbook.SheetNames;
	return XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
};

module.exports = xlsxToJson;
