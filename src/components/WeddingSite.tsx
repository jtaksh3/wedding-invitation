'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Heart, Menu, X, Send, ArrowRight, Music2, Volume2 } from "lucide-react";
import AnimatedCoupleVideo, { HeroCoupleVideo } from "./AnimatedCoupleVideo";
import { wedding } from "@/config/wedding";
import { publicAsset } from "@/config/site";
import { getWishes, submitWish, type Wish } from "@/lib/wishes";

const nav = [{ label: "Home", id: "home" }, { label: "Invitation", id: "invitation" }, { label: "Events", id: "events" }, { label: "Venue", id: "venue" }, { label: "Wishes", id: "wishes" }];

export default function WeddingSite() {
  const [activeEvent, setActiveEvent] = useState("haldi");
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showWishes, setShowWishes] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => setMusicOn(true))
      .catch(() => setStatus("Autoplay was blocked by your browser. Tap the music button to start playback."));
  }, []);

  const venueLocations: Array<{
    eventName: string;
    date: string;
    name: string;
    address: string;
    mapsQuery: string;
    mapsUrl?: string;
  }> = [
    {
      ...wedding.venue,
      eventName: wedding.venue.eventName,
      date: wedding.venue.date,
    },
    ...wedding.additionalVenues.map((venue) => {
      const event = wedding.events.find((item) => item.place.includes(venue.name));
      return {
        ...venue,
        eventName: event?.name ?? "Wedding Ceremony",
        date: event?.date ?? wedding.dateLabel,
      };
    }),
  ];
  const mapsUrl = (venue: { mapsQuery: string; mapsUrl?: string }) =>
    venue.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
  const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const enter = () => { goTo("invitation"); };
  const toggleMusic = async () => { const audio = audioRef.current; if (!audio) return; try { if (musicOn) { audio.pause(); setMusicOn(false); } else { await audio.play(); setMusicOn(true); } } catch { setStatus("Playback couldn't start. Please try the music button again."); } };
  const addToCalendar = () => {
    const calendarEvents = wedding.events.filter((event) =>
      event.date === "12-12-2026" || event.date === "13-12-2026"
    );
    if (calendarEvents.length !== 2) {
      setStatus("Add the 12 and 13 December events to src/config/wedding.ts before downloading the calendar invitation.");
      return;
    }

    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const escapeICS = (value: string) => value
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
    const now = formatDate(new Date());
    const vevents = calendarEvents.map((event, index) => {
      const dateParts = event.date.split("-");
      const timeParts = event.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (dateParts.length !== 3 || !timeParts) {
        setStatus(`The date or time for ${event.name} is invalid in src/config/wedding.ts.`);
        return null;
      }

      const [day, month, year] = dateParts;
      const [, hourText, minute, meridiem] = timeParts;
      const hour = Number(hourText) % 12 + (meridiem.toUpperCase() === "PM" ? 12 : 0);
      const start = new Date(`${year}-${month}-${day}T${String(hour).padStart(2, "0")}:${minute}:00+05:30`);
      if (Number.isNaN(start.getTime())) {
        setStatus(`The date or time for ${event.name} is invalid in src/config/wedding.ts.`);
        return null;
      }
      const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
      const venue = venueLocations.find((item) => event.place.includes(item.name));
      const location = venue ? `${venue.name}, ${venue.address}` : event.place;

      return [
        "BEGIN:VEVENT",
        `UID:wedding-${Date.now()}-${index}@invitation`,
        `DTSTAMP:${now}`,
        `DTSTART:${formatDate(start)}`,
        `DTEND:${formatDate(end)}`,
        `SUMMARY:${escapeICS(`${wedding.brideName} & ${wedding.groomName} — ${event.name}`)}`,
        `LOCATION:${escapeICS(location)}`,
        `DESCRIPTION:${escapeICS(`${wedding.invitationLine} ${event.description}`)}`,
        "END:VEVENT",
      ].join("\r\n");
    });
    if (vevents.some((event) => event === null)) return;

    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN", ...vevents, "END:VCALENDAR"
    ];
    const blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "wedding-invitation.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const chooseEvent = (id: string) => { setActiveEvent(id); };

  const sendWish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setStatus("Please enter your name and a message.");
      return;
    }

    try {
      setStatus("Saving your wishes on this device...");
      await submitWish(name.trim(), message.trim());

      setWishes(getWishes());
      setShowWishes(true);

      setName("");
      setMessage("");

      setStatus("Your wishes were saved on this device. Thank you ❤️");

    } catch (error) {
      console.error("Send wish error:", error);

      setStatus(
          error instanceof Error
              ? error.message
              : "Unable to send your wishes. Please try again."
      );
    }
  };

  return (
    <main>
      <AnimatedCoupleVideo activeEvent={activeEvent} />
      <audio ref={audioRef} src={publicAsset("/audio/wedding-instrumental.mp3")} loop preload="none" />
      <header className="site-header">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); goTo("home"); }}>✦ {wedding.shortNames} ✦</a>
        <nav className={menuOpen ? "nav nav--open" : "nav"}>{nav.map(n => <button key={n.id} onClick={() => goTo(n.id)}>{n.label}</button>)}</nav>
        <div className="header-actions">
          <button className="icon-button" aria-label={musicOn ? "Pause wedding music" : "Play wedding music"} onClick={toggleMusic}>{musicOn ? <Volume2 size={18}/> : <Music2 size={18}/>}</button>
          <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-bg" style={{ backgroundImage: `linear-gradient(90deg,#0b1530f2 0%,#0b1530dc 46%,#0b1530a8 100%),url('${publicAsset("/images/sections/welcome.webp")}')` }} />
        <div className="hero-ornament hero-ornament--left">❧</div><div className="hero-ornament hero-ornament--right">❧</div>
        <div className="hero-copy">
          <p className="eyebrow">A NEW CHAPTER BEGINS</p>
          <h1>Our <em>Forever</em></h1>
          <p className="hero-subtitle">A celebration of love, laughter,<br/> and all the moments yet to come.</p>
          <div className="hero-rule"><span>✦</span></div>
          <p className="hero-names">{wedding.brideName} <i>&</i> {wedding.groomName}</p>
          <button className="button button--gold" onClick={enter}>Enter Our Celebration <ArrowRight size={17}/></button>
          <p className="scroll-note">Scroll to explore <span>⌄</span></p>
        </div>
        <div className="hero-couple"><HeroCoupleVideo /></div>
        <div className="petal petal--1">✿</div><div className="petal petal--2">✿</div><div className="petal petal--3">✿</div>
      </section>

      <section id="invitation" className="invitation section-light">
        <div className="section-frame">
          <p className="eyebrow eyebrow--red">WITH THE BLESSINGS OF OUR FAMILIES</p>
          <h2>You Are <em>Cordially Invited</em></h2>
          <p className="section-lead">{wedding.invitationLine}</p>
          <div className="invitation-couple"><span className="couple-caption">A warm welcome from the couple</span></div>
          <div className="names-lockup"><span>{wedding.brideName}</span><small>&</small><span>{wedding.groomName}</span></div>
          <div className="date-pill"><CalendarDays size={17}/><span>{wedding.dateLabel}</span><b>{wedding.time}</b></div>
          <p className="invitation-foot">Your presence will make our celebration complete.</p>
          <div className="invitation-actions"><button className="text-link" onClick={() => goTo("events")}>Explore the celebrations <ArrowRight size={15}/></button></div>
        </div>
      </section>

      <section id="celebration" className="celebration section-light">
        <div className="section-frame celebration-frame">
          <p className="eyebrow eyebrow--red">TWO FAMILIES • ONE BEAUTIFUL BEGINNING</p>
          <h2>A Joyful <em>Union</em></h2>
          <p className="section-lead">With the love and blessings of our families, two hearts and two families come together to celebrate a new beginning.</p>
          <div className="family-flourish"><span>❀</span><span>✦</span><span>❀</span></div>
          <p className="invitation-foot">Your presence and blessings will make this occasion truly special.</p>
          <button className="button button--maroon" onClick={addToCalendar}><CalendarDays size={16}/> Add Wedding to Calendar</button>
        </div>
      </section>

      <section id="events" className="events">
        <div className="section-heading section-heading--dark"><p className="eyebrow">SAVE THE CELEBRATION</p><h2>Wedding <em>Events</em></h2><p>Join us for a series of beautiful celebrations.</p></div>
        <div className="event-grid">{wedding.events.map((event, i) => <motion.button key={event.id} className={`event-card ${activeEvent === event.id ? "event-card--active" : ""}`} onClick={() => chooseEvent(event.id)} whileHover={{ y: -7 }} whileTap={{ scale: .98 }}><span className="event-number">0{i + 1}</span><span className="event-icon">{event.icon}</span><h3>{event.name}</h3><p>{event.description}</p><div className="event-meta"><span><CalendarDays size={14}/>{event.date}</span><span><MapPin size={14}/>{event.place}</span></div><span className="event-time">{event.time}</span></motion.button>)}</div>
        <div className="event-character"><p>{activeEvent === "sangeet" ? "Let's dance the night away!" : "Every celebration is more beautiful with you."}</p></div>
      </section>

      <section id="venue" className="venue section-light">
        <div className="section-heading"><p className="eyebrow eyebrow--red">WE CAN'T WAIT TO SEE YOU</p><h2>Our Wedding <em>Venues</em></h2><p>Find your way to each special celebration.</p></div>
        {venueLocations.map((venue) => (
          <div className="venue-card" key={venue.eventName}>
            <div className="venue-info"><span className="venue-pin"><MapPin size={22}/></span><h3>{venue.name}</h3><p>{venue.eventName} · {venue.date}</p><p>{venue.address}</p><a className="button button--maroon" href={mapsUrl(venue)} target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={16}/></a></div>
            <div className="venue-image"><img src={publicAsset(venue.name === "Durga Farms" ? "/images/Screenshot%202026-11-21%20at%2012.19.38%E2%80%AFAM.png" : "/images/Screenshot%202026-11-21%20at%2012.19.11%E2%80%AFAM.png")} alt={`${venue.name} wedding celebration venue`}/></div>
          </div>
        ))}
      </section>

      <section id="wishes" className="wishes">
        <div className="wishes-decor wishes-decor--one">❀</div><div className="wishes-decor wishes-decor--two">✿</div>
        <div className="wishes-inner">
          <div className="wishes-copy"><p className="eyebrow">A NOTE FROM THE HEART</p><h2>Send Your <em>Wishes</em></h2><p>Your blessings mean the world to us. Leave a little love for the couple as they begin their forever.</p><div className="wishes-couple"><span className="couple-caption">With love and blessings</span></div></div>
          <form className="wish-form" onSubmit={sendWish}>
            <label htmlFor="guest-name">Your name</label><input id="guest-name" value={name} onChange={e => setName(e.target.value)} maxLength={60} placeholder="e.g. Your name" required/>
            <label htmlFor="guest-message">Your message</label><textarea id="guest-message" value={message} onChange={e => setMessage(e.target.value)} maxLength={500} rows={4} placeholder="Write your blessings..." required/>
            <button className="button button--maroon" type="submit"><Send size={16}/> Send Wishes</button>
            <p className="form-status" role="status">{status}</p>
            <p className="privacy-note">Wishes are saved only in this browser and are not sent to the couple. ❤️</p>
          </form>
        </div>
        {showWishes && wishes.length > 0 && <div className="recent-wishes"><h3><Heart size={16}/> Wishes saved on this device</h3><div>{wishes.slice(0, 3).map((w, i) => <article key={`${w.createdAt}-${i}`}><b>{w.name}</b><p>{w.message}</p></article>)}</div></div>}
      </section>

      <footer id="closing" className="closing">
        <div className="closing-lights">✦　✧　✦　✧　✦</div>
        <h2>Thank <em>You</em></h2><p>We can't wait to celebrate with you.</p><button className="button button--gold" onClick={() => goTo("home")}>Back to the beginning <ArrowRight size={16}/></button>
        <div className="footer-bottom">MADE WITH <Heart size={12} fill="currentColor"/> AND A LITTLE MAGIC</div>
      </footer>
    </main>
  );
}
