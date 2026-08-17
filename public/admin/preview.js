/*
 * Decap CMS 自定义 Preview 模板（aiiot 产品 / 博客）
 * ------------------------------------------------------------
 * 重要约定（来自 Decap 官方文档）：
 *  - Decap 在加载 decap-cms.js 后，会全局暴露 `h`（即 React.createElement）
 *    和 `createClass`。自定义预览组件必须复用这两个全局，不能另引一份 React，
 *    否则会出现“双 React 实例”导致 hooks/渲染静默失效。
 *  - 预览组件运行在父窗口 JS 上下文、挂载到预览 iframe 的 DOM 里。
 *    因此父窗口加载的全局（marked、h、createClass）都能直接用。
 *  - 图片字段必须用 this.props.getAsset() 解析（新上传的会是内存预览/DataURL，
 *    已存的会解析成可访问 URL）；body 里的相对图片在这里统一转成绝对地址，
 *    保证在预览 iframe 中也能显示。
 */
(function () {
  var CMS = window.CMS;
  if (!CMS) {
    console.error('[aiiot-preview] Decap CMS 未加载，无法注册预览模板');
    return;
  }
  // 兼容不同版本：优先用全局 h / createClass，其次尝试 CMS 命名空间
  var h = window.h || (CMS.h);
  var createClass = window.createClass || (CMS.createClass);
  if (typeof h !== 'function' || typeof createClass !== 'function') {
    console.error('[aiiot-preview] Decap 全局 h / createClass 缺失，预览模板未注册');
    return;
  }
  var marked = window.marked;

  var CAT_LABELS = {
    software: 'AI+软件',
    edge: 'AI+边缘计算机',
    sensor: 'AI+传感器',
    connect: 'AI+智能连接',
    auto: 'AI+自动化'
  };
  var LOCALE_LABELS = { zh: '中文', en: 'English', de: 'Deutsch' };
  // body 内相对图片在预览 iframe 中需绝对地址才显示
  var SITE_BASE = 'https://x-aiiot.com';

  function renderMarkdown(md) {
    if (!md) return '';
    var out = '';
    try {
      if (marked && marked.parse) out = marked.parse(String(md));
      else if (marked) out = marked(String(md));
      else out = '<p>' + String(md).replace(/</g, '&lt;') + '</p>';
    } catch (e) {
      out = '<p>' + String(md).replace(/</g, '&lt;') + '</p>';
    }
    // 把 /images/xxx 这类相对路径补全为绝对地址
    out = out.replace(/(<img[^>]+src=")\//g, '$1' + SITE_BASE + '/');
    return out;
  }

  function currentLocale(entry) {
    try {
      var l = entry.get('locale');
      if (l) return l;
    } catch (e) {}
    return '';
  }

  function resolveAsset(asset) {
    if (!asset) return '';
    try {
      if (typeof asset.toString === 'function') return asset.toString();
    } catch (e) {}
    return asset;
  }

  var PREVIEW_CSS =
    '.aiiot-preview{font-family:system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;color:#334155;}' +
    '.aiiot-preview .locale-bar{background:#e6f4fb;color:#0a2a43;font-size:.78rem;padding:.45rem 1rem;display:flex;gap:.4rem;align-items:center;}' +
    '.aiiot-preview .locale-bar b{color:#0096d6;}' +
    '.aiiot-preview .hero{background:#0a2a43;padding:2rem 1rem;}' +
    '.aiiot-preview .hero nav{color:#94a3b8;font-size:.8rem;margin-bottom:.5rem;}' +
    '.aiiot-preview .hero nav a{color:#0096d6;text-decoration:none;}' +
    '.aiiot-preview .hero h1{color:#fff;font-size:1.8rem;font-weight:700;margin:0;line-height:1.3;}' +
    '.aiiot-preview .body-wrap{max-width:64rem;margin:0 auto;padding:2rem 1rem;}' +
    '.aiiot-preview .grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;}' +
    '@media(max-width:680px){.aiiot-preview .grid{grid-template-columns:1fr;}}' +
    '.aiiot-preview img.thumb{width:100%;height:20rem;object-fit:contain;background:#f8fafc;border-radius:1rem;box-shadow:0 1px 3px rgba(0,0,0,.12);}' +
    '.aiiot-preview .badge{display:inline-block;font-size:.7rem;font-weight:500;color:#0096d6;background:#e6f4fb;padding:.25rem .6rem;border-radius:.35rem;}' +
    '.aiiot-preview .summary{margin-top:1rem;font-size:1.05rem;color:#475569;line-height:1.75;}' +
    '.aiiot-preview .cta{margin-top:1.5rem;display:inline-block;background:#0096d6;color:#fff;padding:.7rem 1.75rem;border-radius:.4rem;text-decoration:none;font-weight:500;}' +
    '.aiiot-preview .prose{margin-top:3rem;border-top:1px solid #e2e8f0;padding-top:2rem;line-height:1.85;font-size:.95rem;}' +
    '.aiiot-preview .prose h1,.aiiot-preview .prose h2,.aiiot-preview .prose h3{color:#0a2a43;margin:1.6rem 0 .7rem;line-height:1.4;}' +
    '.aiiot-preview .prose h2{font-size:1.35rem;border-bottom:2px solid #0096d6;padding-bottom:.3rem;display:inline-block;}' +
    '.aiiot-preview .prose h3{font-size:1.1rem;}' +
    '.aiiot-preview .prose p{margin:.6rem 0;}' +
    '.aiiot-preview .prose table{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.88rem;}' +
    '.aiiot-preview .prose th{background:#0a2a43;color:#fff;text-align:left;padding:.55rem .8rem;}' +
    '.aiiot-preview .prose td{border:1px solid #cbd5e1;padding:.5rem .8rem;}' +
    '.aiiot-preview .prose tbody tr:nth-child(even){background:#f1f5f9;}' +
    '.aiiot-preview .prose img{max-width:100%;border-radius:.5rem;margin:.5rem 0;border:1px solid #e2e8f0;}' +
    '.aiiot-preview .prose ul,.aiiot-preview .prose ol{padding-left:1.5rem;margin:.6rem 0;}' +
    '.aiiot-preview .prose li{margin:.25rem 0;}' +
    '.aiiot-preview .prose a{color:#0096d6;}' +
    '.aiiot-preview .prose code{background:#eef2f7;padding:.1rem .35rem;border-radius:.25rem;font-size:.85em;}' +
    '.aiiot-preview .meta{font-size:.8rem;color:#64748b;margin-bottom:.5rem;}' +
    '.aiiot-preview .cover{width:100%;max-height:22rem;object-fit:contain;background:#f8fafc;border-radius:1rem;box-shadow:0 1px 3px rgba(0,0,0,.12);}';

  var ProductPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      if (!entry) return h('div', { style: { padding: '1rem' } }, '加载中…');
      var data = entry.get('data');
      var title = data.get('title') || '（未命名产品）';
      var summary = data.get('summary') || '';
      var image = data.get('image') || '';
      var category = data.get('category') || 'software';
      var body = data.get('body') || '';
      var locale = currentLocale(entry);
      var imgSrc = image ? resolveAsset(this.props.getAsset ? this.props.getAsset(image) : image) : '';

      return h('div', { className: 'aiiot-preview' },
        h('div', { className: 'locale-bar' },
          '正在预览语言：',
          h('b', null, LOCALE_LABELS[locale] || locale || '默认'),
          ' · 用上方「使用哪个语言撰写」下拉切换中 / 英 / 德，右侧预览会实时更新'
        ),
        h('section', { className: 'hero' },
          h('div', { style: { maxWidth: '64rem', margin: '0 auto' } },
            h('nav', null,
              h('a', { href: '#' }, '产品'),
              h('span', { style: { margin: '0 .5rem' } }, '/'),
              h('span', null, CAT_LABELS[category] || category)
            ),
            h('h1', null, title)
          )
        ),
        h('div', { className: 'body-wrap' },
          h('div', { className: 'grid' },
            imgSrc ? h('img', { className: 'thumb', src: imgSrc, alt: title }) : null,
            h('div', null,
              h('span', { className: 'badge' }, CAT_LABELS[category] || category),
              h('p', { className: 'summary' }, summary),
              h('a', { className: 'cta', href: '#' }, '获取报价 →')
            )
          ),
          h('div', {
            className: 'prose',
            dangerouslySetInnerHTML: { __html: renderMarkdown(body) }
          })
        ),
        h('style', null, PREVIEW_CSS)
      );
    }
  });

  var PostPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      if (!entry) return h('div', { style: { padding: '1rem' } }, '加载中…');
      var data = entry.get('data');
      var title = data.get('title') || '（未命名文章）';
      var description = data.get('description') || '';
      var pubDate = data.get('pubDate') || '';
      var image = data.get('image') || '';
      var body = data.get('body') || '';
      var locale = currentLocale(entry);
      var imgSrc = image ? resolveAsset(this.props.getAsset ? this.props.getAsset(image) : image) : '';

      return h('div', { className: 'aiiot-preview' },
        h('div', { className: 'locale-bar' },
          '正在预览语言：',
          h('b', null, LOCALE_LABELS[locale] || locale || '默认'),
          ' · 用上方「使用哪个语言撰写」下拉切换中 / 英 / 德'
        ),
        h('section', { className: 'hero' },
          h('div', { style: { maxWidth: '64rem', margin: '0 auto' } },
            h('h1', null, title)
          )
        ),
        h('div', { className: 'body-wrap' },
          imgSrc ? h('img', { className: 'cover', src: imgSrc, alt: title }) : null,
          h('div', { className: 'meta' }, pubDate ? ('发布日期：' + pubDate) : ''),
          h('p', { className: 'summary' }, description),
          h('div', {
            className: 'prose',
            dangerouslySetInnerHTML: { __html: renderMarkdown(body) }
          })
        ),
        h('style', null, PREVIEW_CSS)
      );
    }
  });

  CMS.registerPreviewTemplate('products', ProductPreview);
  CMS.registerPreviewTemplate('posts', PostPreview);
  console.log('[aiiot-preview] 已注册 products / posts 预览模板');
})();
