const data = window.PORTFOLIO;
document.querySelectorAll('[data-field="name"]').forEach(el => el.textContent = data.name);

const metricsEl = document.querySelector('#hero-numbers');
if (metricsEl) metricsEl.innerHTML = data.metrics.map(item => `
  <article><strong>${item.value}</strong><span>${item.label}</span><small>${item.note}</small></article>
`).join('');

document.querySelector('#skill-tags').innerHTML = data.skills.map(skill => `<span>${skill}</span>`).join('');
document.querySelector('#ai-stack').innerHTML = data.aiStack.map(tool => `<span>${tool}</span>`).join('');

// ===== AI 漫剧视频区块 =====
const dramaStage = document.querySelector('#drama-stage');
if (dramaStage && data.aiDrama && data.aiDrama.length) {
  dramaStage.innerHTML = data.aiDrama.map((item, index) => `
    <figure class="drama-item${index === 0 ? ' drama-lead' : ''} reveal">
      <div class="drama-frame">
        <video src="${item.src}" muted loop playsinline preload="metadata" aria-label="${item.title}"></video>
        <span class="drama-tag">${item.ep} · ${item.tag}</span>
        <button class="drama-sound" type="button" aria-pressed="false" aria-label="为视频开启声音">点击开声音</button>
      </div>
      <figcaption><b>${item.title}</b><p>${item.note}</p></figcaption>
    </figure>`).join('');

  // 进入视口自动播放、离开暂停，省电省流量；系统开启「减少动态效果」时不自动播
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const videoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) { video.play().catch(() => {}); }
    else { video.pause(); }
  }), { threshold: .35 });

  dramaStage.querySelectorAll('.drama-frame').forEach(frame => {
    const video = frame.querySelector('video');
    const soundBtn = frame.querySelector('.drama-sound');
    if (reduceMotion) {
      video.controls = true;
      soundBtn.classList.add('hide');
    } else {
      videoObserver.observe(video);
    }
    soundBtn.addEventListener('click', () => {
      video.muted = false;
      video.controls = true;
      soundBtn.classList.add('hide');
      soundBtn.setAttribute('aria-pressed', 'true');
      video.play().catch(() => {});
    });
  });
}
const SKILL_PALETTE = ['lime', 'violet', 'orange', 'blue'];
const FEATURED_SKILL_COUNT = 3;
function skillCopyButton(skill) {
  return skill.skillId && window.SKILLS && window.SKILLS[skill.skillId]
    ? `<button class="skill-copy-trigger" type="button" data-skill="${skill.skillId}"><span class="skill-copy-label">复制此 Skill</span><span aria-hidden="true">⧉</span></button>`
    : '';
}
function renderSkillCard(skill, index, variant) {
  const accent = `var(--${SKILL_PALETTE[index % SKILL_PALETTE.length]})`;
  const num = String(index + 1).padStart(2, '0');
  if (variant === 'tool') return `
  <article class="skill-card skill-tool reveal" style="--accent:${accent}"><div class="skill-card-top"><span>SKILL ${num}</span><b>${skill.status}</b></div><h3>${skill.title}</h3><strong>${skill.output}</strong>${skillCopyButton(skill)}</article>`;
  return `
  <article class="skill-card reveal" style="--accent:${accent}"><div class="skill-card-top"><span>${skill.type}</span><b>${skill.status}</b></div><div class="skill-icon">${num}</div><h3>${skill.title}</h3><p>${skill.description}</p><strong>${skill.output}</strong><div class="skill-card-tags">${skill.tags.map(tag => `<span>${tag}</span>`).join('')}</div>${skillCopyButton(skill)}</article>`;
}
const featuredSkills = data.personalSkills.slice(0, FEATURED_SKILL_COUNT);
const toolSkills = data.personalSkills.slice(FEATURED_SKILL_COUNT);
document.querySelector('#personal-skills').innerHTML = `
  <div class="skill-featured">${featuredSkills.map((skill, i) => renderSkillCard(skill, i, 'featured')).join('')}</div>
  ${toolSkills.length ? `
  <button class="skill-toggle" type="button" aria-expanded="false" aria-controls="skill-drawer"><span class="skill-toggle-icon" aria-hidden="true">＋</span><span class="skill-toggle-text">展开其余 ${toolSkills.length} 个效率工具</span></button>
  <div class="skill-drawer" id="skill-drawer"><div class="skill-drawer-inner"><div class="skill-tools">${toolSkills.map((skill, i) => renderSkillCard(skill, i + FEATURED_SKILL_COUNT, 'tool')).join('')}</div></div></div>` : ''}`;
