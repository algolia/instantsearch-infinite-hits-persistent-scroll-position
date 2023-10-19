import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Highlight, useInfiniteHits } from 'react-instantsearch';

import type { InfiniteHitsProps } from 'react-instantsearch';
import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/lib/infiniteHitsCache';
import { CLICKED_HIT_KEY, SCROLL_POSITION_KEY } from '@/constants';
import { ProductHit } from '@/app/types';
import type { InfiniteHitsCache } from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';

const sessionStorageCache =
  createInfiniteHitsSessionStorageCache() as unknown as InfiniteHitsCache<ProductHit>;

export function InfiniteHits(props: InfiniteHitsProps<ProductHit>) {
  const { hits, isLastPage, showMore } = useInfiniteHits<ProductHit>({
    ...props,
    cache: sessionStorageCache,
  });
  const sentinelRef = useRef(null);
  const [clickedObjectID, setClickedObjectID] = useState<string | null>(null);

  // Load the clicked hits from localStorage
  useEffect(() => {
    const clickedHitString = localStorage.getItem(CLICKED_HIT_KEY);
    if (clickedHitString) {
      setClickedObjectID(JSON.parse(clickedHitString));
    }
  }, []);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit) => {
          const isClicked = clickedObjectID === hit.objectID;

          return (
            <li
              key={hit.objectID}
              className={`ais-InfiniteHits-item ${isClicked ? 'clicked' : ''}`}
              id={hit.objectID}
            >
              <div
                className="ais-InfiniteHits-item__hit"
                onClick={() => {
                  if (clickedObjectID !== hit.objectID) {
                    setClickedObjectID(hit.objectID);
                    // Save the updated clicked hits to localStorage
                    localStorage.setItem(
                      CLICKED_HIT_KEY,
                      JSON.stringify(hit.objectID)
                    );
                  }
                }}
              >
                <Link
                  href={{
                    pathname: `/products/${hit.objectID}`,
                  }}
                  onClick={() => {
                    sessionStorage.setItem(
                      SCROLL_POSITION_KEY,
                      String(window.scrollY)
                    );
                  }}
                >
                  <span className="img-container">
                    <img src={hit.image} alt={hit.name} />
                  </span>
                  <span>
                    <h1>
                      <Highlight attribute="name" hit={hit} />
                    </h1>
                    <p>
                      <Highlight attribute="description" hit={hit} />
                    </p>
                  </span>
                </Link>
              </div>
            </li>
          );
        })}
        <li ref={sentinelRef} aria-hidden="true" />
      </ul>
    </div>
  );
}
