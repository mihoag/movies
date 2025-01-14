import { PieChart } from './pie-chart';
const data = [
  { genre: 'Drama', value: 35, color: '#FF1493' },
  { genre: 'Mystery', value: 25, color: '#FF69B4' },
  { genre: 'Crime', value: 20, color: '#FFB6C1' },
  { genre: 'History', value: 12, color: '#FFC0CB' },
  { genre: 'Other', value: 8, color: '#FFE4E1' },
];
export default function GenreChart() {
  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg mb-4">Most Watched Genres</h3>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="mt-4 w-[180px] h-[180px] shrink-0">
          <PieChart data={data} />
        </div>
        <div className="flex flex-wrap sm:flex-col gap-3 justify-center">
          {data.map(({ genre, color }) => (
            <div key={genre} className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-[14px] text-[#333333]">{genre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
