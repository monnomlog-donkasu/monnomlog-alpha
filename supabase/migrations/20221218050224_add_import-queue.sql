create table "public"."import_queue" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "title" text not null default ''::text,
    "content" text not null default ''::text,
    "published_at" timestamp with time zone not null,
    "source_info" jsonb not null default '{}'::jsonb,
    "tags" text[] not null default '{}'::text[]
);


alter table "public"."import_queue" enable row level security;

CREATE UNIQUE INDEX import_queue_id_key ON public.import_queue USING btree (id);

CREATE UNIQUE INDEX import_queue_pkey ON public.import_queue USING btree (id);

alter table "public"."import_queue" add constraint "import_queue_pkey" PRIMARY KEY using index "import_queue_pkey";

alter table "public"."import_queue" add constraint "import_queue_id_key" UNIQUE using index "import_queue_id_key";


