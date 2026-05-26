import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, Heart, Shield, Moon, Sparkles, Gem, Leaf, Star, SlidersHorizontal, ShoppingBag, CircleDot } from "lucide-react";
import { motion } from "framer-motion";
import "./style.css";

const intentions = [
  { key: "Calm", zh: "静心安神", icon: Moon, desc: "舒缓焦虑、稳定情绪、回到内在平衡", color: "bg-[#e8dfcf]" },
  { key: "Love", zh: "柔爱养心", icon: Heart, desc: "自爱、亲密关系、修复柔软能量", color: "bg-[#ead8d2]" },
  { key: "Protection", zh: "守护净化", icon: Shield, desc: "清理浊气、稳定气场、日常防护", color: "bg-[#d9d4ca]" },
  { key: "Abundance", zh: "财运丰盛", icon: Sparkles, desc: "显化机会、提升行动力与丰盛意识", color: "bg-[#eadfbd]" },
  { key: "Sleep", zh: "夜间安眠", icon: Moon, desc: "睡前放松、安定心神、温柔疗愈", color: "bg-[#ddd8e8]" },
  { key: "Spirituality", zh: "灵性觉察", icon: Star, desc: "冥想、直觉、内在连接与能量提升", color: "bg-[#ded8d1]" },
];

