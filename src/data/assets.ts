const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const assets = {
  logo: withBase("/assets/logo/lasertag-logo.png"),
  logoWhite: withBase("/assets/logo/lasertag-logo-white.png"),

  heroGroup: withBase("/assets/optimized/hero-group.webp"),
  heroCutout: withBase("/assets/optimized/hero-cutout.png"),
  heroCutoutSource: withBase("/assets/photos/hero-cutout-source.jpg"),
  heroSmall1: withBase("/assets/optimized/hero-small-1.webp"),
  heroSmall2: withBase("/assets/optimized/hero-small-2.webp"),

  territoryMain: withBase("/assets/optimized/territory-main.webp"),
  territory1: withBase("/assets/optimized/territory-1.webp"),
  territory2: withBase("/assets/optimized/territory-2.webp"),
  territory3: withBase("/assets/optimized/territory-3.webp"),
  territory4: withBase("/assets/optimized/territory-4.webp"),

  quotePlayer: withBase("/assets/optimized/quote-player.webp"),

  videoHeroMp4: withBase("/assets/video/hero-loop.mp4"),
  videoHeroWebm: withBase("/assets/video/hero-loop.webm"),
  videoHeroPoster: withBase("/assets/video/hero-poster.jpg"),
  videoActionMp4: withBase("/assets/video/action-loop.mp4"),
  videoActionWebm: withBase("/assets/video/action-loop.webm"),
  videoActionPoster: withBase("/assets/video/action-poster.jpg"),
};
