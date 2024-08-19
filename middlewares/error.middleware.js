const BaseError = require('../errors/base.error');

module.exports = function (err, req, res, next) {
	if (err instanceof BaseError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}

	// Faqat ishlab chiqish muhitida qo'shimcha xatolik ma'lumotlarini qaytarish
	if (process.env.NODE_ENV === 'development') {
		console.error(err);  // Xatolikni konsolga chiqarish
		return res.status(500).json({ message: 'Server error', error: err.message, stack: err.stack });
		console.log(err);
	}
	console.error(err);
	return res.status(500).json({ message: 'Server error' });

}
