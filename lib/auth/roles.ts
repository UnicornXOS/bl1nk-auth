export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    MANAGER = "MANAGER",
}

export const ROLES = {
    [UserRole.ADMIN]: {
        name: "Admin",
        description: "Total control over the system",
        permissions: ["*"],
    },
    [UserRole.MANAGER]: {
        name: "Manager",
        description: "Manage team and webhooks",
        permissions: ["webhooks:manage", "team:manage", "logs:view"],
    },
    [UserRole.USER]: {
        name: "User",
        description: "Standard access",
        permissions: ["profile:edit", "logs:view"],
    },
};

export function hasPermission(role: UserRole, permission: string): boolean {
    const roleConfig = ROLES[role];
    if (!roleConfig) return false;
    return roleConfig.permissions.includes("*") || roleConfig.permissions.includes(permission);
}
