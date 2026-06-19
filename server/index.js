import express from 'express';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-before-production';
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const uploadsRoot = path.join(__dirname, '..', 'public', 'uploads');
const allowedUploadTypes = new Set(['gallery', 'news', 'logo']);
const defaultSiteInfo = {
  site_name: 'Mater Dei Erudite School',
  logo_url: '/images/logo.png',
  updated_at: ''
};

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsRoot));

async function readDb() {
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

async function ensureDefaultPrincipal() {
  const db = await readDb();
  let changed = false;
  if (!db.site_settings) {
    db.site_settings = db.siteinfo?.map((item) => ({
      id: item.id || randomUUID(),
      site_name: item.site_name || item.name || defaultSiteInfo.site_name,
      logo_url: item.logo_url || item.logo || defaultSiteInfo.logo_url,
      updated_at: item.updated_at || item.updatedAt || new Date().toISOString()
    })) || [
      {
        id: 'default-site-settings',
        site_name: defaultSiteInfo.site_name,
        logo_url: defaultSiteInfo.logo_url,
        updated_at: new Date().toISOString()
      }
    ];
    changed = true;
  }
  if (db.users.length > 0) {
    if (changed) await writeDb(db);
    return;
  }
  const passwordHash = await bcrypt.hash('@principal codex', 10);
  db.users.push({
    id: randomUUID(),
    name: 'Principal',
    email: 'principal@materdei.local',
    passwordHash,
    role: 'admin',
    createdAt: new Date().toISOString()
  });
  changed = true;
  if (changed) await writeDb(db);
}

async function deleteStoredFile(publicUrl) {
  if (!publicUrl?.startsWith('/uploads/')) return;
  const cleanUrl = publicUrl.split('?')[0];
  const relativePath = cleanUrl.replace('/uploads/', '');
  const resolvedPath = path.resolve(uploadsRoot, relativePath);
  if (!resolvedPath.startsWith(path.resolve(uploadsRoot))) return;
  await fs.unlink(resolvedPath).catch(() => {});
}

function withCacheBust(url, updatedAt) {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  const version = encodeURIComponent(updatedAt || Date.now());
  return `${url}${separator}v=${version}`;
}

function getCurrentSiteSettings(db) {
  const current = db.site_settings?.[0] || {};
  return {
    id: current.id || 'default-site-settings',
    site_name: current.site_name || defaultSiteInfo.site_name,
    logo_url: current.logo_url || defaultSiteInfo.logo_url,
    updated_at: current.updated_at || ''
  };
}

function normalizeRecord(input, existing = {}) {
  const normalized = { ...existing };

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if ((key === 'image_url' || key === 'filePath') && value === '') continue;
    normalized[key] = value;
  }

  const nextImageUrl = input.image_url || input.filePath;
  normalized.image_url = nextImageUrl || existing.image_url || existing.filePath || '';
  normalized.filePath = normalized.image_url;
  return normalized;
}

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing auth token' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const type = req.params.type || 'logo';
    if (!allowedUploadTypes.has(type)) return cb(new Error('Invalid upload type'));
    const folder = path.join(uploadsRoot, type);
    await fs.mkdir(folder, { recursive: true });
    return cb(null, folder);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-z0-9._-]/gi, '-').toLowerCase();
    const prefix = req.params.type || 'logo';
    cb(null, `${prefix}_${Date.now()}_${safeName}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const type = req.params.type || 'logo';
    const isLogoImage = type === 'logo' && ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(file.mimetype);
    const isMedia = type !== 'logo' && (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/'));

    if (isLogoImage || isMedia) {
      cb(null, true);
      return;
    }
    cb(new Error(type === 'logo' ? 'Only PNG, SVG, JPG, and JPEG logo uploads are allowed' : 'Only image and video uploads are allowed'));
  },
  limits: { fileSize: 50 * 1024 * 1024 }
});

app.post('/api/auth/register', async (req, res) => {
  const { name = 'Admin', email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const db = await readDb();
  const exists = db.users.some((user) => user.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(409).json({ message: 'User already exists' });

  const user = {
    id: randomUUID(),
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  await writeDb(db);

  res.status(201).json({
    token: signToken(user),
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email = 'principal@materdei.local', password } = req.body;
  if (!password) return res.status(400).json({ message: 'Password is required' });

  const db = await readDb();
  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid login details' });
  }

  res.json({
    token: signToken(user),
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

app.get('/api/siteinfo', async (req, res) => {
  const db = await readDb();
  const settings = getCurrentSiteSettings(db);
  res.json({
    name: settings.site_name,
    logo: withCacheBust(settings.logo_url, settings.updated_at),
    site_name: settings.site_name,
    logo_url: withCacheBust(settings.logo_url, settings.updated_at),
    updated_at: settings.updated_at
  });
});

app.get('/api/site-settings', async (req, res) => {
  const db = await readDb();
  const settings = getCurrentSiteSettings(db);
  res.json({
    ...settings,
    logo_url: withCacheBust(settings.logo_url, settings.updated_at)
  });
});

app.post('/api/site-settings/logo', authMiddleware, upload.single('file'), async (req, res) => {
  const db = await readDb();
  const currentSettings = getCurrentSiteSettings(db);
  const uploadedLogoUrl = req.file ? `/uploads/logo/${req.file.filename}` : '';
  const nextLogoUrl = uploadedLogoUrl || currentSettings.logo_url;
  const updatedAt = new Date().toISOString();

  if (uploadedLogoUrl && currentSettings.logo_url && uploadedLogoUrl !== currentSettings.logo_url) {
    await deleteStoredFile(currentSettings.logo_url);
  }

  const nextSettings = {
    id: currentSettings.id || randomUUID(),
    site_name: req.body.site_name || currentSettings.site_name,
    logo_url: nextLogoUrl,
    updated_at: updatedAt
  };

  db.site_settings = [nextSettings];
  db.logo = Array.isArray(db.logo) ? db.logo : [];
  if (uploadedLogoUrl) {
    db.logo.unshift({
      id: randomUUID(),
      title: 'Site logo',
      description: nextLogoUrl,
      date: updatedAt.slice(0, 10),
      image_url: nextLogoUrl,
      filePath: nextLogoUrl,
      fileType: req.file.mimetype.startsWith('video/') ? 'video' : 'image'
    });
  }

  await writeDb(db);
  res.json({
    ok: true,
    settings: {
      ...nextSettings,
      logo_url: withCacheBust(nextSettings.logo_url, nextSettings.updated_at)
    }
  });
});

app.post('/api/upload/:type', authMiddleware, upload.single('file'), async (req, res) => {
  const type = req.params.type;
  if (!allowedUploadTypes.has(type)) return res.status(400).json({ message: 'Invalid upload type' });
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const fileInfo = {
    path: `/uploads/${type}/${req.file.filename}`,
    image_url: `/uploads/${type}/${req.file.filename}`,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    fileType: req.file.mimetype.startsWith('video/') ? 'video' : 'image'
  };

  res.status(201).json({
    ...fileInfo
  });
});

app.get('/api/public/:section', async (req, res) => {
  const db = await readDb();
  res.json(db[req.params.section] || []);
});

app.get('/api/admin/:section', authMiddleware, async (req, res) => {
  const db = await readDb();
  res.json(db[req.params.section] || []);
});

app.post('/api/admin/:section', authMiddleware, async (req, res) => {
  const db = await readDb();
  const section = req.params.section;
  if (!Array.isArray(db[section])) db[section] = [];
  const item = normalizeRecord({ id: randomUUID(), ...req.body });
  db[section].unshift(item);
  if (section === 'logo' && item.image_url) {
    db.site_settings = [{ id: randomUUID(), site_name: defaultSiteInfo.site_name, logo_url: item.image_url, updated_at: new Date().toISOString() }];
  }
  await writeDb(db);
  res.status(201).json(item);
});

app.put('/api/admin/:section/:id', authMiddleware, async (req, res) => {
  const db = await readDb();
  const section = req.params.section;
  const rows = db[section] || [];
  const currentIndex = rows.findIndex((item) => item.id === req.params.id);
  if (currentIndex === -1) return res.status(404).json({ message: 'Record not found' });

  const currentRow = rows[currentIndex];
  const updatedRow = normalizeRecord(req.body, currentRow);
  const oldImageUrl = currentRow.image_url || currentRow.filePath;
  const newImageUrl = updatedRow.image_url;

  if (newImageUrl && oldImageUrl && newImageUrl !== oldImageUrl) {
    await deleteStoredFile(oldImageUrl);
  }

  rows[currentIndex] = updatedRow;
  db[section] = rows;

  if (section === 'logo' && updatedRow.image_url) {
    db.site_settings = [{ id: randomUUID(), site_name: defaultSiteInfo.site_name, logo_url: updatedRow.image_url, updated_at: new Date().toISOString() }];
  }

  await writeDb(db);
  res.json({ ok: true, item: updatedRow });
});

app.delete('/api/admin/:section/:id', authMiddleware, async (req, res) => {
  const db = await readDb();
  const section = req.params.section;
  const rows = db[section] || [];
  const rowToDelete = rows.find((item) => item.id === req.params.id);
  if (!rowToDelete) return res.status(404).json({ message: 'Record not found' });

  await deleteStoredFile(rowToDelete.image_url || rowToDelete.filePath);
  db[section] = rows.filter((item) => item.id !== req.params.id);

  if (section === 'logo') {
    const latestLogo = db.logo?.[0]?.image_url || db.logo?.[0]?.filePath || defaultSiteInfo.logo_url;
    db.site_settings = [{ id: randomUUID(), site_name: defaultSiteInfo.site_name, logo_url: latestLogo, updated_at: new Date().toISOString() }];
  }

  await writeDb(db);
  res.json({ ok: true, id: req.params.id });
});

const distPath = path.join(__dirname, '..', 'dist');
app.use('/school-website', express.static(distPath));
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

ensureDefaultPrincipal().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
