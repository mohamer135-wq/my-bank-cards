# My Bank Cards - PWA Builder Ready

## ملفات جاهزة لـ PWA Builder (pwabuilder.com)

### الخطوات:

1. **ارفع هذه الملفات على استضافة مجانية** (GitHub Pages / Netlify / Vercel / Firebase Hosting)

2. **GitHub Pages (أسهل طريقة):**
   - أنشئ مستودع جديد على GitHub
   - ارفع جميع الملفات في هذا المجلد
   - اذهب إلى Settings → Pages → Source: Deploy from a branch → Branch: main
   - انتظر دقيقة ثم افتح الرابط: `https://username.github.io/repo-name/`

3. **ادخل إلى [pwabuilder.com](https://pwabuilder.com)**
   - الصق رابط موقعك
   - اضغط Start
   - اختر **Package for Stores**
   - اختر **Android**
   - اختر تبويب **Other Android** (كما في الصورة)
   - املأ البيانات:
     - Package ID: `com.mybank.cards`
     - App name: `My Bank Cards`
     - Short name: `Bank Cards`
   - اضغط **Download Package**
   - ستحصل على ملف APK جاهز!

### ملفات المشروع:
- `index.html` — التطبيق الرئيسي (مع manifest + service worker)
- `manifest.json` — ملف PWA المطلوب
- `sw.js` — Service Worker للتخزين المؤقت
- `icons/` — أيقونات بجميع الأحجام المطلوبة

### ملاحظة:
- يجب أن يكون الموقع على **HTTPS** (GitHub Pages يوفره تلقائياً)
- `manifest.json` يجب أن يكون متاحاً على الجذر `/manifest.json`
- لا تحتاج Cordova أو Android Studio!
