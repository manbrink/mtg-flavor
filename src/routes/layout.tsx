import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="h-screen overflow-scroll bg-neutral-800">
      {/* <header class="pb-2 pt-6">
        <h1 class="text-center text-2xl font-bold text-gray-200">
          Magic the Gathering Flavor Text
        </h1>
        <div class="flex justify-center pb-2 pt-4">
          <p class="p-2 text-center text-gray-200">
            <a href="/cards" class="my-link">
              Top Cards
            </a>
          </p>
          <p class="p-2 text-center text-gray-200">
            <a href="/shuffle" class="my-link">
              Shuffle
            </a>
          </p>
        </div>
      </header> */}

      <main class="max-h-screen p-2 text-center">
        <Slot />
      </main>
    </div>
  );
});
