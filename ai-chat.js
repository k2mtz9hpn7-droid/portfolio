/* ============================================================
   ✦ AI 数字分身对话框 · ai-chat.js
   ------------------------------------------------------------
   两种运行模式，在下方 AI_CHAT_CONFIG 中切换：

   ① mode: 'local'（默认，开箱即用）
      内置问答引擎，资料自动读取 content.js 里的最新数据，
      免费、离线可用，可安全地公开发布。

   ② mode: 'coze'
      嵌入你在「扣子 Coze」上创建的大模型机器人。
      搭建步骤见同目录《AI分身配置指南.md》：
      扣子创建机器人 → 发布 → 复制嵌入地址 → 填入 cozeEmbed。
   ============================================================ */
const AI_CHAT_CONFIG = {
  mode: 'local', // 'local' = 内置问答引擎 | 'coze' = 扣子机器人
  cozeEmbed: '', // 扣子机器人的嵌入地址或 iframe 代码（见配置指南）
};

(function () {
  'use strict';

  const cfg = window.AI_CHAT_CONFIG || { mode: 'local', cozeEmbed: '' };
  const P = window.PORTFOLIO || {};
  const NAME = P.name || '师靖怡';
  const EMAIL = 'shijingyi0924@163.com'; // 如需更换联系方式，同步修改 index.html 里的 mailto
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoze = cfg.mode === 'coze' && String(cfg.cozeEmbed || '').trim();

  /* ---------- 知识库：回答内容（自动读取作品集数据，改 content.js 即同步） ---------- */

  function findCase(no) { return (P.cases || []).find(c => c.no === no); }

  const NUM = ['①', '②', '③', '④', '⑤', '⑥'];
  function caseAnswer(no, lead) {
    const c = findCase(no);
    if (!c) return '这个案例的细节还在整理中，可以先问我其他案例，或发邮件给我：' + EMAIL;
    return lead + '（核心结果：' + c.result + '）\n\n◆ 背景与挑战\n' + c.challenge +
      '\n\n◆ 我做了什么\n' + c.actions.map((x, i) => (NUM[i] || '·') + ' ' + x).join('\n') +
      '\n\n◆ 最终结果\n' + c.data.join('、') + '\n\n想继续了解其他案例或背后的方法论，随时问我。';
  }

  function fallbackText() {
    return '这个问题我还在学习中。可以先问我：\n· 自我介绍 / 核心数据\n· 项目案例与打法\n· AI 能力与工具\n· 方法论 / 摄影 / 联系方式\n\n也可以直接发邮件给我：' + EMAIL;
  }

  const topics = [
    { k: ['你好', '您好', '哈喽', '嗨', '在吗', 'hi', 'hello'],
      a: () => '你好呀，我是' + NAME + ' ✦\n这里是基于我作品集训练的 AI 分身，案例、AI 能力、方法论、联系方式，想问什么直接来，也可以点下面的快捷问题。' },
    { k: ['介绍', '你是谁', '简介', '认识', '了解一下', '自我介绍', '是谁', '个人情况', '基本情况'],
      a: () => '我是' + NAME + '，来自香港浸会大学传播学专业，有收钱吧的商家运营实习经验。传播学给我洞察人与内容的底子，AI 让我学会搭建自己的工作流与 Skill。\n我专注商家运营与广告投放：实习期间独立负责门店抖音来客从 0 到 1，也跑通过淘宝闪购冷启动。用数据诊断问题、用 AIGC 加速素材迭代、把运营经验沉淀为可复用的 AI 能力。想深入聊哪一块，直接问我。' },
    { k: ['数据', '业绩', '成果', '成绩', '数字', 'roi', 'gmv', '投产', '产出'],
      a: () => '几组我比较看重的数字：' + (P.metrics || []).map(m => m.value + ' ' + m.label).join('、') + '。\n每个数字背后都有具体项目支撑，想听哪个案例的细节，直接问我。' },
    { k: ['抖音', '达人', '团购', '核销', '来客', '餐饮', '门店', '收钱吧', '探店', '商家运营'],
      a: () => caseAnswer('02', '这是我在收钱吧实习期间独立负责的项目：一家正餐门店的抖音来客从 0 到 1，三个月跑通完整经营闭环。') },
    { k: ['闪购', '淘宝', '新平台', '月订单', '客单价', '满减', '上架', '投流', '冷启动'],
      a: () => caseAnswer('03', '这是我负责的新平台冷启动项目：淘宝闪购门店从 0 到 1，月订单从 90 做到 560。') },
    { k: ['素材', '菜品图', '流水线', '棚拍', 'aigc', '产能', '提示词', 'prompt', '图片'],
      a: () => caseAnswer('01', '这是我把 AIGC 真正用进素材生产的项目：单店 70 道菜品图一条流水线搞定，素材成本下降 95%。') },
    { k: ['提案', '冷启动方案', '卤味', '熟食', '社区店', '0到1', '0-1', '从零', '模拟项目'],
      a: () => caseAnswer('04', '这是我独立完成的模拟提案：把实习期跑通的餐饮运营方法论，平移到一家 0→1 的社区卤味店，设计 30 天双平台冷启动方案。') },
    { k: ['案例', '项目', '做过', '经历', '哪些事', '代表作品'],
      a: () => '我在作品集里挑了 ' + (P.cases || []).length + ' 个最能代表我的案例：\n' +
        (P.cases || []).map(c => '· ' + c.category + '｜' + c.title.replace('\n', '') + '（' + c.result + '）').join('\n') +
        '\n\n对哪个感兴趣？问我细节，我会讲清楚背景、打法和结果。' },
    { k: ['ai', '人工智能', 'skill', '工作流', '工具', '模型', 'claude', 'chatgpt', 'gpt', 'coze', 'comfyui', 'midjourney', '即梦', 'codex', '扣子'],
      a: () => '我把重复的运营工作拆成可复用的 AI 工作流。常用工具栈：' + (P.aiStack || []).join('、') + '。\n\n目前已沉淀 ' + (P.personalSkills || []).length + ' 个个人 Skill，覆盖商家诊断、素材生产、竞品分析、活动企划、投放复盘等运营环节，例如「商家经营诊断助手」把诊断时间从 2 小时压到 20 分钟，「AIGC素材生产流」让内容产能提升 4 倍。\n\n页面上的「AI能力」板块可以展开查看每一个 Skill，并且支持一键复制带走使用。' },
    { k: ['方法论', '思路', '框架', '怎么做', '打法', '逻辑', '流程', '方法'],
      a: () => '我把增长看成一套可验证的系统，分四步：\n01 诊断：看生意、商品、人群和链路，找到真正限制增长的环节\n02 假设：把模糊问题转化成可以被素材、投放和页面验证的假设\n03 实验：搭建测试矩阵，小预算快速筛选人群、卖点和内容方向\n04 放大：沉淀胜出组合与 SOP，在成本可控的前提下持续放量' },
    { k: ['摄影', '拍照', '照片', '审美', '镜头', '拍摄'],
      a: () => '摄影是我的观察力训练。作品集里有 ' + (P.photoCollections || []).length + ' 个系列：' +
        (P.photoCollections || []).map(c => c.title).join('、') +
        '。\n镜头让我对用户情绪和画面细节更敏感，这些都会反哺到素材生产的审美与策略判断里。欢迎在页面「摄影」板块翻翻我的照片。' },
    { k: ['学校', '专业', '学历', '浸会', '传播学', '大学', '教育', '背景'],
      a: () => '我来自香港浸会大学传播学专业。传播学训练了我洞察人与内容的能力，AI 让我学会把工作流沉淀成 Skill——这两块加起来，就是我做商家运营和广告投放的底色。' },
    { k: ['擅长', '技能', '会什么', '能力', '特长'],
      a: () => '我的核心技能：' + (P.skills || []).join('、') + '。\n想深入了解哪一项，结合案例问我更有感觉。' },
    { k: ['为什么', '优势', '凭什么', '理由', '录用', '竞争力', '选择你'],
      a: () => '三个理由：\n① 我盯的是生意结果，不是漂亮的曝光——三个月做到抖音累计支付 GMV ¥11.2 万、闪购月订单 90→560，都是我真正负责的指标\n② 我会用 AIGC 实打实降本提效——单店素材成本下降 95%，让产能不再是门店上线的瓶颈\n③ 我能把运营经验沉淀成可复用的 AI Skill，目前已沉淀 ' + (P.personalSkills || []).length + ' 个，能力可以被团队带走、持续迭代' },
    { k: ['求职', '岗位', '招聘', '实习', '全职', '工作机会', '入职', '简历'],
      a: () => '我在寻找商家运营、广告投放、AIGC 创意相关的机会，简历可以随时发给你。\n如果你有合适的岗位或项目，欢迎把 JD 发到 ' + EMAIL + '，我会认真回复。' },
    { k: ['联系', '邮箱', '邮件', '合作', '找我', '微信', '电话', '怎么找到'],
      a: () => '最快的方式是发邮件：' + EMAIL + '\n聊合作、聊工作机会都可以，我看到会尽快回复你。' }
  ];

  function matchTopic(text) {
    const t = text.toLowerCase();
    let best = null, bestScore = 0;
    for (const topic of topics) {
      let score = 0;
      for (const kw of topic.k) { if (t.indexOf(kw.toLowerCase()) > -1) score += kw.length; }
      if (score > bestScore) { best = topic; bestScore = score; }
    }
    return best;
  }

  /* ---------- 界面搭建 ---------- */

  function cozeSrc() {
    const raw = String(cfg.cozeEmbed || '').trim();
    const m = raw.match(/src\s*=\s*["']([^"']+)["']/i);
    return m ? m[1] : raw;
  }

  const widget = document.createElement('div');
  widget.className = 'ai-chat-wrap';
  widget.innerHTML =
    '<button class="ai-chat-launcher" id="ai-chat-launcher" type="button" aria-label="打开 AI 数字分身对话" aria-expanded="false">' +
      '<span class="ai-chat-dot" aria-hidden="true"></span>问问 AI 版的我' +
    '</button>' +
    '<section class="ai-chat-panel" id="ai-chat-panel" role="dialog" aria-label="AI 数字分身对话">' +
      '<header class="ai-chat-head">' +
        '<span class="ai-chat-avatar" aria-hidden="true">' + NAME.charAt(0) + '</span>' +
        '<div class="ai-chat-id"><b>' + NAME + ' · AI 分身</b><small>' + (isCoze ? '由扣子 Coze 大模型驱动' : '基于我的真实作品集') + '</small></div>' +
        '<button class="ai-chat-close" id="ai-chat-close" type="button" aria-label="关闭对话">×</button>' +
      '</header>' +
      (isCoze
        ? '<iframe class="ai-chat-iframe" src="' + cozeSrc() + '" title="扣子机器人" loading="lazy"></iframe>'
        : '<div class="ai-chat-body" id="ai-chat-body"></div>' +
          '<div class="ai-chat-chips" id="ai-chat-chips"></div>' +
          '<form class="ai-chat-input" id="ai-chat-form">' +
            '<input id="ai-chat-field" type="text" placeholder="问问我的案例、AI 能力…" autocomplete="off">' +
            '<button type="submit" aria-label="发送">↑</button>' +
          '</form>') +
      '<p class="ai-chat-note">' + (isCoze ? '内容由 AI 生成 · 关键信息以作品集页面为准' : 'AI 基于作品集资料回答 · 关键信息以页面为准') + '</p>' +
    '</section>';
  document.body.appendChild(widget);

  const launcher = document.getElementById('ai-chat-launcher');
  const panel = document.getElementById('ai-chat-panel');
  const closeBtn = document.getElementById('ai-chat-close');

  function openPanel() {
    panel.classList.add('open');
    launcher.setAttribute('aria-expanded', 'true');
    if (!isCoze) { const f = document.getElementById('ai-chat-field'); if (f) f.focus(); }
  }
  function closePanel() {
    panel.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
  }
  launcher.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  const aboutTrigger = document.getElementById('ai-chat-about-trigger');
  if (aboutTrigger) aboutTrigger.addEventListener('click', openPanel);

  /* ---------- 本地问答交互 ---------- */
  if (!isCoze) {
    const body = document.getElementById('ai-chat-body');
    const chipsBox = document.getElementById('ai-chat-chips');
    const form = document.getElementById('ai-chat-form');
    const field = document.getElementById('ai-chat-field');
    let busy = false;

    function scrollBottom() { body.scrollTop = body.scrollHeight; }

    function addMsg(text, who) {
      const div = document.createElement('div');
      div.className = 'ai-chat-msg ' + who;
      div.textContent = text;
      body.appendChild(div);
      scrollBottom();
      return div;
    }

    function addTyping() {
      const div = document.createElement('div');
      div.className = 'ai-chat-msg ai ai-chat-msg-typing';
      div.innerHTML = '<i></i><i></i><i></i>';
      body.appendChild(div);
      scrollBottom();
      return div;
    }

    function typeMsg(text, done) {
      const div = addMsg('', 'ai');
      if (REDUCED) { div.textContent = text; scrollBottom(); done(); return; }
      div.classList.add('typing');
      let i = 0;
      const timer = setInterval(() => {
        i += 2;
        div.textContent = text.slice(0, i);
        scrollBottom();
        if (i >= text.length) {
          clearInterval(timer);
          div.classList.remove('typing');
          done();
        }
      }, 14);
    }

    function ask(raw) {
      const text = String(raw || '').trim();
      if (!text || busy) return;
      chipsBox.style.display = 'none';
      addMsg(text, 'user');
      field.value = '';
      busy = true;
      field.disabled = true;
      const typing = addTyping();
      setTimeout(() => {
        typing.remove();
        const topic = matchTopic(text);
        const answer = topic ? topic.a() : fallbackText();
        typeMsg(answer, () => { busy = false; field.disabled = false; field.focus(); });
      }, REDUCED ? 120 : 550 + Math.random() * 350);
    }

    form.addEventListener('submit', e => { e.preventDefault(); ask(field.value); });

    ['介绍一下你自己', '你最能打的案例是哪个？', '你的 AI 能力有多强？', '怎么联系你？'].forEach(q => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = q;
      btn.addEventListener('click', () => ask(q));
      chipsBox.appendChild(btn);
    });

    addMsg('你好呀，我是' + NAME + ' ✦\n这里是基于我作品集训练的 AI 分身，案例、AI 能力、方法论、联系方式，想问什么直接来，也可以点下面的快捷问题。', 'ai');
  }
})();
