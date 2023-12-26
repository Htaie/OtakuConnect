import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface OverlayProps {
  title: string;
  rating: string;
  episode: string;
  year: string;
}
const Overlay = ({ title, rating, episode, year }: OverlayProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-end">
      <div className="w-full h-1/5 bg-gradient-to-t from-blue-500 to-transparent opacity-2 rounded-b-2xl">
        <div>
          <p className=" w-11/12 text-2xl text-white  font-bold  ml-2">{title}</p>

          <div className="flex items-center ">
            <h3> Год выпуска: {year}</h3>
            <h3> Эпизодов: {episode}</h3>
            <h3>{rating}</h3>
            <StarOutlinedIcon className="text-yellow-500 " />
          </div>
          <InfoOutlinedIcon
            className="text-3xl text-white absolute z-10 right-10  bottom-20"
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
