// import React from 'react'

// export default function TestCocktailDesign() {
//     return (
//         <div key={cocktailData.id} class="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//             <div class="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
//                 <img src={cocktailData.image} alt={cocktailData.title} />
//                 <div class="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
//             </div>
//             <div class="p-6">
//                 <div class="mb-3 flex items-center justify-between">
//                     <h5 class="block font-sans font-medium leading-snug tracking-normal text-blue-gray-900 antialiased text-base">
//                         {cocktailData.title}
//                     </h5>
//                     <p class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
//                         {renderRatings(cocktailData.rating)}
//                         <path
//                             fill-rule="evenodd"
//                             d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
//                             clip-rule="evenodd"
//                         ></path>

//                     </p>
//                 </div>
//                 <div class="mb-3 flex items-center justify-between">
//                     <p class="block font-sans text-base leading-relaxed text-gray-700 antialiased font-thin">
//                         {cocktailData.category}
//                     </p>
//                     <p class="flex items-center font-medium gap-1.5 font-sans text-base leading-relaxed text-blue-gray-900 antialiased">
//                         <small>$</small> {cocktailData.price}
//                     </p>
//                 </div>
//             </div>
//             <div class="p-6 pt-3">
//                 <button
//                     onClick={() => addToFavorite(cocktailData)}
//                     class="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-semibold"
//                     type="button"
//                     data-ripple-light="true"
//                 >
//                     Add To Favorite
//                 </button>
//             </div>
//         </div>
//     )
// }
