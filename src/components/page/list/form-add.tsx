export default function FormAdd() {
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 my-2 mx-4">
        <h1 className="text-[18px] lg:text-[24px] font-semibold text-black mb-2 lg:mb-2">movies</h1>

        <form className="max-w-3xl">
          <div className="mb-6">
            <label className="block text-[#333333] text-[15px] mb-2 font-normal">Add Item</label>
            <input
              type="text"
              placeholder="Search for a movie"
              className="w-full px-3 py-[7px] border border-[#dddddd] rounded text-[15px] focus:outline-none focus:border-[#00BCD4] bg-white"
            />
          </div>
        </form>
      </div>
    </>
  );
}
