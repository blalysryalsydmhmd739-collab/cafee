"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MenuFoodImage from "@/components/MenuFoodImage";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Flame, Scale, ShoppingCart } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "breakfast" | "lunch" | "drinks" | "desserts";
  calories: string;
  ingredients: string;
}

const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "b1",
    name: "فول مدمس بالزيت الحار",
    price: 4.00,
    description: "فول بلدي مدمس ببطء مع زيت حار طازج، طحينة، وليمون.",
    image: "https://images.unsplash.com/photo-1637861004714-49fa0ccbb993?auto=format&fit=crop&w=600&q=80",
    category: "breakfast",
    calories: "290 سعرة حرارية",
    ingredients: "فول مدمس، زيت حار، طحينة سمسم، كمون، ثوم، ليمون، ملح",
  },
  {
    id: "b2",
    name: "طعمية محشية بالخلطة",
    price: 3.50,
    description: "فلافل مصرية مقرمشة محشية بخليط البصل الحار ومغطاة بالسمسم.",
    image: "https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d?auto=format&fit=crop&w=600&q=80",
    category: "breakfast",
    calories: "210 سعرة حرارية",
    ingredients: "حمص، فول مدشوش، بقدونس، كزبرة، سمسم، شطة حمراء، بصل، ثوم",
  },
  {
    id: "b3",
    name: "بيض عيون بالبسطرمة",
    price: 5.50,
    description: "بيض مقلي بالسمن البلدي مع قطع البسطرمة الغنية بالثوم.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80",
    category: "breakfast",
    calories: "340 سعرة حرارية",
    ingredients: "بيض طازج، بسطرمة مصرية فاخرة، سمن بلدي، فلفل أسود",
  },
  {
    id: "b4",
    name: "جبنة بيضاء بالطماطم وزيت الزيتون",
    price: 3.00,
    description: "جبنة فيتا كريمية مع مكعبات الطماطم، الخيار، والنعناع الطازج وزيت الزيتون البكر.",
    image: "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?auto=format&fit=crop&w=600&q=80",
    category: "breakfast",
    calories: "180 سعرة حرارية",
    ingredients: "جبنة فيتا، طماطم طازجة، خيار، زيت زيتون بكر، نعناع بلدي جاف",
  },
  // Lunch / Main
  {
    id: "l1",
    name: "كشري ملاذ الفاخر",
    price: 7.50,
    description: "مزيج الكشري المصري الكلاسيكي مع الأرز، العدس، المكرونة، الحمص، والصلصة الحارة والبصل المقرمش.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    category: "lunch",
    calories: "550 سعرة حرارية",
    ingredients: "أرز مصري، عدس بجبة، مكرونة مرمرية، حمص مسلوق، صلصة طماطم بالخل والثوم، تقلية (بصل مقرمش)",
  },
  {
    id: "l2",
    name: "حواوشي بلدي بالجبنة",
    price: 6.50,
    description: "خبز بلدي محشو باللحم المفروم المتبل بالبهارات والنعناع مع طبقة من الموتزاريلا المشوية.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    category: "lunch",
    calories: "490 سعرة حرارية",
    ingredients: "لحم بقري مفروم، خبز بلدي، بصل، فلفل أخضر حار، جبنة موتزاريلا، بهارات حواوشي خاصة",
  },
  {
    id: "l3",
    name: "طاجن مكرونة باللحم المفروم",
    price: 8.50,
    description: "مكرونة قلم مطهوة في الفرن داخل طاجن فخاري مع صلصة طماطم غنية ولحم مفروم متبل.",
    image: "https://images.unsplash.com/photo-1637861004714-49fa0ccbb993?auto=format&fit=crop&w=600&q=80",
    category: "lunch",
    calories: "420 سعرة حرارية",
    ingredients: "مكرونة قلم، لحم بقري مفروم، صلصة طماطم طازجة، بهارات شرقية، ثوم وبصل",
  },
  // Drinks
  {
    id: "dr1",
    name: "قهوة تركية بالهيل",
    price: 3.00,
    description: "قهوة مطحونة ناعمة مطهوة ببطء مع حبات الهيل المطحون ووجه غني كثيف.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    category: "drinks",
    calories: "40 سعرة حرارية",
    ingredients: "بن يمني محمص ومطحون، حبهان (هيل) مطحون، ماء، سكر حسب الرغبة",
  },
  {
    id: "dr2",
    name: "شاي كشري بالنعناع",
    price: 2.50,
    description: "شاي أسود مصري محضر على الطريقة التقليدية مع أوراق النعناع البلدي الطازج.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    category: "drinks",
    calories: "10 سعرة حرارية",
    ingredients: "أوراق شاي أسود فاخر، نعناع بلدي طازج، ماء مغلي",
  },
  {
    id: "dr3",
    name: "سحلب بالمكسرات وجوز الهند",
    price: 4.50,
    description: "مشروب الحليب الساخن الكثيف بنكهة المستكة مزين بالفستق، اللوز، جوز الهند، والزبيب.",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80",
    category: "drinks",
    calories: "280 سعرة حرارية",
    ingredients: "مسحوق السحلب الطبيعي، حليب طازج، مستكة، جوز هند مبشور، زبيب، فستق سوداني",
  },
  {
    id: "dr4",
    name: "كركديه أسواني مثلج",
    price: 3.00,
    description: "مشروب الكركديه المنعش المستخلص بارداً من بتلات الكركديه الأسواني الطبيعي.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    category: "drinks",
    calories: "90 سعرة حرارية",
    ingredients: "بتلات كركديه أسواني مجففة، ماء نقي، سكر، مكعبات ثلج",
  },
  // Desserts
  {
    id: "ds1",
    name: "طاجن أم علي بالقشطة",
    price: 5.00,
    description: "رقائق العجين الهش المشرب بالحليب الساخن والمحلى، محشو بالمكسرات ومغطى بالقشطة والزبدة البلدية.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    category: "desserts",
    calories: "450 سعرة حرارية",
    ingredients: "رقائق ميل فاي، حليب طازج، قشطة بلدي، لوز، بندق، زبيب، جوز هند، سكر",
  },
  {
    id: "ds2",
    name: "أرز بلبن بالمستكة والفستق",
    price: 4.00,
    description: "أرز بالحليب مطهو ببطء بنكهة المستكة وماء الورد، يقدم بارداً ومزيناً بالفستق الحلبي المطحون.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    category: "desserts",
    calories: "260 سعرة حرارية",
    ingredients: "أرز مصري، حليب طازج، قشطة، مستكة، ماء ورد، فستق حلبي مطحون",
  },
];

