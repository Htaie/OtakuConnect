import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface OverlayProps {
  title: string;
  rating: string;
  episode: string;
  year: string;
  synopsis: string;
  demographics: string;
  genres: string;
}
const Overlay = ({ title, rating, episode, year, synopsis, demographics, genres }: OverlayProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-end">
      <div className="w-[500px] h-[600px] bg-blue-600 opacity-2 rounded-r-lg">
        <div>
          <p className="w-11/12 text-2xl text-white font-bold ml-2">{title}</p>

          <div className="items-center text-1xl text-white ml-2">
            <h3 className="mt-5">
              Жанры: {demographics}, {genres}
            </h3>
            <h3 className="mt-5"> Год выпуска: {year}</h3>
            <h3 className="mt-5"> Эпизодов: {episode}</h3>
            <h3 className="mt-5">{rating}</h3>
            <StarOutlinedIcon className="text-yellow-500" />
            <p className="max-h-64 overflow-auto mt-5 text-sm">Описание: {synopsis}</p>
          </div>
          <InfoOutlinedIcon
            className="text-3xl text-white absolute z-10 right-2 bottom-2"
            onClick={() => {
              console.log('clicked');
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Overlay;
