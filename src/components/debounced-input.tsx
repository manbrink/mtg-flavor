import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export const DebouncedInput = component$(() => {
  const inputText = useSignal("");
  const debouncedValue = useSignal("");

  useTask$(({ track, cleanup }) => {
    track(() => inputText.value);

    const debounced = setTimeout(() => {
      debouncedValue.value = inputText.value;
    }, 1000);

    cleanup(() => clearTimeout(debounced));
  });

  return (
    <>
      <input
        type="text"
        class="text-white-normal w-full border-b border-white bg-neutral-800 py-2 pl-10 pr-4 focus:outline-none"
        bind:value={inputText}
      />
      <p>{debouncedValue.value}</p>
    </>
  );
});
