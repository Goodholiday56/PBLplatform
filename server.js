const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');

const PORT = 8000;
const HOST = '0.0.0.0';
const DATA_DIR = path.join(__dirname, 'data');

// ── DeepSeek 配置 ──
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY ;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

const SYSTEM_PROMPT = `你是"人机共跑"跨学科PBL教学平台的AI学习助手。平台以2026北京亦庄人形机器人半程马拉松为真实情境，服务初三升高一学生，整合地理、物理、信息技术、语文等多学科。

你的四种核心能力：
1. 术语通俗化——把专业概念用生活类比、具体场景、分层拆解的方式讲得简单易懂，控制在200字内
2. 文案润色——优化学生的分析报告和作品，保持原意和口吻，仅优化逻辑和表达，标注修改处
3. 英文翻译——产出适合初中生阅读的英文版本，使用简单句和常用词汇
4. 内容合规检查——核查科技事实准确性、表述规范性，给出具体修改建议

回复要求：
- 使用15-16岁学生能理解的语言，亲切但不过于幼稚
- 给出具体、实用的帮助，而不是泛泛而谈
- 鼓励学生独立思考，不给标准答案
- 结尾加"—— AI生成，请人工复核"
- 控制回复在300字以内
- 避免讨论政治敏感话题
- 如果学生的问题与课程无关，温和地引导回学习主题`;

const COMPARE_SYSTEM_PROMPT = `你是"人机共跑"教学平台的AI创作助手。你的任务是根据学生提供的科技传播作品信息，生成一个同主题、同类型的AI版本，用于课堂"人机创作对比"教学。

创作类型参考：
- 科普海报文案：简洁有力的标题+副标题+3-5个数据点+视觉描述
- 中文新闻报道：五段式结构（标题+导语+主体+背景+结语），800-1000字
- 英文简介：150-200词，简单句+常用词汇，适合海外社交媒体
- 短视频脚本：60-90秒，15-20个分镜，含画面描述+旁白+配乐建议

要求：
1. 严格匹配学生选择的创作类型，模仿对应体裁的格式和风格
2. 语言流畅准确，展示AI创作的特点（效率高、信息广、表达规范）
3. 内容与"2026北京亦庄人形机器人半程马拉松"相关
4. 控制在适合15-16岁学生对比分析的长度（500-800字）
5. 结尾加"—— AI生成，用于课堂教学对比，请勿视为标准答案"`;

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

// ── In-memory JSON store (write-through cache) ──
const _jsonCache = new Map();
const _jsonMtime = new Map();

function readJSON(filename) {
  const filepath = path.join(DATA_DIR, filename);
  try {
    const stat = fs.statSync(filepath);
    const cached = _jsonMtime.get(filename);
    if (cached === stat.mtimeMs && _jsonCache.has(filename)) {
      return _jsonCache.get(filename);
    }
    const raw = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(raw);
    _jsonCache.set(filename, data);
    _jsonMtime.set(filename, stat.mtimeMs);
    return data;
  } catch {
    return null;
  }
}

function writeJSON(filename, data) {
  const filepath = path.join(DATA_DIR, filename);
  _jsonCache.set(filename, data);
  fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
    if (!err) {
      try { _jsonMtime.set(filename, fs.statSync(filepath).mtimeMs); } catch {}
    }
  });
}

// ── 用户认证 ──
const USERS_FILE = 'users.json';
const SESSIONS_FILE = 'sessions.json';
const POSTS_FILE = 'posts.json';
const COMMENTS_FILE = 'comments.json';
const WORKS_FILE = 'works.json';
const REVIEWS_FILE = 'reviews.json';
const WORDCLOUD_FILE = 'wordcloud.json';
const GROUPS_FILE = 'groups.json';

const ANALYSIS_SYSTEM_PROMPT = `你是"人机共跑"教学平台的AI学情分析助手。根据教师提供的班级数据，生成教学洞察。

分析维度：
1. 整体学情 — 班级完成率、各模块通过情况，指出薄弱模块
2. 个体关注 — 进度明显落后或作品未提交的学生
3. 教学建议 — 针对薄弱环节的具体教学调整建议
4. 优秀表现 — 亮点学生或优秀作品

要求：数据驱动、具体可操作、语气专业温和、300-500字。结尾加"—— AI生成，仅供教师参考"`;

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function getUserByUsername(username) {
  const users = readJSON(USERS_FILE) || [];
  return users.find(u => u.username === username);
}

function getUserById(id) {
  const users = readJSON(USERS_FILE) || [];
  return users.find(u => u.id === id);
}

function createSession(userId) {
  const sessions = readJSON(SESSIONS_FILE) || [];
  const token = crypto.randomUUID();
  sessions.push({ token, userId, createdAt: new Date().toISOString() });
  writeJSON(SESSIONS_FILE, sessions.slice(-100));
  return token;
}

function validateToken(token) {
  if (!token) return null;
  const sessions = readJSON(SESSIONS_FILE) || [];
  const session = sessions.find(s => s.token === token);
  if (!session) return null;
  return getUserById(session.userId);
}

function deleteSession(token) {
  const sessions = readJSON(SESSIONS_FILE) || [];
  writeJSON(SESSIONS_FILE, sessions.filter(s => s.token !== token));
}

function authUser(req) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return null;
  return validateToken(token);
}

// ── 小组辅助函数 ──
function getUserGroup(userId) {
  const groups = readJSON(GROUPS_FILE) || [];
  return groups.find(g => g.members && g.members.includes(userId)) || null;
}

function getGroupById(groupId) {
  const groups = readJSON(GROUPS_FILE) || [];
  return groups.find(g => g.id === groupId) || null;
}

