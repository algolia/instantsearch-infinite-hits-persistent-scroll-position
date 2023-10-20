"use client";

import { InfiniteHits } from "@/components/InfiniteHits";
import {
  Configure,
  InstantSearch,
  RefinementList,
  SearchBox,
} from "react-instantsearch";

import "./globals.css";
import { Panel } from "@/components/Panel";
import { INDEX_NAME, SCROLL_POSITION_KEY } from "@/constants";
import { searchClientLite } from "@/searchClient";
import { useRestorePosition } from "@/hooks";

export default function Home() {
  useRestorePosition(SCROLL_POSITION_KEY);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            <a href="/">react-instantsearch-app</a>
          </h1>
          <p className="header-subtitle">
            using{" "}
            <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
              React InstantSearch with Infinite hits, auto show more,
            </a>
          </p>
        </div>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClientLite}
          indexName={INDEX_NAME}
          routing
        >
          <Configure hitsPerPage={10} />
          <div className="search-panel">
            <div className="search-panel__filters">
              <Panel header="brand">
                <RefinementList attribute="brand" />
              </Panel>
            </div>

            <div className="search-panel__results">
              <SearchBox placeholder="" className="searchbox" />
              <InfiniteHits />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
