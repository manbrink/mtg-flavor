import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <section class="mx-auto max-w-7xl text-gray-200"></section>

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
