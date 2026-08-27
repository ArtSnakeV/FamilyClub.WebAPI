export type AdvantageItem = {
  title: string;
  description: string;
};

export type FormatItem = {
  label: string;
  title: string;
  imageAlt: string;
};

export type PromoBannerItem = {
  title: string;
  subtitle: string;
};

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    library: string;
    readingRoom: string;
    community: string;
    profile: string;
    catalog: string;
  };
  common: {
    homeAria: string;
    loading: string;
    anonymous: string;
    user: string;
    newsTag: string;
  };
  home: {
    hero: {
      titleAlt: string;
      tagline: string;
      pickBook: string;
    };
    sections: {
      recommendationsForYou: string;
      newForYou: string;
      romance: string;
      thrillers: string;
      science: string;
      fantasy: string;
      bestsellers: string;
      newArrivals: string;
      bookSets: string;
      announcements: string;
      more: string;
    };
    about: {
      wideChoiceTitle: string;
      wideChoiceText: string;
      promosTitle: string;
      promosText: string;
      homeImageAlt: string;
      readingHallAlt: string;
      libraryAtmosphereAlt: string;
      story: string[];
    };
    ink: {
      imageAlt: string;
      line1: string;
      line2: string;
      intro: string;
      helperParagraph: string;
      bellParagraph: string;
    };
    advantages: {
      title: string;
      items: AdvantageItem[];
    };
    formats: {
      heading: string;
      items: FormatItem[];
    };
    promo: {
      items: PromoBannerItem[];
    };
  };
};
