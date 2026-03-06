/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

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
      'Mobile App Developer'
   ],
   summary: '4+ tahun membangun aplikasi Flutter yang scalable untuk fintech, enterprise, dan layanan publik dengan fokus pada performa, clean architecture, dan UX yang terasa matang.',
   location: 'Bandung, West Java, Indonesia',
   phone: '+62 8132 3322 639',
   whatsapp: 'https://wa.me/6281323322639',
   email: 'aldyrains30@gmail.com',
   linkedin: 'https://www.linkedin.com/in/aldi-riansyah/',
   resumeFile: 'Aldi-Riansyah-Resume-2025.pdf',
   about: 'Saya membangun produk mobile hybrid dan web yang stabil di production, cepat digunakan, dan tetap maintainable untuk tim. Pengalaman saya mencakup fintech collection, platform internal employee, operasional organisasi profesi kesehatan, dan logistik kendaraan listrik. Kekuatan utama saya ada pada menerjemahkan kebutuhan produk menjadi arsitektur yang rapi, kode yang bersih, dan antarmuka yang terasa sederhana bagi pengguna.',
   education: {
      school: 'SMK Negeri 11 Bandung',
      degree: 'High School Diploma in Information Technology',
      year: '2014 - 2017',
      detail: 'Graduated as one of the outstanding students in the 2017 class and completed a final project focused on a Java-based outpatient medical record application.'
   },
   work: [
      {
         company: 'PT Mitra Konsultansi Indonesia',
         role: 'Freelancer Flutter Developer',
         years: 'Mar 2025 - Jun 2025',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Built GPS tracking for BTN Smart Collection with real-time location updates.',
            'Optimized API integration and synchronization to cut app load time by 20%.',
            'Refined the UI for more intuitive navigation and better mobile responsiveness.',
            'Applied clean architecture and Provider-based state management for stability.'
         ]
      },
      {
         company: 'Digisekre Permiki Jabar',
         role: 'Freelance Web Developer',
         years: 'Sep 2024 - Feb 2025',
         location: 'Bandung, Indonesia',
         bullets: [
            'Developed role-based dashboards with Laravel Filament 3 and Spatie Permission.',
            'Automated member operations for 2,000+ users in a health information professional association.',
            'Delivered exportable PDF and CSV financial reports, reducing manual reporting time by 80%.',
            'Built a responsive admin experience with Tailwind CSS.'
         ]
      },
      {
         company: 'Risada Damai Sejahtera',
         role: 'Mobile Application Developer',
         years: 'Apr 2023 - May 2024',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Led Flutter development for myEV E-Trans driver and merchant apps.',
            'Integrated Google Maps APIs for routing, positioning, and map-driven workflows.',
            'Partnered with product and UI/UX teams to preserve 95%+ build stability.',
            'Shipped maintainable code using GetX state management and reusable modules.'
         ]
      },
      {
         company: 'PT Bank Jago Tbk',
         role: 'Flutter Developer',
         years: 'Earlier product delivery',
         location: 'Jakarta, Indonesia',
         bullets: [
            'Contributed to Business Financial Solution features for corporate banking use cases.',
            'Worked closely with product, design, and stakeholders from planning to implementation.',
            'Focused on scalable Flutter delivery with strong collaboration across teams.'
         ]
      }
   ],
   journey: [
      {
         period: '2025',
         title: 'SmartColl BTN',
         company: 'PT Mitra Konsultansi Indonesia',
         summary: 'Membantu pengembangan aplikasi koleksi digital untuk Bank BTN dengan fokus pada real-time tracking, sinkronisasi data, dan pengalaman lapangan yang lebih efisien.',
         highlights: [
            'Built GPS tracking for field collection workflows.',
            'Reduced perceived load time by improving API synchronization.',
            'Refined the mobile interface for clearer navigation under operational pressure.'
         ]
      },
      {
         period: '2024 - 2025',
         title: 'Digisekre Permiki Jabar',
         company: 'Freelance Web Delivery',
         summary: 'Membangun dashboard operasional berbasis role untuk organisasi profesi kesehatan dengan workflow yang lebih rapi dan pelaporan yang jauh lebih cepat.',
         highlights: [
            'Automated member management for 2,000+ users.',
            'Delivered exportable PDF and CSV reporting.',
            'Built a responsive admin experience with Laravel Filament and Tailwind.'
         ]
      },
      {
         period: '2023 - 2024',
         title: 'myEV E-Trans',
         company: 'Risada Damai Sejahtera',
         summary: 'Mengembangkan aplikasi driver dan merchant untuk ekosistem kendaraan listrik dengan kebutuhan geolocation, routing, dan stabilitas aplikasi produksi.',
         highlights: [
            'Integrated Google Maps APIs for route-centric user flows.',
            'Built reusable Flutter modules for operational screens.',
            'Collaborated tightly with product and UI/UX to preserve app stability.'
         ]
      },
      {
         period: 'Earlier Product Work',
         title: 'Bank Jago, DKatalis, BAF, PLN',
         company: 'Cross-functional Product Delivery',
         summary: 'Berpengalaman berkontribusi di product teams dengan domain fintech, HR internal platform, consumer finance, dan enterprise apps.',
         highlights: [
            'Worked across product planning, implementation, and iteration.',
            'Shipped Flutter-based solutions for internal and customer-facing use cases.',
            'Balanced maintainability, business requirements, and product experience.'
         ]
      }
   ],
   apps: [
      {
         title: 'SmartColl BTN',
         company: 'PT Mitra Konsultansi Indonesia',
         type: 'Fintech Collection App',
         impact: 'Tracking GPS, sinkronisasi lebih cepat, dan antarmuka collector yang lebih efisien untuk kebutuhan operasional Bank BTN.',
         stack: 'Flutter, Provider, Clean Architecture'
      },
      {
         title: 'Digisekre',
         company: 'Permiki Jabar',
         type: 'Dashboard Operasional',
         impact: 'Platform web berbasis role yang merapikan pengelolaan anggota dan pelaporan keuangan untuk 2.000+ pengguna.',
         stack: 'Laravel Filament 3, Spatie Permission, Tailwind CSS'
      },
      {
         title: 'myEV E-Trans',
         company: 'Risada Damai Sejahtera',
         type: 'Aplikasi Driver dan Merchant',
         impact: 'Aplikasi logistik kendaraan listrik dengan kebutuhan routing, flow merchant, dan arsitektur mobile yang stabil.',
         stack: 'Flutter, GetX, Google Maps API'
      },
      {
         title: 'PX People Experience',
         company: 'DKatalis',
         type: 'Platform HR Internal',
         impact: 'Mendukung alur leave, reimbursement, dan kebutuhan employee experience dalam mobile flow yang lebih bersih.',
         stack: 'Flutter, Product Collaboration, UX Iteration'
      },
      {
         title: 'Business Financial Solution',
         company: 'Bank Jago',
         type: 'Produk Finansial Korporasi',
         impact: 'Berkontribusi pada pengembangan fitur corporate banking dengan implementasi Flutter yang maintainable dan kolaborasi lintas fungsi.',
         stack: 'Flutter, Fintech Domain, Team Delivery'
      },
      {
         title: 'PESA and Sinopsis',
         company: 'PLN Group',
         type: 'Aplikasi Internal Karyawan',
         impact: 'Membangun produk mobile untuk kebutuhan divisi dan direktorat PLN dengan modul Flutter yang reusable.',
         stack: 'Flutter, Enterprise Mobile, Frontend Integration'
      }
   ]
};

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
         return '<li>' + bullet + '</li>';
      }).join('');

      return [
         '<div class="row item resume-entry is-visible">',
         '<div class="twelve columns">',
         '<div class="resume-entry-head">',
         '<div>',
         '<h3>' + item.company + '</h3>',
         '<p class="info">' + item.role + ' <span>&bull;</span> <em class="date">' + item.years + '</em></p>',
         '</div>',
         '<span class="resume-entry-location">' + item.location + '</span>',
         '</div>',
         '<ul class="resume-points">' + bullets + '</ul>',
         '</div>',
         '</div>'
      ].join('');
   }).join('');
}

