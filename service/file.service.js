/* The FileService class provides a method to save uploaded files with a unique filename in a specified
directory. */
// const { v4: uuidv4 } = require('uuid')
// const fs = require('fs')
// const path = require('path')

// class FileService {
// 	save(file) {
// 		try {
// 			const fileName = uuidv4() + '.jpg'
// 			const currentDir = __dirname // server - yo'l
// 			const staticDir = path.join(currentDir, '..', 'static')
// 			const filePath = path.join(staticDir, fileName)

// 			if (!fs.existsSync(staticDir)) {
// 				fs.mkdirSync(staticDir, { recursive: true })
// 			}

// 			file.mv(filePath)

// 			return fileName
// 		} catch (error) {
// 			throw new Error(`Error saving file: ${error}`)
// 		}
// 	}
// }

// module.exports = new FileService()

// -------------------2 --------------------------
// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs');
// const path = require('path');

// class FileService {
//   constructor() {
//     this.staticDir = path.join(__dirname, '..', 'static');
    
//     if (!fs.existsSync(this.staticDir)) {
//       fs.mkdirSync(this.staticDir, { recursive: true });
//     }
//   }

//   save(files) {
//     try {
//       const fileNames = [];
      
//       files.forEach(file => {
//         const fileName = uuidv4() + path.extname(file.name);
//         const filePath = path.join(this.staticDir, fileName);

//         file.mv(filePath); 

//         fileNames.push(fileName); 
//       });

//       return fileNames; 
//     } catch (error) {
//       throw new Error(`Faylni saqlashda xatolik yuz berdi: ${error}`);
//     }
//   }
// }

// module.exports = new FileService();

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class FileService {
    async save(files) {
        try {
            const fileNames = [];
            const currentDir = __dirname;
            const staticDir = path.join(currentDir, '..', 'static');

            if (!fs.existsSync(staticDir)) {
                fs.mkdirSync(staticDir, { recursive: true });
            }

            for (const file of files) {
                if (!file || !file.name) {
                    console.error('File or file name is undefined', file);
                    throw new Error('Invalid file or file name');
                }

                const fileName = uuidv4() + path.extname(file.name);
                const filePath = path.join(staticDir, fileName);

                // Ensure the mv method is properly awaited
                await file.mv(filePath);

                fileNames.push(fileName);
            }

            return fileNames;
        } catch (error) {
            console.error('Error saving files:', error.message);
            throw new Error(`Error saving files: ${error.message}`);
        }
    }
}

module.exports = new FileService();

