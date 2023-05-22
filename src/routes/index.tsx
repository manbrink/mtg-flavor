import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, routeAction$, Form } from "@builder.io/qwik-city";

import { createServerClient } from "supabase-auth-helpers-qwik";

export const useDBTest = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv
  );

  const { data } = await supabaseClient.from("test").select("*");

  return { data };
});

export const useJokeVoteAction = routeAction$((props) => {
  // Leave it as an exercise for the reader to implement this.
  console.log("VOTE", props);
});

export default component$(() => {
  const cardSignal = useDBTest();
  const favoriteJokeAction = useJokeVoteAction();

  console.log("cardSignal", cardSignal.value.data[0].greeting);

  return (
    <div class="h-screen bg-neutral-800">
      <header class="py-6">
        <h1 class="text-center text-3xl font-bold text-gray-200">
          Magic the Gathering Flavor Text
        </h1>
        <div class="flex justify-center py-6">
          <p class="p-2 text-center text-gray-200">Top Cards</p>
          <p class="p-2 text-center text-gray-200">Shuffle</p>
        </div>
      </header>

      <main class="max-h-screen py-4 text-center">
        <section class="mx-auto max-w-7xl text-gray-200">
          <p>{cardSignal.value.data[0].greeting}</p>
          <Form action={favoriteJokeAction}>
            <input type="hidden" name="jokeID" value="placeholder" />
            <button class="p-2" name="vote" value="up">
              👍
            </button>
            <button class="p-2" name="vote" value="down">
              👎
            </button>
          </Form>
        </section>
      </main>

      <footer class="absolute bottom-0 left-0 w-full py-6 text-center text-gray-200">
        <p class="text-white-normal text-center text-xs opacity-40">
          Wizards of the Coast, Magic: The Gathering, and their logos are
          trademarks of Wizards of the Coast LLC in the United States and other
          countries. © 1993-2023 Wizards. All Rights Reserved.
          <br />
          XXX is not affiliated with, endorsed, sponsored, or specifically
          approved by Wizards of the Coast LLC. XXX may use the trademarks and
          other intellectual property of Wizards of the Coast LLC, which is
          permitted under Wizards&apos; Fan Content Policy. MAGIC: THE
          GATHERING® is a trademark of Wizards of the Coast. For more
          information about Wizards of the Coast or any of Wizards&apos;
          trademarks or other intellectual property, please visit their website
          at https://company.wizards.com/.
          <br />© 2023 XXX - Terms of Service - Privacy Policy
        </p>
      </footer>
    </div>
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
