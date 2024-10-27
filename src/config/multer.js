import multer from 'multer';
import { v4 } from 'uuid';

import { extname, resolve } from 'node:path';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export default {
	storage: multer.diskStorage({
		// 	destination: resolve(__dirname, '..', '..', 'uploads'),
		const: (storageConfig = {
			destination: resolve(_dirname, '..', '..', 'uploads'),
			filename: (req, file, callback) => {
				callback(null, v4() + extname(file.originalname));
			},
		}),
	}),
	// },
};

// export default storageConfig;