function photoWall(list, cols, offset, title) {
  return list.map((src, i) => {
    const n = offset + i + 1;
    return `
      <figure class="photo-card reveal" style="--d:${(i % cols) * 110}ms"><div class="photo-placeholder"><img src="${src}" alt="${title} ${String(n).padStart(2, '0')}" loading="lazy" onerror="this.remove()"><span>${String(n).padStart(2, '0')}</span></div></figure>`;
  }).join('');
}
document.querySelector('#photo-grid').innerHTML = data.photoCollections.map((col, ci) => {
  const cols = col.layout === 'feature' ? 2 : col.layout === 'dense' ? 4 : 3;
  const show = Math.min(col.show || col.images.length, col.images.length);
  const rest = col.images.slice(show);
  return `
  <section class="photo-collection layout-${col.layout || 'std'}">
    <div class="collection-head"><span class="col-index">${String(ci + 1).padStart(2, '0')}</span><h3>${col.title}</h3><p>${col.category} · ${String(col.images.length).padStart(2, '0')} FRAMES</p></div>
    <div class="photo-wall">${photoWall(col.images.slice(0, show), cols, 0, col.title)}</div>
    ${rest.length ? `
    <button class="photo-more" type="button" aria-expanded="false" aria-controls="photo-more-${ci}" data-label="＋ 展开其余 ${rest.length} 张"><span>＋ 展开其余 ${rest.length} 张</span></button>
    <div class="photo-drawer" id="photo-more-${ci}"><div class="photo-drawer-inner"><div class="photo-wall">${photoWall(rest, cols, show, col.title)}</div></div></div>` : ''}
  </section>`;
}).join('');
document.querySelectorAll('.photo-more').forEach(btn => btn.addEventListener('click', () => {
  const drawer = document.getElementById(btn.getAttribute('aria-controls'));
  const open = drawer.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open);
  btn.querySelector('span').textContent = open ? '－ 收起' : btn.dataset.label;
}));
document.querySelector('#case-count').textContent = String(data.cases.length).padStart(2, '0');

const caseList = document.querySelector('#case-list');
caseList.innerHTML = data.cases.map((item, index) => {
  const coverFrames = item.coverCarousel && item.coverCarousel.length > 1
    ? item.coverCarousel
    : (item.archive && item.archive.images && item.archive.images.length
      ? [...(item.gallery || []), ...item.archive.images]
      : null);
  const visual = coverFrames
    ? `<div class="cover-carousel" data-frame="0" data-frames='${JSON.stringify(coverFrames).replace(/'/g, "&#39;")}'><img class="cover-img" src="${coverFrames[0]}" alt=""></div>`
    : `<img src="${item.image}" alt="" onerror="this.remove()" />`;
  return `
  <article class="case reveal" tabindex="0" role="button" data-index="${index}" aria-label="查看案例：${item.title.replace('\n','')} ">
    <div class="case-top"><span>${item.no}</span><p>${item.category}</p><b>${item.result}</b></div>
    <div class="case-body">
      <h3>${item.title.replace('\n','<br>')}</h3>
      <div class="case-visual ${item.color}${coverFrames ? ' has-carousel' : ''}">
        ${visual}
        <div class="visual-foot"><span class="visual-label">CASE ${item.no}</span><span class="visual-arrow">↗</span></div>
      </div>
    </div>
  </article>`;
}).join('');

// 封面轮播：素材库案例的封面自动轮换展示（完整图、随素材比例），鼠标悬停暂停
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    document.querySelectorAll('.cover-carousel').forEach(cc => {
      if (cc.matches(':hover')) return;
      let frames = [];
      try { frames = JSON.parse(cc.dataset.frames || '[]'); } catch (err) { frames = []; }
      const img = cc.querySelector('.cover-img');
      if (!img || frames.length < 2) return;
      const next = (Number(cc.dataset.frame || 0) + 1) % frames.length;
      cc.dataset.frame = next;
      img.classList.add('switching');
      setTimeout(() => {
        img.onload = () => img.classList.remove('switching');
        img.src = frames[next];
      }, 280);
    });
  }, 2600);
}

