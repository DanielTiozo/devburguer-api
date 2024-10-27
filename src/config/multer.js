import multer from 'multer';
import { v4 } from 'uuid';

// import { extname, resolve } from 'node:path';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
storage: multer.diskStorage({
// 	destination: resolve(__dirname, '..', '..', 'uploads'),
const storageConfig = {
	destination: resolve(__dirname, '..', '..', 'uploads'),
	filename: (req, file, callback) => {
		callback(null, v4() + extname(file.originalname));
	},
	}})
	// },
};

// export default storageConfig;
