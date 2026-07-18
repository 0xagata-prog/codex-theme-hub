"use client";

import { FormEvent, useMemo, useState } from "react";

type Theme = {
  id: string;
  name: string;
  author: string;
  handle: string;
  platform: "桌面端" | "CLI" | "全平台";
  mode: "深色" | "浅色";
  downloads: string;
  likes: number;
  version: string;
  tags: string[];
  palette: string[];
  preview: string;
  featured?: boolean;
  newTheme?: boolean;
};

const themes: Theme[] = [
  {
    id: "midnight-forge",
    name: "Midnight Forge",
    author: "Kian Moss",
    handle: "@kianmoss",
    platform: "全平台",
    mode: "深色",
    downloads: "12.8k",
    likes: 842,
    version: "Codex 26.7+",
    tags: ["高对比", "专注", "OLED"],
    palette: ["#080A0F", "#B8FF5B", "#9B8CFF", "#F5F7FA"],
    preview: "forge",
    featured: true,
  },
  {
    id: "quiet-garden",
    name: "Quiet Garden",
    author: "Lin Su",
    handle: "@linsu.design",
    platform: "桌面端",
    mode: "浅色",
    downloads: "9.4k",
    likes: 716,
    version: "Codex 26.5+",
    tags: ["护眼", "自然", "柔和"],
    palette: ["#E9EDDF", "#48634E", "#D9A86C", "#28332B"],
    preview: "garden",
  },
  {
    id: "tokyo-neon",
    name: "Tokyo Neon",
    author: "Mika Ito",
    handle: "@mika.codes",
    platform: "全平台",
    mode: "深色",
    downloads: "8.7k",
    likes: 963,
    version: "Codex 26.7+",
    tags: ["霓虹", "赛博", "鲜艳"],
    palette: ["#101025", "#FF4FCB", "#40E9FF", "#F5F0FF"],
    preview: "tokyo",
    newTheme: true,
  },
  {
    id: "paper-code",
    name: "Paper Code",
    author: "Noah Reed",
    handle: "@noahreed",
    platform: "CLI",
    mode: "浅色",
    downloads: "6.1k",
    likes: 489,
    version: "CLI 0.105+",
    tags: ["纸张", "极简", "长文本"],
    palette: ["#F4F0E8", "#171816", "#D95E40", "#3158A6"],
    preview: "paper",
  },
  {
    id: "gilded-console",
    name: "Gilded Console",
    author: "Aya Studio",
    handle: "@ayastudio",
    platform: "桌面端",
    mode: "深色",
    downloads: "5.8k",
    likes: 650,
    version: "Codex 26.6+",
    tags: ["金色", "奢华", "沉浸"],
    palette: ["#11100F", "#D8B56B", "#493B27", "#F4EBD8"],
    preview: "gilded",
    featured: true,
  },
  {
    id: "nord-frost",
    name: "Nord Frost",
    author: "Elio Park",
    handle: "@eliopark",
    platform: "CLI",
    mode: "深色",
    downloads: "4.9k",
    likes: 371,
    version: "CLI 0.105+",
    tags: ["冷调", "低饱和", "经典"],
    palette: ["#242933", "#88C0D0", "#A3BE8C", "#ECEFF4"],
    preview: "nord",
    newTheme: true,
  },
];

const filters = ["全部", "桌面端", "CLI", "深色", "浅色"] as const;

function MiniWindow({ theme }: { theme: Theme }) {
  return (
    <div className={`theme-preview preview-${theme.preview}`} aria-hidden="true">
      <div className="mini-topbar">
        <span />
        <span />
        <span />
        <b>codex</b>
      </div>
      <div className="mini-shell">
        <div className="mini-sidebar">
          <i className="mini-logo">C</i>
          <span className="mini-wide active" />
          <span className="mini-short" />
          <span className="mini-wide" />
          <span className="mini-short" />
        </div>
        <div className="mini-main">
          <div className="mini-kicker">THEME PREVIEW</div>
          <strong>Build something remarkable.</strong>
          <div className="mini-code">
            <span><em>const</em> theme = <b>&quot;{theme.name}&quot;</b>;</span>
            <span><em>await</em> codex.apply(theme);</span>
            <span className="mini-success">✓ Ready to create</span>
          </div>
          <div className="mini-composer"><span>Ask Codex anything</span><i>↑</i></div>
        </div>
      </div>
    </div>
  );
}

