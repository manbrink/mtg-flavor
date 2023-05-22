import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { createServerClient } from "supabase-auth-helpers-qwik";
import { Image } from "@unpic/qwik";
import { LuArrowBigLeft, LuThumbsUp } from "@qwikest/icons/lucide";

interface Card {
  id: string;
  name: string;
  set_name: string;
  flavor_text: string;
  scryfall_art_crop_url: string;
  up_votes: number;
}

export const useDB = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv
  );

  const { data } = await supabaseClient
    .from("cards")
    .select("*")
    .limit(100)
    .order("up_votes", { ascending: false });

  return { data };
});

export default component$(() => {
  const cardSignal = useDB();
  const cardData = cardSignal.value.data as Card[];

  return (
    <>
      <div class="absolute left-0 top-0 px-3 py-4 text-3xl">
        <a href="/">
          <LuArrowBigLeft />
        </a>
      </div>

      <header class="pb-2 pt-2">
        <div class="text-2xl">Top Cards</div>
      </header>

      <div class="grid grid-cols-4 items-center gap-1 pb-4">
        <div class="col-span-1 p-4"></div>
        <div class="relative col-span-2 p-4">
          <input
            type="text"
            class="text-white-normal w-full border-b border-white bg-neutral-800 py-2 pl-10 pr-4 focus:outline-none"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
          <span class="absolute left-5 top-1/2 -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-white-normal h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div class="col-span-1 p-4"></div>
      </div>

      <div class="grid items-start sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card: Card) => (
          <section
            key={card.id}
            class="mx-auto flex flex-col items-center justify-center"
          >
            <div class="shadow-lg">
              <div class="pb-1 text-sm opacity-70">
                upvotes: {card.up_votes}
              </div>
              <div class="relative">
                <Image
                  src={card.scryfall_art_crop_url}
                  layout="fixed"
                  width={300}
                  height={225}
                  alt={card.name}
                />
                <div class="absolute right-0 top-0 cursor-pointer p-1 text-gray-200 opacity-60 transition-opacity duration-1000 hover:opacity-100">
                  <LuThumbsUp />
                </div>
              </div>
            </div>

            <div class="p-4">
              <h1 class="pb-1 text-2xl">{card.name}</h1>
              <h2 class="pb-1 text-lg opacity-70">{card.set_name}</h2>
              <p class="text-base italic opacity-70">{card.flavor_text}</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
});
