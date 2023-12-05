export const ratings = [
  {
    id: "clp70ltoz000008l89kdnduo0",
    value: "excellent",
  },
  {
    id: "clp70m990000108l89lv85ts1",
    value: "good",
  },
  {
    id: "clp70msd8000208l8dogkbq1g",
    value: "average",
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
    id: "clp75ju7j000008jobr4bchcw",
    name: "Grey Daze",
    country: "United States",
    formedIn: "1993",
    disbandedIn: null,
    lastChecked: null,
    ratingId: "clp70m990000108l89lv85ts1",
    genres: {
      connect: [
        { id: "clp712bxa000208lce93p0euj" },
        { id: "clp714h53000h08lc6psi5tld" },
      ],
    },
  },
  {
    id: "clp75m526000008jugz5yfhit",
    name: "Dead by Sunrise",
    country: "United States",
    formedIn: "2005",
    disbandedIn: "2012",
    lastChecked: null,
    ratingId: "clp70m990000108l89lv85ts1",
    genres: {
      connect: [
        { id: "clp712bxa000208lce93p0euj" },
        { id: "clp713ljl000a08lc8bzhehr4" },
        { id: "clp714h53000h08lc6psi5tld" },
      ],
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
