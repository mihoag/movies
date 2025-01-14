import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProcessingDots from './processing-dot';
import { NavigationDto } from '../../type/navigation/Navigation';
import { apiNavigationAI } from '../../apis/navigationApi';
import { useNavigate } from 'react-router-dom';
import { showError } from '../../util/ErrorToastifyRender';
import { apiGetMovieById } from '../../apis/movieApi';
interface Message {
  type: 'user' | 'bot';
  content: string;
}

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
    }
  };

  const sendMessage = async (text: string) => {
    const newMessage: Message = { type: 'user', content: text };
    setMessages([...messages, newMessage]);
    setMessage('');
    setIsProcessing(true);

    try {
      const response: NavigationDto = await apiNavigationAI(text);
      let content = '';
      let route = window.location.pathname;

      if (response.is_success) {
        const routeRs = response.route;
        if (routeRs === 'HOME_PAGE') {
          content = 'Navigating to the home page';
          route = '/tmdb-frontend';
        } else if (routeRs === 'PROFILE_PAGE') {
          content = 'Navigating to the profile page';
          route = '/tmdb-frontend/profile';
        } else if (routeRs === 'SEARCH_PAGE') {
          ///
          const keyword = response.params as { keyword: string };
          content = 'Navigating to the search page with keyword: ' + keyword.keyword;
          console.log(keyword);
          route = `/tmdb-frontend/search?query=${keyword.keyword}`;
        } else if (routeRs === 'CAST_PAGE') {
          content = 'Navigating to the detail movie page to see full cast';
          const param = response.params as { movie_ids: string[] };
          if (param.movie_ids && param.movie_ids.length > 0) {
            const movieObjectId = param.movie_ids[0];
            try {
              const movie = await apiGetMovieById(movieObjectId);
              route = `/tmdb-frontend/movie/${movie.tmdbId}?#cast`;
            } catch (error) {
              console.error('Failed to fetch movie details', error);
              showError('Failed to fetch movie details');
            }
          }
        } else if (routeRs === 'GENRE_PAGE') {
          // navigate search page
          content = 'Navigating to the search page with genres from your request';
          const param = response.params as { genres_id: string[] };
          const genres = param.genres_id;
          console.log(genres);
        } else if (routeRs === 'MOVIE_PAGE') {
          // navigate to the movie page
          content = 'Navigating to the detail movie page';
          const param = response.params as { movie_ids: string[] };
          if (param.movie_ids && param.movie_ids.length > 0) {
            const movieObjectId = param.movie_ids[0];
            try {
              const movie = await apiGetMovieById(movieObjectId);
              route = `/tmdb-frontend/movie/${movie.tmdbId}`;
            } catch (error) {
              console.error('Failed to fetch movie details', error);
              showError('Failed to fetch movie details');
            }
          }
        } else if (routeRs == 'NONE') {
          content = 'I am sorry, I do not understand what you are saying';
        } else {
          content = 'Failed to navigate to the requested page';
          showError('Failed to navigate to the requested page');
        }
      } else {
        showError('Failed to navigate to the requested page');
      }
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', content: content }]);
      setIsProcessing(false);
      navigate(route);
    } catch (error) {
      console.error('Failed to process the request', error);
      showError('Failed to process the request');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[1100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-4 w-[320px] rounded-[10px] bg-white shadow-lg dark:bg-gray-800 md:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-gradient-to-r from-pink-500 to-purple-600 p-4">
              <div className="flex items-center space-x-2">
                <div className="rounded-[10px] bg-white/90 p-1">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-medium text-white">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-[10px] p-1 hover:bg-white/20">
                <Minimize2 className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={chatAreaRef} className="h-[300px] overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-[10px] p-2 ${
                      msg.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="rounded-[10px] bg-gray-100 p-2 dark:bg-gray-700">
                    <ProcessingDots />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t p-4 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-[10px] border bg-gray-50 px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-purple-600 text-white transition-colors hover:bg-purple-700 disabled:bg-gray-400"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transition-transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <Bot className="h-6 w-6" />
            <motion.div
              className="absolute -right-1 -top-1 h-3 w-3 rounded-[10px] bg-green-500"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default Assistant;
