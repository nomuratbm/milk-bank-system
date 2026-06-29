-- ============ Beneficiary profile picture support ============

-- 1. Column to store the public/signed URL of the beneficiary's avatar.
--    Nullable: most beneficiaries won't upload a picture, and profile.tsx
--    already falls back to a placeholder icon when this is null.
alter table beneficiaries
  add column avatar_url text;

-- 2. Storage bucket for avatar images.
--    Public bucket, mirroring how consent_doc_url works for donors (a URL
--    string stored on the row, with the file itself living in Storage).
--    Public read keeps <Image source={{ uri: ... }}> simple (no signed URL
--    refresh needed); writes are still locked down below.
insert into storage.buckets (id, name, public)
values ('beneficiary-avatars', 'beneficiary-avatars', true)
on conflict (id) do nothing;

-- 3. Storage RLS policies.
--    Convention used here: each beneficiary's files live under a folder
--    named after their own auth uid, e.g. "<user_id>/avatar.jpg".
--    storage.foldername(name) splits the object path into an array of
--    folder segments, so [1] is the top-level folder = the uid.

-- Anyone authenticated can view avatars (bucket is public anyway, but this
-- also covers access via the storage API rather than the public CDN URL).
create policy "beneficiary_avatars_select"
on storage.objects for select
using (
  bucket_id = 'beneficiary-avatars'
  and auth.role() = 'authenticated'
);

-- A beneficiary can upload only into their own folder.
create policy "beneficiary_avatars_insert_own"
on storage.objects for insert
with check (
  bucket_id = 'beneficiary-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- A beneficiary can overwrite/replace only their own file(s).
create policy "beneficiary_avatars_update_own"
on storage.objects for update
using (
  bucket_id = 'beneficiary-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- A beneficiary can delete only their own file(s) (e.g. when removing a
-- picture or replacing it with a fresh upload under a new filename).
create policy "beneficiary_avatars_delete_own"
on storage.objects for delete
using (
  bucket_id = 'beneficiary-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Staff can manage any beneficiary's avatar (e.g. clearing an inappropriate
-- upload), consistent with the "staff full access" pattern used elsewhere
-- in 0001_init_schema.sql.
create policy "beneficiary_avatars_staff_all"
on storage.objects for all
using (bucket_id = 'beneficiary-avatars' and public.is_staff())
with check (bucket_id = 'beneficiary-avatars' and public.is_staff());
