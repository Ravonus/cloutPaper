import React, { DetailedHTMLProps, FC, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

interface BarProps {
  darkmode: boolean;
  buttonNames: (
    | 'home'
    | 'library'
    | 'scenes'
    | 'addImage'
    | 'addVideo'
    | 'addUrl'
    | 'addScene'
  )[];
}

export const BottomBar: FC<BarProps> = ({ darkmode, buttonNames }) => {
  const buttonElements: { [key: string]: JSX.Element } = {
    home: (
      <Link
        to='/plugins_ARPaper'
        className='w-full focus:primary hover:primary justify-center inline-block text-center pt-2 pb-1 pl-8 group'
      >
        <svg
          width={25}
          height={25}
          viewBox='0 0 42 42'
          className='inline-block mb-1'
        >
          <g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z'
              fillOpacity='0.1'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z'
            />
            <path
              d='M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z'
              strokeWidth={2}
              className={
                darkmode
                  ? 'fill-primary stroke-primary'
                  : 'fill-secondary fill-secondary'
              }
              fillOpacity='0.1'
            />
            <rect
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              transform='translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) '
              x={17}
              y='10.3137085'
              width={30}
              height={2}
              rx={1}
            />
            <rect
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              transform='translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) '
              x={-3}
              y='10.3137085'
              width={30}
              height={2}
              rx={1}
            />
          </g>
        </svg>
        <span className='tab tab-home block text-xs text-secondary dark:text-primary dark:group-hover:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:text-gray-700'>
          CloutDesk
        </span>
      </Link>
    ),
    library: (
      <Link
        to='/plugins_ARPaper_library'
        className='w-full focus:primary hover:primary justify-center inline-block text-center pt-2 pb-1 pl-8 group'
      >
        <svg
          width={25}
          height={25}
          viewBox='0 0 42 42'
          className='inline-block mb-1'
        >
          <g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
            <path
              d='M14.7118754,20.0876892 L8.03575361,20.0876892 C5.82661462,20.0876892 4.03575361,18.2968282 4.03575361,16.0876892 L4.03575361,12.031922 C4.03575361,8.1480343 6.79157254,4.90780265 10.4544842,4.15995321 C8.87553278,8.5612583 8.1226025,14.3600511 10.9452499,15.5413938 C13.710306,16.6986332 14.5947501,18.3118357 14.7118754,20.0876892 Z M14.2420017,23.8186831 C13.515543,27.1052019 12.7414284,30.2811559 18.0438552,31.7330419 L18.0438552,33.4450645 C18.0438552,35.6542035 16.2529942,37.4450645 14.0438552,37.4450645 L9.90612103,37.4450645 C6.14196811,37.4450645 3.09051926,34.3936157 3.09051926,30.6294627 L3.09051926,27.813861 C3.09051926,25.604722 4.88138026,23.813861 7.09051926,23.813861 L14.0438552,23.813861 C14.1102948,23.813861 14.1763561,23.8154808 14.2420017,23.8186831 Z M20.7553776,32.160536 C23.9336213,32.1190063 23.9061943,29.4103976 33.8698747,31.1666916 C34.7935223,31.3295026 35.9925894,31.0627305 37.3154077,30.4407183 C37.09778,34.8980343 33.4149547,38.4450645 28.9036761,38.4450645 C24.9909035,38.4450645 21.701346,35.7767637 20.7553776,32.160536 Z'
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              opacity='0.1'
            />
            <g transform='translate(2.000000, 3.000000)'>
              <path
                d='M8.5,1 C4.35786438,1 1,4.35786438 1,8.5 L1,13 C1,14.6568542 2.34314575,16 4,16 L13,16 C14.6568542,16 16,14.6568542 16,13 L16,4 C16,2.34314575 14.6568542,1 13,1 L8.5,1 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M4,20 C2.34314575,20 1,21.3431458 1,23 L1,27.5 C1,31.6421356 4.35786438,35 8.5,35 L13,35 C14.6568542,35 16,33.6568542 16,32 L16,23 C16,21.3431458 14.6568542,20 13,20 L4,20 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M23,1 C21.3431458,1 20,2.34314575 20,4 L20,13 C20,14.6568542 21.3431458,16 23,16 L32,16 C33.6568542,16 35,14.6568542 35,13 L35,8.5 C35,4.35786438 31.6421356,1 27.5,1 L23,1 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M34.5825451,33.4769886 L38.3146092,33.4322291 C38.8602707,33.4256848 39.3079219,33.8627257 39.3144662,34.4083873 C39.3145136,34.4123369 39.3145372,34.4162868 39.3145372,34.4202367 L39.3145372,34.432158 C39.3145372,34.9797651 38.8740974,35.425519 38.3265296,35.4320861 L34.5944655,35.4768456 C34.048804,35.4833899 33.6011528,35.046349 33.5946085,34.5006874 C33.5945611,34.4967378 33.5945375,34.4927879 33.5945375,34.488838 L33.5945375,34.4769167 C33.5945375,33.9293096 34.0349773,33.4835557 34.5825451,33.4769886 Z'
                className={darkmode ? 'fill-primary' : 'fill-secondary'}
                transform='translate(36.454537, 34.454537) rotate(-315.000000) translate(-36.454537, -34.454537) '
              />
              <circle
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
                cx='27.5'
                cy='27.5'
                r='7.5'
              />
            </g>
          </g>
        </svg>
        <span className='tab tab-kategori block text-xs text-secondary dark:text-primary dark:group-hover:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:text-gray-700'>
          Library
        </span>
      </Link>
    ),
    scenes: (
      <Link
        to='/plugins_ARPaper_scenes'
        className='w-full focus:primary hover:primary justify-center inline-block text-center pt-2 pb-1 pl-8 group'
      >
        <svg
          width={25}
          height={25}
          viewBox='0 0 42 42'
          className='inline-block mb-1'
        >
          <g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
            <path
              d='M14.7118754,20.0876892 L8.03575361,20.0876892 C5.82661462,20.0876892 4.03575361,18.2968282 4.03575361,16.0876892 L4.03575361,12.031922 C4.03575361,8.1480343 6.79157254,4.90780265 10.4544842,4.15995321 C8.87553278,8.5612583 8.1226025,14.3600511 10.9452499,15.5413938 C13.710306,16.6986332 14.5947501,18.3118357 14.7118754,20.0876892 Z M14.2420017,23.8186831 C13.515543,27.1052019 12.7414284,30.2811559 18.0438552,31.7330419 L18.0438552,33.4450645 C18.0438552,35.6542035 16.2529942,37.4450645 14.0438552,37.4450645 L9.90612103,37.4450645 C6.14196811,37.4450645 3.09051926,34.3936157 3.09051926,30.6294627 L3.09051926,27.813861 C3.09051926,25.604722 4.88138026,23.813861 7.09051926,23.813861 L14.0438552,23.813861 C14.1102948,23.813861 14.1763561,23.8154808 14.2420017,23.8186831 Z M20.7553776,32.160536 C23.9336213,32.1190063 23.9061943,29.4103976 33.8698747,31.1666916 C34.7935223,31.3295026 35.9925894,31.0627305 37.3154077,30.4407183 C37.09778,34.8980343 33.4149547,38.4450645 28.9036761,38.4450645 C24.9909035,38.4450645 21.701346,35.7767637 20.7553776,32.160536 Z'
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              opacity='0.1'
            />
            <g transform='translate(2.000000, 3.000000)'>
              <path
                d='M8.5,1 C4.35786438,1 1,4.35786438 1,8.5 L1,13 C1,14.6568542 2.34314575,16 4,16 L13,16 C14.6568542,16 16,14.6568542 16,13 L16,4 C16,2.34314575 14.6568542,1 13,1 L8.5,1 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M4,20 C2.34314575,20 1,21.3431458 1,23 L1,27.5 C1,31.6421356 4.35786438,35 8.5,35 L13,35 C14.6568542,35 16,33.6568542 16,32 L16,23 C16,21.3431458 14.6568542,20 13,20 L4,20 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M23,1 C21.3431458,1 20,2.34314575 20,4 L20,13 C20,14.6568542 21.3431458,16 23,16 L32,16 C33.6568542,16 35,14.6568542 35,13 L35,8.5 C35,4.35786438 31.6421356,1 27.5,1 L23,1 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M34.5825451,33.4769886 L38.3146092,33.4322291 C38.8602707,33.4256848 39.3079219,33.8627257 39.3144662,34.4083873 C39.3145136,34.4123369 39.3145372,34.4162868 39.3145372,34.4202367 L39.3145372,34.432158 C39.3145372,34.9797651 38.8740974,35.425519 38.3265296,35.4320861 L34.5944655,35.4768456 C34.048804,35.4833899 33.6011528,35.046349 33.5946085,34.5006874 C33.5945611,34.4967378 33.5945375,34.4927879 33.5945375,34.488838 L33.5945375,34.4769167 C33.5945375,33.9293096 34.0349773,33.4835557 34.5825451,33.4769886 Z'
                className={darkmode ? 'fill-primary' : 'fill-secondary'}
                transform='translate(36.454537, 34.454537) rotate(-315.000000) translate(-36.454537, -34.454537) '
              />
              <circle
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
                cx='27.5'
                cy='27.5'
                r='7.5'
              />
            </g>
          </g>
        </svg>
        <span className='tab tab-explore block text-xs  text-secondary dark:text-primary dark:group-hover:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:text-gray-700'>
          Scenes
        </span>
      </Link>
    ),
    addImage: (
      <Link
        to='/plugins_ARPaper_addImage'
        className='w-full focus:primary hover:primary justify-center inline-block text-center pt-2 pb-1 pl-8 group'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={30}
          height={25}
          viewBox='0 0 24 24'
          className='inline-block mb-1'
        >
          <path
            className={darkmode ? 'fill-primary' : 'fill-secondary'}
            d='M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z'
          />
        </svg>
        <span className='tab tab-whishlist block text-xs text-secondary dark:text-primary dark:group-hover:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:text-gray-700'>
          Image
        </span>
      </Link>
    ),
    addVideo: (
      <Link
        to='/plugins_ARPaper_addVideo'
        className='w-full focus:primary hover:primary justify-center inline-block text-center pt-2 pb-1 pl-8 group'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='25'
          viewBox='0 0 24 24'
          className='inline-block mb-1'
        >
          <path
            className={darkmode ? 'fill-primary' : 'fill-secondary'}
            d='M0 1v22h24v-22h-24zm4 20h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm14 16h-12v-8h12v8zm0-10h-12v-8h12v8zm4 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z'
          />
        </svg>
        <span className='tab tab-account block text-xs text-secondary dark:text-primary dark:group-hover:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:text-gray-700'>
          Video
        </span>
      </Link>
    ),
    addUrl: (
      <Link
        to='/plugins_ARPaper_addUrl'
        className='w-full focus:primary hover:primary justify-center inline-block text-center pt-2 pb-1 pl-8 group'
      >
        <svg
          version='1.0'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='30'
          viewBox='0 0 512.000000 512.000000'
          preserveAspectRatio='xMidYMid meet'
          className='inline-block mb-1'
        >
          <g
            transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
            fill='#000000'
            stroke='none'
          >
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M345 5096 c-84 -21 -147 -57 -211 -121 -65 -65 -105 -136 -123 -223
-16 -76 -16 -3709 0 -3784 37 -172 175 -310 347 -347 36 -7 243 -11 651 -11
l597 0 60 -97 c76 -125 216 -267 338 -342 248 -154 552 -199 831 -124 248 67
482 243 619 466 l60 97 597 0 c402 0 615 4 651 11 170 36 311 178 347 347 16
76 16 3710 0 3784 -37 172 -176 311 -347 347 -81 17 -4349 14 -4417 -3z m4395
-306 c26 -13 47 -34 60 -60 19 -37 20 -58 20 -430 l0 -390 -2260 0 -2260 0 0
393 c1 442 0 437 76 483 l39 24 2143 0 c2128 0 2143 0 2182 -20z m80 -2470 c0
-1274 0 -1291 -20 -1330 -13 -26 -34 -47 -60 -60 -38 -19 -58 -20 -587 -20
l-548 0 -1 158 c-1 126 -5 172 -22 235 -108 396 -395 683 -781 780 -127 31
-360 31 -485 -2 -390 -101 -676 -387 -777 -777 -19 -74 -23 -115 -24 -241 l0
-153 -548 0 c-529 0 -549 1 -587 20 -26 13 -47 34 -60 60 -20 39 -20 56 -20
1330 l0 1290 2260 0 2260 0 0 -1290z m-2112 -526 c405 -84 669 -481 586 -882
-61 -294 -292 -525 -586 -586 -519 -107 -989 362 -882 882 83 405 480 669 882
586z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M688 4489 c-43 -22 -78 -81 -78 -129 0 -76 74 -150 150 -150 76 0
150 74 150 150 0 50 -35 107 -80 130 -49 25 -94 25 -142 -1z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M1288 4489 c-43 -22 -78 -81 -78 -129 0 -76 74 -150 150 -150 76 0
150 74 150 150 0 50 -35 107 -80 130 -49 25 -94 25 -142 -1z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M1888 4489 c-43 -22 -78 -81 -78 -129 0 -50 35 -107 80 -130 21 -11
53 -20 70 -20 76 0 150 74 150 150 0 50 -35 107 -80 130 -49 25 -94 25 -142
-1z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M3388 4489 c-43 -22 -78 -81 -78 -129 0 -50 35 -107 80 -130 38 -19
58 -20 520 -20 462 0 482 1 520 20 45 23 80 80 80 130 0 50 -35 107 -80 130
-38 19 -57 20 -522 20 -461 -1 -485 -2 -520 -21z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M690 3291 c-40 -21 -80 -83 -80 -124 0 -41 147 -625 170 -674 22 -47
78 -83 130 -83 67 0 101 30 199 179 52 78 97 141 101 141 4 0 49 -63 101 -141
98 -149 132 -179 199 -179 52 0 108 36 130 83 23 49 170 633 170 674 -1 69
-77 143 -148 143 -42 0 -104 -32 -125 -64 -9 -13 -33 -89 -52 -168 -20 -78
-38 -144 -39 -146 -2 -1 -32 41 -66 94 -67 101 -109 134 -170 134 -61 0 -103
-33 -170 -134 -34 -53 -64 -96 -65 -96 -2 0 -17 60 -35 133 -41 164 -58 201
-110 227 -49 25 -95 25 -140 1z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M2040 3291 c-40 -21 -80 -83 -80 -124 0 -41 147 -625 170 -674 22
-47 78 -83 130 -83 67 0 101 30 199 179 52 78 97 141 101 141 4 0 49 -63 101
-141 98 -149 132 -179 199 -179 52 0 108 36 130 83 23 49 170 633 170 674 -1
69 -77 143 -148 143 -42 0 -104 -32 -125 -64 -9 -13 -33 -89 -52 -168 -20 -78
-38 -144 -39 -145 -2 -2 -32 41 -68 95 -70 105 -105 132 -168 132 -62 0 -98
-28 -162 -124 -33 -50 -64 -95 -68 -99 -4 -5 -22 52 -40 125 -41 165 -58 202
-110 228 -49 25 -95 25 -140 1z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M3390 3291 c-40 -21 -80 -83 -80 -124 0 -41 147 -625 170 -674 22
-47 78 -83 130 -83 67 0 101 30 199 179 52 78 97 141 101 141 4 0 49 -63 101
-141 98 -149 132 -179 199 -179 52 0 108 36 130 83 23 49 170 633 170 674 -1
69 -77 143 -148 143 -42 0 -104 -32 -125 -64 -9 -13 -33 -89 -52 -168 -20 -78
-38 -144 -39 -145 -2 -2 -32 41 -68 95 -70 105 -105 132 -168 132 -62 0 -98
-28 -162 -124 -33 -50 -64 -95 -68 -99 -4 -5 -22 52 -40 125 -41 165 -58 202
-110 228 -49 25 -95 25 -140 1z'
            />
            <path
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              d='M2855 1344 c-16 -9 -117 -102 -222 -207 l-193 -192 -77 77 c-85 83
-125 108 -173 108 -50 0 -107 -35 -130 -80 -25 -49 -25 -90 -1 -138 24 -45
274 -294 318 -316 41 -20 85 -20 126 0 44 22 524 500 548 546 24 48 24 89 -1
138 -35 69 -127 99 -195 64z'
            />
          </g>
        </svg>
        <span className='tab tab-account block text-xs text-secondary dark:text-primary dark:group-hover:text-gray-300 group-hover:text-gray-700'>
          Url
        </span>
      </Link>
    ),
    addScene: (
      <Link
        to='/plugins_ARPaper_addScene'
        className='w-full focus:primary hover:primary justify-center inline-block text-center pt-2 pb-1 pl-8 group'
      >
        <svg
          width={25}
          height={25}
          viewBox='0 0 42 42'
          className='inline-block mb-1'
        >
          <g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
            <path
              d='M14.7118754,20.0876892 L8.03575361,20.0876892 C5.82661462,20.0876892 4.03575361,18.2968282 4.03575361,16.0876892 L4.03575361,12.031922 C4.03575361,8.1480343 6.79157254,4.90780265 10.4544842,4.15995321 C8.87553278,8.5612583 8.1226025,14.3600511 10.9452499,15.5413938 C13.710306,16.6986332 14.5947501,18.3118357 14.7118754,20.0876892 Z M14.2420017,23.8186831 C13.515543,27.1052019 12.7414284,30.2811559 18.0438552,31.7330419 L18.0438552,33.4450645 C18.0438552,35.6542035 16.2529942,37.4450645 14.0438552,37.4450645 L9.90612103,37.4450645 C6.14196811,37.4450645 3.09051926,34.3936157 3.09051926,30.6294627 L3.09051926,27.813861 C3.09051926,25.604722 4.88138026,23.813861 7.09051926,23.813861 L14.0438552,23.813861 C14.1102948,23.813861 14.1763561,23.8154808 14.2420017,23.8186831 Z M20.7553776,32.160536 C23.9336213,32.1190063 23.9061943,29.4103976 33.8698747,31.1666916 C34.7935223,31.3295026 35.9925894,31.0627305 37.3154077,30.4407183 C37.09778,34.8980343 33.4149547,38.4450645 28.9036761,38.4450645 C24.9909035,38.4450645 21.701346,35.7767637 20.7553776,32.160536 Z'
              className={darkmode ? 'fill-primary' : 'fill-secondary'}
              opacity='0.1'
            />
            <g transform='translate(2.000000, 3.000000)'>
              <path
                d='M8.5,1 C4.35786438,1 1,4.35786438 1,8.5 L1,13 C1,14.6568542 2.34314575,16 4,16 L13,16 C14.6568542,16 16,14.6568542 16,13 L16,4 C16,2.34314575 14.6568542,1 13,1 L8.5,1 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M4,20 C2.34314575,20 1,21.3431458 1,23 L1,27.5 C1,31.6421356 4.35786438,35 8.5,35 L13,35 C14.6568542,35 16,33.6568542 16,32 L16,23 C16,21.3431458 14.6568542,20 13,20 L4,20 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M23,1 C21.3431458,1 20,2.34314575 20,4 L20,13 C20,14.6568542 21.3431458,16 23,16 L32,16 C33.6568542,16 35,14.6568542 35,13 L35,8.5 C35,4.35786438 31.6421356,1 27.5,1 L23,1 Z'
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
              />
              <path
                d='M34.5825451,33.4769886 L38.3146092,33.4322291 C38.8602707,33.4256848 39.3079219,33.8627257 39.3144662,34.4083873 C39.3145136,34.4123369 39.3145372,34.4162868 39.3145372,34.4202367 L39.3145372,34.432158 C39.3145372,34.9797651 38.8740974,35.425519 38.3265296,35.4320861 L34.5944655,35.4768456 C34.048804,35.4833899 33.6011528,35.046349 33.5946085,34.5006874 C33.5945611,34.4967378 33.5945375,34.4927879 33.5945375,34.488838 L33.5945375,34.4769167 C33.5945375,33.9293096 34.0349773,33.4835557 34.5825451,33.4769886 Z'
                className={darkmode ? 'fill-primary' : 'fill-secondary'}
                transform='translate(36.454537, 34.454537) rotate(-315.000000) translate(-36.454537, -34.454537) '
              />
              <circle
                className={darkmode ? 'stroke-primary' : 'stroke-secondary'}
                strokeWidth={2}
                cx='27.5'
                cy='27.5'
                r='7.5'
              />
            </g>
          </g>
        </svg>
        <span className='tab tab-account block text-xs text-secondary dark:text-primary dark:group-hover:text-gray-300 group-hover:text-gray-700'>
          New Scene
        </span>
      </Link>
    ),
  };

  return (
    <section
      id='bottom-navigation'
      className='block fixed inset-x-0 bottom-0 z-10 bg-gray-200 dark:bg-gray-700 shadow border-t-2 border-gray-100 dark:border-gray-600'
    >
      <div id='tabs' className='flex justify-between'>
        {buttonNames.map((name) => {
          return buttonElements[name];
        })}
      </div>
    </section>
  );
};
export default BottomBar;
