import { FormEvent, useMemo, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, Search, ShoppingBag, Menu, X, ChevronRight, Truck, ShieldCheck, Headphones, SlidersHorizontal } from 'lucide-react'
import { categories, products } from './data/products'
import type { Product } from './data/products'

const rub = (value: number) => new Intl.NumberFormat('ru-RU').format(value) + ' ₽'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(query.trim() ? `/catalog?search=${encodeURIComponent(query.trim())}` : '/catalog')
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="topline"><div className="container topline-inner"><span>Товары для строительства, ремонта и дома</span><span>Поможем с выбором и ответим на вопросы</span></div></div>
      <div className="container header-main">
        <Link to="/" className="brand" aria-label="СтройуниВЕРсал — главная">
          <span className="brand-mark"><span className="brand-tree">✳</span><span className="brand-house">⌂</span></span>
          <span className="brand-name">стройуни<span>ВЕР</span>сал</span>
        </Link>
        <form className="header-search" onSubmit={submitSearch}>
          <Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Найти товар или категорию" aria-label="Поиск товаров"/>
          <button type="submit" aria-label="Искать"><ArrowRight size={17}/></button>
        </form>
        <a className="contact-link" href="tel:+70000000000">Связаться с нами<small>Уточнить наличие и доставку</small></a>
        <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      <nav className={`nav-wrap ${menuOpen ? 'nav-open' : ''}`}><div className="container nav-inner"><Link to="/">Главная</Link><Link to="/catalog">Каталог</Link><a href="/#advantages">О магазине</a><a href="/#contacts">Контакты</a><span className="nav-spacer"/><span className="nav-note"><ShoppingBag size={17}/> Каталог товаров</span></div></nav>
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
  const featured = products.filter(p => p.featured)
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow"><span/> МАГАЗИН СТРОИТЕЛЬНЫХ ТОВАРОВ</span><h1>Всё для ремонта.<br/><em>Всё для дома.</em></h1><p>Подбираем практичные решения для строительства, ремонта и благоустройства. Поможем найти нужный товар и уточнить наличие.</p><Link className="primary-button" to="/catalog">Перейти в каталог <ArrowRight size={18}/></Link><div className="hero-footnote">СтройуниВЕРсал <span>— надёжные решения каждый день</span></div></div><div className="hero-art"><div className="hero-disc disc-one"/><div className="hero-disc disc-two"/><div className="hero-label">СТРОИТЕЛЬСТВО <b>·</b> РЕМОНТ <b>·</b> ДОМ</div><div className="hero-graphic"><div className="graphic-roof"/><div className="graphic-house"><div className="graphic-window"/><div className="graphic-door"/></div><div className="graphic-base"/></div><div className="hero-stamp">ПОДБОР<br/>ТОВАРОВ<br/><b>БЕЗ ЛИШНЕГО</b></div></div></div></section>
    <section className="benefits" id="advantages"><div className="container benefit-grid"><div><Truck/><span><b>Помощь с доставкой</b><small>Уточняем условия заказа</small></span></div><div><ShieldCheck/><span><b>Понятные характеристики</b><small>Помогаем сравнить товары</small></span></div><div><Headphones/><span><b>Поддержка покупателя</b><small>Ответим на вопросы</small></span></div></div></section>
    <section className="section container" id="catalog"><div className="section-heading"><div><span className="eyebrow">ВЫБИРАЙТЕ ПО КАТЕГОРИИ</span><h2>Каталог товаров</h2></div><Link to="/catalog" className="text-link">Все товары <ArrowRight size={17}/></Link></div><div className="category-grid">{categories.map((category, i) => <Link to={`/catalog?category=${category.id}`} className={`category-card category-${i}`} key={category.id}><span className="category-symbol">{category.icon}</span><span><b>{category.name}</b><small>{category.count}</small></span><ChevronRight className="category-chevron"/></Link>)}</div></section>
    <section className="section products-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">РЕКОМЕНДУЕМ ПОСМОТРЕТЬ</span><h2>Популярный товар</h2></div><Link to="/catalog" className="text-link">Весь каталог <ArrowRight size={17}/></Link></div><div className="product-grid">{featured.map(product => <ProductCard product={product} key={product.id}/>)}</div></div></section>
    <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">НУЖНА ПОМОЩЬ?</span><h2>Не уверены, что выбрать?</h2><p>Расскажите, какая задача перед вами — поможем подобрать подходящий товар.</p></div><a href="#contacts" className="light-button">Задать вопрос <ArrowRight size={18}/></a></div></section>
  </>
}

