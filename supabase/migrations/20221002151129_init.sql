-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.posts
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    removed_at timestamp with time zone,
    published boolean NOT NULL DEFAULT false,
    summary text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    title text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    user_id uuid NOT NULL,
    content jsonb NOT NULL DEFAULT '{}'::jsonb,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_id_key UNIQUE (id),
    CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;

ALTER TABLE IF EXISTS public.posts
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.posts TO anon;

GRANT ALL ON TABLE public.posts TO authenticated;

GRANT ALL ON TABLE public.posts TO postgres;

GRANT ALL ON TABLE public.posts TO service_role;
