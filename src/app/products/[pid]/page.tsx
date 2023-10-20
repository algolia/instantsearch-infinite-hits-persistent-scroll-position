"use client";

import { ProductHit } from "@/app/types";
import { INDEX_NAME } from "@/constants";
import { searchClient } from "@/searchClient";

type PageProps = {
  params: {
    pid: string;
  };
};

async function getData(objectID: string) {
  const index = searchClient.initIndex(INDEX_NAME);

  const res = await index.getObject<ProductHit>(objectID);

  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}

export default async function Page({ params }: PageProps) {
  const data: ProductHit | null = await getData(params.pid);

  const { name, description, brand, categories, image } = data;

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      {data && (
        <section>
          <header className="header">
            <button
              className="back-button"
              onClick={() => {
                history.back();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  marginRight: "0.5rem",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <span>Back</span>
            </button>
            <h1>{name}</h1>
          </header>

          <div className="product-container">
            <img src={image} alt={`${name} image`} />

            <div>
              <p>{description}</p>
              <p>
                <b>Brand</b>: {brand}
              </p>
              <p>
                <b>Categories</b>: {categories.map((cat) => cat).join(", ")}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
