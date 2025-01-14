interface HeaderListProps {
  title: string;
  totalMovie: number;
}
const HeaderList: React.FC<HeaderListProps> = ({ title, totalMovie }) => {
  return (
    <header className="flex px-4 items-center justify-between mb-8">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <nav className="flex gap-6">
          <button className="relative text-[17px] font-semibold">
            Movies
            <span className="ml-1 text-pink-500">{totalMovie}</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500"></div>
          </button>
        </nav>
      </div>
    </header>
  );
};
export default HeaderList;
