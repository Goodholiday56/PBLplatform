// ═══════════════════════════════════════════════════════════
// 人机共跑 — 12课时教学资料（严格对齐 项目背景.md 教学设计）
// ═══════════════════════════════════════════════════════════
// v2: 学习内容 (lessonContent) 与 学习活动 (lessonActivities) 分离
//     - lessonContent: 纯知识/数据/框架 — "学什么"
//     - lessonActivities: 纯教学流程/任务 — "怎么学"
//     - gateActivity: 内容块被第几个活动解锁
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════
// PART 1: 学习内容库 — 纯知识/数据/框架
// ═══════════════════════════════════════════════

const lessonContent = {

  // ═══════════════════════════════════════════════
  // 模块一：城市与产业 — 为什么赛事落地亦庄？（3课时）
  // ═══════════════════════════════════════════════

  '1_0': {
    title: '城市探索 — 定位亦庄的空间优势',
    showMap: true,
    mapFocus: { name:'北京亦庄经开区', lat:39.795, lng:116.505, desc:'北京经济技术开发区，位于东南五环外，1994年获批国家级经开区' },
    blocks: {
      keyData: {
        type: 'dataCards', gateActivity: 0,
        title: '关键数据',
        data: [
          { val:'18', unit:'km', lbl:'距天安门直线距离' },
          { val:'60', unit:'min', lbl:'地铁亦庄线通勤' },
          { val:'225', unit:'km²', lbl:'亦庄新城规划面积' },
          { val:'35%', unit:'', lbl:'绿化覆盖率' },
        ]
      },
      compareTable: {
        type: 'table', gateActivity: 1,
        title:'亦庄 vs 其他北京区域 — 多维度空间对比',
        headers:['维度','亦庄经开区','东城（市中心）','海淀中关村','朝阳CBD'],
        rows:[
          ['距市中心','约18km','0km（核心）','约12km','约8km'],
          ['建筑密度','中低（25-30%）','高（>60%）','中高（40-50%）','高（>55%）'],
          ['主干道宽度','60-80m','20-30m','30-40m','30-50m'],
          ['绿化覆盖率','~35%','~15%','~25%','~20%'],
          ['人口密度','较低（经开区）','极高','高（高校+居民）','高（商务+商业）'],
          ['交通管制难度','低','极高','高','高'],
          ['大型活动空间','充足','稀缺','稀缺','稀缺'],
        ]
      },
      homework: {
        type: 'homework', gateActivity: 2,
        text: '1. 绘制亦庄赛事选址简易分析图（手绘或电子版均可），配100字文字说明，分析为什么亦庄而非市中心。\n2. 查阅《北京城市总体规划（2016年-2035年）》，摘录亦庄新城的3个核心定位信息。'
      }
    }
  },

  '1_1': {
    title: '产业寻链 — 解读亦庄的科技生态',
    blocks: {
      chainFramework: {
        type: 'chainFramework', gateActivity: 0,
        title:'机器人产业链四层结构',
        layers:[
          { level:'第一层', name:'核心零部件（上游）', items:'伺服电机、减速器、控制器、传感器、AI芯片、电池——决定机器人性能的"心脏"和"大脑"', color:'#1a56db' },
          { level:'第二层', name:'整机制造（中游）', items:'机械结构设计、运动系统集成、外观设计、组装测试——机器人的"身体"制造', color:'#6d28d9' },
          { level:'第三层', name:'系统集成（中下游）', items:'感知算法、决策规划、运动控制、操作系统——让机器人"看见→判断→行动"', color:'#ea5a0c' },
          { level:'第四层', name:'应用服务（下游）', items:'制造、物流、医疗、教育、家庭、赛事——机器人走进真实世界', color:'#0d9488' },
        ]
      },
      companies: {
        type: 'companies', gateActivity: 0,
        data: [
          { name:'荣耀', product:'"闪电"人形机器人', tech:'自研液冷散热系统+高动态运控算法', role:'整机制造+核心零部件', event:'2026冠亚季军包揽，50分26秒完赛' },
          { name:'宇树科技', product:'H1人形机器人', tech:'高爆发力关节电机+动态步态', role:'整机制造', event:'2026参赛，排位赛1.9km表现突出' },
          { name:'北京人形机器人创新中心', product:'天工Ultra', tech:'全自主导航+环境自适应', role:'系统集成+算法', event:'2025首届冠军，2026全自主完赛1h15min' },
          { name:'优必选科技', product:'Walker系列', tech:'伺服舵机+全身协调控制', role:'整机制造+系统集成', event:'多次亮相重大科技活动' },
          { name:'小米机器人', product:'CyberOne', tech:'自研Mi-Sense感知+全身控制', role:'整机制造', event:'技术展示，推动行业关注' },
        ]
      },
      homework: {
        type: 'homework', gateActivity: 1,
        text: '1. 结合具体企业案例，撰写100字亦庄赛事产业选址分析。\n2. 调研一家亦庄机器人企业的核心技术故事与研发历程。'
      }
    }
  },

  '1_2': {
    title: '政策解析 — 理解赛事的社会价值',
    blocks: {
      policyTimeline: {
        type: 'policyTimeline', gateActivity: 0,
        data: [
          { year:'2023.10', event:'工信部印发《人形机器人创新发展指导意见》', detail:'完成国家层面产业系统性部署，明确人形机器人为"集成人工智能、高端制造、新材料的核心载体"，提出到2025年实现批量生产、到2027年形成安全可靠产业生态。' },
          { year:'2024-2025', event:'地方政策密集出台', detail:'北京发布"具身智能十条"专项政策；深圳出台机器人产业发展规划；上海发布人形机器人行动方案。亦庄引聚300+具身智能生态企业。' },
          { year:'2026', event:'"具身智能"列入国家重点培育未来产业', detail:'亦庄半马以"以赛促研、以赛促产、以赛促用"创新模式，成为政策落地的标志性实践。完赛率从首届10%跃升至45%，直观体现政策驱动下的技术进步。' },
        ]
      },
      compareMedia: {
        type: 'table', gateActivity: 1,
        title:'科技发布会 vs 大众赛事 — 传播效果四维对比',
        headers:['维度','科技发布会','亦庄机器人半马赛事'],
        rows:[
          ['受众范围','行业媒体+投资人（数千人）','大众+参赛者+媒体+直播（数万现场+百万级传播）'],
          ['参与感','被动观看产品参数演示','主动参与、现场感受、情感共鸣、互动传播'],
          ['传播效果','专业圈层内传播，难以"出圈"','大众化传播，"破圈"效应，触达泛科技爱好者'],
          ['公众认知','"参数很好但离我很远"','"机器人真的在跑！技术进步看得见"'],
        ]
      },
      wordCloud: {
        type: 'wordCloud', gateActivity: 0,
        title: '政策关键词云',
        desc: '小组协作共建：研读政策文件后，在下方输入框中添加你发现的关键词。同一小组的所有成员共享词云进度，重复添加的关键词会自动增大显示。思考：这些高频词如何串联成赛事落地的政策支撑逻辑？',
        keywords: [],
        colors: ['#1a56db','#6d28d9','#0d9488','#ea5a0c','#2563eb','#7c3aed','#059669','#d97706'],
      },
      homework: {
        type: 'homework', gateActivity: 1,
        text: '1. 整合地理空间、产业集群、国家政策三个维度的全部探究成果，完成《为什么是亦庄》综合分析报告（500-800字）。\n2. 调研一个同类"科技+体育"跨界赛事案例，对比传播策略差异。'
      }
    }
  },

  // ═══════════════════════════════════════════════
  // 模块二：科技与工程 — 机器人如何自主奔跑？（3课时）
  // ═══════════════════════════════════════════════

  '2_0': {
    title: '智感启程 — 解密机器人的奔跑系统',
    blocks: {
      systemsDiagram: {
        type: 'systemsDiagram', gateActivity: 1,
        data: [
          { n:1, name:'环境感知系统', icon:'👁', desc:'激光雷达(LiDAR)、深度相机、IMU惯性测量单元、足底力/扭矩传感器', role:'机器人的"眼睛"和"皮肤"——实时感知路面坡度、障碍物距离、自身姿态角、足底接触力' },
          { n:2, name:'智能决策系统', icon:'🧠', desc:'SLAM定位与建图、路径规划算法、步态生成器、模型预测控制(MPC)', role:'机器人的"大脑"——根据感知信息实时决定"下一步踩在哪里、用多大力量、身体倾多少度"' },
          { n:3, name:'运动执行系统', icon:'💪', desc:'高扭矩密度伺服电机、谐波减速器/行星减速器、足底柔性缓冲结构', role:'机器人的"肌肉和骨骼"——将决策指令转化为精确的关节角度、角速度、力矩输出' },
          { n:4, name:'能源与散热系统', icon:'🔋', desc:'高能量密度锂电池包(>200Wh/kg)、液冷循环管路、智能热管理算法', role:'机器人的"心脏和汗腺"——持续供应能量并精确控制温度，是完赛最关键的制约因素' },
        ]
      },
      bionicTable: {
        type: 'table', gateActivity: 2,
        title:'人机运动机制对照表',
        headers:['功能维度','人体机制','机器人机制','仿生设计评价'],
        rows:[
          ['视觉感知','眼睛→视网膜→视神经→大脑视觉皮层','深度相机+LiDAR→点云→SLAM算法','超越：可"看"红外+精确深度，但动态范围不如人眼'],
          ['平衡控制','内耳前庭+小脑→全身肌肉微调','IMU→ZMP/MPC控制器→关节力矩实时调整','类比：ZMP理论直接类比人体重心投影控制'],
          ['能量供给','ATP→有氧呼吸/无氧酵解（效率~25%）','锂电池→电机驱动（效率~80%）','超越：电机效率远高于人体，但电池能量密度远低于脂肪'],
          ['散热机制','汗液蒸发+皮肤血管扩张（高效）','液冷循环+散热片+风扇','远不如：人体蒸发散热效率极高，机器人液冷系统笨重'],
          ['步态生成','中枢模式发生器(CPG)→脊髓→肌肉','步态规划算法→关节运动轨迹→电机伺服','类比：CPG数学模型已直接用于机器人步态生成'],
        ]
      },
      homework: {
        type: 'homework', gateActivity: 2,
        text: '1. 修正课堂《问题记录表》，针对每个问题提出至少一条优化思路。\n2. 阅读"中国科普博览"机器人专题资料，记录3个感兴趣的技术点。'
      }
    }
  },

  '2_1': {
    title: '竞速评测 — 评选最佳半马机器人',
    blocks: {
      evalFramework: {
        type: 'evalFramework', gateActivity: 0,
        data: [
          { n:1, name:'信息决策', weight:'20%', items:'感知精度、决策速度(<50ms)、路径规划效率', best:'荣耀"闪电"：多传感器融合+高动态算法' },
          { n:2, name:'运动执行', weight:'25%', items:'步态稳定性、关节力矩输出、落足精度(≤2cm)', best:'荣耀"闪电"：自研液冷+高扭矩密度电机' },
          { n:3, name:'系统稳定', weight:'20%', items:'抗干扰恢复能力、故障容错、算法鲁棒性', best:'天工Ultra：全自主完赛，环境适应性强' },
          { n:4, name:'持续运行', weight:'20%', items:'电池续航(≥21km)、能源管理、热管理', best:'荣耀"闪电"：液冷散热系统，全程不掉速' },
          { n:5, name:'模块协同', weight:'15%', items:'端到端延迟、多传感器融合、软硬耦合效率', best:'天工Ultra：全栈自研，"国家队"级别协同' },
        ]
      },
      robotCompare: {
        type: 'table', gateActivity: 1,
        title:'参赛机器人多维对比（2026赛事数据）',
        headers:['对比维度','荣耀"闪电"','天工Ultra','宇树H1'],
        rows:[
          ['完赛时间','🥇 50分26秒','1小时15分','未完赛（终点前摔倒）'],
          ['操作方式','自主导航','全自主导航','遥控操作'],
          ['信息决策','★★★★★ 多传感器融合','★★★★☆ 稳健保守策略','★★★☆☆ 依赖遥控'],
          ['运动执行','★★★★★ 高动态+液冷','★★★★☆ 稳健但速度偏慢','★★★★☆ 爆发力强但不稳'],
          ['系统稳定','★★★★☆ 偶尔微调姿态','★★★★★ 全赛程零失误','★★☆☆☆ 终点前摔倒'],
          ['持续运行','★★★★★ 液冷保证不掉速','★★★★☆ 保守策略续航有余','★★★☆☆ 未完成全程'],
          ['核心优势','散热+运控行业领先','国家平台，可靠性第一','爆发力最强，排位最快'],
          ['主要短板','轻量化与刚度平衡','速度保守，竞速潜力未发挥','长距离稳定性严重不足'],
        ]
      },
      homework: {
        type: 'homework', gateActivity: 1,
        text: '1. 参考各组评价成果，筛选最优参赛机器人方案，撰写300字评选理由。\n2. 使用五维评分卡为你心目中的"最佳半马机器人"打分（满分25分）。'
      }
    }
  },

  '2_2': {
    title: '未来竞创 — 打造半马冠军机器人',
    blocks: {
      designParams: {
        type: 'table', gateActivity: 1,
        title:'五大系统设计参数与约束条件',
        headers:['设计维度','关键参数','硬性约束','优化方向（任选1-2个）'],
        rows:[
          ['感知系统','传感器类型/数量/采样频率/精度','总功耗≤150W，总重量≤5kg','A.多传感器融合降本 B.算法补偿替代昂贵硬件 C.增加冗余提高可靠性'],
          ['决策系统','推理速度/控制频率/端到端延迟','延迟<50ms，算力功耗<30W','A.模型量化加速 B.边缘AI芯片 C.云端协同推理'],
          ['运动执行','关节力矩/转速/步频/步幅/落足精度','单关节重量<2kg,扭矩密度>50Nm/kg','A.高扭矩密度电机 B.轻量化减速器 C.柔性驱动'],
          ['能源系统','电池容量/能量密度/电压平台','总重<8kg，标称续航≥25km','A.高能量密度电芯(>250Wh/kg) B.制动能量回收 C.中途无线充电'],
          ['散热系统','散热功率/冷却方式/工作温度范围','温升<30℃（环境25℃时，电机<85℃）','A.泵驱液冷 B.相变材料储热 C.智能热管理算法'],
        ]
      },
      trackFeatures: {
        type: 'trackFeatures', gateActivity: 1,
        data: [
          { name:'平地赛段', ratio:'~65%', desc:'沥青路面，允许最高速度巡航', challenge:'长距离持续输出，考验续航和散热' },
          { name:'坡道赛段', ratio:'~15%', desc:'最大坡度8%，上坡+下坡组合', challenge:'上坡需额外50%功率，下坡需精确制动防摔倒' },
          { name:'弯道赛段', ratio:'~15%', desc:'12左转+10右转，含近90度锐角弯', challenge:'离心力补偿，需提前降速+身体内倾+步宽调整' },
          { name:'特殊路面', ratio:'~5%', desc:'石板路、窄路、不平整接缝', challenge:'高频振动→姿态估计漂移，考验IMU滤波算法鲁棒性' },
        ]
      },
      homework: {
        type: 'homework', gateActivity: 2,
        text: '1. 结合互评反馈，迭代完善机器人设计方案（设计图+设计说明）。\n2. 撰写200字设计反思：你在"稳定性-续航-竞速"三角中做了怎样的取舍？为什么？'
      }
    }
  },

  // ═══════════════════════════════════════════════
  // 模块三：数据与原理 — 如何优化机器人完赛能力？（3课时）
  // ═══════════════════════════════════════════════

  '3_0': {
    title: '数据起跑 — 建立赛事分析框架',
    blocks: {
      analysisFramework: {
        type: 'frameworkGrid', gateActivity: 0,
        data: [
          { n:1, name:'运动指标', icon:'🏃', desc:'速度(km/h)、配速(min/km)、步频(步/min)、步幅(m/步)、分段计时(s)', question:'描述机器人的外在表现 —— "跑得怎么样？"' },
          { n:2, name:'力学因素', icon:'⚡', desc:'重心高度与偏移、足底摩擦力(f=μN)、关节力矩(Nm)、地面反作用力(N)', question:'解释运动表现的物理原因 —— "为什么会这样跑？"' },
          { n:3, name:'环境因素', icon:'🌡', desc:'赛道坡度(%)、路面材质、当日温度(℃)、风速(m/s)、湿度(%)', question:'判断外部条件的影响 —— "环境帮了忙还是添了乱？"' },
          { n:4, name:'工程因素', icon:'🔧', desc:'电池SOC曲线、电机温度曲线、控制算法参数、通信延迟(ms)', question:'理解机器人内部发生了什么 —— "机器自己「感觉」怎么样？"' },
        ]
      },
      raceDataTable: {
        type: 'table', gateActivity: 1,
        title:'2026年赛事核心数据对比',
        headers:['指标','冠军"闪电"','天工Ultra','人类世界纪录','首届冠军(2025)'],
        rows:[
          ['完赛时间','50分26秒','1小时15分','57分20秒','2小时40分42秒'],
          ['平均速度','~25.1 km/h','~16.9 km/h','~22.1 km/h','~7.9 km/h'],
          ['平均配速','~2分23秒/km','~3分33秒/km','~2分43秒/km','~7分38秒/km'],
          ['完赛率','冠军（领先集团）','约45%完赛','约98%','~10%'],
          ['自主导航占比','自主','全自主','—（人类）','~5%'],
          ['与去年冠军比','快了110分钟','快了85分钟','—','—'],
        ]
      },
      homework: {
        type: 'homework', gateActivity: 1,
        text: '1. 补充收集机器人摔倒、减速、续航不足等赛事细节数据（至少5条），标注信息来源。\n2. 使用给定公式为3款不同机器人计算平均速度和配速。'
      }
    }
  },

  '3_1': {
    title: '原理分析 — 解释机器人表现差异',
    blocks: {
      faultCases: {
        type: 'faultCases', gateActivity: 0,
        data: [
          { phenomenon:'弯道摔倒（宇树H1终点弯道）', physics:'转弯所需向心力 F=mv²/r > 最大静摩擦力 f_max=μmg', cause:'①步态规划未预先降速 ②足底材料与沥青路面μ不足 ③弯道半径r过小（锐角弯）', fix:'①弯道前30m主动降速20% ②增大步宽+身体内倾 ③改进足底橡胶配方提高μ' },
          { phenomenon:'上坡失速（多台机器人8%坡段）', physics:'上坡需克服重力分量 mg·sin(θ)，8%坡度→sin≈0.08，功率需求增加约50%', cause:'①电机峰值扭矩余量不足 ②电池SOC下降→可用功率降低 ③未提前切换"爬坡步态"', fix:'①坡前100m预提速利用惯性 ②爬坡时增大步频减小步幅 ③预留电池功率余量' },
          { phenomenon:'步态发散（石板路不规则振动）', physics:'高频路面冲击→振动累积→IMU加速度计积分漂移→姿态估计发散', cause:'①IMU低通滤波截止频率过高 ②缺乏视觉-惯性紧耦合 ③足底无柔性吸振结构', fix:'①降低滤波截止频率 ②引入视觉里程计辅助校正 ③足底增加弹性体缓冲层' },
          { phenomenon:'热保护停车（长距离持续奔跑）', physics:'电机铜损(I²R)+驱动器开关损耗>散热功率→绕组温度>150℃保护阈值', cause:'①液冷系统散热功率设计裕量不足 ②当日环境温度高于设计假设 ③未分阶段降功率', fix:'①增大散热器面积/提高泵流量 ②智能热管理：温度预警时主动降功率 ③相变材料辅助吸热' },
        ]
      },
      weatherData: {
        type: 'dataCards', gateActivity: 1,
        title: '赛事当日环境数据',
        data: [
          { val:'15-22', unit:'°C', lbl:'赛事当日气温' },
          { val:'3-5', unit:'级', lbl:'风速等级(3.4-10.7m/s)' },
          { val:'40-60', unit:'%', lbl:'相对湿度' },
          { val:'8%', unit:'max', lbl:'赛道最大坡度' },
        ]
      },
      homework: {
        type: 'homework', gateActivity: 1,
        text: '1. 完善案例归因分析，每个案例补充至少一个权威资料佐证观点，规范信息来源标注。\n2. 完成《环境研判表》：假设赛事当日气温35℃（极端高温），评估对5种机器人系统的差异化影响。'
      }
    }
  },

  '3_2': {
    title: '综合整理 — 形成完赛优化报告',
    blocks: {
      tradeoffMatrix: {
        type: 'tradeoffMatrix', gateActivity: 0,
        title:'核心制衡关系与策略选择',
        relations:[
          { pair:'速度 ↔ 能耗', nature:'正相关（近似二次方）', explain:'空气阻力∝v²，速度翻倍→能耗约4倍。保守策略：配速控制在10km/h以下；竞速策略：25km/h全力输出。' },
          { pair:'速度 ↔ 散热', nature:'正相关（指数级影响）', explain:'电机发热∝I²R，高速=高电流=高发热。液冷散热能力有上限，超出则触发温度保护降功率→"热降频"反而更慢。' },
          { pair:'稳定性 ↔ 速度', nature:'部分负相关', explain:'高速→步态更动态→ZMP裕度减小→抗倾倒能力降低。尤其是弯道，不降速则离心力>摩擦力→必摔。' },
          { pair:'轻量化 ↔ 刚度', nature:'负相关', explain:'轻=材料少/薄→结构刚度降低→定位精度下降。重=结实但能耗高。需在关键受力部件用高强度轻合金(钛/镁)，非受力件大胆减重。' },
        ]
      },
      strategies: {
        type: 'strategies', gateActivity: 0,
        data: [
          { name:'A. 保守完赛策略', goal:'98%完赛概率，排名其次', speed:'~10 km/h', thermal:'主动限功率，预留30%散热余量', corner:'每个弯道前30m降速30%', battery:'预留15%安全余量', risk:'低风险，适合研发验证阶段' },
          { name:'B. 竞速冲刺策略', goal:'冲击领奖台，接受DNF可能', speed:'~25 km/h', thermal:'最大化性能输出，承受温升风险，依赖液冷硬抗', corner:'算法优化过弯轨迹，尽可能保持速度', battery:'深度放电到5%，榨取每一Wh能量', risk:'高风险，约60%概率DNF，但若完赛则领先' },
        ]
      },
      homework: {
        type: 'homework', gateActivity: 1,
        text: '1. 根据反馈迭代优化《机器人参赛综合评估报告》。\n2. 完成个人学习反思（300字）：你在这个模块中学到的最重要的东西是什么？'
      }
    }
  },

  // ═══════════════════════════════════════════════
  // 模块四：传播与表达 — 如何讲好科技赛事故事？（3课时）
  // ═══════════════════════════════════════════════

  '4_0': {
    title: '传播初探 — 拆解科技故事的表达方式',
    blocks: {
      newsStructure: {
        type: 'newsStructure', gateActivity: 1,
        data: [
          { part:'标题', desc:'一句话概括核心信息，抓人眼球。好标题=具体细节+情感色彩。例："50分26秒！机器人跑赢人类世界纪录"比"人形机器人完成半马"更有冲击力。' },
          { part:'导语', desc:'第一段交代5W1H最核心要素，设定全文基调。控制在3句话内。给读者一个继续读下去的理由。' },
          { part:'主体', desc:'展开关键信息，按"最重要→次重要→补充"的倒金字塔排列。每段讲清楚一个点。加入数据、引语、细节增加可信度。' },
          { part:'背景', desc:'补充赛事背景、产业脉络、技术演进等"上下文"。帮助读者理解"为什么这个新闻值得关注"。' },
          { part:'结语', desc:'总结+展望。可以是一个令人印象深刻的细节、一句专家引语、一个引发思考的问题。' },
        ]
      },
      mediaCompare: {
        type: 'table', gateActivity: 2,
        title:'三方媒体报道四维对比',
        headers:['维度','官方媒体（人民日报/新华社）','自媒体（科技博主/抖音）','英文外媒（BBC/TechCrunch）'],
        rows:[
          ['报道角度','国家科技成就、产业进步、新质生产力','趣味性、机器人失误集锦、"黑科技"解读','中国科技崛起、中美AI竞争、行业趋势'],
          ['信息准确性','★★★★★ 权威来源+审核流程','★★★☆☆ 部分博眼球，数据可能夸大','★★★★☆ 专业但偶有文化理解偏差'],
          ['语言可读性','正式、术语多、篇幅长（800-2000字）','活泼通俗、互动性强、短小精悍','简洁英文，但地名/企业名翻译不一致'],
          ['受众适配','关心国家发展的公众、政策制定者','科技爱好者、普通网民、年轻人','国际科技/商业读者、投资人'],
        ]
      },
      homework: {
        type: 'homework', gateActivity: 3,
        text: '1. 参考创作支架，拟定个人作品大纲（200字以内），明确创作方向与核心传播主旨。\n2. 阅读至少2篇优秀科普文章，学习通俗化科技表达的技巧。'
      }
    }
  },

  '4_1': {
    title: '创意工坊 — 完成科技传播作品初稿',
    blocks: {
      creationTasks: {
        type: 'creationTasks', gateActivity: 0,
        data: [
          { level:'★★☆ 基础组', name:'科普海报设计', spec:'A3竖版，主标题+副标题+3-5个数据点+1个核心图示+信息来源', criteria:'视觉冲击力>信息层次>通俗易懂' },
          { level:'★★★ 提升组', name:'中文新闻+英文简介', spec:'中文800-1000字（五段式）+英文150-200词（简单句+常用词）', criteria:'结构完整>科技准确>可读性>英文流畅' },
          { level:'★★★★ 挑战组', name:'短视频脚本+AI配图', spec:'脚本60-90秒（15-20个分镜）+每镜配图提示词+背景音乐建议', criteria:'节奏把控>视觉创意>叙事张力>科技准确' },
        ]
      },
      simplifyMethods: {
        type: 'simplifyMethods', gateActivity: 0,
        data: [
          { method:'类比法', example:'"具身智能就是AI拥有了身体，像人一样能看、能想、能动。就像你走路不需要想先抬左脚还是右脚，机器人也在练这种肌肉记忆。"', tip:'找到目标受众熟悉的事物做类比。好的类比=相似度高+日常化+有画面感。' },
          { method:'场景法', example:'"21公里是什么概念？从天安门跑到通州。机器人要在有坡、有弯、有风的真实道路上跑完全程，不摔不坏不断电。"', tip:'把抽象数字变成读者能"看到"的场景。用距离、时间、体感让数据具体化。' },
          { method:'分层法', example:'第一层（一句话）：机器人靠"眼睛看+大脑算+肌肉动"来跑步。第二层（一段话）：解释三大系统如何协同。第三层（详细）：技术原理+数据支撑。', tip:'从"一句话说清楚"到"一段话说完整"到"一篇文章说透彻"，适应不同读者需求。' },
        ]
      },
      homework: {
        type: 'homework', gateActivity: 2,
        text: '1. 完成科技传播作品初稿（海报/新闻+英文/脚本 三选一）。\n2. 浏览至少2位同学的作品初稿，构思具体的修改建议。\n3. 学习AI内容核查方法：如何验证AI给你的信息是否准确？'
      }
    }
  },

  '4_2': {
    title: '发布迭代 — 展示并优化科技传播作品',
    blocks: {
      rubric: {
        type: 'table', gateActivity: 0,
        title:'作品评价量规（四维评分 — 模块四专用）',
        headers:['维度','优秀（4分）','良好（3分）','合格（2分）','待改进（1分）'],
        rows:[
          ['准确性','科技事实全部正确，数据来源清晰标注，术语使用恰当','无明显事实错误，偶有来源标注遗漏','有1-2处小错误，部分数据未标注来源','多处事实性错误，大量模糊表述'],
          ['清晰度','逻辑流畅层次分明，"外行人一看就懂"','逻辑基本清晰，偶有跳跃但不影响理解','大致可读，但段落组织较散','读不懂、逻辑混乱、术语堆砌'],
          ['创造性','表达形式新颖，有令人惊喜的独特视角或创意手法','有一定创意和巧思，不拘泥于模板','表达中规中矩，基本按模板填充','完全套路化、无任何独特创意'],
          ['规范性','格式/引用/语言完全规范，排版专业美观','基本规范达标，偶有格式小问题','有少量格式或引用不规范之处','多处不规范，严重影响阅读体验'],
        ]
      },
      humanVsAI: {
        type: 'table', gateActivity: 1,
        title:'人机创作对比分析框架',
        headers:['对比维度','人类创作的优势','AI创作的优势','最佳实践'],
        rows:[
          ['创意独特性','真实生活体验→独特感受→个性化表达（"只有你想得到"）','训练数据模式组合→"平均水平的创意"（"大家都想得到"）','人定方向+创意核心，AI提供灵感和变体'],
          ['情感深度','真情实感+亲身经历→共鸣力强、有温度的文字','语言流畅但情感空洞→读起来像"模板生成"','人写感情、AI润色表达'],
          ['事实准确性','可能出错但能从实践/资料中验证和修正','可能"一本正经胡说八道"（幻觉问题）→必须人工核查','AI提供初稿/资料，人逐一核实'],
          ['表达效率','需要时间思考、草稿、修改、打磨→慢工出细活','秒级出稿，尤其适合头脑风暴→快速提供多版本参考','AI打草稿，人做编辑'],
        ]
      },
      homework: {
        type: 'homework', gateActivity: 3,
        text: '最终提交全套成果：①优化后的传播作品终稿 ②英文简介（如适用）③个人创作日志 ④人机创作对比分析。这四项也是本课程终结性评价的重要依据。'
      }
    }
  },
};


