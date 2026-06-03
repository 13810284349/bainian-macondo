create table if not exists public.macondo_page_sections (
  slug text primary key,
  section_order integer not null unique,
  label text not null,
  title text not null,
  summary text not null,
  metric text not null,
  accent text not null,
  lens text[] not null default '{}',
  details text[] not null default '{}',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint macondo_page_sections_slug_check check (slug ~ '^[a-z0-9-]+$'),
  constraint macondo_page_sections_order_check check (section_order > 0),
  constraint macondo_page_sections_lens_check check (array_length(lens, 1) > 0)
);

alter table public.macondo_page_sections enable row level security;

drop policy if exists "macondo sections are publicly readable" on public.macondo_page_sections;
create policy "macondo sections are publicly readable"
  on public.macondo_page_sections
  for select
  to anon, authenticated
  using (true);

grant select on public.macondo_page_sections to anon, authenticated;

create index if not exists macondo_page_sections_order_idx
  on public.macondo_page_sections (section_order);

insert into public.macondo_page_sections
  (slug, section_order, label, title, summary, metric, accent, lens, details, updated_at)
values
  (
    'circular-time',
    1,
    'Time 01',
    '一切都在回到起点',
    '冰块、栗树、蚂蚁、羊皮卷和飓风并不是分散意象，而是把布恩迪亚家的百年锁成闭环的铰链。',
    '圆环结构',
    '过去和未来在终章同时打开。',
    array['time', 'image'],
    array['首尾互相咬合', '预叙制造宿命感', '终章阅读完成闭环'],
    now()
  ),
  (
    'macondo-time-disease',
    2,
    'Time 02',
    '马孔多患上时间病',
    '星期一、失眠症、预言和房间反复提示同一件事：家族从未真正生活在流动的当下。',
    '永恒星期一',
    '时间不前进，只是换一种姿势返回。',
    array['time'],
    array['现代性制造速度幻觉', '记忆被集体磨损', '羊皮卷压缩百年日常'],
    now()
  ),
  (
    'space-eden-war-ruin',
    3,
    'Space',
    '伊甸园、战场、废墟',
    '马孔多经历创世、扩张和废墟三个阶段。它不是地点，而是拉美历史被压缩后的空间模型。',
    '空间三阶段',
    '城镇的命运，就是历史的剖面。',
    array['history', 'time'],
    array['创世时期仍可命名世界', '火车和公司改变空间语法', '雨、杂草和飓风接管住宅'],
    now()
  ),
  (
    'solitude-genealogy',
    4,
    'Lineage',
    '孤独有十二张面孔',
    '探索、战争、拒绝、自我放逐、美、权力、遗忘、守护和爱情，共同说明孤独不是情绪，而是存在方式。',
    '存在谱系',
    '每个人都以自己的方式把门关上。',
    array['lineage'],
    array['探索型孤独', '战争型孤独', '爱情型孤独'],
    now()
  ),
  (
    'buendia-grammar',
    5,
    'Family',
    '布恩迪亚家的基因语法',
    '何塞·阿尔卡蒂奥系列向外冲撞，奥雷里亚诺系列向内凝视；名字成为性格、欲望和命运的编码。',
    '名字重复',
    '血缘在这里像一部会自动续写的语法书。',
    array['lineage'],
    array['向外的人接近身体和行动', '向内的人接近沉默和作坊', '女性守护家族记忆'],
    now()
  ),
  (
    'image-atlas',
    6,
    'Images',
    '从冰块到蚂蚁的符号地图',
    '冰块、雨、金小鱼、黄蝴蝶、羊皮卷和蚂蚁既推动阅读，也把历史、欲望和终结变得可见。',
    '意象系统',
    '那些物象比人物更早知道结局。',
    array['image'],
    array['冰块是启蒙和童年奇迹', '雨是停滞的历史', '蚂蚁是终章的吞噬'],
    now()
  ),
  (
    'history-violence',
    7,
    'History',
    '私人冲突长成国家恐怖',
    '殖民记忆、内战循环、香蕉公司、屠杀和官方失忆，全部嵌进一个家族的日常。',
    '历史隐喻',
    '魔幻让现实露出骨头。',
    array['history'],
    array['战争理想被权力腐蚀', '火车带来资本秩序', '死者被官方叙述抹去'],
    now()
  ),
  (
    'magic-realism',
    8,
    'Form',
    '荒诞不削弱现实，反而让现实更准确',
    '升天、鬼魂、失眠症和会预言的羊皮卷都以日常口吻出现，因此魔幻成为现实的另一种精确测量。',
    '魔幻现实主义',
    '奇迹在马孔多不是例外，而是日常的语气。',
    array['image', 'history'],
    array['日常语调承接超自然', '精确数字制造神话感', '死者作为历史在场'],
    now()
  ),
  (
    'reading-echoes',
    9,
    'Method',
    '不要只追情节，追那些回声',
    '把小说当作一张可以反复折叠的地图：每次只跟随一种线索，直到它把你带回同一个中心。',
    '阅读路径',
    '所有线索最终都会回到羊皮卷。',
    array['time', 'lineage', 'image', 'history'],
    array['追踪时间', '追踪名字', '追踪意象', '追踪历史'],
    now()
  )
on conflict (slug) do update set
  section_order = excluded.section_order,
  label = excluded.label,
  title = excluded.title,
  summary = excluded.summary,
  metric = excluded.metric,
  accent = excluded.accent,
  lens = excluded.lens,
  details = excluded.details,
  updated_at = now();
