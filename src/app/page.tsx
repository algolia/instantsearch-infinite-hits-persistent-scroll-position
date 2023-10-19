"use client";

import { InfiniteHits } from "@/components/InfiniteHits";
import algoliasearch from "algoliasearch/lite";
import {
  Configure,
  InstantSearch,
  RefinementList,
  SearchBox,
} from "react-instantsearch";

import "./globals.css";
import { Panel } from "@/components/Panel";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default function Home() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">react-instantsearch-app</a>
        </h1>
        <p className="header-subtitle">
          using{" "}
          <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
            React InstantSearch with Infinite hits, auto show more,
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="instant_search">
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
