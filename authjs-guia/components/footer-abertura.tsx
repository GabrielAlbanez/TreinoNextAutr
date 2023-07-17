import React from 'react'

export default function Footer() {
  return (
    <footer className='foterAbertura pt-6'>
      <div className='flex items-center justify-center '>
        <h1 className='text-6xl'>Champions</h1>
      </div>
      <div className="flex items-center justify-between pt-11 ">
        <div className="card w-1/3 flex justify-center relative group">
          <div
            className="bg-[url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Irelia_37.jpg)] bg-center bg-cover rounded-sm w-full h-full transform hover:scale-110 transition-transform duration-500"
            style={{ borderRight: '4px solid white' }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-center rounded-sm">
            <p className='text-4xl'>Irelia</p>
          </div>
        </div>
        <div className="card w-1/3 flex justify-center relative group">
          <div
            className="bg-[url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_13.jpg)] bg-center bg-cover rounded-sm w-full h-full transform hover:scale-110 transition-transform duration-500"
            style={{ borderRight: '4px solid white' }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-center rounded-sm">
            <p className='text-4xl'>Zed</p>
          </div>
        </div>
        <div className="card w-1/3 flex justify-center relative group">
          <div
            className="bg-[url(https://wallpaperwaifu.com/wp-content/uploads/2020/08/spirit-blossom-riven-league-of-legends-thumb.jpg)] bg-center bg-cover rounded-sm w-full h-full transform hover:scale-110 transition-transform duration-500"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-center rounded-sm">
            <p className='text-4xl'>Riven</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
