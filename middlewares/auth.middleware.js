const BaseError = require('../errors/base.error');
const tokenService = require('../service/token.service');

module.exports = function (req, res, next) {
	try {
		// Authorization headerini olish
		const authorization = req.headers.authorization;
		if (!authorization) {
			return next(BaseError.UnauthorizedError('Authorization header not found'));
		}

		// Tokenni olish
		const accessToken = authorization.split(' ')[1];
		if (!accessToken) {
			return next(BaseError.UnauthorizedError('Access token not found'));
		}

		// Tokenni tasdiqlash
		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(BaseError.UnauthorizedError('Invalid access token'));
		}

		// Foydalanuvchi ma'lumotlarini req.user ga qo'shish
		req.user = userData;
		next();
	} catch (error) {
		return next(BaseError.UnauthorizedError('Unauthorized access', error));
	}
}
