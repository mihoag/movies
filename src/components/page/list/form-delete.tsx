export default function FormList() {
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 my-2 mx-4">
        <h1 className="text-[18px] lg:text-[24px] font-semibold text-black mb-2 lg:mb-2">movies</h1>
        <p className="">Click the button below if you are sure you want to delete this list.</p>
        <button
          type="button"
          className="w-full sm:w-auto px-5 py-2 mb-8 mt-4 bg-[#f0f0f0] hover:bg-[#e5e5e5] rounded text-[15px] text-[#333333] transition-colors"
        >
          Delete{' '}
        </button>
      </div>
    </>
  );
}
