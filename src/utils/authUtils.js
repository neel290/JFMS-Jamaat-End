import { useStore } from '../store/useStore';

/**
 * Check if the current user has a specific permission.
 * @param {string} permissionKey 
 * @returns boolean
 */
export const hasPermission = (permissionKey) => {
  const { currentUser, roles } = useStore.getState();
  if (!currentUser || !currentUser.roleId) return false;

  const role = roles.find(r => r.id === currentUser.roleId);
  if (!role) return false;

  // If user has view_all, they can view anything
  if (role.permissions.includes('view_all') && permissionKey.startsWith('view_')) {
    return true;
  }

  return role.permissions.includes(permissionKey) || role.permissions.includes('super_admin');
};

/**
 * Filter a list of items based on environment scope.
 * Most items in Sabeel Environment are scoped to the environment's Trust or Mauze.
 */
export const isEnvScoped = (item) => {
  const { currentEnv } = useStore.getState();
  if (!currentEnv) return false;

  // If item naturally has an envId, match it.
  if (item.envId && item.envId !== currentEnv.id) return false;

  // Sabeels are scoped to Mauze
  if (item.mauzeId && item.mauzeId !== currentEnv.mauzeId) return false;

  return true;
};
