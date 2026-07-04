document.addEventListener('DOMContentLoaded', function(){
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navTabs = document.getElementById('navTabs');
  if (navToggle && navTabs){
    navToggle.addEventListener('click', function(){
      navTabs.classList.toggle('open');
    });
    navTabs.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navTabs.classList.remove('open'); });
    });
  }

  // Scroll progress bar
  var progressBar = document.getElementById('progressBar');
  if (progressBar){
    function updateProgress(){
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var max = h.scrollHeight - h.clientHeight;
      progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
    }
    document.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // Typewriter effect for hero name (home page only)
  var typedEl = document.getElementById('typedName');
  if (typedEl){
    var fullName = 'Hamdan Chughtai';
    if (reduceMotion){
      typedEl.textContent = fullName;
    } else {
      var i = 0;
      (function typeChar(){
        if (i <= fullName.length){
          typedEl.textContent = fullName.slice(0, i);
          i++;
          setTimeout(typeChar, 65);
        }
      })();
    }
  }

  // Scroll-reveal via IntersectionObserver
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

  // ---------- Ask-about-me chat widget ----------
  var knowledgeBase = [
    { keywords: ['name', 'who are you', 'who is he', 'who is hamdan'],
      answer: "This is Hamdan Chughtai — a 20-year-old coding enthusiast based in Lahore, Pakistan, currently studying Computer Science." },
    { keywords: ['age', 'old', 'years'],
      answer: "Hamdan is 20 years old." },
    { keywords: ['where', 'from', 'location', 'live', 'based', 'lahore', 'pakistan', 'country', 'city'],
      answer: "He's based in Lahore, Pakistan." },
    { keywords: ['university', 'college', 'degree', 'study', 'studying', 'education', 'semester', 'graduat'],
      answer: "He's a Computer Science student at University of Management and Technology (UMT), currently in his 2nd semester, expecting to graduate in 2029." },
    { keywords: ['language', 'skill', 'know', 'learned', 'stack', 'tech', 'technology'],
      answer: "He's learned C++, HTML, and CSS, and is currently building up JavaScript and Git/GitHub." },
    { keywords: ['learning', 'currently', 'working on', 'javascript', 'js'],
      answer: "Right now he's focused on JavaScript, along with Git and GitHub workflows." },
    { keywords: ['project', 'built', 'made', 'work', 'portfolio', 'repo', 'github repo'],
      answer: "He's built web projects (like this portfolio), a University Management System and a Parcel Tracking System in C++, and a Smart Home Automation System using ESP8266, Arduino IoT Cloud, and Google Home. Check the Projects page for the full list." },
    { keywords: ['esp32', 'esp8266', 'hardware', 'iot', 'smart home', 'relay', 'arduino'],
      answer: "He built a Smart Home Automation System on a NodeMCU ESP8266 — four relays and wall switches synced with Arduino IoT Cloud and Google Home. There's a full write-up on the Blog page." },
    { keywords: ['blog', 'write', 'article', 'post'],
      answer: "He writes build logs about his projects — check the Blog page for posts on the portfolio, the University Management System, and the Smart Home Automation build." },
    { keywords: ['uses', 'setup', 'tools', 'gear', 'editor', 'laptop'],
      answer: "He works on an HP ENVY x360 m6 with an Epomaker Brick 87 keyboard — check the Uses page for the full setup." },
    { keywords: ['resume', 'cv'],
      answer: "There's no formal resume up yet — email him directly for his experience and background." },
    { keywords: ['github'],
      answer: "You can find all his code at github.com/hamdanchughtai." },
    { keywords: ['twitter', 'x.com', 'x '],
      answer: "He's on Twitter/X as @HamdanChughtai." },
    { keywords: ['threads'],
      answer: "He's on Threads as @hamdan_chughtai." },
    { keywords: ['linktree', 'links', 'social'],
      answer: "All his socials are collected at linktr.ee/hamdanchughtai." },
    { keywords: ['linkedin'],
      answer: "He's on LinkedIn at linkedin.com/in/hamdanchughtai." },
    { keywords: ['email', 'mail', 'contact', 'reach', 'hire', 'collaborate', 'work with'],
      answer: "The best way to reach him is by email: hamdanchughtai25@gmail.com." },
    { keywords: ['hello', 'hi', 'hey'],
      answer: "Hey! Ask me anything about Hamdan — his skills, projects, or how to get in touch." },
    { keywords: ['available', 'availability', 'hire', 'freelance', 'internship', 'full-time', 'job', 'looking for work'],
      answer: "He's currently focused on building and learning — not actively looking for freelance, internship, or full-time work yet. Feel free to reach out anyway if you'd like to connect." },
    { keywords: ['ai', 'chatgpt', 'claude', 'gemini', 'use ai', 'ai tools', 'artificial intelligence'],
      answer: "He uses AI tools like ChatGPT, Gemini, and Claude as a starting point — for example, generating an initial version of firmware — but always reviews, modifies, and customizes the result himself. He sees AI as an assistant that speeds up boilerplate, not a replacement for actually understanding the hardware or code." },
    { keywords: ['specialize', 'specialise', 'future', 'career', 'goal', 'long-term', 'long term', 'want to become'],
      answer: "Long-term, he wants to specialize in full-stack web development." },
    { keywords: ['hobby', 'hobbies', 'personality', 'fun', 'outside of coding', 'free time', 'interests outside'],
      answer: "Outside of coding, he likes working on practical, hands-on projects — the kind of build-it-yourself work you see in his Smart Home Automation system." },
    { keywords: ['thanks', 'thank you'],
      answer: "Anytime! Anything else you'd like to know about Hamdan?" }
  ];
  var fallbackAnswer = "I don't have that on file yet — the most direct way to ask is emailing Hamdan at hamdanchughtai25@gmail.com.";

  function findAnswer(question){
    var q = question.toLowerCase();
    var best = null, bestScore = 0;
    knowledgeBase.forEach(function(entry){
      var score = 0;
      entry.keywords.forEach(function(kw){
        if (q.indexOf(kw) !== -1) score += kw.length;
      });
      if (score > bestScore){ bestScore = score; best = entry; }
    });
    return best ? best.answer : fallbackAnswer;
  }

  var chatToggle = document.getElementById('chatToggle');
  var chatPanel = document.getElementById('chatPanel');
  var chatClose = document.getElementById('chatClose');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');
  var chatSuggestions = document.getElementById('chatSuggestions');

  if (chatToggle && chatPanel){
    function openChat(){
      chatPanel.classList.add('open');
      chatToggle.setAttribute('aria-expanded', 'true');
      setTimeout(function(){ chatInput.focus(); }, 200);
    }
    function closeChat(){
      chatPanel.classList.remove('open');
      chatToggle.setAttribute('aria-expanded', 'false');
    }
    chatToggle.addEventListener('click', function(){
      chatPanel.classList.contains('open') ? closeChat() : openChat();
    });
    chatClose.addEventListener('click', closeChat);

    function addMessage(text, who){
      var div = document.createElement('div');
      div.className = 'chat-msg ' + who;
      if (who === 'bot'){
        var mark = document.createElement('span');
        mark.className = 'prompt-mark';
        mark.textContent = '$';
        div.appendChild(mark);
        div.appendChild(document.createTextNode(text));
      } else {
        div.textContent = text;
      }
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function askQuestion(text){
      if (!text || !text.trim()) return;
      addMessage(text, 'user');
      chatInput.value = '';
      if (chatSuggestions) chatSuggestions.style.display = 'none';

      var typing = document.createElement('div');
      typing.className = 'typing-dots';
      typing.innerHTML = '<span></span><span></span><span></span>';
      chatMessages.appendChild(typing);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(function(){
        typing.remove();
        addMessage(findAnswer(text), 'bot');
      }, reduceMotion ? 50 : 500 + Math.random() * 300);
    }

    chatSend.addEventListener('click', function(){ askQuestion(chatInput.value); });
    chatInput.addEventListener('keydown', function(e){
      if (e.key === 'Enter') askQuestion(chatInput.value);
    });
    if (chatSuggestions){
      chatSuggestions.querySelectorAll('.chat-chip').forEach(function(chip){
        chip.addEventListener('click', function(){ askQuestion(chip.getAttribute('data-q')); });
      });
    }
  }
});
