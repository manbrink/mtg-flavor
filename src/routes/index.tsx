import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useDadJoke = routeLoader$(async () => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

export default component$(() => {
  const dadJokeSignal = useDadJoke();

  return (
    <>
      <h1>Top Flavor Text</h1>
      <div>
        <h2>Random Dad Joke</h2>
        <div>{dadJokeSignal.value.joke}</div>
      </div>
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
