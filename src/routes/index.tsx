import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Clock, Instagram, MapPin, Minus, Plus, ShoppingBag, Sparkles, Utensils, X } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

type Dish = { id: number; name: string; description: string; price: number; category: string; image: string; tag?: string };

const dishes: Dish[] = [
  { id: 1, name: "Burrata da Casa", description: "Tomates confitados, pesto fresco, azeite de ervas e pão de fermentação natural.", price: 48, category: "Entradas", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=85", tag: "Favorito" },
  { id: 2, name: "Polvo na Brasa", description: "Polvo grelhado, batatas ao murro, páprica defumada e aioli cítrico.", price: 76, category: "Entradas", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Risoto de Cogumelos", description: "Arroz arbóreo, mix de cogumelos, parmesão curado e toque de trufa.", price: 72, category: "Principais", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=85", tag: "Vegetariano" },
  { id: 4, name: "Entrecôte 839", description: "Corte grelhado, molho da casa, batatas douradas e salada de folhas.", price: 94, category: "Principais", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85", tag: "Assinatura" },
  { id: 5, name: "Salmão na Manteiga de Limão", description: "Salmão selado, purê aveludado e legumes da estação.", price: 86, category: "Principais", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Tiramisù 839", description: "Mascarpone cremoso, café espresso, cacau e biscoito artesanal.", price: 32, category: "Sobremesas", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85", tag: "Feito na casa" },
  { id: 7, name: "Fondant de Chocolate", description: "Chocolate intenso com centro cremoso e sorvete de baunilha.", price: 34, category: "Sobremesas", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Limonada de Siciliano", description: "Limão-siciliano, hortelã fresca e xarope artesanal.", price: 18, category: "Bebidas", image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=85" },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Index() {
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const categories = ["Todos", "Entradas", "Principais", "Sobremesas", "Bebidas"];
  const visibleDishes = category === "Todos" ? dishes : dishes.filter((dish) => dish.category === category);
  const cartItems = useMemo(() => dishes.filter((dish) => cart[dish.id]).map((dish) => ({ ...dish, quantity: cart[dish.id] })), [cart]);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  function add(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setNotice("Adicionado à sua sacola");
    window.setTimeout(() => setNotice(""), 1800);
  }
  function change(id: number, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const value = (next[id] || 0) + delta;
      if (value <= 0) delete next[id]; else next[id] = value;
      return next;
    });
  }
  const orderText = encodeURIComponent("Olá! Gostaria de fazer um pedido no BISTRO 839:\n" + cartItems.map((item) => `${item.quantity}x ${item.name} — ${money(item.price * item.quantity)}`).join("\n") + `\nTotal: ${money(total)}\nPoderiam confirmar disponibilidade e entrega/retirada?`);

  return (
    <main className="bistro-page">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Bistro 839, início"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48" role="img"><circle cx="24" cy="24" r="21" /><circle cx="24" cy="24" r="17.5" /><path d="M13 12h22M13 36h22" /><text x="24" y="28.5" textAnchor="middle">B</text><text className="brand-mark-number" x="24" y="34.5" textAnchor="middle">839</text></svg></span><span className="brand-name">BISTRO <i>839</i></span></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#conceito">O conceito</a><a href="#cardapio">Cardápio</a><a href="#ambiente">O ambiente</a><a href="#contato">Contato</a>
        </nav>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Abrir sacola, ${count} itens`}><ShoppingBag size={18} /><span>Sacola</span><b>{count}</b></button>
      </header>

      <section className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90" alt="Mesa elegante em restaurante com iluminação acolhedora" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> COZINHA CONTEMPORÂNEA · EXPERIÊNCIA AUTORAL</p>
          <h1>O prazer de<br /><em>estar à mesa.</em></h1>
          <p className="hero-description">Ingredientes extraordinários, encontros sem pressa e sabores que ficam na memória.</p>
          <div className="hero-actions"><a className="button-gold" href="#cardapio">Explore o cardápio <ArrowRight size={16} /></a><a className="text-link" href="#conceito">Conheça o Bistrô <ArrowDown size={15} /></a></div>
        </div>
        <div className="hero-note"><span>01 / 03</span><i /> UMA EXPERIÊNCIA PARA SENTIR</div>
      </section>

      <section className="intro section-wrap" id="conceito">
        <div className="intro-label"><Sparkles size={15} /> MAIS QUE UMA REFEIÇÃO</div>
        <div className="intro-copy"><h2>Feito com intenção.<br /><em>Servido com alma.</em></h2><p>No BISTRO 839, cada detalhe tem propósito. Valorizamos bons ingredientes, técnica apurada e a simplicidade de compartilhar uma mesa com quem importa.</p><a className="underlined-link" href="#cardapio">Descubra nossa cozinha <ArrowRight size={15} /></a></div>
        <div className="intro-stamp"><span>839</span><small>GASTRONOMIA<br />COM IDENTIDADE</small></div>
      </section>

      <section className="menu-section" id="cardapio">
        <div className="section-wrap">
          <div className="section-heading"><div><p className="eyebrow dark-eyebrow">DA NOSSA COZINHA PARA A SUA MESA</p><h2>O cardápio <em>839</em></h2></div><p>Sabores sazonais, ingredientes selecionados<br />e receitas feitas para compartilhar.</p></div>
          <div className="category-tabs" role="tablist" aria-label="Categorias do cardápio">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? "category-tab active" : "category-tab"} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="dish-grid">{visibleDishes.map((dish) => <article className="dish-card" key={dish.id}><div className="dish-photo"><img src={dish.image} alt={dish.name} loading="lazy" />{dish.tag && <span className="dish-tag">{dish.tag}</span>}<button className="quick-add" onClick={() => add(dish.id)} aria-label={`Adicionar ${dish.name}`}><Plus size={18} /></button></div><div className="dish-info"><div><h3>{dish.name}</h3><p>{dish.description}</p></div><strong>{money(dish.price)}</strong></div></article>)}</div>
          <div className="menu-footnote"><Utensils size={16} /><span>Nosso menu acompanha as estações e a disponibilidade dos melhores ingredientes.</span></div>
        </div>
      </section>

      <section className="ambience" id="ambiente">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85" alt="Interior intimista de restaurante, com mesas preparadas para receber" loading="lazy" />
        <div className="ambience-overlay" />
        <div className="ambience-copy"><p className="eyebrow"><span /> UM LUGAR PARA FICAR</p><h2>O tempo desacelera.<br /><em>A conversa acontece.</em></h2><p>Luz baixa, hospitalidade genuína e uma atmosfera feita para encontros especiais — dos mais espontâneos aos inesquecíveis.</p><a className="button-gold" href="#contato">Venha nos conhecer <ArrowRight size={16} /></a></div>
      </section>

      <section className="contact-section section-wrap" id="contato"><div><p className="eyebrow dark-eyebrow">SUA MESA ESTÁ À ESPERA</p><h2>Vamos brindar<br /><em>aos bons momentos.</em></h2></div><div className="contact-details"><p><MapPin size={17} /> Consulte nosso endereço pelos canais oficiais.</p><p><Clock size={17} /> Horários e reservas sob consulta.</p><p className="contact-note">Entre em contato para consultar disponibilidade, horários e opções para sua ocasião.</p><a className="button-dark" href="#cardapio">Escolher seus pratos <ArrowRight size={16} /></a></div></section>
      <footer className="site-footer"><a className="brand footer-brand" href="#"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48" role="img"><circle cx="24" cy="24" r="21" /><circle cx="24" cy="24" r="17.5" /><path d="M13 12h22M13 36h22" /><text x="24" y="28.5" textAnchor="middle">B</text><text className="brand-mark-number" x="24" y="34.5" textAnchor="middle">839</text></svg></span><span className="brand-name">BISTRO <i>839</i></span></a><span>COZINHA CONTEMPORÂNEA · FEITA COM INTENÇÃO</span><a href="#contato" aria-label="Contato e redes sociais"><Instagram size={19} /></a><small>© {new Date().getFullYear()} BISTRO 839. Todos os direitos reservados.</small></footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-panel" onClick={(event) => event.stopPropagation()} aria-label="Sua sacola"><div className="cart-heading"><div><p className="eyebrow dark-eyebrow">BISTRO 839</p><h2>Sua sacola</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar sacola"><X /></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={30} /><p>Sua sacola está esperando por algo especial.</p><button className="button-dark" onClick={() => { setCartOpen(false); document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" }); }}>Explorar cardápio</button></div> : <><div className="cart-items">{cartItems.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-copy"><h3>{item.name}</h3><strong>{money(item.price * item.quantity)}</strong><div className="quantity-control"><button onClick={() => change(item.id, -1)} aria-label="Diminuir quantidade"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => change(item.id, 1)} aria-label="Aumentar quantidade"><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>Total estimado</span><strong>{money(total)}</strong></div><p className="cart-disclaimer">Pedido sujeito à confirmação do estabelecimento. Valores e disponibilidade podem variar.</p><a className="button-dark checkout-button" href={`https://wa.me/5521965757161?text=${orderText}`} target="_blank" rel="noreferrer">Continuar pelo WhatsApp <ArrowRight size={16} /></a></>}</aside></div>}
    </main>
  );
}
