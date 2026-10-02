export default function CoursesSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header */}
      <div className="mb-10">
        <p className="text-sm sm:text-base font-medium text-gray-500 mb-2">
          Explore our classes and master trending skills!
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Dive Into <span className="text-[#00B67A]">What&apos;s Hot Right Now!</span> 🔥
        </h2>
      </div>

      {/* 2. Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* CARD 1: Big Crimson Red Hero Card (Spans 6 cols) */}
        <div className="lg:col-span-6 bg-[#B52536] text-white rounded-[36px] p-8 sm:p-12 flex flex-col justify-between shadow-sm min-h-[480px]">
          
          <div className="flex justify-end">
            <button className="text-sm font-semibold text-white/90 hover:text-white flex items-center gap-1.5 transition-colors">
              <span>View all Courses</span>
              <span className="text-base">→</span>
            </button>
          </div>

          {/* 4 Tech Badges */}
          <div className="flex items-center gap-4 sm:gap-6 my-8">
            <div className="w-14 h-14 rounded-2xl bg-[#00D8FF]/20 border border-[#00D8FF]/40 flex items-center justify-center text-2xl shadow-sm">
              ⚛️
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center text-xl shadow-sm">
              💬
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#41B883]/25 border border-[#41B883]/40 flex items-center justify-center text-2xl font-black text-[#41B883] shadow-sm">
              V
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-400/25 border border-amber-400/40 flex items-center justify-center text-2xl shadow-sm">
              🎨
            </div>
          </div>

          {/* Bottom: 23+ All Courses */}
          <div className="flex items-baseline gap-4">
            <div className="flex items-start">
              <span className="text-7xl sm:text-8xl font-black tracking-tighter leading-none">
                23
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white ml-1">
                +
              </span>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                All Courses
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-normal mt-1 max-w-[200px]">
                courses you&apos;re powering through right now.
              </p>
            </div>
          </div>

        </div>

        {/* CARD 2: Upcoming Courses (Spans 3 cols) */}
        <div className="lg:col-span-3 bg-[#FDF0EE] rounded-[36px] p-8 flex flex-col justify-between min-h-[480px]">
          
          {/* Rotated Text Block (Clockwise 90deg, 2 neat parallel lines) */}
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="rotate-270 whitespace-nowrap flex flex-col gap-1.5 select-none origin-center">
              <span className="text-4xl font-black text-[#B52536] tracking-tight">
                Upcoming 
              </span>
               <span className="text-4xl font-black text-[#B52536] tracking-tight">
                Courses
              </span>
              <span className="text-[14px] font-medium text-[#B52536]/80 tracking-wide">
                exciting new courses 
              </span>
              <span className="text-[14px] font-medium text-[#B52536]/80 tracking-wide">
                waiting to boost your skills.
              </span>
            </div>
          </div>

          {/* Bottom Number */}
          <div className="flex items-start pl-2 pb-2">
            <span className="text-7xl sm:text-8xl font-black text-[#B52536] tracking-tighter leading-none">
              05
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#B52536] ml-1">
              +
            </span>
          </div>

        </div>

        {/* CARD 3: Ongoing Courses (Spans 3 cols) */}
        <div className="lg:col-span-3 bg-[#FDF0EE] rounded-[36px] p-8 flex flex-col justify-between min-h-[480px]">
          
          {/* Rotated Text Block (Clockwise 90deg, 2 neat parallel lines) */}
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="rotate-270 whitespace-nowrap flex flex-col gap-1.5 select-none origin-center">
              <span className="text-4xl font-black text-[#B52536] tracking-tight">
                Ongoing 
              </span>
              <span className="text-4xl font-black text-[#B52536] tracking-tight">
                Courses 
              </span>
              <span className="text-[14px] font-medium text-[#B52536]/80 tracking-wide">
                currently happening—don&apos;t 
              </span>
               <span className="text-[14px] font-medium text-[#B52536]/80 tracking-wide">
                miss out on the action!
              </span>
            </div>
          </div>

          {/* Bottom Number */}
          <div className="flex items-start pl-2 pb-2">
            <span className="text-7xl sm:text-8xl font-black text-[#B52536] tracking-tighter leading-none">
              10
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#B52536] ml-1">
              +
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}