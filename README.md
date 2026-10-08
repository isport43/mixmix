# Mix Mix

Статичний односторінковий сайт для команди святкових аніматорів Mix Mix у Вінниці. Працює без JavaScript-фреймворків; Tailwind CSS збирається через CLI.

## Локальний запуск

Спочатку встановіть залежності та зберіть Tailwind CSS:

```bash
npm install
npm run build
```

Відкривати `index.html` напряму не варто, бо браузер блокує завантаження YAML через `file://`. Запустіть будь-який статичний сервер із папки `public`, наприклад:

```bash
npx serve public
```

Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: `public`

## Редагування через Pages CMS

Увесь контент сторінки зберігається у `public/content/site.yml`. Браузер завантажує цей файл напряму, тому після змін не потрібна збірка. Схема адмінки описана у `.pages.yml`, а завантажені зображення потрапляють у `public/uploads`.

1. Встановити Pages CMS GitHub App для репозиторію.
2. Відкрити репозиторій на `app.pagescms.org`.
3. Редагувати розділ «Сайт Mix Mix» і зберегти зміни.
4. Cloudflare Pages автоматично перебудує сайт після коміту.
