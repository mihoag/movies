import FormList from '../../components/page/list/form-list';
export default function ListCreator() {
  return (
    <div className="min-h-screen lg:flex relative px-8">
      {/* Sidebar */}
      <div
        className={`
        fixed inset-0 z-40 lg:relative lg:inset-auto
        w-[280px] bg-white shadow-md 
        transform transition-transform duration-300 ease-in-out
        m-0 lg:m-4 max-h-[40vh] rounded-[10px] mx-4 ml-8
      `}
      >
        <div className="bg-[rgb(1,180,228)] rounded-t-[10px] text-white px-6 py-4 text-xl font-bold">Edit</div>

        <div className="py-5">
          <div className="text-[rgb(1,180,228)] px-6 py-[11px] text-[15px] font-semibold">Step 1: List Details</div>
          <div className="text-[#666666] px-6 py-[11px] text-[15px]  font-semibold">Step 2: Add Items</div>
          <div className="text-[#666666] px-6 py-[11px] text-[15px] font-semibold">Step 3: Choose Image</div>
        </div>
      </div>

      {/* Main Content */}
      <FormList title={'Create New List: Step 1'} />
    </div>
  );
}
