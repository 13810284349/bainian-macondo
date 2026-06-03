# 关于百年

一个基于《百年孤独全书深度总体分析》内容重构的公网单页。

## 内容结构

- `index.html`: 公开访问首页，展示马孔多阅读档案。
- `deck.html`: 原目录中的横向翻页全书分析演示稿。
- `assets/site.css`: 页面视觉系统。
- `assets/site.js`: Supabase 内容读取、阅读镜头筛选与滚动进度。
- `supabase/migrations/20260603_create_macondo_page_sections.sql`: 内容表、RLS 策略与种子数据。

## 数据层

页面从 Supabase `public.macondo_page_sections` 读取九个分析入口。该表开启 RLS，并只授予 `anon` 与 `authenticated` 公共读取权限。

## 部署

Netlify 静态部署，发布目录为仓库根目录。
