// src/data/CoffeeList.js

export const CoffeeList = {
  id: "tokyo-coffee",
  title: "Tokyo Coffee",
  shortDescription:
    "A curated mix of specialty coffee shops and classic kissaten-style cafés across Tokyo.",
  longDescription: `
This list splits Tokyo coffee into two main moods:

- Specialty: modern, third-wave style shops focused on beans, brewing, and clean design.
- Kissa / Classic / Vibes: old-school coffee houses and cozy spots with character and atmosphere.

Use it as a loose guide, not a strict route. Pick an area you’re in, choose a mood, and drop into a couple of places.
  `.trim(),

  places: [
    // -------------------
    // Specialty
    // -------------------
    {
      id: "fuglen-shibuya",
      name: "Fuglen Coffee Roasters (Shibuya)",
      category: "Specialty",
      neighborhood: "Shibuya",
      address: "",
      notes: "Scandi-style café and bar; light, bright, and good for lingering.",
      mapsQuery: "Fuglen Coffee Roasters Shibuya Tokyo",
    },
    {
      id: "fuglen-asakusa",
      name: "Fuglen Coffee Roasters (Asakusa)",
      category: "Specialty",
      neighborhood: "Asakusa",
      address: "",
      notes: "Relaxed outpost near Asakusa, nice stop after temple sightseeing.",
      mapsQuery: "Fuglen Coffee Roasters Asakusa Tokyo",
    },
    {
      id: "verve-shinjuku",
      name: "Verve Coffee Roasters (Shinjuku)",
      category: "Specialty",
      neighborhood: "Shinjuku",
      address: "",
      notes: "California-origin brand; polished, spacious, and easy to drop into.",
      mapsQuery: "Verve Coffee Roasters Shinjuku Tokyo",
    },
    {
      id: "switch-meguro",
      name: "Switch Coffee (Meguro)",
      category: "Specialty",
      neighborhood: "Meguro",
      address: "",
      notes: "Neighborhood specialty spot; compact but serious about beans.",
      mapsQuery: "Switch Coffee Tokyo Meguro",
    },
    {
      id: "onibus-nakameguro",
      name: "Onibus Coffee (Nakameguro)",
      category: "Specialty",
      neighborhood: "Nakameguro",
      address: "",
      notes: "Tiny but iconic; great stop right by Nakameguro station.",
      mapsQuery: "Onibus Coffee Nakameguro Tokyo",
    },
    {
      id: "ogawa-shimokitazawa",
      name: "Ogawa Coffee Laboratory (Shimokitazawa)",
      category: "Specialty",
      neighborhood: "Shimokitazawa",
      address: "",
      notes: "Lab-like vibe with a wide range of beans and brewing options.",
      mapsQuery: "Ogawa Coffee Laboratory Shimokitazawa Tokyo",
    },
    {
      id: "bear-pond-shimokitazawa",
      name: "Bear Pond Espresso",
      category: "Specialty",
      neighborhood: "Shimokitazawa",
      address: "",
      notes: "Espresso-focused, cult favorite with a very particular style.",
      mapsQuery: "Bear Pond Espresso Shimokitazawa Tokyo",
    },
    {
      id: "coffee-county-shimokitazawa",
      name: "Coffee County (Shimokitazawa)",
      category: "Specialty",
      neighborhood: "Shimokitazawa",
      address: "",
      notes: "Relaxed specialty shop with a warm, neighborly feel.",
      mapsQuery: "Coffee County Shimokitazawa Tokyo",
    },
    {
      id: "glitch-ginza",
      name: "Glitch Coffee (Ginza)",
      category: "Specialty",
      neighborhood: "Ginza",
      address: "",
      notes: "Light-roast focused, clean and minimal; good for filter coffee fans.",
      mapsQuery: "Glitch Coffee Ginza Tokyo",
    },
    {
      id: "nexpect-kodenmacho",
      name: "Nexpect Coffee",
      category: "Specialty",
      neighborhood: "Kodenmacho / Chuo",
      address: "",
      notes: "Smaller specialty spot around Kodenmacho in Chuo ward.",
      mapsQuery: "Nexpect Coffee Kodenmacho Chuo Tokyo",
    },

    // -------------------
    // Kissa / Classic / Vibes
    // -------------------
    {
      id: "kabuki-taito",
      name: "Kabuki",
      category: "Kissa / Classic / Vibes",
      neighborhood: "Taito",
      address: "",
      notes: "Classic kissa-style spot; more about the atmosphere than minimalism.",
      mapsQuery: "Kabuki coffee Taito Tokyo",
    },
    {
      id: "satei-hato-shibuya",
      name: "Satei Hato",
      category: "Kissa / Classic / Vibes",
      neighborhood: "Shibuya",
      address: "",
      notes: "Legendary kissaten; dark, quiet, and focused on hand-drip coffee.",
      mapsQuery: "Satei Hato Shibuya Tokyo",
    },
    {
      id: "nishiya-taito",
      name: "Nishiya Coffee Stand",
      category: "Kissa / Classic / Vibes",
      neighborhood: "Taito",
      address: "",
      notes: "Retro-style coffee stand with strong kissaten energy.",
      mapsQuery: "Nishiya Coffee Stand Taito Tokyo",
    },
    {
      id: "cafe-luigi-harajuku",
      name: "Cafe Luigi",
      category: "Kissa / Classic / Vibes",
      neighborhood: "Shibuya (Harajuku)",
      address: "",
      notes: "Cozy spot near Harajuku with classic Western-style café vibes.",
      mapsQuery: "Cafe Luigi Harajuku Tokyo",
    },
    {
      id: "aux-bacchanales-ginza",
      name: "Aux Bacchanales (Ginza)",
      category: "Kissa / Classic / Vibes",
      neighborhood: "Ginza",
      address: "",
      notes: "French café/brasserie feel; good for people-watching and a coffee.",
      mapsQuery: "Aux Bacchanales Ginza Tokyo",
    },
  ],
};

