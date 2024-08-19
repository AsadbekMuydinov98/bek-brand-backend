module.exports = class UserDto {
	name;
	email;
	id;
	isActivated;
  phone
	role
	address
	cart
	favorites
	orders

	constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.phone = model.phone || null;
    this.role = model.role || null;
    this.address = model.address || null;
    this.cart = model.cart || null;
    this.favorites = model.favorites || null;
    this.orders = model.orders || null;
  }
}


