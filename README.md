# React InstantSearch ⚡️🔎

React InstantSearch with Infinite hits, auto show more, and scroll persistence.

So that your user can browse your entire catalog without pagination. And never get lost when they click on a product and go back to the list.

## Getting Started 🚀

To launch the project, run the following commands:

```
yarn

yarn start
```

## What's inside 🧐

- [x] Infinite hits
  - Create your own infinite hits component ( `src/components/InfiniteHits.tsx` ) | [Algolia Doc](https://www.algolia.com/doc/api-reference/widgets/infinite-hits/react/)
- [x] Auto show more
  - Use IntersectionObserver on the infinite hits component to trigger the show more | [Algolia Doc](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/infinite-scroll/react/)
- [x] Scroll persistence
  - Leveraging the sessionStorage to save the scroll position of the user
  - Leveraging the sessionStorage to save the clicked product
  - Creating a hook to restore the scroll position ( `src/hooks/useRestorePosition.ts` )
- [x] SSR
  - Using algolia on the server side ( `src/app/products/[pid]/page.tsx` )

## Built With 🏗

- [Algolia](https://www.algolia.com/)
- [React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [Next.js](https://nextjs.org/)
