// const UserDto = require('../dtos/user.dto');
// const userModel = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const tokenService = require('./token.service');
// const mailService = require('./mail.service');
// const BaseError = require('../errors/base.error');

// class AuthService {
// 	async register(name, email, password) {
// 		const existUser = await userModel.findOne({ email });

// 		if (existUser) {
// 			throw BaseError.BadRequest(`User with existing email ${email} already registered`);
// 		}

// 		const hashPassword = await bcrypt.hash(password, 10);
// 		const user = await userModel.create({ name, email, password: hashPassword });
// 		const userDto = new UserDto(user);

// 		// await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`);

// 		const tokens = tokenService.generateToken({ ...userDto });

// 		await tokenService.saveToken(userDto.id, tokens.refreshToken);

// 		return { user: userDto, ...tokens };
// 	}

// 	async activation(userId) {
// 		const user = await userModel.findById(userId);

// 		if (!user) {
// 			throw BaseError.BadRequest('User is not defined');
// 		}

// 		user.isActivated = true;
// 		await user.save();
// 	}

// 	async login(email, password) {
// 		const user = await userModel.findOne({ email });
// 		if (!user) {
// 			throw BaseError.BadRequest('User is not defined');
// 		}

// 		const isPassword = await bcrypt.compare(password, user.password);
// 		if (!isPassword) {
// 			throw BaseError.BadRequest('Password is incorrect');
// 		}

// 		const userDto = new UserDto(user);

// 		const tokens = tokenService.generateToken({ ...userDto });

// 		await tokenService.saveToken(userDto.id, tokens.refreshToken);

// 		return { user: userDto, ...tokens };
// 	}

// 	async logout(refreshToken) {
// 		return await tokenService.removeToken(refreshToken);
// 	}

// 	async refresh(refreshToken) {
// 		if (!refreshToken) {
// 			throw BaseError.UnauthorizedError('Bad authorization');
// 		}

// 		const userPayload = tokenService.validateRefreshToken(refreshToken);
// 		const tokenDb = await tokenService.findToken(refreshToken);
// 		if (!userPayload || !tokenDb) {
// 			throw BaseError.UnauthorizedError('Bad authorization');
// 		}

// 		const user = await userModel.findById(userPayload.id);
// 		const userDto = new UserDto(user);

// 		const tokens = tokenService.generateToken({ ...userDto });

// 		await tokenService.saveToken(userDto.id, tokens.refreshToken);

// 		return { user: userDto, ...tokens };
// 	}

// 	async getUsers() {
// 		return await userModel.find();
// 	}
// 	async getUserByToken(token) {
// 		if (!token) {
// 			throw BaseError.UnauthorizedError('Token not provided');
// 		}

// 		const userPayload = tokenService.validateAccessToken(token);
// 		if (!userPayload) {
// 				throw BaseError.UnauthorizedError('Invalid or expired token');
// 		}

// 		const user = await userModel.findById(userPayload.id);
// 		if (!user) {
// 			throw BaseError.BadRequest('User not found');
// 		}

// 		const userDto = new UserDto(user);
// 		return userDto;
// }

// 	async addToCart(userId, productId) {
// 		try {
// 			const user = await UserModel.findById(userId);
// 			if (!user) {
// 				throw new Error(`Foydalanuvchi topilmadi: ${userId}`);
// 			}

// 			if (!user.cart.includes(productId)) {
// 				user.cart.push(productId);
// 				await user.save();
// 			}

// 			return user;
// 		} catch (error) {
// 			throw new Error(`Savatga mahsulot qo'shishda xatolik yuz berdi: ${error.message}`);
// 		}
// 	}

// 	async removeFromCart(userId, productId) {
//     try {
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         throw new Error(`Foydalanuvchi topilmadi: ${userId}`);
//       }

//       user.cart = user.cart.filter(item => item.toString() !== productId);
//       await user.save();

//       return user;
//     } catch (error) {
//       throw new Error(`Savatdan mahsulotni o'chirishda xatolik yuz berdi: ${error.message}`);
//     }
//   }
// 	async removeFromFavorites(userId, productId) {
//     try {
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         throw new Error(`Foydalanuvchi topilmadi: ${userId}`);
//       }

//       user.favorites = user.favorites.filter(item => item.toString() !== productId);
//       await user.save();

//       return user;
//     } catch (error) {
//       throw new Error(`Sevimli mahsulotlardan mahsulotni o'chirishda xatolik yuz berdi: ${error.message}`);
//     }
//   }

// 	async addToFavorites(userId, productId) {
// 		try {
// 			const user = await UserModel.findById(userId);
// 			if (!user) {
// 				throw new Error(`Foydalanuvchi topilmadi: ${userId}`);
// 			}

// 			if (!user.favorites.includes(productId)) {
// 				user.favorites.push(productId);
// 				await user.save();
// 			}

// 			return user;
// 		} catch (error) {
// 			throw new Error(`Sevimli mahsulotlar ro'yxatiga mahsulot qo'shishda xatolik yuz berdi: ${error.message}`);
// 		}
// 	}
// }

// module.exports = new AuthService();


// service/auth.service.js

const UserDto = require('../dtos/user.dto');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const mailService = require('./mail.service');
const BaseError = require('../errors/base.error');

class AuthService {
  async register(name, email, password, phone, address) {
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      throw BaseError.BadRequest(`User with existing email ${email} already registered`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ phone, address, name, email, password: hashPassword });
    const userDto = new UserDto(user);

    // await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async activation(userId) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw BaseError.BadRequest('User is not defined');
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw BaseError.BadRequest('User is not defined');
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw BaseError.BadRequest('Password is incorrect');
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.UnauthorizedError('Bad authorization');
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDb) {
      throw BaseError.UnauthorizedError('Bad authorization');
    }

    const user = await userModel.findById(userPayload.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async getUsers() {
    return await userModel.find();
  }

  async getUserByToken(token) {
    if (!token) {
      throw BaseError.UnauthorizedError('Token not provided');
    }

    const userPayload = tokenService.validateAccessToken(token);
    if (!userPayload) {
      throw BaseError.UnauthorizedError('Invalid or expired token');
    }

    const user = await userModel.findById(userPayload.id);
    if (!user) {
      throw BaseError.BadRequest('User not found');
    }

    const userDto = new UserDto(user);
    return userDto;
  }
}

module.exports = new AuthService();
