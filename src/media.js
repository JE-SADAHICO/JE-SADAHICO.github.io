// Public media registry. Add only files approved for external viewing.
// url: full public link to the video (shown as a link in print / PDF).
// qr:  QR image for that link, shown on the poster in the PDF.
// ja:  the same four fields for the Japanese page (/jp/); anything left out falls back to the Korean file.
export const demos = {
  'grace-demo': { name: 'GRACE', src: null, poster: '/assets/images/grace-poster.svg', url: null, qr: null },
  'trace-demo': { name: 'TRACE', src: '/assets/videos/trace-demo-ko.mp4', poster: '/assets/images/trace-demo-ko-poster.png', url: 'https://leejeongeon.com/assets/videos/trace-demo-ko.mp4', qr: '/assets/images/qr-trace-demo.svg',
    ja: { src: '/assets/videos/trace-demo-ja.mp4', poster: '/assets/images/trace-demo-ja-poster.png', url: 'https://leejeongeon.com/assets/videos/trace-demo-ja.mp4', qr: '/assets/images/qr-trace-demo-ja.svg' } },
  'ajas-demo': { name: 'AJAS', src: '/assets/videos/ajas-demo-ko.mp4', poster: '/assets/images/ajas-demo-ko-poster.png', url: 'https://leejeongeon.com/assets/videos/ajas-demo-ko.mp4', qr: '/assets/images/qr-ajas-demo.svg',
    ja: { src: '/assets/videos/ajas-demo-ja.mp4', poster: '/assets/images/ajas-demo-ja-poster.png', url: 'https://leejeongeon.com/assets/videos/ajas-demo-ja.mp4', qr: '/assets/images/qr-ajas-demo-ja.svg' } },
  'kais-demo': { name: 'KAIS', src: '/assets/videos/kais-demo-ko.mp4', poster: '/assets/images/kais-demo-ko-poster.png', url: 'https://leejeongeon.com/assets/videos/kais-demo-ko.mp4', qr: '/assets/images/qr-kais-demo.svg',
    ja: { src: '/assets/videos/kais-demo-ja.mp4', poster: '/assets/images/kais-demo-ja-poster.png', url: 'https://leejeongeon.com/assets/videos/kais-demo-ja.mp4', qr: '/assets/images/qr-kais-demo-ja.svg' } },
  'plot-demo': { name: 'PLOT', src: '/assets/videos/plot-demo-ko.mp4', poster: '/assets/images/plot-demo-ko-poster.png', url: 'https://leejeongeon.com/assets/videos/plot-demo-ko.mp4', qr: '/assets/images/qr-plot-demo.svg',
    ja: { src: '/assets/videos/plot-demo-ja.mp4', poster: '/assets/images/plot-demo-ja-poster.png', url: 'https://leejeongeon.com/assets/videos/plot-demo-ja.mp4', qr: '/assets/images/qr-plot-demo-ja.svg' } }
};
