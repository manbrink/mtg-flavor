import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import { createServerClient } from "supabase-auth-helpers-qwik";
import { Image } from "@unpic/qwik";

export const useDB = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv
  );

  const { data } = await supabaseClient.rpc("shuffle");

  const mainCardData = await supabaseClient
    .from("cards")
    .select()
    .eq("id", "6dca045d-a0f4-444e-b44a-388930b74da5");

  return { data, mainCardData };
});

export default component$(() => {
  const cardSignal = useDB();
  const cardData = cardSignal.value.data;

  if (!cardSignal.value.mainCardData.data) {
    return <div>loading...</div>;
  }

  const mainCardData = cardSignal.value.mainCardData.data[0];

  return (
    <>
      <header class="pb-2 pt-2">
        <h1 class="text-center text-2xl font-bold">
          Magic the Gathering Flavor
        </h1>
        <div class="flex justify-center pb-2 pt-4">
          <p class="p-2 text-center underline">
            <a href="/cards" class="my-link">
              Top Cards
            </a>
          </p>
          <p class="p-2 text-center underline">
            <a href={`/shuffle/${cardData.id}`} class="my-link">
              Shuffle
            </a>
          </p>
          <p class="p-2 text-center underline">
            <a href="/search" class="my-link">
              Search
            </a>
          </p>
        </div>
      </header>

      <section class="mx-auto flex flex-col items-center justify-center">
        <div class="shadow-lg">
          <div class="pb-1 text-sm opacity-70">
            upvotes: {mainCardData.up_votes}
          </div>
          <div class="w-[400px] overflow-hidden">
            <Image
              src={mainCardData.scryfall_art_crop_url}
              layout="fullWidth"
              alt={mainCardData.name}
            />
          </div>
        </div>
        <div class="pb-1 text-sm opacity-70">{mainCardData.artist}</div>

        <div class="p-4">
          <h1 class="pb-1 text-2xl">{mainCardData.name}</h1>
          <h2 class="pb-1 text-lg opacity-70">{mainCardData.set_name}</h2>
          <p class="text-base italic opacity-70">{mainCardData.flavor_text}</p>
        </div>
      </section>

      <footer class="w-full px-2 py-6 text-center">
        <p class="text-white-normal text-center text-xs opacity-40">
          Wizards of the Coast, Magic: The Gathering, and their logos are
          trademarks of Wizards of the Coast LLC in the United States and other
          countries. © 1993-2023 Wizards. All Rights Reserved.
          <br />
          MtG Flavor is not affiliated with, endorsed, sponsored, or
          specifically approved by Wizards of the Coast LLC. MtG Flavor may use
          the trademarks and other intellectual property of Wizards of the Coast
          LLC, which is permitted under Wizards&apos; Fan Content Policy. MAGIC:
          THE GATHERING® is a trademark of Wizards of the Coast. For more
          information about Wizards of the Coast or any of Wizards&apos;
          trademarks or other intellectual property, please visit their website
          at https://company.wizards.com/.
          <br />© 2023 MtG Flavor - Terms of Service - Privacy Policy
        </p>
      </footer>
    </>
  );
});

export const head: DocumentHead = {
  title: "MtG Flavor",
  meta: [
    {
      name: "MtG Flavor",
      content: "Vote on your favorite MtG flavor text and discover more!",
    },
  ],
};
