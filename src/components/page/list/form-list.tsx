interface FormListProps {
  title: string;
}

export default function FormList({ title }: FormListProps) {
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 my-2 mx-4">
        <h1 className="text-[18px] lg:text-[24px] font-semibold text-black mb-2 lg:mb-2">{title}</h1>

        <form className="max-w-3xl">
          <div className="mb-6">
            <label className="block text-[#333333] text-[15px] mb-2 font-normal">Name</label>
            <input
              type="text"
              className="w-full px-3 py-[7px] border border-[#dddddd] rounded text-[15px] focus:outline-none focus:border-[#00BCD4] bg-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-[#333333] text-[15px] mb-2 font-normal">Description</label>
            <textarea
              rows={6}
              className="w-full px-3 py-[7px] border border-[#dddddd] rounded text-[15px] focus:outline-none focus:border-[#00BCD4] bg-white resize-y"
            />
          </div>

          <div className="mb-2">
            <label className="block text-[#333333] text-[15px] mb-2 font-normal">Public List?</label>
            <div className="relative">
              <select className="w-full px-3 h-[38px] bg-[#f0f0f0] border border-[#dddddd] rounded text-[15px] appearance-none pr-10 focus:outline-none text-[#333333]">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-[#333333] text-[15px] mb-2 font-normal">Show Comments</label>
            <div className="relative">
              <select className="w-full px-3 h-[38px] bg-[#f0f0f0] border border-[#dddddd] rounded text-[15px] appearance-none pr-10 focus:outline-none text-[#333333]">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-[#333333] text-[15px] mb-2 font-normal">Sort By</label>
            <div className="relative">
              <select className="w-full px-3 h-[38px] bg-[#f0f0f0] border border-[#dddddd] rounded text-[15px] appearance-none pr-10 focus:outline-none text-[#333333]">
                <option>Original Ascending</option>
                <option>Original Descending</option>
                <option>Alphabetical</option>
                <option>Reverse Alphabetical</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2 mb-8 mt-4 bg-[#f0f0f0] hover:bg-[#e5e5e5] rounded text-[15px] text-[#333333] transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
}
