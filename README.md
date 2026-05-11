This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

# File Explorer

Визуализация файловой структуры в браузере. Построен на Next.js App Router, Tailwind CSS и shadcn/ui.

## Стек

- [Next.js 15](https://nextjs.org/) — App Router, серверные компоненты
- [Tailwind CSS](https://tailwindcss.com/) — утилитарные стили
- [shadcn/ui](https://ui.shadcn.com/) — компоненты (ScrollArea)
- [Lucide React](https://lucide.dev/) — иконки папок
- [React Icons](https://react-icons.github.io/react-icons/) — иконки файлов по расширению

## Быстрый старт

\`\`\`bash
npm install
npm run dev
\`\`\`

Открой [http://localhost:3000](http://localhost:3000)

## Структура данных

Файловая структура задаётся в `public/fs-data.json`:

\`\`\`json
{
"root": {
"folder-name": {
"type": "folder",
"children": {
"file.ts": { "type": "file" },
"nested-folder": {
"type": "folder",
"children": {}
}
}
},
"file.md": { "type": "file" }
}
}
\`\`\`

Вложенность не ограничена. Чтобы обновить структуру — просто редактируй `public/fs-data.json`, перезапуск сервера не нужен.

## Поддерживаемые расширения (иконки)

| Расширение                        | Иконка              |
| --------------------------------- | ------------------- |
| `.ts`                             | TypeScript (синяя)  |
| `.tsx` / `.jsx`                   | React (голубая)     |
| `.js`                             | JavaScript (жёлтая) |
| `.css`                            | CSS (синяя)         |
| `.html`                           | HTML (оранжевая)    |
| `.json`                           | JSON (жёлтая)       |
| `.md` / `.mdx`                    | Markdown (серая)    |
| `.png` / `.jpg` / `.svg` / `.ico` | Медиа (фиолетовая)  |
| `.pdf`                            | PDF (красная)       |
| `.prisma`                         | Prisma (бирюзовая)  |
| `.gitignore`                      | Git (оранжевая)     |
| Остальные                         | Файл (серая)        |

## Структура проекта

\`\`\`
src/
├── app/
│ ├── layout.tsx # Корневой layout
│ └── page.tsx # Главная страница (загрузка JSON, рендер)
├── components/
│ ├── FileTree.tsx # Корневой список дерева
│ └── TreeNode.tsx # Рекурсивный узел (папка / файл)
├── types/
│ └── fs.ts # TypeScript типы
└── components/ui/ # shadcn компоненты
├── scroll-area.tsx
└── separator.tsx

public/
└── fs-data.json # Источник данных — редактируй здесь
\`\`\`

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