const dialog = document.querySelector('#case-dialog');
const dialogContent = document.querySelector('#dialog-content');
let pagerList = [];
let pagerIndex = 0;
let pagerTimer = null;
let pagerHover = false;
const PAGER_INTERVAL = 3000;
function renderPager() {
  const pager = dialogContent.querySelector('.pager');
  if (!pager || !pagerList.length) return;
  const asset = pagerList[pagerIndex];
  const img = pager.querySelector('.pager-stage img');
  img.src = asset.src;
  img.alt = asset.caption;
  img.style.visibility = '';
  pager.querySelector('.pager-caption').textContent = asset.caption;
  pager.querySelector('.pager-count').textContent = `${String(pagerIndex + 1).padStart(2, '0')} / ${String(pagerList.length).padStart(2, '0')}`;
  pager.querySelectorAll('.pager-dot').forEach((dot, i) => dot.classList.toggle('active', i === pagerIndex));
}
function stepPager(dir) {
  if (pagerList.length < 2) return;
  pagerIndex = (pagerIndex + dir + pagerList.length) % pagerList.length;
  renderPager();
}
function startPager() {
  stopPager();
  if (pagerList.length < 2) return;
  pagerTimer = setInterval(() => stepPager(1), PAGER_INTERVAL);
}
function stopPager() {
  if (pagerTimer) { clearInterval(pagerTimer); pagerTimer = null; }
}
function openCase(index) {
  const item = data.cases[index];
  pagerList = [];
  (item.gallery || []).forEach((src, i) => pagerList.push({ src, caption: `项目配图 ${String(i + 1).padStart(2, '0')}` }));
  if (item.archive && item.archive.images && item.archive.images.length) {
    item.archive.images.forEach((src, i) => pagerList.push({ src, caption: `${item.archive.title} ${String(i + 1).padStart(2, '0')}` }));
  }
  pagerIndex = 0;
  dialogContent.innerHTML = `
    <p class="eyebrow">CASE ${item.no} · ${item.category}</p>
    <h2 id="dialog-title">${item.title.replace('\n','<br>')}</h2>
    <p class="dialog-summary">${item.summary}</p>
    <div class="dialog-meta"><p><small>我的职责</small>${item.role}</p><p><small>项目周期</small>${item.period}</p><p><small>核心结果</small>${item.result}</p></div>
    ${item.proof ? `<p class="dialog-proof">这个案例证明：<b>${item.proof}</b></p>` : ''}
    ${item.link ? `<a class="dialog-link" href="${item.link}" target="_blank" rel="noopener">↗ 线上体验这个产品</a>` : ''}
    <div class="dialog-section"><small>01 / 问题</small><p>${item.challenge}</p></div>
    <div class="dialog-section"><small>02 / 策略与执行</small><ol>${item.actions.map(x => `<li>${x}</li>`).join('')}</ol></div>
    <div class="dialog-data">${item.data.map(x => `<strong>${x}</strong>`).join('')}</div>
    ${pagerList.length ? `
    <div class="dialog-pager-block">
      <small>03 / 项目素材 · ${pagerList.length} 张 · 自动轮播，悬停暂停，也可点击或 ← → 手动翻阅</small>
      <div class="pager${pagerList.length < 2 ? ' pager-solo' : ''}">
        <figure class="pager-stage"><img alt="" onerror="this.style.visibility='hidden'"></figure>
        <div class="pager-bar">
          <button class="pager-btn pager-prev" type="button" aria-label="上一张">←</button>
          <span class="pager-caption"></span>
          <span class="pager-count"></span>
          <button class="pager-btn pager-next" type="button" aria-label="下一张">→</button>
        </div>
        ${pagerList.length > 1 ? `<div class="pager-dots">${pagerList.map((_, i) => `<button class="pager-dot${i === 0 ? ' active' : ''}" type="button" data-dot="${i}" aria-label="查看第 ${i + 1} 张"></button>`).join('')}</div>` : ''}
      </div>
    </div>` : ''}`;
  renderPager();
  const pagerEl = dialogContent.querySelector('.pager');
  if (pagerEl && pagerList.length > 1) {
    pagerEl.addEventListener('mouseenter', () => { pagerHover = true; stopPager(); });
    pagerEl.addEventListener('mouseleave', () => { pagerHover = false; startPager(); });
    startPager();
  }
  dialog.showModal();
  document.body.classList.add('locked');
}
caseList.addEventListener('click', e => { const card = e.target.closest('.case'); if (card) openCase(card.dataset.index); });
caseList.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.case')) openCase(e.target.dataset.index); });
document.querySelectorAll('.dialog-close').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('locked'); stopPager(); });
dialogContent.addEventListener('click', e => {
  const dot = e.target.closest('.pager-dot');
  if (dot) {
    pagerIndex = Number(dot.dataset.dot);
    renderPager();
    if (!pagerHover) startPager();
    return;
  }
  if (e.target.closest('.pager-prev')) { stepPager(-1); if (!pagerHover) startPager(); }
  if (e.target.closest('.pager-next')) { stepPager(1); if (!pagerHover) startPager(); }
});
dialog.addEventListener('keydown', e => {
  if (!dialogContent.querySelector('.pager')) return;
  if (e.key === 'ArrowLeft') { stepPager(-1); if (!pagerHover) startPager(); }
  if (e.key === 'ArrowRight') { stepPager(1); if (!pagerHover) startPager(); }
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; });

