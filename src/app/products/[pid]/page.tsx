"use client";

import algoliasearch from "algoliasearch";

type PageProps = {
  params: {
    pid: string;
  };
};

type ProductData = {
  name: string;
  description: string;
  brand: string;
  categories: string[];
  image: string;
};

async function getData(objectID: string) {
  const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
  const index = client.initIndex("instant_search");

  const res = (await index.getObject(objectID)) as ProductData;

  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}

export default async function Page({ params }: PageProps) {
  const data: ProductData | null = await getData(params.pid);

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
              onClick={() => {
                window.history.back();
              }}
              className="back-button"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
              <p>Brand: {brand}</p>
              <p>Categories: {categories}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
