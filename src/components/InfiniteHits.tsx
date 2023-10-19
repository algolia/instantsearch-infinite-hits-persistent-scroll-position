import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Highlight, Snippet, useInfiniteHits } from "react-instantsearch";
import type { Hit } from "instantsearch.js";

import type { InfiniteHitsProps } from "react-instantsearch";

type HitProps = {
  hit: Hit;
  onHitClick: (hit: Hit) => void;
};

const CustomHit = ({
  hit,
  onHitClick,
  clickedHits,
}: HitProps & { clickedHits: string[] }) => {
  const isClicked = clickedHits.includes(hit.objectID);

  return (
    <div
      className={`hit-clickable ${isClicked ? "clicked" : ""}`}
      onClick={() => onHitClick(hit)}
    >
      <h1>
        <Link href={`/products/${hit.objectID}`}>
          <Highlight attribute="name" hit={hit} />
        </Link>
      </h1>
      <p>
        <Highlight attribute="description" hit={hit} />
      </p>
    </div>
  );
};

export default CustomHit;

export function InfiniteHits(props: InfiniteHitsProps) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  const sentinelRef = useRef(null);
  const [selectedHit, setSelectedHit] = useState<Hit | null>(null);
  const [clickedHits, setClickedHits] = useState<string[]>([]);

  const openModal = (hit: Hit) => {
    setSelectedHit(hit);
    if (!clickedHits.includes(hit.objectID)) {
      setClickedHits([hit.objectID]);
    }
  };

  const closeModal = () => {
    setSelectedHit(null);
  };

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
        {hits.map((hit) => (
          <li
            key={hit.objectID}
            className={`ais-InfiniteHits-item ${
              clickedHits.includes(hit.objectID) ? "clicked" : ""
            }`}
          >
            <CustomHit
              hit={hit}
              onHitClick={openModal}
              clickedHits={clickedHits}
            />
          </li>
        ))}
        <li ref={sentinelRef} aria-hidden="true" />
      </ul>
    </div>
  );
}