// ═══════════════════════════════════════════════
// PART 2: 学习活动库 — 纯教学流程/任务
// ═══════════════════════════════════════════════

const lessonActivities = {

  // ═══════════════════════════════════════════════
  // 模块一：城市与产业（3课时）
  // ═══════════════════════════════════════════════

  '1_0': [
    {
      time:'15分钟', title:'活动一：空间定位探究', type:'map-locate',
      desc:'在交互地图中定位亦庄，测算与天安门的距离与通勤时长，对比亦庄与市中心、海淀、朝阳的空间差异。观察卫星影像特征（建筑密度、道路宽度、绿化空间），小组讨论赛事选址亦庄而非市中心的三个核心原因。',
      task:'完成《亦庄空间定位分析表》',
      resources: ['平台教学资源/子问题一/课时一/活动一_定位亦庄/亦庄卫星影像图.md', '平台教学资源/子问题一/课时一/活动一_定位亦庄/北京市行政区划图.jpg', '平台教学资源/子问题一/课时一/活动一_定位亦庄/地铁线路图.jpg']
    },
    {
      time:'20分钟', title:'活动二：赛道解码分析', type:'route-decode',
      desc:'观察官方赛事路线图，标注起点（南海子公园）、途经节点（科创街区）与终点。分析"生态公园→科创园区"的路线布局逻辑，解读从自然生态到科创产业的城市空间叙事。小组为赛道创意命名并撰写寓意解读。',
      task:'完成《赛事路线空间叙事图》',
      resources: ['平台教学资源/子问题一/课时一/活动二_赛道解码/南海子公园.jpg', '平台教学资源/子问题一/课时一/活动二_赛道解码/路线图.png']
    },
    {
      time:'10分钟', title:'活动三：课堂展示与互评', type:'present',
      desc:'小组代表展示空间定位分析成果和赛道命名创意，全班互评。教师从地图标注准确性、分析逻辑性、叙事创意性三个维度综合评价。',
      task:'课后任务：绘制亦庄赛事选址简易分析图并配文字说明；摘录《北京城市总体规划》中亦庄新城3个核心定位信息。',
      resources: []
    },
  ],

  '1_1': [
    {
      time:'18分钟', title:'活动一：机器人产业地图绘制', type:'research-map',
      desc:'分组调研小米机器人、优必选、宇树科技、荣耀等亦庄代表性企业。从主营业务、核心技术优势、产业链归属三个维度梳理企业信息。按"核心零部件→整机制造→系统集成→应用服务"四层分类，绘制《亦庄机器人产业生态图》，标注产业链上下游关联关系。',
      task:'绘制《亦庄机器人产业生态图》（含四层产业链+上下游关联标注）',
      resources: ['平台教学资源/子问题一/课时二/活动一_机器人地图/企业信息.md']
    },
    {
      time:'17分钟', title:'活动二：产业选址论证', type:'argument',
      desc:'思想实验：假设赛事选址在普通城区（无产业集聚）vs 实际选址亦庄，从技术测试、设备保障、人才支撑、产业氛围四个维度对比分析。理解产业集群对赛事的全方位支撑作用。对比科技发布会与大众马拉松的传播差异，理解赛事的城市产业宣传价值。',
      task:'完成四维度产业选址分析，理解"产业集群=赛事底座"的核心逻辑。课后撰写100字产业选址分析；调研一家亦庄机器人企业的核心技术故事。',
      resources: ['平台教学资源/子问题一/课时二/活动二_产业与赛事/产业支撑四维度分析表.xlsx', '平台教学资源/子问题一/课时二/活动二_产业与赛事/工作人员维修.jpg']
    },
  ],

  '1_2': [
    {
      time:'15分钟', title:'活动一：政策探秘解读', type:'policy-study',
      desc:'小组研读《人形机器人创新发展指导意见》等国家政策文件摘要，提炼"新质生产力""创新驱动""科技强国"等核心关键词，构建政策关键词云。小组探究国家为什么要扶持机器人赛事——赛事落地和实验室建设有什么不同？为什么说"赛事是最真实的检验"？',
      task:'构建政策关键词云，总结"以赛促研、以赛促产、以赛促用"的政策支撑逻辑。',
      resources: ['平台教学资源/子问题一/课时三/新一代人工智能发展规划政策摘要卡.pdf']
    },
    {
      time:'20分钟', title:'活动二：科技传播对比与科普创作', type:'compare-create',
      desc:'对比观看科技部新闻发布会视频与亦庄赛事现场集锦视频，从受众范围、参与感、传播效果、公众认知四个维度完成对比分析表。角色扮演"赛事规划师"，面对公众撰写150字通俗科普解说词，用最简洁的语言讲清楚"为什么这个赛事值得关注"。',
      task:'完成四维度传播对比表；以赛事规划师身份撰写150字科普解说词并展示。课后整合地理、产业、政策三维度，完成《为什么是亦庄》综合分析报告。',
      resources: ['平台教学资源/子问题一/课时三/机器人马拉松社会价值分析表.xlsx']
    },
  ],

  // ═══════════════════════════════════════════════
  // 模块二：科技与工程（3课时）
  // ═══════════════════════════════════════════════

  '2_0': [
    {
      time:'10分钟', title:'活动一：赛事现象观察与问题记录', type:'observe',
      desc:'观看机器人赛事失误片段集锦（摔倒、减速、姿态失衡），小组记录至少5个具体问题现象。从信息技术（感知与决策出了问题？）和物理（平衡被打破？受力不均？能耗不足？）两个维度初步分析每个问题的成因，完成《问题记录表》。',
      task:'完成《问题记录表》，至少记录5个问题现象并尝试从信息/物理双维度分析成因。',
      resources: ['平台教学资源/子问题二/课时一/活动一_比赛现象观察/学科维度思考框架.xlsx', '平台教学资源/子问题二/课时一/活动一_比赛现象观察/比赛视频.md', '平台教学资源/子问题二/课时一/活动一_比赛现象观察/问题记录表.xlsx']
    },
    {
      time:'25分钟', title:'活动二：系统结构拆解', type:'system-deconstruct',
      desc:'教师讲解机器人"环境感知→数据处理→智能决策→运动执行"的完整运行流程。深入解析：①重心平衡（ZMP理论+姿态控制）②能量转化（电池放电→电机扭矩→地面反作用力）③散热控制（液冷循环→维持最佳工作温度）。对比真实机器人设计方案，梳理各系统对稳定奔跑的影响权重。',
      task:'完成机器人系统结构拆解图，标注四大核心系统的输入/输出关系。',
      resources: ['平台教学资源/子问题二/课时一/活动二_奔跑系统解析/机器人结构图.png']
    },
    {
      time:'10分钟', title:'活动三：人机仿生对比', type:'compare',
      desc:'对照人体跑步：眼睛看路→大脑判断→肌肉执行→心跳供能→出汗散热。完成人机运动机制对照表，分析机器人仿生设计思路（哪些学人、哪些超越人、哪些远不如人）。核心洞察：机器人不是"像人一样跑"，而是"用人理解的物理原理，以机器的方式跑"。',
      task:'完成人机仿生对照表（视觉/平衡/供能/散热/步态五个维度）。课后修正问题记录表，提出优化思路。',
      resources: ['平台教学资源/子问题二/课时一/活动三_人机运动对比/人体-机器人对照表.xlsx']
    },
  ],

  '2_1': [
    {
      time:'20分钟', title:'活动一：评价标准搭建', type:'framework-build',
      desc:'分享课后优化思路，教师引导认知"局部最优≠整体最优"的工程权衡思维——例如速度↑→能耗↑→散热压力↑→可能热降频→实际速度反而↓。师生共同搭建五维评价框架：信息决策、运动执行、系统稳定、持续运行、模块协同。每个维度分配1-5分权重。',
      task:'完成五维评价框架搭建，为每个维度撰写具体评分标准（1-5分描述）。',
      resources: ['平台教学资源/子问题二/课时二/评价框架.xlsx']
    },
    {
      time:'25分钟', title:'活动二：机器人方案多维评测', type:'evaluate',
      desc:'分组观看荣耀"闪电"、天工Ultra、宇树H1等不同参赛机器人的比赛视频片段，依托自建五维框架多维度分析各机型的优势与短板，完成《机器人评价记录表》。全班交流对比结论，重点讨论：为什么最快的机器人（闪电，50分26秒）和最稳的机器人（天工Ultra，1h15min）在不同维度上得分差异如此之大？',
      task:'使用五维评分卡完成至少3款参赛机器人的多维度对比评测，筛选最优方案并说明理由。',
      resources: []
    },
  ],

  '2_2': [
    {
      time:'5分钟', title:'活动一：知识回顾与任务导入', type:'review',
      desc:'快速回顾机器人五大核心运行系统与五维评价标准。梳理"速度↑→散热↑""稳定性↑→速度可能↓""轻量化↑→刚度可能↓"等核心工程制衡关系。明确本课任务：在给定约束条件下，设计一台适配亦庄半马的参赛机器人方案。',
      task:'回顾知识框架，建立"多系统协同+多维约束"的设计思维。',
      resources: ['平台教学资源/子问题二/课时三/活动一/未来半马机器人任务说明卡.png']
    },
    {
      time:'25分钟', title:'活动二：机器人创新设计', type:'design',
      desc:'小组围绕感知、决策、运动控制、能源、散热五大核心系统，结合赛道实际环境特征（平地、8%坡道、锐角弯、石板路面、3-5级侧风），设计一台适配半程马拉松的完整机器人方案。要求：绘制设计图（含系统标注）、撰写设计说明（含关键参数与多维权衡论证）、说明设计在"稳定性-续航-竞速"三角中的定位。',
      task:'绘制机器人设计图+撰写设计说明（含系统参数与多维权衡论证）。',
      resources: []
    },
    {
      time:'15分钟', title:'活动三：成果展示与互评', type:'present',
      desc:'各小组以"机器人设计发布会"形式展示方案（3分钟），阐述设计思路、核心创新点与多维权衡哲学。全班依托五维评价框架开展结构化互评（每组收到至少2份反馈）。教师汇总互评意见，给出优化建议。',
      task:'完成3分钟方案展示；汇总互评反馈；课后结合反馈迭代完善设计。',
      resources: ['平台教学资源/子问题二/课时三/活动二/小组互评记录表.xlsx']
    },
  ],

  // ═══════════════════════════════════════════════
  // 模块三：数据与原理（3课时）
  // ═══════════════════════════════════════════════

  '3_0': [
    {
      time:'13分钟', title:'活动一：问题框架搭建', type:'framework-build',
      desc:'观看赛事数据回顾素材，聚焦各机型完赛表现差异（最快50分26秒 vs 未完赛 vs DNF）。引导学生将影响机器人表现的因素系统归类为四维：①运动指标（速度/配速/步态/分段）②力学因素（重心/摩擦/坡度）③环境因素（温度/风速/路面）④工程因素（能源/散热/控制）。形成结构化问题清单。',
      task:'完成结构化问题清单，将影响因素归类到四个维度。',
      resources: ['平台教学资源/子问题三/课时一/活动一_真实情境导入/赛事照片.md']
    },
    {
      time:'25分钟', title:'活动二：数据计算与可视化', type:'data-calc',
      desc:'依托2026赛事真实数据，完成以下核心指标计算：①平均速度=21.0975km÷完赛时间 ②配速=完赛时间÷21.0975 ③分段速度变化率。小组使用给定数据制作机器人赛事表现对比图表（柱状图/折线图均可），结合数据提炼差异化结论。',
      task:'完成数据卡片填写：平均速度、配速、分段差异。制作机器人赛事表现对比图表。课后补充收集机器人摔倒/减速/续航细节数据。',
      resources: []
    },
  ],

  '3_1': [
    {
      time:'17分钟', title:'活动一：力学归因分析', type:'physics-analysis',
      desc:'回顾上一课时数据差异发现，选取4个典型故障案例：①弯道摔倒（宇树H1）②上坡失速③步态发散（石板路面）④热保护停车。结合重心高度、摩擦力(f=μN)、坡度角(θ)、侧向风力(F=0.5ρv²CA)等物理概念，对每个案例完成"现象→力学原理→工程原因→改进方案"的完整归因链。绘制受力示意图，填写原因说明卡。',
      task:'完成至少2个故障案例的完整力学归因分析（含受力示意图+因果说明卡）。',
      resources: []
    },
    {
      time:'20分钟', title:'活动二：环境研判与赛事决策', type:'env-assessment',
      desc:'结合赛事当日环境数据（温度15-22℃、风速3-5级、湿度40-60%、路面温度25-35℃），研判不同环境条件对各类机器人的差异化影响：高温→电机降功率；强侧风→倾覆力矩增大；路面高温→轮胎/足底摩擦系数变化。以"赛事组织者"身份，讨论：什么天气条件下该考虑延期？路线怎样优化以降低风险？补给站/降温区如何设置？',
      task:'完成环境研判报告：对至少2种不利天气/环境条件给出赛事决策建议，附数据支撑。',
      resources: ['平台教学资源/子问题三/课时二/活动二_环境条件判断/赛事组织者决策单.xlsx']
    },
  ],

  '3_2': [
    {
      time:'17分钟', title:'活动一：工程策略设计', type:'strategy-design',
      desc:'深入理解四大核心制衡关系：速度↔能耗（正相关）、速度↔散热（正相关，指数级）、稳定性↔速度（部分负相关）、轻量化↔刚度（负相关）。聚焦"你要什么"vs"你愿意牺牲什么"的工程取舍哲学。结合赛道具体环境数据，分组设计两套差异化参赛策略：A.保守完赛优先（目标完赛率98%）B.竞速冲刺优先（目标排名，接受60%完赛率）。绘制策略对比矩阵。',
      task:'设计至少2套差异化参赛策略方案，绘制策略对比矩阵。',
      resources: ['平台教学资源/子问题三/课时三/活动一/任务单.png']
    },
    {
      time:'28分钟', title:'活动二：综合报告撰写与成果展示', type:'report-write',
      desc:'学生自主设置赛事评价指标及权重（至少5个指标），搭建专属评价模型。整合全部探究成果：数据分析(课时1)→力学归因(课时2)→环境研判(课时2)→工程策略(本课时)，撰写《机器人参赛综合评估报告》。报告结构：摘要→数据分析→原理归因→环境研判→策略设计→建议与展望。小组完成3分钟成果展示，开展自评与互评。',
      task:'撰写《机器人参赛综合评估报告》（建议1500-2000字），完成3分钟成果展示与互评。课后根据反馈迭代修改，完成个人学习反思。',
      resources: ['平台教学资源/子问题三/课时三/活动二/机器人参赛综合评估报告.docx']
    },
  ],

  // ═══════════════════════════════════════════════
  // 模块四：传播与表达（3课时）
  // ═══════════════════════════════════════════════

  '4_0': [
    {
      time:'5分钟', title:'活动一：情境导入', type:'intro',
      desc:'播放赛事精彩短视频集锦（机器人起跑、弯道超车、冲线瞬间），引导学生思考：为什么要向公众传播科技赛事？不只是"报道新闻"，更是"让科技被看见"。确立"科技赛事传播者"的角色定位——你的任务是把硬核科技变成大众能懂、想看、愿意分享的故事。',
      task:'思考并写下：一个好的科技传播作品最重要的三个特质是什么？',
      resources: []
    },
    {
      time:'15分钟', title:'活动二：科技新闻拆解', type:'news-deconstruct',
      desc:'精读官方赛事报道原文，用"荧光笔标注法"完成：①标注5W1H六要素（Who/What/When/Where/Why/How）②圈出至少5个专业术语③在页边写通俗化改写建议。学习新闻五段式结构（标题→导语→主体→背景→结语），理解"倒金字塔"写作原则：最重要的信息放最前面。',
      task:'完成新闻五段式结构拆解，用5W1H标注官方报道原文。标注至少5个专业术语并写通俗化改写。',
      resources: []
    },
    {
      time:'15分钟', title:'活动三：媒体对比分析', type:'media-compare',
      desc:'对比阅读同一赛事的三方报道：官方媒体（人民日报/新华社）、自媒体（科技博主/抖音文案）、英文外媒（BBC/TechCrunch摘要）。从报道角度、信息准确性、语言可读性、受众适配度四个维度完成对比分析。培养批判性信息思维：不同媒体为什么"讲法"不一样？谁的报道最可信？谁的报道最好看？',
      task:'完成三方媒体四维对比分析表。课后拟定个人作品创作大纲。',
      resources: ['平台教学资源/子问题四/课时一/活动三_对比不同报道/报道对比分析表.xlsx']
    },
    {
      time:'5分钟', title:'活动四：创作任务选型', type:'task-select',
      desc:'介绍三类差异化创作方向：①科普海报设计【基础组】②新闻报道+英文简介【提升组】③短视频脚本+AI配图【挑战组】。学生根据个人兴趣和特长自主选择创作方向，确定创作主题（建议围绕赛事的一个具体角度深入，而非泛泛介绍）。',
      task:'确定个人创作方向与主题。课后参考创作支架拟定个人作品大纲。',
      resources: []
    },
  ],

  '4_1': [
    {
      time:'8分钟', title:'活动一：工具与支架讲解', type:'tool-demo',
      desc:'回顾科技传播核心技巧。针对三类创作任务分别讲解：①海报设计——版面构图（三分法）、配色方案（主色+辅色+强调色）、字体层级（标题>副标题>正文>标注）②新闻写作——标题技巧、导语打磨、段落逻辑、引语使用③脚本创作——分镜设计（开头3秒抓注意力→中间45秒核心内容→结尾15秒总结升华）。演示AI工具（文案润色/英文翻译/合规检查）的合规应用流程。',
      task:'掌握AI工具的合规应用方法：先自己完成→AI辅助优化→对比修改→决定采纳哪些→标注"AI辅助创作"。',
      resources: []
    },
    {
      time:'27分钟', title:'活动二：作品初稿创作', type:'create',
      desc:'学生自主开展创作。基础组完成科普海报设计（推荐Canva/PPT/手绘+扫描），提升组完成中文新闻报道800-1000字+英文简介150-200词，挑战组完成短视频脚本60-90秒+AI配图提示词。教师巡视并针对性答疑：帮助有畏难情绪的学生拆解任务、指导专业术语通俗化转化（类比法/场景法/分层法）。',
      task:'完成科技传播作品初稿（科普海报/新闻报道+英文简介/短视频脚本 三选一）。',
      resources: ['平台教学资源/子问题四/课时二/AI提示词示例卡.png', '平台教学资源/子问题四/课时二/新闻示例和模板.docx', '平台教学资源/子问题四/课时二/海报示例.png', '平台教学资源/子问题四/课时二/短视频脚本示例.xlsx']
    },
    {
      time:'5分钟', title:'活动三：初稿分享与反思', type:'share-reflect',
      desc:'将作品初稿上传至班级共享平台（本课使用学习反思区），每位学生简要阐述作品的核心传播主旨与预期受众。填写创作日志：①创作中最满意的1个亮点②目前最大的1个困惑③下一步最想优化的1个方向。',
      task:'完成初稿上传+创作日志。课后浏览同学作品初稿，提出针对性修改建议。',
      resources: []
    },
  ],

  '4_2': [
    {
      time:'12分钟', title:'活动一：结构化同伴互评', type:'peer-review',
      desc:'学生依托作品评价量规——准确性（科技事实无误+来源清晰）、清晰度（逻辑通顺+层次分明+通俗易懂）、创造性（形式新颖+独特视角）、规范性（格式+引用+语言规范）——互评同学作品。要求：①给出至少2个具体优点（不是"挺好的"而是"第三段的数据对比让读者直观感受到进步"）②给出至少2条可落地修改建议。一对一交流评分依据。',
      task:'完成至少2位同学作品的结构化互评（优点+修改建议+评分）。',
      resources: []
    },
    {
      time:'10分钟', title:'活动二：人机创作对比', type:'human-ai-compare',
      desc:'教师现场使用AI工具（智谱清言GLM-4-Flash）生成与本次创作主题相同的同款科普作品。学生小组对比分析：①人工作品哪里比AI好？（创意独特性、情感深度、真实体验感）②AI作品哪里比人强？（表达效率、语言流畅度、广度覆盖）③怎样让人和AI各取所长？深化对AI工具"辅助价值vs局限性"的认知。',
      task:'完成人机创作对比分析表：总结AI的3个优势+3个局限；提炼人工作品的3个不可替代的价值。',
      resources: ['平台教学资源/子问题四/课时三/活动二/小组作品对比分析表.pdf']
    },
    {
      time:'16分钟', title:'活动三：作品迭代与模拟发布会', type:'iterate-present',
      desc:'学生结合同伴互评反馈+人机对比洞察，完成作品第二稿迭代优化。各组代表开展2分钟"模拟发布会"展示最终作品，回应现场提问。锻炼临场表达与公众沟通能力——"最好的科技传播者不是最懂技术的人，而是最能让别人懂技术的人"。',
      task:'提交科技传播作品终稿+英文简介（如适用）。',
      resources: []
    },
    {
      time:'2分钟', title:'活动四：课末学习反思', type:'reflect',
      desc:'学生填写个人学习日志：①本次创作中我独立完成得最好的部分是……②AI工具在哪一步帮了我最大的忙？③如果再做一次，我会在哪个环节花更多时间？④我对"AI辅助、人工原创"的理解是什么？',
      task:'提交全套成果：优化后的传播作品+英文简介+创作日志+人机对比分析。',
      resources: []
    },
  ],
};


