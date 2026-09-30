"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Gift,
  CheckCircle2,
  Copy,
  Check,
  Music,
  Car,
  Sparkles,
  ChevronDown,
  Navigation,
  Send,
  Volume2,
  VolumeX,
  Share2,
  Compass,
  Shirt,
  Camera,
  ExternalLink,
  Info,
  CalendarPlus,
} from "lucide-react";

export default function WeddingLandingPage() {
  // Data Oficial: 25 de Outubro de 2025 às 16:30
  const targetDate = new Date("2025-10-25T16:30:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Áudio ambiente
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // RSVP Form States
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpDietary, setRsvpDietary] = useState("Nenhuma restrição");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  // PIX e Presentes
  const [copiedPix, setCopiedPix] = useState(false);
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const pixKey = "00020126360014br.gov.bcb.pix0114+55119999988885204000053039865802BR5925Helena e Gabriel Casamento6009Sao Paulo62070503***6304E8A2";

  // Modal / Feedback de compartilhamento
  const [sharedToast, setSharedToast] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {
        // Fallback para política restrita de autoplay do navegador
        setIsPlayingMusic(false);
      });
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#c5a059", "#dfbf77", "#2c2420"],
    });
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Casamento Helena & Gabriel",
      text: "Convidamos você para celebrar o nosso amor no dia 25 de Outubro de 2025!",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignora cancelamento pelo usuário
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 3000);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Casamento Helena & Gabriel");
    const details = encodeURIComponent("Cerimônia e Recepção do Casamento de Helena e Gabriel na Villa Sansu.");
    const location = encodeURIComponent("Villa Sansu, Estrada Municipal de Araçoiaba da Serra, SP");
    // Formato Google Calendar: YYYYMMDDTHHmmssZ
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20251025T193000Z/20251026T060000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setRsvpLoading(true);
    setTimeout(() => {
      setRsvpLoading(false);
      setRsvpSubmitted(true);
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#c5a059", "#ecd9a8", "#8b6336", "#ffffff"],
      });
    }, 900);
  };

  const giftItems = [
    { id: 1, title: "Jantar Romântico na Costa Amalfitana", price: "R$ 280", tag: "Lua de Mel", icon: "🍷" },
    { id: 2, title: "Passeio de Veleiro ao Pôr do Sol", price: "R$ 420", tag: "Aventura", icon: "⛵" },
    { id: 3, title: "Dia de Spa e Relaxamento para os Noivos", price: "R$ 350", tag: "Bem-estar", icon: "🌿" },
    { id: 4, title: "Café da Manhã com Vista para o Mar", price: "R$ 190", tag: "Lua de Mel", icon: "🥐" },
    { id: 5, title: "Brinde com Champagne Vintage na Chegada", price: "R$ 320", tag: "Celebração", icon: "🥂" },
    { id: 6, title: "Cota de Bênçãos & Amor Infinito", price: "Valor Livre", tag: "Especial", icon: "✨" },
  ];

  const timelineEvents = [
    { time: "16:00", title: "Boas-Vindas aos Convidados", desc: "Coquetel leve e recepção nos jardins da villa", icon: Music },
    { time: "16:30", title: "A Cerimônia do Sim", desc: "A troca de votos sob a luz dourada do pôr do sol", icon: Heart },
    { time: "18:00", title: "Brinde & Sessão de Fotos", desc: "Celebração com familiares e amigos queridos", icon: Camera },
    { time: "19:30", title: "Jantar Especial de Celebração", desc: "Gastronomia assinada com vinhos selecionados", icon: Sparkles },
    { time: "22:00", title: "Abertura da Pista de Dança", desc: "Música, alegria e festa até altas horas", icon: Music },
  ];

  return (
    <main className="relative min-h-screen bg-[#faf8f5] text-[#2c2420] overflow-hidden selection:bg-[#c5a059]/25">
      {/* Elemento de áudio ambiente (royalty-free lofi piano clássico romântico) */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-9835.mp3"
      />

      {/* Barra de Ações Rápidas Flutuante Superior */}
      <header className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          aria-label="Tocar ou pausar trilha sonoro"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[#e8dfd5] text-[#4a3f38] shadow-lg shadow-[#2c2420]/5 hover:bg-white hover:border-[#c5a059] hover:text-[#c5a059] transition-all duration-300 text-xs font-medium"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-4 h-4 text-[#c5a059] animate-pulse" />
              <span className="hidden sm:inline">Música Ativa</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#8a7b73]" />
              <span className="hidden sm:inline">Trilha Sonora</span>
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          aria-label="Compartilhar convite"
          className="p-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-[#e8dfd5] text-[#4a3f38] shadow-lg shadow-[#2c2420]/5 hover:bg-white hover:border-[#c5a059] hover:text-[#c5a059] transition-all duration-300"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </header>

      {/* Toast de compartilhamento */}
      {sharedToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#2c2420] text-white text-xs font-medium shadow-2xl flex items-center gap-2 transition-all">
          <Check className="w-4 h-4 text-[#c5a059]" /> Link do convite copiado para a área de transferência!
        </div>
      )}

      {/* HERO SECTION MONUMENTAL (Estilo Editorial Luxo) */}
      <section className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-16 sm:pt-24 pb-12 overflow-hidden">
        {/* Orbes e texturas de fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[750px] h-[520px] sm:h-[750px] bg-gradient-to-tr from-[#ecd9a8]/35 via-[#f5ebdc]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
        <div className="absolute -bottom-16 left-10 w-96 h-96 bg-[#dfbf77]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Tag & Pre-header */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#c5a059]/40 shadow-sm text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8b6336] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            Celebração de Amor & União
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          </div>
          <p className="font-serif italic text-base sm:text-lg text-[#7c6d64] tracking-wide">
            Com a bênção de Deus e de nossos queridos pais
          </p>
        </div>

        {/* Nomes dos Noivos & Monograma */}
        <div className="my-auto py-8 sm:py-12 max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#c5a059]/40 flex items-center justify-center mb-6 bg-white/60 backdrop-blur-md shadow-inner text-[#8b6336] font-serif text-xl sm:text-2xl italic tracking-wider">
            H & G
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#241c19] tracking-tight leading-[1.05] font-light">
            Helena <span className="gold-gradient-text font-serif italic font-normal">&</span> Gabriel
          </h1>

          <div className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-6 sm:my-8" />

          <p className="max-w-xl text-sm sm:text-base md:text-lg text-[#66574f] font-light leading-relaxed px-4">
            Escolhemos caminhar lado a lado por toda a vida. E nada nos faz mais felizes do que dividir esse juramento com você.
          </p>

          {/* Badges de Data e Local Rápido */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#4a3f38]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#e8dfd5] shadow-sm">
              <Calendar className="w-4 h-4 text-[#c5a059]" />
              <span className="font-medium">25 de Outubro de 2025</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#e8dfd5] shadow-sm">
              <Clock className="w-4 h-4 text-[#c5a059]" />
              <span className="font-medium">16:30 Horas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#e8dfd5] shadow-sm">
              <MapPin className="w-4 h-4 text-[#c5a059]" />
              <span className="font-medium">Villa Sansu • SP</span>
            </div>
          </div>

          {/* Botões de Ação Imediata */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
            <a
              href="#rsvp"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-gradient-bg text-[#2c221e] font-semibold text-sm tracking-wide shadow-lg shadow-[#c5a059]/25 hover:brightness-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirmar Minha Presença
            </a>
            <button
              onClick={handleAddToCalendar}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/90 border border-[#d9ccb8] text-[#4a3f38] font-medium text-sm hover:bg-white hover:border-[#c5a059] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <CalendarPlus className="w-4 h-4 text-[#c5a059]" />
              Salvar na Minha Agenda
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#contagem"
          className="group flex flex-col items-center gap-1.5 text-xs text-[#8b7b71] hover:text-[#c5a059] transition-colors pt-4"
        >
          <span className="tracking-widest uppercase text-[10px]">Descubra os detalhes</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#c5a059]" />
        </a>
      </section>

      {/* CONTADOR REGRESSIVO DE PRECISÃO */}
      <section id="contagem" className="py-16 sm:py-20 px-4 sm:px-6 relative border-y border-[#ede6dc] bg-gradient-to-b from-[#faf8f5] to-[#f4efe8]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif italic text-base sm:text-xl text-[#8b6336] mb-2">A contagem para o nosso para sempre</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2c2420] font-light mb-10">
            Cada segundo até o nosso primeiro sim
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {[
              { label: "DIAS", value: timeLeft.days },
              { label: "HORAS", value: timeLeft.hours },
              { label: "MINUTOS", value: timeLeft.minutes },
              { label: "SEGUNDOS", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center py-6 px-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#e8dfd5] shadow-lg shadow-[#2c2420]/5 hover:-translate-y-1 hover:border-[#c5a059]/60 transition-all duration-300"
              >
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2c2420] font-light tracking-tight tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#8b6336] mt-2">
                  {item.label}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-transparent group-hover:bg-[#c5a059]/30 rounded-b-2xl transition-all" />
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs sm:text-sm text-[#7a6b62] italic max-w-md mx-auto">
            “O amor não é olhar um para o outro, é olhar juntos na mesma direção.”
          </p>
        </div>
      </section>

      {/* NOSSA HISTÓRIA / EDITORIAL GALLERY BENTO */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8b6336] font-semibold">Capítulo a Capítulo</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#241c19] mt-2 mb-4 font-light">Nossa História de Amor</h2>
          <p className="text-sm sm:text-base text-[#6f6159] font-light leading-relaxed">
            De um encontro despretensioso em uma tarde ensolarada até a certeza de que queríamos construir um lar e uma vida inteira lado a lado.
          </p>
        </div>

        {/* Galeria em Grid Estilo Revista Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card Principal */}
          <div className="md:col-span-7 relative group overflow-hidden rounded-3xl min-h-[380px] sm:min-h-[460px] shadow-xl border border-[#e8dfd5]">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
              alt="Helena e Gabriel momento romântico"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="text-xs tracking-[0.2em] uppercase text-[#dfbf77] font-semibold mb-1">Outono de 2021</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light">O Primeiro Olhar</h3>
              <p className="text-xs sm:text-sm text-gray-200 font-light mt-2 max-w-md">
                Uma conversa que parecia durar cinco minutos atravessou a noite inteira. Naquele dia, algo novo começou.
              </p>
            </div>
          </div>

          {/* Cards Secundários */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="relative group overflow-hidden rounded-3xl min-h-[220px] shadow-lg border border-[#e8dfd5] flex-1">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85"
                alt="Detalhes do pedido"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#dfbf77] font-semibold">Primavera de 2024</span>
                <h3 className="font-serif text-xl font-light">O Pedido em Paris</h3>
                <p className="text-xs text-gray-200 font-light mt-1">
                  Sob as luzes da ponte Alexandre III, a pergunta que mudou o rumo dos nossos dias: você quer se casar comigo?
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e8dfd5] shadow-lg flex flex-col justify-center">
              <Heart className="w-8 h-8 text-[#c5a059] mb-4" />
              <h4 className="font-serif text-xl sm:text-2xl text-[#241c19] mb-2 font-normal">
                7 anos de cumplicidade, risos e planos
              </h4>
              <p className="text-xs sm:text-sm text-[#66574f] font-light leading-relaxed">
                Cada viagem, cada café da manhã compartilhado e cada desafio nos trouxe até o dia mais bonito das nossas vidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ONDE E QUANDO: VILLA SANSU & LOCALIZAÇÃO */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#f4efe8]/70 border-t border-[#ede6dc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8b6336] font-semibold">Cenário dos Sonhos</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#241c19] mt-2 mb-4 font-light">Cerimônia & Recepção</h2>
            <p className="text-sm sm:text-base text-[#6f6159] font-light leading-relaxed">
              Toda a celebração acontecerá em um único espaço integrado, cercado pela natureza exuberante e pela arquitetura envidraçada da Villa Sansu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Foto e Card da Villa */}
            <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-2xl border border-white">
              <img
                src="https://images.unsplash.com/photo-1545232979-fbf6783df8cb?auto=format&fit=crop&w=1200&q=85"
                alt="Villa Sansu espaço do casamento"
                className="w-full h-[360px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium w-fit mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#dfbf77]" /> Araçoiaba da Serra — SP
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light">Villa Sansu</h3>
                <p className="text-xs sm:text-sm text-gray-200 font-light mt-1">
                  Espaço com cúpula de vidro panorâmica e vista infinita para o pôr do sol.
                </p>
              </div>
            </div>

            {/* Informações Práticas e Waze/Maps */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e8dfd5] shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#241c19] font-medium">Horário Pontual</h4>
                    <p className="text-xs sm:text-sm text-[#66574f] font-light mt-1">
                      Recepção às <strong>16:00</strong>. Cerimônia pontualmente às <strong>16:30</strong> para aproveitarmos a golden hour.
                    </p>
                  </div>
                </div>

                <div className="my-5 border-t border-[#ede6dc]" />

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059]">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#241c19] font-medium">Estacionamento & Valet</h4>
                    <p className="text-xs sm:text-sm text-[#66574f] font-light mt-1">
                      Serviço gratuito de valet cortesia no local com total segurança para todos os convidados.
                    </p>
                  </div>
                </div>

                <div className="my-5 border-t border-[#ede6dc]" />

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059]">
                    <Shirt className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#241c19] font-medium">Traje Sugerido</h4>
                    <p className="text-xs sm:text-sm text-[#66574f] font-light mt-1">
                      <strong>Passeio Completo / Social Elegante</strong>. Pedimos com carinho que evitem a cor branca, reservada para a noiva.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botoes de Navegação */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://maps.google.com/?q=Villa+Sansu+Aracoiaba+da+Serra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-2xl bg-white border border-[#e8dfd5] text-xs sm:text-sm font-semibold text-[#2c2420] shadow-sm hover:border-[#c5a059] hover:bg-[#faf8f5] transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Navigation className="w-4 h-4 text-[#c5a059]" />
                  Google Maps
                </a>
                <a
                  href="https://www.waze.com/ul?q=Villa%20Sansu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-2xl bg-white border border-[#e8dfd5] text-xs sm:text-sm font-semibold text-[#2c2420] shadow-sm hover:border-[#c5a059] hover:bg-[#faf8f5] transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Compass className="w-4 h-4 text-[#c5a059]" />
                  Abrir no Waze
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRONOGRAMA DO GRANDE DIA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8b6336] font-semibold">Cronograma</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#241c19] mt-2 mb-4 font-light">Os Momentos do Dia</h2>
          <p className="text-sm text-[#6f6159] font-light">
            Preparamos cada detalhe para que possamos viver intensamente juntos cada segundo desta celebração.
          </p>
        </div>

        <div className="relative border-l-2 border-[#d9ccb8] ml-4 sm:ml-32 md:ml-48 space-y-10 sm:space-y-12">
          {timelineEvents.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                {/* Marcador na linha do tempo */}
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white border-2 border-[#c5a059] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#c5a059] transition-all duration-300">
                  <Icon className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-white transition-colors" />
                </div>

                {/* Hora destacada à esquerda nos telas maiores */}
                <div className="sm:absolute sm:-left-36 top-1 text-sm font-serif italic font-semibold text-[#8b6336] mb-1 sm:mb-0">
                  {evt.time}
                </div>

                {/* Card do evento */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e8dfd5] shadow-sm hover:shadow-md hover:border-[#c5a059]/40 transition-all">
                  <h3 className="font-serif text-lg sm:text-xl text-[#241c19] font-medium">{evt.title}</h3>
                  <p className="text-xs sm:text-sm text-[#66574f] font-light mt-1">{evt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LISTA DE PRESENTES / COTAS DE LUA DE MEL */}
      <section id="presentes" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#f4efe8]/70 border-t border-[#ede6dc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8b6336] font-semibold">Cotas de Lua de Mel</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#241c19] mt-2 mb-4 font-light">Lista de Presentes</h2>
            <p className="text-sm sm:text-base text-[#6f6159] font-light leading-relaxed">
              Sua presença é o maior presente de todos! Caso deseje nos presentear, criamos cotas simbólicas para a nossa lua de mel através de PIX seguro.
            </p>
          </div>

          {/* Grid de Cotas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {giftItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGift(item.title)}
                className={`cursor-pointer group p-6 rounded-3xl bg-white border transition-all duration-300 relative flex flex-col justify-between ${
                  selectedGift === item.title
                    ? "border-[#c5a059] shadow-xl ring-2 ring-[#c5a059]/20"
                    : "border-[#e8dfd5] shadow-sm hover:shadow-lg hover:border-[#c5a059]/60 hover:-translate-y-1"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5]">{item.icon}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#8b6336] border border-[#e8dfd5]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#241c19] font-medium leading-snug">{item.title}</h3>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ede6dc] flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-[#8b6336]">{item.price}</span>
                  <span className="text-xs font-semibold text-[#c5a059] group-hover:underline flex items-center gap-1">
                    Presentear <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Card PIX Copia e Cola Principal */}
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#c5a059]/40 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4 text-[#2c221e] shadow-md">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#241c19] font-medium">Chave PIX Direta dos Noivos</h3>
            <p className="text-xs sm:text-sm text-[#66574f] font-light mt-1 mb-6">
              {selectedGift ? (
                <span>
                  Presente selecionado: <strong>{selectedGift}</strong>. Copie o código abaixo no app do seu banco!
                </span>
              ) : (
                "Você pode contribuir com qualquer valor desejado usando o código copia e cola abaixo."
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#faf8f5] p-3 rounded-2xl border border-[#e8dfd5]">
              <code className="text-[11px] sm:text-xs text-[#52443c] font-mono truncate w-full px-2 text-left">
                {pixKey}
              </code>
              <button
                onClick={handleCopyPix}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl gold-gradient-bg text-[#2c221e] font-semibold text-xs tracking-wide shadow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {copiedPix ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar PIX
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#8b7b71] mt-3">
              Favorecido: Helena & Gabriel • Banco Itaú / Nubank
            </p>
          </div>
        </div>
      </section>

      {/* CONFIRMAÇÃO DE PRESENÇA (RSVP) */}
      <section id="rsvp" className="py-20 sm:py-28 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8b6336] font-semibold">RSVP Online</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#241c19] mt-2 mb-4 font-light">Confirme sua Presença</h2>
            <p className="text-sm sm:text-base text-[#6f6159] font-light">
              Por favor, confirme até o dia <strong>25 de Setembro de 2025</strong> para organizarmos tudo com o máximo carinho.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e8dfd5] shadow-xl relative overflow-hidden">
            {rsvpSubmitted ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#241c19] font-light mb-2">Presença Confirmada com Sucesso!</h3>
                <p className="text-sm text-[#66574f] font-light max-w-md leading-relaxed mb-6">
                  Querido(a) <strong>{rsvpName}</strong>, seu nome já está na nossa lista VIP. Mal podemos esperar para brindar e abraçar você na Villa Sansu!
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="text-xs font-semibold text-[#8b6336] hover:underline"
                >
                  Enviar outra confirmação
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5a4c44] mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Ex: Mariana Silveira"
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-sm text-[#2c2420] focus:outline-none focus:border-[#c5a059] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5a4c44] mb-2">
                      WhatsApp / Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-sm text-[#2c2420] focus:outline-none focus:border-[#c5a059] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5a4c44] mb-2">
                      Número de Pessoas Confirmadas
                    </label>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-sm text-[#2c2420] focus:outline-none focus:border-[#c5a059] focus:bg-white transition-all"
                    >
                      <option value="1">Apenas eu (1 pessoa)</option>
                      <option value="2">Eu e 1 acompanhante (2 pessoas)</option>
                      <option value="3">Família (3 pessoas)</option>
                      <option value="4">Família (4 pessoas)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5a4c44] mb-2">
                      Restrições Alimentares
                    </label>
                    <select
                      value={rsvpDietary}
                      onChange={(e) => setRsvpDietary(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-sm text-[#2c2420] focus:outline-none focus:border-[#c5a059] focus:bg-white transition-all"
                    >
                      <option value="Nenhuma restrição">Nenhuma restrição</option>
                      <option value="Vegetariano">Vegetariano</option>
                      <option value="Vegano">Vegano</option>
                      <option value="Intolerante à lactose">Intolerante à lactose</option>
                      <option value="Celíaco (sem glúten)">Celíaco (sem glúten)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5a4c44] mb-2">
                    Deixe um recado com carinho para os noivos (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Escreva seus votos ou uma mensagem especial..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border border-[#e8dfd5] text-sm text-[#2c2420] focus:outline-none focus:border-[#c5a059] focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={rsvpLoading}
                  className="w-full py-4 rounded-2xl gold-gradient-bg text-[#2c221e] font-semibold text-sm tracking-wide shadow-lg shadow-[#c5a059]/25 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {rsvpLoading ? (
                    <span>Registrando sua presença...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Confirmar Presença no Casamento
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* DÚVIDAS FREQUENTES (FAQ) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#ede6dc]">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8b6336] font-semibold">Tire suas Dúvidas</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241c19] mt-2 font-light">Informações Úteis</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Posso levar crianças?",
              a: "Amamos seus pequenos! Por limitações de capacidade do espaço e logística da festa com água e vidraças, nosso evento foi planejado com foco nos adultos. Crianças de colo da família próxima são bem-vindas.",
            },
            {
              q: "Haverá hospedagem próxima indicada?",
              a: "Sim! A Villa Sansu possui parcerias com o Hotel Fazenda Capo e hotéis em Sorocaba/Araçoiaba com vans executivas de transfer.",
            },
            {
              q: "Como funciona o clima no local em Outubro?",
              a: "A primavera costuma ter tardes ensolaradas agradáveis e início de noite ameno. O salão principal da Villa Sansu possui climatização total de ponta.",
            },
          ].map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-[#e8dfd5] shadow-sm">
              <h3 className="font-serif text-lg font-medium text-[#241c19] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#c5a059]" /> {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-[#66574f] font-light mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER LUXO */}
      <footer className="py-12 px-4 sm:px-6 text-center border-t border-[#ede6dc] bg-[#faf8f5]">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#c5a059]/40 flex items-center justify-center mb-4 bg-white text-[#8b6336] font-serif text-lg italic">
            H & G
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#241c19] font-light">Helena & Gabriel</h3>
          <p className="text-xs text-[#8a7b73] mt-1 tracking-widest uppercase">25 . 10 . 2025 • Villa Sansu</p>
          <div className="w-16 h-[1px] bg-[#c5a059]/50 my-6" />
          <p className="text-xs text-[#9c8e85] font-light flex items-center gap-1.5">
            Feito com <Heart className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" /> para celebrar este momento único com todos vocês.
          </p>
        </div>
      </footer>
    </main>
  );
}
