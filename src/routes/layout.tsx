import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="h-screen overflow-scroll bg-neutral-800 text-gray-200">
      <main class="max-h-screen p-2 text-center">
        <Slot />
      </main>
    </div>
  );
});
