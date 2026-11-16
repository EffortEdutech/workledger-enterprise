-- WorkLedger Enterprise production candidate only.
-- DO NOT APPLY until G41/Auth, source-contract, rollback, and owner gates pass.

create schema if not exists wle;

create table if not exists wle.appointments (
  id uuid primary key,
  user_id uuid not null,
  organisation_id uuid not null,
  project_id uuid not null,
  contract_id uuid not null,
  role text not null,
  status text not null check (status in ('active', 'revoked', 'expired')),
  created_at timestamptz not null default now()
);

create table if not exists wle.audit_events (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  event_type text not null check (event_type in ('workledger.acknowledge-diary', 'workledger.verify-evidence', 'workledger.complete-review', 'workledger.void-observation')),
  actor_user_id uuid not null,
  appointment_id uuid not null references wle.appointments(id),
  organisation_id uuid not null,
  project_id uuid not null,
  contract_id uuid not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table wle.appointments enable row level security;
alter table wle.audit_events enable row level security;
alter table wle.appointments force row level security;
alter table wle.audit_events force row level security;

-- Policies must be completed against the final auth.app_metadata claim contract.
-- Default deny is intentional until that contract is approved.
