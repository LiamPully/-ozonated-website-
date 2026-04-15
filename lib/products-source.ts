import * as cheerio from "cheerio";

const CATEGORY_SOURCES = [
  { name: "Uncategorized", url: "https://ozonatedel.co.za/product-category/uncategorized/" },
  { name: "Uncategorized", url: "https://ozonatedel.co.za/product-category/uncategorized/page/2/" },
  { name: "Baby", url: "https://ozonatedel.co.za/product-category/baby/" },
  { name: "Body", url: "https://ozonatedel.co.za/product-category/body/" },
  { name: "Home Care", url: "https://ozonatedel.co.za/product-category/home-care/" },
  { name: "Skin Care", url: "https://ozonatedel.co.za/product-category/skin-care/" },
  { name: "Supplements", url: "https://ozonatedel.co.za/product-category/supplements/" }
];

type ProductRow = {
  category: string;
  name: string;
  price: string;
  image: string;
  url: string;
};

type ProductError = {
  category: string;
  error: string;
  url: string;
};

export type ProductSourceResult = {
  ok: boolean;
  count: number;
  results: Array<ProductRow | ProductError>;
  error?: string;
};

function parsePrice(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function toAbsolute(url: string | undefined, base: string) {
  if (!url) return "";
  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}

export async function fetchProductsFromSources(): Promise<ProductSourceResult> {
  try {
    const results: Array<ProductRow | ProductError> = [];

    for (const src of CATEGORY_SOURCES) {
      const res = await fetch(src.url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "text/html,application/xhtml+xml"
        },
        cache: "no-store"
      });

      if (!res.ok) {
        results.push({ category: src.name, error: `Fetch failed: ${res.status} ${res.statusText}`, url: src.url });
        continue;
      }

      const html = await res.text();
      const $ = cheerio.load(html);
      const productEls = $("li.product");

      if (productEls.length === 0) {
        results.push({ category: src.name, error: "No products found (selector li.product returned 0).", url: src.url });
        continue;
      }

      productEls.each((_, el) => {
        const name =
          $(el).find("h2.woocommerce-loop-product__title").text().trim() ||
          $(el).find(".woocommerce-loop-product__title").text().trim();

        const link =
          $(el).find("a.woocommerce-LoopProduct-link").attr("href") ||
          $(el).find("a").first().attr("href") ||
          "";

        const img = $(el).find("img").attr("data-src") || $(el).find("img").attr("src") || "";
        const priceText = $(el).find(".price").text();
        const price = parsePrice(priceText);

        if (!name || !link) return;

        results.push({
          category: src.name,
          name,
          price,
          image: toAbsolute(img, src.url),
          url: toAbsolute(link, src.url)
        });
      });
    }

    return { ok: true, count: results.filter((r) => "name" in r).length, results };
  } catch (e: any) {
    return { ok: false, count: 0, results: [], error: e?.message || "Unknown error" };
  }
}
