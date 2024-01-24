import { Suspense } from 'react'

import Loader from './components/loader/loader';
import logo from './assets/logo.svg'

function App() {
  return (
    <Suspense
      fallback={<Loader />}
    >
      <div className="flex flex-col h-full w-full items-center bg-slate-900">
        <header className="flex w-full">
          <nav className="flex fixed w-full items-center p-5 justify-between backdrop-blur-md bg-opacity-10 z-10 border-slate-200">
            <div className="flex items-center gap-4">
              <a className="flex items-center gap-4" href="/" target="_self" rel="noreferrer">
                <img
                  src={logo} alt="Lo-fi Dino logo" width={48} />
              </a>
              <h1 className="font-bold">Lo-fi Dino</h1>
            </div>

            <div className="flex gap-2 justify-center text-5xl p-5">
              <span className="animate-text1 bg-gradient-to-r from-title-1-start-color-100 via-title-1-middle-color-100 to-title-1-end-color-100 bg-clip-text font-black text-transparent">Relax.</span>
              <span className="animate-text2 bg-gradient-to-r from-title-2-start-color-200 to-title-2-end-color-200 bg-clip-text font-black text-transparent">Chill.</span>
              <span className="animate-text3 bg-gradient-to-r from-title-3-start-color-300 to-title-3-end-color-300 bg-clip-text font-black text-transparent">Focus.</span>
            </div>

            <a className="btn btn-outline btn-primary text-2xl" href="https://github.com/thegfmachado" target="_blank" rel="noreferrer">
              {`<gfm />`}
            </a>
          </nav>
        </header>

        <section className="flex justify-center gap-6 mt-40">
          <iframe
            className="pointer-events-none w-[800px] h-[600px]"
            allowFullScreen
            id="player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            src="https://www.youtube.com/embed/_3-fYqCFbHQ?si=wpfe9Jhnnc7gCYUW"
          >
          </iframe>
          <div className="border radius-sm p-4">
            other stuff
          </div>
        </section>

        <footer className="h-full pt-20 pb-5 flex justify-center items-center text-lg mt-10">
          <p>Made with <span>❤️</span> and <span>☕</span></p>
        </footer>
      </div>
    </Suspense>
  )
}

export default App
