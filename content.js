// 只需要修改这个文件，就能替换姓名、数据、能力与全部项目内容。
window.PORTFOLIO = {
  name: "师靖怡",
  metrics: [
    { value: "+190%", label: "可绎AI上线首月UV", note: "快手AI产品实习 · 环比" },
    { value: "+65%", label: "AI素材采纳率", note: "「商品换背景」上线首月" },
    { value: "-95%", label: "单店素材成本", note: "AIGC流水线替代棚拍" },
    { value: "分钟级", label: "单品上新周期", note: "原实拍 3-7 天" }
  ],
  skills: ["商家诊断", "店铺装修", "团购品设计", "达人合作", "活动策划", "数据监测", "AIGC工作流", "模型评测", "PRD撰写"],
  aiStack: ["Claude Code", "Codex", "Coze", "ComfyUI", "Midjourney", "即梦", "Keye-VL", "Kling"],
  // AI 漫剧视频：视频文件放在 videos/ 目录，第一条会作为主打全宽展示，其余并排展示。
  aiDrama: [
    { src: "videos/ai-drama-01.mp4", ep: "EP.01", tag: "主打", title: "AI漫剧 · 主打成片", note: "剧本 → AI 画面生成 → 剪辑合成，建议开启声音观看" },
    { src: "videos/ai-drama-02.mp4", ep: "EP.02", tag: "实验", title: "AI漫剧 · 实验二", note: "同一产线下的风格测试" },
    { src: "videos/ai-drama-03.mp4", ep: "EP.03", tag: "实验", title: "AI漫剧 · 实验三", note: "同一产线下的风格测试" }
  ],
  personalSkills: [
    { type: "PERSONAL SKILL 01", title: "商家经营诊断助手", skillId: "merchant-diagnosis", status: "可运行", description: "输入商家基本信息、经营数据与用户评价，自动输出问题树、增长机会和下一步验证清单。收钱吧实习起沉淀，服务过 100 家代运营商家的诊断场景。", output: "诊断时间 2h → 20min", tags: ["信息结构化", "问题诊断", "策略生成"] },
    { type: "PERSONAL SKILL 02", title: "广告素材拆解器", skillId: "ad-creative-breakdown", status: "迭代中", description: "批量拆解广告的用户痛点、利益点、钩子和内容结构，沉淀为可以复用的创意素材库。", output: "单次分析 30+ 素材", tags: ["素材分析", "创意标签", "竞品研究"] },
    { type: "AI WORKFLOW 03", title: "AIGC素材生产流", skillId: "aigc-content-pipeline", status: "已应用", description: "从用户评论洞察到脚本、分镜、画面生成和人工校准，快速完成多方向广告素材测试。已量产验证：日产素材 280 张、提效 9 倍、成本下降 90%。", output: "内容产能提升 4×", tags: ["Prompt", "图像生成", "质量校准"] },
    { type: "PERSONAL SKILL 04", title: "竞品分析报告", skillId: "competitor-research", status: "可运行", description: "输入竞品的产品、价格、渠道与口碑信息，输出五维对比、SWOT 与差异化机会的结构化报告。快手实习期间用同套方法对标过万相营造、即创、绘蛙。", output: "调研周期 3天 → 半天", tags: ["竞品研究", "SWOT", "差异化定位"] },
    { type: "PERSONAL SKILL 05", title: "产品卖点提炼师", skillId: "selling-point-extractor", status: "可运行", description: "用 FAB 法则把产品参数翻译成购买理由，产出核心卖点、场景化话术与一句话 Pitch。", output: "卖点金字塔 + 10条话术", tags: ["FAB法则", "卖点提炼", "话术生成"] },
    { type: "AI WORKFLOW 06", title: "小红书爆款笔记", skillId: "xiaohongshu-note", status: "已应用", description: "基于选题钩子、标题技巧与合规红线，批量产出自然可信、值得互动的种草笔记。", output: "单次产出 5 标题 + 正文", tags: ["种草内容", "标题创作", "平台合规"] },
    { type: "PERSONAL SKILL 07", title: "营销活动企划师", skillId: "campaign-planner", status: "迭代中", description: "从目标拆解到玩法、节奏、预算与风险预案，把活动想法变成可执行可复盘的方案。", output: "完整活动方案 7 模块", tags: ["活动企划", "预算分配", "风险预案"] },
    { type: "AI WORKFLOW 08", title: "广告投放周报", skillId: "ads-weekly-report", status: "已应用", description: "结论先行、漏斗定位、拆分归因，把投放数据变成老板看得懂、同事能执行的周报。", output: "周报撰写 2h → 15min", tags: ["投放复盘", "漏斗归因", "行动清单"] },
    { type: "PERSONAL SKILL 09", title: "提示词优化大师", skillId: "prompt-optimizer", status: "可运行", description: "按角色、背景、任务、约束、格式、示例六要素诊断并改写提示词，稳定提升 AI 输出质量。方法来自快手实习的 Prompt 工程实践。", output: "六要素诊断 + 可复制改写", tags: ["Prompt工程", "结构诊断", "效率工具"] }
  ],
  photoCollections: [
    { title: "城市与人", category: "STREET", layout: "feature", show: 6, images: [
      "images/street/1.jpg", "images/street/2.jpg", "images/street/3.jpg", "images/street/4.jpg", "images/street/5.jpg", "images/street/6.jpg", "images/street/7.jpg", "images/street/8.jpg", "images/street/9.jpg", "images/street/10.jpg",
      "images/street/11.jpg", "images/street/12.jpg", "images/street/13.jpg", "images/street/14.jpg"
    ] }
  ],
  cases: [
    {
      no: "01", category: "AI产品 · 快手电商", title: "可绎AI「商品换背景」，\n从模型评测到上线", result: "上线首月 UV +190%",
      color: "lime", image: "images/case-00/pipeline.svg",
      proof: "AI 产品 0→1 全周期——痛点调研、模型评测选型、方案设计、PRD 推动上线、数据复盘",
      summary: "快手电商实习期间，完整负责一站式 AIGC 创作平台可绎AI「商品换背景」功能的 0→1：调研商家素材痛点，设计三套差异化生图工作流，搭建 350 张分层评测集用数据完成 VL 模型选型，输出 PRD 与埋点方案并推动上线。上线首月商家使用 UV 环比 +190%，AI 素材采纳率 +65%，单品上新实拍周期从 3-7 天缩短至分钟级。",
      role: "AI产品实习生 / 独立负责此功能全周期", period: "2026.05-08",
      challenge: "旧 AI 工具只有白边裁切、模特生图等简单能力，缺少商家刚需的换背景功能——商家只能线下实拍（周期 3-7 天、成本高）或跳转第三方工具，素材与数据双双外流。且直接图生图会改变商品的颜色、纹理、形状，对电商不可接受：商品必须和实物一致。",
      actions: ["定义技术链路：商品原图 → Matting 抠图 → Keye-VL 商品理解 → 自动生成四段式背景 Prompt → Kling Inpaint 局部重绘。核心原则「先保护商品、再重绘背景」，商品区域锁死不动", "搭建 350 张分层评测集（P0 白底 / P1 常规家居 / P2 玻璃镜面金属高难 / P3 异常图），配套人工 5 分制打分规则与 F1/ROUGE 自动指标，从材质、光影、格式、场景四维量化对比 Keye-VL 与 Qwen3-VL：全样本 85.8% vs 74.7%，P2 高难场景 78.6% vs 58.2%，用数据选型 Keye-VL", "设计三套生图工作流覆盖不同能力层级的商家：智能推荐（上传即出图、零门槛）、固定模板（类目预制、批量上新）、自定义 Agent（RAG 润色口语描述 + 合规拦截 + 会话记忆多轮迭代）", "针对 AI 输出的不确定性设计三层兜底：Prompt 前置约束（高反光商品强制漫射光）→ VL 识别失败自动降级固定模板 → 生成失败自动重试并给出换模板选项，保证商家一定拿到图", "输出完整 PRD 与埋点方案（应埋尽埋，事件携带生成模式、失败原因等参数便于漏斗拆解），并推动算法团队解决服务不稳定问题：建立独立告警规则 + 上线后针对电商场景专项调优"],
      data: ["使用UV 环比 +190%", "素材采纳率 环比 +65%", "实拍上新 3-7天 → 分钟级", "350张分层评测集选型"],
      gallery: ["images/case-00/pipeline.svg", "images/case-00/eval.svg"]
    },
    {
      no: "02", category: "创意策略 · AIGC", title: "单店70道菜品图，\n一条AIGC流水线", result: "素材成本 -95%",
      color: "lime", image: "images/case-03-cover.jpg",
      proof: "把 AI 工具组成生产流水线，并量化产能与成本（日产 280 张、提效 9 倍、成本 -90%）",
      summary: "把菜品素材生产从「逐店拍摄」改造成「流水线交付」：标准化 Prompt 模板 + 批量生成 + 抽检校准，单店 50-70 道菜品图半天交付，店面设计图（店招/海报）同步产出，素材双平台复用，让产能不再是门店上线的瓶颈。",
      role: "AIGC素材生产 / 模板与SOP设计 / 质量校准", period: "4周",
      challenge: "服务商家多、单店菜品 50-70 道，传统摄影单道 80-120 元且需预约排期；多家门店并行上线，素材产能完全跟不上开店节奏。",
      actions: ["建立分品类的风格模板与 Prompt 结构（光线/摆盘/背景/构图），新店接入直接套模板启动", "批量生成 + 抽检校准替代逐张精修：单店 50-70 道菜半天交付，并同步产出店面设计图（店招/海报）", "素材统一命名归档，闪购商品主图与抖音店铺装修双平台复用，模板库沉淀为可持续调用的生产资产"],
      data: ["单店70道菜半天交付", "日产素材 280 张 / 提效 9×", "交付周期 1-2周 → 当天", "单店素材成本 -95%"],
      gallery: ["images/case-03/1.jpg"],
      coverCarousel: ["images/case-03/1.jpg", "images/case-03/collage-1.jpg", "images/case-03/collage-2.jpg", "images/case-03/collage-3.jpg"],
      archive: { title: "AIGC 店面装修素材库", images: ["images/case-03/decor-1.jpg", "images/case-03/decor-2.jpg", "images/case-03/decor-3.jpg", "images/case-03/decor-4.jpg", "images/case-03/decor-5.jpg", "images/case-03/decor-6.jpg", "images/case-03/decor-7.jpg", "images/case-03/decor-8.jpg", "images/case-03/decor-9.jpg", "images/case-03/decor-10.jpg"] }
    },
    {
      no: "03", category: "抖音来客 · 商家运营", title: "餐饮商家抖音冷启动，\n三个月跑通经营闭环", result: "累计支付GMV ¥11.2万",
      color: "lime", image: "images/case-01/gmv.svg",
      proof: "从 0 搭建经营闭环，用漏斗数据定位断点并解决（核销率 66%→71%）",
      summary: "收钱吧实习期间，负责某正餐门店抖音来客全链路运营：从店铺基建、团购品设计、营销活动，到纯佣达人投放与核销优化，完成从 0 到 1 的完整闭环。",
      role: "商家运营（实习）/ 单店独立负责", period: "3个月",
      challenge: "商家线上经营空白：店铺装修残缺、没有团购商品体系、缺乏稳定流量来源，到店客流持续下滑。",
      actions: ["基建与商品：店铺装修完成度 48%→95%，设计「引流款+主力款+形象款」4款三级团购矩阵，配置新客立减与周三秒杀活动", "达人投放：搭建 40+ 本地探店达人池，按粉丝量级/互动率/带货数据筛选，以纯佣 CPS 15% 签约 14 位（1-10万粉 9 位为主力），统一内容 SOP，产出 18 条内容累计播放 72 万", "转化闭环：搭建曝光→点击→下单→核销漏斗监测，针对核销率低拆解出「不会核销+到期遗忘」两个原因，制定到店核销 SOP 与到期短信提醒，核销率 66%→71%"],
      data: ["累计支付GMV ¥11.2万", "达人内容播放 72万", "核销率 66%→71%", "区域品类榜单 180+ → 前70"],
      gallery: ["images/case-01/sku.svg", "images/case-01/influencer.svg", "images/case-01/funnel.svg", "images/case-01/gmv.svg"]
    },
    {
      no: "04", category: "淘宝闪购 · 冷启动", title: "新平台门店冷启动，\n月订单从90做到560", result: "月订单 90→560",
      color: "orange", image: "images/case-02/orders.svg",
      proof: "新平台冷启动方法论——复用已验证数据快速起量（AIGC 素材打底 + 爆款复用 + 饭点投流）",
      summary: "负责商家淘宝闪购门店从 0 到 1：AIGC 菜品图打底，复用抖音已验证爆款完成选品上架，配置满减活动并在饭点精准投流，跑通新平台门店经营全流程。",
      role: "商家运营（实习）/ 门店经营全流程", period: "3个月",
      challenge: "淘宝闪购是新平台，商家不知道如何冷启动；缺少菜品视觉素材，没有商品结构与活动经验可以参考。",
      actions: ["素材基建：用 AIGC 流水线产出全店菜品主图（单店 50-70 道）替代传统棚拍，单店素材成本下降约 95%，替换后商品曝光-点击率提升 11%", "商品与活动：复用抖音验证过的爆款数据，完成 11 个 SKU 上架（单品+套餐+凑单小食），配置阶梯满减与新客立减", "投流与迭代：午晚高峰时段竞价投放 ROI 3.1；通过调整满减门槛、补充凑单品，把客单价从 31 元提升到 36.5 元"],
      data: ["月订单 90→560", "月度GMV 约¥2万", "客单价 +5.5元", "投放ROI 3.1"],
      gallery: ["images/case-02/skulist.svg", "images/case-02/aov.svg", "images/case-02/orders.svg"]
    },
    {
      no: "05", category: "模拟提案 · 卤味熟食0→1", title: "社区卤味店30天，\n从0到首单模型", result: "完整冷启动提案",
      color: "blue", image: "images/case-04/gantt.svg",
      proof: "方法论迁移——把实习经验抽象成可复用的通用冷启动框架",
      summary: "个人模拟提案：把实习期跑通的餐饮商家运营方法论，平移到一家 0→1 的社区卤味熟食店——外带为主、SKU 简单、高频复购，是验证方法论的低成本样本。制定抖音来客 + 淘宝闪购双平台 30 天冷启动提案，含预算分配与不同结果下的调整预案。",
      role: "独立完成", period: "模拟项目",
      challenge: "新店没有历史数据与用户资产；周边连锁卤味品牌成熟、挤压明显；预算有限，需要在 30 天内验证核心人群、主卖点和首单转化模型。",
      actions: ["D1-7 调研定位：摸底社区人群结构与周边卤味竞品（连锁品牌价格带、口味差评点），锁定「现卤现卖、晚餐加菜」差异化卖点与价格带", "D8-14 基建商品：店铺装修、4 SKU 三级团购矩阵（9.9 元引流单品 / 双人拼盘主力款 / 家庭套餐 / 全拼盘价格锚）、AIGC 菜品图、闪购 SKU 上架", "D15-21 达人放量：纯佣达人池启动团购首单；D22-30 闪购按「晚餐加菜 + 夜宵零食」双时段投流承接，数据复盘并输出放量预案"],
      data: ["30天执行日历", "4 SKU 团购矩阵", "三阶段预算分配与预案"],
      gallery: ["images/case-04/gantt.svg"]
    }
  ]
};
