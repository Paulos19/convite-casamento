"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export default function WeddingLandingPage() {
  // Data do casamento: 25 de Outubro de 2025 às 16:30
  const targetDate = new Date("2025-10-25T16:30:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const [copiedPix, setCopiedPix] = useState(false);
  const pixKey = "00020126360014br.gov.bcb.pix0114+55119999988885204000053039865802BR5925Helena e Gabriel Casamento6009Sao Paulo62070503***6304E8A2";

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
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setRsvpLoading(true);
    setTimeout(() => {
      setRsvpLoading(false);
      setRsvpSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#E2D5C3", "#B38B6D", "#FAF8F5"],
      });
    }, 800);
  };

  const giftItems = [
    { title: "Jantar Romântico na Lua de Mel", price: "R$ 250", icon: "🍷" },
    { title: "Passeio de Barco ao Pôr do Sol", price: "R$ 380", icon: "⛵" },
    { title: "Dia de Spa dos Noivos", price: "R$ 420", icon: "💆" },
    { title: "Café da Manhã Especial no Quarto", price: "R$ 180", icon: "🥐" },
    { title: "Brinde com Champagne Francês", price: "R$ 300", icon: "🥂" },
    { title: "Cota Livre de Bênçãos & Amor", price: "Qualquer Valor", icon: "✨" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2725] selection:bg-[#EADBC8] selection:text-[#2C2725]">
      {/* Top Navbar Minimalista */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#EAE3DA]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl tracking-widest text-[#5C4D44] hover:opacity-80 transition">
            H & G
          </a>
          <div className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#7C6E65]">
            <a href="#historia" className="hover:text-[#2C2725] transition">Nossa História</a>
            <a href="#detalhes" className="hover:text-[#2C2725] transition">O Grande Dia</a>
            <a href="#presentes" className="hover:text-[#2C2725] transition">Presentes</a>
            <a
              href="#rsvp"
              className="px-4 py-2 rounded-full bg-[#8C6D53] text-[#FAF8F5] hover:bg-[#745841] transition font-semibold"
            >
              Confirmar Presença
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[92vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
            alt="Casamento Romântico"
            className="w-full h-full object-cover opacity-20 filter saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/40 via-[#FAF8F5]/85 to-[#FAF8F5]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D5C7B8] bg-[#F5EFEB]/80 text-[#8C6D53] text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Celebração do Nosso Amor
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#3A322C] mb-6">
            Helena <span className="font-light italic text-[#9B7B61]">&</span> Gabriel
          </h1>

          <p className="text-base sm:text-lg text-[#6B5E55] max-w-xl mx-auto leading-relaxed mb-10 font-light">
            “O amor é paciente, é benigno; o amor tudo sofre, tudo crê, tudo espera, tudo suporta.”
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm tracking-widest uppercase text-[#735F53] font-medium mb-12">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#9B7B61]" /> 25 de Outubro de 2025
            </span>
            <span className="hidden sm:inline text-[#D5C7B8]">•</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9B7B61]" /> 16:30 Horas
            </span>
            <span className="hidden sm:inline text-[#D5C7B8]">•</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9B7B61]" /> Villa Casale — Gramado/RS
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto mb-10">
            {[
              { label: "Dias", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Minutos", value: timeLeft.minutes },
              { label: "Segundos", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/90 border border-[#EAE3DA] rounded-2xl p-3 sm:p-4 shadow-sm backdrop-blur-sm"
              >
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A3E37]">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#96867B] mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8C6D53] text-white hover:bg-[#745841] transition-all duration-300 font-medium tracking-wide shadow-md shadow-[#8C6D53]/20 hover:scale-[1.02]"
            >
              <Heart className="w-4 h-4 fill-white" /> Confirmar Minha Presença
            </a>
          </div>

          <div className="mt-14 animate-bounce text-[#96867B] flex justify-center">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Seção Nossa História */}
      <section id="historia" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[#9B7B61] font-semibold">Trajetória</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3A322C] mt-2">Como Tudo Começou</h2>
          <div className="w-16 h-0.5 bg-[#D5C7B8] mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80"
                alt="Casal"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-[#EAE3DA] max-w-[200px] text-center">
              <p className="font-serif text-lg text-[#4A3E37]">&ldquo;O melhor sim das nossas vidas!&rdquo;</p>
            </div>
          </div>

          <div className="space-y-6 text-[#5C4D44] font-light leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#8C6D53] first-letter:float-left first-letter:mr-3 first-letter:font-bold">
              Nos conhecemos em uma tarde ensolarada de outono e, desde aquele primeiro café despretensioso,
              percebemos que nossos risos tinham o mesmo ritmo e que nossos sonhos apontavam na mesma direção.
            </p>
            <p>
              Ao longo de 7 anos compartilhamos viagens inesquecíveis, planos, desafios superados e a certeza
              diária de que o verdadeiro amor se constrói na cumplicidade, no carinho e no respeito mútuo.
            </p>
            <p>
              Agora, diante das pessoas mais especiais das nossas vidas, daremos o passo mais importante da
              nossa jornada: selar a nossa união com as bênçãos daqueles que amamos.
            </p>
          </div>
        </div>
      </section>

      {/* Detalhes do Evento */}
      <section id="detalhes" className="py-20 px-6 bg-[#F5EFEB]/60 border-y border-[#EAE3DA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#9B7B61] font-semibold">Programação</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#3A322C] mt-2">Onde & Quando</h2>
            <div className="w-16 h-0.5 bg-[#D5C7B8] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cerimônia */}
            <div className="bg-white rounded-3xl p-8 border border-[#EAE3DA] shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-[#8C6D53] mb-6 border border-[#EAE3DA]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#3A322C] mb-2">A Cerimônia</h3>
              <p className="text-sm text-[#7C6E65] mb-6 leading-relaxed">
                Momento solene onde trocaremos nossos votos ao ar livre, cercados pela natureza encantadora de Gramado.
              </p>
              <div className="space-y-3 text-sm text-[#5C4D44] border-t border-[#F0EAE1] pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#9B7B61]" />
                  <span>Sábado, 25 de Outubro de 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#9B7B61]" />
                  <span>Pontualmente às 16:30</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#9B7B61]" />
                  <span>Villa Casale — Alameda das Hortênsias, 850</span>
                </div>
              </div>
            </div>

            {/* Recepção e Festa */}
            <div className="bg-white rounded-3xl p-8 border border-[#EAE3DA] shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-[#8C6D53] mb-6 border border-[#EAE3DA]">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#3A322C] mb-2">A Recepção & Festa</h3>
              <p className="text-sm text-[#7C6E65] mb-6 leading-relaxed">
                Jantar exclusivo com alta gastronomia da serra, drinks autorais e uma pista de dança inesquecível.
              </p>
              <div className="space-y-3 text-sm text-[#5C4D44] border-t border-[#F0EAE1] pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#9B7B61]" />
                  <span>A partir das 18:30 (até o sol raiar)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#9B7B61]" />
                  <span>Estacionamento com Valet no local</span>
                </div>
                <div className="flex items-center gap-3">
                  <Navigation className="w-4 h-4 text-[#9B7B61]" />
                  <span>Salão Nobre Villa Casale (mesmo endereço)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://maps.google.com/?q=Gramado+RS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#8C6D53] hover:text-[#5C4D44] transition underline underline-offset-4"
            >
              <Navigation className="w-4 h-4" /> Abrir localização no Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Lista de Presentes & PIX */}
      <section id="presentes" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[#9B7B61] font-semibold">Mimos & Carinho</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3A322C] mt-2">Lista de Presentes</h2>
          <p className="text-sm text-[#7C6E65] max-w-lg mx-auto mt-3 font-light">
            Sua presença é o nosso maior presente! Se desejar nos presentear com uma contribuição para nossa Lua de Mel,
            escolha uma cota simbólica abaixo:
          </p>
          <div className="w-16 h-0.5 bg-[#D5C7B8] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {giftItems.map((gift, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-[#EAE3DA] shadow-sm hover:border-[#8C6D53] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3">{gift.icon}</div>
                <h4 className="font-serif text-xl text-[#3A322C] mb-2">{gift.title}</h4>
              </div>
              <div className="mt-4 pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                <span className="font-semibold text-lg text-[#8C6D53]">{gift.price}</span>
                <button
                  onClick={handleCopyPix}
                  className="text-xs tracking-wider uppercase font-semibold text-[#6B5E55] hover:text-[#8C6D53] transition"
                >
                  Presentear
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Card Chave PIX Direta */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-[#EAE3DA] text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#EAE3DA] flex items-center justify-center text-[#8C6D53] mx-auto mb-4">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-[#3A322C] mb-2">Chave PIX dos Noivos</h3>
          <p className="text-xs text-[#7C6E65] mb-6">
            Você pode fazer a contribuição com qualquer valor via Chave PIX Copia e Cola:
          </p>

          <div className="flex items-center gap-2 p-2 bg-[#FAF8F5] rounded-2xl border border-[#EAE3DA]">
            <input
              type="text"
              readOnly
              value={pixKey}
              className="w-full bg-transparent px-3 text-xs text-[#5C4D44] font-mono outline-none truncate"
            />
            <button
              onClick={handleCopyPix}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8C6D53] text-white hover:bg-[#745841] text-xs font-semibold transition"
            >
              {copiedPix ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copiar PIX
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Confirmação de Presença (RSVP) */}
      <section id="rsvp" className="py-20 px-6 bg-[#F5EFEB]/60 border-t border-[#EAE3DA]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#9B7B61] font-semibold">RSVP</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#3A322C] mt-2">Confirme sua Presença</h2>
            <p className="text-sm text-[#7C6E65] mt-3 font-light">
              Por favor, confirme até o dia <strong>20 de Setembro de 2025</strong> para organizarmos tudo com carinho.
            </p>
            <div className="w-16 h-0.5 bg-[#D5C7B8] mx-auto mt-4" />
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3DA] shadow-sm">
            {rsvpSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#3A322C] mb-2">Presença Confirmada!</h3>
                <p className="text-[#6B5E55] text-sm max-w-md mx-auto leading-relaxed">
                  Que alegria saber que você estará conosco, <strong>{rsvpName}</strong>! Mal podemos esperar para celebrar
                  juntos este momento tão especial.
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="mt-6 text-xs uppercase tracking-widest font-semibold text-[#8C6D53] hover:underline"
                >
                  Enviar outra confirmação
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5C4D44] mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Marina Silveira"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#D5C7B8] focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] outline-none text-sm bg-[#FAF8F5]/50 transition"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5C4D44] mb-2">
                      WhatsApp / Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#D5C7B8] focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] outline-none text-sm bg-[#FAF8F5]/50 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#5C4D44] mb-2">
                      Quantidade de Acompanhantes
                    </label>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#D5C7B8] focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] outline-none text-sm bg-[#FAF8F5]/50 transition"
                    >
                      <option value="1">Apenas eu (1 pessoa)</option>
                      <option value="2">Eu + 1 acompanhante (2 pessoas)</option>
                      <option value="3">Eu + 2 acompanhantes (3 pessoas)</option>
                      <option value="4">Família (4+ pessoas)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5C4D44] mb-2">
                    Recado aos Noivos (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Deixe uma mensagem carinhosa ou restrição alimentar..."
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#D5C7B8] focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] outline-none text-sm bg-[#FAF8F5]/50 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={rsvpLoading}
                  className="w-full py-4 rounded-2xl bg-[#8C6D53] hover:bg-[#745841] text-white font-semibold text-sm tracking-wide transition shadow-md shadow-[#8C6D53]/20 flex items-center justify-center gap-2"
                >
                  {rsvpLoading ? (
                    <span>Registrando presença...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Confirmar Minha Presença
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#EAE3DA] text-center bg-[#FAF8F5]">
        <div className="font-serif text-3xl text-[#5C4D44] mb-2 tracking-widest">H & G</div>
        <p className="text-xs uppercase tracking-widest text-[#96867B] mb-6">25 • 10 • 2025</p>
        <p className="text-xs text-[#A89A90] font-light">
          Feito com todo carinho para celebrar a união de Helena & Gabriel ❤️
        </p>
      </footer>
    </div>
  );
}
