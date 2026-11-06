import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { PaperAirplaneIcon, UserCircleIcon, ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import api from "../utils/api";

// অটোমেটিক URL ডিটেকশন
const SOCKET_URL = import.meta.env.MODE === "production" 
  ? "https://smart-biz-suite-express-js.onrender.com" 
  : "http://localhost:5000";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/chat/conversations");
      setConversations(res.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    const adminCheck = user?.role === "admin";
    setIsAdmin(adminCheck);

    const token = localStorage.getItem("token");
    if (!token || !user) return;

    const newSocket = io(SOCKET_URL, { auth: { token } });
    setSocket(newSocket);

    newSocket.on("receiveMessage", (message) => {
      setMessages((prev) => {
        if (prev.some(m => m._id === message._id)) return prev;
        return [...prev, message];
      });
      if (adminCheck) fetchConversations();
    });

    newSocket.on("messageSent", (message) => {
      setMessages((prev) => {
        if (prev.some(m => m._id === message._id)) return prev;
        return [...prev, message];
      });
    });

    let interval;
    if (adminCheck) {
      fetchConversations();
      interval = setInterval(() => {
        fetchConversations();
      }, 3000); 
    }

    return () => {
      newSocket.close();
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentUser || isAdmin) return;

    const initClientChat = async () => {
      setLoading(true);
      try {
        const adminRes = await api.get("/chat/admin-details");
        const convRes = await api.post("/chat/conversation", { receiverId: adminRes.data._id });
        setActiveConversation(convRes.data);
      } catch (error) {
        console.error("Error initializing chat:", error);
      } finally {
        setLoading(false);
      }
    };
    initClientChat();
  }, [currentUser, isAdmin]);

  useEffect(() => {
    if (isAdmin) setLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    if (!activeConversation) return;
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/messages/${activeConversation._id}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };
    fetchMessages();
  }, [activeConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !activeConversation) return;

    const receiver = activeConversation.participants.find(p => p._id !== currentUser._id);
    
    socket.emit("sendMessage", {
      conversationId: activeConversation._id,
      text: newMessage,
      receiverId: receiver?._id,
    });
    setNewMessage("");
  };

  const handleDeleteConversation = async (e, convId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this conversation? This will delete all messages permanently.")) return;
    
    try {
      await api.delete(`/chat/conversation/${convId}`);
      setConversations(prev => prev.filter(c => c._id !== convId));
      if (activeConversation?._id === convId) {
        setActiveConversation(null);
      }
      toast.success("Conversation deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete conversation");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[75vh]">
        
        {isAdmin && (
          <div className={`w-full md:w-1/3 border-r border-slate-200 flex-col ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 bg-slate-900 text-white font-bold text-lg">All Clients</div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <p className="p-4 text-slate-500 text-center">No clients yet.</p>
              ) : (
                conversations.map((conv) => {
                  const client = conv.participants.find(p => p.role !== "admin");
                  return (
                    <div 
                      key={conv._id} 
                      onClick={() => setActiveConversation(conv)}
                      className={`group p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition flex justify-between items-center ${activeConversation?._id === conv._id ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''}`}
                    >
                      <div className="flex items-center gap-3 flex-1 overflow-hidden">
                         <div className="w-10 h-10 shrink-0 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                           {client?.name?.charAt(0) || "U"}
                         </div>
                         <div className="overflow-hidden">
                           <h3 className="font-bold text-slate-800 text-sm truncate">{client?.name || "Unknown Client"}</h3>
                           <p className="text-xs text-slate-500 truncate">{conv.lastMessage || "New Chat"}</p>
                         </div>
                      </div>
                      
                      <button 
                        onClick={(e) => handleDeleteConversation(e, conv._id)}
                        className="text-slate-300 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Conversation"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        <div className={`flex-1 flex-col ${!activeConversation && isAdmin ? 'hidden md:flex' : 'flex'}`}>
          
          {activeConversation ? (
            <>
              <div className="bg-slate-900 px-4 py-3 flex items-center gap-3 border-b border-slate-800">
                {isAdmin && (
                   <button onClick={() => setActiveConversation(null)} className="md:hidden text-white mr-2">
                     <ArrowLeftIcon className="w-5 h-5" />
                   </button>
                )}
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {isAdmin 
                    ? activeConversation.participants.find(p => p.role !== "admin")?.name?.charAt(0) || "U" 
                    : "G"}
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">
                    {isAdmin 
                      ? activeConversation.participants.find(p => p.role !== "admin")?.name || "Unknown Client" 
                      : "Gazi Saiful (Owner)"}
                  </h2>
                  <p className="text-emerald-400 text-xs font-semibold">Online</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.length === 0 && (
                  <div className="text-center text-slate-400 mt-20">
                    <UserCircleIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>No messages yet.</p>
                  </div>
                )}

                {messages.map((msg, index) => {
                  const senderId = msg.sender?._id || msg.sender;
                  const isMine = senderId === currentUser?._id;

                  return (
                    <div key={msg._id || index} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                          isMine ? "bg-emerald-600 text-white rounded-br-sm" : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm"
                        }`}>
                        <p>{msg.text}</p>
                        <span className={`block text-[10px] mt-1 text-right ${isMine ? "text-emerald-200" : "text-slate-400"}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
                <button type="submit" disabled={!newMessage.trim()} className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50">
                  <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
                </button>
              </form>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50 text-slate-400">
              <p>Select a client to start chatting</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Chat;