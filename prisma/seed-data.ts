export const ratings = [
  {
    id: "clp70ltoz000008l89kdnduo0",
    value: "excellent",
  },
  {
    id: "clp70m990000108l89lv85ts1",
    value: "great",
  },
  {
    id: "clp70msd8000208l8dogkbq1g",
    value: "good",
  },
];

export const genres = [
  {
    id: "clp710y3l000108lc824k5bph",
    name: "alternative metal",
  },
  {
    id: "clp712bxa000208lce93p0euj",
    name: "alternative rock",
  },
  {
    id: "clp712sw5000308lc0ga1g58m",
    name: "ambient",
  },
  {
    id: "clp712ym4000408lcfpe7ajcj",
    name: "black metal",
  },
  {
    id: "clp7133qr000508lc0g2u6e75",
    name: "blackened death metal",
  },
  {
    id: "clp7136yj000608lc6bz55k1z",
    name: "death metal",
  },
  {
    id: "clp713an1000708lcbxlv3o02",
    name: "electronic rock",
  },
  {
    id: "clp713fpp000908lcc6q86naw",
    name: "gothic metal",
  },
  {
    id: "clp713ljl000a08lc8bzhehr4",
    name: "hard rock",
  },
  {
    id: "clp713p4i000b08lc172d6al4",
    name: "harsh EBM",
  },
  {
    id: "clp713sdw000c08lc71ei8tix",
    name: "heavy metal",
  },
  {
    id: "clp713zb6000d08lcgxpicovs",
    name: "industrial",
  },
  {
    id: "clp71434u000e08lc4c1p4e51",
    name: "melodic death metal",
  },
  {
    id: "clp7146k5000f08lc54li060q",
    name: "neue deutsche härte",
  },
  {
    id: "clp714a7e000g08lc1qqwbv2n",
    name: "nu metal",
  },
  {
    id: "clp714h53000h08lc6psi5tld",
    name: "post-grunge",
  },
  {
    id: "clp714lxw000i08lcdlup9zlc",
    name: "progressive rock",
  },
  {
    id: "clp714pps000j08lcdfxnhib8",
    name: "psychedelic rock",
  },
  {
    id: "clp714t2n000k08lchdaecozm",
    name: "rap metal",
  },
  {
    id: "clp714wdx000l08lc2gmwa2dj",
    name: "rap rock",
  },
  {
    id: "clp7150kc000m08lcaul9eee9",
    name: "thrash metal",
  },
];

export const bands = [
  {
    id: "clp71epc8000t08lc6a1v11l9",
    name: "Behemoth",
    country: "Poland",
    formedIn: "1991",
    disbandedIn: null,
    lastChecked: null,
    ratingId: "clp70ltoz000008l89kdnduo0",
    genres: {
      connect: [
        { id: "clp712ym4000408lcfpe7ajcj" },
        { id: "clp7133qr000508lc0g2u6e75" },
      ],
    },
  },
  {
    id: "clp75m526000008jugz5yfhit",
    name: "Dead by Sunrise",
    country: "United States",
    formedIn: "2005",
    disbandedIn: "2012",
    lastChecked: new Date("2023-11-18"),
    ratingId: "clp70m990000108l89lv85ts1",
    genres: {
      connect: [
        { id: "clp712bxa000208lce93p0euj" },
        { id: "clp713ljl000a08lc8bzhehr4" },
        { id: "clp714h53000h08lc6psi5tld" },
      ],
    },
  },
  {
    id: "clqtfpoo4000008l8f8s60b8i",
    name: "Disturbed",
    country: "United States",
    formedIn: "1994",
    disbandedIn: null,
    lastChecked: new Date("2023-12-27"),
    ratingId: "clp70m990000108l89lv85ts1",
    genres: {
      connect: [
        { id: "clp714a7e000g08lc1qqwbv2n" },
        { id: "clp710y3l000108lc824k5bph" },
        { id: "clp713sdw000c08lc71ei8tix" },
      ],
    },
  },
  {
    id: "clp75ju7j000008jobr4bchcw",
    name: "Grey Daze",
    country: "United States",
    formedIn: "1993",
    disbandedIn: null,
    lastChecked: new Date("2023-11-18"),
    ratingId: "clp70m990000108l89lv85ts1",
    genres: {
      connect: [
        { id: "clp712bxa000208lce93p0euj" },
        { id: "clp714h53000h08lc6psi5tld" },
      ],
    },
  },
];

