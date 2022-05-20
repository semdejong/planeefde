const Permission = require("../../models/permission");
const PermissionUser = require("../../models/Bmodels/permissionUser");

function authorize(role, permissionName) {
  return async (req, res, next) => {
    const permission = await Permission.findOne({
      uniqueName: permissionName,
    });

    if (req.user.role === role) {
      req.authorized = true;
    } else if (permission) {
      const relationExists = await PermissionUser.findOne({
        user: req.user._id,
        permission: permission._id,
      });
      if (relationExists) {
        req.authorized = true;
      } else {
        req.authorized = false;
      }
    } else {
      req.authorized = false;
    }
    next();
  };
}

module.exports = {
  authorize,
};
