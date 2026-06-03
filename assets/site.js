const SUPABASE_URL = "https://uvlzzatzgbgktduqsfra.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2bHp6YXR6Z2Jna3RkdXFzZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDA2NzAsImV4cCI6MjA5NTk3NjY3MH0.zK7BZR6w4DpRqPCc_65syBvKc4RAmoIWQnINCXVaBxs";

const fallbackSections = [
  {
    slug: "circular-time",
    section_order: 1,
    label: "Time 01",
    title: "一切都在回到起点",
    summary: "冰块、栗树、蚂蚁、羊皮卷和飓风并不是分散意象，而是把布恩迪亚家的百年锁成闭环的铰链。",
    metric: "圆环结构",
    accent: "过去和未来在终章同时打开。",
    lens: ["time", "image"],
    details: ["首尾互相咬合", "预叙制造宿命感", "终章阅读完成闭环"]
  },
  {
    slug: "macondo-time-disease",
    section_order: 2,
    label: "Time 02",
    title: "马孔多患上时间病",
    summary: "星期一、失眠症、预言和房间反复提示同一件事：家族从未真正生活在流动的当下。",
    metric: "永恒星期一",
    accent: "时间不前进，只是换一种姿势返回。",
    lens: ["time"],
    details: ["现代性制造速度幻觉", "记忆被集体磨损", "羊皮卷压缩百年日常"]
  },
  {
    slug: "space-eden-war-ruin",
    section_order: 3,
    label: "Space",
    title: "伊甸园、战场、废墟",
    summary: "马孔多经历创世、扩张和废墟三个阶段。它不是地点，而是拉美历史被压缩后的空间模型。",
    metric: "空间三阶段",
    accent: "城镇的命运，就是历史的剖面。",
    lens: ["history", "time"],
    details: ["创世时期仍可命名世界", "火车和公司改变空间语法", "雨、杂草和飓风接管住宅"]
  },
  {
    slug: "solitude-genealogy",
    section_order: 4,
    label: "Lineage",
    title: "孤独有十二张面孔",
    summary: "探索、战争、拒绝、自我放逐、美、权力、遗忘、守护和爱情，共同说明孤独不是情绪，而是存在方式。",
    metric: "存在谱系",
    accent: "每个人都以自己的方式把门关上。",
    lens: ["lineage"],
    details: ["探索型孤独", "战争型孤独", "爱情型孤独"]
  },
  {
    slug: "buendia-grammar",
    section_order: 5,
    label: "Family",
    title: "布恩迪亚家的基因语法",
    summary: "何塞·阿尔卡蒂奥系列向外冲撞，奥雷里亚诺系列向内凝视；名字成为性格、欲望和命运的编码。",
    metric: "名字重复",
    accent: "血缘在这里像一部会自动续写的语法书。",
    lens: ["lineage"],
    details: ["向外的人接近身体和行动", "向内的人接近沉默和作坊", "女性守护家族记忆"]
  },
  {
    slug: "image-atlas",
    section_order: 6,
    label: "Images",
    title: "从冰块到蚂蚁的符号地图",
    summary: "冰块、雨、金小鱼、黄蝴蝶、羊皮卷和蚂蚁既推动阅读，也把历史、欲望和终结变得可见。",
    metric: "意象系统",
    accent: "那些物象比人物更早知道结局。",
    lens: ["image"],
    details: ["冰块是启蒙和童年奇迹", "雨是停滞的历史", "蚂蚁是终章的吞噬"]
  },
  {
    slug: "history-violence",
    section_order: 7,
    label: "History",
    title: "私人冲突长成国家恐怖",
    summary: "殖民记忆、内战循环、香蕉公司、屠杀和官方失忆，全部嵌进一个家族的日常。",
    metric: "历史隐喻",
    accent: "魔幻让现实露出骨头。",
    lens: ["history"],
    details: ["战争理想被权力腐蚀", "火车带来资本秩序", "死者被官方叙述抹去"]
  },
  {
    slug: "magic-realism",
    section_order: 8,
    label: "Form",
    title: "荒诞不削弱现实，反而让现实更准确",
    summary: "升天、鬼魂、失眠症和会预言的羊皮卷都以日常口吻出现，因此魔幻成为现实的另一种精确测量。",
    metric: "魔幻现实主义",
    accent: "奇迹在马孔多不是例外，而是日常的语气。",
    lens: ["image", "history"],
    details: ["日常语调承接超自然", "精确数字制造神话感", "死者作为历史在场"]
  },
  {
    slug: "reading-echoes",
    section_order: 9,
    label: "Method",
    title: "不要只追情节，追那些回声",
    summary: "把小说当作一张可以反复折叠的地图：每次只跟随一种线索，直到它把你带回同一个中心。",
    metric: "阅读路径",
    accent: "所有线索最终都会回到羊皮卷。",
    lens: ["time", "lineage", "image", "history"],
    details: ["追踪时间", "追踪名字", "追踪意象", "追踪历史"]
  }
];

const grid = document.querySelector("#sections-grid");
const dataSource = document.querySelector("#data-source");
const sectionCount = document.querySelector("#section-count");
const progress = document.querySelector("#scroll-progress");
let currentSections = fallbackSections;

function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeSection(section) {
  return {
    ...section,
    lens: Array.isArray(section.lens) ? section.lens : fallbackSections.find((item) => item.slug === section.slug)?.lens ?? ["time"],
    details: Array.isArray(section.details) ? section.details : []
  };
}

function renderSections(sections) {
  currentSections = sections.map(normalizeSection);
  grid.innerHTML = currentSections.map((section) => {
    const lenses = section.lens.join(" ");
    const details = section.details.map((item) => `<li>${escapeText(item)}</li>`).join("");
    return `
      <article class="analysis-card reveal" data-lens="${escapeText(lenses)}">
        <div class="card-top">
          <span>${escapeText(section.label)}</span>
          <span>${escapeText(section.metric)}</span>
        </div>
        <h3>${escapeText(section.title)}</h3>
        <p>${escapeText(section.summary)}</p>
        <ul>${details}</ul>
        <div class="card-accent">${escapeText(section.accent)}</div>
      </article>
    `;
  }).join("");
  sectionCount.textContent = `${currentSections.length} 个入口`;
  observeReveals();
}

async function fetchSections() {
  const endpoint = `${SUPABASE_URL}/rest/v1/macondo_page_sections?select=slug,section_order,label,title,summary,metric,accent,lens,details&order=section_order.asc`;
  const response = await fetch(endpoint, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`Supabase returned ${response.status}`);
  }

  const sections = await response.json();
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error("Supabase returned no sections");
  }
  return sections;
}

function applyLens(lens) {
  document.querySelectorAll(".lens").forEach((button) => {
    const active = button.dataset.lens === lens;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  document.querySelectorAll(".analysis-card").forEach((card) => {
    const visible = lens === "all" || card.dataset.lens.split(" ").includes(lens);
    card.classList.toggle("is-hidden", !visible);
  });

  const visibleCount = currentSections.filter((section) => lens === "all" || section.lens.includes(lens)).length;
  sectionCount.textContent = `${visibleCount} 个入口`;
}

function observeReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
}

document.querySelectorAll(".lens").forEach((button) => {
  button.addEventListener("click", () => applyLens(button.dataset.lens));
});

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

renderSections(fallbackSections);
updateProgress();

fetchSections()
  .then((sections) => {
    renderSections(sections);
    dataSource.textContent = "Supabase 已连接";
  })
  .catch(() => {
    dataSource.textContent = "使用本地文学档案";
  });
