import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ClockIcon, UserIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

// রিলেটিভ টাইম ফরম্যাট করার ফাংশন
const formatRelativeTime = (dateString) => {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, "minute");
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return rtf.format(-diffInHours, "hour");
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return rtf.format(-diffInDays, "day");
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return rtf.format(-diffInMonths, "month");
  return rtf.format(-Math.floor(diffInMonths / 12), "year");
};

// রিলায়েবল টেক ইমেজের লিস্ট (যদি API থেকে ছবি না আসে)
const staticTechImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600&auto=format&fit=crop",
];

const GlobalNews = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef();
  const lastNewsElementRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // ১. Dev.to API
        const devToRes = await fetch(`https://dev.to/api/articles?tag=javascript&per_page=12&page=${page}`);
        const devToData = await devToRes.json();
        
        // ২. Hacker News API
        const hnRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        const hnIds = await hnRes.json();
        const startIndex = (page - 1) * 10;
        const hnPromises = hnIds.slice(startIndex, startIndex + 10).map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );
        const hnData = await Promise.all(hnPromises);

        // ৩. ডেটা ফরম্যাট করা এবং ইনডেক্স অনুযায়ী স্ট্যাটিক ছবি অ্যাসাইন করা
        const formattedDevTo = devToData.map((item, index) => ({
          id: `dev-${item.id}`,
          title: item.title,
          url: item.url,
          description: item.description,
          image: item.cover_image || staticTechImages[index % staticTechImages.length],
          author: item.user.name,
          time: item.published_at,
          tag: item.tag_list[0] || "Tech",
          source: "Dev.to"
        }));

        const formattedHN = hnData.filter(item => item && item.title).map((item, index) => ({
          id: `hn-${item.id}`,
          title: item.title,
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
          description: "Hacker News Discussion: Click to read the full thread, source code, and comments from top developers.",
          // Hacker News-এর জন্য রিলায়েবল ছবি
          image: staticTechImages[(index + 3) % staticTechImages.length],
          author: item.by,
          time: new Date(item.time * 1000).toISOString(),
          tag: "Hacker News",
          source: "Y Combinator"
        }));

        const combined = [...formattedDevTo, ...formattedHN].sort((a, b) => new Date(b.time) - new Date(a.time));
        
        setNews(prev => [...prev, ...combined]);
        if (combined.length === 0) setHasMore(false);

      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-serif pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-sans text-sm font-bold mb-6 transition">
          <ArrowLeftIcon className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center border-b-4 border-double border-slate-900 pb-6 mb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-slate-900">
            The Global Tech Chronicle
          </h1>
          <div className="flex justify-between items-center text-xs md:text-sm font-sans font-bold uppercase tracking-widest border-t border-slate-300 pt-3 text-slate-600">
            <span>Vol. 1, No. {page}</span>
            <span>{today}</span>
            <span className="text-emerald-600">Global Edition</span>
          </div>
        </div>

        <div className="bg-emerald-600 text-white font-sans p-2 mb-8 overflow-hidden whitespace-nowrap shadow-sm">
          <p className="animate-pulse font-bold text-sm tracking-widest uppercase">
            ⚡ Breaking News: Real-time updates from Hacker News, Dev.to, and the global developer ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <article 
              key={article.id} 
              ref={index === news.length - 1 ? lastNewsElementRef : null}
              className="flex flex-col border-b border-slate-200 pb-6"
            >
              
              <div className="relative overflow-hidden rounded-sm mb-4 bg-slate-100">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                
                {/* ছবির ওপর সোর্স ব্যাজ */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-sans font-black text-slate-800 uppercase tracking-wider shadow-sm border border-slate-200">
                  {article.source}
                </div>
              </div>

              <div className="flex items-center justify-between mb-2 font-sans">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  {article.tag}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {formatRelativeTime(article.time)}
                </span>
              </div>

              <a href={article.url} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                <h2 className={`font-bold leading-tight mb-2 ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                  {article.title}
                </h2>
              </a>

              <p className="text-slate-500 text-sm font-sans mb-4 flex-1 line-clamp-3">
                {article.description || "Read the full article for more details."}
              </p>

              <div className="flex items-center gap-4 text-xs font-sans text-slate-400 mt-auto pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5" /> {article.author}</span>
              </div>

            </article>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-12 mb-8">
            <ArrowPathIcon className="w-8 h-8 text-emerald-600 animate-spin" />
            <span className="ml-3 font-sans font-bold text-slate-600">Fetching more news...</span>
          </div>
        )}

        {!hasMore && !loading && (
          <div className="text-center mt-12 mb-8 font-sans text-slate-500 font-bold">
            You have reached the end of the newspaper for today.
          </div>
        )}

      </div>
    </div>
  );
};

export default GlobalNews;