function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const search = params.get('search') ?? ''
  const category = params.get('category') ?? 'all'
  const sort = params.get('sort') ?? 'popular'

  const filtered = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase('ru')
    const result = products.filter(product => {
      const matchesSearch = !normalized || `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase('ru').includes(normalized)
      const matchesCategory = category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    return result
  }, [search, category, sort])

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || (key === 'category' && value === 'all') || (key === 'sort' && value === 'popular')) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  return <main className="container catalog-page">
    <div className="breadcrumbs"><Link to="/">Главная</Link><ChevronRight size={14}/><span>Каталог</span></div>
    <div className="catalog-title"><div><span className="eyebrow">ВЫБЕРИТЕ НУЖНОЕ</span><h1>Каталог товаров</h1><p>Поиск и фильтрация по доступным позициям</p></div><span className="catalog-count">{filtered.length} {filtered.length === 1 ? 'товар' : filtered.length > 1 && filtered.length < 5 ? 'товара' : 'товаров'}</span></div>
    <div className="catalog-toolbar">
      <label className="catalog-search"><Search size={17}/><input value={search} onChange={e => updateParam('search', e.target.value)} placeholder="Поиск по каталогу"/></label>
      <label className="sort-control"><SlidersHorizontal size={17}/><select value={sort} onChange={e => updateParam('sort', e.target.value)} aria-label="Сортировка"><option value="popular">Сначала популярные</option><option value="price-asc">Сначала дешевле</option><option value="price-desc">Сначала дороже</option></select></label>
    </div>
    <div className="catalog-layout">
      <aside className="catalog-sidebar"><b>Категории</b><button className={category === 'all' ? 'active' : ''} onClick={() => updateParam('category', 'all')}>Все товары</button>{categories.map(item => <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => updateParam('category', item.id)}>{item.name}</button>)}</aside>
      <section className="catalog-results"><div className="product-grid">{filtered.map(product => <ProductCard product={product} key={product.id}/>)}</div>{filtered.length === 0 && <div className="catalog-empty"><Search size={28}/><h2>Ничего не найдено</h2><p>В этой категории пока нет опубликованных позиций или поиск не дал результатов.</p><button className="primary-button" onClick={() => { setParams(new URLSearchParams()); }}>Сбросить фильтры</button></div>}</section>
    </div>
    <p className="catalog-disclaimer">Каталог находится в наполнении. Цены, наличие, изображения и характеристики необходимо подтвердить у продавца перед оформлением заказа.</p>
  </main>
}

function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  if (!product) return <main className="container not-found"><h1>Товар не найден</h1><Link to="/catalog">Вернуться в каталог</Link></main>
  return <main className="container product-detail"><div className="breadcrumbs"><Link to="/">Главная</Link><ChevronRight size={14}/><Link to="/catalog">Каталог</Link><ChevronRight size={14}/><span>{product.name}</span></div><div className="detail-grid"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div className="detail-copy"><span className="eyebrow">КАРТОЧКА ТОВАРА</span><h1>{product.name}</h1><div className="detail-price">{rub(product.price)}</div><p>{product.description}</p><div className="detail-actions"><a className="primary-button" href="tel:+70000000000">Уточнить наличие <ArrowRight size={18}/></a><span>Цена и наличие требуют подтверждения продавца</span></div></div></div><section className="spec-section"><h2>Характеристики</h2><div className="spec-list">{product.specs.map(s => <div key={s.label}><span>{s.label}</span><b>{s.value}</b></div>)}</div></section></main>
}

function Footer() {
  return <footer className="footer" id="contacts"><div className="container footer-grid"><div><Link to="/" className="brand footer-brand"><span className="brand-mark"><span className="brand-tree">✳</span><span className="brand-house">⌂</span></span><span className="brand-name">стройуни<span>ВЕР</span>сал</span></Link><p>Строительные и отделочные материалы, товары для дома и ремонта.</p></div><div><b>Покупателям</b><Link to="/catalog">Каталог</Link><a href="/#advantages">О магазине</a></div><div><b>Контакты</b><span>Телефон уточняется</span><span>Режим работы уточняется</span><small>Реквизиты ИП будут добавлены перед запуском</small></div></div><div className="container copyright">© {new Date().getFullYear()} СтройуниВЕРсал. Информация о товарах уточняется.</div></footer>
}

export default function App() {
  return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/catalog" element={<CatalogPage/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="*" element={<main className="container not-found"><h1>Страница не найдена</h1><Link to="/">На главную</Link></main>}/></Routes><Footer/></>
}
