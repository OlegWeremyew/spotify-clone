import React, {FC} from "react";
import {Playlist} from "./Playlist";
import {IMain, PlaylistsType} from "./types";
import {PLAYLIST} from "./data";

export const TheMain: FC<IMain> = ({toggleScrolling, showToast}) => (
  <main className="text-white relative">
    <div className="h-[275px] bg-gradient-to-b from-[#1f1f1f] to-[#121212] absolute w-full"></div>
    <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
      <div>
        <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
          <div>
            <h2 className="text-2xl font-semibold hover:underline capitalize">
              <a href="/">Lorem ipsum dolor sit</a>
            </h2>
          </div>
          <a
            href="/"
            className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6"
          >
            See all
          </a>
        </div>
        <div
          className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
          {PLAYLIST.map((playlist: PlaylistsType) => (
            <Playlist
              key={playlist.title}
              {...playlist}
              toggleScrolling={toggleScrolling}
              showToast={showToast}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
          <div>
            <h2 className="text-2xl font-semibold hover:underline capitalize">
              <a href="/">Lorem ipsum dolor sit</a>
            </h2>
          </div>
          <a
            href="/"
            className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6"
          >
            See all
          </a>
        </div>
        <div
          className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
          {PLAYLIST.map((playlist: PlaylistsType) => (
            <Playlist
              key={playlist.title}
              {...playlist}
              toggleScrolling={toggleScrolling}
              showToast={showToast}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
          <div>
            <h2 className="text-2xl font-semibold hover:underline capitalize">
              <a href="/">Lorem ipsum dolor sit</a>
            </h2>
          </div>
          <a
            href="/"
            className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6"
          >
            See all
          </a>
        </div>
        <div
          className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
          {PLAYLIST.map((playlist: PlaylistsType) => (
            <Playlist
              key={playlist.title}
              {...playlist}
              toggleScrolling={toggleScrolling}
              showToast={showToast}
            />
          ))}
        </div>
      </div>
    </div>
  </main>
);

