

// data/tokyoCoffeeList.js
export const tokyoCoffeeList = {
  id: "tokyo-third-wave",
  title: "Tokyo Third-Wave Coffee Walk",
  shortDescription:
    "A curated list of specialty coffee spots across Tokyo, ideal for slow city wandering.",
  longDescription: `
This list is designed for a relaxed, café-hopping day in Tokyo.

You can:
- Start in Shibuya/Shinjuku for the buzz,
- Drift toward Nakameguro or Daikanyama for calmer streets,
- End in a quieter neighborhood café in the evening.

Each spot is chosen for:
- Coffee quality,
- Atmosphere,
- Walkability from nearby stations.
  `.trim(),
  places: [
    {
      id: "about-life-shibuya",
      name: "About Life Coffee Brewers",
      neighborhood: "Shibuya",
      address: "1 Chome-19-8 Dogenzaka, Shibuya City, Tokyo 150-0043, Japan",
      notes:
        "Tiny standing coffee stand near Shibuya. Great for a quick, focused espresso or pour-over.",
      mapsQuery: "About Life Coffee Brewers Shibuya",
    },
    {
      id: "onibus-nakameguro",
      name: "Onibus Coffee Nakameguro",
      neighborhood: "Nakameguro",
      address:
        "2 Chome-14-1 Kamimeguro, Meguro City, Tokyo 153-0051, Japan",
      notes:
        "Beautiful little shop right by Nakameguro station. Great for both espresso and filter. Lovely outdoor vibe.",
      mapsQuery: "Onibus Coffee Nakameguro",
    },
    {
      id: "bluebottle-aoyama",
      name: "Blue Bottle Coffee Aoyama Cafe",
      neighborhood: "Aoyama / Omotesando",
      address:
        "3 Chome-13-14 Minamiaoyama, Minato City, Tokyo 107-0062, Japan",
      notes:
        "Bright, minimalist space. Good as a reset-stop between Omotesando and Shibuya.",
      mapsQuery: "Blue Bottle Coffee Aoyama Tokyo",
    },
  ],
};
