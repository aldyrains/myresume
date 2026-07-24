/*-----------------------------------------------------------------------------------
/*
/* Init JS — profile content, portfolio carousel, PDF viewer, theme & i18n
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

var ASSET_BASE = (function() {
   var path = window.location.pathname || '';
   if (path.indexOf('/myresume') === 0) {
      return '/myresume/';
   }
   return './';
})();

function assetUrl(file) {
   return ASSET_BASE + String(file || '').replace(/^\.\//, '').replace(/^\//, '');
}

function waitForLandingPage(callback) {
   var attempts = 0;
   var timer = setInterval(function() {
      attempts += 1;

      if ($('#home .banner-text').length && $('#resume').length && $('#contact').length) {
         clearInterval(timer);
         callback();
      }

      if (attempts >= 80) {
         clearInterval(timer);
      }
   }, 150);
}

function formatCount(value) {
   return value < 10 ? '0' + value : String(value);
}

function escapeHtml(value) {
   return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
}

function scrollToHashTarget(hash, animate) {
   if (!hash) {
      return;
   }

   $('body').removeClass('nav-hidden');

   var $target = $(hash);
   var navHeight = $('#nav-wrap').outerHeight() || 0;
   var topOffset = Math.max(navHeight + 18, 72);

   if (!$target.length) {
      return;
   }

   var top = Math.max($target.offset().top - topOffset, 0);

   if (animate) {
      $('html, body').stop().animate({ 'scrollTop': top }, 500, 'swing');
      return;
   }

   window.scrollTo(0, top);
}

function hoistNavbar() {
   var nav = $('#nav-wrap');

   if (!nav.length) {
      return;
   }

   if (!nav.parent().is('body')) {
      nav.prependTo('body');
   }
}

function setupNavbarBehavior() {
   var nav = $('#nav-wrap');
   var body = $('body');
   var hideTimer = null;
   var isDesktop = function() {
      return $(window).outerWidth() > 768;
   };

   function showNav() {
      body.removeClass('nav-hidden');
   }

   function hideNav() {
      if (!isDesktop()) {
         return;
      }
      if (nav.is(':hover') || nav.find(':focus').length) {
         return;
      }
      body.addClass('nav-hidden');
   }

   function scheduleHide() {
      clearTimeout(hideTimer);
      if (!isDesktop()) {
         showNav();
         return;
      }
      hideTimer = setTimeout(hideNav, 10000);
   }

   nav.off('.navIdle');
   $(window).off('.navIdle');
   $(document).off('.navIdle');

   nav
      .on('mouseenter.navIdle focusin.navIdle', function() {
         showNav();
         scheduleHide();
      })
      .on('mouseleave.navIdle focusout.navIdle', function() {
         scheduleHide();
      })
      .on('mousemove.navIdle click.navIdle', function() {
         showNav();
         scheduleHide();
      });

   $(document).on('mousemove.navIdle', function(event) {
      if (!isDesktop()) {
         showNav();
         return;
      }

      if (event.clientY <= 110) {
         showNav();
         scheduleHide();
      }
   });

   $(window).on('resize.navIdle', function() {
      showNav();
      scheduleHide();
   });

   showNav();
   scheduleHide();
}

var PROFILE_DATA = {
   name: 'Aldi Riansyah',
   headline: 'Mid-level Hybrid Mobile Engineer',
   rotatingHeadlines: [
      'Mid-level Hybrid Mobile Engineer',
      'Flutter Developer',
      'AI-Assisted Mobile Engineer',
      'Full Stack Flutter Developer'
   ],
   summary: '4+ years building scalable, high-performance Flutter & React Native applications for fintech, corporate, and consumer markets—with clean architecture, strong UX, and AI-assisted delivery.',
   location: 'Bandung, West Java, Indonesia',
   phone: '+62 8132 3322 639',
   whatsapp: 'https://wa.me/6281323322639',
   email: 'aldyrains30@gmail.com',
   linkedin: 'https://www.linkedin.com/in/aldi-riansyah/',
   github: 'https://aldyrains.github.io/myresume',
   certificates: 'https://bit.ly/AldiCertificate',
   resumeFile: 'aldi-riansyah-resume.pdf',
   portfolioFile: 'aldi-riansyah-portfolio-2026.pdf',
   yearsExperience: '4+',
   about: 'I build hybrid mobile and web products that stay stable in production, feel fast to use, and remain maintainable for teams. Experience spans fintech collection, trading platforms, logistics, cooperative marketplaces, HR platforms, and public-sector apps. Strengths include translating product needs into clean architecture, reliable integrations, and interfaces that feel simple under real operational pressure.',
   education: {
      school: 'SMK Negeri 11 Bandung',
      degree: 'High School Diploma in Information Technology',
      year: '2014.08 - 2017.05',
      detail: 'Final project: Java-based outpatient medical records system. Awarded 2nd place in vocational school karate-do competition in Bandung.'
   },
   organizations: [
      {
         name: 'Troybars (Troy Owner Bandung Raya)',
         role: 'Pengurus',
         years: '2020.05 - Present',
         detail: 'Folding-bike community leadership across Bandung; weekly rides for 20+ members and charity events for orphanages.'
      },
      {
         name: 'Google Developer Program / GDG Cloud Bandung',
         role: 'Member',
         years: '2022.11 - Present',
         detail: 'Active in Flutter & Firebase workshops; member of Gemini Enterprise Agents Ready (GEAR).'
      }
   ],
   skills: [
      { name: 'Flutter / Dart', level: '95%' },
      { name: 'React / React Native', level: '78%' },
      { name: 'Laravel / Filament', level: '72%' },
      { name: 'Node.js / REST APIs', level: '70%' },
      { name: 'Firebase / Cloud', level: '80%' },
      { name: 'State Mgmt (BLoC, GetX, Provider)', level: '90%' },
      { name: 'AI-Assisted Dev (Cursor, Claude, ChatGPT)', level: '88%' },
      { name: 'Git / CI/CD', level: '85%' }
   ],
   skillTags: [
      'Flutter', 'React', 'Laravel', 'Node.js', 'GraphQL', 'Firebase',
      'Clean Architecture', 'BLoC', 'GetX', 'Provider',
      'Cursor', 'Claude', 'ChatGPT', 'Git', 'CI/CD', 'Cloud'
   ],
   work: [
      {
         company: 'PT Gajah Nusantara Raya',
         role: 'Mobile Application Developer',
         years: '2025.09 - Present',
         location: 'Bogor, Indonesia',
         bullets: [
            'Built and shipped Strade Mobile (AI-powered trading) to Google Play and App Store with BLoC, Socket.IO, TradingView, OCR, and payment gateway.',
            'Developed Satu Agen wholesale marketplace with offline-first SQLite sync, QR/barcode, thermal printing, and logistics integration.',
            'Created Satu Ekspedisi User & Driver apps: real-time tracking, OSRM routing, chat, digital wallet, and PDF receipts.',
            'Collaborated across UI/UX, backend, operations, and stakeholders through the full delivery lifecycle.'
         ]
      },
      {
         company: 'PT Mitra Konsultansi Indonesia',
         role: 'Freelancer Flutter Developer',
         years: '2025.03 - 2025.08',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Engineered GPS tracking for BTN Smart Collection with real-time location updates.',
            'Optimized API integration and synchronization, cutting app load time by ~20%.',
            'Revamped UI for clearer navigation and migrated native Kotlin flows to Flutter with Clean Architecture + Provider.'
         ]
      },
      {
         company: 'Digisekre Pormiki Jabar',
         role: 'Freelance Web Developer',
         years: '2024.09 - 2025.02',
         location: 'Bandung, Indonesia',
         bullets: [
            'Built role-based dashboards with Laravel Filament 3 & Spatie Permission for 2,000+ members.',
            'Implemented exportable PDF/CSV financial reports, reducing manual reporting time by ~80%.',
            'Delivered a responsive admin experience with Tailwind CSS.'
         ]
      },
      {
         company: 'Risada Damai Sejahtera',
         role: 'Mobile Application Developer',
         years: '2023.04 - 2024.05',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Led Flutter development for myEV E-Trans driver and merchant apps.',
            'Integrated Google Maps APIs for routing, positioning, and map-driven workflows.',
            'Partnered with product and UI/UX via Jira to preserve 95%+ build stability using GetX.'
         ]
      },
      {
         company: 'PT Mega Giga Solusindo / ICON+',
         role: 'Mobile Application Developer',
         years: '2022.01 - 2023.03',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Developed Sinopsis and PESA apps for PLN employees; supported 10,000+ monthly active users.',
            'Implemented feature flagging for phased rollouts and resolved critical bugs within 24 hours.',
            'Applied Clean Architecture and Provider for maintainable enterprise Flutter delivery.'
         ]
      },
      {
         company: 'PT Bussan Auto Finance',
         role: 'Mobile Application Developer',
         years: '2021.10 - 2021.12',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Contributed financing features on the Pradana / BAF mobile stack (React Native / Android).',
            'Worked across departments to keep system development and maintenance aligned with project requirements.'
         ]
      },
      {
         company: 'PT Bank Jago Tbk',
         role: 'Software Engineer',
         years: '2020.11 - 2021.09',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Contributed to Nebula squad BFS solution with fault-tolerant Flutter modules for corporate finance.',
            'Coordinated backlog grooming and sprint planning, improving team velocity by ~15%.',
            'Adopted Clean Architecture, BLoC, and unit testing—reducing bug reports by ~80%.'
         ]
      },
      {
         company: 'DKatalis',
         role: 'Software Engineer',
         years: '2019.12 - 2020.10',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Built PX People Experience for HR and employee management, serving 500+ internal users.',
            'Adopted Clean Architecture, BLoC, and unit testing for Android and iOS Flutter delivery.'
         ]
      },
      {
         company: 'PT Enigma Cipta Humanika (Enigma Camp)',
         role: 'Software Engineer',
         years: '2019.12 - 2021.12',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Completed immersive project-based bootcamp covering technical and soft skills.',
            'Secured multi-year placements at DKatalis, Bank Jago, and Bussan Auto Finance on production products.'
         ]
      }
   ],
   journey: [
      {
         period: '2025 - 2026',
         title: 'Strade & Satu Ecosystem',
         company: 'PT Gajah Nusantara Raya',
         summary: 'End-to-end Flutter delivery for trading, cooperative marketplace, and logistics apps—from architecture to Play Store / App Store release.',
         highlights: [
            'Shipped Strade with real-time markets, OCR KYC, and payment flows.',
            'Built offline-first Satu Agen with auto-sync for low-connectivity regions.',
            'Delivered Satu Ekspedisi user/driver apps with maps, chat, and wallets.'
         ]
      },
      {
         period: '2025',
         title: 'SmartColl BTN',
         company: 'PT Mitra Konsultansi Indonesia',
         summary: 'Digital collection platform for Bank BTN with real-time tracking and cleaner field UX.',
         highlights: [
            'Migrated key flows from native Kotlin to Flutter.',
            'Reduced perceived load time via API synchronization improvements.',
            'Applied Clean Architecture with Provider.'
         ]
      },
      {
         period: '2024 - 2025',
         title: 'Digisekre Permiki Jabar',
         company: 'Freelance Web Delivery',
         summary: 'Role-based membership and finance ops for a health information professional association.',
         highlights: [
            'Automated member management for 2,000+ users.',
            'Cut manual reporting time by ~80% with PDF/CSV exports.',
            'Built Filament + Tailwind admin experience.'
         ]
      },
      {
         period: '2019 - 2024',
         title: 'Fintech & Enterprise Mobile',
         company: 'Bank Jago, DKatalis, ICON+, BAF, Risada',
         summary: 'Product-team delivery across fintech, HR platforms, EV logistics, and PLN enterprise apps.',
         highlights: [
            'Shipped Flutter modules used by thousands of monthly active users.',
            'Balanced maintainability, business requirements, and UX.',
            'Grew from bootcamp placement into cross-company mobile engineering.'
         ]
      }
   ],
   portfolio: [
      {
         id: 'strade',
         title: 'Strade Mobile',
         company: 'PT Gajah Nusantara Raya',
         year: '2025–2026',
         role: 'Mobile Application Developer',
         category: 'Flutter',
         type: 'AI Trading Platform',
         summary: 'AI-powered trading platform with live markets, community, OCR KYC, and store releases on Android & iOS.',
         overview: 'Strade helps users access automated trading bots and financial market insights with TradingView charts, Socket.IO prices, and secure payments.',
         problem: 'Need a production-ready cross-platform trading app with real-time data, identity verification, and secure payments.',
         solution: 'Built from scratch with Clean Architecture + BLoC, Socket.IO, WebView TradingView, ML Kit OCR, payment gateway, and hardened release builds.',
         features: [
            'Real-time market updates via Socket.IO',
            'TradingView chart integration',
            'OCR KTP verification with Google ML Kit',
            'Payment gateway & Play/App Store publishing'
         ],
         stack: ['Flutter', 'Dart', 'BLoC', 'Clean Architecture', 'Socket.IO', 'TradingView', 'Firebase', 'OCR'],
         pdfPage: 3,
         thumb: 'images/portfolio/slides/slide-03.jpg'
      },
      {
         id: 'satu-agen',
         title: 'Satu Agen',
         company: 'PT Gajah Nusantara Raya',
         year: '2025–2026',
         role: 'Mobile & Desktop Application Developer',
         category: 'Flutter',
         type: 'Wholesale Marketplace',
         summary: 'Offline-first cooperative marketplace for orders, membership, payments, and logistics.',
         overview: 'Satu Agen enables cooperative agents across Indonesia to manage product orders, membership, payments, and logistics online and offline.',
         problem: 'Agents need uninterrupted operations in areas with limited internet connectivity.',
         solution: 'Designed offline-first SQLite architecture with automatic sync, payment gateway, QR/barcode, thermal printing, and Satu Ekspedisi integration.',
         features: [
            'Offline-first with auto synchronization',
            'Payment gateway & Socket.IO confirmations',
            'QR/barcode membership authentication',
            'Cross-platform mobile and desktop'
         ],
         stack: ['Flutter', 'BLoC', 'SQLite', 'Socket.IO', 'Payment Gateway', 'QR'],
         pdfPage: 4,
         thumb: 'images/portfolio/slides/slide-04.jpg'
      },
      {
         id: 'satu-ekspedisi-user',
         title: 'Satu Ekspedisi User',
         company: 'PT Gajah Nusantara Raya',
         year: '2025–2026',
         role: 'Mobile Application Developer',
         category: 'Mobile Apps',
         type: 'Logistics App',
         summary: 'Customer logistics app for booking, live tracking, driver chat, and digital wallet payments.',
         overview: 'Official logistics platform integrated with the Satu Agen marketplace ecosystem.',
         problem: 'Users needed a seamless booking-to-delivery experience with accurate maps and payments.',
         solution: 'Built booking, maps/OSRM routing, Socket.IO tracking, chat, wallet, and PDF invoice generation from scratch.',
         features: [
            'Delivery booking & order management',
            'Interactive maps and OSRM routing',
            'Real-time chat and shipment tracking',
            'Digital wallet and PDF receipts'
         ],
         stack: ['Flutter', 'GetX', 'Google Maps', 'OSRM', 'Socket.IO', 'Wallet'],
         pdfPage: 5,
         thumb: 'images/portfolio/slides/slide-05.jpg'
      },
      {
         id: 'satu-ekspedisi-driver',
         title: 'Satu Ekspedisi Driver',
         company: 'PT Gajah Nusantara Raya',
         year: '2025–2026',
         role: 'Mobile Application Developer',
         category: 'AI Projects',
         type: 'Driver Companion App',
         summary: 'Driver app for assignments, navigation, live location, chat, earnings wallet—accelerated with AI-assisted development.',
         overview: 'Independently developed driver companion for the Satu Ekspedisi logistics ecosystem on a tight timeline.',
         problem: 'Drivers needed reliable navigation, realtime updates, and payout tooling in one app.',
         solution: 'Shipped modular Flutter app with Socket.IO GPS, OSRM + Google Maps navigation, chat, wallet, and PDF receipts using Cursor/Claude responsibly.',
         features: [
            'Order workflow & Google Maps navigation',
            'Realtime GPS via Socket.IO',
            'In-app customer chat',
            'Earnings wallet and digital receipts'
         ],
         stack: ['Flutter', 'GetX', 'Socket.IO', 'OSRM', 'AI-assisted Dev'],
         pdfPage: 6,
         thumb: 'images/portfolio/slides/slide-06.jpg'
      },
      {
         id: 'smartcoll',
         title: 'SmartColl BTN',
         company: 'Bank BTN / MKINDO',
         year: '2025',
         role: 'Flutter Developer',
         category: 'Flutter',
         type: 'Fintech Collection',
         summary: 'Digital collection platform helping field officers manage visits and location-aware collection work.',
         overview: 'BTN Smart Collection supports field officers with visits, monitoring, and collection activities.',
         problem: 'Legacy native flows needed modernization with realtime GPS and better UX.',
         solution: 'Migrated Kotlin flows to Flutter, added GPS tracking, API optimization (~20% faster loads), and Clean Architecture.',
         features: [
            'Realtime GPS tracking',
            'API sync performance gains',
            'UI redesign for field usability',
            'Clean Architecture + Provider'
         ],
         stack: ['Flutter', 'Provider', 'Clean Architecture', 'GPS', 'REST API'],
         pdfPage: 7,
         thumb: 'images/portfolio/slides/slide-07.jpg'
      },
      {
         id: 'myev',
         title: 'myEV E-Trans',
         company: 'eTrans / Risada',
         year: '2023–2024',
         role: 'Flutter Developer',
         category: 'Mobile Apps',
         type: 'EV Platform',
         summary: 'EV platform apps for charging, battery swap, rentals, and eco-friendly delivery.',
         overview: 'myEV provides charging stations, battery swapping, EV rentals, and delivery services.',
         problem: 'Map-heavy operational flows needed stable Flutter delivery for driver and merchant apps.',
         solution: 'Integrated Google Maps, REST APIs, and performance improvements with GetX modules.',
         features: [
            'EV service feature modules',
            'Location and mapping services',
            'API performance improvements',
            'Production stability focus'
         ],
         stack: ['Flutter', 'Google Maps', 'REST API', 'Firebase'],
         pdfPage: 8,
         thumb: 'images/portfolio/slides/slide-08.jpg'
      },
      {
         id: 'pesa',
         title: 'PESA',
         company: 'ICON+ / PLN',
         year: '2022–2023',
         role: 'Flutter Developer',
         category: 'Mobile Apps',
         type: 'Enterprise Super App',
         summary: 'Internal PLN employee super app for attendance, activity reporting, and hybrid work support.',
         overview: 'PESA centralizes employee services for PLN staff at enterprise scale.',
         problem: 'Enterprise users needed reliable sync and polished workflows across modules.',
         solution: 'Built service modules with Clean Architecture, API integration, and UX improvements for large-scale usage.',
         features: [
            'Attendance and activity reporting',
            'Facility request flows',
            'Data sync optimization',
            'Enterprise UX polish'
         ],
         stack: ['Flutter', 'Dart', 'REST API', 'Firebase', 'Clean Architecture'],
         pdfPage: 9,
         thumb: 'images/portfolio/slides/slide-09.jpg'
      },
      {
         id: 'pln-mobile',
         title: 'PLN Mobile',
         company: 'ICON+ / PLN',
         year: '2022–2023',
         role: 'Flutter Developer',
         category: 'Mobile Apps',
         type: 'Consumer Utility App',
         summary: 'Official electricity service app for bills, tokens, outage reporting, and usage monitoring.',
         overview: 'Indonesia’s official PLN customer service application.',
         problem: 'Production features needed reliable API integration and crash reduction.',
         solution: 'Maintained Flutter features with QA/backend collaboration, improving responsiveness and reliability.',
         features: [
            'Bill payment and token purchase flows',
            'Outage reporting',
            'Performance and crash fixes',
            'API reliability improvements'
         ],
         stack: ['Flutter', 'Dart', 'REST API', 'Firebase'],
         pdfPage: 10,
         thumb: 'images/portfolio/slides/slide-10.jpg'
      },
      {
         id: 'baf',
         title: 'BAF Mobile',
         company: 'PT Bussan Auto Finance',
         year: '2021',
         role: 'Android Mobile Developer',
         category: 'Mobile Apps',
         type: 'Consumer Financing',
         summary: 'Financing application for vehicle, electronics, and consumer credit workflows.',
         overview: 'BAF Mobile enables digital financing applications across multiple product lines.',
         problem: 'Financing modules needed stable Android delivery and clearer user interaction.',
         solution: 'Developed and maintained financing features with backend/QA collaboration.',
         features: [
            'Financing-related modules',
            'Production bug fixes',
            'Workflow UX optimization'
         ],
         stack: ['Java', 'Kotlin', 'Android SDK', 'REST API'],
         pdfPage: 11,
         thumb: 'images/portfolio/slides/slide-11.jpg'
      },
      {
         id: 'px',
         title: 'PX People Experience',
         company: 'DKatalis',
         year: '2019–2020',
         role: 'Mobile Application Developer',
         category: 'Flutter',
         type: 'Internal HR Platform',
         summary: 'HR platform for onboarding, leave, reimbursement, performance, and employee communication.',
         overview: 'Used by Bank Jago, DKatalis, and Amaan Digital for employee management.',
         problem: 'Enterprise HR flows needed reliable mobile modules for 500+ internal users.',
         solution: 'Built and maintained Flutter features with Clean Architecture and GetX under Agile delivery.',
         features: [
            'Leave and reimbursement flows',
            'Performance management modules',
            'API reliability & error handling'
         ],
         stack: ['Flutter', 'GetX', 'Clean Architecture', 'REST API', 'Firebase'],
         pdfPage: 12,
         thumb: 'images/portfolio/slides/slide-12.jpg'
      },
      {
         id: 'bfs',
         title: 'BFS — Business Financial Solution',
         company: 'DKatalis / Bank Jago',
         year: '2020–2021',
         role: 'Mobile Application Developer',
         category: 'Flutter',
         type: 'Corporate Fintech',
         summary: 'Digital banking features integrating savings, payments, and corporate financial workflows.',
         overview: 'BFS connects banking and fintech services inside Bank Jago’s ecosystem.',
         problem: 'Corporate finance workflows needed fault-tolerant Flutter/web modules.',
         solution: 'Delivered new features, API integrations, and stability improvements with cross-functional teams.',
         features: [
            'Corporate finance modules',
            'API communication optimization',
            'Stability during feature enhancements'
         ],
         stack: ['Flutter', 'Dart', 'Clean Architecture', 'REST API', 'Firebase'],
         pdfPage: 13,
         thumb: 'images/portfolio/slides/slide-13.jpg'
      },
      {
         id: 'digisekre',
         title: 'Digisekre',
         company: 'PORMIKI Jawa Barat',
         year: '2024–2025',
         role: 'Full Stack Developer',
         category: 'Laravel',
         type: 'Membership Platform',
         summary: 'Membership and financial reporting platform for medical records professionals.',
         overview: 'DigiSekre supports member administration, financial reporting, and organizational management.',
         problem: 'Manual member ops and reporting did not scale for 2,000+ users.',
         solution: 'Role-based Filament dashboards, finance modules, and responsive Tailwind UI cutting reporting time ~80%.',
         features: [
            'Role-based dashboards',
            'Member management automation',
            'PDF/CSV financial reports'
         ],
         stack: ['Laravel 11', 'Filament 3', 'Spatie Permission', 'Tailwind', 'MySQL'],
         pdfPage: 14,
         thumb: 'images/portfolio/slides/slide-14.jpg'
      }
   ],
   i18n: {
      en: {
         navAbout: 'About',
         navResume: 'Experience',
         navJourney: 'Journey',
         navPortfolio: 'Portfolio',
         navContact: 'Hire Me',
         heroHire: 'Hire Me',
         heroPortfolio: 'View Portfolio',
         heroDownload: 'Download CV',
         aboutTitle: 'About Me',
         contactTitle: 'Contact',
         downloadResume: 'Download Resume',
         educationLabel: 'Education',
         workLabel: 'Experience',
         skillsLabel: 'Skills',
         orgLabel: 'Organizations',
         journeyKicker: 'Selected Journey',
         journeyTitle: 'Case studies from product delivery, freelance execution, and field mobile engineering.',
         journeyIntro: 'How I work in real product environments: solve operational problems, improve UX, and ship apps teams can trust.',
         portfolioKicker: 'Portfolio Showcase',
         portfolioTitle: 'Featured projects from trading, logistics, fintech, and enterprise mobile.',
         portfolioIntro: 'Browse large previews, open the LinkedIn-style document viewer, or download the full 2026 portfolio PDF.',
         contactKicker: 'Direct Contact',
         contactLead: 'For Flutter app builds, performance work, or full-time mobile roles, reach me on WhatsApp.',
         contactHeading: 'Fastest path is WhatsApp.',
         contactBody: 'Open to Android/iOS builds, feature work, performance upgrades, or full-time Flutter / Mobile Engineer roles.',
         openPortfolio: 'Open Portfolio PDF',
         viewProject: 'View project',
         themeLight: 'Light',
         themeDark: 'Dark',
         langLabel: 'EN',
         statsChapters: 'Career Chapters',
         statsJourneys: 'Selected Journeys',
         statsApps: 'Projects',
         statsYears: 'Years Experience',
         floatingAvailable: 'Available',
         floatingStart: 'Start conversation',
         skillsKicker: 'Technology Stack',
         skillsTitle: 'Tools I use to ship production mobile and web products.'
      },
      id: {
         navAbout: 'Profil',
         navResume: 'Pengalaman',
         navJourney: 'Journey',
         navPortfolio: 'Portfolio',
         navContact: 'Hire Me',
         heroHire: 'Hire Me',
         heroPortfolio: 'Lihat Portfolio',
         heroDownload: 'Unduh CV',
         aboutTitle: 'Tentang Saya',
         contactTitle: 'Kontak',
         downloadResume: 'Unduh Resume',
         educationLabel: 'Pendidikan',
         workLabel: 'Pengalaman',
         skillsLabel: 'Keahlian',
         orgLabel: 'Organisasi',
         journeyKicker: 'Selected Journey',
         journeyTitle: 'Studi kasus dari delivery produk, eksekusi freelance, dan mobile engineering di lapangan.',
         journeyIntro: 'Cara saya bekerja di lingkungan produk nyata: menyelesaikan masalah operasional, memperbaiki UX, dan mengirim aplikasi yang bisa diandalkan.',
         portfolioKicker: 'Portfolio Showcase',
         portfolioTitle: 'Proyek unggulan dari trading, logistik, fintech, dan enterprise mobile.',
         portfolioIntro: 'Lihat preview besar, buka document viewer gaya LinkedIn, atau unduh PDF portfolio 2026.',
         contactKicker: 'Direct Contact',
         contactLead: 'Untuk jasa aplikasi Flutter, perbaikan performa, atau peluang full-time, hubungi via WhatsApp.',
         contactHeading: 'Komunikasi paling cepat lewat WhatsApp.',
         contactBody: 'Terbuka untuk build Android/iOS, fitur baru, peningkatan performa, atau role Flutter / Mobile Engineer.',
         openPortfolio: 'Buka PDF Portfolio',
         viewProject: 'Lihat proyek',
         themeLight: 'Terang',
         themeDark: 'Gelap',
         langLabel: 'ID',
         statsChapters: 'Bab Karier',
         statsJourneys: 'Selected Journey',
         statsApps: 'Proyek',
         statsYears: 'Tahun Pengalaman',
         floatingAvailable: 'Available',
         floatingStart: 'Mulai percakapan',
         skillsKicker: 'Technology Stack',
         skillsTitle: 'Perkakas yang saya pakai untuk mengirim produk mobile dan web production.'
      }
   }
};

var APP_STATE = {
   lang: localStorage.getItem('myresume-lang') || 'en',
   theme: localStorage.getItem('myresume-theme') || 'light',
   carouselIndex: 0,
   carouselTimer: null,
   pdfDoc: null,
   pdfPage: 1,
   pdfPageCount: 0,
   pdfZoom: 1.1,
   activeProjectId: null,
   touchStartX: 0
};

function t(key) {
   var pack = PROFILE_DATA.i18n[APP_STATE.lang] || PROFILE_DATA.i18n.en;
   return pack[key] || PROFILE_DATA.i18n.en[key] || key;
}

function injectSectionKicker(selector, label) {
   var section = $(selector);
   if (!section.length || section.find('.section-kicker').length) {
      return;
   }

   var target = section.find('h1, h2').first();
   if (!target.length) {
      return;
   }

   $('<div class="section-kicker"></div>').text(label).insertBefore(target);
}

function renderWorkItems(items) {
   return items.map(function(item) {
      var bullets = item.bullets.map(function(bullet) {
         return '<li>' + escapeHtml(bullet) + '</li>';
      }).join('');

      return [
         '<div class="row item resume-entry is-visible">',
         '<div class="twelve columns">',
         '<div class="resume-entry-head">',
         '<div>',
         '<h3>' + escapeHtml(item.company) + '</h3>',
         '<p class="info">' + escapeHtml(item.role) + ' <span>&bull;</span> <em class="date">' + escapeHtml(item.years) + '</em></p>',
         '</div>',
         '<span class="resume-entry-location">' + escapeHtml(item.location) + '</span>',
         '</div>',
         '<ul class="resume-points">' + bullets + '</ul>',
         '</div>',
         '</div>'
      ].join('');
   }).join('');
}

function renderSkillsBars(items) {
   return [
      '<div class="row item skill-block is-visible">',
      '<div class="twelve columns">',
      '<ul class="skills bars">'
   ].concat(items.map(function(skill) {
      return [
         '<li>',
         '<span class="bar-expand" style="width:' + escapeHtml(skill.level) + '"></span>',
         '<em>' + escapeHtml(skill.name) + '</em>',
         '</li>'
      ].join('');
   })).concat([
      '</ul>',
      '<div class="skill-tags">' + PROFILE_DATA.skillTags.map(function(tag) {
         return '<span class="skill-tag">' + escapeHtml(tag) + '</span>';
      }).join('') + '</div>',
      '</div>',
      '</div>'
   ]).join('');
}

function renderOrgItems(items) {
   return items.map(function(item) {
      return [
         '<div class="row item resume-entry is-visible">',
         '<div class="twelve columns">',
         '<h3>' + escapeHtml(item.name) + '</h3>',
         '<p class="info">' + escapeHtml(item.role) + ' <span>&bull;</span> <em class="date">' + escapeHtml(item.years) + '</em></p>',
         '<p>' + escapeHtml(item.detail) + '</p>',
         '</div>',
         '</div>'
      ].join('');
   }).join('');
}

function renderJourneyItems(items) {
   return items.map(function(item, index) {
      var highlights = item.highlights.map(function(point) {
         return '<li>' + escapeHtml(point) + '</li>';
      }).join('');

      return [
         '<article class="journey-card is-visible" data-journey-index="' + index + '">',
         '<div class="journey-rail">',
         '<span class="journey-dot"></span>',
         '<span class="journey-line"></span>',
         '</div>',
         '<div class="journey-card-body">',
         '<p class="journey-period">' + escapeHtml(item.period) + '</p>',
         '<h3>' + escapeHtml(item.title) + '</h3>',
         '<p class="journey-company">' + escapeHtml(item.company) + '</p>',
         '<p class="journey-summary">' + escapeHtml(item.summary) + '</p>',
         '<ul class="journey-points">' + highlights + '</ul>',
         '</div>',
         '</article>'
      ].join('');
   }).join('');
}

function renderPortfolioSlide(item, index) {
   var tags = (item.stack || []).slice(0, 5).map(function(tag) {
      return '<span class="portfolio-tag">' + escapeHtml(tag) + '</span>';
   }).join('');

   return [
      '<article class="portfolio-slide' + (index === 0 ? ' is-active' : '') + '" data-portfolio-id="' + escapeHtml(item.id) + '" data-index="' + index + '" role="group" aria-roledescription="slide" aria-label="' + escapeHtml(item.title) + '">',
      '<button type="button" class="portfolio-slide-hit" data-open-portfolio="' + escapeHtml(item.id) + '" aria-label="' + escapeHtml(t('viewProject') + ': ' + item.title) + '">',
      '<div class="portfolio-preview">',
      '<img src="' + assetUrl(item.thumb) + '" alt="' + escapeHtml(item.title) + ' preview" loading="lazy" width="720" height="405" />',
      '<span class="portfolio-year">' + escapeHtml(item.year) + '</span>',
      '</div>',
      '<div class="portfolio-copy">',
      '<p class="portfolio-company">' + escapeHtml(item.company) + '</p>',
      '<h3>' + escapeHtml(item.title) + '</h3>',
      '<p class="portfolio-summary">' + escapeHtml(item.summary) + '</p>',
      '<div class="portfolio-tags">' + tags + '</div>',
      '</div>',
      '</button>',
      '</article>'
   ].join('');
}

function startHeroHeadlineLoop() {
   var target = $('#home .banner-text h2');
   var phrases = PROFILE_DATA.rotatingHeadlines || [];

   if (!target.length || !phrases.length) {
      return;
   }

   target.empty().append('<span class="hero-typing" aria-live="polite"></span>');

   var output = target.find('.hero-typing');
   var phraseIndex = 0;
   var charIndex = 0;
   var deleting = false;
   var pause = false;
   var timerId = null;

   function tick() {
      var phrase = phrases[phraseIndex];

      if (pause) {
         timerId = setTimeout(function() {
            pause = false;
            deleting = true;
            tick();
         }, 1200);
         return;
      }

      if (!deleting) {
         charIndex += 1;
         output.text(phrase.slice(0, charIndex));

         if (charIndex >= phrase.length) {
            pause = true;
         }

         timerId = setTimeout(tick, 75);
         return;
      }

      charIndex -= 1;
      output.text(phrase.slice(0, charIndex));

      if (charIndex <= 0) {
         deleting = false;
         phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      timerId = setTimeout(tick, 38);
   }

   if (target.data('typingTimer')) {
      clearTimeout(target.data('typingTimer'));
   }

   tick();
   target.data('typingTimer', timerId);
}

function setupLivingCards() {
   var selector = '.journey-card, .portfolio-slide, .hero-stat';
   var isDesktop = window.matchMedia('(pointer: fine)').matches;

   $(document).off('.cardFx');

   if (!isDesktop) {
      $(selector).css('transform', '');
      return;
   }

   $(document)
      .on('mousemove.cardFx', selector, function(event) {
         var $card = $(this);
         var rect = this.getBoundingClientRect();
         var x = event.clientX - rect.left;
         var y = event.clientY - rect.top;
         var rotateY = ((x / rect.width) - 0.5) * 8;
         var rotateX = (0.5 - (y / rect.height)) * 8;

         $card.css('transform',
            'perspective(1200px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-6px)'
         );
      })
      .on('mouseleave.cardFx', selector, function() {
         $(this).css('transform', '');
      });
}

function applyTheme(theme) {
   APP_STATE.theme = theme === 'dark' ? 'dark' : 'light';
   document.documentElement.setAttribute('data-theme', APP_STATE.theme);
   localStorage.setItem('myresume-theme', APP_STATE.theme);
   var toggle = document.getElementById('theme-toggle');
   if (toggle) {
      toggle.setAttribute('aria-pressed', APP_STATE.theme === 'dark' ? 'true' : 'false');
      toggle.textContent = APP_STATE.theme === 'dark' ? t('themeLight') : t('themeDark');
   }
}

function applyLang(lang) {
   APP_STATE.lang = lang === 'id' ? 'id' : 'en';
   localStorage.setItem('myresume-lang', APP_STATE.lang);
   document.documentElement.setAttribute('lang', APP_STATE.lang);
   var toggle = document.getElementById('lang-toggle');
   if (toggle) {
      toggle.textContent = t('langLabel');
   }
}

function ensureChromeControls() {
   if ($('#site-chrome-controls').length) {
      return;
   }

   var html = [
      '<div id="site-chrome-controls" class="site-chrome-controls" role="group" aria-label="Display preferences">',
      '<button type="button" id="theme-toggle" class="chrome-btn" aria-pressed="false">' + escapeHtml(t('themeDark')) + '</button>',
      '<button type="button" id="lang-toggle" class="chrome-btn" aria-label="Language">' + escapeHtml(t('langLabel')) + '</button>',
      '</div>'
   ].join('');

   $('#nav-wrap').append(html);

   $('#theme-toggle').on('click', function() {
      applyTheme(APP_STATE.theme === 'dark' ? 'light' : 'dark');
   });

   $('#lang-toggle').on('click', function() {
      applyLang(APP_STATE.lang === 'en' ? 'id' : 'en');
      applyResumeContent();
      startHeroHeadlineLoop();
      setupPortfolioCarousel();
      setupLivingCards();
   });
}

function ensurePdfViewerShell() {
   if ($('#portfolio-viewer').length) {
      if ($('#viewer-next svg').length && $('[data-meta="features"]').length) {
         return;
      }
      $('#portfolio-viewer').remove();
      $(document).off('keydown.portfolioViewer');
   }

   var html = [
      '<div id="portfolio-viewer" class="portfolio-viewer" hidden aria-hidden="true">',
      '<div class="portfolio-viewer-backdrop" data-close-viewer="1"></div>',
      '<div class="portfolio-viewer-dialog" role="dialog" aria-modal="true" aria-labelledby="viewer-title">',
      '<div class="portfolio-viewer-toolbar">',
      '<div class="viewer-heading">',
      '<p class="viewer-kicker" id="viewer-company"></p>',
      '<h2 id="viewer-title"></h2>',
      '</div>',
      '<div class="viewer-actions">',
      '<button type="button" class="viewer-btn" id="viewer-zoom-out" aria-label="Zoom out">−</button>',
      '<button type="button" class="viewer-btn" id="viewer-zoom-in" aria-label="Zoom in">+</button>',
      '<button type="button" class="viewer-btn" id="viewer-fullscreen" aria-label="Toggle fullscreen">⛶</button>',
      '<a class="viewer-btn viewer-link" id="viewer-download" target="_blank" rel="noopener noreferrer">PDF</a>',
      '<button type="button" class="viewer-btn viewer-close" id="viewer-close" aria-label="Close viewer">×</button>',
      '</div>',
      '</div>',
      '<div class="portfolio-viewer-body">',
      '<aside class="viewer-meta">',
      '<div class="viewer-meta-block" data-meta="role">',
      '<p class="viewer-meta-label">Role</p>',
      '<p id="viewer-role" class="viewer-meta-text"></p>',
      '</div>',
      '<div class="viewer-meta-block" data-meta="overview">',
      '<p class="viewer-meta-label">Overview</p>',
      '<p id="viewer-overview" class="viewer-meta-text"></p>',
      '</div>',
      '<div class="viewer-meta-block" data-meta="solution">',
      '<p class="viewer-meta-label">Solution</p>',
      '<p id="viewer-solution" class="viewer-meta-text"></p>',
      '</div>',
      '<div class="viewer-meta-block" data-meta="tech">',
      '<p class="viewer-meta-label">Tech</p>',
      '<div id="viewer-stack" class="viewer-tech-tags"></div>',
      '</div>',
      '<div class="viewer-meta-block" data-meta="features">',
      '<p class="viewer-meta-label">Highlights</p>',
      '<ul id="viewer-features" class="viewer-features"></ul>',
      '</div>',
      '</aside>',
      '<div class="viewer-stage-wrap">',
      '<div class="viewer-stage" id="viewer-stage">',
      '<canvas id="viewer-canvas"></canvas>',
      '<div class="viewer-loading" id="viewer-loading">Loading document…</div>',
      '</div>',
      '<button type="button" class="viewer-nav prev" id="viewer-prev" aria-label="Previous page">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 4.5L8 12l7.5 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '</button>',
      '<button type="button" class="viewer-nav next" id="viewer-next" aria-label="Next page">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 4.5L16 12l-7.5 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '</button>',
      '</div>',
      '</div>',
      '<footer class="portfolio-viewer-footer">',
      '<div class="viewer-page-indicator"><span id="viewer-page-num">1</span> / <span id="viewer-page-count">1</span></div>',
      '<div class="viewer-thumbs" id="viewer-thumbs" role="tablist" aria-label="Page thumbnails"></div>',
      '</footer>',
      '</div>',
      '</div>'
   ].join('');

   $('body').append(html);

   $('#viewer-close, [data-close-viewer]').on('click', closePortfolioViewer);
   $('#viewer-prev').on('click', function() { shiftPdfPage(-1); });
   $('#viewer-next').on('click', function() { shiftPdfPage(1); });
   $('#viewer-zoom-in').on('click', function() {
      APP_STATE.pdfZoom = Math.min(2.2, APP_STATE.pdfZoom + 0.15);
      renderPdfPage({ fit: false });
   });
   $('#viewer-zoom-out').on('click', function() {
      APP_STATE.pdfZoom = Math.max(0.55, APP_STATE.pdfZoom - 0.15);
      renderPdfPage({ fit: false });
   });
   $('#viewer-fullscreen').on('click', toggleViewerFullscreen);

   var stage = document.getElementById('viewer-stage');
   if (stage) {
      stage.addEventListener('touchstart', function(e) {
         APP_STATE.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      stage.addEventListener('touchend', function(e) {
         var dx = e.changedTouches[0].screenX - APP_STATE.touchStartX;
         if (Math.abs(dx) > 40) {
            shiftPdfPage(dx < 0 ? 1 : -1);
         }
      }, { passive: true });
   }

   $(document).on('keydown.portfolioViewer', function(event) {
      if (!$('#portfolio-viewer').is(':visible')) {
         return;
      }
      if (event.key === 'Escape') {
         closePortfolioViewer();
      } else if (event.key === 'ArrowLeft') {
         shiftPdfPage(-1);
      } else if (event.key === 'ArrowRight') {
         shiftPdfPage(1);
      } else if (event.key === '+' || event.key === '=') {
         setPdfZoom(APP_STATE.pdfZoom + 0.15);
      } else if (event.key === '-') {
         setPdfZoom(APP_STATE.pdfZoom - 0.15);
      }
   });
}

function findPortfolio(id) {
   for (var i = 0; i < PROFILE_DATA.portfolio.length; i += 1) {
      if (PROFILE_DATA.portfolio[i].id === id) {
         return PROFILE_DATA.portfolio[i];
      }
   }
   return PROFILE_DATA.portfolio[0];
}

function getViewerMetaForPage(pageNum) {
   var page = Number(pageNum) || 1;
   var special = {
      1: {
         id: 'cover',
         title: 'Portfolio 2026',
         company: 'Aldi Riansyah',
         year: '2026',
         role: 'Hybrid Mobile Engineer',
         overview: 'Selected product work across trading, logistics, fintech, enterprise mobile, and membership platforms.',
         solution: 'Browse each slide for project context, tech stack, and delivery highlights from the full portfolio PDF.',
         stack: ['Flutter', 'Laravel', 'Fintech', 'AI-Assisted Dev'],
         features: [
            '15-page portfolio document',
            'Project case studies with role and challenges',
            'Downloadable PDF for offline sharing'
         ]
      },
      2: {
         id: 'intro',
         title: 'Hello, I\'m Aldi Riansyah',
         company: 'Hybrid Mobile Developer',
         year: '2026',
         role: 'Flutter Developer — onsite & remote',
         overview: 'A professional Flutter developer looking for new career opportunities, with contributions to mobile apps at well-known Indonesian companies.',
         solution: 'Open to Flutter roles onsite or remote, focused on scalable, user-centric product delivery.',
         stack: ['Flutter', 'Dart', 'Clean Architecture', 'Product Delivery'],
         features: [
            'Hybrid mobile product experience',
            'Fintech, logistics, and enterprise domains',
            'AI-assisted development workflow'
         ]
      },
      15: {
         id: 'contact-slide',
         title: 'Thank You',
         company: 'Contact Details',
         year: '2026',
         role: 'Let’s collaborate',
         overview: 'Reach out for Flutter builds, performance work, or full-time mobile engineering roles.',
         solution: PROFILE_DATA.phone + ' · ' + PROFILE_DATA.email + ' · ' + PROFILE_DATA.location,
         stack: ['WhatsApp', 'Email', 'LinkedIn'],
         features: [
            PROFILE_DATA.phone,
            PROFILE_DATA.email,
            PROFILE_DATA.linkedin.replace('https://', '')
         ]
      }
   };

   if (special[page]) {
      return special[page];
   }

   var matched = null;
   var i;
   for (i = 0; i < PROFILE_DATA.portfolio.length; i += 1) {
      if (PROFILE_DATA.portfolio[i].pdfPage === page) {
         matched = PROFILE_DATA.portfolio[i];
         break;
      }
   }

   if (matched) {
      return matched;
   }

   // Fall back to nearest earlier project page
   var nearest = PROFILE_DATA.portfolio[0];
   for (i = 0; i < PROFILE_DATA.portfolio.length; i += 1) {
      if (PROFILE_DATA.portfolio[i].pdfPage <= page) {
         nearest = PROFILE_DATA.portfolio[i];
      }
   }
   return nearest;
}

function fillViewerMeta(project) {
   if (!project) {
      return;
   }

   var role = project.role || '';
   var overview = project.overview || project.summary || '';
   var solution = project.solution || '';
   var features = project.features || [];
   var stack = project.stack || [];

   APP_STATE.activeProjectId = project.id || APP_STATE.activeProjectId;
   $('#viewer-title').text(project.title || '');
   $('#viewer-company').text(
      project.year ? (project.company + ' · ' + project.year) : (project.company || '')
   );
   $('#viewer-role').text(role);
   $('#viewer-overview').text(overview);
   $('#viewer-solution').text(solution);
   $('#viewer-stack').html(stack.map(function(tag) {
      return '<span class="viewer-tech-tag">' + escapeHtml(tag) + '</span>';
   }).join(''));
   $('#viewer-features').html(features.map(function(item) {
      return '<li>' + escapeHtml(item) + '</li>';
   }).join(''));
   $('#viewer-download').attr('href', assetUrl(PROFILE_DATA.portfolioFile));

   $('[data-meta="role"]').toggle(!!role);
   $('[data-meta="overview"]').toggle(!!overview);
   $('[data-meta="solution"]').toggle(!!solution);
   $('[data-meta="tech"]').toggle(stack.length > 0);
   $('[data-meta="features"]').toggle(features.length > 0);
   $('.viewer-meta').scrollTop(0);
}

function syncViewerMetaForCurrentPage() {
   fillViewerMeta(getViewerMetaForPage(APP_STATE.pdfPage));
}

function buildThumbStrip(currentPage) {
   var thumbs = $('#viewer-thumbs').empty();
   var total = APP_STATE.pdfPageCount || 15;
   var start = Math.max(1, currentPage - 2);
   var end = Math.min(total, currentPage + 2);
   var i;

   // Prefer a 5-wide window when possible
   if (end - start < 4) {
      if (start === 1) {
         end = Math.min(total, start + 4);
      } else if (end === total) {
         start = Math.max(1, end - 4);
      }
   }

   for (i = start; i <= end; i += 1) {
      (function(pageNum) {
         var meta = getViewerMetaForPage(pageNum);
         var btn = $('<button type="button" class="viewer-thumb" role="tab"></button>');
         btn.attr('data-page', pageNum);
         btn.attr('aria-label', (meta.title || ('Page ' + pageNum)) + ' — page ' + pageNum);
         btn.attr('title', meta.title || ('Page ' + pageNum));
         btn.append($('<img loading="lazy" alt="" />').attr(
            'src',
            assetUrl('images/portfolio/slides/slide-' + (pageNum < 10 ? '0' + pageNum : pageNum) + '.jpg')
         ));
         if (pageNum === APP_STATE.pdfPage) {
            btn.addClass('is-active');
         }
         btn.on('click', function() {
            APP_STATE.pdfPage = pageNum;
            renderPdfPage();
         });
         thumbs.append(btn);
      })(i);
   }
}

function fitPdfZoom() {
   var stage = document.getElementById('viewer-stage');
   if (!stage || !APP_STATE.pdfDoc) {
      return Promise.resolve(APP_STATE.pdfZoom);
   }

   return APP_STATE.pdfDoc.getPage(APP_STATE.pdfPage).then(function(page) {
      var base = page.getViewport({ scale: 1 });
      var available = Math.max(stage.clientWidth - 24, 240);
      var fitted = available / base.width;
      APP_STATE.pdfZoom = Math.min(1.6, Math.max(0.55, fitted));
      return APP_STATE.pdfZoom;
   });
}

function setPdfZoom(value) {
   APP_STATE.pdfZoom = Math.min(2.2, Math.max(0.55, value));
   renderPdfPage();
}

function shiftPdfPage(delta) {
   if (!APP_STATE.pdfPageCount) {
      return;
   }
   var next = APP_STATE.pdfPage + delta;
   if (next < 1) {
      next = APP_STATE.pdfPageCount;
   }
   if (next > APP_STATE.pdfPageCount) {
      next = 1;
   }
   APP_STATE.pdfPage = next;
   renderPdfPage();
}

function renderPdfPage(options) {
   if (!APP_STATE.pdfDoc) {
      return;
   }

   var loading = $('#viewer-loading').show();
   var shouldFit = !options || options.fit !== false;

   var prepare = shouldFit ? fitPdfZoom() : Promise.resolve(APP_STATE.pdfZoom);

   prepare.then(function() {
      return APP_STATE.pdfDoc.getPage(APP_STATE.pdfPage);
   }).then(function(page) {
      var canvas = document.getElementById('viewer-canvas');
      var context = canvas.getContext('2d');
      var viewport = page.getViewport({ scale: APP_STATE.pdfZoom });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      return page.render({ canvasContext: context, viewport: viewport }).promise;
   }).then(function() {
      loading.hide();
      $('#viewer-page-num').text(APP_STATE.pdfPage);
      $('#viewer-page-count').text(APP_STATE.pdfPageCount);
      syncViewerMetaForCurrentPage();
      buildThumbStrip(APP_STATE.pdfPage);
   }).catch(function() {
      loading.text('Unable to render this page. You can still download the PDF.');
   });
}

function loadPdfDocument(startPage) {
   $('#viewer-loading').text('Loading document…').show();

   if (typeof pdfjsLib === 'undefined') {
      $('#viewer-loading').html(
         'PDF viewer library unavailable. <a href="' + assetUrl(PROFILE_DATA.portfolioFile) + '" target="_blank" rel="noopener noreferrer">Open PDF</a>'
      );
      return;
   }

   if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
   }

   if (APP_STATE.pdfDoc) {
      APP_STATE.pdfPage = startPage || 1;
      renderPdfPage();
      return;
   }

   pdfjsLib.getDocument(assetUrl(PROFILE_DATA.portfolioFile)).promise.then(function(doc) {
      APP_STATE.pdfDoc = doc;
      APP_STATE.pdfPageCount = doc.numPages;
      APP_STATE.pdfPage = startPage || 1;
      renderPdfPage();
   }).catch(function() {
      $('#viewer-loading').html(
         'Could not load portfolio PDF. <a href="' + assetUrl(PROFILE_DATA.portfolioFile) + '" target="_blank" rel="noopener noreferrer">Open directly</a>'
      );
   });
}

function openPortfolioViewer(projectId) {
   var project = findPortfolio(projectId);
   APP_STATE.activeProjectId = project.id;
   ensurePdfViewerShell();
   fillViewerMeta(project);
   $('#portfolio-viewer').prop('hidden', false).attr('aria-hidden', 'false').addClass('is-open');
   $('body').addClass('viewer-open');
   loadPdfDocument(project.pdfPage || 1);
   $('#viewer-close').trigger('focus');
}

function closePortfolioViewer() {
   $('#portfolio-viewer').removeClass('is-open').prop('hidden', true).attr('aria-hidden', 'true');
   $('body').removeClass('viewer-open');
   if (document.fullscreenElement) {
      document.exitFullscreen().catch(function() {});
   }
}

function toggleViewerFullscreen() {
   var dialog = document.querySelector('.portfolio-viewer-dialog');
   if (!dialog) {
      return;
   }
   if (!document.fullscreenElement) {
      dialog.requestFullscreen().catch(function() {});
   } else {
      document.exitFullscreen().catch(function() {});
   }
}

function goToCarousel(index) {
   var items = PROFILE_DATA.portfolio;
   if (!items.length) {
      return;
   }
   var len = items.length;
   APP_STATE.carouselIndex = ((index % len) + len) % len;
   var $slides = $('#portfolio-carousel .portfolio-slide');
   $slides.removeClass('is-active is-prev is-next');
   $slides.each(function() {
      var i = Number($(this).attr('data-index'));
      if (i === APP_STATE.carouselIndex) {
         $(this).addClass('is-active');
      } else if (i === (APP_STATE.carouselIndex - 1 + len) % len) {
         $(this).addClass('is-prev');
      } else if (i === (APP_STATE.carouselIndex + 1) % len) {
         $(this).addClass('is-next');
      }
   });
   $('#portfolio-dots button').removeClass('is-active').attr('aria-selected', 'false');
   $('#portfolio-dots button[data-index="' + APP_STATE.carouselIndex + '"]').addClass('is-active').attr('aria-selected', 'true');
}

function startCarouselAutoplay() {
   clearInterval(APP_STATE.carouselTimer);
   APP_STATE.carouselTimer = setInterval(function() {
      goToCarousel(APP_STATE.carouselIndex + 1);
   }, 5200);
}

function setupPortfolioCarousel() {
   var root = $('#testimonials');
   if (!root.length) {
      return;
   }

   var slides = PROFILE_DATA.portfolio.map(renderPortfolioSlide).join('');
   var dots = PROFILE_DATA.portfolio.map(function(item, index) {
      return '<button type="button" data-index="' + index + '" aria-label="' + escapeHtml(item.title) + '" aria-selected="' + (index === 0 ? 'true' : 'false') + '"' + (index === 0 ? ' class="is-active"' : '') + '></button>';
   }).join('');

   root.html([
      '<div class="text-container portfolio-showcase">',
      '<div class="row">',
      '<div class="twelve columns">',
      '<div class="section-kicker">' + escapeHtml(t('portfolioKicker')) + '</div>',
      '<h1>' + escapeHtml(t('portfolioTitle')) + '</h1>',
      '<p class="app-showcase-intro">' + escapeHtml(t('portfolioIntro')) + '</p>',
      '<div class="portfolio-toolbar">',
      '<a class="hero-action secondary" href="' + assetUrl(PROFILE_DATA.portfolioFile) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(t('openPortfolio')) + '</a>',
      '</div>',
      '<div id="portfolio-carousel" class="portfolio-carousel" aria-roledescription="carousel" aria-label="Featured portfolio">',
      '<div class="portfolio-carousel-frame">',
      '<button type="button" class="carousel-arrow prev" id="carousel-prev" aria-label="Previous project">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 4.5L8 12l7.5 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '</button>',
      '<div class="portfolio-track">' + slides + '</div>',
      '<button type="button" class="carousel-arrow next" id="carousel-next" aria-label="Next project">',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 4.5L16 12l-7.5 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '</button>',
      '</div>',
      '</div>',
      '<div id="portfolio-dots" class="portfolio-dots" role="tablist">' + dots + '</div>',
      '</div>',
      '</div>',
      '</div>'
   ].join(''));

   goToCarousel(0);
   startCarouselAutoplay();

   var $carousel = $('#portfolio-carousel');
   $carousel.off('.carousel');
   $('#carousel-prev').on('click.carousel', function() {
      goToCarousel(APP_STATE.carouselIndex - 1);
      startCarouselAutoplay();
   });
   $('#carousel-next').on('click.carousel', function() {
      goToCarousel(APP_STATE.carouselIndex + 1);
      startCarouselAutoplay();
   });
   $('#portfolio-dots button').on('click.carousel', function() {
      goToCarousel(Number($(this).attr('data-index')));
      startCarouselAutoplay();
   });
   $carousel
      .on('mouseenter.carousel focusin.carousel', function() {
         clearInterval(APP_STATE.carouselTimer);
      })
      .on('mouseleave.carousel focusout.carousel', function() {
         startCarouselAutoplay();
      });

   var touchX = 0;
   $carousel.on('touchstart.carousel', function(e) {
      touchX = e.originalEvent.changedTouches[0].screenX;
   }).on('touchend.carousel', function(e) {
      var dx = e.originalEvent.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 40) {
         goToCarousel(APP_STATE.carouselIndex + (dx < 0 ? 1 : -1));
         startCarouselAutoplay();
      }
   });

   $(document).off('keydown.carousel').on('keydown.carousel', function(event) {
      if (!$('#testimonials').length) {
         return;
      }
      var rect = document.getElementById('testimonials').getBoundingClientRect();
      var inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView || $('#portfolio-viewer').hasClass('is-open')) {
         return;
      }
      if (event.key === 'ArrowLeft') {
         goToCarousel(APP_STATE.carouselIndex - 1);
         startCarouselAutoplay();
      } else if (event.key === 'ArrowRight') {
         goToCarousel(APP_STATE.carouselIndex + 1);
         startCarouselAutoplay();
      }
   });

   $(document).off('click.openPortfolio').on('click.openPortfolio', '[data-open-portfolio]', function(event) {
      event.preventDefault();
      openPortfolioViewer($(this).attr('data-open-portfolio'));
   });
}

function applyResumeContent() {
   ensureChromeControls();
   applyTheme(APP_STATE.theme);
   applyLang(APP_STATE.lang);

   $('#nav-wrap a[href="#about"]').text(t('navAbout'));
   $('#nav-wrap a[href="#resume"]').text(t('navResume'));
   $('#nav-wrap a[href="#portfolio"]').text(t('navJourney'));
   $('#nav-wrap a[href="#testimonials"]').text(t('navPortfolio'));
   $('#nav-wrap a[href="#contact"]').text(t('navContact'));

   $('#home .banner-text h1').text(PROFILE_DATA.name + '.');
   $('#home .banner-text h2').html('<span class="hero-title-static">' + escapeHtml(PROFILE_DATA.headline) + '</span>');
   $('#home .banner-text h3').html(escapeHtml(PROFILE_DATA.summary));

   var socialHtml = [
      '<li><a href="' + PROFILE_DATA.linkedin + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa fa-linkedin"></i></a></li>',
      '<li><a href="' + PROFILE_DATA.whatsapp + '" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fa fa-whatsapp"></i></a></li>',
      '<li><a href="mailto:' + PROFILE_DATA.email + '" aria-label="Email"><i class="fa fa-envelope"></i></a></li>',
      '<li><a href="' + PROFILE_DATA.certificates + '" target="_blank" rel="noopener noreferrer" aria-label="Certificates"><i class="fa fa-certificate"></i></a></li>'
   ].join('');
   $('#home .banner-text .social').html(socialHtml);

   var resumeHref = assetUrl(PROFILE_DATA.resumeFile);

   $('.hero-actions').remove();
   $('.hero-stats').remove();

   var actionsHtml = [
      '<div class="hero-actions">',
      '<a class="hero-action primary smoothscroll" href="#contact">' + escapeHtml(t('heroHire')) + '</a>',
      '<a class="hero-action secondary smoothscroll" href="#testimonials">' + escapeHtml(t('heroPortfolio')) + '</a>',
      '<a class="hero-action secondary" href="' + resumeHref + '" download="' + escapeHtml(PROFILE_DATA.resumeFile) + '">' + escapeHtml(t('heroDownload')) + '</a>',
      '</div>'
   ].join('');

   var statsHtml = [
      '<div class="hero-stats" aria-label="Career highlights">',
      '<div class="hero-stat"><strong>' + formatCount(PROFILE_DATA.work.length) + '+</strong><span>' + escapeHtml(t('statsChapters')) + '</span></div>',
      '<div class="hero-stat"><strong>' + formatCount(PROFILE_DATA.journey.length) + '</strong><span>' + escapeHtml(t('statsJourneys')) + '</span></div>',
      '<div class="hero-stat"><strong>' + formatCount(PROFILE_DATA.portfolio.length) + '+</strong><span>' + escapeHtml(t('statsApps')) + '</span></div>',
      '<div class="hero-stat"><strong>' + escapeHtml(PROFILE_DATA.yearsExperience) + '</strong><span>' + escapeHtml(t('statsYears')) + '</span></div>',
      '</div>'
   ].join('');

   $('#home .banner-text h3').after(actionsHtml);
   $('#home .banner-text .social').after(statsHtml);

   $('#about h2').text(t('aboutTitle'));
   $('#about .profile-pic')
      .attr('src', assetUrl('images/aldypp.png'))
      .attr('alt', PROFILE_DATA.name);
   $('#about .main-col > p').first().text(PROFILE_DATA.about);
   $('#about .contact-details').html([
      '<h2>' + escapeHtml(t('contactTitle')) + '</h2>',
      '<p class="address">',
      '<span>' + escapeHtml(PROFILE_DATA.name) + '</span><br />',
      '<span>' + escapeHtml(PROFILE_DATA.location) + '</span><br />',
      '<span>' + escapeHtml(PROFILE_DATA.phone) + '</span><br />',
      '<span>' + escapeHtml(PROFILE_DATA.email) + '</span>',
      '</p>'
   ].join(''));
   $('#about .download a.button')
      .attr('href', resumeHref)
      .attr('download', PROFILE_DATA.resumeFile)
      .html('<i class="fa fa-download"></i>' + escapeHtml(t('downloadResume')));

   $('#resume .education .header-col span').text(t('educationLabel'));
   $('#resume .education .main-col').html(renderWorkItems([{
      company: PROFILE_DATA.education.school,
      role: PROFILE_DATA.education.degree,
      years: PROFILE_DATA.education.year,
      location: 'Bandung, Indonesia',
      bullets: [PROFILE_DATA.education.detail]
   }]));

   $('#resume .work .header-col span').text(t('workLabel'));
   $('#resume .work .main-col').html(renderWorkItems(PROFILE_DATA.work));

   if (!$('#resume .skill').length) {
      $('#resume .work').after([
         '<div class="row skill">',
         '<div class="three columns header-col"><h1><span>' + escapeHtml(t('skillsLabel')) + '</span></h1></div>',
         '<div class="nine columns main-col"></div>',
         '</div>',
         '<div class="row org">',
         '<div class="three columns header-col"><h1><span>' + escapeHtml(t('orgLabel')) + '</span></h1></div>',
         '<div class="nine columns main-col"></div>',
         '</div>'
      ].join(''));
   } else {
      $('#resume .skill .header-col span').text(t('skillsLabel'));
      if (!$('#resume .org').length) {
         $('#resume .skill').after([
            '<div class="row org">',
            '<div class="three columns header-col"><h1><span>' + escapeHtml(t('orgLabel')) + '</span></h1></div>',
            '<div class="nine columns main-col"></div>',
            '</div>'
         ].join(''));
      } else {
         $('#resume .org .header-col span').text(t('orgLabel'));
      }
   }

   $('#resume .skill .main-col').html(renderSkillsBars(PROFILE_DATA.skills));
   $('#resume .org .main-col').html(renderOrgItems(PROFILE_DATA.organizations));

   $('#portfolio').html([
      '<div class="row journey-shell">',
      '<div class="twelve columns">',
      '<div class="section-kicker">' + escapeHtml(t('journeyKicker')) + '</div>',
      '<h1>' + escapeHtml(t('journeyTitle')) + '</h1>',
      '<p class="journey-intro">' + escapeHtml(t('journeyIntro')) + '</p>',
      '<div class="journey-list">' + renderJourneyItems(PROFILE_DATA.journey) + '</div>',
      '<div class="stack-strip">',
      '<div class="section-kicker">' + escapeHtml(t('skillsKicker')) + '</div>',
      '<h2>' + escapeHtml(t('skillsTitle')) + '</h2>',
      '<div class="skill-tags">' + PROFILE_DATA.skillTags.map(function(tag) {
         return '<span class="skill-tag">' + escapeHtml(tag) + '</span>';
      }).join('') + '</div>',
      '</div>',
      '</div>',
      '</div>'
   ].join(''));

   setupPortfolioCarousel();

   $('#contact').html([
      '<div class="row section-head contact-headline-row">',
      '<div class="two columns header-col">',
      '<h1><span>' + escapeHtml(t('navContact')) + '</span></h1>',
      '</div>',
      '<div class="ten columns">',
      '<p class="lead">' + escapeHtml(t('contactLead')) + '</p>',
      '</div>',
      '</div>',
      '<div class="row contact-direct-layout">',
      '<div class="twelve columns contact-direct-copy is-visible">',
      '<div class="section-kicker">' + escapeHtml(t('contactKicker')) + '</div>',
      '<h2>' + escapeHtml(t('contactHeading')) + '</h2>',
      '<p>' + escapeHtml(t('contactBody')) + '</p>',
      '<div class="contact-shortcuts">',
      '<a class="contact-shortcut" href="' + PROFILE_DATA.whatsapp + '" target="_blank" rel="noopener noreferrer"><i class="fa fa-whatsapp"></i><span>WhatsApp</span></a>',
      '<a class="contact-shortcut" href="mailto:' + PROFILE_DATA.email + '"><i class="fa fa-envelope"></i><span>' + escapeHtml(PROFILE_DATA.email) + '</span></a>',
      '<a class="contact-shortcut" href="' + resumeHref + '" download="' + escapeHtml(PROFILE_DATA.resumeFile) + '"><i class="fa fa-download"></i><span>' + escapeHtml(t('downloadResume')) + '</span></a>',
      '<a class="contact-shortcut" href="' + assetUrl(PROFILE_DATA.portfolioFile) + '" target="_blank" rel="noopener noreferrer"><i class="fa fa-file-pdf-o"></i><span>' + escapeHtml(t('openPortfolio')) + '</span></a>',
      '</div>',
      '</div>',
      '</div>'
   ].join(''));

   var year = new Date().getFullYear();
   $('footer .copyright li').first().html('&copy; Copyright ' + year + ' ' + escapeHtml(PROFILE_DATA.name));
}

function enhanceLandingPage() {
   if ($('body').data('landing-enhanced')) {
      applyResumeContent();
      startHeroHeadlineLoop();
      setupLivingCards();
      return;
   }

   hoistNavbar();
   $('body').data('landing-enhanced', true);

   ensurePdfViewerShell();
   applyResumeContent();
   startHeroHeadlineLoop();
   setupLivingCards();
   $('body').addClass('landing-ready');

   if (PROFILE_DATA.whatsapp) {
      $('.floating-cta').remove();
      $('body').append(
         '<a class="floating-cta" href="' + PROFILE_DATA.whatsapp + '" target="_blank" rel="noopener noreferrer" aria-label="Start conversation on WhatsApp">' +
            '<span class="floating-cta-icon"><img src="' + assetUrl('images/wa.png') + '" alt="WhatsApp" /></span>' +
            '<span><strong>' + escapeHtml(t('floatingAvailable')) + '</strong><span>' + escapeHtml(t('floatingStart')) + '</span></span>' +
         '</a>'
      );
   }

   $('#nav-wrap a.smoothscroll').off('click.mobileNav').on('click.mobileNav', function() {
      if (window.location.hash === '#nav-wrap') {
         window.location.hash = '#';
      }
   });

   var revealTargets = $('#about .three.columns, #about .main-col, #resume .row.item, #portfolio .journey-card, #testimonials .portfolio-slide, #contact .contact-direct-copy');

   if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
         entries.forEach(function(entry) {
            if (entry.isIntersecting) {
               $(entry.target).addClass('is-visible');
               observer.unobserve(entry.target);
            }
         });
      }, { threshold: 0.2 });

      revealTargets.each(function() {
         observer.observe(this);
      });
   } else {
      revealTargets.addClass('is-visible');
   }

   scrollToHashTarget(window.location.hash, false);
   $(window).trigger('scroll');
}

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $(document).off('click.smoothscroll', '.smoothscroll').on('click.smoothscroll', '.smoothscroll', function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

       if (!$target.length) {
         return;
       }

      scrollToHashTarget(target, true);
	    $('html, body').promise().done(function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header#home, header.banner, #home').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header#home, #home').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');
      var totalHeight = $(document).height() - $(window).height();
      var progress = totalHeight > 0 ? Math.min(y / totalHeight, 1) : 0;

      document.body.style.setProperty('--scroll-progress', progress);

      if (y < h * .20) {
         nav.removeClass('opaque');
      }
      else {
         nav.addClass('opaque');
      }

	});

   $(window).on('hashchange', function() {
      $('body').removeClass('nav-hidden');
      scrollToHashTarget(window.location.hash, false);
   });

   applyTheme(APP_STATE.theme);
   applyLang(APP_STATE.lang);
   hoistNavbar();
   setupNavbarBehavior();
   waitForLandingPage(function() {
      hoistNavbar();
      enhanceLandingPage();
      setupNavbarBehavior();
   });

 });