export const albums = [
  {
    id: "clq8ia7zq000008l965ci2ec8",
    title: "The Satanist",
    yearReleased: "2014",
    ratingId: "clp70ltoz000008l89kdnduo0",
    bandId: "clp71epc8000t08lc6a1v11l9",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clq8ig10t000108l9c35i4h75",
    title: "The Demigod",
    yearReleased: "2004",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp71epc8000t08lc6a1v11l9",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clq8ig8ko000208l95h3t2c82",
    title: "The Apostasy",
    yearReleased: "2007",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp71epc8000t08lc6a1v11l9",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3dzw61000208lcex1eau9i",
    title: "I Loved You At Your Darkest",
    yearReleased: "2018",
    ratingId: "clp70msd8000208l8dogkbq1g",
    bandId: "clp71epc8000t08lc6a1v11l9",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clqe36a5b000708lf3vhjb5wq",
    title: "No Sun Today",
    yearReleased: "1997",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp75ju7j000008jobr4bchcw",
    genres: {
      connect: [
        { id: "clp712bxa000208lce93p0euj" },
        { id: "clp714h53000h08lc6psi5tld" },
      ],
    },
  },
  {
    id: "clqtfv9j0000108l80jzy425g",
    title: "Believe",
    yearReleased: "2002",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clqtfpoo4000008l8f8s60b8i",
    genres: {
      connect: [
        { id: "clp714a7e000g08lc1qqwbv2n" },
        { id: "clp710y3l000108lc824k5bph" },
      ],
    },
  },
  {
    id: "clr3e7xtq000608lcgmzz6sev",
    title: "Out of Ashes",
    yearReleased: "2009",
    ratingId: "clp70msd8000208l8dogkbq1g",
    bandId: "clp75m526000008jugz5yfhit",
    genres: {
      connect: [
        { id: "clp712bxa000208lce93p0euj" },
        { id: "clp713ljl000a08lc8bzhehr4" },
        { id: "clp714h53000h08lc6psi5tld" },
      ],
    },
  },
];

const BehemothSongs = [
  {
    id: "clr3cd44j000008kz7nz1acmw",
    title: "Conquer All",
    yearReleased: "2004",
    ratingId: "clp70ltoz000008l89kdnduo0",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ig10t000108l9c35i4h75",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3cg2td000108kz1ydneoop",
    title: "Sculpting the Throne ov Seth",
    yearReleased: "2004",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ig10t000108l9c35i4h75",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3cm7az000208kz0n2ygxus",
    title: "At the Left Hand ov God",
    yearReleased: "2007",
    ratingId: "clp70ltoz000008l89kdnduo0",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ig8ko000208l95h3t2c82",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3cn9ey000308kz72ukal17",
    title: "Prometherion",
    yearReleased: "2007",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ig8ko000208l95h3t2c82",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3coimm000408kz8bwo51fz",
    title: "Slaying the Prophets ov Isa",
    yearReleased: "2007",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ig8ko000208l95h3t2c82",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3cpm2w000508kzfif4ezf1",
    title: "Ora Pro Nobis Lucifer",
    yearReleased: "2014",
    ratingId: "clp70ltoz000008l89kdnduo0",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ia7zq000008l965ci2ec8",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3cqej2000608kzahftamw4",
    title: "O Father O Satan O Sun!",
    yearReleased: "2014",
    ratingId: "clp70ltoz000008l89kdnduo0",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ia7zq000008l965ci2ec8",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3cr99i000708kzgxh9eeoy",
    title: "The Satanist",
    yearReleased: "2014",
    ratingId: "clp70ltoz000008l89kdnduo0",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ia7zq000008l965ci2ec8",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3crlpt000808kzf5k1966p",
    title: "Blow Your Trumpets Gabriel",
    yearReleased: "2014",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clq8ia7zq000008l965ci2ec8",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
  {
    id: "clr3e12ly000308lcbmk7515p",
    title: "Bartzabel",
    yearReleased: "2018",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp71epc8000t08lc6a1v11l9",
    albumId: "clr3dzw61000208lcex1eau9i",
    genres: {
      connect: [{ id: "clp7133qr000508lc0g2u6e75" }],
    },
  },
];

export const songs = [
  ...BehemothSongs,
  {
    id: "clr3e4b7c000408lcdcll0qgp",
    title: "Let Down",
    yearReleased: "2009",
    ratingId: "clp70m990000108l89lv85ts1",
    bandId: "clp75m526000008jugz5yfhit",
    albumId: "clr3e7xtq000608lcgmzz6sev",
    genres: {
      connect: [{ id: "clp712bxa000208lce93p0euj" }],
    },
  },
];

export const users = [
  {
    id: "clpsslsga000108jz30it20mz",
    username: "bremmdev",
    role: "admin",
  },
  {
    id: "clpssmhw0000208jz64k3f8ze",
    username: "bremmtesting",
    role: "user",
  },
];
