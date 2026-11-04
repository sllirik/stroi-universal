import { useMemo, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { ArrowRight, Search, ShoppingBag, Menu, X, ChevronRight, SlidersHorizontal, Truck, ShieldCheck, Headphones } from 'lucide-react'
import { categories, products } from './data/products'
import type { Product } from './data/products'

const rub = (value: number) => new Intl.NumberFormat('ru-RU').format(value) + ' ₽'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="topline"><div className="container topline-inner"><span>Товары для строительства, ремонта и дома</span><span>Поможем с выбором и ответим на вопросы</span></div></div>
      <div className="container header-main">
        <Link to="/" className="brand" aria-label="СтройуниВЕРсал — главная">
          <span className="brand-mark"><span className="brand-tree">✳</span><span className="brand-house">⌂</span></span>
          <span className="brand-name">стройуни<span>ВЕР</span>сал</span>
        </Link>
        <div className="header-search"><Search size={19}/><input placeholder="Найти товар или категорию" aria-label="Поиск товаров"/><kbd>⌕</kbd></div>
        <a className="contact-link" href="tel:+70000000000">Связаться с нами<small>Уточнить наличие и доставку</small></a>
        <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      <nav className={`nav-wrap ${menuOpen ? 'nav-open' : ''}`}><div className="container nav-inner"><Link to="/">Главная</Link><a href="#catalog">Каталог</a><a href="#advantages">О магазине</a><a href="#contacts">Контакты</a><span className="nav-spacer"/><span className="nav-note"><ShoppingBag size={17}/> Каталог товаров</span></div></nav>
    </header>
  )
}

function ProductCard({ product }: { product: Product }) {
  return <Link to={`/product/${product.id}`} className="product-card">
    <div className="product-image"><img src={product.image} alt={product.name}/><span className="image-arrow"><ArrowRight size={18}/></span></div>
    <div className="product-info"><span className="product-category">{categories.find(c => c.id === product.category)?.name ?? 'Товары'}</span><h3>{product.name}</h3><strong>{rub(product.price)}</strong></div>
  </Link>
}

function Home() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())), [query])
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow"><span/> МАГАЗИН СТРОИТЕЛЬНЫХ ТОВАРОВ</span><h1>Всё для ремонта.<br/><em>Всё для дома.</em></h1><p>Подбираем практичные решения для строительства, ремонта и благоустройства. Поможем найти нужный товар и уточнить наличие.</p><a className="primary-button" href="#catalog">Перейти в каталог <ArrowRight size={18}/></a><div className="hero-footnote">СтройуниВЕРсал <span>— надёжные решения каждый день</span></div></div><div className="hero-art"><div className="hero-disc disc-one"/><div className="hero-disc disc-two"/><div className="hero-label">СТРОИТЕЛЬСТВО <b>·</b> РЕМОНТ <b>·</b> ДОМ</div><div className="hero-graphic"><div className="graphic-roof"/><div className="graphic-house"><div className="graphic-window"/><div className="graphic-door"/></div><div className="graphic-base"/></div><div className="hero-stamp">ПОДБОР<br/>ТОВАРОВ<br/><b>БЕЗ ЛИШНЕГО</b></div></div></div></section>
    <section className="benefits" id="advantages"><div className="container benefit-grid"><div><Truck/><span><b>Помощь с доставкой</b><small>Уточняем условия заказа</small></span></div><div><ShieldCheck/><span><b>Понятные характеристики</b><small>Помогаем сравнить товары</small></span></div><div><Headphones/><span><b>Поддержка покупателя</b><small>Ответим на вопросы</small></span></div></div></section>
    <section className="section container" id="catalog"><div className="section-heading"><div><span className="eyebrow">ВЫБИРАЙТЕ ПО КАТЕГОРИИ</span><h2>Каталог товаров</h2></div><a href="#products" className="text-link">Все товары <ArrowRight size={17}/></a></div><div className="category-grid">{categories.map((category, i) => <a href="#products" className={`category-card category-${i}`} key={category.id}><span className="category-symbol">{category.icon}</span><span><b>{category.name}</b><small>{category.count}</small></span><ChevronRight className="category-chevron"/></a>)}</div></section>
    <section className="section products-section" id="products"><div className="container"><div className="section-heading"><div><span className="eyebrow">ПОПУЛЯРНЫЕ ПОЗИЦИИ</span><h2>Товары</h2></div><label className="catalog-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Поиск в каталоге"/></label></div><div className="product-grid">{filtered.map(product => <ProductCard product={product} key={product.id}/>)}</div>{filtered.length === 0 && <p className="empty-state">Ничего не найдено. Попробуйте изменить запрос.</p>}</div></section>
    <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">НУЖНА ПОМОЩЬ?</span><h2>Не уверены, что выбрать?</h2><p>Расскажите, какая задача перед вами — поможем подобрать подходящий товар.</p></div><a href="#contacts" className="light-button">Задать вопрос <ArrowRight size={18}/></a></div></section>
  </>
}

function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  if (!product) return <main className="container not-found"><h1>Товар не найден</h1><Link to="/">Вернуться в каталог</Link></main>
  return <main className="container product-detail"><div className="breadcrumbs"><Link to="/">Главная</Link><ChevronRight size={14}/><span>{product.name}</span></div><div className="detail-grid"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div className="detail-copy"><span className="eyebrow">КАРТОЧКА ТОВАРА</span><h1>{product.name}</h1><div className="detail-price">{rub(product.price)}</div><p>{product.description}</p><div className="detail-actions"><a className="primary-button" href="tel:+70000000000">Уточнить наличие <ArrowRight size={18}/></a><span>Цена и наличие требуют подтверждения продавца</span></div></div></div><section className="spec-section"><h2>Характеристики</h2><div className="spec-list">{product.specs.map(s => <div key={s.label}><span>{s.label}</span><b>{s.value}</b></div>)}</div></section></main>
}

function Footer() {
  return <footer className="footer" id="contacts"><div className="container footer-grid"><div><Link to="/" className="brand footer-brand"><span className="brand-mark"><span className="brand-tree">✳</span><span className="brand-house">⌂</span></span><span className="brand-name">стройуни<span>ВЕР</span>сал</span></Link><p>Строительные и отделочные материалы, товары для дома и ремонта.</p></div><div><b>Покупателям</b><a href="#catalog">Каталог</a><a href="#advantages">О магазине</a></div><div><b>Контакты</b><span>Телефон уточняется</span><span>Режим работы уточняется</span><small>Реквизиты ИП будут добавлены перед запуском</small></div></div><div className="container copyright">© {new Date().getFullYear()} СтройуниВЕРсал. Информация о товарах уточняется.</div></footer>
}

export default function App() {
  return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="*" element={<main className="container not-found"><h1>Страница не найдена</h1><Link to="/">На главную</Link></main>}/></Routes><Footer/></>
}
