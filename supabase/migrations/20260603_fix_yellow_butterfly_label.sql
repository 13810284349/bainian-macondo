update public.macondo_page_sections
set
  summary = replace(summary, '黄蝶', '黄蝴蝶'),
  details = array(
    select replace(detail, '黄蝶', '黄蝴蝶')
    from unnest(details) as detail
  ),
  accent = replace(accent, '黄蝶', '黄蝴蝶'),
  title = replace(title, '黄蝶', '黄蝴蝶'),
  updated_at = now()
where
  summary like '%黄蝶%'
  or accent like '%黄蝶%'
  or title like '%黄蝶%'
  or exists (
    select 1
    from unnest(details) as detail
    where detail like '%黄蝶%'
  );
