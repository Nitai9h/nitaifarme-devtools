const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const setTimeoutAsync = promisify(setTimeout);

// 随机延迟数
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成时间戳 随机截取10位
function generateTimestampPart() {
  const timestamp = Date.now().toString(); // 13位时间戳
  const start = Math.floor(Math.random() * 4); // 随机起始位置0-3
  return timestamp.substring(start, start + 10);
}

// 生成随机序列号
function generateRandomSequence(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// 补全 MD5
function padMD5(md5, targetLength) {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = md5.toUpperCase();

  while (result.length < targetLength) {
    result += validChars[Math.floor(Math.random() * validChars.length)];
  }
  return result.substring(0, targetLength);
}

// 计算 MD5
async function calculateFileMD5(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);

    stream.on('data', data => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

async function generateID() {
  try {
    // 时间戳
    let timestamps = generateTimestampPart();
    await setTimeoutAsync(getRandomDelay(1000, 3000));
    timestamps += generateTimestampPart();
    await setTimeoutAsync(getRandomDelay(1000, 10000));
    timestamps += generateTimestampPart();
    await setTimeoutAsync(getRandomDelay(1000, 5500));
    timestamps += generateTimestampPart();

    // 生成 UUID
    const uuid = crypto.randomUUID().replace(/-/g, '');

    // 生成 随机序列号
    const sequence = generateRandomSequence(64);

    // 写入到 临时文件
    const tempContent = timestamps + uuid + sequence;

    fs.writeFileSync('build/temp.txt', tempContent);

    // 计算 MD5
    const md5 = await calculateFileMD5('build/temp.txt');
    const finalID = padMD5(md5, 150);

    const outputPath = path.join(process.cwd(), 'build/id.npem');

    const buildDir = path.dirname(outputPath);
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, finalID);
    fs.unlinkSync('build/temp.txt');

    return finalID;
  } catch (error) {
    throw error;
  }
}

if (require.main === module) {
  generateID().catch(() => process.exit(1));
}

generateID();