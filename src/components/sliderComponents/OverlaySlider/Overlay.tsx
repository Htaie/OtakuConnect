import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface OverlayProps {
  title: string;
  rating: string;
  episode: string;
  year: string;
  genres: string;
  onInfoClick: () => void;
}
const Overlay = ({ title, rating, episode, year, genres, onInfoClick }: OverlayProps) => {
  const handleInfoClick = () => {
    onInfoClick();
  };

  return (
    <div className="w-full h-full flex flex-col justify-end ">
      <div className="w-full h-1/5 bg-gradient-to-t from-blue-500 to-transparent opacity-2 rounded-b-2xl">
        <div>
          <p className="w-10/12 text-2xl text-white font-bold ml-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {title}{' '}
          </p>
          <InfoOutlinedIcon
            style={{ bottom: '5.6rem' }}
            className="text-3xl text-white absolute z-10 right-5 "
            onClick={handleInfoClick}
          />
          <div className="flex items-center flex-wrap ml-2 mr-2 mt-2 justify-between h-2/3">
            <h3> Год выпуска: {year}</h3>
            <h3> Эпизодов: {episode}</h3>
            <h3>
              <StarOutlinedIcon className="text-yellow-500 " />
              {rating}
            </h3>
            <h3>Жанры: {genres}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overlay;
