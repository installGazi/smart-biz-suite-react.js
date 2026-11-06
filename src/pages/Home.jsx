import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; 
import { 
  CodeBracketIcon, 
  CommandLineIcon, 
  ServerIcon, 
  CircleStackIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ArrowRightIcon,
  CpuChipIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  PlayIcon,
  CalendarIcon,
  BellIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  ArrowPathRoundedSquareIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });

  const pricingPlans = [
    { name: "Basic", price: "$50", features: ["1 Page Landing Site", "Responsive Design", "Basic SEO", "3 Days Delivery"] },
    { name: "Standard", price: "$100", features: ["5 Pages Business Site", "Contact Form Integration", "Advanced SEO", "API Integration", "7 Days Delivery"], popular: true },
    { name: "Premium", price: "$250", features: ["Full Stack MERN App", "Admin Dashboard", "Database & Auth Setup", "Lifetime Bug Support"] }
  ];

  const emailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=muhammadsaifaulgazi@gmail.com&su=Project%20Inquiry%20from%20Portfolio";
  const whatsappLink = `https://wa.me/8801907823654?text=${encodeURIComponent("Hi Gazi, I found your portfolio and I am interested in discussing a project with you.")}`;

  // Gmail কম্পোজ ওপেন করার ফাংশন
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = contactData;
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    const subject = `Project Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=muhammadsaifaulgazi@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, '_blank');
    toast.success("Opening Gmail to send your message!");
    setContactData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans scroll-smooth overflow-hidden">
      
      {/* ========================================== */}
      {/* STEP 1: HOME (HERO) SECTION START          */}
      {/* ========================================== */}
      <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center pt-10 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-50 blur-3xl opacity-50 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Text */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-semibold tracking-wide border border-emerald-100 shadow-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  Available for Freelance Work
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Hi, I'm <span className="text-emerald-600">Gazi Saiful</span><br />
                MERN Stack Web Developer
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                I specialize in building exceptional digital experiences. From robust backend APIs to beautiful, responsive React interfaces, I bring your ideas to life.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#projects" 
                  className="w-full sm:w-fit px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  View My Work <ArrowRightIcon className="w-5 h-5" />
                </a>
                
                <a 
                  href={whatsappLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-fit px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Me
                </a>
              </div>
              
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 border-t border-slate-200">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">JD</div>
                  <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">SM</div>
                  <div className="w-10 h-10 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">ML</div>
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm justify-center sm:justify-start">★★★★★</div>
                  <p className="text-xs text-slate-500 font-medium text-center sm:text-left mt-1">Trusted by 30+ clients</p>
                </div>
              </div>
            </div>

            {/* Right Side: Profile Image (Bulletproof Container) */}
            <div className="flex justify-center items-center relative mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-emerald-400 rounded-[2.5rem] blur-2xl opacity-40 transform scale-90 translate-y-4 animate-pulse"></div>

              {/* ⬇️ এখানে src="/me.png" করা হয়েছে */}
              <div className="relative w-full max-w-[280px] sm:max-w-xs aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white/50 shadow-2xl bg-slate-900 group">
                <img 
                  src="/me.png" 
                  alt="Gazi Saiful" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 sm:gap-3 transform hover:-translate-y-1 transition-transform z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                  <CheckBadgeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">8+ Years</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">Experience</p>
                </div>
              </div>

              <div className="absolute top-10 -right-2 sm:-right-6 bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 transform hover:-translate-y-1 transition-transform z-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <CodeBracketIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-800 pr-1 sm:pr-2">Clean Code</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 1: HOME (HERO) SECTION END */}

      {/* STEP 2: ABOUT SECTION START */}
      <section id="about" className="py-20 sm:py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About Me</h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>I am a passionate <strong className="text-slate-900">MERN Stack Web Developer</strong> with a strong foundation in modern web technologies. My goal is to build applications that are not only functional but also provide a seamless and engaging user experience.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-blue-600 pl-4"><h4 className="text-3xl font-bold text-slate-900">50+</h4><p className="text-sm text-slate-500">Projects Completed</p></div>
                <div className="border-l-4 border-emerald-600 pl-4"><h4 className="text-3xl font-bold text-slate-900">8+</h4><p className="text-sm text-slate-500">Years of Experience</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-600 rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="relative bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                 <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><CommandLineIcon className="w-6 h-6 text-emerald-600" /> My Core Values</h3>
                 <ul className="space-y-5">
                    <li className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">1</span><p className="text-slate-700 text-sm sm:text-base"><strong>Problem Solver:</strong> I love tackling complex challenges and finding elegant solutions.</p></li>
                    <li className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">2</span><p className="text-slate-700 text-sm sm:text-base"><strong>Continuous Learner:</strong> The tech world evolves fast, and I evolve with it.</p></li>
                 </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 2: ABOUT SECTION END */}

      {/* STEP 3: SKILLS SECTION START */}
      <section id="skills" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Skills</h2><div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6"><CodeBracketIcon className="w-8 h-8 text-emerald-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Frontend</h3>
              <div className="flex flex-wrap gap-2 mt-4"><span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">React.js</span><span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">Tailwind CSS</span></div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6"><ServerIcon className="w-8 h-8 text-blue-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Backend</h3>
              <div className="flex flex-wrap gap-2 mt-4"><span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">Node.js</span><span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">Express.js</span></div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6"><CircleStackIcon className="w-8 h-8 text-emerald-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Database</h3>
              <div className="flex flex-wrap gap-2 mt-4"><span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">MongoDB</span><span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">Mongoose</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 3: SKILLS SECTION END */}

      {/* STEP 4: PROJECTS SECTION START */}
      <section id="projects" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2><div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[{ icon: <CpuChipIcon className="w-6 h-6" />, title: "AI Content Platform", tag: "SaaS", color: "emerald" },{ icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />, title: "TeamSync Collaboration", tag: "Web Sockets", color: "blue" },{ icon: <ShoppingCartIcon className="w-6 h-6" />, title: "Headless Storefront", tag: "E-Commerce", color: "emerald" }].map((proj, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className={`w-12 h-12 bg-${proj.color}-50 text-${proj.color}-600 rounded-xl flex items-center justify-center mb-6`}>{proj.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{proj.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">An AI-powered platform that generates marketing copy and blogs. Features user auth, credit-based billing, and a rich text editor.</p>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100"><span className={`px-3 py-1 bg-${proj.color}-50 text-${proj.color}-700 rounded-md text-xs font-semibold`}>{proj.tag}</span><span className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded-md text-xs font-medium">React</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 4: PROJECTS SECTION END */}

      {/* STEP 5: EXPERIENCE SECTION START */}
      <section id="experience" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Journey</h2><div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div></div>
          <div className="relative border-l-4 border-slate-200 ml-4 md:ml-0">
            <div className="mb-12 relative pl-8 md:pl-10">
              <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full mb-3">Present</span>
                <h3 className="text-xl font-bold text-slate-900">MERN Stack Web Developer</h3>
                <p className="text-sm font-semibold text-slate-500 mb-4">8 Years of Experience</p>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">This 8-year journey is filled with a thousand obstacles, failures, and moments of despair. I spent countless sleepless nights, shed tears, and lost faith in myself. There were a thousand reasons to give up, but I never surrendered. Today, I can proudly say that all those struggles are the foundation of where I stand now.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 5: EXPERIENCE SECTION END */}

      {/* ========================================== */}
      {/* STEP 6: CONTACT SECTION START (Gmail UI)   */}
      {/* ========================================== */}
      <section id="contact" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-8 sm:p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's build something great together.</h2>
                  <div className="space-y-6 mt-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0"><EnvelopeIcon className="w-6 h-6" /></div>
                      <a href={emailLink} target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-emerald-400 transition-colors text-sm sm:text-base break-all">muhammadsaifaulgazi@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 sm:p-10 md:p-16">
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={contactData.name}
                    onChange={(e) => setContactData({...contactData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none text-sm sm:text-base" 
                  />
                  <input 
                    type="email" 
                    placeholder="you@email.com" 
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none text-sm sm:text-base" 
                  />
                  <textarea 
                    rows="4" 
                    placeholder="How can I help you?" 
                    value={contactData.message}
                    onChange={(e) => setContactData({...contactData, message: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none resize-none text-sm sm:text-base"
                  ></textarea>
                  <button 
                    type="submit" 
                    className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 6: CONTACT SECTION END */}

      {/* STEP 7: STATS SECTION START */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div><h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">8+</h3><p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase mt-1">Experience</p></div>
            <div><h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600">50+</h3><p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase mt-1">Projects</p></div>
            <div><h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-600">30+</h3><p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase mt-1">Clients</p></div>
            <div><h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-500">100%</h3><p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase mt-1">Satisfaction</p></div>
          </div>
        </div>
      </section>
      {/* STEP 7: STATS SECTION END */}

      {/* STEP 8: SERVICES SECTION START */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Premium Services</h2><div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[{ icon: <DevicePhoneMobileIcon className="w-7 h-7" />, title: "Web Design", color: "emerald" },{ icon: <CodeBracketIcon className="w-7 h-7" />, title: "Web Dev", color: "blue" },{ icon: <ShieldCheckIcon className="w-7 h-7" />, title: "API Security", color: "emerald" },{ icon: <RocketLaunchIcon className="w-7 h-7" />, title: "SEO", color: "emerald" }].map((srv, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 group">
                <div className={`w-14 h-14 bg-${srv.color}-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-${srv.color}-600 transition-colors`}><div className={`text-${srv.color}-600 group-hover:text-white transition-colors`}>{srv.icon}</div></div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{srv.title}</h3>
                <p className="text-slate-500 text-sm">High-quality professional services tailored to your business needs.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 8: SERVICES SECTION END */}

      {/* STEP 9: WORK PROCESS SECTION START */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 sm:mb-16">How I Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
            {["Discovery", "Design", "Develop", "Deploy"].map((step, i) => (
              <div key={i} className="bg-white flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-50 border-4 border-white shadow-xl rounded-full flex items-center justify-center mb-4 sm:mb-6"><span className={`text-xl sm:text-2xl font-black ${i === 0 || i === 3 ? 'text-emerald-600' : 'text-blue-600'}`}>0{i+1}</span></div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 9: WORK PROCESS SECTION END */}

      {/* STEP 10: TECH ARSENAL SECTION START */}
      <section className="py-20 sm:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 sm:mb-12">My Tech Arsenal</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {["React", "Next.js", "Node.js", "Express", "MongoDB", "Redux", "Tailwind", "JWT", "Socket.io", "Git", "Vercel", "Figma"].map((tech, i) => (
              <div key={i} className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-xl hover:bg-emerald-600 transition-all cursor-default text-sm sm:text-base"><span className="font-semibold">{tech}</span></div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 10: TECH ARSENAL SECTION END */}

      {/* STEP 11: TESTIMONIALS SECTION START */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 sm:mb-12">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[{ name: "Sarah Jenkins", role: "Product Manager, FinTech", text: "Working with Gazi was seamless. He refactored our legacy API to a modern Node.js architecture, reducing response times by 40%." },{ name: "David Chen", role: "Founder, StartupX", text: "His attention to UI/UX detail is unmatched. Gazi built our entire React frontend from scratch, and our conversion rate doubled." },{ name: "Amina Rahman", role: "CTO, HealthTech BD", text: "A true professional. Gazi implemented robust JWT authentication and secured our MongoDB cluster. Highly recommended." }].map((review, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 text-left flex flex-col">
                <p className="text-slate-600 italic mb-6 flex-1 text-sm sm:text-base">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">{review.name.charAt(0)}</div>
                  <div><h4 className="font-bold text-slate-900 text-sm">{review.name}</h4><p className="text-xs text-slate-500">{review.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 11: TESTIMONIALS SECTION END */}

      {/* STEP 12: GLOBAL REACH SECTION START */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-emerald-50 rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 sm:mb-6">Working with clients worldwide.</h2>
              <p className="text-slate-600 text-sm sm:text-lg mb-6 sm:mb-8">Distance is no barrier. I collaborate seamlessly with businesses across the globe.</p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 border-[8px] sm:border-[12px] border-emerald-600 rounded-full flex items-center justify-center relative"><GlobeAltIcon className="w-12 h-12 sm:w-20 sm:h-20 text-emerald-600" /></div>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 12: GLOBAL REACH SECTION END */}

      {/* STEP 13: OPEN SOURCE / GITHUB START */}
      <section className="py-20 sm:py-24 bg-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 sm:mb-8">Open Source Activity</h2>
          <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className={`h-3 sm:h-4 rounded-sm ${Math.random() > 0.5 ? "bg-emerald-500" : Math.random() > 0.3 ? "bg-emerald-300" : "bg-slate-100"}`}></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* STEP 13: OPEN SOURCE / GITHUB END */}

      {/* STEP 14: FAQ SECTION START */}
      <section className="py-20 sm:py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 sm:mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            {["What is your typical timeline?", "Do you provide post-launch support?", "Will my website be responsive?"].map((q, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2"><span className="text-emerald-600 mr-2">Q.</span>{q}</h4>
                <p className="text-slate-600 pl-6 text-sm sm:text-base">Depending on complexity, a standard web app takes 2-4 weeks. I provide 1 month free bug-fixing support.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 14: FAQ SECTION END */}

      {/* STEP 15: LATEST ARTICLES START */}
      <section className="py-20 sm:py-24 bg-slate-50 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 sm:mb-12">Latest Tech Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[{ title: "Optimizing React Re-renders with useMemo", date: "Oct 15, 2026", tag: "React", desc: "A deep dive into preventing unnecessary renders in complex component trees." },{ title: "MongoDB Aggregation Pipeline: A Guide", date: "Oct 10, 2026", tag: "Database", desc: "How to master $lookup and $group for efficient data processing in large-scale apps." },{ title: "Securing Node.js APIs with Rate Limiting", date: "Sep 28, 2026", tag: "Backend", desc: "Protect your Express servers from DDoS attacks using Redis and express-rate-limit." }].map((blog, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 text-left group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="h-32 sm:h-40 bg-slate-100 relative p-4 sm:p-6 flex flex-col justify-end">
                  <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">{blog.tag}</div>
                  <ChartBarIcon className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-sm text-slate-500 mb-2">{blog.date}</p>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 mb-3">{blog.title}</h3>
                  <p className="text-sm text-slate-600">{blog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 15: LATEST ARTICLES END */}

      {/* STEP 16: BIG CTA SECTION START */}
      <section className="py-20 sm:py-24 bg-slate-900 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6">Ready to turn your <span className="text-emerald-500">vision</span> into reality?</h2>
          <a href="#contact" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30">Start a Project</a>
        </div>
      </section>
      {/* STEP 16: BIG CTA SECTION END */}

      {/* STEP 17: WHY CHOOSE ME START */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Me?</h2><div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[{ title: "Fast Delivery", desc: "I value your time. Expect rapid development without compromising quality." },{ title: "Clean Code", desc: "Scalable, well-documented, and maintainable code architecture." },{ title: "100% Satisfaction", desc: "I don't stop until you are completely happy with the result." },{ title: "Dedicated Support", desc: "Available 24/7 for any queries or post-launch maintenance." }].map((item, i) => (
              <div key={i} className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform"><CheckCircleIcon className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 17: WHY CHOOSE ME END */}

      {/* STEP 18: PROBLEM VS SOLUTION START */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Problem & My Solution</h2><div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-slate-100 border border-slate-200 p-6 sm:p-10 rounded-3xl">
              <div className="flex items-center gap-3 mb-6 sm:mb-8"><div className="p-2 sm:p-3 bg-slate-300 text-slate-700 rounded-xl"><ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6" /></div><h3 className="text-xl sm:text-2xl font-bold text-slate-900">Common Problems</h3></div>
              <ul className="space-y-4 sm:space-y-6">{["Slow loading websites", "Poor mobile responsiveness", "Vulnerable security protocols", "Hard-to-maintain spaghetti code"].map((p, i) => (<li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm sm:text-base"><span className="text-slate-500 font-bold shrink-0">✗</span> {p}</li>))}</ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-6 sm:p-10 rounded-3xl">
              <div className="flex items-center gap-3 mb-6 sm:mb-8"><div className="p-2 sm:p-3 bg-emerald-200 text-emerald-700 rounded-xl"><CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" /></div><h3 className="text-xl sm:text-2xl font-bold text-emerald-900">My Solutions</h3></div>
              <ul className="space-y-4 sm:space-y-6">{["Blazing fast 90+ Lighthouse scores", "100% mobile-first design", "Robust JWT authentication", "Clean, modular, and scalable code"].map((p, i) => (<li key={i} className="flex items-start gap-3 text-emerald-800 font-medium text-sm sm:text-base"><span className="text-emerald-500 font-bold shrink-0">✓</span> {p}</li>))}</ul>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 18: PROBLEM VS SOLUTION END */}

      {/* STEP 19: PRICING PLANS START */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Flexible Pricing Packages</h2><div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div key={i} onClick={() => setSelectedPlan(plan.name)} className={`relative p-6 sm:p-8 rounded-3xl border cursor-pointer transition-all duration-300 ${selectedPlan === plan.name ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105 bg-white' : 'border-slate-200 bg-white hover:border-emerald-300'}`}>
                {plan.popular && (<span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Most Popular</span>)}
                <div className="text-center mb-6 sm:mb-8"><h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3><div className="text-4xl font-extrabold text-slate-900">{plan.price}</div></div>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">{plan.features.map((f, j) => (<li key={j} className="flex items-center gap-3 text-slate-600 text-sm font-medium"><CheckCircleIcon className={`w-5 h-5 shrink-0 ${selectedPlan === plan.name ? 'text-emerald-500' : 'text-slate-400'}`} /> {f}</li>))}</ul>
                <a href={`https://wa.me/8801907823654?text=${encodeURIComponent(`Hi Gazi, I am interested in the ${plan.name} Plan (${plan.price}).`)}`} target="_blank" rel="noopener noreferrer" className={`block text-center w-full py-3 rounded-xl font-bold transition ${selectedPlan === plan.name ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>Choose Plan</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 19: PRICING PLANS END */}

      {/* STEP 20: INDUSTRY EXPERTISE START */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Industry Expertise</h2><div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {["E-Commerce", "Healthcare", "FinTech", "Education", "Real Estate", "SaaS Startups", "Logistics", "Media"].map((ind, i) => (
              <div key={i} className="bg-white p-4 sm:p-6 rounded-xl text-center shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all cursor-default"><span className="font-bold text-slate-700 text-sm sm:text-base">{ind}</span></div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 20: INDUSTRY EXPERTISE END */}

      {/* STEP 21: SECURITY & COMPLIANCE START */}
      <section className="py-20 sm:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Compliance</h2><div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[{ icon: <LockClosedIcon className="w-8 h-8" />, title: "Data Encryption", desc: "End-to-end encryption for all sensitive user data." },{ icon: <ShieldCheckIcon className="w-8 h-8" />, title: "GDPR Ready", desc: "Fully compliant with global privacy regulations." },{ icon: <ExclamationTriangleIcon className="w-8 h-8" />, title: "Threat Protection", desc: "Protection against SQL injection, XSS, and CSRF attacks." }].map((sec, i) => (
              <div key={i} className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                <div className="text-emerald-500 mb-6">{sec.icon}</div><h3 className="text-xl font-bold mb-3">{sec.title}</h3><p className="text-slate-400 text-sm">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 21: SECURITY & COMPLIANCE END */}

      {/* STEP 22: CODING MILESTONES START */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Coding Milestones</h2><div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div></div>
          <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {[{ year: "2024", title: "1 Million Lines of Code", desc: "Reached a massive milestone in written code." },{ year: "2022", title: "Senior Developer Role", desc: "Led a team of 5 developers on a SaaS project." },{ year: "2018", title: "First Freelance Client", desc: "Started the journey of independent consulting." }].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"><CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                  <span className="text-emerald-600 font-bold text-sm">{item.year}</span><h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{item.title}</h3><p className="text-slate-600 text-xs sm:text-sm mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 22: CODING MILESTONES END */}

      {/* STEP 23: PERFORMANCE BENCHMARKS START */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Performance Benchmarks</h2>
          <p className="text-slate-600 mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">I build lightning-fast applications optimized for modern browsers, ensuring 100% user satisfaction.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[{ score: "100", label: "Performance" },{ score: "100", label: "Accessibility" },{ score: "100", label: "Best Practices" },{ score: "100", label: "SEO" }].map((item, i) => (
              <div key={i} className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center rounded-full border-4 border-emerald-500 mb-4"><span className="text-xl sm:text-2xl font-black text-emerald-600">{item.score}</span></div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STEP 23: PERFORMANCE BENCHMARKS END */}

      {/* STEP 24: AVAILABILITY STATUS START */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-emerald-500 font-bold mb-3 uppercase tracking-widest text-xs sm:text-sm"><span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span> Currently Available</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to start your project?</h2>
              <p className="text-slate-400 text-sm sm:text-base">I have slots open for 2 new clients this month.</p>
            </div>
            <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition whitespace-nowrap cursor-pointer w-full md:w-auto">Book a Call</a>
          </div>
        </div>
      </section>
      {/* STEP 24: AVAILABILITY STATUS END */}

      {/* STEP 25: LET'S CONNECT START */}
      <section className="py-20 sm:py-24 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <GlobeAltIcon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-200 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-emerald-100 mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base">Have a project in mind or just want to say hi? I am always open to discussing new ideas and opportunities.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href={emailLink} target="_blank" rel="noreferrer" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 text-sm sm:text-base"><EnvelopeIcon className="w-5 h-5" /> Email Me</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2 text-sm sm:text-base"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> WhatsApp</a>
            <a href="https://github.com/installGazi" target="_blank" rel="noreferrer" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 text-sm sm:text-base"><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg> GitHub</a>
          </div>
        </div>
      </section>
      {/* STEP 25: LET'S CONNECT END */}

      {/* STEP 26: ULTIMATE GREEN CTA START */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6">Let's Create Something Iconic.</h2>
              <p className="text-emerald-100 text-sm sm:text-lg mb-6 sm:mb-10 max-w-2xl mx-auto">Your competitors are already online. Don't get left behind. Let's build your digital empire today.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3 sm:py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-2xl w-full sm:w-auto text-sm sm:text-base">Get Started Now <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" /></a>
            </div>
          </div>
        </div>
      </section>
      {/* STEP 26: ULTIMATE GREEN CTA END */}

      {/* STEP 27: FOOTER SECTION START */}
      <footer className="bg-slate-950 text-slate-400 pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                <span className="bg-emerald-600 text-white p-1.5 rounded-lg flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg></span>
                install_Gazi
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed">একজন MERN স্ট্যাক ডেভেলপার হিসেবে আমি আধুনিক ও স্কেলেবল ওয়েব অ্যাপ্লিকেশন তৈরি করি। ক্লিন কোড এবং চমৎকার ইউজার এক্সপেরিয়েন্স আমার প্রথম প্রায়োরিটি।</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">দ্রুত লিংক</h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#home" className="hover:text-emerald-400 transition">হোম (Home)</a></li>
                <li><a href="#about" className="hover:text-emerald-400 transition">আমার সম্পর্কে (About)</a></li>
                <li><a href="#projects" className="hover:text-emerald-400 transition">প্রজেক্ট (Projects)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">অ্যাকাউন্ট</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/login" className="hover:text-emerald-400 transition">লগইন (Login)</Link></li>
                <li><Link to="/register" className="hover:text-emerald-400 transition">রেজিস্টার (Register)</Link></li>
                <li><Link to="/profile" className="hover:text-emerald-400 transition">প্রোফাইল (Profile)</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">যোগাযোগ</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                  <a href={emailLink} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition text-slate-500 break-all">muhammadsaifaulgazi@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-500">
            <p>© {new Date().getFullYear()} install_Gazi। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
      {/* STEP 27: FOOTER SECTION END */}

      {/* GLOBAL NEWS FLOATING STICKER START */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999]">
        <Link to="/globalnews" className="group relative flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white text-slate-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] border-2 border-slate-100 animate-bounce hover:animate-none hover:scale-110 hover:border-emerald-400 hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-all duration-300" style={{ animationDuration: '2s' }}>
          <span className="absolute top-0 right-0 flex h-3 w-3 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
          <span className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">📰</span>
          <span className="text-[8px] sm:text-[9px] font-extrabold text-slate-600 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">News</span>
        </Link>
      </div>
      {/* GLOBAL NEWS FLOATING STICKER END */}
    </div>
  );
};

export default Home;