const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const slides = html.split('<article class="slide-container');

console.log('Total slides:', slides.length - 1);

for (let i = 1; i < slides.length; i++) {
  const content = slides[i].split('</article>')[0];
  const slideNum = (content.match(/data-slide="(\d+)"/) || [])[1] || i;
  const imgs = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)].map(m => {
    const classMatch = m[0].match(/class=["']([^"']+)["']/);
    const parentSlotMatch = content.slice(Math.max(0, m.index - 200), m.index).match(/<div[^>]+class=["']([^"']*(?:media-slot|image-slot|relative|h-)[^"']*)["'][^>]*>$/);
    return {
      src: m[1],
      imgClass: classMatch ? classMatch[1] : '',
      slotContext: parentSlotMatch ? parentSlotMatch[1] : 'unknown parent'
    };
  });
  console.log(`\n=================== SLIDE ${slideNum} (${imgs.length} images) ===================`);
  imgs.forEach((img, idx) => {
    console.log(`  [${idx + 1}] SRC: ${img.src}`);
    console.log(`      IMG CLASS: ${img.imgClass}`);
    console.log(`      PARENT: ${img.slotContext}`);
  });
}
