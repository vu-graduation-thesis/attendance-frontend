import PERMISSIONS from "core/constants/user";

const checkPermission = (list: string[], permissionRequired: string) =>
  list?.includes(PERMISSIONS.ALL) || list?.includes(permissionRequired);

export { checkPermission };
