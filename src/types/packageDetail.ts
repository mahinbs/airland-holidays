/**
 * Package Detail rich media shapes (itinerary + travel information tabs).
 *
 * Admin / CMS integration:
 * - Store `gallery` as an ordered array; array index = display order (reorder = reorder array).
 * - Each item requires `src` (URL) and `title` (single-line label).
 * - Itinerary: per `day`, attach `images` using {@link PackageLabeledImage}[].
 * - Insights: per tab (food, nightlife, shopping, tips), set `text` (body copy) + `gallery`.
 */

export type PackageLabeledImage = {
  src: string;
  /** Single-line label (e.g. "Nasi Goreng", "Ubud Market") */
  title: string;
};

export type PackageInsightBlock = {
  /** Paragraph shown below the image carousel */
  text: string;
  /** Ordered list — reorder in admin by reordering this array */
  gallery: PackageLabeledImage[];
};

export type PackageInsightsData = {
  food: PackageInsightBlock;
  nightlife: PackageInsightBlock;
  shopping: PackageInsightBlock;
  tips: PackageInsightBlock;
  essentials: {
    text: string;
    gallery?: PackageLabeledImage[];
  };
};

/** Accept API/legacy payloads where images may be plain URLs. */
export function normalizeLabeledImages(
  items: readonly (string | PackageLabeledImage)[] | undefined | null
): PackageLabeledImage[] {
  if (!items?.length) return [];
  return items.map((item) =>
    typeof item === "string" ? { src: item, title: "" } : { src: item.src, title: item.title?.trim() ?? "" }
  );
}
