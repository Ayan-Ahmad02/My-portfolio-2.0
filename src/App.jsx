import React, { useState, useEffect } from 'react';
import Loader from './loader';
import './index.css';
import './App.css';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import WelcomeAlert from './welcomealert';
import Dropdown from 'react-bootstrap/Dropdown';
import Pdf from './Pdf';

// ---------------------------
// Projects data (editable)
// ---------------------------
const projects = [
{
  id: 'darshana-sih-2025',
  title: 'DarShana AI (SIH 2025)',
  desc: 'AI-driven travel platform developed for Smart India Hackathon 2025. Features mood-based recommendation engine, cultural discovery, and immersive AR experiences.',
  tech: ['React', 'AI/ML', 'Map API', 'AR'],
  image: 'https://images.unsplash.com/photo-1524492707947-2f85a1dd8d10?auto=format&fit=crop&w=800&q=80',
  github: 'https://github.com/Ayan-Ahmad02/DarShana-traveler',
  live: 'https://dar-shana-traveler-iwwr.vercel.app/#/'
},
{
  id: 'aynova-hub',
  title: 'Aynova Hub Ecosystem',
  desc: 'A unified digital workspace connecting education and creative tools. High-performance portal for resource management.',
  tech: ['Next.js', 'Node.js', 'Tailwind', 'MongoDB'],
  image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
  github: 'https://github.com/Ayan-Ahmad02/aynova-hub',
  live: 'https://aynova-hub.vercel.app/'
},
{
  id: 'stock-market-predictor',
  title: 'QuantStack Predictor',
  desc: 'ML-powered technical analysis engine that uses historical data and LSTM models to forecast market trends.',
  tech: ['Python', 'TensorFlow', 'Flask', 'Pandas'],
  image: 'https://images.unsplash.com/photo-1611974717483-363e1730da46?auto=format&fit=crop&w=800&q=80',
  github: 'https://github.com/Ayan-Ahmad02/stock-market-predictor',
  live: '#'
},
{
id: 'astrobot',
title: 'AstroBot (ISRO AI)',
desc: 'Intelligent conversational agent dedicated to ISRO mission data and space research tools.',
tech: ['React', 'FastAPI', 'Java'],
image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=800&q=80',
github: 'https://github.com/Ayan-Ahmad02/AstroBot-astrogenises',
live: 'https://ayan-ahmad-90.github.io/AstroBot-astrogenises'
},
{
id: 'kyara',
title: 'Kyara Beverages',
desc: 'High-conversion business portal for a premium beverage company with liquid animations.',
tech: ['HTML', 'CSS', 'JS', 'GSAP'],
image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&w=800&q=80',
github: 'https://github.com/Ayan-Ahmad02/kyara-beverages',
live: 'https://ayan-ahmad-90.github.io/kyara-beverages/'
},
{
id: 'currency',
title: 'Real-Time FX Converter',
desc: 'Clean, dynamic currency converter with live exchange rates and flag detection.',
tech: ['JavaScript', 'API', 'CSS3'],
image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80',
github: 'https://github.com/Ayan-Ahmad02/currency-converter-1.0',
live: 'https://ayan-ahmad-90.github.io/currency-converter-1.0/'
},
{
id: 'weather',
title: 'Aurora Weather',
desc: 'Sleek weather forecasting application using OpenWeather API for real-time atmospheric data.',
tech: ['React', 'API', 'Tailwind'],
image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80',
github: 'https://github.com/Ayan-Ahmad02/AuroraWeather',
live: 'https://ayan-ahmad-90.github.io/AuroraWeather/'
},
{
id: 'tictactoe',
title: 'TicTacTactics Pro',
desc: 'Strategic Tic-Tac-Toe with advanced win-detection logic and neon UI.',
tech: ['HTML', 'CSS', 'JavaScript'],
image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=80',
github: 'https://github.com/Ayan-Ahmad02/TicTacTactics',
live: 'https://ayan-ahmad-90.github.io/TicTacTactics/'
},
{
id: 'rps',
title: 'Battle Arena: RPS',
desc: 'Animated Rock-Paper-Scissors game with immersive feedback and sound effects.',
tech: ['JavaScript', 'Canvas', 'CSS'],
image: 'https://images.unsplash.com/photo-1493723843671-1d655e7d772c?auto=format&fit=crop&w=800&q=80',
github: 'https://github.com/Ayan-Ahmad02/Rock-Paper-Scissor-Game',
live: 'https://ayan-ahmad-90.github.io/Rock-Paper-Scissor-Game/'
},
{
id: 'todo',
title: 'SyncTask Manager',
desc: 'Professional task management system with local synchronization and category filters.',
tech: ['React', 'Context API', 'LocalStorage'],
image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
github: 'https://github.com/Ayan-Ahmad02/todo-app',
live: 'https://ayan-ahmad-90.github.io/todo-app/'
}
];

