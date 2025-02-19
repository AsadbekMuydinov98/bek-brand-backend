const BaseError = require('../errors/base.error');
const authService = require('../service/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(BaseError.BadRequest('Error with validation', errors.array()));
			}
			const { name, email, password, address, phone } = req.body;
			const data = await authService.register(name, email, password, phone, address);
			res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async activation(req, res, next) {
		try {
			const userId = req.params.id;
			await authService.activation(userId);
			return res.redirect(process.env.CLIENT_URL);
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const data = await authService.login(email, password);
			res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await authService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json({ token });
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const data = await authService.refresh(refreshToken);
			res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async getUser(req, res, next) {
		try {
			const data = await authService.getUsers();
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}
	async profile(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]; 
			const user = await authService.getUserByToken(token);
			res.json(user);
	} catch (err) {
			next(err);
	}
	}

	async addToCart(req, res, next) {
    try {
      const { userId, productId } = req.body;

      const user = await userService.addToCart(userId, productId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
	async removeFromCart(req, res, next) {
    try {
      const { userId, productId } = req.body;

      const user = await userService.removeFromCart(userId, productId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
	async addToFavorites(req, res, next) {
    try {
      const { userId, productId } = req.body;

      const user = await userService.addToFavorites(userId, productId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
	async removeFromFavorites(req, res, next) {
    try {
      const { userId, productId } = req.body;

      const user = await userService.removeFromFavorites(userId, productId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
