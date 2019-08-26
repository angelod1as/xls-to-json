const fs = require('fs').promises;

// Filter files that arent xlsx
const filterFiles = async (input) => {
	
	// eslint-disable-next-line
	console.log('Filtering valid files');
	const unfiltered = await fs.readdir(input);

	const filtered = unfiltered.filter(each => {
		return each.includes('xlsx');
	});
	
	// eslint-disable-next-line
	console.log('Valid files filtered\n');
	return filtered;
};

module.exports = filterFiles;