// ===== 个人 Skill 复制与安装引导 =====
function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { }
    document.body.removeChild(ta);
    ok ? resolve() : reject(new Error('copy failed'));
  });
}

let toastTimer;
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
function doCopy(text, successMsg) {
  copyText(text).then(() => showToast(successMsg)).catch(() => showToast('复制失败，请在弹窗中手动选择复制'));
}

const skillDialog = document.querySelector('#skill-dialog');
const skillDialogContent = document.querySelector('#skill-dialog-content');
function openSkill(id) {
  const skill = window.SKILLS && window.SKILLS[id];
  const meta = data.personalSkills.find(s => s.skillId === id);
  if (!skill) return;
  const mkdirCmd = 'mkdir -p ~/.claude/skills/' + id;
  const filePath = '~/.claude/skills/' + id + '/SKILL.md';
  skillDialogContent.innerHTML = `
    <p class="eyebrow">SKILL.MD · ${id}</p>
    <h2 id="skill-dialog-title">${meta ? meta.title : id}</h2>
    <p class="dialog-summary">${meta ? meta.description : ''}</p>
    <div class="skill-install">
      <small>复制到本地 · 三步开始使用</small>
      <ol>
        <li><b>复制内容</b><span>点击下方「复制 Skill 内容」，完整 SKILL.md 会进入剪贴板。</span></li>
        <li><b>创建文件</b><span>在终端执行 <code>${mkdirCmd}</code><button class="mini-copy" type="button" data-copy="${mkdirCmd}">复制命令</button>，然后在该目录下新建 <code>SKILL.md</code> 文件，粘贴内容并保存。</span></li>
        <li><b>开始使用</b><span>在 Claude Code 里直接描述需求（例如「帮我诊断一家店」），会自动匹配调用；不用 Claude Code，也可以把内容整段粘贴给任意 AI 对话使用。</span></li>
      </ol>
    </div>
    <div class="skill-actions">
      <button class="skill-copy-main" type="button" data-skill-copy="${id}">复制 Skill 内容</button>
      <span class="skill-file-hint">保存位置：${filePath}</span>
    </div>
    <pre class="skill-md"><code>${escapeHtml(skill.content)}</code></pre>`;
  skillDialog.showModal();
  document.body.classList.add('locked');
}

document.querySelector('#personal-skills').addEventListener('click', e => {
  const btn = e.target.closest('[data-skill]');
  if (btn) openSkill(btn.dataset.skill);
});

const skillToggle = document.querySelector('.skill-toggle');
const skillDrawer = document.querySelector('.skill-drawer');
if (skillToggle && skillDrawer) {
  skillToggle.addEventListener('click', () => {
    const open = skillDrawer.classList.toggle('open');
    skillToggle.setAttribute('aria-expanded', String(open));
    skillToggle.querySelector('.skill-toggle-icon').textContent = open ? '－' : '＋';
    skillToggle.querySelector('.skill-toggle-text').textContent = open ? '收起效率工具箱' : `展开其余 ${toolSkills.length} 个效率工具`;
  });
}
skillDialog.addEventListener('click', e => {
  if (e.target === skillDialog) { skillDialog.close(); return; }
  const copyBtn = e.target.closest('[data-skill-copy]');
  if (copyBtn) {
    const skill = window.SKILLS[copyBtn.dataset.skillCopy];
    if (skill) doCopy(skill.content, '已复制 ✓ 粘贴到 SKILL.md 即可使用');
    return;
  }
  const cmdBtn = e.target.closest('[data-copy]');
  if (cmdBtn) doCopy(cmdBtn.dataset.copy, '命令已复制 ✓');
});
skillDialog.addEventListener('close', () => document.body.classList.remove('locked'));
