/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Phone,
  Sparkles,
  ShieldCheck,
  Sun,
  Mountain,
  Binoculars,
  MessageSquare,
  X,
  ChevronRight,
  CheckCircle,
  Send,
  Star,
  Clock,
  Award,
  Globe,
  HelpCircle,
  Menu,
  CreditCard,
  Wallet,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

// Image assets generated
const HERO_IMG = "/src/assets/images/hero_mjuku_safari_1790792565972.jpg";
const SERENGETI_IMG = "/src/assets/images/serengeti_wildlife_1790792575230.jpg";
const NGORONGORO_IMG = "/src/assets/images/ngorongoro_crater_1790792584187.jpg";
const KILIMANJARO_IMG = "/src/assets/images/kilimanjaro_trek_1790792594281.jpg";
const ZANZIBAR_IMG = "/src/assets/images/zanzibar_beach_1790792604253.jpg";

interface Itinerary {
  id: string;
  title: string;
  duration: string;
  tagline: string;
  price: string;
  style: string;
  highlights: string[];
  image: string;
  description: string;
}

const FEATURED_ITINERARIES: Itinerary[] = [
  {
    id: "northern-circuit",
    title: "Classic Northern Circuit Safari",
    duration: "5 Days / 4 Nights",
    tagline: "Serengeti & Ngorongoro Crater Masterpiece",
    price: "From $1,850 / person",
    style: "Mid-Range & Luxury Lodges",
    highlights: ["Endless plains of Serengeti", "Ngorongoro Crater floor game drive", "Tarangire giant baobabs & elephants", "Expert local Arusha guide"],
    image: SERENGETI_IMG,
    description: "Immerse yourself in Tanzania’s premier wildlife sanctuaries. Track lions across the golden Serengeti savannah and descend into the world-famous Ngorongoro Crater caldera teeming with wildlife."
  },
  {
    id: "big-five-masterclass",
    title: "Tanzania Big Five & Migration",
    duration: "7 Days / 6 Nights",
    tagline: "The Ultimate Wildlife Expedition",
    price: "From $2,690 / person",
    style: "Luxury Tented Camps",
    highlights: ["Tarangire, Manyara & Serengeti", "Witness the Wildebeest Migration river crossing (seasonal)", "Ngorongoro Conservation Area", "Private 4x4 Land Cruiser with pop-up roof"],
    image: SERENGETI_IMG,
    description: "Designed for avid wildlife photographers and nature lovers. Experience deep wilderness camps, night game drives where permitted, and intimate encounters with Africa's magnificent Big Five."
  },
  {
    id: "kilimanjaro-machame",
    title: "Mount Kilimanjaro Machame Route",
    duration: "7 Days / 6 Nights",
    tagline: "Conquer the Roof of Africa (5,895m)",
    price: "From $2,150 / person",
    style: "Mountain Camping Expedition",
    highlights: ["Whiskey Route scenic diversity", "Professional mountain guides & porters", "Barranco Wall & Uhuru Peak summit", "Comprehensive medical checks daily"],
    image: KILIMANJARO_IMG,
    description: "Take on Africa's highest peak via the breathtaking Machame route. Incredible panoramic vistas, rainforests, alpine deserts, and expert mountain support from our Arusha base."
  },
  {
    id: "zanzibar-safari-combo",
    title: "Serengeti Safari & Zanzibar Escape",
    duration: "9 Days / 8 Nights",
    tagline: "Wild Savannah to Turquoise Ocean Paradise",
    price: "From $3,400 / person",
    style: "Boutique Lodges & Beach Resorts",
    highlights: ["4 Days Serengeti wildlife safari", "Flight transfer to Zanzibar spice island", "Stone Town historical walking tour", "Pristine white sand beach relaxation"],
    image: ZANZIBAR_IMG,
    description: "The ultimate Tanzanian dream vacation. Combine heart-pounding wildlife action in the Serengeti with barefoot luxury and cultural heritage on the spice island of Zanzibar."
  },
  {
    id: "ngorongoro-tarangire",
    title: "Tarangire & Ngorongoro Explorer",
    duration: "4 Days / 3 Nights",
    tagline: "Short Wildlife & Cultural Immersion",
    price: "From $1,420 / person",
    style: "Comfortable Safari Lodges",
    highlights: ["Tarangire elephant herds", "Ngorongoro Crater wildlife spectacle", "Authentic Maasai boma cultural visit", "Convenient start & end in Arusha"],
    image: NGORONGORO_IMG,
    description: "Short on time but want uncompromised adventure? Explore Tarangire's elephant paradise and the natural wonder of Ngorongoro Crater with our top-rated Arusha guides."
  },
  {
    id: "maasai-cultural-safari",
    title: "Maasai Heritage & Wildlife Safari",
    duration: "6 Days / 5 Nights",
    tagline: "Deep Cultural Connection & Nature",
    price: "From $2,100 / person",
    style: "Eco-Lodges & Cultural Homesteads",
    highlights: ["Guided bush walks with Maasai warriors", "Lake Natron flamingo spectacle", "Ngorongoro Highlands exploration", "Authentic community-led tourism"],
    image: NGORONGORO_IMG,
    description: "Go beyond the standard vehicle safari. Walk alongside traditional Maasai guides, explore sacred Rift Valley landscapes, and experience warm Tanzanian hospitality."
  }
];

