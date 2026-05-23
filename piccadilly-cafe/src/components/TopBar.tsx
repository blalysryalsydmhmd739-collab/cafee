import React from 'react';

export default function TopBar() {
  return (
    <div className="bg-black text-zaffron-orange text-xs md:text-sm py-2 px-6 flex flex-col md:flex-row justify-between items-center z-50 relative">
      <div className="mb-2 md:mb-0">
        <span>تحتاج مساعدة؟ اتصل بنا على: </span>
        <span className="font-bold ml-4" dir="ltr">+44 20 7946 0958</span>
      </div>
      <div>
        <span>ساعات العمل: الاثنين - الأحد 8:00 ص - 10:00 م</span>
      </div>
    </div>
  );
}
