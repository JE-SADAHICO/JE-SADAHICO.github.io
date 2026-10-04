import { demos } from './media.js';

// Reusable on TRACE, AJAS and PLOT. Range inputs support pointer, touch and keyboard.
export function initComparisons(root = document) {
  root.querySelectorAll('[data-comparison]').forEach(component => {
    const range = component.querySelector('input[type="range"]');
    const set = () => {
      const value = Number(range.value);
      component.style.setProperty('--split', `${value}%`);
      range.setAttribute('aria-valuetext', `가공 전 ${value}%, 가공 후 ${100-value}%`);
    };
    range.addEventListener('input', set);
    set();
    component.dataset.ready = 'true';
  });
}
export function initDemos(root = document) {
  root.querySelectorAll('[data-demo]').forEach(component => {
    const media = demos[component.dataset.demo];
    if (!media) return;
    const screen = component.querySelector('.demo-screen');
    const poster = screen.querySelector('img');
    poster.src = media.poster;
    if (media.src) {
      const video = document.createElement('video');
      video.controls = !media.bufferForSeeking;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'none';
      video.poster = media.poster;
      video.setAttribute('aria-label', '기능 구현 영상');
      screen.querySelector('.demo-empty')?.remove();
      screen.classList.add('video-ready');
      screen.append(video);
      if (media.bufferForSeeking) {
        const loadButton = document.createElement('button');
        loadButton.className = 'demo-load-button';
        loadButton.type = 'button';
        loadButton.setAttribute('aria-label', `${media.name} 영상 재생`);
        loadButton.textContent = '▶';
        loadButton.addEventListener('click', async () => {
          loadButton.disabled = true;
          loadButton.classList.add('is-loading');
          loadButton.setAttribute('aria-label', `${media.name} 영상 준비 중`);
          loadButton.textContent = '영상을 준비하고 있습니다…';
          try {
            const response = await fetch(media.src);
            if (!response.ok) throw new Error('Video download failed');
            video.src = URL.createObjectURL(await response.blob());
            video.controls = true;
            video.addEventListener('canplay', () => video.play(), { once: true });
            video.load();
            loadButton.remove();
          } catch {
            loadButton.disabled = false;
            loadButton.classList.remove('is-loading');
            loadButton.setAttribute('aria-label', `${media.name} 영상 다시 불러오기`);
            loadButton.textContent = '다시 불러오기';
          }
        });
        screen.append(loadButton);
      } else {
        video.src = media.src;
      }
    }
    if (media.url) {
      const link = document.createElement('a');
      link.className = 'print-demo';
      link.href = media.url;
      link.setAttribute('aria-label', '전체 구현 영상 보기');
      const image = new Image();
      image.src = media.poster;
      image.alt = '클릭하여 전체 구현 영상 보기';
      link.append(image);
      const label = document.createElement('span');
      label.textContent = '전체 구현 영상 보기 ↗';
      link.append(label);
      if (media.qr) {
        const qr = new Image();
        qr.className = 'print-demo__qr';
        qr.src = media.qr;
        qr.alt = `${media.name} 구현 영상 QR 코드`;
        link.append(qr);
        const address = document.createElement('small');
        address.textContent = media.url.replace(/^https?:\/\//, '');
        link.append(address);
      }
      screen.append(link);
    }
  });
}
initComparisons();
initDemos();

const navLinks = [...document.querySelectorAll('.nav__list a')];
const navGroups = { projects:'kais', ajas:'kais', rnd:'kais', pack:'kais', architecture:'overview', about:'growth', closing:'growth' };
const navObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting);
  if (!visible.length) return;
  const id = visible[visible.length - 1].target.id;
  const target = navGroups[id] || id;
  navLinks.forEach(link => link.setAttribute('aria-current', String(link.hash === '#' + target)));
}, { rootMargin:'-48px 0px -65% 0px', threshold:0 });
document.querySelectorAll('main > section').forEach(section => navObserver.observe(section));

// Cloudflare Web Analytics (cookie-free). Only on the public domain, so local preview, QA and PDF runs are not counted.
if (location.hostname === 'leejeongeon.com') {
  const beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({ token: '1604106cec6041908a625551f539f89a' });
  document.head.append(beacon);
}

// Closing: click the mail address to copy it, with a short confirmation in place of the hint.
document.querySelectorAll('[data-copy]').forEach(button => {
  const hint = button.querySelector('.closing-copy');
  const idle = hint.textContent;
  let timer;
  button.addEventListener('click', async () => {
    let ok = true;
    try { await navigator.clipboard.writeText(button.dataset.copy); }
    catch {
      // Clipboard API is unavailable on insecure origins or when denied; fall back to a hidden field.
      const field = document.createElement('textarea');
      field.value = button.dataset.copy;
      field.style.cssText = 'position:fixed;opacity:0';
      document.body.append(field);
      field.select();
      ok = document.execCommand('copy');
      field.remove();
    }
    hint.textContent = ok ? '복사됨' : '복사 실패';
    button.classList.toggle('is-copied', ok);
    clearTimeout(timer);
    timer = setTimeout(() => { hint.textContent = idle; button.classList.remove('is-copied'); }, 1800);
  });
});