const crystals = [
  { name: "Amethyst Cluster", zh: "紫水晶晶簇", price: "$38", intention: "Calm", type: "Raw Stone", chakra: "Crown", tags: ["静心", "安眠", "冥想"], img: "https://images.unsplash.com/photo-1615484477201-9f4953340fab?auto=format&fit=crop&w=900&q=80" },
  { name: "Rose Quartz Bracelet", zh: "粉晶手串", price: "$29", intention: "Love", type: "Bracelet", chakra: "Heart", tags: ["柔爱", "自愈", "关系"], img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80" },
  { name: "Black Tourmaline Point", zh: "黑碧玺水晶柱", price: "$42", intention: "Protection", type: "Point", chakra: "Root", tags: ["守护", "扎根", "净化"], img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80" },
  { name: "Citrine Tumbled Stone", zh: "黄水晶滚石", price: "$18", intention: "Abundance", type: "Tumbled Stone", chakra: "Solar Plexus", tags: ["财运", "喜悦", "显化"], img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80" },
  { name: "Moonstone Palm Stone", zh: "月光石掌心石", price: "$35", intention: "Sleep", type: "Palm Stone", chakra: "Third Eye", tags: ["安眠", "女性能量", "直觉"], img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80" },
  { name: "Clear Quartz Sphere", zh: "白水晶球", price: "$68", intention: "Spirituality", type: "Sphere", chakra: "Crown", tags: ["净明", "聚气", "专注"], img: "https://images.unsplash.com/photo-1603561596112-db1d9ba8509d?auto=format&fit=crop&w=900&q=80" },
  { name: "Tiger Eye Bracelet", zh: "虎眼石手串", price: "$31", intention: "Protection", type: "Bracelet", chakra: "Solar Plexus", tags: ["胆识", "守护", "行动"], img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80" },
  { name: "Fluorite Tower", zh: "萤石塔", price: "$46", intention: "Calm", type: "Point", chakra: "Third Eye", tags: ["专注", "清明", "静心"], img: "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=900&q=80" },
];

const filters = ["All", "Calm", "Love", "Protection", "Abundance", "Sleep", "Spirituality"];
const filterZh = { All: "全部", Calm: "静心", Love: "柔爱", Protection: "守护", Abundance: "财运", Sleep: "安眠", Spirituality: "灵性" };

function App() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const products = useMemo(() => crystals.filter((item) => {
    const matchFilter = active === "All" || item.intention === active;
    const matchQuery = `${item.name} ${item.zh} ${item.tags.join(" ")} ${item.type}`.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  }), [active, query]);

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#2f241d]">
      <header className="sticky top-0 z-40 border-b border-[#d8c7aa]/70 bg-[#f5f1e8]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5c3d2e] text-[#f8efe2] shadow-sm"><Gem size={18} /></div><div><p className="text-xs uppercase tracking-[0.32em] text-[#8c725b]">Oriental Crystal</p><h1 className="text-lg font-semibold tracking-wide">东方疗愈水晶馆</h1></div></div>
          <nav className="hidden items-center gap-8 text-sm text-[#7a614d] md:flex"><a href="#intentions">能量分类</a><a href="#catalog">晶石目录</a><a href="#learn">疗愈指南</a></nav>
          <a href="#catalog" className="rounded-full bg-[#5c3d2e] px-5 py-2 text-sm text-[#fff8ed] shadow-sm transition hover:bg-[#6d4c3d]">进入选晶</a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.08fr_0.92fr] md:py-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#d8c7aa] bg-[#fffaf1] px-4 py-2 text-sm text-[#7a614d] shadow-sm"><Leaf size={16} /> 东方疗愈 · 五行能量 · 水晶气场</p>
          <h2 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">东方疗愈能量水晶目录</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#7a614d]">以东方疗愈、美学与能量场景为核心，帮助用户按静心、柔爱、守护、财运、安眠与灵性觉察寻找适合自己的晶石。</p>
          <div className="mt-8 flex flex-wrap gap-3">{filters.slice(1, 5).map((item) => (<button key={item} onClick={() => setActive(item)} className="rounded-full border border-[#c9b08d] bg-[#fffaf1] px-5 py-3 text-sm shadow-sm transition hover:bg-[#5c3d2e] hover:text-[#fff8ed]">{filterZh[item]}</button>))}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
          <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[#b7a47a]/35 blur-3xl" /><div className="absolute -right-4 bottom-8 h-36 w-36 rounded-full bg-[#8e6f47]/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d8c7aa] bg-[#fffaf1] p-4 shadow-2xl shadow-[#b69c78]/20"><img className="h-[520px] w-full rounded-[1.1rem] object-cover sepia-[0.12]" src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80" alt="Healing crystals" /><div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-[#d8c7aa]/70 bg-[#fffaf1]/88 p-5 backdrop-blur-xl"><p className="text-sm uppercase tracking-[0.24em] text-[#8c725b]">Featured Ritual</p><h3 className="mt-1 text-2xl font-semibold">静心安神水晶套组</h3><p className="mt-2 text-sm text-[#7a614d]">紫水晶 · 萤石 · 月光石</p></div></div>
        </motion.div>
      </section>

      <section id="intentions" className="mx-auto max-w-7xl px-5 py-10"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm uppercase tracking-[0.25em] text-[#8c725b]">Shop by Energy</p><h2 className="mt-2 text-3xl font-semibold md:text-4xl">按东方能量意图浏览</h2></div><p className="hidden max-w-md text-sm leading-6 text-[#7a614d] md:block">目录不只按晶石名称分类，而是按用户的身心状态、空间场景与能量需求分类。</p></div><div className="grid gap-4 md:grid-cols-3">{intentions.map(({ key, zh, icon: Icon, desc, color }) => (<button key={key} onClick={() => setActive(key)} className={`${color} group rounded-[1.5rem] border border-[#fffaf1] p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b69c78]/20`}><div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#fffaf1] text-[#5c3d2e] shadow-sm"><Icon size={22} /></div><h3 className="text-2xl font-semibold">{filterZh[key]}</h3><p className="mt-1 text-lg text-[#5f4939]">{zh}</p><p className="mt-3 text-sm leading-6 text-[#7a614d]">{desc}</p></button>))}</div></section>

      <section id="catalog" className="mx-auto max-w-7xl px-5 py-16"><div className="rounded-[1.5rem] border border-[#d8c7aa] bg-[#fffaf1] p-5 shadow-sm md:p-8"><div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm uppercase tracking-[0.25em] text-[#8c725b]">Crystal Catalog</p><h2 className="mt-2 text-3xl font-semibold">疗愈晶石目录</h2></div><div className="flex flex-col gap-3 sm:flex-row"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8067]" size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索晶石 / 功效 / 形态" className="h-12 w-full rounded-full border border-[#d8c7aa] bg-[#f5f1e8] pl-11 pr-4 text-sm outline-none focus:border-[#8e6f47] sm:w-72" /></div><button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d8c7aa] px-5 text-sm text-[#7a614d]"><SlidersHorizontal size={17} /> 筛选</button></div></div><div className="mb-8 flex gap-2 overflow-x-auto pb-2">{filters.map((item) => (<button key={item} onClick={() => setActive(item)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition ${active === item ? "bg-[#5c3d2e] text-[#fff8ed]" : "bg-[#efe6d8] text-[#7a614d] hover:bg-[#e0d0b8]"}`}>{filterZh[item]}</button>))}</div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((item) => (<motion.article layout key={item.name} className="group overflow-hidden rounded-[1.5rem] border border-[#e3d6c2] bg-[#f5f1e8]"><div className="relative overflow-hidden"><img className="h-72 w-full object-cover sepia-[0.08] transition duration-500 group-hover:scale-105" src={item.img} alt={item.name} /><div className="absolute left-4 top-4 rounded-full bg-[#fffaf1]/90 px-3 py-1 text-xs text-[#6b503d] backdrop-blur">{filterZh[item.intention]}</div></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{item.name}</h3><p className="mt-1 text-sm text-[#8c725b]">{item.zh}</p></div><p className="font-semibold">{item.price}</p></div><div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => (<span key={tag} className="rounded-full bg-[#fffaf1] px-3 py-1 text-xs text-[#7a614d]">{tag}</span>))}</div><p className="mt-4 text-xs text-[#8c725b]">{item.type} · {item.chakra} Chakra</p><button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#5c3d2e] px-4 py-3 text-sm text-[#fff8ed] transition hover:bg-[#6d4c3d]"><ShoppingBag size={16} /> 加入清单</button></div></motion.article>))}</div></div></section>

      <section id="learn" className="mx-auto max-w-7xl px-5 pb-20"><div className="grid gap-6 md:grid-cols-3"><div className="rounded-[1.5rem] bg-[#5c3d2e] p-8 text-[#fff8ed] md:col-span-1"><p className="text-sm uppercase tracking-[0.25em] text-[#d8c7aa]">Crystal Guide</p><h2 className="mt-3 text-3xl font-semibold">把目录页做成疗愈知识入口</h2><p className="mt-4 text-sm leading-7 text-[#e8d9c2]">每个分类页底部增加晶石寓意、佩戴方式、空间摆放、适合人群和 FAQ，有利于 SEO，也能提高用户信任。</p></div><div className="rounded-[1.5rem] border border-[#d8c7aa] bg-[#fffaf1] p-8 shadow-sm md:col-span-2"><div className="grid gap-5 md:grid-cols-2">{[["如何选晶", "不知道买什么时，用能量意图、五行场景、脉轮与星座引导用户。"],["如何使用", "说明佩戴、冥想、香薰空间、茶席摆放、睡前仪式等使用方法。"],["晶石寓意", "每个晶石都配独立知识页，承接 Google 搜索流量。"],["疗愈套组", "把单品组合成静心套组、守护套组、财运套组，提高客单价。"]].map(([title, text]) => (<div key={title} className="rounded-3xl bg-[#f5f1e8] p-6"><div className="mb-3 flex items-center gap-2 text-[#5c3d2e]"><CircleDot size={15} /><h3 className="text-lg font-semibold">{title}</h3></div><p className="text-sm leading-6 text-[#7a614d]">{text}</p></div>))}</div></div></div></section>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
