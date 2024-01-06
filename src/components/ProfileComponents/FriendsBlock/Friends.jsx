import React from 'react';

const Friends = () => {
  const imageURLs = Array.from(
    { length: 9 },
    (_, index) =>
      'https://w7.pngwing.com/pngs/215/897/png-transparent-happy-material-free-anime-characters-girls-lovely-thumbnail.png'
  );
  return (
    <div className=" border  rounded-lg mt-6 p-6">
      <h2 className="text-white  text-center mb-6   ">Друзья</h2>
      <div className="text-white rounded-lg  h-auto  ">
        <div className="flex flex-wrap  justify-between">
          {imageURLs.map((url, index) => (
            <div key={index} className="pb-2">
              <img key={index} src={url} alt="" className="w-14 h-14 rounded-full mr-2 mb-2" />
              <p>LOREM</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
