
ALTER TABLE user_policies ADD column variables JSONB DEFAULT '{}';
ALTER TABLE team_policies ADD column variables JSONB DEFAULT '{}';
ALTER TABLE organization_policies ADD column variables JSONB DEFAULT '{}';

ALTER TABLE user_policies DROP CONSTRAINT user_policy_link;
ALTER TABLE user_policies ADD CONSTRAINT user_policy_link PRIMARY KEY(policy_id, user_id, variables);

ALTER TABLE team_policies DROP CONSTRAINT team_policy_link;
ALTER TABLE team_policies ADD CONSTRAINT team_policy_link PRIMARY KEY(policy_id, team_id, variables);

ALTER TABLE organization_policies DROP CONSTRAINT org_policy_link;
ALTER TABLE organization_policies ADD CONSTRAINT org_policy_link PRIMARY KEY(policy_id, org_id, variables);