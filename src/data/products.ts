export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  specs: { label: string; value: string }[]
  featured?: boolean
}

export const categories = [
  { id: 'finishing', name: 'Отделочные материалы', count: '24 товара', icon: '▧' },
  { id: 'adhesives', name: 'Клей и герметик', count: '167 товаров', icon: '◈' },
  { id: 'roofing', name: 'Кровельные материалы', count: '5 товаров', icon: '⌂' },
  { id: 'tools', name: 'Инструменты', count: 'Каталог', icon: '⚒' },
]

export const products: Product[] = [
  {
    id: 'bram-aups-130',
    name: 'Насосная станция BRAM AUPS 130',
    category: 'tools',
    price: 5485,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85',
    description: 'Насосная станция для водоснабжения дома, дачи и полива участка. Характеристики приведены по материалам предоставленного скриншота сообщества; перед публикацией их необходимо сверить с паспортом производителя.',
    featured: true,
    specs: [
      { label: 'Мощность', value: '0,37 кВт' },
      { label: 'Максимальная производительность', value: '33 л/мин' },
      { label: 'Максимальный напор', value: '30 м' },
      { label: 'Максимальная высота всасывания', value: '5 м' },
      { label: 'Присоединительный размер', value: '1 дюйм × 1 дюйм' },
      { label: 'Электрическая сеть', value: '~230 В, 50 Гц' },
      { label: 'Степень защиты', value: 'IPX4' },
      { label: 'Класс изоляции', value: 'B' },
    ],
  },
  {
    id: 'eurocube-1000',
    name: 'Еврокуб 1000 л',
    category: 'tools',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85',
    description: 'Ёмкость для хранения и транспортировки технических жидкостей. Комплектацию и состояние необходимо уточнить у продавца.',
    specs: [
      { label: 'Объём', value: '1000 л' },
      { label: 'Тип', value: 'IBC-контейнер' },
    ],
  },
  {
    id: 'ladder-perilla',
    name: 'Стремянка стальная Perilla',
    category: 'tools',
    price: 2285,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=85',
    description: 'Стальная стремянка для бытовых и ремонтных работ. Количество ступеней и допустимую нагрузку нужно подтвердить по конкретной модели.',
    specs: [
      { label: 'Материал', value: 'Сталь' },
      { label: 'Назначение', value: 'Бытовое и ремонтное' },
    ],
  },
]