function getWordCloudKey(lessonKey, groupId, userId) {
  // 有小组：按小组共享；无小组：按个人
  if (groupId) return lessonKey + '_group_' + groupId;
  return lessonKey + '_user_' + userId;
}

// ── DeepSeek API 调用 ──
function callDeepSeekAPI(messages) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const url = new URL(DEEPSEEK_API_URL);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
            resolve(parsed.choices[0].message.content);
          } else if (parsed.error) {
            reject(new Error(parsed.error.message || 'API error'));
          } else {
            reject(new Error('Unexpected API response'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.write(postData);
    req.end();
  });
}

// AI创作对比调用（使用不同的system prompt和更高字数限制）
function callCompareAPI(messages, systemPrompt) {
  const sp = systemPrompt || COMPARE_SYSTEM_PROMPT;
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: sp },
        ...messages
      ],
      temperature: systemPrompt ? 0.7 : 0.8,
      max_tokens: systemPrompt ? 1000 : 1500,
    });

    const url = new URL(DEEPSEEK_API_URL);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
            resolve(parsed.choices[0].message.content);
          } else if (parsed.error) {
            reject(new Error(parsed.error.message || 'API error'));
          } else {
            reject(new Error('Unexpected API response'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.write(postData);
    req.end();
  });
}

// ── 本地备用回复（API不可用时） ──
function getFallbackResponse(msg) {
  const m = msg.toLowerCase();
  if (/解释|什么是|概念|区别|原理|含义|意思/.test(m)) {
    return '这是一个很专业的概念。让我用一个生活类比来解释：就像人类跑步需要眼睛看路、大脑判断、肌肉执行一样，机器人也需要类似的"感官→决策→行动"配合。\n\n建议你：\n1. 先从已知的物理/生物知识去理解\n2. 观察它在真实赛事中的具体表现\n3. 试着用自己的话向同学解释一遍\n\n（AI服务暂时不可用，以上为本地提示）\n\n—— AI生成，请人工复核';
  }
  if (/润色|优化|修改|改一|润饰|完善/.test(m)) {
    return '润色建议：先提出观点，再用证据支撑，最后给出结论。把长句拆短，每句控制在20-30字。首次出现的专业术语加一句通俗解释。\n\n请把需要润色的具体内容发给我。\n\n（AI服务暂时不可用，以上为本地提示）\n\n—— AI生成，请人工复核';
  }
  if (/翻译|英文|英语|translate|english/.test(m)) {
    return '翻译要点：科技名词保持统一，句子以简单句为主，适合非英语母语读者。请把需要翻译的中文发给我。\n\n（AI服务暂时不可用，以上为本地提示）\n\n—— AI生成，请人工复核';
  }
  if (/检查|合规|审核|验证|核对/.test(m)) {
    return '内容核查要点：核对科技事实是否准确，表述是否规范，信息来源是否可靠，是否标注了参考资料。建议逐项自检。\n\n（AI服务暂时不可用，以上为本地提示）\n\n—— AI生成，请人工复核';
  }
  return '这是个好问题。在探究式学习中，遇到困惑是深度思考的开始。建议回顾本课时的学习目标，查看配套资源，或和同学讨论不同的思考角度。\n\n（AI服务暂时不可用，以上为本地提示）\n\n—— AI生成，请人工复核';
}

// ── Request body parsing ──
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({ raw: body }); }
    });
  });
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(data));
}