const DESTINATIONS = [
  {
    id: "serengeti",
    name: "Serengeti National Park",
    subtitle: "The Endless Plains & Great Migration",
    description: "Home to over 1.5 million wildebeests, hundreds of thousands of zebras, and apex predators including lions, cheetahs, and leopards. The Serengeti offers the ultimate African safari theater across 14,763 square kilometers of rolling savannah.",
    highlights: ["Great Wildebeest Migration", "Unmatched Predator Sightings", "Hot Air Balloon Safaris", "Stunning Golden Sunsets"],
    bestTime: "Year-round (Migration river crossings June–October)",
    image: SERENGETI_IMG
  },
  {
    id: "ngorongoro",
    name: "Ngorongoro Crater",
    subtitle: "The Eden of Africa",
    description: "A breathtaking volcanic caldera formed 2.5 million years ago. Spanning 260 square kilometers with walls 600 meters high, it shelters over 25,000 large animals in a self-contained natural enclosure.",
    highlights: ["High Concentration of Big Five", "Rare Black Rhinos", "Magical Soda Lake Flamingos", "Lush Highland Forests"],
    bestTime: "Year-round excellence",
    image: NGORONGORO_IMG
  },
  {
    id: "kilimanjaro",
    name: "Mount Kilimanjaro",
    subtitle: "The Roof of Africa (5,895m)",
    description: "Africa's highest peak and the world's tallest free-standing mountain. Rising majestically from fertile farmlands, Kilimanjaro offers climbers a journey through five distinct ecological zones from tropical rainforest to arctic summit.",
    highlights: ["Uhuru Peak Summit (5,895m)", "Machame & Lemosho Scenic Routes", "Experienced Local Mountain Crews", "Unforgettable Sunrise Views"],
    bestTime: "January–March & June–October",
    image: KILIMANJARO_IMG
  },
  {
    id: "zanzibar",
    name: "Zanzibar Archipelago",
    subtitle: "Spice Island & Turquoise Waters",
    description: "A tropical paradise off the coast of Tanzania. Famous for white powdery beaches, warm Indian Ocean waters, historic Stone Town (UNESCO World Heritage site), and aromatic spice plantations.",
    highlights: ["Pristine Nungwi & Kendwa Beaches", "Stone Town Heritage Tours", "Snorkeling & Mnemba Atoll Diving", "Fresh Seafood & Spice Tours"],
    bestTime: "June–October & December–February",
    image: ZANZIBAR_IMG
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "safaris" | "destinations" | "planner" | "expert" | "payments">("home");
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bookingPackageTitle, setBookingPackageTitle] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Booking Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelersCount, setTravelersCount] = useState("2");
  const [notes, setNotes] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Payment Verification Form State
  const [payClientName, setPayClientName] = useState("");
  const [payPackage, setPayPackage] = useState("");
  const [payChannel, setPayChannel] = useState<"binance" | "vodacom" | "halotel">("binance");
  const [payTxId, setPayTxId] = useState("");
  const [payAmount, setPayAmount] = useState("");

  // Custom Planner State
  const [planDuration, setPlanDuration] = useState(5);
  const [planTravelers, setPlanTravelers] = useState(2);
  const [planStyle, setPlanStyle] = useState("Mid-Range Safari Lodges");
  const [planInterests, setPlanInterests] = useState<string[]>(["Wildlife & Big Five"]);
  const [planMonth, setPlanMonth] = useState("July (Migration River Crossing)");
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [customItinerary, setCustomItinerary] = useState<any | null>(null);

  // AI Chatbot State ("Safari Kibo")
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: "Jambo! I am Safari Kibo, your personal guide from MJUKU Safari in Arusha, Tanzania. Ask me anything about our wildlife safaris, Serengeti migration seasons, or how to make payments via Binance Pay (589195374) or local Tanzania M-Pesa & Halotel!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2500);
  };

  const handleOpenBooking = (packageName: string) => {
    setBookingPackageTitle(packageName);
    setBookingSubmitted(false);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const handleGenerateCustomPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          duration: planDuration,
          travelers: planTravelers,
          style: planStyle,
          interests: planInterests,
          startingMonth: planMonth
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCustomItinerary(data);
      } else {
        alert(data.error || "Failed to generate itinerary");
      }
    } catch (err) {
      console.error(err);
      alert("Network error connecting to MJUKU AI Planner.");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput;
    setChatInput("");
    const newMessages = [...chatMessages, { role: 'user' as const, content: userText }];
    setChatMessages(newMessages);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      if (res.ok) {
        setChatMessages([...newMessages, { role: 'model', content: data.reply }]);
      } else {
        setChatMessages([...newMessages, { role: 'model', content: "Apologies! I encountered a brief network delay. Feel free to contact our Arusha office directly at +255 764 177 873." }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages([...newMessages, { role: 'model', content: "Please reach MJUKU Safari via WhatsApp at +255 764 177 873 for immediate assistance!" }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    if (planInterests.includes(interest)) {
      setPlanInterests(planInterests.filter(i => i !== interest));
    } else {
      setPlanInterests([...planInterests, interest]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-900 selection:bg-amber-600 selection:text-white">
      
      {/* TOP NOTIFICATION / PAYMENT STRIP */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-6 lg:px-12 flex flex-wrap items-center justify-between gap-2 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <span className="font-bold text-amber-400 tracking-wider">OFFICIAL MJUKU SAFARI:</span>
          <span>Arusha, Tanzania · Direct WhatsApp & Call: <strong>+255 764 177 873</strong></span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline text-stone-400">
            Global: Binance Pay ID <strong className="text-amber-300 font-mono">589195374</strong> · Tanzania: Vodacom & Halotel
          </span>
          <button 
            onClick={() => { setActiveTab("payments"); }}
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 flex items-center gap-1"
          >
            <Wallet className="w-3 h-3" />
            <span>View Payment Methods</span>
          </button>
        </div>
      </div>

      {/* TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200 px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Clearly MJUKU SAFARI) */}
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveTab("home")} className="text-left flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-black text-xl lg:text-2xl tracking-tight text-stone-950 block leading-none">
                MJUKU <span className="text-amber-700 font-bold">SAFARI</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-stone-500 uppercase block mt-1">
                Arusha, Tanzania
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-stone-700">
          <button 
            onClick={() => setActiveTab("home")}
            className={`transition-colors hover:text-amber-700 ${activeTab === 'home' ? 'text-amber-700 underline underline-offset-8 decoration-2' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab("safaris")}
            className={`transition-colors hover:text-amber-700 ${activeTab === 'safaris' ? 'text-amber-700 underline underline-offset-8 decoration-2' : ''}`}
          >
            Safaris & Itineraries
          </button>
          <button 
            onClick={() => setActiveTab("destinations")}
            className={`transition-colors hover:text-amber-700 ${activeTab === 'destinations' ? 'text-amber-700 underline underline-offset-8 decoration-2' : ''}`}
          >
            Destinations
          </button>
          <button 
            onClick={() => setActiveTab("payments")}
            className={`transition-colors hover:text-amber-700 flex items-center gap-1.5 ${activeTab === 'payments' ? 'text-amber-700 underline underline-offset-8 decoration-2' : ''}`}
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-600" /> Payments & Lipa
          </button>
          <button 
            onClick={() => setActiveTab("planner")}
            className={`transition-colors hover:text-amber-700 flex items-center gap-1 ${activeTab === 'planner' ? 'text-amber-700 underline underline-offset-8 decoration-2' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> AI Custom Planner
          </button>
          <button 
            onClick={() => setActiveTab("expert")}
            className={`transition-colors hover:text-amber-700 flex items-center gap-1 ${activeTab === 'expert' ? 'text-amber-700 underline underline-offset-8 decoration-2' : ''}`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" /> Safari Expert
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-700" />
            <span>Make Payment</span>
          </button>
          <a 
            href="tel:+255764177873" 
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-stone-800 bg-stone-200/70 hover:bg-stone-200 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-amber-700" />
            <span>+255 764 177 873</span>
          </a>
          <button 
            onClick={() => handleOpenBooking("Custom Safari Inquiry")}
            className="bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs lg:text-sm px-4 lg:px-5 py-2.5 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-2"
          >
            <span>Book Safari</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-stone-800 hover:text-amber-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-900 text-white px-6 py-6 flex flex-col gap-4 fixed inset-x-0 top-[110px] z-50 shadow-2xl border-b border-stone-800 max-h-[85vh] overflow-y-auto">
          <button 
            onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
            className="text-left text-lg font-medium py-2 border-b border-stone-800 hover:text-amber-400"
          >
            Home
          </button>
          <button 
            onClick={() => { setActiveTab("safaris"); setMobileMenuOpen(false); }}
            className="text-left text-lg font-medium py-2 border-b border-stone-800 hover:text-amber-400"
          >
            Safaris & Itineraries
          </button>
          <button 
            onClick={() => { setActiveTab("destinations"); setMobileMenuOpen(false); }}
            className="text-left text-lg font-medium py-2 border-b border-stone-800 hover:text-amber-400"
          >
            Destinations
          </button>
          <button 
            onClick={() => { setActiveTab("payments"); setMobileMenuOpen(false); }}
            className="text-left text-lg font-medium py-2 border-b border-stone-800 hover:text-amber-400 flex items-center gap-2 text-amber-300"
          >
            <CreditCard className="w-4 h-4" /> Payments & Lipa (Binance / M-Pesa / Halotel)
          </button>
          <button 
            onClick={() => { setActiveTab("planner"); setMobileMenuOpen(false); }}
            className="text-left text-lg font-medium py-2 border-b border-stone-800 hover:text-amber-400 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> AI Custom Planner
          </button>
          <button 
            onClick={() => { setActiveTab("expert"); setMobileMenuOpen(false); }}
            className="text-left text-lg font-medium py-2 border-b border-stone-800 hover:text-amber-400 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" /> Safari Expert Chat
          </button>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); setIsPaymentModalOpen(true); }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 rounded-lg text-center flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" /> Make Payment / Binance Pay
            </button>
            <a href="tel:+255764177873" className="flex items-center justify-center gap-2 text-sm font-semibold bg-stone-800 py-3 rounded-lg text-amber-400">
              <Phone className="w-4 h-4" /> Call +255 764 177 873
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); handleOpenBooking("Direct Inquiry"); }}
              className="w-full bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 rounded-lg text-center"
            >
              Book Safari Now
            </button>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTENT */}
      <main className="flex-grow">
        
        {/* ================= HOME VIEW ================= */}
        {activeTab === "home" && (
          <div>
            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] flex items-center justify-center bg-stone-900 overflow-hidden px-6 py-20">
              <div className="absolute inset-0 z-0">
                <img 
                  src={HERO_IMG} 
                  alt="Tanzania Savannah Safari Sunset" 
                  className="w-full h-full object-cover object-center scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-black/35" />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto text-center text-white space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/50 backdrop-blur-md text-amber-300 text-xs font-bold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> Arusha Based • Authentic Tanzania Safaris
                </div>

                <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-balance">
                  Your adventure starts here. <br className="hidden sm:inline" />
                  <span className="text-amber-400">Discover Tanzania with MJUKU Safari.</span>
                </h1>

                <p className="text-stone-300 text-lg sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
                  From the endless golden plains of the Serengeti to the spectacular Ngorongoro Crater, we connect you with Tanzania’s extraordinary wildlife, rich culture, and warm hospitality.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab("safaris")}
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-base"
                  >
                    <span>Explore Itineraries</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveTab("planner")}
                    className="w-full sm:w-auto bg-stone-900/80 hover:bg-stone-800 text-stone-100 border border-stone-700 font-semibold px-8 py-4 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-3 text-base"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Plan Custom Trip with AI</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("payments")}
                    className="w-full sm:w-auto bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold px-6 py-4 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 text-base"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Payment Channels</span>
                  </button>
                </div>

                {/* Trust bar */}
                <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-stone-800/80 text-stone-300 text-xs sm:text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>100% Tailored Safaris</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Expert Arusha Guides</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>24/7 On-Trip Support</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Globe className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Direct Local Operator</span>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK PAYMENT HIGHLIGHT CARD */}
            <section className="bg-amber-50 border-y border-amber-200 py-12 px-6 lg:px-12">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider">
                    <CreditCard className="w-3.5 h-3.5 text-amber-800" /> Verified Payment Channels
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
                    Seamless Payments for Global & Tanzanian Clients
                  </h3>
                  <p className="text-stone-600 text-sm max-w-2xl">
                    Pay securely worldwide using <strong>Binance Pay (ID: 589195374)</strong> or locally across Tanzania via <strong>Vodacom M-Pesa</strong> & <strong>Halotel HaloPesa</strong>.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab("payments")}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <span>View All Payment Details</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </button>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Pay Deposit / Balance</span>
                  </button>
                </div>
              </div>
            </section>

            {/* INTRO ABOUT ARUSHA & MJUKU SAFARI */}
            <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-block text-amber-800 font-bold tracking-widest text-xs uppercase bg-amber-100 px-3 py-1 rounded">
                    Welcome to MJUKU Safari
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-stone-950 tracking-tight leading-tight">
                    Rooted in Arusha. Guided by Passion.
                  </h2>
                  <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
                    Based right in the safari capital of Arusha, Tanzania, <strong>MJUKU Safari</strong> was founded on a simple belief: that every traveler deserves an authentic, comfortable, and deeply immersive journey into East Africa's most legendary wildernesses.
                  </p>
                  <p className="text-stone-600 text-base leading-relaxed">
                    Whether you are witnessing the Great Wildebeest Migration thunder across the Mara River, descending into the wildlife-rich caldera of Ngorongoro Crater, or trekking the snowy slopes of Mount Kilimanjaro, our experienced local guides ensure your adventure is safe, seamless, and unforgettable.
                  </p>

                  <div className="pt-4 grid grid-cols-2 gap-6">
                    <div className="border-l-2 border-amber-600 pl-4">
                      <span className="font-display font-bold text-3xl text-stone-900 block">15+</span>
                      <span className="text-stone-600 text-sm">Years Combined Guide Experience</span>
                    </div>
                    <div className="border-l-2 border-amber-600 pl-4">
                      <span className="font-display font-bold text-3xl text-stone-900 block">1,200+</span>
                      <span className="text-stone-600 text-sm">Happy Adventurers Hosted</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img 
                      src={SERENGETI_IMG} 
                      alt="Serengeti Lion" 
                      className="rounded-2xl shadow-lg w-full h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src={NGORONGORO_IMG} 
                      alt="Ngorongoro Crater" 
                      className="rounded-2xl shadow-lg w-full h-48 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img 
                      src={KILIMANJARO_IMG} 
                      alt="Kilimanjaro Trek" 
                      className="rounded-2xl shadow-lg w-full h-48 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src={ZANZIBAR_IMG} 
                      alt="Zanzibar Beach" 
                      className="rounded-2xl shadow-lg w-full h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED ITINERARIES PREVIEW */}
            <section className="bg-stone-200/50 py-24 px-6 lg:px-12">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Handcrafted Adventures</span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-stone-900 tracking-tight">
                      Featured Safari Itineraries
                    </h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab("safaris")}
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-950 transition-colors"
                  >
                    <span>View All Itineraries</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {FEATURED_ITINERARIES.slice(0, 3).map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                          {item.duration}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow space-y-4">
                        <div className="space-y-1">
                          <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider">{item.style}</span>
                          <h3 className="font-display font-bold text-xl text-stone-900 group-hover:text-amber-800 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-stone-500 text-xs">{item.tagline}</p>
                        </div>

                        <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between mt-auto">
                          <div>
                            <span className="text-[11px] text-stone-400 block uppercase">Price</span>
                            <span className="font-bold text-stone-900 text-sm">{item.price}</span>
                          </div>
                          <button 
                            onClick={() => { setSelectedItinerary(item); }}
                            className="bg-stone-900 hover:bg-amber-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <span>Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CALL TO ACTION BANNER */}
            <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
              <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-amber-600/20 blur-3xl pointer-events-none" />
                <div className="space-y-4 max-w-2xl relative z-10 text-center lg:text-left">
                  <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Ready for the Wild?</span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                    Talk directly with our Arusha Safari Experts
                  </h2>
                  <p className="text-stone-300 text-base">
                    Have questions about the Wildebeest Migration, park permits, or custom family safari packages? We are ready to craft your dream trip.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
                  <a 
                    href="tel:+255764177873" 
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3.5 rounded-xl text-center shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+255 764 177 873</span>
                  </a>
                  <button 
                    onClick={() => handleOpenBooking("Direct WhatsApp / Phone Inquiry")}
                    className="w-full sm:w-auto bg-white hover:bg-stone-100 text-stone-900 font-bold px-6 py-3.5 rounded-xl text-center shadow-lg transition-colors"
                  >
                    Request Callback
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= PAYMENTS VIEW (NEW COMPREHENSIVE HUB) ================= */}
        {activeTab === "payments" && (
          <div className="py-16 px-6 lg:px-12 max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5 text-amber-700" /> Official MJUKU Safari Payment Channels
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-stone-950 tracking-tight">
                How to Make Payments
              </h1>
              <p className="text-stone-600 text-base sm:text-lg">
                Safe, fast, and transparent payments for your Tanzanian safari. Choose between Binance Pay for international clients or mobile money for local Tanzanian payments.
              </p>
            </div>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* CARD 1: GLOBAL CLIENTS (BINANCE PAY) */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-amber-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-md">
                        B
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Global / International</span>
                        <h3 className="font-display font-bold text-2xl text-stone-900">Binance Pay</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                      Zero Fees · Instant
                    </span>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    Designed for travelers outside Tanzania. Pay seamlessly with USDT, BUSD, USDC, BTC, ETH, or any major cryptocurrency with instant confirmation.
                  </p>

                  {/* Binance Pay ID Box with 1-Click Copy */}
                  <div className="bg-stone-900 text-white rounded-2xl p-6 space-y-3">
                    <span className="text-xs text-stone-400 font-medium block">MJUKU Safari Binance Pay ID</span>
                    <div className="flex items-center justify-between bg-stone-800/90 rounded-xl px-4 py-3 border border-stone-700">
                      <span className="font-mono text-2xl font-bold tracking-widest text-amber-400 select-all">
                        589195374
                      </span>
                      <button
                        onClick={() => copyToClipboard("589195374", "binance")}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow"
                      >
                        {copiedItem === "binance" ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Pay ID</span>
                          </>
                        )}
                      </button>
                    </div>
                    <span className="text-[11px] text-stone-400 block">
                      Account Name: <strong>MJUKU Safari Official</strong>
                    </span>
                  </div>

                  {/* Step by Step Instructions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Step-by-Step Payment Guide:</h4>
                    <ol className="space-y-2.5 text-xs text-stone-700">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                        <span>Open your <strong>Binance App</strong> and tap the <strong>[Pay]</strong> icon on the top right (or visit <em>binance.com/pay</em>).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                        <span>Select <strong>Send</strong> and choose <strong>Pay ID</strong> as recipient type.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                        <span>Paste Pay ID: <strong className="font-mono text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">589195374</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                        <span>Enter the agreed safari deposit amount (e.g. USDT) and add your name in notes.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">5</span>
                        <span>Send transaction screenshot to WhatsApp <strong>+255 764 177 873</strong> to receive your booking voucher.</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="pt-8 border-t border-stone-100 mt-6 flex items-center justify-between">
                  <a
                    href="https://www.binance.com/en/my/wallet/account/payment/send"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>Open Binance Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Confirm Binance Payment
                  </button>
                </div>
              </div>

              {/* CARD 2: TANZANIA CLIENTS (VODACOM & HALOTEL) */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Tanzania & East Africa</span>
                        <h3 className="font-display font-bold text-2xl text-stone-900">Mobile Money</h3>
                      </div>
                    </div>
                    <span className="bg-stone-100 text-stone-800 text-xs font-bold px-3 py-1 rounded-full">
                      Vodacom & Halotel
                    </span>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    For local clients, Tanzanian citizens, and residents making payments in Tanzanian Shillings (TZS) or USD via registered mobile networks.
                  </p>

                  {/* Channel 1: Vodacom M-Pesa */}
                  <div className="bg-red-50/80 border border-red-200 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Vodacom M-Pesa</span>
                      <span className="text-[11px] text-stone-500 font-mono">Dial *150*00#</span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-red-200">
                      <div>
                        <span className="text-stone-950 font-bold text-base block font-mono">
                          +255 764 177 873
                        </span>
                        <span className="text-[11px] text-stone-500">Name: MJUKU Safari</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("+255764177873", "vodacom")}
                        className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0"
                      >
                        {copiedItem === "vodacom" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedItem === "vodacom" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Channel 2: Halotel HaloPesa */}
                  <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Halotel HaloPesa</span>
                      <span className="text-[11px] text-stone-500 font-mono">Dial *150*88#</span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-orange-200">
                      <div>
                        <span className="text-stone-950 font-bold text-base block font-mono">
                          +255 619 204 353
                        </span>
                        <span className="text-[11px] text-stone-500">Name: MJUKU Safari</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("+255619204353", "halotel")}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0"
                      >
                        {copiedItem === "halotel" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedItem === "halotel" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Local Instructions */}
                  <div className="text-xs text-stone-600 space-y-1">
                    <p>• <strong>Vodacom M-Pesa:</strong> Choose Send Money & enter <strong>+255 764 177 873</strong>.</p>
                    <p>• <strong>Halotel HaloPesa:</strong> Choose Send Money & enter <strong>+255 619 204 353</strong>.</p>
                    <p>• Forward the M-Pesa / HaloPesa confirmation message to WhatsApp <strong>+255 764 177 873</strong>.</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-stone-100 mt-6 flex items-center justify-between">
                  <a
                    href="https://wa.me/255764177873?text=Hello%20MJUKU%20Safari,%20I%20want%20to%20confirm%20my%20mobile%20money%20payment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>WhatsApp Support</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Confirm Mobile Payment
                  </button>
                </div>
              </div>

            </div>

            {/* PAYMENT FAQ / ASSURANCE */}
            <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Payment Security & Booking Policy
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-300">
                <div className="space-y-2">
                  <strong className="text-white block font-display">Official Receipt & Voucher</strong>
                  <p>Upon verification of your payment via Binance Pay or Tanzania mobile money, an official PDF safari voucher is issued within 2 hours.</p>
                </div>
                <div className="space-y-2">
                  <strong className="text-white block font-display">Deposit & Balance</strong>
                  <p>A 30% deposit secures your vehicle, guide, and lodge reservations. The remaining balance can be completed prior to safari kickoff.</p>
                </div>
                <div className="space-y-2">
                  <strong className="text-white block font-display">Direct Verification</strong>
                  <p>Always verify with our registered Arusha office contact <strong>+255 764 177 873</strong> before sending funds.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= SAFARIS VIEW ================= */}
        {activeTab === "safaris" && (
          <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Tanzania Expeditions</span>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-stone-950 tracking-tight">
                Curated Safaris & Itineraries
              </h1>
              <p className="text-stone-600 text-base sm:text-lg">
                Explore our signature multi-day adventures across Serengeti, Ngorongoro, Kilimanjaro, and Zanzibar. Every itinerary is fully customizable to your dates and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_ITINERARIES.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {item.duration}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider">{item.style}</span>
                      <h3 className="font-display font-bold text-xl text-stone-900 group-hover:text-amber-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-stone-500 text-xs">{item.tagline}</p>
                    </div>

                    <p className="text-stone-600 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Key Highlights</span>
                      <ul className="space-y-1">
                        {item.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[11px] text-stone-400 block uppercase">Starting at</span>
                        <span className="font-bold text-stone-900 text-sm">{item.price}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedItinerary(item)}
                        className="bg-stone-900 hover:bg-amber-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= DESTINATIONS VIEW ================= */}
        {activeTab === "destinations" && (
          <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Tanzania Wonderland</span>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-stone-950 tracking-tight">
                Explore Iconic Destinations
              </h1>
              <p className="text-stone-600 text-base sm:text-lg">
                From legendary wildlife reserves to majestic mountain peaks and turquoise ocean islands.
              </p>
            </div>

            <div className="space-y-20">
              {DESTINATIONS.map((dest, index) => (
                <div 
                  key={dest.id} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded">
                      {dest.subtitle}
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-900">
                      {dest.name}
                    </h2>
                    <p className="text-stone-700 text-base leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Destination Highlights</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dest.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-stone-800 bg-white p-3 rounded-lg border border-stone-200">
                            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-stone-500">
                      <strong className="text-stone-900">Best Time to Visit:</strong> {dest.bestTime}
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => handleOpenBooking(`${dest.name} Safari Inquiry`)}
                        className="bg-stone-900 hover:bg-amber-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <span>Plan Trip to {dest.name}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className={`relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= AI CUSTOM PLANNER VIEW ================= */}
        {activeTab === "planner" && (
          <div className="py-16 px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini AI & MJUKU Local Expertise
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-stone-950 tracking-tight">
                AI Custom Safari Itinerary Builder
              </h1>
              <p className="text-stone-600 text-base sm:text-lg">
                Configure your dream adventure below and our AI will immediately generate a bespoke day-by-day Tanzania safari schedule tailored to your exact desires.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-800 block">
                    Safari Duration: <span className="text-amber-700">{planDuration} Days</span>
                  </label>
                  <input 
                    type="range" 
                    min="3" 
                    max="14" 
                    value={planDuration} 
                    onChange={(e) => setPlanDuration(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 font-mono">
                    <span>3 Days</span>
                    <span>7 Days</span>
                    <span>14 Days</span>
                  </div>
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-800 block">
                    Number of Travelers: <span className="text-amber-700">{planTravelers} People</span>
                  </label>
                  <select 
                    value={planTravelers} 
                    onChange={(e) => setPlanTravelers(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>

                {/* Style */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-800 block">Accommodation Style</label>
                  <select 
                    value={planStyle} 
                    onChange={(e) => setPlanStyle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="Luxury Tented Camps">Luxury Tented Camps (5-Star Experience)</option>
                    <option value="Mid-Range Safari Lodges">Mid-Range Safari Lodges (Comfortable & Authentic)</option>
                    <option value="Private Budget Camping">Private Budget Camping (Adventurous)</option>
                    <option value="Ultra-Luxury Exclusive Lodges">Ultra-Luxury Exclusive Lodges</option>
                  </select>
                </div>

                {/* Starting Month */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-800 block">Preferred Travel Month</label>
                  <select 
                    value={planMonth} 
                    onChange={(e) => setPlanMonth(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="July (Migration River Crossing)">July (Migration River Crossing)</option>
                    <option value="August (Peak Migration)">August (Peak Migration)</option>
                    <option value="September (Serengeti Mara River)">September (Serengeti Mara River)</option>
                    <option value="January (Calving Season)">January (Calving Season)</option>
                    <option value="February (Ndutu Calving & Predators)">February (Ndutu Calving & Predators)</option>
                    <option value="June (Dry Season Begins)">June (June - Dry Season)</option>
                    <option value="October (Great Weather)">October (Great Weather)</option>
                    <option value="Anytime / Other">Anytime / Other Month</option>
                  </select>
                </div>
              </div>

              {/* Interests checklist */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-bold text-stone-800 block">Key Interests (Select all that apply)</label>
                <div className="flex flex-wrap gap-2.5">
                  {["Wildlife & Big Five", "Wildebeest Migration", "Mount Kilimanjaro Trek", "Maasai Cultural Village", "Ngorongoro Crater", "Zanzibar Beach Extension", "Bird Watching", "Photographic Safari"].map((interest) => {
                    const active = planInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          active 
                            ? 'bg-amber-600 text-white shadow-md' 
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {interest} {active && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleGenerateCustomPlan}
                  disabled={isGeneratingPlan}
                  className="w-full bg-stone-900 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
                >
                  {isGeneratingPlan ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Crafting Your Bespoke Tanzania Itinerary...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span>Generate Custom Itinerary Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Custom Itinerary Result */}
            {customItinerary && (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-2xl space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded">
                      Generated Bespoke Itinerary
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-stone-900 mt-2">
                      {customItinerary.itineraryName}
                    </h2>
                    <p className="text-stone-600 text-sm mt-1">{customItinerary.overview}</p>
                  </div>
                  <div className="bg-stone-900 text-white px-6 py-4 rounded-2xl text-right">
                    <span className="text-[11px] text-stone-400 block uppercase">Estimated Investment</span>
                    <span className="text-lg font-bold text-amber-400">{customItinerary.estimatedPricePerPerson}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-display font-bold text-xl text-stone-900">Day-by-Day Schedule</h3>
                  <div className="space-y-4">
                    {customItinerary.days?.map((day: any) => (
                      <div key={day.dayNumber} className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold bg-amber-700 text-white px-3 py-1 rounded-full">
                            Day {day.dayNumber}
                          </span>
                          <span className="text-xs font-medium text-stone-500">
                            Stay: {day.accommodation} ({day.meals})
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-lg text-stone-900">{day.title}</h4>
                        <p className="text-stone-700 text-sm leading-relaxed">{day.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {day.highlights?.map((hi: string, hiIdx: number) => (
                            <span key={hiIdx} className="text-xs bg-amber-100/70 text-amber-900 px-2.5 py-1 rounded-md font-medium">
                              • {hi}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {customItinerary.packingTips && (
                  <div className="bg-stone-900 text-white rounded-2xl p-6 space-y-3">
                    <h4 className="font-display font-bold text-base text-amber-400">Essential Packing Tips for Your Trip</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-300">
                      {customItinerary.packingTips.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleOpenBooking(customItinerary.itineraryName)}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Book This Custom Itinerary</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SAFARI EXPERT CHAT VIEW ================= */}
        {activeTab === "expert" && (
          <div className="py-16 px-6 lg:px-12 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">24/7 AI Safari Consultant</span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-950 tracking-tight">
                Chat with Safari Kibo
              </h1>
              <p className="text-stone-600 text-sm sm:text-base">
                Ask about Serengeti weather, Wildebeest river crossings, visa requirements, or how to pay via Binance (589195374) and M-Pesa.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white">
                    SK
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base">Safari Kibo</h3>
                    <span className="text-xs text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online from Arusha Office
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-xs font-semibold bg-amber-600/30 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/40 hover:bg-amber-600/50"
                  >
                    Payment Info
                  </button>
                  <a href="tel:+255764177873" className="text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" /> +255 764 177 873
                  </a>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-stone-50/50">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-amber-600 text-white rounded-br-none shadow-sm' 
                        : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-stone-200 text-stone-500 rounded-2xl rounded-bl-none px-5 py-3 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1 text-xs">Kibo is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="p-4 bg-white border-t border-stone-200 flex items-center gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about Serengeti migration, weather, payment via Binance or M-Pesa..."
                  className="flex-grow bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="bg-stone-900 hover:bg-amber-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* ITINERARY DETAILS MODAL */}
      {selectedItinerary && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
            <div className="relative h-72">
              <img 
                src={selectedItinerary.image} 
                alt={selectedItinerary.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedItinerary(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-semibold bg-amber-600 px-3 py-1 rounded-full">{selectedItinerary.duration}</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">{selectedItinerary.title}</h2>
                <p className="text-stone-300 text-xs">{selectedItinerary.tagline}</p>
              </div>
            </div>

            <div className="p-8 space-y-6 flex-grow">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Overview</h4>
                <p className="text-stone-700 text-sm leading-relaxed">{selectedItinerary.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Accommodation Style</h4>
                <p className="text-stone-800 text-sm font-semibold">{selectedItinerary.style}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Key Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedItinerary.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-800 bg-stone-50 p-3 rounded-lg border border-stone-200">
                      <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment info snippet */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5 text-stone-700">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" /> Accepted Payment Methods:
                </div>
                <p>Global: Binance Pay (<strong>589195374</strong>) · Tanzania: Vodacom (<strong>+255 764 177 873</strong>) & Halotel (<strong>+255 619 204 353</strong>).</p>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block uppercase">Price</span>
                  <span className="font-bold text-stone-900 text-base">{selectedItinerary.price}</span>
                </div>
                <button 
                  onClick={() => {
                    const title = selectedItinerary.title;
                    setSelectedItinerary(null);
                    handleOpenBooking(title);
                  }}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center gap-2"
                >
                  <span>Book This Itinerary</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING / INQUIRY MODAL (WITH DIRECT PAYMENT INSTRUCTIONS) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">MJUKU Safari Reservation</span>
                <h3 className="font-display font-black text-2xl text-stone-950 mt-1">Book Your Adventure</h3>
                <p className="text-stone-500 text-xs mt-0.5">Package: <strong className="text-stone-800">{bookingPackageTitle}</strong></p>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {bookingSubmitted ? (
              <div className="py-6 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-black text-2xl text-stone-900">Inquiry Received Successfully!</h4>
                  <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                    Karibu sana! Our Arusha team has registered your reservation for <strong className="text-stone-900">{bookingPackageTitle}</strong>.
                  </p>
                </div>

                {/* Instant Payment Guidance */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    Ready to Pay Deposit?
                  </span>
                  
                  {/* Binance option */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Binance Pay (Global Clients)</span>
                      <span className="font-mono text-sm font-bold text-amber-700">589195374</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard("589195374", "modal-binance")}
                      className="bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg"
                    >
                      {copiedItem === "modal-binance" ? "Copied!" : "Copy ID"}
                    </button>
                  </div>

                  {/* Local Mobile option */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Tanzania Mobile Money</span>
                      <span className="font-mono text-xs text-stone-600 block">Vodacom: <strong>+255 764 177 873</strong></span>
                      <span className="font-mono text-xs text-stone-600 block">Halotel: <strong>+255 619 204 353</strong></span>
                    </div>
                    <button
                      onClick={() => copyToClipboard("+255764177873", "modal-voda")}
                      className="bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg"
                    >
                      {copiedItem === "modal-voda" ? "Copied!" : "Copy M-Pesa"}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/255764177873?text=Hello%20MJUKU%20Safari,%20I%20just%20submitted%20a%20booking%20for%20${encodeURIComponent(bookingPackageTitle)}.%20Name:%20${encodeURIComponent(fullName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-center text-sm shadow-md"
                  >
                    Confirm on WhatsApp (+255 764 177 873)
                  </a>
                  <button 
                    onClick={() => setIsBookingModalOpen(false)}
                    className="w-full sm:w-auto bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold px-6 py-3 rounded-xl text-sm"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 019 2834"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Preferred Travel Date</label>
                    <input 
                      type="date" 
                      required 
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Number of Travelers</label>
                    <select 
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Special Requests or Dietary Notes</label>
                  <textarea 
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Let us know about dietary requirements, accommodation preferences, or children joining..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-stone-900 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Submit Safari Inquiry</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DEDICATED MAKE PAYMENT / VERIFICATION MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">MJUKU Safari Finance</span>
                <h3 className="font-display font-black text-2xl text-stone-950 mt-1">Make a Payment</h3>
                <p className="text-stone-500 text-xs mt-0.5">Global (Binance Pay) & Local Tanzania (Vodacom / Halotel)</p>
              </div>
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Copy Channel Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                onClick={() => setPayChannel("binance")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${payChannel === 'binance' ? 'border-amber-600 bg-amber-50/70 shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-800 uppercase">Global</span>
                  {payChannel === 'binance' && <Check className="w-4 h-4 text-amber-600" />}
                </div>
                <div className="font-display font-bold text-sm text-stone-900">Binance Pay</div>
                <div className="font-mono text-xs font-bold text-stone-700 mt-1 flex items-center justify-between">
                  <span>ID: 589195374</span>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); copyToClipboard("589195374", "modal-bin-tab"); }}
                    className="text-[10px] text-amber-800 underline"
                  >
                    {copiedItem === "modal-bin-tab" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div 
                onClick={() => setPayChannel("vodacom")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${payChannel === 'vodacom' ? 'border-red-600 bg-red-50/70 shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-700 uppercase">Tanzania</span>
                  {payChannel === 'vodacom' && <Check className="w-4 h-4 text-red-600" />}
                </div>
                <div className="font-display font-bold text-sm text-stone-900">Vodacom / Halotel</div>
                <div className="font-mono text-xs font-bold text-stone-700 mt-1 flex items-center justify-between">
                  <span>+255 764 177 873</span>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); copyToClipboard("+255764177873", "modal-voda-tab"); }}
                    className="text-[10px] text-red-700 underline"
                  >
                    {copiedItem === "modal-voda-tab" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Channel Details */}
            {payChannel === "binance" ? (
              <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-2">
                <span className="text-xs text-amber-400 font-semibold block">Binance Pay Instructions:</span>
                <p className="text-xs text-stone-300">
                  Send to Binance Pay ID <strong className="font-mono text-amber-400">589195374</strong>. Zero fees for USDT/crypto transfers.
                </p>
              </div>
            ) : (
              <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-2">
                <span className="text-xs text-amber-400 font-semibold block">Tanzania Mobile Money Numbers:</span>
                <p className="text-xs text-stone-300 font-mono">
                  • Vodacom M-Pesa: <strong>+255 764 177 873</strong><br />
                  • Halotel HaloPesa: <strong>+255 619 204 353</strong>
                </p>
              </div>
            )}

            {/* Confirmation on WhatsApp Form */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Notify Arusha Office After Sending Payment:
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Client / Payer Name</label>
                <input 
                  type="text" 
                  value={payClientName}
                  onChange={(e) => setPayClientName(e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Amount Paid ($ or TZS)</label>
                  <input 
                    type="text" 
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="e.g. 500 USDT or 1,200,000 TZS"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Transaction ID / Reference</label>
                  <input 
                    type="text" 
                    value={payTxId}
                    onChange={(e) => setPayTxId(e.target.value)}
                    placeholder="e.g. Binance Order # or M-Pesa Code"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/255764177873?text=Hello%20MJUKU%20Safari,%20I%20have%20sent%20a%20payment%20via%20${payChannel === 'binance' ? 'Binance%20Pay%20(589195374)' : 'Tanzania%20Mobile%20Money'}.%0AName:%20${encodeURIComponent(payClientName || 'Guest')}%0AAmount:%20${encodeURIComponent(payAmount || 'Agreed Deposit')}%0ATransaction%20Ref:%20${encodeURIComponent(payTxId || 'Pending Confirmation')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Payment Confirmation via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6 lg:px-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-black text-xl text-white tracking-wide">
                MJUKU <span className="text-amber-500 font-bold">SAFARI</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Your gateway to unforgettable adventures in Tanzania. Discover Serengeti, Ngorongoro, Kilimanjaro, and authentic Arusha hospitality with <strong>MJUKU Safari</strong>.
            </p>
            <div className="text-xs text-amber-400 font-semibold space-y-1">
              <div>WhatsApp & Call: +255 764 177 873</div>
              <div className="text-stone-400 font-mono text-[11px]">Halotel Line: +255 619 204 353</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => setActiveTab("home")} className="hover:text-amber-400 transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab("safaris")} className="hover:text-amber-400 transition-colors">Safaris & Itineraries</button></li>
              <li><button onClick={() => setActiveTab("destinations")} className="hover:text-amber-400 transition-colors">Tanzania Destinations</button></li>
              <li><button onClick={() => setActiveTab("payments")} className="hover:text-amber-400 transition-colors text-amber-300 font-semibold">Payment Methods (Binance & M-Pesa)</button></li>
              <li><button onClick={() => setActiveTab("planner")} className="hover:text-amber-400 transition-colors">AI Custom Planner</button></li>
              <li><button onClick={() => setActiveTab("expert")} className="hover:text-amber-400 transition-colors">Safari Expert Chat</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Payment Channels</h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700">
                <span className="text-[11px] text-amber-400 block font-bold">Global / International:</span>
                <span className="font-mono text-white text-xs">Binance Pay ID: 589195374</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700">
                <span className="text-[11px] text-amber-400 block font-bold">Tanzania Mobile Money:</span>
                <span className="font-mono text-white text-xs">Vodacom: +255 764 177 873</span><br />
                <span className="font-mono text-white text-xs">Halotel: +255 619 204 353</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Arusha Headquarters</h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Clock Tower Area, Arusha, Tanzania<br />
              Direct Phone: +255 764 177 873<br />
              Halotel: +255 619 204 353<br />
              Email: info@mjukusafari.com<br />
              <span className="text-amber-400 font-medium block pt-2">Karibu sana! Discover Tanzania with MJUKU Safari.</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} MJUKU Safari. All rights reserved. Discover Tanzania, Live the Adventure.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab("payments")} className="hover:text-stone-400">Payment Security</button>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Safari Licensing</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
