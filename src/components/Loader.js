import React from 'react'

export default function Loader() {
  return (
    <main className='loader-container'>
      <svg className="pl" viewBox="0 0 176 160" width="176px" height="160px" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="hsl(33,90%,55%)" />
            <stop offset="30%" stop-color="hsl(33,90%,55%)" />
            <stop offset="100%" stop-color="hsl(3,90%,55%)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke-width="16" stroke-linecap="round">
          <circle className="pl__ring" r="56" cx="88" cy="96" stroke="hsla(0,10%,10%,0.1)" />
          <path className="pl__worm1" d="M144,96A56,56,0,0,1,32,96" stroke="url(#pl-grad)" stroke-dasharray="43.98 307.87" />
          <path className="pl__worm2" d="M32,136V96s-.275-25.725,14-40" stroke="hsl(33,90%,55%)" stroke-dasharray="0 40 0 44" stroke-dashoffset="0.001" visibility="hidden" />
            <path className="pl__worm3" d="M144,136V96s.275-25.725-14-40" stroke="hsl(33,90%,55%)" stroke-dasharray="0 40 0 44" stroke-dashoffset="0.001" visibility="hidden" />
          </g>
      </svg>
    </main>
)}
