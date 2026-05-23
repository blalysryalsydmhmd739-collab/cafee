import React from 'react';

const menuCategories = [
  {
    title: "فطور مصري",
    items: [
      { name: "فول مدمس بالزيت الحار", price: "£4.00", text: "فول مدمس تقليدي مع زيت حار وطحينة" },
      { name: "طعمية محشية", price: "£3.50", text: "فلافل مصرية محشية بالخلطة الحارة مع سمسم" },
      { name: "بيض بالبسطرمة", price: "£5.50", text: "بيض مقلي مع شرائح البسطرمة اللذيذة" },
      { name: "جبنة بالطماطم", price: "£3.00", text: "جبنة بيضاء مع قطع الطماطم وزيت الزيتون" },
    ]
  },
  {
    title: "أطباق وطواجن",
    items: [
      { name: "كشري مصري", price: "£7.50", text: "أرز ومكرونة وعدس مع الصلصة والدقة والبصل المقرمش" },
      { name: "طاجن مكرونة باللحم", price: "£8.50", text: "طاجن مكرونة فرن بصلصة الطماطم واللحم المفروم" },
      { name: "حواوشي إسكندراني", price: "£6.50", text: "خبز محشو باللحم المفروم المتبل والمشوي" },
    ]
  },
  {
    title: "مشروبات ساخنة",
    items: [
      { name: "قهوة تركية", price: "£3.00", text: "قهوة مظبوطة محوجة مع وش مثالي" },
      { name: "شاي كشري بالنعناع", price: "£2.50", text: "شاي أسود مع أوراق النعناع الطازجة" },
      { name: "سحلب بالمكسرات", price: "£4.50", text: "مشروب سحلب ساخن مع جوز الهند والزبيب والفستق" },
      { name: "حمص الشام", price: "£4.00", text: "مشروب شتوي دافئ مع الليمون والكمون والشطة" },
    ]
  },
  {
    title: "حلويات شرقية ومشروبات باردة",
    items: [
      { name: "أم علي", price: "£5.00", text: "عجينة الميل فاي مع الحليب الساخن والمكسرات والقشطة" },
      { name: "أرز بلبن", price: "£4.00", text: "أرز بالحليب مطهو ببطء ومزين بالمكسرات" },
      { name: "عصير قصب", price: "£3.50", text: "عصير قصب طازج ومنعش" },
      { name: "كركديه مثلج", price: "£3.00", text: "مشروب كركديه بارد ومنعش" },
    ]
  }
];

export default function Menu() {
  return (
    <section id="menu" className="py-24 bg-zaffron-bglight">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 border-l-4 border-zaffron-orange pl-4 pr-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-zaffron-dark uppercase tracking-wide mr-4 border-r-4 border-zaffron-orange pr-4 border-l-0">
            قائمتنا
          </h2>
          <p className="text-zaffron-gray mt-4 mr-4">اكتشف مجموعة من الأطباق المصرية الرائعة والمشروبات المنعشة التي نعدها خصيصاً لك.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {menuCategories.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-bold text-zaffron-dark mb-6 pb-2 border-b-2 border-gray-200">
                {category.title}
              </h3>
              <ul className="space-y-6">
                {category.items.map((item, i) => (
                  <li key={i} className="flex flex-col">
                    <div className="flex items-center w-full font-bold text-lg text-zaffron-dark">
                      <span>{item.name}</span>
                      <div className="dotted-leader"></div>
                      <span className="font-bold">{item.price}</span>
                    </div>
                    <p className="text-sm text-zaffron-gray mt-1">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
