import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export const OverlayInfo = (data: any) => {
  const dataArray = Array.isArray(data.data) ? data.data : [data.data];

  console.log(dataArray);

  return (
    <div className="w-full h-full border-gray-200 dark:bg-gray-900">
      {dataArray.map((elem: any) => (
        <div className="mt-5" key={elem.id}>
          <span className="text-white block text-3xl mb-3 ml-5">{elem.name}</span>
          <StarOutlinedIcon className="text-yellow-500 mb-3 ml-5" />
          <span className="text-white text-3xl">{elem.score}</span>
          <span className="text-white block mb-3 ml-5">Эпизодов: {elem.episode}</span>
          {elem.demographics ? (
            <span className="text-white block mb-3 ml-5">
              Жанры: {elem.demographics}, {elem.genres}
            </span>
          ) : (
            <span className="text-white block mb-3 ml-5">Жанры: {elem.genres}</span>
          )}
          <span className="text-white block mb-3 ml-5">Год выпуска: {elem.year}</span>
          <span className="text-gray-400 block max-h-72 overflow-auto scroll-smooth mt-5 text-sm mb-3 mx-5">
            <span className="scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">Описание: {elem.synopsis}</span>
          </span>
        </div>
      ))}
    </div>
  );
};
