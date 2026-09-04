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
  header: {
    genres: string;
    allGenres: string;
    authors: string;
    languages: string;
    formats: string;
    price: string;
    priceFromAria: string;
    priceToAria: string;
    promos: string;
    apply: string;
    publicationYear: string;
    yearSearchAria: string;
    before2000: string;
    year2000_2010: string;
    year2010_2020: string;
    from2020: string;
    age: string;
    books: string;
    notFound: string;
    collapseListAria: string;
    expandListAria: string;
    signIn: string;
    userCabinet: string;
    notifications: string;
    orders: string;
    library: string;
    adminPanel: string;
    logout: string;
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
  footer: {
    qrAlt: string;
    downloadFrom: string;
    questions: string;
    contacts: string;
    paymentDelivery: string;
    personalDataProtection: string;
    termsOfUse: string;
    productReturn: string;
    productPublicationPolicy: string;
    complaints: string;
    address: string;
    copyright: string;
  };
  cart: {
    title: string;
    backAria: string;
    loading: string;
    loadError: string;
    empty: string;
    inStock: string;
    outOfStock: string;
    formatPaper: string;
    formatEbook: string;
    formatAudio: string;
    decreaseQtyAria: string;
    increaseQtyAria: string;
    addToFavoritesAria: string;
    removeAria: string;
    applyPoints: string;
    subtotal: string;
    discount: string;
    delivery: string;
    total: string;
    price: string;
    zeroPrice: string;
    agreeAria: string;
    agreePrefix: string;
    privacyPolicy: string;
    agreeAnd: string;
    termsOfService: string;
    agreeWarning: string;
    checkout: string;
    hasPromo: string;
    promoPlaceholder: string;
    promoAria: string;
    bookFallback: string;
    authorFallback: string;
  };
  catalog: {
    loadingPage: string;
    arrowAlt: string;
    introHighlight: string;
    introText: string;
    loading: string;
    matchesFound: string;
    activeFilters: string;
    clearAll: string;
    removeFilterAria: string;
    loadingBooks: string;
    loadErrorTitle: string;
    loadErrorText: string;
    noProductsTitle: string;
    noProductsText: string;
    clearAllFilters: string;
    previousPageAria: string;
    nextPageAria: string;
    untitled: string;
    filters: {
      publicationYear: string;
      before2000: string;
      year2000_2010: string;
      year2010_2020: string;
      from2020: string;
      from: string;
      to: string;
      price: string;
      categoriesSelected: string;
      authorsSelected: string;
      languagesSelected: string;
      formatsSelected: string;
      ageCategories: string;
      search: string;
      promo: string;
    };
  };
  product: {
    formats: {
      paper: string;
      ebook: string;
      audio: string;
    };
    pages: string;
    weightKg: string;
    justNow: string;
    report: string;
    like: string;
    loginToComment: string;
    commentError: string;
    loginRequired: string;
    back: string;
    coverMissing: string;
    ratings: string;
    authorLabel: string;
    authorAlt: string;
    authorNotSpecified: string;
    subscribeMore: string;
    priceAtLibria: string;
    zeroPrice: string;
    addToCart: string;
    addToFavorites: string;
    inWishlist: string;
    wishlistHint: string;
    payment: string;
    paymentDescription: string;
    description: string;
    characteristics: string;
    aboutAuthor: string;
    moreAboutAuthor: string;
    booksByAuthor: string;
    moreAuthorBooksAria: string;
    goToCommunity: string;
    addCommentPlaceholder: string;
    sendCommentAria: string;
    noComments: string;
    similar: string;
    more: string;
    addedToCart: string;
    loginToAddCart: string;
    chars: {
      productCode: string;
      bookTitle: string;
      pages: string;
      weight: string;
      year: string;
      genres: string;
      author: string;
      language: string;
      publisher: string;
      cover: string;
      format: string;
      softCover: string;
      hardCover: string;
    };
  };
};