function renderAppItems(items) {
   return items.map(function(item) {
      return [
         '<article class="app-card">',
         '<div class="app-card-head">',
         '<span class="app-type">' + item.type + '</span>',
         '<h3>' + item.title + '</h3>',
         '<p class="app-company">' + item.company + '</p>',
         '</div>',
         '<p class="app-impact">' + item.impact + '</p>',
         '<p class="app-stack">' + item.stack + '</p>',
         '</article>'
      ].join('');
   }).join('');
}

function renderJourneyItems(items) {
   return items.map(function(item, index) {
      var highlights = item.highlights.map(function(point) {
         return '<li>' + point + '</li>';
      }).join('');

      return [
         '<article class="journey-card is-visible" data-journey-index="' + index + '">',
         '<div class="journey-rail">',
         '<span class="journey-dot"></span>',
         '<span class="journey-line"></span>',
         '</div>',
         '<div class="journey-card-body">',
         '<p class="journey-period">' + item.period + '</p>',
         '<h3>' + item.title + '</h3>',
         '<p class="journey-company">' + item.company + '</p>',
         '<p class="journey-summary">' + item.summary + '</p>',
         '<ul class="journey-points">' + highlights + '</ul>',
         '</div>',
         '</article>'
      ].join('');
   }).join('');
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
   var selector = '.journey-card, .app-card, .hero-stat';
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

function applyResumeContent() {
   $('#nav-wrap a[href="#portfolio"]').text('Journey');
   $('#nav-wrap a[href="#testimonials"]').text('Aplikasi');
   $('#nav-wrap a[href="#resume"]').text('Pengalaman');
   $('#nav-wrap a[href="#about"]').text('Profil');
   $('#nav-wrap a[href="#contact"]').text('Hire Me');

   $('#home .banner-text h1').text(PROFILE_DATA.name + '.');
   $('#home .banner-text h2').html('<span class="hero-title-static">' + PROFILE_DATA.headline + '</span>');
   $('#home .banner-text h3').html(PROFILE_DATA.summary);

   var socialHtml = [
      '<li><a href="' + PROFILE_DATA.linkedin + '" target="_blank" rel="noopener noreferrer"><i class="fa fa-linkedin"></i></a></li>',
      '<li><a href="' + PROFILE_DATA.whatsapp + '" target="_blank" rel="noopener noreferrer"><i class="fa fa-whatsapp"></i></a></li>',
      '<li><a href="mailto:' + PROFILE_DATA.email + '"><i class="fa fa-envelope"></i></a></li>'
   ].join('');
   $('#home .banner-text .social').html(socialHtml);

   $('#about h2').text('Tentang Saya');
   $('#about .profile-pic')
      .attr('src', 'images/aldypp.png')
      .attr('alt', PROFILE_DATA.name);
   $('#about .main-col > p').text(PROFILE_DATA.about);
   $('#about .contact-details').html([
      '<h2>Kontak</h2>',
      '<p class="address">',
      '<span>' + PROFILE_DATA.name + '</span><br />',
      '<span>' + PROFILE_DATA.location + '</span><br />',
      '<span>' + PROFILE_DATA.phone + '</span><br />',
      '<span>' + PROFILE_DATA.email + '</span>',
      '</p>'
   ].join(''));
   $('#about .download a.button')
      .attr('href', PROFILE_DATA.resumeFile)
      .attr('download', PROFILE_DATA.resumeFile)
      .html('<i class="fa fa-download"></i>Download Resume');

   $('#resume .education .header-col span').text('Pendidikan');
   $('#resume .education .main-col').html(renderWorkItems([{
      company: PROFILE_DATA.education.school,
      role: PROFILE_DATA.education.degree,
      years: PROFILE_DATA.education.year,
      location: 'Bandung, Indonesia',
      bullets: [PROFILE_DATA.education.detail]
   }]));

   $('#resume .work .header-col span').text('Pengalaman');
   $('#resume .work .main-col').html(renderWorkItems(PROFILE_DATA.work));

   $('#resume .skill').remove();

   $('#portfolio').html([
      '<div class="row journey-shell">',
      '<div class="twelve columns">',
      '<div class="section-kicker">Selected Journey</div>',
      '<h1>Studi kasus dari delivery produk, eksekusi freelance, dan pengalaman mobile engineering di lapangan.</h1>',
      '<p class="journey-intro">Bagian ini menunjukkan cara saya bekerja di lingkungan produk nyata: menyelesaikan masalah operasional, memperbaiki UX, dan mengirim aplikasi yang benar-benar bisa diandalkan tim.</p>',
      '<div class="journey-list">' + renderJourneyItems(PROFILE_DATA.journey) + '</div>',
      '</div>',
      '</div>'
   ].join(''));

   $('#testimonials').html([
      '<div class="text-container app-showcase">',
      '<div class="row">',
      '<div class="twelve columns">',
      '<div class="section-kicker">Shipped Applications</div>',
      '<h1>Aplikasi dan platform yang pernah saya kerjakan.</h1>',
      '<p class="app-showcase-intro">Bagian ini menampilkan aplikasi dan platform yang pernah saya kerjakan untuk kebutuhan fintech, operasional bisnis, layanan organisasi, dan solusi mobile di lapangan.</p>',
      '<div class="apps-grid">' + renderAppItems(PROFILE_DATA.apps) + '</div>',
      '</div>',
      '</div>',
      '</div>'
   ].join(''));

   $('#contact').html([
      '<div class="row section-head contact-headline-row">',
      '<div class="two columns header-col">',
      '<h1><span>Hire Me</span></h1>',
      '</div>',
      '<div class="ten columns">',
      '<p class="lead">Untuk diskusi jasa pembuatan aplikasi mobile, perbaikan aplikasi Flutter, atau peluang rekrutmen, Anda bisa langsung menghubungi saya lewat WhatsApp.</p>',
      '</div>',
      '</div>',
      '<div class="row contact-direct-layout">',
      '<div class="twelve columns contact-direct-copy is-visible">',
      '<div class="section-kicker">Direct Contact</div>',
      '<h2>Komunikasi paling cepat langsung ke WhatsApp.</h2>',
      '<p>Saya membuka kolaborasi untuk pembuatan aplikasi Android dan iOS, pengembangan fitur baru, peningkatan performa aplikasi existing, maupun diskusi role full-time sebagai Flutter atau Mobile Engineer.</p>',
      '<div class="contact-shortcuts">',
      '<a class="contact-shortcut" href="' + PROFILE_DATA.whatsapp + '" target="_blank" rel="noopener noreferrer"><i class="fa fa-whatsapp"></i><span>WhatsApp</span></a>',
      '<a class="contact-shortcut" href="mailto:' + PROFILE_DATA.email + '"><i class="fa fa-envelope"></i><span>' + PROFILE_DATA.email + '</span></a>',
      '<a class="contact-shortcut" href="' + PROFILE_DATA.resumeFile + '"><i class="fa fa-download"></i><span>Download Resume</span></a>',
      '</div>',
      '</div>',
      '</div>'
   ].join(''));
}

function enhanceLandingPage() {
   if ($('body').data('landing-enhanced')) {
      return;
   }

   hoistNavbar();
   $('body').data('landing-enhanced', true);

   applyResumeContent();
   startHeroHeadlineLoop();
   setupLivingCards();
   $('body').addClass('landing-ready');

   var workCount = PROFILE_DATA.work.length;
   var journeyCount = PROFILE_DATA.journey.length;
   var projectCount = PROFILE_DATA.apps.length;
   var whatsappLink = PROFILE_DATA.whatsapp;

   if (!$('.hero-actions').length) {
      var actionsHtml = [
         '<div class="hero-actions">',
         "<a class=\"hero-action primary smoothscroll\" href=\"#contact\">Hire Me</a>",
         '<a class="hero-action secondary smoothscroll" href="#testimonials">Lihat Aplikasi</a>',
         '</div>'
      ].join('');

      var statsHtml = [
         '<div class="hero-stats" aria-label="Career highlights">',
         '<div class="hero-stat"><strong>' + formatCount(workCount) + '+</strong><span>Career Chapters</span></div>',
         '<div class="hero-stat"><strong>' + formatCount(journeyCount) + '</strong><span>Selected Journeys</span></div>',
         '<div class="hero-stat"><strong>' + formatCount(projectCount) + '+</strong><span>Aplikasi</span></div>',
         '<div class="hero-stat"><strong>4+</strong><span>Tahun Pengalaman</span></div>',
         '</div>'
      ].join('');

      $('#home .banner-text .social').after(statsHtml);
      $('#home .banner-text h3').after(actionsHtml);
   }

   injectSectionKicker('#about', 'Profile');
   injectSectionKicker('#resume', 'Capabilities');
   injectSectionKicker('#portfolio', 'Selected Journey');
   injectSectionKicker('#contact', 'Open To Talk');

   if (whatsappLink) {
      $('.floating-cta').remove();
      $('body').append(
         '<a class="floating-cta" href="' + whatsappLink + '" target="_blank" rel="noopener noreferrer" aria-label="Start conversation on WhatsApp">' +
            '<span class="floating-cta-icon"><img src="/myresume/images/wa.png" alt="WhatsApp" /></span>' +
            '<span><strong>Available</strong><span>Start conversation</span></span>' +
         '</a>'
      );
   }

   $('#nav-wrap a.smoothscroll').off('click.mobileNav').on('click.mobileNav', function() {
      if (window.location.hash === '#nav-wrap') {
         window.location.hash = '#';
      }
   });

   var revealTargets = $('#about .three.columns, #about .main-col, #resume .row.item, #portfolio .journey-card, #testimonials .app-card, #contact .contact-direct-copy');

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

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
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

   hoistNavbar();
   setupNavbarBehavior();
   waitForLandingPage(function() {
      hoistNavbar();
      enhanceLandingPage();
      setupNavbarBehavior();
   });

 });