// ---------------------------
// Small helper & style/; fallback
// ---------------------------
const fallbackStyles = `
  :root {
    --accent: #06b6d4;
    --accent-gradient: linear-gradient(135deg, #06b6d4, #7c3aed);
    --bg: #030712;
    --card: #0f172a;
    --card-hover: #1e293b;
    --muted: #94a3b8;
    --text: #f8fafc;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, system-ui, sans-serif;
    background-color: var(--bg);
    background-image: 
      radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 0% 100%, rgba(124, 58, 237, 0.1) 0%, transparent 40%);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--accent); transition: all 0.2s ease; }
  .btn-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(6, 182, 212, 0.2); }
  .glass-card {
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .glass-card:hover {
    border-color: rgba(6, 182, 212, 0.4);
    background: rgba(15, 23, 42, 0.6);
    transform: translateY(-5px);
    box-shadow: 0 10px 40px -10px rgba(6, 182, 212, 0.3);
  }
`;

function useInjectFallback(){
  useEffect(()=>{
    if(!document.getElementById('portfolio-fallback')){
      const s = document.createElement('style');
      s.id = 'portfolio-fallback';
      s.innerHTML = fallbackStyles;
      document.head.appendChild(s);
    }
  },[]);
}

// ---------------------------
// Navbar component
// ---------------------------
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const navItemStyle = {
    padding: '8px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#94a3b8',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '24px 20px', 
      maxWidth: 1200, 
      margin: '0 auto',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(3, 7, 18, 0.8)',
      backdropFilter: 'blur(10px)'
    }}>
      <motion.div 
        style={{ display: 'flex', gap: 16, alignItems: 'center', cursor: 'pointer' }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          style={{ 
            width: 48, 
            height: 48, 
            borderRadius: 14, 
            background: 'linear-gradient(135deg,#06b6d4,#7c3aed)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontWeight: 800,
            fontSize: 20,
            color: 'white',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
          }}
          animate={{ 
            rotateY: [0, 360],
            boxShadow: [
              '0 4px 12px rgba(6, 182, 212, 0.3)',
              '0 4px 25px rgba(124, 58, 237, 0.6)',
              '0 4px 12px rgba(6, 182, 212, 0.3)'
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          AA
        </motion.div>
        <div style={{ display: 'none', sm: 'block' }}>
          <motion.div 
            style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', display: 'flex' }}
          >
            {"AYAN AHMAD".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                  repeatType: "reverse"
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          <div style={{ fontSize: 13, color: '#64748b' }}>Full Stack Catalyst</div>
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div className="desktop-nav" style={{ display: 'flex', gap: 4 }}>
          <Link to="/" style={navItemStyle} className="nav-link">Home</Link>
          <Link to="/projects" style={navItemStyle} className="nav-link">Projects</Link>
          <Link to="/news" style={navItemStyle} className="nav-link">News</Link>
          <Link to="/courses" style={navItemStyle} className="nav-link">Courses</Link>
          <Link to="/about" style={navItemStyle} className="nav-link">About</Link>
          <Link to="/contact" style={navItemStyle} className="nav-link">Contact</Link>
        </div>

        <Dropdown show={isOpen} onToggle={handleToggle}>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-icon-toggle"
            style={{ 
              border: '1px solid rgba(6, 182, 212, 0.2)', 
              background: 'rgba(6, 182, 212, 0.05)', 
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.1)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '20px' }}>
              <motion.div animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} style={{ height: '2px', background: '#06b6d4', width: '100%', borderRadius: '2px' }} />
              <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} style={{ height: '2px', background: '#06b6d4', width: '100%', borderRadius: '2px' }} />
              <motion.div animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} style={{ height: '2px', background: '#06b6d4', width: '100%', borderRadius: '2px' }} />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ 
            background: 'rgba(15, 23, 42, 0.95)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(6, 182, 212, 0.2)', 
            borderRadius: '16px',
            marginTop: '15px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            padding: '12px',
            minWidth: '200px'
          }}>
            {[
              { to: "/", label: "🏠 Home" },
              { to: "/projects", label: "🚀 Projects" },
              { to: "/news", label: "📰 News" },
              { to: "/courses", label: "🎓 Courses" },
              { to: "/about", label: "👨‍💻 About" },
              { to: "/contact", label: "📧 Contact" }
            ].map((item, idx) => (
              <Dropdown.Item 
                key={idx}
                as={Link} 
                to={item.to} 
                style={{ 
                  color: '#e2e8f0', 
                  fontSize: '15px',
                  fontWeight: 500,
                  padding: '12px 16px', 
                  borderRadius: '10px',
                  marginBottom: idx === 5 ? 0 : '4px',
                  transition: 'all 0.2s ease'
                }}
                className="dropdown-item-hover"
              >
                 {item.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <style>
        {`
          .nav-link:hover { color: #06b6d4 !important; background: rgba(6, 182, 212, 0.05); }
          .dropdown-item-hover:hover { 
            background: rgba(6, 182, 212, 0.1) !important; 
            color: #06b6d4 !important; 
            transform: translateX(5px);
          }
          .dropdown-toggle::after { display: none !important; }
          @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        `}
      </style>
    </nav>
  );
}

// ---------------------------
// Animated Elements for Background
// ---------------------------
function FloatingTechElements() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      {/* Silicon Chips */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`chip-${i}`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            left: `${10 + i * 20}%`,
            top: `${15 + i * 15}%`,
            fontSize: '40px',
            filter: 'grayscale(1) brightness(2)'
          }}
        >
          🔲
        </motion.div>
      ))}

      {/* Atoms */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`atom-${i}`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 0],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            right: `${5 + i * 20}%`,
            bottom: `${10 + i * 20}%`,
            fontSize: '30px',
            opacity: 0.15
          }}
        >
          ⚛️
        </motion.div>
      ))}

      {/* Bits (0/1) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bit-${i}`}
          initial={{ y: -100 }}
          animate={{
            y: [window.innerHeight + 100, -100],
            opacity: [0, 0.4, 0]
          }}
          transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "linear", delay: i * 2 }}
          style={{
            position: 'absolute',
            left: `${i * 8}%`,
            color: '#06b6d4',
            fontSize: '14px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}
        >
          {i % 2 === 0 ? "1" : "0"}
        </motion.div>
      ))}
      
      {/* Laptops/Computers */}
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ position: 'absolute', top: '10%', right: '10%', fontSize: '80px' }}
      >
        💻
      </motion.div>
    </div>
  );
}

