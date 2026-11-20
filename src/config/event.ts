export interface EventConfig {
  groom: string;
  groomParents: string;
  bride: string;
  brideParents: string;
  event: string;
  date: string; // YYYY-MM-DD
  time: string; // 24hr HH:mm
  dayDisplay: string;
  dateDisplay: string;
  timeDisplay: string;
  yearDisplay: string;
  timezone: string;
  targetDateTime: string; // ISO 8601 with offset
  venue: string;
  venueFullAddress: string;
  venueCoordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl: string;
  bismillahArabic: string;
  duaArabic: string;
  duaTranslation: string;
}

export const eventConfig: EventConfig = {
  groom: "Faiq Ahmad",
  groomParents: "S/O Mr. and Mrs. Ishaq",
  bride: "Ayesha Salman",
  brideParents: "D/O Mr. and Mrs. Salman",
  event: "Engagement Ceremony",
  date: "2026-11-25",
  time: "20:00",
  dayDisplay: "Wednesday",
  dateDisplay: "25 November",
  timeDisplay: "8:00 PM",
  yearDisplay: "2026",
  timezone: "Asia/Karachi",
  targetDateTime: "2026-11-25T20:00:00+05:00",
  venue: "Cottage, Daewoo Road",
  venueFullAddress: "The Cottage Marquee, Daewoo Road, Faisalabad, Pakistan",
  venueCoordinates: {
    lat: 31.339722,
    lng: 73.078028,
  },
  googleMapsUrl: "https://maps.google.com/?q=The+Cottage+Marquee+Daewoo+Road+Faisalabad",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=31.339722,73.078028",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=31.339722,73.078028&hl=en&z=15&output=embed",
  bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  duaArabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  duaTranslation: "May Allah bless you both, shower His blessings upon you, and unite you both in goodness.",
};
