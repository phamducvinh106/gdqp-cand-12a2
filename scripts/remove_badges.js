const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Regex matches <span class="media-badge-tag ...">...</span> including leading whitespace and newline
const badgeRegex = /[ \t]*<span class="media-badge-tag[^"]*"[^>]*>[\s\S]*?<\/span>[ \t]*\r?\n?/g;

const matches = content.match(badgeRegex);
console.log('Tìm thấy số lượng chú thích media-badge-tag cần xóa:', matches ? matches.length : 0);

if (matches) {
  matches.forEach((m, idx) => {
    console.log(`${idx + 1}. Xóa: ${m.trim()}`);
  });

  const updatedContent = content.replace(badgeRegex, '');
  fs.writeFileSync(indexPath, updatedContent, 'utf8');
  console.log('✅ Đã xóa sạch toàn bộ mẩu chú thích media-badge-tag khỏi index.html!');
} else {
  console.log('Không tìm thấy badge nào trong index.html.');
}
