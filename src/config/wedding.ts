export const wedding = {
  brideName: "Ishika Rohal",
  groomName: "Aakash Choudhary",
  shortNames: "Ishika & Aakash",
  dateLabel: "2026-12-13",
  // Set an ISO date/time with timezone, e.g. "2026-12-15T19:00:00+05:30".
  dateISO: "2026-12-13T19:00:00+05:30",
  time: "07:00 PM",
  invitationLine: "Together with our families, we invite you to celebrate our wedding.",
  venue: {
    eventName: "Tilak & Mandha",
    date: "12-12-2026",
    name: "Durga Farms",
    address: "Gunsarsa-Rankhandi Road, Deoband",
    mapsQuery: "Durga Farms, Rankhandi",
    mapsUrl: "https://maps.app.goo.gl/iaGT83asqPENhgek6"
  },
  additionalVenues: [
    {
      name: "Kamla Farms",
      address: "FPG8+5FG, Dwarika Puri, Muzaffarnagar, Uttar Pradesh 251002",
      mapsQuery: "Kamla Farms, Muzaffarnagar"
    }
  ],
  events: [
    { id: "haldi", name: "Haldi", date: "07-12-2026", time: "05:00 PM", place: "Gunarsa, Deoband", description: "A joyful beginning filled with sunshine, laughter and blessings.", icon: "☼" },
    { id: "mehendi&sangeet", name: "Mehendi & Sangeet", date: "11-12-2026", time: "06:00 PM", place: "Gunarsa, Deoband", description: "An evening of intricate henna, music and togetherness.", icon: "♫" },
    { id: "mandha", name: "Tilak & Mandha", date: "12-12-2026", time: "11:00 AM", place: "Durga Farms, Deoband", description: "Welcoming the bride's family for the ceremonial tilak, shagun exchange, and a festive feast.", icon: "❀" },
    { id: "wedding", name: "Wedding Ceremony", date: "13-12-2026", time: "07:00 PM", place: "Kamla Farms, Muzaffarnagar", description: "Join us as we begin our forever, surrounded by loved ones.", icon: "✧" }
  ]
} as const;