// ── API router ──
async function handleAPI(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const route = url.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // POST /api/register
  if (route === '/api/register' && req.method === 'POST') {
    const body = await parseBody(req);
    const username = (body.username || '').trim();
    const password = (body.password || '').trim();
    if (!username || !password) {
      sendJSON(res, 400, { error: '用户名和密码不能为空' });
      return;
    }
    if (username.length < 2 || username.length > 20) {
      sendJSON(res, 400, { error: '用户名需2-20个字符' });
      return;
    }
    if (password.length < 4) {
      sendJSON(res, 400, { error: '密码至少4个字符' });
      return;
    }
    if (getUserByUsername(username)) {
      sendJSON(res, 409, { error: '用户名已存在' });
      return;
    }
    const users = readJSON(USERS_FILE) || [];
    const salt = crypto.randomBytes(16).toString('hex');
    const user = {
      id: crypto.randomUUID(),
      username,
      passwordHash: hashPassword(password, salt),
      salt,
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    writeJSON(USERS_FILE, users);
    const token = createSession(user.id);
    sendJSON(res, 201, { token, user: { id: user.id, username: user.username, role: user.role } });
    console.log(`[Auth] 新用户注册: ${username}`);
    return;
  }

  // POST /api/login
  if (route === '/api/login' && req.method === 'POST') {
    const body = await parseBody(req);
    const username = (body.username || '').trim();
    const password = (body.password || '').trim();
    const user = getUserByUsername(username);
    if (!user || hashPassword(password, user.salt) !== user.passwordHash) {
      sendJSON(res, 401, { error: '用户名或密码错误' });
      return;
    }
    const token = createSession(user.id);
    sendJSON(res, 200, { token, user: { id: user.id, username: user.username, role: user.role } });
    console.log(`[Auth] 用户登录: ${username}`);
    return;
  }

  // POST /api/logout
  if (route === '/api/logout' && req.method === 'POST') {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    deleteSession(token);
    sendJSON(res, 200, { ok: true });
    return;
  }

  // GET /api/me — 获取当前用户（含小组信息）
  if (route === '/api/me' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) {
      sendJSON(res, 401, { error: '未登录或登录已过期' });
      return;
    }
    const group = getUserGroup(user.id);
    sendJSON(res, 200, {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        groupId: group ? group.id : null,
        groupName: group ? group.name : null,
      }
    });
    return;
  }

  // POST /api/chat — AI chat (真实 API + 本地备用)
  if (route === '/api/chat' && req.method === 'POST') {
    const body = await parseBody(req);
    const userMsg = body.message || body.raw || '';
    if (!userMsg || !userMsg.trim()) {
      sendJSON(res, 400, { error: '消息不能为空' });
      return;
    }

    // 构建对话历史（保留最近5轮）
    const history = body.history || [];
    const messages = [
      ...history.slice(-10),
      { role: 'user', content: userMsg }
    ];

    try {
      const reply = await callDeepSeekAPI(messages);
      sendJSON(res, 200, { reply, timestamp: new Date().toISOString(), source: 'deepseek' });
      console.log(`[AI] 用户提问: ${userMsg.substring(0, 50)}... → DeepSeek回复 (${reply.length}字)`);
    } catch (err) {
      console.log(`[AI] DeepSeek API调用失败: ${err.message}，使用本地回复`);
      const fallbackReply = getFallbackResponse(userMsg);
      sendJSON(res, 200, {
        reply: fallbackReply,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        error: err.message
      });
    }
    return;
  }

  // GET /api/progress — load progress (需登录)
  if (route === '/api/progress' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const all = readJSON('progress.json') || {};
    sendJSON(res, 200, all[user.id] || {});
    return;
  }

  // POST /api/progress — save progress (需登录)
  if (route === '/api/progress' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const body = await parseBody(req);
    const all = readJSON('progress.json') || {};
    if (!all[user.id]) all[user.id] = {};
    Object.assign(all[user.id], body);
    writeJSON('progress.json', all);
    sendJSON(res, 200, { ok: true });
    return;
  }

  // GET /api/reflections — load reflections (需登录)
  if (route === '/api/reflections' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const all = readJSON('reflections.json') || {};
    sendJSON(res, 200, all[user.id] || {});
    return;
  }

  // POST /api/reflections — save reflections (需登录)
  if (route === '/api/reflections' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const body = await parseBody(req);
    const all = readJSON('reflections.json') || {};
    if (!all[user.id]) all[user.id] = {};
    Object.assign(all[user.id], body);
    writeJSON('reflections.json', all);
    sendJSON(res, 200, { ok: true });
    return;
  }

  // POST /api/homework — submit homework (需登录)
  if (route === '/api/homework' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const body = await parseBody(req);
    const all = readJSON('homework.json') || [];
    all.push({ ...body, userId: user.id, id: Date.now(), submittedAt: new Date().toISOString() });
    writeJSON('homework.json', all);
    sendJSON(res, 200, { ok: true, count: all.length });
    return;
  }

  // GET /api/homework — load homework (需登录)
  if (route === '/api/homework' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const all = readJSON('homework.json') || [];
    sendJSON(res, 200, all.filter(h => h.userId === user.id));
    return;
  }

  // POST /api/upload — file upload for homework (需登录, multipart)
  if (route === '/api/upload' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }

    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      sendJSON(res, 400, { error: '需要 multipart/form-data' });
      return;
    }

    const boundary = '--' + contentType.split('boundary=')[1];
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const body = buffer.toString('binary');
      const parts = body.split(boundary).slice(1, -1);

      let fileData = null, fileName = '', courseId = '', lessonIdx = '';

      for (const part of parts) {
        const headerEnd = part.indexOf('\r\n\r\n');
        const header = part.slice(0, headerEnd);
        const content = part.slice(headerEnd + 4, part.endsWith('\r\n') ? part.length - 2 : part.length);

        if (header.includes('filename=')) {
          const nameMatch = header.match(/filename="(.+?)"/);
          if (nameMatch) fileName = nameMatch[1];
          fileData = Buffer.from(content, 'binary');
        } else if (header.includes('name="courseId"')) {
          courseId = content.trim();
        } else if (header.includes('name="lessonIdx"')) {
          lessonIdx = content.trim();
        }
      }

      if (!fileData || !fileName) {
        sendJSON(res, 400, { error: '未找到上传文件' });
        return;
      }

      const uploadDir = path.join(DATA_DIR, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const safeName = Date.now() + '_' + fileName.replace(/[^a-zA-Z0-9._\-一-鿿]/g, '_');
      const filePath = path.join(uploadDir, safeName);
      fs.writeFileSync(filePath, fileData);

      // Save record
      const all = readJSON('homework.json') || [];
      all.push({
        userId: user.id,
        courseId,
        lessonIdx,
        type: 'file',
        fileName,
        storedName: safeName,
        size: fileData.length,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      });
      writeJSON('homework.json', all);

      sendJSON(res, 200, { ok: true, fileName, storedName: safeName });
    });
    return;
  }

  // GET /api/uploads/:name — serve uploaded files
  if (route.startsWith('/api/uploads/') && req.method === 'GET') {
    const fileName = route.replace('/api/uploads/', '');
    const safeName = fileName.replace(/[^a-zA-Z0-9._\-]/g, '');
    const filePath = path.join(DATA_DIR, 'uploads', safeName);
    if (!fs.existsSync(filePath)) {
      sendJSON(res, 404, { error: '文件未找到' });
      return;
    }
    const ext = path.extname(filePath);
    const contentType = MIME[ext] || 'application/octet-stream';
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': data.length });
    res.end(data);
    return;
  }

  // GET /api/status — health check with LAN info
  if (route === '/api/status' && req.method === 'GET') {
    const os = require('os');
    const ifaces = os.networkInterfaces();
    const ips = [];
    for (const name of Object.keys(ifaces)) {
      for (const iface of ifaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          ips.push({ name, ip: iface.address });
        }
      }
    }
    sendJSON(res, 200, {
      status: 'running',
      port: PORT,
      lanIPs: ips,
      aiModel: DEEPSEEK_MODEL,
      uptime: process.uptime(),
    });
    return;
  }

  // ── 评价互评（论坛发帖）API ──

  // GET /api/posts?lessonKey=1_0 — 获取某课时所有帖子（公开）
  if (route === '/api/posts' && req.method === 'GET') {
    const lessonKey = url.searchParams.get('lessonKey') || '';
    const all = readJSON(POSTS_FILE) || [];
    const comments = readJSON(COMMENTS_FILE) || [];
    const posts = all
      .filter(p => p.lessonKey === lessonKey)
      .sort((a, b) => b.id - a.id)
      .map(p => ({
        ...p,
        commentCount: comments.filter(c => c.postId === p.id).length
      }));
    sendJSON(res, 200, posts);
    return;
  }

  // POST /api/posts — 发帖（需登录）
  if (route === '/api/posts' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const body = await parseBody(req);
    const lessonKey = (body.lessonKey || '').trim();
    const content = (body.content || '').trim();
    if (!lessonKey || !content) {
      sendJSON(res, 400, { error: '课程和内容不能为空' });
      return;
    }
    if (content.length > 2000) {
      sendJSON(res, 400, { error: '内容不能超过2000字' });
      return;
    }
    const all = readJSON(POSTS_FILE) || [];
    const post = {
      id: Date.now(),
      lessonKey,
      userId: user.id,
      username: user.username,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
    };
    all.push(post);
    writeJSON(POSTS_FILE, all);
    sendJSON(res, 201, { ...post, commentCount: 0 });
    console.log(`[帖子] ${user.username} 在 ${lessonKey} 发了新帖`);
    return;
  }

  // DELETE /api/posts/:id — 删除帖子（需登录，仅作者或教师可删）
  if (req.method === 'DELETE' && route.match(/^\/api\/posts\/(\d+)$/)) {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const postId = parseInt(route.match(/^\/api\/posts\/(\d+)$/)[1], 10);
    if (!postId) { sendJSON(res, 400, { error: '无效的帖子ID' }); return; }
    const all = readJSON(POSTS_FILE) || [];
    const idx = all.findIndex(p => p.id === postId);
    if (idx < 0) { sendJSON(res, 404, { error: '帖子不存在' }); return; }
    if (all[idx].userId !== user.id && user.role !== 'teacher') {
      sendJSON(res, 403, { error: '仅作者或教师可删除' });
      return;
    }
    all.splice(idx, 1);
    writeJSON(POSTS_FILE, all);
    // 同步删除该帖子的所有评论
    const comments = readJSON(COMMENTS_FILE) || [];
    const filtered = comments.filter(c => c.postId !== postId);
    if (filtered.length !== comments.length) writeJSON(COMMENTS_FILE, filtered);
    console.log(`[帖子] ${user.username} 删除了帖子 ${postId}`);
    sendJSON(res, 200, { ok: true });
    return;
  }

  // POST /api/posts/:id/like — 切换点赞（需登录）
  if (route.startsWith('/api/posts/') && route.endsWith('/like') && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const postId = parseInt(route.split('/')[3], 10);
    if (!postId) { sendJSON(res, 400, { error: '无效的帖子ID' }); return; }
    const all = readJSON(POSTS_FILE) || [];
    const post = all.find(p => p.id === postId);
    if (!post) { sendJSON(res, 404, { error: '帖子不存在' }); return; }
    if (!post.likes) post.likes = [];
    const idx = post.likes.indexOf(user.id);
    if (idx >= 0) {
      post.likes.splice(idx, 1); // 取消点赞
    } else {
      post.likes.push(user.id); // 点赞
    }
    writeJSON(POSTS_FILE, all);
    sendJSON(res, 200, { likes: post.likes, liked: idx < 0 });
    return;
  }

  // GET /api/posts/:id/comments — 获取评论列表（公开）
  if (route.startsWith('/api/posts/') && route.endsWith('/comments') && req.method === 'GET') {
    const postId = parseInt(route.split('/')[3], 10);
    if (!postId) { sendJSON(res, 400, { error: '无效的帖子ID' }); return; }
    const all = readJSON(COMMENTS_FILE) || [];
    const postComments = all
      .filter(c => c.postId === postId)
      .sort((a, b) => a.id - b.id); // 按时间正序
    sendJSON(res, 200, postComments);
    return;
  }

  // POST /api/posts/:id/comments — 添加评论（需登录）
  if (route.startsWith('/api/posts/') && route.endsWith('/comments') && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const postId = parseInt(route.split('/')[3], 10);
    if (!postId) { sendJSON(res, 400, { error: '无效的帖子ID' }); return; }
    const allPosts = readJSON(POSTS_FILE) || [];
    if (!allPosts.find(p => p.id === postId)) {
      sendJSON(res, 404, { error: '帖子不存在' });
      return;
    }
    const body = await parseBody(req);
    const content = (body.content || '').trim();
    if (!content) { sendJSON(res, 400, { error: '评论内容不能为空' }); return; }
    if (content.length > 1000) {
      sendJSON(res, 400, { error: '评论不能超过1000字' });
      return;
    }
    const all = readJSON(COMMENTS_FILE) || [];
    const comment = {
      id: Date.now(),
      postId,
      userId: user.id,
      username: user.username,
      content,
      createdAt: new Date().toISOString(),
    };
    all.push(comment);
    writeJSON(COMMENTS_FILE, all);
    sendJSON(res, 201, comment);
    console.log(`[评论] ${user.username} 评论了帖子 ${postId}`);
    return;
  }

  // ── 教师端：活动发布 ──

  // GET /api/publish-state?lessonKey=1_0 — 获取发布状态（公开）
  if (route === '/api/publish-state' && req.method === 'GET') {
    const lessonKey = url.searchParams.get('lessonKey') || '';
    let all = readJSON('publish_state.json') || {};
    if (Array.isArray(all)) all = {}; // 修复旧数据可能为数组的问题
    const user = authUser(req);
    sendJSON(res, 200, {
      published: all[lessonKey] || [],
      isTeacher: user && user.role === 'teacher'
    });
    return;
  }

  // POST /api/teacher/publish — 发布活动（需教师权限）
  if (route === '/api/teacher/publish' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    if (user.role !== 'teacher') { sendJSON(res, 403, { error: '需要教师权限' }); return; }
    const body = await parseBody(req);
    const lessonKey = (body.lessonKey || '').trim();
    const idx = parseInt(body.activityIndex, 10);
    if (!lessonKey || isNaN(idx)) { sendJSON(res, 400, { error: '参数错误' }); return; }
    let all = readJSON('publish_state.json') || {};
    if (Array.isArray(all)) all = {};
    if (!all[lessonKey]) all[lessonKey] = [];
    if (!all[lessonKey].includes(idx)) all[lessonKey].push(idx);
    writeJSON('publish_state.json', all);
    sendJSON(res, 200, { ok: true, published: all[lessonKey] });
    console.log(`[发布] 教师 ${user.username} 发布了 ${lessonKey} 活动${idx}`);
    return;
  }

  // POST /api/teacher/unpublish — 取消发布（需教师权限）
  if (route === '/api/teacher/unpublish' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    if (user.role !== 'teacher') { sendJSON(res, 403, { error: '需要教师权限' }); return; }
    const body = await parseBody(req);
    const lessonKey = (body.lessonKey || '').trim();
    const idx = parseInt(body.activityIndex, 10);
    if (!lessonKey || isNaN(idx)) { sendJSON(res, 400, { error: '参数错误' }); return; }
    let all = readJSON('publish_state.json') || {};
    if (Array.isArray(all)) all = {};
    if (all[lessonKey]) all[lessonKey] = all[lessonKey].filter(i => i !== idx);
    writeJSON('publish_state.json', all);
    sendJSON(res, 200, { ok: true, published: all[lessonKey] || [] });
    console.log(`[发布] 教师 ${user.username} 取消发布了 ${lessonKey} 活动${idx}`);
    return;
  }

  // ── 创作工坊 API ──

  // GET /api/works?lessonKey=4_1 — 获取用户作品（需登录）
  if (route === '/api/works' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const lessonKey = url.searchParams.get('lessonKey') || '';
    const all = readJSON(WORKS_FILE) || [];
    const userId = url.searchParams.get('userId');
    let works;
    if (user.role === 'teacher') {
      // 教师可查看所有学生作品，或按userId筛选
      works = userId ? all.filter(w => w.userId === userId) : all;
    } else {
      works = all.filter(w => w.userId === user.id);
    }
    if (lessonKey) works = works.filter(w => w.lessonKey === lessonKey);
    works.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    sendJSON(res, 200, works);
    return;
  }

  // POST /api/works — 保存/提交作品（需登录）
  if (route === '/api/works' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const body = await parseBody(req);
    const lessonKey = (body.lessonKey || '').trim();
    const workType = (body.workType || '').trim();
    const title = (body.title || '').trim();
    const content = (body.content || '').trim();
    const status = body.status || 'draft';
    if (!lessonKey || !workType) {
      sendJSON(res, 400, { error: '课程和创作类型不能为空' });
      return;
    }
    const all = readJSON(WORKS_FILE) || [];
    // 同一用户同一课时的作品只保留最新一份（覆盖）
    const idx = all.findIndex(w => w.userId === user.id && w.lessonKey === lessonKey && w.workType === workType);
    const now = new Date().toISOString();
    const work = {
      id: body.id || Date.now(),
      userId: user.id,
      username: user.username,
      lessonKey,
      workType,
      title,
      content,
      aiComparison: body.aiComparison || '',
      comparisonAnalysis: body.comparisonAnalysis || '',
      status,
      createdAt: (idx >= 0 && all[idx].createdAt) ? all[idx].createdAt : now,
      updatedAt: now,
    };
    if (idx >= 0) {
      all[idx] = work;
    } else {
      all.push(work);
    }
    writeJSON(WORKS_FILE, all);
    sendJSON(res, 200, { ok: true, work });
    console.log(`[创作] ${user.username} 保存了${workType}作品 (${status})`);
    return;
  }

  // POST /api/ai/compare — AI生成对比作品（需登录）
  if (route === '/api/ai/compare' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const body = await parseBody(req);
    const workType = (body.workType || '').trim();
    const title = (body.title || '').trim();
    const content = (body.content || '').trim();
    if (!workType || !title) {
      sendJSON(res, 400, { error: '请提供创作类型和标题' });
      return;
    }
    // 构建prompt：告诉AI学生选了什么类型、写了什么，请AI生成同主题作品
    const typeNames = { poster: '科普海报文案', news: '中文新闻报道+英文简介', script: '短视频脚本' };
    const prompt = `学生选择的创作类型：${typeNames[workType] || workType}
学生作品标题：${title}
学生作品内容：${content.substring(0, 300)}

请根据以上信息，生成一份同主题的${typeNames[workType] || workType}。`;

    try {
      const aiWork = await callCompareAPI([{ role: 'user', content: prompt }]);
      sendJSON(res, 200, { aiWork, timestamp: new Date().toISOString() });
      console.log(`[AI对比] ${user.username} 请求了${workType}类型对比`);
    } catch (err) {
      console.log(`[AI对比] 失败: ${err.message}`);
      sendJSON(res, 200, {
        aiWork: `[AI对比生成失败：${err.message}]\n\n请稍后重试，或联系教师手动触发对比。\n\n—— AI生成，用于课堂教学对比`,
        source: 'fallback'
      });
    }
    return;
  }

  // ── 教师端 API ──

  // GET /api/teacher/roster — 班级学生名册（需教师）
  if (route === '/api/teacher/roster' && req.method === 'GET') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可访问' }); return; }
    const users = (readJSON(USERS_FILE) || []).filter(u => u.role === 'student');
    const progress = readJSON('progress.json') || {};
    const works = readJSON(WORKS_FILE) || [];
    const roster = users.map(s => {
      const p = progress[s.id] || {};
      const completed = Object.values(p).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
      const sw = works.filter(w => w.userId === s.id);
      return {
        id: s.id, username: s.username,
        enrolled: Object.keys(p).length,
        completed,
        works: sw.length,
        submitted: sw.filter(w => w.status === 'submitted').length,
        lastActive: sw.length ? sw.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))[0].updatedAt : s.createdAt,
      };
    });
    roster.sort((a, b) => b.completed - a.completed);
    sendJSON(res, 200, roster);
    return;
  }

  // GET /api/teacher/dashboard — 学情仪表盘（需教师）
  if (route === '/api/teacher/dashboard' && req.method === 'GET') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可访问' }); return; }
    const users = (readJSON(USERS_FILE) || []).filter(u => u.role === 'student');
    const progress = readJSON('progress.json') || {};
    const works = readJSON(WORKS_FILE) || [];
    const posts = readJSON(POSTS_FILE) || [];
    const comments = readJSON(COMMENTS_FILE) || [];

    let totalCompleted = 0, totalLessons = users.length * 12;
    const moduleStats = { '1': 0, '2': 0, '3': 0, '4': 0 };
    for (const s of users) {
      const p = progress[s.id] || {};
      for (const [key, arr] of Object.entries(p)) {
        if (Array.isArray(arr)) {
          totalCompleted += arr.length;
          const mod = key.split('_')[0];
          if (moduleStats[mod] !== undefined) moduleStats[mod] += arr.length;
        }
      }
    }
    sendJSON(res, 200, {
      studentCount: users.length,
      totalCompleted,
      totalLessons,
      completionRate: totalLessons ? Math.round(totalCompleted / totalLessons * 100) : 0,
      moduleStats,
      worksTotal: works.length,
      worksSubmitted: works.filter(w => w.status === 'submitted').length,
      postsTotal: posts.length,
      commentsTotal: comments.length,
      activeToday: works.filter(w => w.updatedAt && new Date(w.updatedAt).toDateString() === new Date().toDateString()).length,
    });
    return;
  }

  // GET /api/reviews?workId=... — 获取评阅
  if (route === '/api/reviews' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const workId = url.searchParams.get('workId');
    const all = readJSON(REVIEWS_FILE) || [];
    const reviews = workId ? all.filter(r => r.workId === workId) : all;
    sendJSON(res, 200, reviews);
    return;
  }

  // POST /api/reviews — 教师评阅（需教师）
  if (route === '/api/reviews' && req.method === 'POST') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可评阅' }); return; }
    const body = await parseBody(req);
    const workId = body.workId;
    const score = parseFloat(body.score) || 0;
    const comment = (body.comment || '').trim();
    if (!workId) { sendJSON(res, 400, { error: '缺少作品ID' }); return; }
    const all = readJSON(REVIEWS_FILE) || [];
    const idx = all.findIndex(r => r.workId === workId && r.teacherId === user.id);
    const review = {
      id: Date.now(),
      workId,
      teacherId: user.id,
      teacherName: user.username,
      score: Math.min(100, Math.max(0, score)),
      comment,
      createdAt: new Date().toISOString(),
    };
    if (idx >= 0) { all[idx] = review; } else { all.push(review); }
    writeJSON(REVIEWS_FILE, all);
    sendJSON(res, 200, { ok: true, review });
    console.log(`[评阅] ${user.username} 评阅了作品 ${workId}，评分 ${score}`);
    return;
  }

  // GET /api/teacher/summary — 评价汇总（需教师）
  if (route === '/api/teacher/summary' && req.method === 'GET') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可访问' }); return; }
    const posts = readJSON(POSTS_FILE) || [];
    const comments = readJSON(COMMENTS_FILE) || [];
    const works = readJSON(WORKS_FILE) || [];
    // Group by lesson
    const byLesson = {};
    for (const p of posts) {
      const k = p.lessonKey || 'unknown';
      if (!byLesson[k]) byLesson[k] = { posts: 0, comments: 0, likes: 0, works: 0 };
      byLesson[k].posts++;
      byLesson[k].likes += (p.likes || []).length;
    }
    for (const c of comments) {
      const post = posts.find(p => p.id === c.postId);
      const k = post ? post.lessonKey : 'unknown';
      if (!byLesson[k]) byLesson[k] = { posts: 0, comments: 0, likes: 0, works: 0 };
      byLesson[k].comments++;
    }
    for (const w of works) {
      const k = w.lessonKey || 'unknown';
      if (!byLesson[k]) byLesson[k] = { posts: 0, comments: 0, likes: 0, works: 0 };
      byLesson[k].works++;
    }
    sendJSON(res, 200, { byLesson, totalPosts: posts.length, totalComments: comments.length, totalWorks: works.length });
    return;
  }

  // POST /api/ai/analysis — AI学情分析（需教师）
  if (route === '/api/ai/analysis' && req.method === 'POST') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可访问' }); return; }
    const body = await parseBody(req);
    const { roster, dashboard } = body;
    const prompt = `班级数据概览：
学生${dashboard.studentCount}人，整体完成率${dashboard.completionRate}%。
模块通过情况：模块一${dashboard.moduleStats['1']||0}次，模块二${dashboard.moduleStats['2']||0}次，模块三${dashboard.moduleStats['3']||0}次，模块四${dashboard.moduleStats['4']||0}次。
提交作品${dashboard.worksSubmitted}份，讨论帖${dashboard.postsTotal}条。

学生简要数据：${JSON.stringify((roster||[]).slice(0, 20).map(s => ({ name: s.username, completed: s.completed, works: s.works, submitted: s.submitted })))}

请根据以上数据生成教学洞察。`;

    try {
      const analysis = await callCompareAPI([{ role: 'user', content: prompt }], ANALYSIS_SYSTEM_PROMPT);
      sendJSON(res, 200, { analysis, timestamp: new Date().toISOString() });
      console.log(`[AI分析] ${user.username} 请求了学情分析`);
    } catch (err) {
      sendJSON(res, 200, { analysis: `[AI分析生成失败：${err.message}]\n\n请稍后重试。\n\n—— AI生成，仅供教师参考`, source: 'fallback' });
    }
    return;
  }

  // ── 词云（小组协作共享）API ──

  // GET /api/wordcloud?lessonKey=1_2 — 获取词云数据（按小组）
  if (route === '/api/wordcloud' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const lessonKey = (url.searchParams.get('lessonKey') || '').trim();
    if (!lessonKey) { sendJSON(res, 400, { error: '缺少课程参数' }); return; }
    const group = getUserGroup(user.id);
    const cloudKey = getWordCloudKey(lessonKey, group ? group.id : null, user.id);
    const all = readJSON(WORDCLOUD_FILE) || {};
    const data = all[cloudKey] || { keywords: [] };

    sendJSON(res, 200, {
      keywords: data.keywords || [],
      groupId: group ? group.id : null,
      groupName: group ? group.name : null,
      contributors: data.contributors || (data.keywords && data.keywords.length ? [user.username] : []),
    });
    return;
  }

  // POST /api/wordcloud — 保存词云数据（按小组共享）
  if (route === '/api/wordcloud' && req.method === 'POST') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }
    const body = await parseBody(req);
    const lessonKey = (body.lessonKey || '').trim();
    const keywords = body.keywords || [];
    if (!lessonKey) { sendJSON(res, 400, { error: '缺少课程参数' }); return; }

    const group = getUserGroup(user.id);
    const cloudKey = getWordCloudKey(lessonKey, group ? group.id : null, user.id);
    const all = readJSON(WORDCLOUD_FILE) || {};

    // 合并贡献者列表
    const existing = all[cloudKey] || { keywords: [], contributors: [] };
    const contributors = existing.contributors || [];
    if (!contributors.includes(user.username)) {
      contributors.push(user.username);
    }

    all[cloudKey] = {
      keywords: keywords,
      groupId: group ? group.id : null,
      groupName: group ? group.name : null,
      contributors: contributors,
      updatedAt: new Date().toISOString(),
    };
    writeJSON(WORDCLOUD_FILE, all);
    sendJSON(res, 200, { ok: true, groupId: group ? group.id : null });
    console.log(`[词云] ${user.username} 更新了 ${lessonKey} 的词云 (${group ? group.name : '个人模式'})`);
    return;
  }

  // ── 小组管理 API（教师专用） ──

  // GET /api/groups — 获取所有小组（教师）或当前用户小组（学生）
  if (route === '/api/groups' && req.method === 'GET') {
    const user = authUser(req);
    if (!user) { sendJSON(res, 401, { error: '请先登录' }); return; }

    if (user.role === 'teacher') {
      const groups = readJSON(GROUPS_FILE) || [];
      // 补充每个小组成员的用户名
      const users = readJSON(USERS_FILE) || [];
      const enriched = groups.map(g => ({
        ...g,
        memberDetails: (g.members || []).map(mid => {
          const u = users.find(u => u.id === mid);
          return u ? { id: u.id, username: u.username } : { id: mid, username: '未知' };
        })
      }));
      sendJSON(res, 200, enriched);
    } else {
      const group = getUserGroup(user.id);
      sendJSON(res, 200, group ? [group] : []);
    }
    return;
  }

  // POST /api/groups — 创建小组（教师）
  if (route === '/api/groups' && req.method === 'POST') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可操作' }); return; }
    const body = await parseBody(req);
    const name = (body.name || '').trim();
    if (!name) { sendJSON(res, 400, { error: '小组名称不能为空' }); return; }
    const groups = readJSON(GROUPS_FILE) || [];
    const maxId = groups.reduce((max, g) => Math.max(max, g.id || 0), 0);
    const newGroup = {
      id: maxId + 1,
      name: name,
      members: [],
      createdAt: new Date().toISOString(),
    };
    groups.push(newGroup);
    writeJSON(GROUPS_FILE, groups);
    sendJSON(res, 201, newGroup);
    console.log(`[小组] 教师 ${user.username} 创建了小组: ${name}`);
    return;
  }

  // PUT /api/groups/:id — 更新小组名称（教师）
  if (route.match(/^\/api\/groups\/\d+$/) && req.method === 'PUT') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可操作' }); return; }
    const groupId = parseInt(route.split('/')[3], 10);
    const body = await parseBody(req);
    const name = (body.name || '').trim();
    if (!name) { sendJSON(res, 400, { error: '小组名称不能为空' }); return; }
    const groups = readJSON(GROUPS_FILE) || [];
    const idx = groups.findIndex(g => g.id === groupId);
    if (idx < 0) { sendJSON(res, 404, { error: '小组不存在' }); return; }
    groups[idx].name = name;
    writeJSON(GROUPS_FILE, groups);
    sendJSON(res, 200, groups[idx]);
    console.log(`[小组] 教师 ${user.username} 更新了小组名称: ${name}`);
    return;
  }

  // DELETE /api/groups/:id — 删除小组（教师）
  if (route.match(/^\/api\/groups\/\d+$/) && req.method === 'DELETE') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可操作' }); return; }
    const groupId = parseInt(route.split('/')[3], 10);
    const groups = readJSON(GROUPS_FILE) || [];
    const filtered = groups.filter(g => g.id !== groupId);
    if (filtered.length === groups.length) { sendJSON(res, 404, { error: '小组不存在' }); return; }
    writeJSON(GROUPS_FILE, filtered);
    sendJSON(res, 200, { ok: true });
    console.log(`[小组] 教师 ${user.username} 删除了小组 ${groupId}`);
    return;
  }

  // POST /api/groups/:id/members — 添加成员到小组（教师）
  if (route.match(/^\/api\/groups\/\d+\/members$/) && req.method === 'POST') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可操作' }); return; }
    const groupId = parseInt(route.split('/')[3], 10);
    const body = await parseBody(req);
    const memberId = (body.userId || '').trim();
    if (!memberId) { sendJSON(res, 400, { error: '缺少用户ID' }); return; }
    const groups = readJSON(GROUPS_FILE) || [];
    const group = groups.find(g => g.id === groupId);
    if (!group) { sendJSON(res, 404, { error: '小组不存在' }); return; }
    if (!group.members) group.members = [];

    // 从其他小组中移除该学生
    for (const g of groups) {
      if (g.id !== groupId && g.members) {
        g.members = g.members.filter(m => m !== memberId);
      }
    }

    if (!group.members.includes(memberId)) {
      group.members.push(memberId);
    }
    writeJSON(GROUPS_FILE, groups);

    const users = readJSON(USERS_FILE) || [];
    const memberUser = users.find(u => u.id === memberId);
    sendJSON(res, 200, { ok: true, group });
    console.log(`[小组] 教师 ${user.username} 将 ${memberUser ? memberUser.username : memberId} 加入 ${group.name}`);
    return;
  }

  // DELETE /api/groups/:id/members/:userId — 移除成员（教师）
  if (route.match(/^\/api\/groups\/\d+\/members\/[\w-]+$/) && req.method === 'DELETE') {
    const user = authUser(req);
    if (!user || user.role !== 'teacher') { sendJSON(res, 403, { error: '仅教师可操作' }); return; }
    const parts = route.split('/');
    const groupId = parseInt(parts[3], 10);
    const memberId = parts[5];
    const groups = readJSON(GROUPS_FILE) || [];
    const group = groups.find(g => g.id === groupId);
    if (!group) { sendJSON(res, 404, { error: '小组不存在' }); return; }
    if (group.members) {
      group.members = group.members.filter(m => m !== memberId);
    }
    writeJSON(GROUPS_FILE, groups);

    const users = readJSON(USERS_FILE) || [];
    const memberUser = users.find(u => u.id === memberId);
    sendJSON(res, 200, { ok: true, group });
    console.log(`[小组] 教师 ${user.username} 将 ${memberUser ? memberUser.username : memberId} 移出 ${group.name}`);
    return;
  }

  // 404 for unknown API routes
  sendJSON(res, 404, { error: 'API route not found' });
}