// ---------------------------
// Professional Resume & News Components
// ---------------------------
function News() {
  const newsItems = [
    { title: "Smart India Hackathon 2025", date: "Jan 2025", type: "Present", desc: "Leading the DarShana AI team for national heritage discovery.", tag: "🔥 Hot" },
    { title: "FastPI Backend Certification", date: "Dec 2024", type: "Past", desc: "Completed intensive training on high-performance Python APIs.", tag: "✅ Done" },
    { title: "Upcoming: Aynova Hub 2.0", date: "June 2026", type: "Upcoming", desc: "Major update with integrated AI tutors and collaborative tools.", tag: "🚀 Soon" }
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 30 }}>📰 News & <span style={{ color: '#06b6d4' }}>Updates</span></h2>
      <div style={{ display: 'grid', gap: 20 }}>
        {newsItems.map((item, i) => (
          <motion.div key={i} whileHover={{ x: 10 }} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 12, color: '#06b6d4', fontWeight: 700 }}>{item.type.toUpperCase()} · {item.date}</span>
              <h3 style={{ margin: '8px 0', fontSize: 20 }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', margin: 0 }}>{item.desc}</p>
            </div>
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '8px 16px', borderRadius: 100, color: '#06b6d4', fontWeight: 700, fontSize: 14 }}>
              {item.tag}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Courses() {
  const courses = [
    { 
      title: "MERN Stack Masterclass", 
      level: "Intermediate", 
      duration: "4 Months", 
      tech: "React, Node, Express, MongoDB", 
      Price: "₹699", 
      discount: "₹200 OFF (Code: u1Mr5GLX)",
      link: "https://upskill.tutedude.com/course/lecture-mernstacktask" 
    },
    { 
      title: "Alpha Plus (Java + DSA)", 
      level: "Beginner to Pro", 
      duration: "4.5 Months", 
      tech: "Java, Data Structures, Algorithms", 
      Price: "Paid", 
      link: "https://www.apnacollege.in/" 
    },
    { 
      title: "Ultimate Web Dev Course", 
      level: "Beginner", 
      duration: "Self-Paced", 
      tech: "HTML, CSS, JS, React", 
      Price: "Free / Paid", 
      link: "https://www.codewithharry.com/" 
    },
    { 
      title: "Next.js 15 Deep Dive", 
      level: "Advanced", 
      duration: "TBA", 
      tech: "Next.js, Server Actions, Auth.js", 
      Price: "Upcoming", 
      tag: "Coming Soon" 
    }
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 30 }}>🎓 Recommended <span style={{ color: '#06b6d4' }}>Courses</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {courses.map((c, i) => (
          <div key={i} className="glass-card" style={{ borderTop: `4px solid ${c.Price === "Upcoming" ? "#7c3aed" : "#06b6d4"}`, position: 'relative', opacity: c.Price === "Upcoming" ? 0.8 : 1 }}>
            {c.discount && <div style={{ position: 'absolute', top: -15, right: 10, background: '#fbbf24', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: 12, fontWeight: 800, boxShadow: '0 4px 10px rgba(251,191,36,0.4)' }}>🔥 {c.discount}</div>}
            {c.tag && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(124, 58, 237, 0.2)', color: '#a78bfa', padding: '4px 10px', borderRadius: '6px', fontSize: 10, fontWeight: 700, border: '1px solid rgba(124, 58, 237, 0.3)' }}>{c.tag}</div>}
            <h3 style={{ fontSize: 22, marginBottom: 15 }}>{c.title}</h3>
            <div style={{ display: 'grid', gap: 10, color: '#94a3b8', fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Level:</span><span style={{ color: 'white' }}>{c.level}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Duration:</span><span style={{ color: 'white' }}>{c.duration}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Stack:</span><span style={{ color: 'white' }}>{c.tech}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Status:</span><span style={{ color: '#06b6d4', fontWeight: 700 }}>{c.Price}</span></div>
            </div>
            {c.Price !== "Upcoming" ? (
              <a 
                href={c.link || "#"} 
                target="_blank" 
                rel="noreferrer"
                className="btn-hover" 
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none', width: '100%', marginTop: 25, padding: 12, borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #06b6d4, #7c3aed)', color: 'white', fontWeight: 700 }}
              >
                Enroll Now
              </a>
            ) : (
              <div style={{ width: '100%', marginTop: 25, padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', textAlign: 'center', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)' }}>
                Notify Me
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// Collaboration & Freelance Section
// ---------------------------
function Collaboration() {
  const freelanceServices = [
    { 
      title: "Custom Web Apps", 
      platform: "Fiverr / Upwork", 
      icon: "💻", 
      desc: "End-to-end development with React & FastAPI.", 
      link: "https://www.fiverr.com/ayan_ahmad02" // Replace with your actual Fiverr link
    },
    { 
      title: "UI/UX Optimization", 
      platform: "Personal Freelancing", 
      icon: "🎨", 
      desc: "Modernizing old websites with sleek glassmorphism.", 
      link: "/#/contact"
    }
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '80px auto', padding: '0 24px' }}>
      <div className="glass-card" style={{ 
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(124, 58, 237, 0.05))',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        padding: '40px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 15 }}>🤝 Let's <span style={{ color: '#06b6d4' }}>Collaborate</span></h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 700, margin: '0 auto 40px' }}>
          I'm currently open for freelance projects and technical collaborations. Whether you need a startup MVP or a professional portfolio, I'm here to build it.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {freelanceServices.map((service, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="glass-card" style={{ textAlign: 'left', padding: '25px' }}>
              <div style={{ fontSize: '30px', marginBottom: '15px' }}>{service.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{service.title}</h3>
              <div style={{ color: '#06b6d4', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px' }}>{service.platform}</div>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>{service.desc}</p>
              <a href={service.link} target="_blank" rel="noreferrer" style={{ 
                display: 'inline-block', padding: '10px 20px', borderRadius: '8px', background: '#06b6d4', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '14px' 
              }}>Hire on Fiverr</a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Floating News Slider
// ---------------------------
function NewsTicker() {
  return (
    <div style={{ 
      width: '100%', 
      background: 'rgba(255, 255, 255, 0.03)', 
      backdropFilter: 'blur(5px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '10px 0',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '12px',
      marginBottom: '20px'
    }}>
      <motion.div
        animate={{ x: [window.innerWidth, -1800] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ 
          whiteSpace: 'nowrap', 
          fontWeight: 500,
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '80px'
        }}
      >
        <span style={{ color: '#fbbf24' }}>🟡 NEW: I’ve started offering website development services. Let me know if anyone needs a responsive website 😊</span>
        <span style={{ color: '#60a5fa' }}>🔵 PROJECT UPDATE: DarShana AI v1.2 is now live with enhanced AR features!</span>
        <span style={{ color: '#34d399' }}>🟢 FREELANCE: High-performance React web apps now available on Fiverr.</span>
        <span style={{ color: '#f472b6' }}>💖 SPECIAL: Custom UI/UX designs for early-stage startups!</span>
        <span style={{ color: '#fbbf24' }}>🟡 NEW: I’ve started offering website development services. Let me know if anyone needs a responsive website 😊</span>
      </motion.div>
    </div>
  );
}

// ---------------------------
// Home / Hero
// ---------------------------
function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <NewsTicker />
      <FloatingTechElements />
      <div style={{ 
        display: "flex", 
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "space-between",
        minHeight: "80vh",
        gap: 60,
        padding: "40px 0"
      }} className="hero-container">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: 1.2 }}
        >
          <div style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '100px', color: '#06b6d4', fontWeight: 600, fontSize: 14, marginBottom: 24, border: '1px solid rgba(6, 182, 212, 0.2)' }}>
            ✨ Open for collaborations
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px' }}>
            Transforming Ideas into <span style={{ background: 'linear-gradient(135deg, #06b6d4, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Experiences</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(16px, 1.2vw, 20px)", marginTop: 24, maxWidth: 600, lineHeight: 1.8 }}>
            I'm <span style={{ color: 'white', fontWeight: 600 }}>Ayan Ahmad</span>, a Full Stack Developer & B.Tech student building sleek, high-perfomance web applications with modern technologies.
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
            <Button
              onClick={() => navigate("/projects")}
              style={{
                background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                border: "none",
                padding: "16px 32px",
                borderRadius: 14,
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: '0 10px 20px -5px rgba(6, 182, 212, 0.4)'
              }}
              className="btn-hover"
            >
              Explore My Work
            </Button>
            
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { url: "https://github.com/Ayan-Ahmad02", img: "https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" },
                { url: "https://www.linkedin.com/in/ayan-ahmad3829", img: "https://static.vecteezy.com/system/resources/previews/018/910/721/non_2x/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector.jpg" },
                { url: "https://www.instagram.com/chaudhay__ayan/", img: "https://img.freepik.com/premium-vector/instagram-vector-logo-icon-social-media-logotype_901408-392.jpg?semt=ais_hybrid&w=740&q=80" }
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noreferrer" style={{ 
                  width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' 
                }} className="social-icon">
                  <img src={social.img} alt="Social" style={{ width: 24, height: 24, filter: i === 0 ? 'invert(1)' : 'none', borderRadius: '50%' }} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ flex: 0.8, display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          <div style={{ 
            width: 380, 
            height: 380, 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(124, 58, 237, 0.3))', 
            borderRadius: '16% 84% 37% 63% / 54% 36% 64% 46%',
            filter: 'blur(60px)',
            position: 'absolute',
            zIndex: -1,
            animation: 'morph 10s ease-in-out infinite'
          }} />
          
          <div className="glass-card" style={{ width: '100%', padding: '30px' }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: 20, fontWeight: 800 }}>⚡ Tech Stack</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { name: "React.js", icon: "⚛️" },
                { name: "JavaScript", icon: "⚡" },
                { name: "Python", icon: "🐍" },
                { name: "FastAPI", icon: "🚀" },
                { name: "Tailwind", icon: "🎨" },
                { name: "Firebase", icon: "🔥" }
              ].map((skill, idx) => (
                <div key={idx} style={{ 
                  padding: "12px", 
                  background: "rgba(255,255,255,0.03)", 
                  borderRadius: 12, 
                  fontSize: 14, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 10,
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {skill.icon} {skill.name}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <Pdf />
            </div>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          @keyframes morph {
            0% { border-radius: 16% 84% 37% 63% / 54% 36% 64% 46%; }
            50% { border-radius: 54% 46% 72% 28% / 31% 69% 31% 69%; }
            100% { border-radius: 16% 84% 37% 63% / 54% 36% 64% 46%; }
          }
          .social-icon:hover { transform: translateY(-5px); background: rgba(6, 182, 212, 0.1) !important; border-color: rgba(6, 182, 212, 0.3) !important; }
          @media (max-width: 968px) {
            .hero-container { flex-direction: column !important; text-align: center; min-height: auto !important; padding: 60px 0; }
            .hero-container h1 { letter-spacing: -1px; }
            .hero-container p { margin: 24px auto 0; }
            .hero-container div { justify-content: center; }
          }
        `}
      </style>

      <section style={{ padding: "80px 0" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Featured Projects</h2>
            <p style={{ color: '#94a3b8', marginTop: 10 }}>Handpicked projects that showcase my technical skills.</p>
          </div>
          <Link to="/projects" style={{ textDecoration: 'none', color: '#06b6d4', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            View All Projects →
          </Link>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {projects.slice(0, 4).map((p) => (
            <motion.div key={p.id} whileHover={{ y: -10 }}>
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </div>
      </section>

      <Collaboration />
    </div>
  );
}


// ---------------------------
// Projects list & detail
// ---------------------------
function Projects(){
  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'0 20px'}}>
      <h2>Projects Album</h2>
      <p style={{color:'#94a3b8'}}>Click a project to view details, GitHub or Live demo.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14,marginTop:12}}>
        {projects.map(p=> (
          <motion.div key={p.id} whileHover={{y:-6}} style={{background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10,cursor:'pointer'}}>
            <Link to={`/projects/${p.id}`} style={{textDecoration:'none',color:'inherit'}}>
              <ProjectCard p={p} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail(){
  const { pid } = useParams();
  const p = projects.find(x=>x.id===pid);
  if(!p) return <div style={{maxWidth:1100,margin:'20px auto',padding:'0 20px'}}>Project not found.</div>;
  return (
    <div style={{maxWidth:900,margin:'20px auto',padding:'0 20px'}}>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <img src={p.image} alt={p.title} style={{width:'100%',height:360,objectFit:'cover',borderRadius:10}} onError={(e)=>e.target.src='https://via.placeholder.com/900x360?text=Project+Image'} />
        <h2 style={{marginTop:12}}>{p.title}</h2>
        <div style={{color:'#94a3b8'}}>{p.tech.join(' • ')}</div>
        <p style={{marginTop:8}}>{p.desc}</p>
        <div style={{display:'flex',gap:10,marginTop:10}}>
          <a href={p.github} target="_blank" rel="noreferrer" style={{padding:8,background:'#0b1222',borderRadius:8,textDecoration:'none'}}>View on GitHub</a>
          <a href={p.live} target="_blank" rel="noreferrer" style={{padding:8,background:'#0b1222',borderRadius:8,textDecoration:'none'}}>Live Demo</a>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------
// Compact card for Featured
// ---------------------------
function ProjectCardCompact({p}){
  return (
    <div>
      <img src={p.image} alt={p.title} style={{width:'100%',height:140,objectFit:'cover',borderRadius:8}} onError={(e)=>e.target.src='https://via.placeholder.com/600x360?text=Project+Image'} />
      <h3 style={{margin:'8px 0 6px 0'}}>{p.title}</h3>
      <div style={{fontSize:13,color:'#94a3b8'}}>{p.tech.join(', ')}</div>
    </div>
  );
}

function ProjectCard({p}){
  return (
    <motion.div 
      className="glass-card" 
      whileHover={{ y: -10 }}
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 0, 
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(15, 23, 42, 0.3)',
        backdropFilter: 'blur(20px)',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        <motion.img 
          src={p.image} 
          alt={p.title} 
          whileHover={{ scale: 1.15, rotate: 1 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e)=>e.target.src='https://via.placeholder.com/600x360?text=Project+Image'} 
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(to bottom, transparent 60%, rgba(3, 7, 18, 0.9))',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
           {p.tech.slice(0, 3).map((t, i) => (
             <span key={i} style={{ 
               padding: '4px 10px', 
               background: 'rgba(6, 182, 212, 0.15)', 
               backdropFilter: 'blur(8px)', 
               borderRadius: '20px', 
               fontSize: 10, 
               fontWeight: 800, 
               color: '#06b6d4', 
               border: '1px solid rgba(6, 182, 212, 0.3)',
               textTransform: 'uppercase'
             }}>{t}</span>
           ))}
        </div>
      </div>
      
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{p.title}</h3>
          <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
            {p.id === 'darshana-sih-2025' && <span title="SIH 2025 Winner" style={{ fontSize: 20 }}>🏆</span>}
          </motion.div>
        </div>
        
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, marginBottom: 25, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {p.desc}
        </p>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <motion.a 
            href={p.github} 
            target="_blank" 
            rel="noreferrer" 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              flex: 1, 
              textAlign: 'center', 
              padding: '12px', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              color: 'white', 
              textDecoration: 'none', 
              fontSize: 14, 
              fontWeight: 600, 
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>Code</span>
          </motion.a>
          <motion.a 
            href={p.live} 
            target="_blank" 
            rel="noreferrer" 
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              flex: 1, 
              textAlign: 'center', 
              padding: '12px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #06b6d4, #7c3aed)', 
              color: 'white', 
              textDecoration: 'none', 
              fontSize: 14, 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------
// About page
// ---------------------------
function About() {
  const stats = [
    { label: "Projects", value: "15+" },
    { label: "Git Commits", value: "500+" },
    { label: "Experience", value: "Full-Stack" }
  ];

  const skillGroups = [
    { name: "Frontend", skills: ["React", "HTML", "CSS", "JS", "Tailwind"] },
    { name: "Backend", skills: ["Node.js", "FastAPI", "Python"] },
    { name: "Languages", skills: ["JavaScript", "Python", "Java", "C++"] }
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
          👨‍💻 About <span style={{ color: '#06b6d4' }}>Me</span>
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
          Passionate Full-Stack Web Developer based in Lucknow, India, dedicated to building modern, responsive, and user-friendly web applications.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="glass-card" style={{ padding: 30, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #06b6d4, #7c3aed)' }} />
            <img
              src="src/images/ayan.jpeg"
              alt="Ayan Ahmad"
              style={{
                width: 200,
                height: 200,
                borderRadius: '24px',
                marginBottom: 24,
                objectFit: 'cover',
                border: '4px solid rgba(6, 182, 212, 0.2)',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
              }}
              onError={(e) => { e.target.src = "https://media.licdn.com/dms/image/v2/D4D03AQHOEhkAYRFURA/profile-displayphoto-scale_200_200/B4DZnUwqxwGgAY-/0/1760211153133?e=2147483647&v=beta&t=MfqGf3JSoF4XE6-RXezt6VTzTQMhRpLiFhBp2l9H-To"; }}
            />
            <h3 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px 0' }}>Ayan Ahmad</h3>
            <p style={{ color: '#06b6d4', fontWeight: 600, marginBottom: 25, fontSize: 16 }}>B.Tech CSE @ DSMNRU</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: 24, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 15, display: 'flex', alignItems: 'center', gap: 10 }}>🎯 Goal</h3>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              To become a skilled Software Engineer who builds impactful, scalable, and intelligent web solutions that solve real-world problems.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'grid', gap: 24 }}>
          {/* Licenses & Certifications Section */}
          <div className="glass-card">
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>📜 Licenses & Certifications</h3>
            <div style={{ display: 'grid', gap: 20 }}>
              {/* Deloitte Certification */}
              <div style={{ display: 'flex', gap: 15, alignItems: 'flex-start', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '24px', background: 'rgba(6, 182, 212, 0.1)', padding: '10px', borderRadius: '10px' }}>🏢</div>
                <div>
                  <h4 style={{ fontSize: '16px', margin: '0 0 4px 0', color: 'white' }}>Deloitte Australia Technology Job Simulation</h4>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>Forage • Issued Oct 2025 • ID: xXhptrg5gG6G6oapP</p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                    Hands-on experience in Python, software development, and data analysis. Created a client dashboard proposal.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {["Python", "Software Development", "Data Analysis"].map(s => (
                      <span key={s} style={{ fontSize: '10px', padding: '2px 8px', background: 'rgba(6, 182, 212, 0.05)', color: '#06b6d4', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.1)' }}>{s}</span>
                    ))}
                  </div>
                  <a href="src/images/certificates/Deolite.png" target="_blank" className="btn-hover" style={{ fontSize: '12px', color: '#06b6d4', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span>View Certificate</span> ↗
                  </a>
                </div>
              </div>

              {/* Internship Studio */}
              <div style={{ display: 'flex', gap: 15, alignItems: 'flex-start', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '24px', background: 'rgba(124, 58, 237, 0.1)', padding: '10px', borderRadius: '10px' }}>🎓</div>
                <div>
                  <h4 style={{ fontSize: '16px', margin: '0 0 4px 0', color: 'white' }}>Internship Studio Program</h4>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 10px 0' }}>Internship Studio • Issued Feb 2025 • ID: CIT-P-1383105</p>
                  <a href="src/images/certificates/Internshipstudio.png" target="_blank" className="btn-hover" style={{ fontSize: '12px', color: '#06b6d4', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span>View Certificate</span> ↗
                  </a>
                </div>
              </div>

              {/* IIVET India */}
              <div style={{ display: 'flex', gap: 15, alignItems: 'flex-start', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '24px', background: 'rgba(6, 182, 212, 0.1)', padding: '10px', borderRadius: '10px' }}>🏫</div>
                <div>
                  <h4 style={{ fontSize: '16px', margin: '0 0 4px 0', color: 'white' }}>IIVET Educational Group Certification</h4>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>IIVET India • Issued Jun 2023</p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 10px 0' }}>Skills: Microsoft PowerPoint, Excel, and Office Suite.</p>
                  <a href="src/images/certificates/IIVET.png" target="_blank" className="btn-hover" style={{ fontSize: '12px', color: '#06b6d4', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span>View Certificate</span> ↗
                  </a>
                </div>
              </div>

              {/* ADCA Diploma */}
              <div style={{ display: 'flex', gap: 15, alignItems: 'flex-start', padding: '15px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(124, 58, 237, 0.05))', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.1)' }}>
                <div style={{ fontSize: '24px', background: 'rgba(6, 182, 212, 0.2)', padding: '10px', borderRadius: '10px' }}>🏆</div>
                <div>
                  <h4 style={{ fontSize: '16px', margin: '0 0 4px 0', color: 'white' }}>ADCA (Advance Diploma in Computer Application)</h4>
                  <p style={{ fontSize: '13px', color: '#06b6d4', margin: '0 0 10px 0', fontWeight: 600 }}>Completed In 2025</p>
                  <a href="src/images/certificates/ADCA_certificate.pdf" target="_blank" className="btn-hover" style={{ fontSize: '12px', color: '#06b6d4', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span>View Certificate</span> ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>🚀 What I Do</h3>
            <ul style={{ color: '#94a3b8', margin: 0, paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>🌐 Build responsive and interactive web applications</li>
              <li>⚙️ Develop backend APIs using FastAPI / Node.js</li>
              <li>🎨 Create clean UI using HTML, CSS, Tailwind & React</li>
              <li>🧠 Solve real-world problems using programming</li>
              <li>🔗 Work with databases and APIs</li>
            </ul>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🛠 Tech Stack</h3>
            <div style={{ display: 'grid', gap: 15 }}>
              {skillGroups.map((group, i) => (
                <div key={i}>
                  <div style={{ fontSize: 12, color: '#06b6d4', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>{group.name}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {group.skills.map(skill => (
                      <span key={skill} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: 13, border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(124, 58, 237, 0.1))' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>📩 Let’s Connect</h3>
            <p style={{ color: '#94a3b8', marginBottom: 20 }}>If you want to collaborate or build something amazing together, feel free to reach out.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a href="mailto:ayanchaudhary414@gmail.com" style={{ flex: 1, minWidth: '120px', textAlign: 'center', background: '#06b6d4', color: 'white', padding: '12px', borderRadius: 10, fontWeight: 600, textDecoration: 'none' }} className="btn-hover">Hire Me</a>
              <Link to="/contact" style={{ flex: 1, minWidth: '120px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }} className="btn-hover">Let’s Talk</Link>
              <Button style={{ flex: 1, minWidth: '120px', background: 'transparent', border: '1px solid #06b6d4', color: '#06b6d4', padding: '12px', borderRadius: 10, fontWeight: 600 }} className="btn-hover">Build Together</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


// ---------------------------
// Contact page with EmailJS vite
// ---------------------------
function Contact() {
  const formRef = React.useRef();
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_i95t6qe",
        "template_zyrdrjd",
        formRef.current,
        "njEntSWDzkZrCko0F"
      )
      .then(
        (result) => {
          setSending(false);
          setStatus("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          setSending(false);
          console.error("EmailJS Error:", error);
          setStatus("❌ Failed to send. Please try again.");
        }
      );
  };

  const contactInfo = [
    { icon: "📧", label: "Email", info: "ayanchaudhary414@gmail.com", link: "mailto:ayanchaudhary414@gmail.com" },
    { icon: "💼", label: "LinkedIn", info: "Ayan Ahmad", link: "https://www.linkedin.com/in/ayan-ahmad3829" },
    { icon: "💻", label: "GitHub", info: "Ayan-Ahmad02", link: "https://github.com/Ayan-Ahmad02" },
    { icon: "📍", label: "Location", info: "Lucknow, India", link: "#" }
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <span style={{ color: '#06b6d4', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Get In Touch</span>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginTop: 10 }}>Let's Work <span style={{ color: '#06b6d4' }}>Together</span></h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 600, margin: '15px auto 0' }}>
          Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
        {/* Contact Info Cards */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'grid', gap: 20 }}>
          {contactInfo.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', transition: 'transform 0.3s ease' }}>
                <div style={{ width: 50, height: 50, background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#06b6d4', fontWeight: 700, textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: '16px', color: 'white', fontWeight: 500 }}>{item.info}</div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="glass-card" style={{ padding: '40px' }}>
            <form ref={formRef} onSubmit={sendEmail} style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row">
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>Name</label>
                  <input name="name" placeholder="John Doe" required style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>Email</label>
                  <input name="email" type="email" placeholder="john@example.com" required style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>Message</label>
                <textarea name="message" placeholder="Tell me about your project..." required rows={5} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none', resize: 'none' }} />
              </div>
              <button 
                type="submit" 
                disabled={sending} 
                className="btn-hover"
                style={{ 
                  marginTop: '10px',
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #06b6d4, #7c3aed)', 
                  border: 'none', 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {sending ? "Sending..." : "Send Message 🚀"}
              </button>
              {status && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '10px', 
                  borderRadius: '8px', 
                  background: status.includes('✅') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: status.includes('✅') ? '#4ade80' : '#f87171',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DocumentUpload />
      </motion.div>

      <style>
        {`
          @media (max-width: 640px) {
            .form-row { grid-template-columns: 1fr !important; }
          }
          input:focus, textarea:focus {
            border-color: #06b6d4 !important;
            background: rgba(255,255,255,0.05) !important;
            box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
          }
        `}
      </style>
    </div>
  );
}

// ---------------------------
// Document Upload section (for Contact or Admin use)
// ---------------------------
function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileBase64, setFileBase64] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) { // EmailJS limit check (~500KB is safe for base64)
        setUploadStatus("⚠️ File too large for email (Max 500KB). Use the link instead.");
      }
      setSelectedFile(file);
      setUploadStatus(`Selected: ${file.name}`);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileBase64(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus("❌ Please select a file first.");
      return;
    }
    setIsUploading(true);
    setUploadStatus("📧 Sending via Email...");

    // Sending file content as string via EmailJS
    const templateParams = {
      from_name: "Portfolio Visitor",
      file_name: selectedFile.name,
      file_content: fileBase64, // Base64 string
      message: "A new document has been uploaded via the portfolio contact page."
    };

    emailjs
      .send(
        "service_i95t6qe",
        "template_zyrdrjd",
        templateParams,
        "njEntSWDzkZrCko0F"
      )
      .then(
        (result) => {
          setIsUploading(false);
          setUploadStatus("✅ Document sent to your email!");
          setSelectedFile(null);
          setFileBase64("");
        },
        (error) => {
          setIsUploading(false);
          console.error("EmailJS Error:", error);
          setUploadStatus("❌ Failed to send email. File might be too large.");
        }
      );
  };

  return (
    <div className="glass-card" style={{ marginTop: 40, padding: 30 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
        📁 Send Document (Optional)
      </h3>
      <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>
        Want to send a resume or brief directly? Upload it and click "Send via Email".
      </p>
      
      <div style={{ 
        border: '2px dashed rgba(6, 182, 212, 0.3)', 
        borderRadius: 16, 
        padding: 40, 
        textAlign: 'center',
        background: 'rgba(6, 182, 212, 0.02)',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: 0, 
            cursor: 'pointer',
            zIndex: 2
          }} 
        />
        <div style={{ fontSize: 40, marginBottom: 10 }}>☁️</div>
        <div style={{ fontWeight: 600, color: '#e2e8f0' }}>
          {selectedFile ? selectedFile.name : "Click or Drag to Upload"}
        </div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
          Supported: PDF, DOCX, JPG (Max 5MB)
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <div style={{ fontSize: 13, color: uploadStatus.includes('✅') ? '#4ade80' : '#94a3b8' }}>
          {uploadStatus}
        </div>
        <button 
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="btn-hover"
          style={{ 
            padding: '10px 24px', 
            borderRadius: '10px', 
            background: selectedFile ? '#06b6d4' : 'rgba(255,255,255,0.05)', 
            border: 'none', 
            color: 'white', 
            fontWeight: 600,
            cursor: selectedFile ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s'
          }}
        >
          {isUploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------
// App root
// ---------------------------
export default function App() {
  useInjectFallback();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <WelcomeAlert />
      <Router>
        <div style={{ minHeight: "100vh" }}>
          <Navbar />
          <main style={{ paddingBottom: 40 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:pid" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </main>
          <footer style={{ textAlign: "center", padding: "18px", color: "#94a3b8" }}>
            Built with ❤️ by Ayan_Ahmad · React Portfolio Demo
          </footer>
        </div>
      </Router>
    </>
  );
}