function ThemeCard({
  theme,
  saved,
  onSave,
  onOpen,
}: {
  theme: Theme;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
}) {
  return (
    <article className="theme-card">
      <button className="preview-button" onClick={onOpen} aria-label={`查看 ${theme.name} 详情`}>
        <MiniWindow theme={theme} />
        <span className="preview-action">打开预览 <b>↗</b></span>
      </button>
      <div className="card-body">
        <div className="card-heading">
          <div>
            <div className="eyebrow-row">
              <span>{theme.platform}</span>
              {theme.featured && <b className="trend-label">趋势</b>}
              {theme.newTheme && <b className="new-label">新上架</b>}
            </div>
            <button className="title-button" onClick={onOpen}>{theme.name}</button>
          </div>
          <button
            className={`save-button ${saved ? "is-saved" : ""}`}
            onClick={onSave}
            aria-label={saved ? `取消收藏 ${theme.name}` : `收藏 ${theme.name}`}
            aria-pressed={saved}
          >
            {saved ? "♥" : "♡"}
          </button>
        </div>
        <div className="author-line">
          <span className="avatar">{theme.author.slice(0, 1)}</span>
          <span>{theme.author}</span>
          <small>{theme.handle}</small>
        </div>
        <div className="tag-row">
          {theme.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="card-footer">
          <span>↓ {theme.downloads}</span>
          <span>♥ {theme.likes + (saved ? 1 : 0)}</span>
          <span className="compatibility">✓ {theme.version}</span>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<Theme | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const visibleThemes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return themes.filter((theme) => {
      const matchesFilter =
        filter === "全部" ||
        theme.platform === filter ||
        theme.platform === "全平台" && (filter === "桌面端" || filter === "CLI") ||
        theme.mode === filter;
      const haystack = `${theme.name} ${theme.author} ${theme.handle} ${theme.tags.join(" ")}`.toLowerCase();
      return matchesFilter && (!normalized || haystack.includes(normalized));
    });
  }, [filter, query]);

  const toggleSaved = (id: string) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const submitTheme = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Codex Theme Hub 首页">
          <span>C</span>
          <strong>Codex Theme Hub</strong>
        </a>
        <nav aria-label="主导航">
          <a href="#themes">主题</a>
          <a href="#creators">创作者</a>
          <button onClick={() => setSubmitOpen(true)}>投稿</button>
        </nav>
        <button className="submit-nav" onClick={() => setSubmitOpen(true)}>发布主题 <span>↗</span></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-label"><span>THEME THE WORK</span><i>●</i> 社区精选主题</div>
          <h1>给 Codex 换一套<br /><em>工作情绪。</em></h1>
          <p>发现、预览并收藏来自全球创作者的 Codex 桌面端与 CLI 主题。</p>
          <form className="hero-search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="theme-search" className="sr-only">搜索主题或创作者</label>
            <span aria-hidden="true">⌕</span>
            <input
              id="theme-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索主题、风格或创作者…"
            />
            <kbd>⌘ K</kbd>
          </form>
          <div className="hero-stats" aria-label="社区数据">
            <span><strong>128</strong> 个精选主题</span>
            <span><strong>42</strong> 位创作者</span>
            <span><strong>98%</strong> 兼容性已验证</span>
          </div>
        </div>
        <div className="hero-showcase" aria-label="今日热门主题 Tokyo Neon">
          <div className="showcase-note">TODAY&apos;S PICK <span>01</span></div>
          <div className="showcase-card">
            <MiniWindow theme={themes[2]} />
            <div className="showcase-meta">
              <span>今日热门</span>
              <strong>Tokyo Neon</strong>
              <small>by Mika Ito · 全平台</small>
            </div>
          </div>
          <div className="floating-chip chip-one"><b>+31%</b> 本周收藏</div>
          <div className="floating-chip chip-two"><span>●</span> 兼容性已验证</div>
        </div>
      </section>

      <section className="market" id="themes">
        <div className="market-heading">
          <div>
            <span className="section-index">01 / DISCOVER</span>
            <h2>正在流行</h2>
          </div>
          <p>本周社区最受欢迎的 Codex 主题。<br />所有主题均通过人工兼容性检查。</p>
        </div>

        <div className="filter-row">
          <div className="filter-tabs" aria-label="主题筛选">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <span>{visibleThemes.length} 个结果</span>
        </div>

        {visibleThemes.length > 0 ? (
          <div className="theme-grid">
            {visibleThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                saved={saved.includes(theme.id)}
                onSave={() => toggleSaved(theme.id)}
                onOpen={() => setSelected(theme)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>⌕</span>
            <h3>没有找到对应主题</h3>
            <p>换个关键词，或清除当前筛选条件。</p>
            <button onClick={() => { setQuery(""); setFilter("全部"); }}>查看全部主题</button>
          </div>
        )}
      </section>

      <section className="creator-banner" id="creators">
        <div className="creator-dots" aria-hidden="true"><span>C</span><span>T</span><span>H</span></div>
        <div>
          <span className="section-index">02 / CREATE</span>
          <h2>你的配色，值得被看见。</h2>
          <p>上传预览与主题文件，兼容性验证通过后即可进入主题广场。</p>
        </div>
        <button onClick={() => setSubmitOpen(true)}>投稿你的主题 <span>↗</span></button>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span>C</span><strong>Codex Theme Hub</strong></a>
        <p>由 Codex 社区创造，为每一种工作状态设计。</p>
        <div><a href="#themes">主题规范</a><a href="#creators">创作者计划</a><a href="#top">回到顶部 ↑</a></div>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭详情">×</button>
            <MiniWindow theme={selected} />
            <div className="detail-content">
              <div className="eyebrow-row"><span>{selected.platform}</span><span>{selected.mode}</span><b>已验证</b></div>
              <h2 id="detail-title">{selected.name}</h2>
              <p>由 {selected.author} 设计，为长时间专注工作优化。已检查文字对比度、代码可读性与主要 Codex 界面的兼容表现。</p>
              <div className="palette-row" aria-label="主题色板">
                {selected.palette.map((color) => <span key={color} style={{ background: color }}><small>{color}</small></span>)}
              </div>
              <div className="detail-facts"><span><b>{selected.downloads}</b> 下载</span><span><b>{selected.likes}</b> 收藏</span><span><b>{selected.version}</b> 兼容版本</span></div>
              <div className="detail-actions">
                <button className="primary-action" onClick={() => toggleSaved(selected.id)}>{saved.includes(selected.id) ? "已收藏 ♥" : "收藏主题 ♡"}</button>
                <button onClick={() => alert("首版演示：正式主题文件上线后，这里会提供一键导入。")}>获取主题文件 ↓</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {submitOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => { setSubmitOpen(false); setSubmitted(false); }}>
          <section className="submit-modal" role="dialog" aria-modal="true" aria-labelledby="submit-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => { setSubmitOpen(false); setSubmitted(false); }} aria-label="关闭投稿窗口">×</button>
            {!submitted ? (
              <>
                <span className="section-index">CREATOR SUBMISSION</span>
                <h2 id="submit-title">发布你的 Codex 主题</h2>
                <p>留下主题信息。正式上线前，我们会进一步接入文件上传和自动兼容性检测。</p>
                <form onSubmit={submitTheme}>
                  <label>主题名称<input required placeholder="例如：Shanghai After Dark" /></label>
                  <label>作者名称<input required placeholder="你的名字或工作室" /></label>
                  <label>主题链接<input type="url" required placeholder="https://github.com/…" /></label>
                  <label>支持平台<select defaultValue="desktop"><option value="desktop">Codex 桌面端</option><option value="cli">Codex CLI</option><option value="all">全平台</option></select></label>
                  <button className="primary-action" type="submit">提交审核 →</button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <span>✓</span>
                <h2 id="submit-title">主题信息已记录</h2>
                <p>这是首版交互演示。接入数据库后，投稿会进入兼容性审核队列。</p>
                <button onClick={() => { setSubmitOpen(false); setSubmitted(false); }}>完成</button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
