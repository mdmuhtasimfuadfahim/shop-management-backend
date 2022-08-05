const allRoles = {
  customer: [],
  employee: [],
  admin: ['getUsers', 'manageUsers', 'addProduct', 'manageProducts', 'getProducts', 'manageInventory', 'getInventory', 'getInvoice'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
