-- Tabla principal de la waitlist
create table if not exists waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  tier        text not null default 'FOUNDERS',
  source      text not null default 'landing',
  code        text not null unique,
  created_at  timestamptz not null default now()
);

-- Índice para búsquedas por email (la más frecuente)
create index if not exists waitlist_email_idx on waitlist(email);

-- Solo el service role puede leer/escribir (la anon key no tiene acceso)
alter table waitlist enable row level security;
