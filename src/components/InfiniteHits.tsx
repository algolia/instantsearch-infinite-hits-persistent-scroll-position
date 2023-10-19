import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Highlight, Snippet, useInfiniteHits } from "react-instantsearch";
import type { Hit } from "instantsearch.js";

import type { InfiniteHitsProps } from "react-instantsearch";

type HitProps = {
  hit: Hit;
  onHitClick: (hit: Hit) => void;
};

const CustomHit = ({ hit, onHitClick }: HitProps) => {
  return (
    <div
      className={`ais-InfiniteHits-item__hit`}
      onClick={() => onHitClick(hit)}
    >
      <Link href={`/products/${hit.objectID}`}>
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
  );
};

export default CustomHit;

export function InfiniteHits(props: InfiniteHitsProps) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  const sentinelRef = useRef(null);
  const [selectedHit, setSelectedHit] = useState<Hit | null>(null);
  const [clickedHits, setClickedHits] = useState<string[]>([]);

  // Load the clicked hits from localStorage
  useEffect(() => {
    const clickedHitString = localStorage.getItem("clickedHits");
    if (clickedHitString) {
      setClickedHits(JSON.parse(clickedHitString));
    }
  }, []);

  const openModal = (hit: Hit) => {
    setSelectedHit(hit);
    if (!clickedHits.includes(hit.objectID)) {
      const updatedClickedHits = [...clickedHits, hit.objectID];
      setClickedHits(updatedClickedHits);
      // Save the updated clicked hits to localStorage
      localStorage.setItem("clickedHits", JSON.stringify(updatedClickedHits));
    }
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
        {hits.map((hit) => {
          const isClicked = clickedHits.includes(hit.objectID);

          return (
            <li
              key={hit.objectID}
              className={`ais-InfiniteHits-item ${isClicked ? "clicked" : ""}`}
            >
              <CustomHit hit={hit} onHitClick={openModal} />
            </li>
          );
        })}
        <li ref={sentinelRef} aria-hidden="true" />
      </ul>
    </div>
  );
}