// ═══════════════════════════════════════════════════════════
// PART 3: 兼容别名 — 保持旧代码引用不报错
// ═══════════════════════════════════════════════════════════

// 合并 content + activities 为旧格式，供 index.html 中 lessonMaterials[matKey] 引用
const lessonMaterials = (function() {
  const merged = {};
  for (const key of Object.keys(lessonContent)) {
    const content = lessonContent[key];
    const activities = lessonActivities[key] || [];
    const blocks = content.blocks || {};

    // 从 blocks 重建 materialGate
    const materialGate = {};
    for (const [blockName, block] of Object.entries(blocks)) {
      if (block.gateActivity !== undefined) {
        materialGate[blockName] = block.gateActivity;
      }
    }

    // 从 activities 重建 activityResources
    const activityResources = {};
    activities.forEach((act, i) => {
      if (act.resources && act.resources.length) {
        activityResources[i] = act.resources;
      }
    });

    // 展开 block 数据到顶层（兼容旧代码直接访问 mat.keyData 等）
    const expanded = {};
    for (const [blockName, block] of Object.entries(blocks)) {
      if (blockName === 'homework') {
        expanded.homework = block.text;
      } else if (block.type === 'dataCards') {
        expanded.keyData = block.data; // 注意：可能有多个 dataCards，后者会覆盖前者
      } else if (block.data !== undefined) {
        expanded[blockName] = block.data;
      } else if (block.title !== undefined || block.layers !== undefined || block.relations !== undefined ||
                 block.headers !== undefined || block.keywords !== undefined) {
        // 复杂结构直接展开（保留 type 以外的所有字段）
        const { type, gateActivity, ...rest } = block;
        expanded[blockName] = rest;
      }
    }

    merged[key] = {
      ...expanded,
      activities: activities.map(a => ({
        time: a.time, title: a.title, type: a.type, desc: a.desc,
        resource: a.resources ? a.resources.join('、') : a.resource || '',
        task: a.task
      })),
      activityResources,
      materialGate,
      showMap: content.showMap,
      mapFocus: content.mapFocus,
    };
  }
  return merged;
})();