const categories = [
  { id: "all", name: "الكل" },
  { id: "breakfast", name: "إفطار" },
  { id: "lunch", name: "أطباق رئيسية" },
  { id: "drinks", name: "مشروبات" },
  { id: "desserts", name: "حلويات" },
];

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Set active category from search params on mount or when param changes
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.some((c) => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/menu?${params.toString()}`, { scroll: false });
  };

  // Filter items based on category and search query
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 max-w-6xl pt-32 pb-24 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-amber-500 font-bold uppercase tracking-wider text-xs md:text-sm">
          قائمتنا المتكاملة
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 dark:text-white leading-tight font-serif">
          تذوق الأصالة والتميز
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base">
          نقدم لك ألذ الأطباق المصرية التقليدية المحضرة بلمسات حديثة وبأفضل المكونات.
        </p>
      </div>

      {/* Filter Controls (Search + Tabs) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-sm border border-stone-200/40 dark:border-stone-850/40 transition-colors">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="ابحث عن وجبة أو مشروب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
          <Search className="absolute left-3.5 top-3 text-stone-400" size={16} />
        </div>
      </div>

      {/* Grid of Food Items */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-20 text-center text-stone-500 dark:text-stone-400 space-y-4"
            >
              <p className="text-lg font-bold">لم نجد أي وجبة تطابق بحثك.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-amber-500 font-bold hover:underline"
              >
                عرض كل المأكولات
              </button>
            </motion.div>
          ) : (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/40 dark:border-stone-850/40 overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Food Image with scale */}
                <div className="relative w-full h-56 overflow-hidden">
                  <MenuFoodImage
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400">
                    £{item.price.toFixed(2)}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-right">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1">
                      <Flame size={12} className="text-red-500" />
                      {item.calories}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening modal
                        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category });
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-md transition-all duration-300 flex items-center justify-center hover:scale-110"
                      title="إضافة للسلة"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal Component */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl z-50 flex flex-col md:flex-row border border-stone-200 dark:border-stone-800"
            >
              {/* Modal Image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[250px]">
                <MenuFoodImage
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 md:hidden p-2 bg-black/50 text-white hover:bg-black/70 rounded-full transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Details */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between text-right space-y-6">
                {/* Desktop Close Button */}
                <div className="hidden md:flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full text-stone-500 transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <span className="text-amber-500 font-bold text-xs uppercase tracking-wider">
                    {categories.find((c) => c.id === selectedItem.category)?.name}
                  </span>
                  <h3 className="text-2xl font-extrabold text-stone-900 dark:text-white leading-tight">
                    {selectedItem.name}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {/* Calories & Ingredients */}
                  <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <Scale size={14} className="text-stone-400" />
                      <span><strong>المكونات:</strong> {selectedItem.ingredients}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame size={14} className="text-red-500" />
                      <span><strong>السعرات الحرارية:</strong> {selectedItem.calories}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                  <div>
                    <span className="text-xs text-stone-400 block">السعر</span>
                    <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                      £{selectedItem.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart({
                        id: selectedItem.id,
                        name: selectedItem.name,
                        price: selectedItem.price,
                        image: selectedItem.image,
                        category: selectedItem.category,
                      });
                      setSelectedItem(null); // Close modal on add
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    أضف للطلب
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navbar />
      <Suspense fallback={
        <div className="h-screen w-full flex items-center justify-center text-stone-500">
          جاري تحميل القائمة...
        </div>
      }>
        <MenuContent />
      </Suspense>
      <Footer />
    </main>
  );
}