// ── Static file server (gzip + ETag) ──
const COMPRESSIBLE = new Set([
  '.html', '.css', '.js', '.json', '.svg', '.xml', '.txt', '.md', '.csv'
]);

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    handleAPI(req, res);
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  filePath = path.join(__dirname, filePath);

  // Prevent directory traversal
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(__dirname))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // If path is a directory, try index.html
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch { filePath = null; }

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1>');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';
  const compressible = COMPRESSIBLE.has(ext);

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(err.code === 'ENOENT' ? `<h1>404</h1><p>${req.url}</p>` : 'Internal Server Error');
      return;
    }

    // ETag: mtime + size
    const etag = `"${stat.mtimeMs.toString(36)}-${stat.size.toString(36)}"`;
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === etag) {
      res.writeHead(304, { 'ETag': etag });
      res.end();
      return;
    }

    // Gzip check
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const doGzip = compressible && acceptEncoding.includes('gzip') && stat.size > 512;

    if (!doGzip) {
      fs.readFile(filePath, (readErr, data) => {
        if (readErr) { res.writeHead(500); res.end(); return; }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': data.length,
          'ETag': etag,
          'Cache-Control': 'public, max-age=300',
        });
        res.end(data);
      });
      return;
    }

    // Gzip on-the-fly
    const raw = fs.createReadStream(filePath);
    const gzip = zlib.createGzip({ level: 6 });
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Encoding': 'gzip',
      'ETag': etag,
      'Cache-Control': 'public, max-age=300',
      'Vary': 'Accept-Encoding',
    });
    raw.pipe(gzip).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  console.log('');
  console.log('  ═══════════════════════════════════════════');
  console.log('   人机共跑 — 跨学科PBL教学平台');
  console.log('  ═══════════════════════════════════════════');
  console.log('');
  console.log(`  ✅ 服务已启动:  http://localhost:${PORT}`);
  console.log(`  🤖 AI模型:     DeepSeek ${DEEPSEEK_MODEL}`);
  console.log('');
  console.log('  📱 局域网访问地址:');
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`     http://${iface.address}:${PORT}  (${name})`);
      }
    }
  }
  console.log('');
  console.log('  按 Ctrl+C 停止服务');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n  正在关闭服务...');
  process.exit(0);
});