// ═══════════════════════════════════════════════════════════
// PART 4: 渲染函数 — 从分离数据源渲染教学资料
// ═══════════════════════════════════════════════════════════

function renderMaterials(moduleId, lessonIdx, published, isTeacher) {
  const key = moduleId + '_' + lessonIdx;
  const content = lessonContent[key];
  const activities = lessonActivities[key];
  if (!content && !activities) return '';

  published = published || [];
  isTeacher = isTeacher || false;
  const blocks = content ? (content.blocks || {}) : {};

  // 判断内容块是否可见（基于 gateActivity）
  function isBlockVisible(blockName) {
    const block = blocks[blockName];
    if (!block) return false;
    const gateIdx = block.gateActivity;
    if (gateIdx === undefined) return true;
    return isTeacher || published.includes(gateIdx);
  }

  let html = '';

  // ── 交互地图 ──
  if (content && content.showMap) {
    html += getInteractiveMapHTML();
  }

  // ── 数据卡片 (dataCards) ──
  for (const [blockName, block] of Object.entries(blocks)) {
    if (block.type !== 'dataCards' || !isBlockVisible(blockName)) continue;
    html += `<div class="mat-block">
      <div class="mat-label">📊 ${block.title || '关键数据'}</div>
      <div class="data-cards">
        ${(block.data || []).map(d => `
          <div class="data-card">
            <div class="dc-val">${d.val}<span class="dc-unit">${d.unit}</span></div>
            <div class="dc-lbl">${d.lbl}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  // ── 教学活动 ──
  if (activities && activities.length) {
    html += `<div class="mat-block">
      <div class="mat-label">📋 教学活动流程</div>`;
    if (isTeacher) {
      const allPub = activities.every((_, i) => published.includes(i));
      const anyPub = published.length > 0;
      html += `<div class="teacher-toolbar">
        <span class="toolbar-hint">已发布 ${published.length}/${activities.length} 个活动</span>
        <button class="btn-sm ghost" onclick="publishAll('${key}', ${activities.length})">${allPub ? '全部取消' : '发布全部'}</button>
        ${anyPub ? `<button class="btn-sm ghost" onclick="unpublishAll('${key}')">全部取消</button>` : ''}
      </div>`;
    }
    html += `<div class="framework">`;
    activities.forEach((act, i) => {
      const isPub = published.includes(i);
      if (isTeacher) {
        const resFiles = act.resources || [];
        html += `
        <div class="framework-item" style="border-left:3px solid ${isPub ? 'var(--accent)' : 'var(--border)'};">
          <span class="fw-time">⏱ ${act.time}</span>
          <div class="fw-text">
            <strong>${act.title}</strong>
            <span class="publish-status ${isPub ? 'pub' : 'draft'}">${isPub ? '已发布' : '未发布'}</span>
            <p style="margin:4px 0 0;font-size:12px;line-height:1.6;">${act.desc}</p>
            ${resFiles.length ? `<p style="margin:4px 0 0;font-size:11px;">📎 ${resFiles.map(f => `<a href="/${f}" target="_blank" style="color:var(--accent);text-decoration:none;border-bottom:1px dashed var(--accent);margin-right:8px;" download>${f.split('/').pop()}</a>`).join('')}</p>` : ''}
            <p style="margin:4px 0 0;font-size:11px;color:var(--orange);">📌 ${act.task}</p>
            <button class="publish-toggle ${isPub ? 'published' : ''}" onclick="${isPub ? `unpublishOne('${key}', ${i})` : `publishOne('${key}', ${i})`}">${isPub ? '取消发布' : '▶ 发布此活动'}</button>
          </div>
        </div>`;
      } else if (isPub) {
        const resFiles = act.resources || [];
        html += `
        <div class="framework-item" style="border-left:3px solid var(--accent);">
          <span class="fw-time">⏱ ${act.time}</span>
          <div class="fw-text">
            <strong>${act.title}</strong>
            <p style="margin:4px 0 0;font-size:12px;line-height:1.6;">${act.desc}</p>
            ${resFiles.length ? `<p style="margin:4px 0 0;font-size:11px;">📎 ${resFiles.map(f => `<a href="/${f}" target="_blank" style="color:var(--accent);text-decoration:none;border-bottom:1px dashed var(--accent);margin-right:8px;" download>${f.split('/').pop()}</a>`).join('')}</p>` : ''}
            <p style="margin:4px 0 0;font-size:11px;color:var(--orange);">📌 ${act.task}</p>
          </div>
        </div>`;
      } else {
        html += `
        <div class="framework-item activity-locked">
          <span class="fw-lock">🔒</span>
          <div class="fw-text">
            <strong>活动${i+1}：等待老师发布</strong>
            <p style="margin:4px 0 0;font-size:12px;line-height:1.6;color:var(--text-tertiary);">该活动尚未发布，请等待老师开放</p>
          </div>
        </div>`;
      }
    });
    html += `</div></div>`;
  }

  // ── 内容块渲染：按 block type 分发 ──
  function renderBlock(blockName, block, renderFn) {
    if (!isBlockVisible(blockName)) return '';
    return renderFn(block);
  }

  for (const [blockName, block] of Object.entries(blocks)) {
    if (!isBlockVisible(blockName)) continue;

    switch (block.type) {

      // 表格类
      case 'table':
        if (!block.rows || !block.rows.length) break;
        html += `<div class="mat-block">
          <div class="mat-label">${block.title || ''}</div>
          <div style="overflow-x:auto;">
            <table class="mat-table">
              <thead><tr>${(block.headers||[]).map(h => `<th>${h}</th>`).join('')}</tr></thead>
              <tbody>${block.rows.map(row =>
                `<tr>${row.map((cell, ci) => ci === 0 ? `<td class="val">${cell}</td>` : `<td>${cell}</td>`).join('')}</tr>`
              ).join('')}</tbody>
            </table>
          </div>
        </div>`;
        break;

      // 系统结构图
      case 'systemsDiagram':
        html += `<div class="mat-block">
          <div class="mat-label">🤖 机器人四大核心系统</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">`;
        (block.data || []).forEach(sys => {
          html += `
            <div style="background:var(--bg-subtle);border-radius:var(--radius-sm);padding:14px;display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:24px;flex-shrink:0;">${sys.icon}</span>
              <div>
                <div style="font-size:13px;font-weight:700;margin-bottom:2px;">${sys.name}</div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;margin-bottom:4px;">${sys.desc}</div>
                <div style="font-size:11px;color:var(--accent);font-weight:500;">${sys.role}</div>
              </div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 评价框架
      case 'evalFramework':
        html += `<div class="mat-block">
          <div class="mat-label">⭐ 五维机器人评价框架</div>
          <div class="framework">`;
        (block.data || []).forEach(item => {
          html += `
            <div class="framework-item">
              <span class="fw-num">${item.n}</span>
              <div class="fw-text">
                <strong>${item.name}（权重${item.weight}）— ${item.items}</strong>
                <span style="font-size:11px;color:var(--accent);">🏆 最佳：${item.best}</span>
              </div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 分析框架网格
      case 'frameworkGrid':
        html += `<div class="mat-block">
          <div class="mat-label">🔬 四维赛事分析框架</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">`;
        (block.data || []).forEach(item => {
          html += `
            <div style="background:var(--bg-subtle);border-radius:var(--radius-sm);padding:14px;">
              <div style="font-size:20px;margin-bottom:4px;">${item.icon}</div>
              <div style="font-size:13px;font-weight:700;">${item.n}. ${item.name}</div>
              <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;margin:4px 0;">${item.desc}</div>
              <div style="font-size:11px;color:var(--accent);font-weight:500;">❓ ${item.question}</div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 产业链框架
      case 'chainFramework':
        html += `<div class="mat-block">
          <div class="mat-label">${block.title || ''}</div>
          <div style="display:flex;flex-direction:column;gap:6px;">`;
        (block.layers || []).forEach(layer => {
          html += `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg-subtle);border-radius:var(--radius-sm);border-left:4px solid ${layer.color};">
              <span style="font-size:11px;font-weight:700;color:${layer.color};white-space:nowrap;">${layer.level}</span>
              <div>
                <div style="font-size:13px;font-weight:700;">${layer.name}</div>
                <div style="font-size:11px;color:var(--text-secondary);">${layer.items}</div>
              </div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 企业卡片
      case 'companies':
        html += `<div class="mat-block">
          <div class="mat-label">🏢 亦庄代表机器人企业</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;
        (block.data || []).forEach(comp => {
          html += `
            <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:12px;">
              <div style="font-size:13px;font-weight:700;">${comp.name}</div>
              <div style="font-size:11px;color:var(--accent);margin:2px 0;">${comp.product}</div>
              <div style="font-size:11px;color:var(--text-secondary);line-height:1.4;">🔧 ${comp.tech}</div>
              <div style="font-size:11px;color:var(--text-tertiary);">📌 ${comp.role}</div>
              <div style="font-size:11px;color:var(--orange);margin-top:2px;">🏁 ${comp.event}</div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 政策时间线
      case 'policyTimeline':
        html += `<div class="mat-block">
          <div class="mat-label">📜 国家机器人产业政策演进</div>
          <div style="display:flex;flex-direction:column;gap:8px;">`;
        (block.data || []).forEach(item => {
          html += `
            <div style="display:flex;gap:12px;padding:12px;background:var(--bg-subtle);border-radius:var(--radius-sm);">
              <span style="font-size:12px;font-weight:700;color:var(--accent);white-space:nowrap;min-width:70px;">${item.year}</span>
              <div>
                <div style="font-size:13px;font-weight:700;">${item.event}</div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">${item.detail}</div>
              </div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 故障案例
      case 'faultCases':
        html += `<div class="mat-block">
          <div class="mat-label">⚠ 典型故障案例力学归因分析</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">`;
        (block.data || []).forEach(kase => {
          html += `
            <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:14px;">
              <div style="font-size:13px;font-weight:700;color:#e74c3c;">${kase.phenomenon}</div>
              <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;margin:6px 0;">
                <strong>物理原理：</strong>${kase.physics}
              </div>
              <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">
                <strong>工程原因：</strong>${kase.cause}
              </div>
              <div style="font-size:11px;color:var(--green);line-height:1.5;margin-top:4px;">
                <strong>改进方案：</strong>${kase.fix}
              </div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 赛道特征
      case 'trackFeatures':
        html += `<div class="mat-block">
          <div class="mat-label">🏟 赛道环境特征（设计约束）</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;
        (block.data || []).forEach(f => {
          html += `
            <div style="background:var(--bg-subtle);border-radius:var(--radius-sm);padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:13px;font-weight:700;">${f.name}</span>
                <span style="font-size:11px;color:var(--accent);font-weight:600;">${f.ratio}</span>
              </div>
              <div style="font-size:11px;color:var(--text-secondary);">路面：${f.desc}</div>
              <div style="font-size:11px;color:var(--orange);">挑战：${f.challenge}</div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 制衡关系矩阵
      case 'tradeoffMatrix':
        html += `<div class="mat-block">
          <div class="mat-label">${block.title || ''}</div>
          <div style="display:flex;flex-direction:column;gap:8px;">`;
        (block.relations || []).forEach(rel => {
          html += `
            <div style="display:flex;gap:12px;align-items:flex-start;padding:10px 14px;background:var(--bg-subtle);border-radius:var(--radius-sm);">
              <span style="font-size:11px;font-weight:700;color:var(--accent);white-space:nowrap;min-width:100px;">${rel.pair}</span>
              <div style="flex:1;">
                <span style="font-size:11px;font-weight:600;color:${(rel.nature||'').includes('负') ? '#e74c3c' : '#ea5a0c'};">${rel.nature}</span>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">${rel.explain}</div>
              </div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 策略卡片
      case 'strategies':
        html += `<div class="mat-block">
          <div class="mat-label">🎯 差异化参赛策略对比</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">`;
        (block.data || []).forEach(s => {
          html += `
            <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:14px;">
              <div style="font-size:14px;font-weight:700;margin-bottom:6px;">${s.name}</div>
              ${Object.entries(s).filter(([k]) => k !== 'name').map(([k,v]) =>
                `<div style="font-size:11px;color:var(--text-secondary);margin:3px 0;"><strong>${k==='goal'?'目标':k==='speed'?'配速':k==='thermal'?'热管理':k==='corner'?'弯道':k==='battery'?'电池':k==='risk'?'风险':k}:</strong> ${v}</div>`
              ).join('')}
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 新闻结构
      case 'newsStructure':
        html += `<div class="mat-block">
          <div class="mat-label">📰 科技新闻五段式结构</div>
          <div style="display:flex;flex-direction:column;gap:6px;">`;
        (block.data || []).forEach(part => {
          html += `
            <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:var(--bg-subtle);border-radius:var(--radius-sm);">
              <span style="font-size:11px;font-weight:700;color:var(--accent);white-space:nowrap;min-width:48px;">${part.part}</span>
              <div style="font-size:12px;color:var(--text-secondary);line-height:1.5;">${part.desc}</div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 创作任务卡片
      case 'creationTasks':
        html += `<div class="mat-block">
          <div class="mat-label">🎨 三类创作任务详情</div>
          <div style="display:flex;flex-direction:column;gap:8px;">`;
        (block.data || []).forEach(task => {
          html += `
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);">
              <span style="font-size:11px;font-weight:700;color:var(--accent);white-space:nowrap;">${task.level}</span>
              <div style="flex:1;">
                <div style="font-size:14px;font-weight:700;">${task.name}</div>
                <div style="font-size:11px;color:var(--text-secondary);margin:2px 0;">📐 ${task.spec}</div>
                <div style="font-size:11px;color:var(--accent);">✅ ${task.criteria}</div>
              </div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 通俗化方法
      case 'simplifyMethods':
        html += `<div class="mat-block">
          <div class="mat-label">🔄 术语通俗化三大方法</div>
          <div style="display:flex;flex-direction:column;gap:8px;">`;
        (block.data || []).forEach(m => {
          html += `
            <div style="padding:12px;background:var(--bg-subtle);border-radius:var(--radius-sm);border-left:3px solid var(--accent);">
              <div style="font-size:13px;font-weight:700;">${m.method}</div>
              <div style="font-size:12px;color:var(--text-secondary);line-height:1.6;margin:4px 0;">💡 ${m.example}</div>
              <div style="font-size:11px;color:var(--accent);">🎯 ${m.tip}</div>
            </div>`;
        });
        html += `</div></div>`;
        break;

      // 政策关键词云
      case 'wordCloud':
        html += getWordCloudHTML(moduleId, lessonIdx, block);
        break;

      // 作业 — 在末尾渲染
      case 'homework':
        // 延迟到循环外处理
        break;
    }
  }

  // ── 作业提交区（放在最后） ──
  if (blocks.homework && isBlockVisible('homework')) {
    html += getHomeworkHTML(moduleId, lessonIdx);
  }

  return html;
}


// ═══════════════════════════════════════════════════════════
// PART 5: 作业提交 & 词云 & 地图 — 保持不变
// ═══════════════════════════════════════════════════════════

function getHomeworkHTML(courseId, lessonIdx) {
  const content = lessonContent[courseId + '_' + lessonIdx];
  const hwBlock = content && content.blocks && content.blocks.homework;
  const hw = hwBlock ? hwBlock.text : '';
  if (!hw) return '';

  const lines = hw.split('\n').filter(l => l.trim());
  return `
    <div class="mat-block" style="margin-top:28px;padding-top:24px;border-top:2px solid var(--accent-light);">
      <div class="mat-label" style="font-size:12px;color:var(--accent);">📝 课后任务提交</div>
      <div style="background:var(--bg-subtle);border-radius:var(--radius-sm);padding:16px;margin-bottom:12px;">
        <ol style="margin:0;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.8;">
          ${lines.map(l => `<li>${l.replace(/^\d+\.\s*/, '')}</li>`).join('')}
        </ol>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <textarea id="hwText_${courseId}_${lessonIdx}" placeholder="在此编写并提交你的课后任务…" style="width:100%;min-height:100px;border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:12px;font-size:13px;font-family:inherit;resize:vertical;outline:none;line-height:1.6;"></textarea>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <label id="hwFileLabel_${courseId}_${lessonIdx}" style="display:inline-flex;align-items:center;gap:4px;padding:8px 16px;border-radius:6px;border:1px dashed var(--border);background:var(--bg-card);font-size:12px;cursor:pointer;color:var(--text-secondary);transition:var(--transition);font-family:inherit;">
            <span>📎 选择文件</span>
            <input type="file" id="hwFile_${courseId}_${lessonIdx}" style="display:none;" onchange="onHwFileSelected(${courseId},${lessonIdx})" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.txt,.md,.zip">
          </label>
          <span id="hwFileName_${courseId}_${lessonIdx}" style="font-size:11px;color:var(--text-tertiary);"></span>
          <button onclick="submitHomework(${courseId},${lessonIdx})" style="padding:8px 20px;border-radius:6px;background:var(--text);color:#fff;border:none;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;">提交作业</button>
          <span id="hwStatus_${courseId}_${lessonIdx}" style="font-size:12px;color:var(--text-tertiary);"></span>
        </div>
        <div id="hwSubmissions_${courseId}_${lessonIdx}" style="margin-top:8px;"></div>
      </div>
    </div>`;
}

function onHwFileSelected(courseId, lessonIdx) {
  const fileInput = document.getElementById('hwFile_' + courseId + '_' + lessonIdx);
  const nameEl = document.getElementById('hwFileName_' + courseId + '_' + lessonIdx);
  if (fileInput.files.length > 0) {
    nameEl.textContent = '已选择: ' + fileInput.files[0].name + ' (' + formatFileSize(fileInput.files[0].size) + ')';
    nameEl.style.color = 'var(--accent)';
  } else {
    nameEl.textContent = '';
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

const homeworkStore = {};
async function submitHomework(courseId, lessonIdx) {
  const textarea = document.getElementById('hwText_' + courseId + '_' + lessonIdx);
  const status = document.getElementById('hwStatus_' + courseId + '_' + lessonIdx);
  const submissionsDiv = document.getElementById('hwSubmissions_' + courseId + '_' + lessonIdx);
  const fileInput = document.getElementById('hwFile_' + courseId + '_' + lessonIdx);
  const content = textarea.value.trim();
  const hasFile = fileInput && fileInput.files.length > 0;

  if (!content && !hasFile) { status.textContent = '请先输入内容或选择文件'; status.style.color = '#ea5a0c'; return; }

  const key = courseId + '_' + lessonIdx;
  if (!homeworkStore[key]) homeworkStore[key] = [];

  let fileInfo = null;
  if (hasFile && typeof serverAvailable !== 'undefined' && serverAvailable) {
    status.textContent = '上传中...';
    status.style.color = 'var(--accent)';
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', String(courseId));
    formData.append('lessonIdx', String(lessonIdx));

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + (localStorage.getItem('pbl_token') || '') },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        fileInfo = { name: data.fileName, storedName: data.storedName };
      }
    } catch (e) {}
  }

  const entry = {
    content: content || '(文件提交)',
    fileName: fileInfo ? fileInfo.name : (hasFile ? fileInput.files[0].name : null),
    storedName: fileInfo ? fileInfo.storedName : null,
    time: new Date().toLocaleString('zh-CN'),
    id: Date.now()
  };
  homeworkStore[key].push(entry);

  if (content) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const token = localStorage.getItem('pbl_token');
      if (token) headers['Authorization'] = 'Bearer ' + token;
      fetch('/api/homework', {
        method: 'POST',
        headers,
        body: JSON.stringify({ courseId, lessonIdx, content, time: new Date().toISOString(), fileName: fileInfo ? fileInfo.name : null })
      }).catch(() => {});
    } catch {}
  }

  textarea.value = '';
  if (fileInput) { fileInput.value = ''; }
  const fileNameEl = document.getElementById('hwFileName_' + courseId + '_' + lessonIdx);
  if (fileNameEl) fileNameEl.textContent = '';
  status.textContent = '已提交！';
  status.style.color = '#0d9488';
  setTimeout(() => { status.textContent = ''; }, 2000);

  submissionsDiv.innerHTML = homeworkStore[key].slice(-5).reverse().map(s => {
    const fileLink = s.storedName ? `<a href="/api/uploads/${s.storedName}" target="_blank" style="color:var(--accent);font-size:11px;">📎 ${s.fileName}</a>` : '';
    return `<div style="font-size:12px;padding:6px 10px;margin-top:4px;background:var(--bg-subtle);border-radius:4px;color:var(--text-secondary);">
      <span style="color:var(--text-tertiary);">${s.time} 提交</span> — ${s.content.substring(0, 80)}${s.content.length > 80 ? '…' : ''}
      ${fileLink}
    </div>`;
  }).join('');
}


// ═══════════════════════════════════════════════════════════
// PART 6: 交互式地图 & 词云 — 保持原有实现不变
// ═══════════════════════════════════════════════════════════

var _leafletMaps = {};

function initLeafletMap(mapId) {
  var container = document.getElementById(mapId);
  if (!container || _leafletMaps[mapId]) return;

  L.Icon.Default.imagePath = '/lib/images/';

  var map = L.map(mapId, {
    center: [39.85, 116.38],
    zoom: 11,
    zoomControl: false,
    attributionControl: false
  });

  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    maxZoom: 18,
    minZoom: 8
  }).addTo(map);

  var redIcon = L.icon({ iconUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36"><circle cx="12" cy="12" r="10" fill="#dc3545" stroke="#fff" stroke-width="2.5"/><circle cx="12" cy="12" r="4" fill="#fff"/><polygon points="12,34 6,22 18,22" fill="#dc3545" stroke="#fff" stroke-width="1"/></svg>'), iconSize: [24, 36], iconAnchor: [12, 34], popupAnchor: [0, -36] });
  var blueIcon = L.icon({ iconUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="42"><circle cx="14" cy="12" r="11" fill="#1a56db" stroke="#fff" stroke-width="3"><animate attributeName="r" values="11;13;11" dur="2s" repeatCount="indefinite"/></circle><circle cx="14" cy="12" r="5" fill="#fff"/><polygon points="14,40 6,24 22,24" fill="#1a56db" stroke="#fff" stroke-width="1.5"/></svg>'), iconSize: [28, 42], iconAnchor: [14, 40], popupAnchor: [0, -42] });
  var blueSmallIcon = L.icon({ iconUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30"><circle cx="10" cy="10" r="8" fill="#2980b9" stroke="#fff" stroke-width="2"/><polygon points="10,28 5,16 15,16" fill="#2980b9" stroke="#fff" stroke-width="1"/></svg>'), iconSize: [20, 30], iconAnchor: [10, 28], popupAnchor: [0, -30] });

  L.marker([39.9087, 116.3975], {icon: redIcon}).addTo(map).bindPopup('<b>天安门</b><br>市中心基准点');
  L.marker([39.795, 116.505], {icon: blueIcon}).addTo(map).bindPopup('<b>亦庄经开区</b><br>赛事举办地 · 北京经济技术开发区');
  L.marker([39.982, 116.312], {icon: blueSmallIcon}).addTo(map).bindPopup('<b>中关村</b><br>高校·科研集聚区');
  L.marker([39.914, 116.465], {icon: blueSmallIcon}).addTo(map).bindPopup('<b>国贸CBD</b><br>商务·国际交往中心');
  L.marker([39.902, 116.66], {icon: blueSmallIcon}).addTo(map).bindPopup('<b>通州副中心</b><br>北京城市副中心');
  L.marker([39.51, 116.41], {icon: L.icon({ iconUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30"><circle cx="10" cy="10" r="7" fill="#16a085" stroke="#fff" stroke-width="2"/><polygon points="10,28 5,16 15,16" fill="#16a085" stroke="#fff" stroke-width="1"/></svg>'), iconSize: [20, 30], iconAnchor: [10, 28], popupAnchor: [0, -30] })}).addTo(map).bindPopup('<b>大兴国际机场</b>');

  L.polyline([[39.9087, 116.3975], [39.795, 116.505]], {
    color: '#dc3545', weight: 2, dashArray: '8, 6', opacity: 0.7
  }).addTo(map).bindPopup('约 18 公里 · 地铁约60分钟');

  L.circle([39.78, 116.48], { radius: 2000, color: '#2ecc71', weight: 1, fillColor: '#2ecc71', fillOpacity: 0.1 }).addTo(map).bindPopup('南海子公园');

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  _leafletMaps[mapId] = map;

  setTimeout(function() { map.invalidateSize(); }, 200);
}

function getInteractiveMapHTML() {
  var mapId = 'bjmap_' + Date.now();
  setTimeout(function() { initLeafletMap(mapId); }, 300);

  return `
    <div class="mat-block">
      <div class="mat-label">🗺 北京实景地图 — 亦庄区位分析 <span style="font-weight:400;font-size:10px;color:var(--text-tertiary);">可拖拽缩放 · 点击标记查看详情 · 右上角切换底图</span></div>
      <div style="display:flex;gap:10px;align-items:flex-start;">
        <div id="${mapId}" style="flex:1;height:460px;min-width:0;border-radius:var(--radius-sm);background:#f0eee6;"></div>
        <div style="width:120px;flex-shrink:0;display:flex;flex-direction:column;gap:8px;">
          <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:12px;text-align:center;">
            <div style="font-size:22px;font-weight:700;color:var(--accent);">18<span style="font-size:11px;">km</span></div>
            <div style="font-size:10px;color:var(--text-tertiary);margin-top:2px;">距天安门</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:12px;text-align:center;">
            <div style="font-size:22px;font-weight:700;color:var(--accent);">60<span style="font-size:11px;">min</span></div>
            <div style="font-size:10px;color:var(--text-tertiary);margin-top:2px;">地铁通勤</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:12px;text-align:center;">
            <div style="font-size:22px;font-weight:700;color:var(--accent);">225<span style="font-size:11px;">km²</span></div>
            <div style="font-size:10px;color:var(--text-tertiary);margin-top:2px;">规划面积</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:12px;text-align:center;">
            <div style="font-size:22px;font-weight:700;color:#0d9488;">35<span style="font-size:11px;">%</span></div>
            <div style="font-size:10px;color:var(--text-tertiary);margin-top:2px;">绿化覆盖</div>
          </div>
        </div>
      </div>
    </div>`;
}


// ═══════════════════════════════════════════════════════════
// PART 7: 政策关键词云 — 保持原有实现不变
// ═══════════════════════════════════════════════════════════

function getWordCloudHTML(moduleId, lessonIdx, wc) {
  const uid = 'wc_' + moduleId + '_' + lessonIdx;
  const lessonKey = moduleId + '_' + lessonIdx;
  setTimeout(function() { initWordCloud(uid, lessonKey, wc.colors); }, 120);
  return `
    <div class="mat-block" id="${uid}_block">
      <div class="mat-label">☁ ${wc.title} <span style="font-weight:400;font-size:11px;color:var(--accent);" id="${uid}_groupLabel"></span></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;line-height:1.6;">${wc.desc}</p>
      <div class="wordcloud-wrap" id="${uid}">
        <div class="wc-empty-placeholder" id="${uid}_empty">
          <div class="wc-empty-icon">☁</div>
          <p>词云图暂为空，等待小组成员添加关键词</p>
          <p style="font-size:11px;color:var(--text-tertiary);">阅读政策文件后，在下方输入框添加你发现的关键词</p>
        </div>
      </div>
      <div class="wc-legend">
        <span><span class="dot" style="background:var(--accent);"></span>高频核心</span>
        <span><span class="dot" style="background:#6d28d9;"></span>重要支撑</span>
        <span><span class="dot" style="background:#0d9488;"></span>关联概念</span>
        <button class="wc-clear-btn" onclick="clearHighlights_wordcloud('${uid}')">清除高亮</button>
        <span style="font-size:10px;color:var(--text-tertiary);margin-left:4px;" id="${uid}_contributors"></span>
      </div>
      <div class="wc-add-row">
        <input type="text" id="${uid}_input" placeholder="输入新的关键词（2-12字）..." onkeydown="if(event.key==='Enter')addKeyword_wordcloud('${uid}','${lessonKey}')">
        <button onclick="addKeyword_wordcloud('${uid}','${lessonKey}')">添加</button>
      </div>
    </div>`;
}

var _wcStore = {};

function initWordCloud(uid, lessonKey, colors) {
  var container = document.getElementById(uid);
  if (!container || container._rendered) return;
  container._rendered = true;
  container._colors = colors;
  container._lessonKey = lessonKey;
  loadWordCloudFromServer(uid, lessonKey, colors);
}

function loadWordCloudFromServer(uid, lessonKey, colors) {
  var container = document.getElementById(uid);
  if (!container) return;
  var emptyEl = document.getElementById(uid + '_empty');
  var groupLabel = document.getElementById(uid + '_groupLabel');
  var contribEl = document.getElementById(uid + '_contributors');

  try {
    var token = (typeof authToken !== 'undefined') ? authToken : localStorage.getItem('pbl_token');
    if (!token) {
      if (groupLabel) groupLabel.textContent = '（请先登录）';
      return;
    }
    var apiBase = (typeof API_BASE !== 'undefined') ? API_BASE : '/api';
    fetch(apiBase + '/wordcloud?lessonKey=' + encodeURIComponent(lessonKey), {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(function(res) {
      if (!res.ok) throw new Error('load failed');
      return res.json();
    }).then(function(data) {
      container._keywords = (data.keywords || []).map(function(k) {
        return { text: k.text, weight: k.weight || 3, addedBy: k.addedBy };
      });
      container._groupId = data.groupId;
      container._groupName = data.groupName;
      if (groupLabel) groupLabel.textContent = data.groupName ? '— ' + data.groupName : '';
      if (contribEl && data.contributors && data.contributors.length) {
        contribEl.textContent = '贡献者: ' + data.contributors.join('、');
      }
      renderWordCloudTags(container);
    }).catch(function() {
      loadWordCloudLocal(uid);
    });
  } catch(e) {
    loadWordCloudLocal(uid);
  }
}

function loadWordCloudLocal(uid) {
  var container = document.getElementById(uid);
  if (!container) return;
  var groupLabel = document.getElementById(uid + '_groupLabel');
  try {
    var key = 'wc_local_' + (container._lessonKey || uid);
    var saved = localStorage.getItem(key);
    if (saved) {
      container._keywords = JSON.parse(saved);
      container._groupName = '本地模式';
      if (groupLabel) groupLabel.textContent = '（离线模式）';
      renderWordCloudTags(container);
    } else {
      container._keywords = [];
      if (groupLabel) groupLabel.textContent = '（离线模式）';
    }
  } catch(e) {
    container._keywords = [];
  }
}

function saveWordCloudToServer(uid, lessonKey) {
  var container = document.getElementById(uid);
  if (!container || !container._keywords) return;
  try {
    var token = (typeof authToken !== 'undefined') ? authToken : localStorage.getItem('pbl_token');
    if (!token) { saveWordCloudLocal(uid, lessonKey); return; }
    var apiBase = (typeof API_BASE !== 'undefined') ? API_BASE : '/api';
    fetch(apiBase + '/wordcloud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({
        lessonKey: lessonKey,
        keywords: container._keywords.map(function(k) { return { text: k.text, weight: k.weight, addedBy: k.addedBy }; })
      })
    }).catch(function() {
      saveWordCloudLocal(uid, lessonKey);
    });
  } catch(e) {
    saveWordCloudLocal(uid, lessonKey);
  }
}

function saveWordCloudLocal(uid, lessonKey) {
  var container = document.getElementById(uid);
  if (!container || !container._keywords) return;
  try {
    var key = 'wc_local_' + (lessonKey || container._lessonKey || uid);
    localStorage.setItem(key, JSON.stringify(container._keywords));
  } catch(e) {}
}

function renderWordCloudTags(container) {
  var keywords = container._keywords || [];
  var colors = container._colors || ['#1a56db','#6d28d9','#0d9488','#ea5a0c'];
  var emptyEl = document.getElementById(container.id + '_empty');

  var oldTags = container.querySelectorAll('.wc-tag');
  for (var i = 0; i < oldTags.length; i++) { oldTags[i].remove(); }

  if (!keywords.length) {
    if (emptyEl) emptyEl.style.display = '';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';

  var shuffled = keywords.slice().sort(function(){ return Math.random() - 0.5; });
  var fragment = document.createDocumentFragment();
  shuffled.forEach(function(kw, i) {
    var sizeClass = kw.weight >= 5 ? 's1' : kw.weight >= 4 ? 's2' : kw.weight >= 3 ? 's3' : 's4';
    var color = colors[i % colors.length];
    var rot = (Math.random() * 6 - 3).toFixed(1);
    var tag = document.createElement('span');
    tag.className = 'wc-tag ' + sizeClass;
    tag.style.cssText = 'color:' + color + ';background:' + color + '12;animation-delay:' + (i * 0.03).toFixed(2) + 's;transform:rotate(' + rot + 'deg);';
    tag.setAttribute('data-text', kw.text.replace(/"/g, '&quot;'));
    var textNode = document.createTextNode(kw.text);
    tag.appendChild(textNode);
    var delBtn = document.createElement('span');
    delBtn.className = 'wc-del';
    delBtn.textContent = '\xD7';
    delBtn.title = '删除此关键词';
    delBtn.onclick = function(e) {
      e.stopPropagation();
      removeKeyword_wordcloud(container, kw.text);
    };
    tag.appendChild(delBtn);
    tag.onclick = function(e) {
      if (e.target === delBtn) return;
      toggleHighlight_wordcloud(tag);
    };
    if (kw.addedBy) tag.title = '由 ' + kw.addedBy + ' 添加';
    fragment.appendChild(tag);
  });
  container.appendChild(fragment);
}

function toggleHighlight_wordcloud(el) {
  el.classList.toggle('highlighted');
}

function clearHighlights_wordcloud(uid) {
  var container = document.getElementById(uid);
  if (!container) return;
  var tags = container.querySelectorAll('.wc-tag');
  for (var i = 0; i < tags.length; i++) { tags[i].classList.remove('highlighted'); }
}

function addKeyword_wordcloud(uid, lessonKey) {
  var input = document.getElementById(uid + '_input');
  if (!input) return;
  var text = input.value.trim();
  if (!text || text.length < 2 || text.length > 12) return;
  var container = document.getElementById(uid);
  if (!container) return;

  var keywords = container._keywords || [];
  var existing = null;
  for (var i = 0; i < keywords.length; i++) {
    if (keywords[i].text === text) { existing = keywords[i]; break; }
  }

  var currentUsername = '我';
  try {
    if (typeof currentUser !== 'undefined' && currentUser) currentUsername = currentUser.username;
  } catch(e) {}

  if (existing) {
    existing.weight = Math.min(5, (existing.weight || 3) + 1);
    if (existing.addedBy && existing.addedBy.indexOf(currentUsername) < 0) {
      existing.addedBy = existing.addedBy + '、' + currentUsername;
    }
  } else {
    keywords.push({ text: text, weight: 3, addedBy: currentUsername });
  }
  container._keywords = keywords;
  input.value = '';
  input.focus();

  renderWordCloudTags(container);
  saveWordCloudToServer(uid, lessonKey);
}

function removeKeyword_wordcloud(container, text) {
  if (!container || !container._keywords) return;
  var keywords = container._keywords;
  var idx = -1;
  for (var i = 0; i < keywords.length; i++) {
    if (keywords[i].text === text) { idx = i; break; }
  }
  if (idx < 0) return;
  var kw = keywords[idx];
  if (kw.weight > 1) {
    kw.weight = Math.max(1, kw.weight - 1);
  } else {
    keywords.splice(idx, 1);
  }
  container._keywords = keywords;
  renderWordCloudTags(container);
  saveWordCloudToServer(container.id, container._lessonKey);
}
