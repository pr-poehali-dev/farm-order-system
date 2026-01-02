import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/projects/fa62f71d-50ca-42ff-abc6-043c2f78f158/bucket/4x/logo.png" alt="Логотип" className="h-10 w-10 object-contain" />
              <h1 className="text-xl md:text-2xl font-bold text-primary whitespace-nowrap">Фермерская корзина</h1>
            </div>
            
            <div className="hidden lg:flex items-center gap-1 flex-1 max-w-md">
              <Input 
                type="search" 
                placeholder="Поиск продуктов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" variant="ghost">
                <Icon name="Search" size={20} />
              </Button>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#pickup-points" className="text-sm font-medium hover:text-primary transition-colors">Пункты выдачи</a>
              <a href="#partner" className="text-sm font-medium hover:text-primary transition-colors">Стать партнером</a>
            </nav>

            <div className="flex items-center gap-2">
              <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Icon name="User" size={18} className="mr-2" />
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Регистрация / Вход</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="client" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="client">Клиент</TabsTrigger>
                      <TabsTrigger value="producer">Производитель</TabsTrigger>
                      <TabsTrigger value="pickup">ПВЗ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="client" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Телефон или Email</label>
                        <Input type="text" placeholder="+7 (___) ___-__-__" />
                      </div>
                      <Button className="w-full">Получить код</Button>
                    </TabsContent>
                    <TabsContent value="producer" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Телефон или Email</label>
                        <Input type="text" placeholder="+7 (___) ___-__-__" />
                      </div>
                      <Button className="w-full">Получить код</Button>
                    </TabsContent>
                    <TabsContent value="pickup" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Телефон или Email</label>
                        <Input type="text" placeholder="+7 (___) ___-__-__" />
                      </div>
                      <Button className="w-full">Получить код</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Icon name="ShoppingCart" size={18} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-xs">
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
            Оформить предзаказ
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

      <section id="advantages" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Преимущества для всех</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="ShoppingBag" size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Для покупателей</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'Percent', title: 'Скидка до 40%', desc: 'Экономьте на предзаказе' },
                  { icon: 'Sparkles', title: 'Свежайшие продукты', desc: 'Напрямую от фермера' },
                  { icon: 'CalendarCheck', title: 'Гарантированная дата', desc: 'Точно знаете когда забрать' },
                  { icon: 'MapPin', title: 'Удобные ПВЗ', desc: 'Возле вашего дома' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <Icon name={item.icon as any} size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                Оформить предзаказ
              </Button>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <Icon name="Tractor" size={32} className="text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Для фермеров</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'TrendingUp', title: 'Предсказуемые объёмы', desc: 'Знаете сколько производить' },
                  { icon: 'Calendar', title: 'Планирование', desc: 'Оптимизация производства' },
                  { icon: 'Store', title: 'Без ярмарок', desc: 'Не нужно стоять на точке' },
                  { icon: 'ShieldCheck', title: 'Меньше рисков', desc: 'Снижение издержек хранения' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <Icon name={item.icon as any} size={20} className="text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-amber-600 hover:bg-amber-700">
                Стать партнером
              </Button>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="Package" size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Для ПВЗ</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'Users', title: 'Новые клиенты', desc: 'Привлекаем покупателей на ваши товары' },
                  { icon: 'DollarSign', title: 'Доп. доход', desc: 'Без дополнительных расходов' },
                  { icon: 'Home', title: 'Без новых площадей', desc: 'Используете имеющееся пространство' },
                  { icon: 'TrendingUp', title: 'Узнаваемость', desc: 'Повышение видимости в интернете' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <Icon name={item.icon as any} size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                Стать пунктом выдачи
              </Button>
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
              <div className="flex items-center gap-3 mb-4">
                <img src="https://cdn.poehali.dev/projects/fa62f71d-50ca-42ff-abc6-043c2f78f158/bucket/4x/logo.png" alt="Логотип" className="h-10 w-10 object-contain brightness-0 invert" />
                <h3 className="text-xl font-bold">Фермерская корзина</h3>
              </div>
              <p className="text-primary-foreground/80">
                Свежие фермерские продукты по предзаказу с доставкой в пункты выдачи
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (906) 183-93-39
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  activator2025@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <a href="#about" className="block hover:text-primary-foreground transition-colors">О проекте</a>
                <a href="#partner" className="block hover:text-primary-foreground transition-colors">Для фермеров</a>
                <a href="#pickup-points" className="block hover:text-primary-foreground transition-colors">Для ПВЗ</a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>© 2026 Фермерская корзина. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;