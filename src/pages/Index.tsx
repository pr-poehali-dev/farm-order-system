import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  category: string;
  priceRegular: number;
  pricePreorder: number;
  unit: string;
  image: string;
  discount: number;
};

type CartItem = Product & {
  quantity: number;
};

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Свежие овощи',
      category: 'Овощи',
      priceRegular: 800,
      pricePreorder: 480,
      unit: 'кг',
      image: 'https://cdn.poehali.dev/projects/fa62f71d-50ca-42ff-abc6-043c2f78f158/files/f6c5de3c-c2fc-4cea-a704-fe80346950f9.jpg',
      discount: 40
    },
    {
      id: 2,
      name: 'Фермерское молоко',
      category: 'Молочка',
      priceRegular: 150,
      pricePreorder: 105,
      unit: 'л',
      image: 'https://cdn.poehali.dev/projects/fa62f71d-50ca-42ff-abc6-043c2f78f158/files/25b0ee6e-7233-4cb6-9999-607d3bff26a4.jpg',
      discount: 30
    },
    {
      id: 3,
      name: 'Домашние яйца',
      category: 'Яйца',
      priceRegular: 200,
      pricePreorder: 140,
      unit: '10 шт',
      image: 'https://cdn.poehali.dev/projects/fa62f71d-50ca-42ff-abc6-043c2f78f158/files/25b0ee6e-7233-4cb6-9999-607d3bff26a4.jpg',
      discount: 30
    },
    {
      id: 4,
      name: 'Фермерское мясо',
      category: 'Мясо',
      priceRegular: 1200,
      pricePreorder: 840,
      unit: 'кг',
      image: 'https://cdn.poehali.dev/projects/fa62f71d-50ca-42ff-abc6-043c2f78f158/files/3a2ff569-7be7-4724-aea3-1746cff136b0.jpg',
      discount: 30
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev =>
        prev.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.pricePreorder * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <h1 className="text-2xl font-bold text-primary">ФермаЗаказ</h1>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.pricePreorder} ₽/{item.unit}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{item.pricePreorder * item.quantity} ₽</p>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span>{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Перейти к оформлению
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/fa62f71d-50ca-42ff-abc6-043c2f78f158/files/3a2ff569-7be7-4724-aea3-1746cff136b0.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Фермерские продукты<br />по предзаказу
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Свежие и дешевле до 40%
          </p>
          <p className="text-lg mb-10 text-white/80 max-w-xl mx-auto">
            Выбирайте продукты, оформляйте предзаказ и забирайте в ближайшем пункте выдачи
          </p>
          <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
            Сделать предзаказ
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Как это работает</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: 'Search', title: 'Выбираете продукты', desc: 'Изучите каталог и выберите нужные товары по предзаказу' },
              { icon: 'Tractor', title: 'Фермер собирает заказ', desc: 'Производитель получает заявку и готовит свежие продукты' },
              { icon: 'Truck', title: 'Доставка в ПВЗ', desc: 'Мы привозим заказ в выбранный пункт выдачи' },
              { icon: 'PackageCheck', title: 'Забираете из термобокса', desc: 'Получаете уведомление и забираете в удобное время' }
            ].map((step, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={step.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Популярные категории</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Свежайшие продукты напрямую от фермера со скидкой до 40%
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-destructive text-white">
                    -{product.discount}%
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">{product.category}</Badge>
                  <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">{product.pricePreorder} ₽</span>
                    <span className="text-sm text-muted-foreground line-through">{product.priceRegular} ₽</span>
                    <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Преимущества для покупателей</h2>
              <div className="space-y-6">
                {[
                  { icon: 'Percent', title: 'Скидка до 40%', desc: 'Экономьте на предзаказе' },
                  { icon: 'Sparkles', title: 'Свежайшие продукты', desc: 'Напрямую от фермера' },
                  { icon: 'CalendarCheck', title: 'Гарантированная дата', desc: 'Точно знаете когда забрать' },
                  { icon: 'MapPin', title: 'Удобные ПВЗ', desc: 'Возле вашего дома' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Преимущества для фермеров</h2>
              <div className="space-y-6">
                {[
                  { icon: 'TrendingUp', title: 'Предсказуемые объёмы', desc: 'Знаете сколько производить' },
                  { icon: 'Calendar', title: 'Планирование', desc: 'Оптимизация производства' },
                  { icon: 'Store', title: 'Без ярмарок', desc: 'Не нужно стоять на точке' },
                  { icon: 'ShieldCheck', title: 'Меньше рисков', desc: 'Снижение издержек хранения' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="w-12 h-12 flex-shrink-0 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name={item.icon as any} size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: 'Как работает предзаказ?',
                a: 'Вы выбираете продукты, оплачиваете заказ, а фермер готовит свежие товары специально для вас. После сбора заказа мы доставляем его в выбранный пункт выдачи.'
              },
              {
                q: 'Почему так дешево?',
                a: 'Фермер знает точный объём заказов заранее, что позволяет оптимизировать производство и снизить издержки. Вы получаете скидку за предзаказ.'
              },
              {
                q: 'Где забрать заказ?',
                a: 'В удобном для вас пункте выдачи. При оформлении заказа вы можете выбрать ближайший ПВЗ из списка доступных.'
              },
              {
                q: 'Как долго ждать?',
                a: 'Обычно 2-5 дней в зависимости от типа продукта. Точную дату вы узнаете при оформлении заказа.'
              }
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌾</span>
                <h3 className="text-xl font-bold">ФермаЗаказ</h3>
              </div>
              <p className="text-primary-foreground/80">
                Свежие фермерские продукты по предзаказу с доставкой в пункты выдачи
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📞 +7 (900) 123-45-67</p>
                <p>✉️ info@fermazakaz.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>О проекте</p>
                <p>Для фермеров</p>
                <p>Для ПВЗ</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>© 2024 ФермаЗаказ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
