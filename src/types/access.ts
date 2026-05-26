export type SystemRole = "super_admin" | "organization_admin" | "coach" | "trainee_coach" | "member";

export type MemberCustomerStatus = "member" | "customer_member";

export type TeamStatus = "active" | "grace_period" | "suspended" | "closed";

export type AccessStatus = "active" | "inactive" | "expired" | "suspended";

export type VisibilityScope = "own" | "team" | "organization" | "platform";

export type PermissionKey =
  | "view_member_detail"
  | "view_downline_summary"
  | "view_contact_info"
  | "send_template_message"
  | "analyze_member_food"
  | "manage_team";

export type UserContext = {
  role: SystemRole;
  organizationId?: string;
  teamId?: string;
  accessStatus?: AccessStatus;
  coachType?: "coach" | "trainee_coach";
};

