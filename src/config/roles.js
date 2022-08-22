const allRoles = {
  customer: ['addToCart', 'addOrder', 'getOrder'],
  employee: ['getOrders', 'getCustomers', 'getProducts', 'getInvoice'],
  admin: ['getUsers', 'manageUsers', 'addProduct', 'manageProducts', 'getProducts', 'manageInventory', 'getInventory', 'getInvoice', 'getOrders', 'manageOrders'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
