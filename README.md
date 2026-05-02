# SaveAll — умный архив сохранёнок из соцсетей

**SaveAll** позволяет сохранять посты, видео, твиты и любые страницы в личный структурированный архив с поиском, тегами и офлайн-копиями. Одно нажатие — и контент навсегда остаётся у вас, даже если автор удалит его.

## Ключевые возможности

- ⚡ Мгновенное сохранение из Twitter, YouTube, Instagram, TikTok и любых сайтов (OpenGraph)
- 🔍 Полнотекстовый поиск по сохранёнкам
- 🗂 Коллекции, теги, напоминания
- 📦 Офлайн-копии (скриншоты / текст) — Pro‑функция
- 🌐 Web‑приложение + браузерное расширение (Chrome / Firefox)
- 👥 White-label API для разработчиков (планируется)

## Архитектура

Проект организован как **монорепозиторий с npm workspaces**:

```
save-all-in-one-place/
├── backend/        # Бэкенд (Node.js, Fastify, Prisma, PostgreSQL, Redis)
├── frontend/           # Веб-приложение (React, Vite, Mantine UI)
├── extension/     # Браузерное расширение (React, Vite, CRXJS)
├── docker-compose.yml  # Локальная инфраструктура (Postgres, Redis)
└── .github/       # CI/CD (GitHub Actions)
```

## Технологический стек

| Компонент  | Технологии                                    |
| ---------- | --------------------------------------------- |
| Frontend   | React 18, TypeScript, Vite, Mantine           |
| Backend    | Node.js, Fastify, Prisma, PostgreSQL, BullMQ  |
| Расширение | Chrome Manifest V3, CRXJS, React              |
| Поиск      | Полнотекстовый поиск PostgreSQL / Meilisearch |
| Хранилище  | Cloudflare R2 / AWS S3                        |
| Платежи    | Stripe                                        |

## Быстрый старт

### Требования

- Node.js ≥ 18
- npm ≥ 9
- Docker и Docker Compose (для локальной БД)

### Установка

```bash
git clone https://github.com/Moon-L1ght/save-all-in-one-place.git
cd save-all-in-one-place
npm install          # установит зависимости всех пакетов
```

### Настройка окружения

1. Скопируйте `.env.example` в `server/.env` и заполните переменные (DATABASE_URL, JWT_SECRET, KEY для Stripe и т.д.)
2. Запустите локальную инфраструктуру:
   ```bash
   docker-compose up -d
   ```
3. Выполните миграции БД:
   ```bash
   npm run db:migrate -w server
   ```

### Запуск в режиме разработки

```bash
npm run dev:backend     # Бэкенд на http://localhost:3001
npm run dev:frontend        # Веб-приложение на http://localhost:5173
npm run dev:extension  # Сборка расширения (папка extension/dist)
```

Расширение загружается через `chrome://extensions` → «Загрузить распакованное» → укажите `extension/dist`.

### Сборка для продакшена

```bash
npm run build -w backend
npm run build -w frontend
npm run build -w extension
```

## Правила разработки

- Перед коммитом автоматически запускаются ESLint и Prettier через Husky + lint-staged.
- Код‑стайл: TypeScript, single quotes, точка с запятой.
- Для UI используется библиотека Mantine.
- Миграции БД управляются Prisma.

## Лицензия

MIT

---

_Создано с ❤️ для продуктивных людей, которые не хотят терять полезный контент._
