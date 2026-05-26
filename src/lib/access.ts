import type { PermissionKey, UserContext } from "@/types/access";

const coachPermissions: PermissionKey[] = [
  "view_member_detail",
  "view_downline_summary",
  "send_template_message",
  "analyze_member_food",
];

const organizationAdminPermissions: PermissionKey[] = [
  "view_member_detail",
  "view_downline_summary",
  "view_contact_info",
  "send_template_message",
  "analyze_member_food",
  "manage_team",
];

const platformPermissions: PermissionKey[] = [
  "view_member_detail",
  "view_downline_summary",
  "view_contact_info",
  "send_template_message",
  "analyze_member_food",
  "manage_team",
];

export function getPermissions(context: UserContext): PermissionKey[] {
  if (context.role === "super_admin") {
    return platformPermissions;
  }

  if (context.role === "organization_admin") {
    return organizationAdminPermissions;
  }

  if (context.role === "coach" || context.role === "trainee_coach") {
    return coachPermissions;
  }

  return ["view_member_detail"];
}

export function canPerform(context: UserContext, permission: PermissionKey): boolean {
  return getPermissions(context).includes(permission);
}

export function isAnalysisAllowedAfter18(context: UserContext, hour24: number): boolean {
  if (context.accessStatus && context.accessStatus !== "active") {
    return false;
  }

  return hour24 >= 18;
}

