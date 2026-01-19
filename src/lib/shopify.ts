
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.STOREFRONT_API_KEY;

import { Product } from "@/data/products";

async function ShopifyData(query: string) {
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection() {
  const query = `
  {
    products(first: 25) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
          description
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          productType
          collections(first: 10) {
            edges {
              node {
                title
                handle
              }
            }
          }
          onlineStoreUrl
        }
      }
    }
  }`;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const response = await ShopifyData(query);
  const allProducts = response.data.products.edges ? response.data.products.edges : [];

  return allProducts.map((edge: any) => {
    const node = edge.node;
    const collections = node.collections?.edges?.map((collectionEdge: any) => collectionEdge.node.title) || [];

    return {
      id: node.id,
      handle: node.handle,
      name: node.title,
      description: node.description,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      image: node.images.edges.length > 0 ? node.images.edges[0].node.url : "",
      category: node.productType ? node.productType.toLowerCase() : "reading", // Default mapping
      isNew: false, // Default
      popular: false, // Default
      collections: collections, // Shopify collections
      onlineStoreUrl: node.onlineStoreUrl,
      variantId: node.variants?.edges[0]?.node?.id?.split("/").pop()
    };
  });
}

export async function getProduct(handle: string) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      onlineStoreUrl
    }
  }`;

  const response = await ShopifyData(query);
  const product = response.data.productByHandle;

  if (!product) return null;

  return {
    id: product.id,
    handle: product.handle,
    name: product.title,
    description: product.description,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    image: product.images.edges.length > 0 ? product.images.edges[0].node.url : "",
    category: "reading", // Default or fetch if needed
    onlineStoreUrl: product.onlineStoreUrl,
    variantId: product.variants?.edges[0]?.node?.id?.split("/").pop(),
    oldPrice: undefined,
    isNew: undefined,
    popular: undefined
  };
}
