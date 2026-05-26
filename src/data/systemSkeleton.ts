import type { AccessStatus, MemberCustomerStatus, SystemRole, TeamStatus } from "@/types/access";

export type OrganizationRecord = {
  id: string;
  name: string;
  status: TeamStatus;
};

export type TeamRecord = {
  id: string;
  organizationId: string;
  name: string;
  status: TeamStatus;
};

export type ProfileRecord = {
  id: string;
  displayName: string;
  role: SystemRole;
  organizationId?: string;
  teamId?: string;
  accessStatus: AccessStatus;
  memberCustomerStatus?: MemberCustomerStatus;
};

export const systemSkeleton = {
  organizations: [
    {
      id: "org_hj_001",
      name: "Healthy Journey North",
      status: "active",
    },
  ] satisfies OrganizationRecord[],
  teams: [
    {
      id: "team_mt_001",
      organizationId: "org_hj_001",
      name: "Millionaire Team A",
      status: "active",
    },
    {
      id: "team_mt_002",
      organizationId: "org_hj_001",
      name: "Millionaire Team B",
      status: "grace_period",
    },
  ] satisfies TeamRecord[],
  profiles: [
    {
      id: "profile_super_admin",
      displayName: "Super Admin",
      role: "super_admin",
      accessStatus: "active",
    },
    {
      id: "profile_mt_admin",
      displayName: "MT Admin",
      role: "organization_admin",
      organizationId: "org_hj_001",
      accessStatus: "active",
    },
    {
      id: "profile_coach",
      displayName: "Coach Nam",
      role: "coach",
      organizationId: "org_hj_001",
      teamId: "team_mt_001",
      accessStatus: "active",
    },
    {
      id: "profile_member",
      displayName: "คุณแพร",
      role: "member",
      organizationId: "org_hj_001",
      teamId: "team_mt_001",
      accessStatus: "active",
      memberCustomerStatus: "member",
    },
  ] satisfies ProfileRecord[],
} as const;

