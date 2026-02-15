import { useState, useEffect, useRef } from 'react';
import {
  Send,
  Plus,
  MessageSquare,
  Sparkles,
  User,
  Clock,
  Trash2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
}

export default function AIChat() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, [user]);

  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation);
    }
  }, [currentConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('id, title, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setConversations(data);
        if (data.length > 0 && !currentConversation) {
          setCurrentConversation(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  const createNewConversation = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: 'New Conversation',
          model: 'gpt-4'
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setConversations([data, ...conversations]);
        setCurrentConversation(data.id);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentConversation || !user) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    try {
      const { data: userMsg, error: userMsgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversation,
          role: 'user',
          content: userMessage,
          tokens: Math.ceil(userMessage.length / 4)
        })
        .select()
        .single();

      if (userMsgError) throw userMsgError;

      if (userMsg) {
        setMessages([...messages, userMsg]);

        const aiResponse = `This is a simulated AI response. In production, this would connect to your AI service of choice (OpenAI, Anthropic, etc.).`;

        const { data: aiMsg, error: aiMsgError } = await supabase
          .from('messages')
          .insert({
            conversation_id: currentConversation,
            role: 'assistant',
            content: aiResponse,
            tokens: Math.ceil(aiResponse.length / 4)
          })
          .select()
          .single();

        if (aiMsgError) throw aiMsgError;

        if (aiMsg) {
          setMessages(prev => [...prev, aiMsg]);
        }

        const { error: trackingError } = await supabase
          .from('usage_tracking')
          .insert({
            user_id: user.id,
            action_type: 'chat',
            tokens_used: Math.ceil((userMessage.length + aiResponse.length) / 4),
            model: 'gpt-4'
          });

        if (trackingError) {
          console.error('Error tracking usage:', trackingError);
        }

        if (messages.length === 0) {
          const { error: updateError } = await supabase
            .from('conversations')
            .update({ title: userMessage.slice(0, 50) })
            .eq('id', currentConversation);

          if (updateError) {
            console.error('Error updating conversation title:', updateError);
          }

          loadConversations();
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setInput(userMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      const { error } = await supabase.from('conversations').delete().eq('id', id);

      if (error) throw error;

      setConversations(conversations.filter(c => c.id !== id));
      if (currentConversation === id) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <div className="flex gap-6 h-full">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white rounded-xl border border-slate-200/50 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <button
              onClick={createNewConversation}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              <Plus size={20} />
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {conversations.length > 0 ? (
              <div className="space-y-1">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      currentConversation === conv.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-slate-50'
                    }`}
                    onClick={() => setCurrentConversation(conv.id)}
                  >
                    <MessageSquare
                      size={18}
                      className={currentConversation === conv.id ? 'text-blue-600' : 'text-slate-400'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900 truncate">
                        {conv.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(conv.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="p-4 bg-slate-50 rounded-full mb-3">
                  <MessageSquare size={32} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-600">No conversations yet</p>
                <p className="text-xs text-slate-500 mt-1">Start a new chat to begin</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200/50 flex flex-col overflow-hidden">
          {currentConversation ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                      <Sparkles size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-slate-600 max-w-md">
                      Ask me anything! I can help with coding, writing, analysis, and more.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          message.role === 'assistant'
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                            : 'bg-gradient-to-br from-violet-500 to-purple-600'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <Sparkles size={20} className="text-white" />
                        ) : (
                          <User size={20} className="text-white" />
                        )}
                      </div>
                      <div
                        className={`flex-1 max-w-3xl ${
                          message.role === 'user' ? 'text-right' : ''
                        }`}
                      >
                        <div
                          className={`inline-block p-4 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                              : 'bg-slate-50 text-slate-900'
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                          <Clock size={12} />
                          {new Date(message.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Type your message..."
                    disabled={loading}
                    className="flex-1 px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-flex p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
                  <MessageSquare size={48} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Select a conversation</h3>
                <p className="text-slate-600">Choose a chat from the sidebar or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
