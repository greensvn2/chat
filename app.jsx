import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Clock, Smile, Search, Moon, Sun, Users, Trash2, Edit2, Copy, Check, X, Reply, MoreVertical, Image, Paperclip, Phone, Video, Mic, Download, Upload, Pin, Hash, Lock, Globe, Bell, BellOff, Filter, Star, Archive, Forward, Flag, Volume2, Play, Pause, MessageSquare, Settings, LogOut, UserPlus, Shield, Gift, Zap, Heart, ThumbsUp, Laugh, PartyPopper, Eye, EyeOff, ChevronDown, ChevronUp, Bold, Italic, Code, Link, List, AlertCircle, CheckCircle2, Music, Map, Calendar, BarChart3, CheckCheck, Bookmark, AlertTriangle, Info, Camera, FileText, Headphones, Award, TrendingUp, Activity, Wifi, WifiOff } from 'lucide-react';

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'];
const EMOJIS = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '😍', '🤔', '👏', '🙌', '💪', '✨', '🚀', '⭐', '💯', '🎊', '🎈', '😎', '🤗', '💖', '😀', '🥳', '💡', '🎯', '🌟', '😭', '🤣', '😘', '🥰', '😇'];
const GIFS = ['🎭', '🎪', '🎨', '🎬', '🎮', '🎯', '🎲', '🎳', '🎰', '🎺', '🎸', '🎹', '🎻', '🎤', '🎧', '🎵'];
const STATUS_OPTIONS = ['🟢 Online', '🟡 Away', '🔴 Busy', '⚫ Offline', '🌙 Sleep', '☕ Coffee', '💼 Working', '🎮 Gaming', '📚 Studying', '🍕 Eating', '🏃 Exercising', '✈️ Traveling'];
const ROOMS = ['general', 'random', 'gaming', 'music', 'tech', 'memes', 'news', 'food', 'sports', 'movies'];
const THEMES = {
  default: 'from-blue-500 via-purple-600 to-pink-500',
  ocean: 'from-cyan-500 via-blue-600 to-indigo-500',
  sunset: 'from-orange-500 via-red-500 to-pink-600',
  forest: 'from-green-500 via-emerald-600 to-teal-500',
  royal: 'from-purple-600 via-violet-600 to-fuchsia-600',
  fire: 'from-red-600 via-orange-500 to-yellow-500'
};

export default function UltraChatPro() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userColor, setUserColor] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [userProfile, setUserProfile] = useState({ bio: '', status: '🟢 Online', avatar: '' });
  const [showProfile, setShowProfile] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [showPinned, setShowPinned] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [filter, setFilter] = useState('all');
  const [polls, setPolls] = useState([]);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [messageTemplates, setMessageTemplates] = useState(['Chào mọi người! 👋', 'Cảm ơn bạn! 🙏', 'Được rồi! 👍', 'Có vấn đề gì không? 🤔', 'Hẹn gặp lại! 👋', 'Đồng ý! ✅']);
  const [showTemplates, setShowTemplates] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [showMentions, setShowMentions] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [userStats, setUserStats] = useState({ messagesSent: 0, reactionsGiven: 0, activeTime: 0 });
  const [theme, setTheme] = useState('default');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [drafts, setDrafts] = useState({});
  const [messageReactions, setMessageReactions] = useState({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showUserProfile, setShowUserProfile] = useState(null);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [showPrivateChat, setShowPrivateChat] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showTypingIndicator, setShowTypingIndicator] = useState(true);
  const [messageLimit, setMessageLimit] = useState(100);
  const [customEmojis, setCustomEmojis] = useState([]);
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [showVoicePlayer, setShowVoicePlayer] = useState(null);
  const [bookmarkedMessages, setBookmarkedMessages] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const lastMessageCountRef = useRef(0);
  const recordingIntervalRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const contextMenuRef = useRef(null);

  const getAvatarColor = (name) => {
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return COLORS[index % COLORS.length];
  };

  const scrollToBottom = (smooth = true) => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
    if (isNearBottom) {
      setUnreadCount(0);
      markMessagesAsRead();
    }
  };

  const playNotificationSound = () => {
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.log('Audio not supported');
      }
    }
  };

  const showDesktopNotification = (msg) => {
    if (notifications && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(`${msg.sender} trong #${currentRoom}`, {
        body: msg.text,
        icon: '💬',
        tag: msg.id
      });
    }
  };

  useEffect(() => {
    if (notifications && typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [notifications]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    loadMessages();
    loadPinnedMessages();
    loadPolls();
    loadUserProfile();
    loadBlockedUsers();
    loadFavorites();
    loadBookmarks();
    loadDraft();
    updateOnlineStatus(true);
    
    const interval = setInterval(() => {
      loadMessages();
      loadOnlineUsers();
      loadTypingUsers();
      loadPolls();
    }, 2000);
    
    return () => {
      clearInterval(interval);
      updateOnlineStatus(false);
      saveDraft();
    };
  }, [isLoggedIn, currentRoom]);

  useEffect(() => {
    if (messages.length > lastMessageCountRef.current) {
      const newMessages = messages.slice(lastMessageCountRef.current);
      newMessages.forEach(msg => {
        if (msg.sender !== username && !blockedUsers.includes(msg.sender)) {
          playNotificationSound();
          showDesktopNotification(msg);
        }
      });
      
      const container = messagesContainerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        if (isNearBottom || autoScroll) {
          scrollToBottom();
        } else {
          setUnreadCount(prev => prev + newMessages.length);
        }
      }
    }
    lastMessageCountRef.current = messages.length;
  }, [messages, username, blockedUsers, autoScroll]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setShowContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadMessages = async () => {
    try {
      const result = await window.storage.get(`chat-messages-${currentRoom}`, true);
      if (result) {
        let loadedMessages = JSON.parse(result.value);
        if (messageLimit > 0) {
          loadedMessages = loadedMessages.slice(-messageLimit);
        }
        setMessages(loadedMessages.filter(m => !blockedUsers.includes(m.sender)));
      }
    } catch (error) {
      setMessages([]);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      let messagesToSave = newMessages;
      if (messageLimit > 0 && newMessages.length > messageLimit) {
        messagesToSave = newMessages.slice(-messageLimit);
      }
      await window.storage.set(`chat-messages-${currentRoom}`, JSON.stringify(messagesToSave), true);
    } catch (error) {
      console.error('Lỗi lưu tin nhắn:', error);
    }
  };

  const loadPinnedMessages = async () => {
    try {
      const result = await window.storage.get(`pinned-${currentRoom}`, true);
      if (result) {
        setPinnedMessages(JSON.parse(result.value));
      }
    } catch (error) {
      setPinnedMessages([]);
    }
  };

  const savePinnedMessages = async (pinned) => {
    try {
      await window.storage.set(`pinned-${currentRoom}`, JSON.stringify(pinned), true);
    } catch (error) {
      console.error('Lỗi lưu tin nhắn đã ghim');
    }
  };

  const loadPolls = async () => {
    try {
      const result = await window.storage.get(`polls-${currentRoom}`, true);
      if (result) {
        setPolls(JSON.parse(result.value));
      }
    } catch (error) {
      setPolls([]);
    }
  };

  const savePolls = async (newPolls) => {
    try {
      await window.storage.set(`polls-${currentRoom}`, JSON.stringify(newPolls), true);
    } catch (error) {
      console.error('Lỗi lưu polls');
    }
  };

  const loadUserProfile = async () => {
    try {
      const result = await window.storage.get(`profile-${username}`, true);
      if (result) {
        setUserProfile(JSON.parse(result.value));
      }
    } catch (error) {
      // Profile not found
    }
  };

  const saveUserProfile = async (profile) => {
    try {
      await window.storage.set(`profile-${username}`, JSON.stringify(profile), true);
      updateOnlineStatus(true);
    } catch (error) {
      console.error('Error saving profile');
    }
  };

  const loadBlockedUsers = async () => {
    try {
      const result = await window.storage.get(`blocked-${username}`);
      if (result) {
        setBlockedUsers(JSON.parse(result.value));
      }
    } catch (error) {
      setBlockedUsers([]);
    }
  };

  const saveBlockedUsers = async (blocked) => {
    try {
      await window.storage.set(`blocked-${username}`, JSON.stringify(blocked));
    } catch (error) {
      console.error('Error saving blocked users');
    }
  };

  const loadFavorites = async () => {
    try {
      const result = await window.storage.get(`favorites-${username}-${currentRoom}`);
      if (result) {
        setFavorites(JSON.parse(result.value));
      }
    } catch (error) {
      setFavorites([]);
    }
  };

  const saveFavorites = async (favs) => {
    try {
      await window.storage.set(`favorites-${username}-${currentRoom}`, JSON.stringify(favs));
    } catch (error) {
      console.error('Error saving favorites');
    }
  };

  const loadBookmarks = async () => {
    try {
      const result = await window.storage.get(`bookmarks-${username}`);
      if (result) {
        setBookmarkedMessages(JSON.parse(result.value));
      }
    } catch (error) {
      setBookmarkedMessages([]);
    }
  };

  const saveBookmarks = async (bookmarks) => {
    try {
      await window.storage.set(`bookmarks-${username}`, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks');
    }
  };

  const loadDraft = async () => {
    try {
      const result = await window.storage.get(`draft-${username}-${currentRoom}`);
      if (result) {
        setInputText(result.value);
      }
    } catch (error) {
      // No draft
    }
  };

  const saveDraft = async () => {
    if (inputText.trim()) {
      try {
        await window.storage.set(`draft-${username}-${currentRoom}`, inputText);
      } catch (error) {
        console.error('Error saving draft');
      }
    } else {
      try {
        await window.storage.delete(`draft-${username}-${currentRoom}`);
      } catch (error) {
        // Draft not found
      }
    }
  };

  const updateOnlineStatus = async (isOnline) => {
    try {
      const data = { timestamp: Date.now(), status: userProfile.status, avatar: userProfile.avatar, color: userColor };
      if (isOnline) {
        await window.storage.set(`online:${username}`, JSON.stringify(data), true);
      } else {
        await window.storage.delete(`online:${username}`, true);
      }
    } catch (error) {
      console.error('Error updating status');
    }
  };

  const loadOnlineUsers = async () => {
    try {
      const result = await window.storage.list('online:', true);
      if (result && result.keys) {
        const now = Date.now();
        const activeUsers = [];
        for (const key of result.keys) {
          const user = key.replace('online:', '');
          try {
            const userData = await window.storage.get(key, true);
            if (userData) {
              const data = JSON.parse(userData.value);
              if (now - data.timestamp < 10000) {
                activeUsers.push({ name: user, ...data });
              }
            }
          } catch (e) {
            // Skip invalid user
          }
        }
        setOnlineUsers(activeUsers);
      }
    } catch (error) {
      setOnlineUsers([]);
    }
  };

  const setTypingStatus = async (typing) => {
    try {
      if (typing) {
        await window.storage.set(`typing:${username}:${currentRoom}`, Date.now().toString(), true);
      } else {
        await window.storage.delete(`typing:${username}:${currentRoom}`, true);
      }
    } catch (error) {
      console.error('Error setting typing status');
    }
  };

  const loadTypingUsers = async () => {
    try {
      const result = await window.storage.list(`typing:`, true);
      if (result && result.keys) {
        const now = Date.now();
        const typing = [];
        for (const key of result.keys) {
          if (key.endsWith(`:${currentRoom}`)) {
            const user = key.replace('typing:', '').replace(`:${currentRoom}`, '');
            if (user !== username) {
              try {
                const data = await window.storage.get(key, true);
                if (data && now - parseInt(data.value) < 3000) {
                  typing.push(user);
                }
              } catch (e) {
                // Skip
              }
            }
          }
        }
        setTypingUsers(typing);
      }
    } catch (error) {
      setTypingUsers([]);
    }
  };

  const markMessagesAsRead = async () => {
    if (!readReceipts) return;
    try {
      const unreadMessages = messages.filter(m => m.sender !== username && !m.readBy?.includes(username));
      if (unreadMessages.length > 0) {
        const updatedMessages = messages.map(msg => {
          if (msg.sender !== username) {
            const readBy = msg.readBy || [];
            if (!readBy.includes(username)) {
              return { ...msg, readBy: [...readBy, username] };
            }
          }
          return msg;
        });
        setMessages(updatedMessages);
        await saveMessages(updatedMessages);
      }
    } catch (error) {
      console.error('Error marking messages as read');
    }
  };

  const handleLogin = () => {
    if (username.trim() && username.length >= 2 && username.length <= 20) {
      const color = getAvatarColor(username);
      setUserColor(color);
      setIsLoggedIn(true);
      setUserStats({ messagesSent: 0, reactionsGiven: 0, activeTime: Date.now() });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    
    const words = value.split(' ');
    const lastWord = words[words.length - 1];
    if (lastWord.startsWith('@')) {
      const query = lastWord.slice(1).toLowerCase();
      const suggestions = onlineUsers.filter(u => u.name.toLowerCase().startsWith(query) && u.name !== username);
      setMentionSuggestions(suggestions);
      setShowMentions(suggestions.length > 0);
    } else {
      setShowMentions(false);
    }
    
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      setTypingStatus(true);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setTypingStatus(false);
    }, 2000);
  };

  const insertMention = (user) => {
    const words = inputText.split(' ');
    words[words.length - 1] = `@${user.name}`;
    setInputText(words.join(' ') + ' ');
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const applyFormatting = (type) => {
    const input = inputRef.current;
    if (!input) return;
    
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = inputText.substring(start, end);
    
    if (!selectedText) return;
    
    let formatted = selectedText;
    if (type === 'bold') formatted = `**${selectedText}**`;
    if (type === 'italic') formatted = `*${selectedText}*`;
    if (type === 'code') formatted = `\`${selectedText}\``;
    if (type === 'strike') formatted = `~~${selectedText}~~`;
    if (type === 'underline') formatted = `__${selectedText}__`;
    
    const newText = inputText.substring(0, start) + formatted + inputText.substring(end);
    setInputText(newText);
    
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start, start + formatted.length);
    }, 0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        if (file.type.startsWith('image/')) {
          setInputText(inputText + ` 🖼️ [Hình ảnh: ${file.name} - ${sizeInMB}MB]`);
        } else if (file.type.startsWith('video/')) {
          setInputText(inputText + ` 🎥 [Video: ${file.name} - ${sizeInMB}MB]`);
        } else if (file.type === 'application/pdf') {
          setInputText(inputText + ` 📄 [PDF: ${file.name} - ${sizeInMB}MB]`);
        } else {
          setInputText(inputText + ` 📎 [File: ${file.name} - ${sizeInMB}MB]`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(t => t + 1);
    }, 1000);
    setTimeout(() => stopVoiceRecording(), 60000);
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    clearInterval(recordingIntervalRef.current);
    if (recordingTime > 0) {
      setInputText(inputText + ` 🎤 [Voice Note: ${recordingTime}s]`);
    }
    setRecordingTime(0);
  };

  const detectLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">$1</a>');
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setTypingStatus(false);
    setIsTyping(false);

    if (editingMessage) {
      const updatedMessages = messages.map(msg => 
        msg.id === editingMessage.id 
          ? { ...msg, text: inputText, edited: true, editedAt: new Date().toLocaleString('vi-VN') }
          : msg
      );
      setMessages(updatedMessages);
      await saveMessages(updatedMessages);
      setEditingMessage(null);
      setInputText('');
      try {
        await window.storage.delete(`draft-${username}-${currentRoom}`);
      } catch (e) {}
      return;
    }

    const newMessage = {
      id: Date.now() + Math.random(),
      text: inputText,
      sender: username,
      senderColor: userColor,
      senderAvatar: userProfile.avatar,
      timestamp: new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit'
      }),
      fullTimestamp: new Date().toLocaleString('vi-VN'),
      date: new Date().toLocaleDateString('vi-VN'),
      reactions: {},
      replyTo: replyTo,
      readBy: [username],
      room: currentRoom,
      mentions: inputText.match(/@\w+/g) || []
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    await saveMessages(updatedMessages);
    setInputText('');
    setReplyTo(null);
    scrollToBottom();
    
    setUserStats(prev => ({ ...prev, messagesSent: prev.messagesSent + 1 }));
    
    try {
      await window.storage.delete(`draft-${username}-${currentRoom}`);
    } catch (e) {}
  };

  const handleReaction = async (messageId, emoji) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        if (!reactions[emoji]) reactions[emoji] = [];
        if (reactions[emoji].includes(username)) {
          reactions[emoji] = reactions[emoji].filter(u => u !== username);
          if (reactions[emoji].length === 0) delete reactions[emoji];
        } else {
          reactions[emoji].push(username);
        }
        return { ...msg, reactions };
      }
      return msg;
    });
    setMessages(updatedMessages);
    await saveMessages(updatedMessages);
    setUserStats(prev => ({ ...prev, reactionsGiven: prev.reactionsGiven + 1 }));
  };

  const handlePinMessage = async (msg) => {
    const isPinned = pinnedMessages.some(p => p.id === msg.id);
    let updated;
    if (isPinned) {
      updated = pinnedMessages.filter(p => p.id !== msg.id);
    } else {
      if (pinnedMessages.length >= 10) {
        alert('Tối đa 10 tin nhắn được ghim!');
        return;
      }
      updated = [...pinnedMessages, msg];
    }
    setPinnedMessages(updated);
    await savePinnedMessages(updated);
    setShowContextMenu(null);
  };

  const toggleFavorite = async (msg) => {
    const isFav = favorites.some(f => f.id === msg.id);
    let updated;
    if (isFav) {
      updated = favorites.filter(f => f.id !== msg.id);
    } else {
      updated = [...favorites, msg];
    }
    setFavorites(updated);
    await saveFavorites(updated);
    setShowContextMenu(null);
  };

  const toggleBookmark = async (msg) => {
    const isBookmarked = bookmarkedMessages.some(b => b.id === msg.id);
    let updated;
    if (isBookmarked) {
      updated = bookmarkedMessages.filter(b => b.id !== msg.id);
    } else {
      updated = [...bookmarkedMessages, { ...msg, bookmarkedAt: new Date().toLocaleString('vi-VN') }];
    }
    setBookmarkedMessages(updated);
    await saveBookmarks(updated);
    setShowContextMenu(null);
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Bạn có chắc muốn xóa tin nhắn này?')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId);
      setMessages(updatedMessages);
      await saveMessages(updatedMessages);
      setShowContextMenu(null);
    }
  };

  const handleEditMessage = (msg) => {
    setEditingMessage(msg);
    setInputText(msg.text);
    inputRef.current?.focus();
    setShowContextMenu(null);
  };

  const handleForwardMessage = (msg) => {
    setInputText(`[Chuyển tiếp từ ${msg.sender}]: ${msg.text}`);
    setShowContextMenu(null);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setShowContextMenu(null);
  };

  const toggleBlockUser = async (user) => {
    let updated;
    if (blockedUsers.includes(user)) {
      updated = blockedUsers.filter(u => u !== user);
    } else {
      updated = [...blockedUsers, user];
    }
    setBlockedUsers(updated);
    await saveBlockedUsers(updated);
    loadMessages();
  };

  const handleSelectionMode = (msgId) => {
    if (selectedMessages.includes(msgId)) {
      setSelectedMessages(selectedMessages.filter(id => id !== msgId));
    } else {
      setSelectedMessages([...selectedMessages, msgId]);
    }
  };

  const deleteSelectedMessages = async () => {
    if (window.confirm(`Xóa ${selectedMessages.length} tin nhắn đã chọn?`)) {
      const updatedMessages = messages.filter(msg => !selectedMessages.includes(msg.id));
      setMessages(updatedMessages);
      await saveMessages(updatedMessages);
      setSelectedMessages([]);
      setSelectionMode(false);
    }
  };

  const exportChat = () => {
    const chatData = {
      room: currentRoom,
      exportedAt: new Date().toLocaleString('vi-VN'),
      exportedBy: username,
      messageCount: messages.length,
      messages: messages.map(m => ({
        sender: m.sender,
        text: m.text,
        timestamp: m.timestamp,
        fullTimestamp: m.fullTimestamp,
        date: m.date,
        reactions: m.reactions,
        replyTo: m.replyTo
      }))
    };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${currentRoom}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importChat = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported.messages && Array.isArray(imported.messages)) {
            const confirm = window.confirm(`Import ${imported.messages.length} tin nhắn từ ${imported.room}?`);
            if (confirm) {
              setMessages(imported.messages);
              saveMessages(imported.messages);
            }
          }
        } catch (error) {
          alert('Lỗi khi nhập file. Vui lòng kiểm tra định dạng file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const createPoll = async (question, options) => {
    if (!question.trim() || options.length < 2) {
      alert('Vui lòng nhập câu hỏi và ít nhất 2 tùy chọn!');
      return;
    }
    const newPoll = {
      id: Date.now(),
      question,
      options: options.map(opt => ({ text: opt, votes: [] })),
      creator: username,
      createdAt: Date.now(),
      allowMultiple: false
    };
    const updated = [...polls, newPoll];
    setPolls(updated);
    await savePolls(updated);
  };

  const votePoll = async (pollId, optionIndex) => {
    const updated = polls.map(poll => {
      if (poll.id === pollId) {
        const options = poll.options.map((opt, idx) => {
          if (idx === optionIndex) {
            if (opt.votes.includes(username)) {
              return { ...opt, votes: opt.votes.filter(u => u !== username) };
            } else {
              return { ...opt, votes: [...opt.votes, username] };
            }
          }
          return { ...opt, votes: opt.votes.filter(u => u !== username) };
        });
        return { ...poll, options };
      }
      return poll;
    });
    setPolls(updated);
    await savePolls(updated);
  };

  const clearChat = async () => {
    if (window.confirm('Xóa toàn bộ tin nhắn trong phòng này?')) {
      setMessages([]);
      await window.storage.delete(`chat-messages-${currentRoom}`, true);
    }
  };

  const switchRoom = (room) => {
    saveDraft();
    setCurrentRoom(room);
    setMessages([]);
    setPinnedMessages([]);
    setPolls([]);
    setInputText('');
    setReplyTo(null);
    setEditingMessage(null);
    setShowContextMenu(null);
  };

  const filteredMessages = messages.filter(msg => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!msg.text.toLowerCase().includes(query) && !msg.sender.toLowerCase().includes(query)) {
        return false;
      }
    }
    if (filter === 'images' && !msg.text.includes('🖼️')) return false;
    if (filter === 'files' && !msg.text.includes('📎')) return false;
    if (filter === 'voice' && !msg.text.includes('🎤')) return false;
    if (filter === 'mentions' && !msg.text.includes(`@${username}`)) return false;
    if (filter === 'links' && !msg.text.match(/https?:\/\//)) return false;
    return true;
  });

  const formatMessageText = (text) => {
    let formatted = text;
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/`(.+?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</code>');
    formatted = formatted.replace(/~~(.+?)~~/g, '<del>$1</del>');
    formatted = formatted.replace(/__(.+?)__/g, '<u>$1</u>');
    formatted = formatted.replace(/@(\w+)/g, '<span class="text-blue-500 font-semibold">@$1</span>');
    formatted = detectLinks(formatted);
    return formatted;
  };

  const getMessageStats = () => {
    const totalMessages = messages.length;
    const myMessages = messages.filter(m => m.sender === username).length;
    const totalReactions = messages.reduce((sum, m) => {
      return sum + Object.values(m.reactions || {}).reduce((s, users) => s + users.length, 0);
    }, 0);
    return { totalMessages, myMessages, totalReactions };
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : `bg-gradient-to-br ${THEMES[theme]}`} flex items-center justify-center p-4`}>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform`}>
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${THEMES[theme]} rounded-full mb-4 shadow-lg`}>
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Ultra Chat Pro 💬</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Ứng dụng chat toàn diện & hiện đại nhất!</p>
          </div>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.slice(0, 20))}
              placeholder="Tên của bạn (2-20 ký tự)..."
              className={`w-full px-4 py-3 border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-blue-500 mb-4 transition-all`}
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              disabled={username.trim().length < 2}
              className={`w-full bg-gradient-to-r ${THEMES[theme]} text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
            >
              🚀 Bắt đầu Chat Ngay!
            </button>
            <div className="mt-4 flex justify-center gap-2">
              {Object.keys(THEMES).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${THEMES[t]} ${theme === t ? 'ring-4 ring-white' : ''}`}
                  title={t}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = getMessageStats();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex`}>
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white py-2 px-4 text-center z-50 flex items-center justify-center gap-2">
          <WifiOff className="w-5 h-5" />
          <span className="font-semibold">Mất kết nối mạng - Đang hoạt động offline</span>
        </div>
      )}

      {showUserList && (
        <div className={`w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
          <div className="p-4 border-b border-gray-700">
            <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'} mb-3 flex items-center gap-2`}>
              <Users className="w-5 h-5" />
              Online ({onlineUsers.length})
            </h2>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {onlineUsers.map(user => (
                <div 
                  key={user.name} 
                  className={`flex items-center gap-2 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer group`}
                  onClick={() => setShowUserProfile(user)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold relative ${user.color || COLORS[user.name.length % COLORS.length]}`}>
                    {user.avatar || user.name[0].toUpperCase()}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {user.name}
                      {user.name === username && <span className="text-xs text-blue-500 ml-1">(Bạn)</span>}
                    </p>
                    <p className="text-xs text-gray-500">{user.status}</p>
                  </div>
                  {user.name !== username && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleBlockUser(user.name); }}
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded ${blockedUsers.includes(user.name) ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      {blockedUsers.includes(user.name) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
              <Hash className="w-4 h-4" />
              Phòng Chat
            </h3>
            <div className="space-y-1">
              {ROOMS.map(room => (
                <button
                  key={room}
                  onClick={() => switchRoom(room)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    currentRoom === room 
                      ? `bg-gradient-to-r ${THEMES[theme]} text-white shadow-lg` 
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Hash className="w-4 h-4" />
                  <span className="flex-1">{room}</span>
                  {drafts[room] && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
                </button>
              ))}
            </div>

            {blockedUsers.length > 0 && (
              <div className="mt-4">
                <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
                  <Shield className="w-4 h-4" />
                  Đã chặn ({blockedUsers.length})
                </h3>
                <div className="space-y-1">
                  {blockedUsers.map(user => (
                    <div key={user} className="flex items-center justify-between px-3 py-2 text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{user}</span>
                      <button
                        onClick={() => toggleBlockUser(user)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
              <div className="flex items-center justify-between">
                <span>📊 Tổng tin nhắn:</span>
                <span className="font-bold">{stats.totalMessages}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>💬 Của bạn:</span>
                <span className="font-bold">{stats.myMessages}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>❤️ Reactions:</span>
                <span className="font-bold">{stats.totalReactions}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className={`bg-gradient-to-r ${THEMES[theme]} text-white p-4 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowUserList(!showUserList)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                <Users className="w-5 h-5" />
              </button>
              <div className={`w-12 h-12 ${userColor} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg cursor-pointer hover:scale-110 transition-transform`} onClick={() => setShowProfile(true)}>
                {userProfile.avatar || username[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Hash className="w-6 h-6" />
                  {currentRoom}
                  {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                </h1>
                <p className="text-sm text-blue-100">{username} • {userStats.messagesSent} tin nhắn • {userStats.reactionsGiven} reactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {bookmarkedMessages.length > 0 && (
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all flex items-center gap-2"
                  title="Bookmarks"
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="text-sm font-semibold">{bookmarkedMessages.length}</span>
                </button>
              )}
              {favorites.length > 0 && (
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all flex items-center gap-2"
                  title="Yêu thích"
                >
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-semibold">{favorites.length}</span>
                </button>
              )}
              {pinnedMessages.length > 0 && (
                <button
                  onClick={() => setShowPinned(!showPinned)}
                  className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all flex items-center gap-2"
                >
                  <Pin className="w-5 h-5" />
                  <span className="text-sm font-semibold">{pinnedMessages.length}</span>
                </button>
              )}
              <button onClick={() => setShowSearch(!showSearch)} className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all" title="Tìm kiếm">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setNotifications(!notifications)} className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all" title="Thông báo">
                {notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all" title="Chế độ tối">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all" title="Cài đặt">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {showSearch && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tin nhắn..."
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
              />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
              >
                <option value="all">Tất cả</option>
                <option value="images">Hình ảnh</option>
                <option value="files">File</option>
                <option value="voice">Voice</option>
                <option value="mentions">Mentions</option>
                <option value="links">Links</option>
              </select>
            </div>
          )}
          
          {showPinned && pinnedMessages.length > 0 && (
            <div className="mt-3 bg-white/20 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm">📌 Tin nhắn đã ghim</h3>
                <button onClick={() => setShowPinned(false)} className="hover:bg-white/20 rounded p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {pinnedMessages.map(msg => (
                <div key={msg.id} className="mb-2 last:mb-0 p-2 bg-white/10 rounded">
                  <p className="text-sm font-semibold">{msg.sender}</p>
                  <p className="text-sm truncate">{msg.text}</p>
                </div>
              ))}
            </div>
          )}

          {showFavorites && favorites.length > 0 && (
            <div className="mt-3 bg-white/20 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm">⭐ Yêu thích</h3>
                <button onClick={() => setShowFavorites(false)} className="hover:bg-white/20 rounded p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {favorites.map(msg => (
                <div key={msg.id} className="mb-2 last:mb-0 p-2 bg-white/10 rounded">
                  <p className="text-sm font-semibold">{msg.sender}</p>
                  <p className="text-sm truncate">{msg.text}</p>
                </div>
              ))}
            </div>
          )}

          {showBookmarks && bookmarkedMessages.length > 0 && (
            <div className="mt-3 bg-white/20 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm">🔖 Bookmarks</h3>
                <button onClick={() => setShowBookmarks(false)} className="hover:bg-white/20 rounded p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {bookmarkedMessages.map(msg => (
                <div key={msg.id} className="mb-2 last:mb-0 p-2 bg-white/10 rounded">
                  <p className="text-sm font-semibold">{msg.sender}</p>
                  <p className="text-sm truncate">{msg.text}</p>
                  <p className="text-xs opacity-70">Saved: {msg.bookmarkedAt}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4">
          <div className={`${compactMode ? 'space-y-1' : 'space-y-4'} max-w-6xl mx-auto`}>
            {polls.map(poll => (
              <div key={poll.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      {poll.question}
                    </p>
                    <p className="text-xs text-gray-500">Tạo bởi {poll.creator}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {poll.options.map((opt, idx) => {
                    const totalVotes = poll.options.reduce((sum, o) => sum + o.votes.length, 0);
                    const percentage = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
                    const hasVoted = opt.votes.includes(username);
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => votePoll(poll.id, idx)}
                        className={`w-full p-3 rounded-lg border-2 transition-all hover:scale-102 ${hasVoted ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{opt.text}</span>
                          <span className="text-sm font-bold">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{opt.votes.length} vote(s) {hasVoted && '• Bạn đã vote'}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {filteredMessages.length === 0 ? (
              <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-20`}>
                <MessageSquare className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">{searchQuery ? 'Không tìm thấy tin nhắn' : 'Chưa có tin nhắn nào'}</p>
                {!searchQuery && <p className="text-sm">Hãy gửi tin nhắn đầu tiên trong #{currentRoom}!</p>}
              </div>
            ) : (
              filteredMessages.map((msg, index) => {
                const showDate = index === 0 || filteredMessages[index - 1].date !== msg.date;
                const isFavorite = favorites.some(f => f.id === msg.id);
                const isBookmarked = bookmarkedMessages.some(b => b.id === msg.id);
                const isPinned = pinnedMessages.some(p => p.id === msg.id);
                
                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div className="flex items-center justify-center my-4">
                        <div className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-600'}`}>
                          {msg.date}
                        </div>
                      </div>
                    )}
                    
                    <div className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'} ${selectionMode ? 'items-center gap-2' : ''}`}>
                      {selectionMode && (
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(msg.id)}
                          onChange={() => handleSelectionMode(msg.id)}
                          className="w-5 h-5"
                        />
                      )}
                      <div className="flex flex-col max-w-xl group">
                        {msg.replyTo && (
                          <div className={`ml-4 mb-1 p-2 rounded-lg text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} border-l-4 border-blue-500`}>
                            <p className="font-semibold">↩️ {msg.replyTo.sender}</p>
                            <p className="truncate">{msg.replyTo.text}</p>
                          </div>
                        )}
                        <div className={`${compactMode ? 'px-3 py-2' : 'px-4 py-3'} rounded-2xl shadow-lg relative ${
                          msg.sender === username
                            ? darkMode ? 'bg-blue-600 text-white' : `bg-gradient-to-br ${THEMES[theme]} text-white`
                            : darkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800'
                        }`}>
                          {msg.sender !== username && !compactMode && (
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${msg.senderColor || 'bg-gray-500'}`}>
                                {msg.senderAvatar || msg.sender[0].toUpperCase()}
                              </div>
                              <p className="text-xs font-bold">{msg.sender}</p>
                            </div>
                          )}
                          
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <div dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }} className="break-words" />
                              {msg.edited && <p className="text-xs opacity-60 mt-1">(đã chỉnh sửa {msg.editedAt})</p>}
                            </div>
                            {(isFavorite || isBookmarked || isPinned) && (
                              <div className="flex gap-1">
                                {isPinned && <Pin className="w-3 h-3 text-yellow-400" />}
                                {isFavorite && <Star className="w-3 h-3 text-yellow-400" />}
                                {isBookmarked && <Bookmark className="w-3 h-3 text-blue-400" />}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 opacity-70">
                              <Clock className="w-3 h-3" />
                              <p className="text-xs" title={msg.fullTimestamp}>{msg.timestamp}</p>
                            </div>
                            {readReceipts && msg.sender === username && (
                              <div className="flex items-center gap-1" title={`Đã xem bởi: ${msg.readBy?.join(', ') || 'Chưa ai'}`}>
                                {msg.readBy && msg.readBy.length > 1 ? (
                                  <CheckCheck className="w-3 h-3 text-blue-300" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )}
                                <span className="text-xs">{msg.readBy?.length || 0}</span>
                              </div>
                            )}
                          </div>
                          
                          {Object.keys(msg.reactions || {}).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {Object.entries(msg.reactions).map(([emoji, users]) => (
                                <button
                                  key={emoji}
                                  onClick={() => handleReaction(msg.id, emoji)}
                                  className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 transition-all hover:scale-110 ${
                                    users.includes(username) 
                                      ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500' 
                                      : 'bg-gray-100 dark:bg-gray-700'
                                  }`}
                                  title={users.join(', ')}
                                >
                                  <span>{emoji}</span>
                                  <span className="font-bold">{users.length}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowContextMenu(showContextMenu === msg.id ? null : msg.id);
                            }}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black hover:bg-opacity-10"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          {showContextMenu === msg.id && (
                            <div 
                              ref={contextMenuRef}
                              className={`absolute ${msg.sender === username ? 'right-0' : 'left-0'} mt-2 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-xl p-2 z-50 min-w-[180px]`}
                            >
                              <button
                                onClick={() => { setReplyTo(msg); setShowContextMenu(null); inputRef.current?.focus(); }}
                                className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}
                              >
                                <Reply className="w-4 h-4" />
                                Trả lời
                              </button>
                              <button
                                onClick={() => handleCopyMessage(msg.text)}
                                className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}
                              >
                                <Copy className="w-4 h-4" />
                                Sao chép
                              </button>
                              <button
                                onClick={() => toggleFavorite(msg)}
                                className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}
                              >
                                <Star className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                                {isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
                              </button>
                              <button
                                onClick={() => toggleBookmark(msg)}
                                className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-blue-500 fill-blue-500' : ''}`} />
                                {isBookmarked ? 'Bỏ bookmark' : 'Bookmark'}
                              </button>
                              <button
                                onClick={() => handlePinMessage(msg)}
                                className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}
                              >
                                <Pin className={`w-4 h-4 ${isPinned ? 'text-blue-500' : ''}`} />
                                {isPinned ? 'Bỏ ghim' : 'Ghim'}
                              </button>
                              <button
                                onClick={() => handleForwardMessage(msg)}
                                className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}
                              >
                                <Forward className="w-4 h-4" />
                                Chuyển tiếp
                              </button>
                              <div className="relative group/emoji">
                                <button className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}>
                                  <Smile className="w-4 h-4" />
                                  React
                                </button>
                                <div className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-3 opacity-0 invisible group-hover/emoji:opacity-100 group-hover/emoji:visible transition-all z-50 flex flex-wrap gap-2 w-64">
                                  {EMOJIS.map(emoji => (
                                    <button
                                      key={emoji}
                                      onClick={() => { handleReaction(msg.id, emoji); setShowContextMenu(null); }}
                                      className="text-2xl hover:scale-125 transition-transform p-1"
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              {msg.sender === username && (
                                <>
                                  <button
                                    onClick={() => handleEditMessage(msg)}
                                    className={`w-full text-left px-3 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'} flex items-center gap-2 text-sm`}
                                  >
                                    <Edit2 className="w-4 h-4" />
                                    Chỉnh sửa
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className={`w-full text-left px-3 py-2 rounded hover:bg-red-500 hover:text-white flex items-center gap-2 text-sm ${darkMode ? 'text-white' : 'text-red-500'}`}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Xóa
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            {showTypingIndicator && typingUsers.length > 0 && (
              <div className={`max-w-6xl mx-auto mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm italic flex items-center gap-2`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                {typingUsers.join(', ')} đang nhập...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {showScrollButton && (
          <button
            onClick={() => { scrollToBottom(); setUnreadCount(0); }}
            className={`fixed bottom-32 right-8 bg-gradient-to-r ${THEMES[theme]} text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50`}
          >
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center font-bold animate-pulse">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
            <ChevronDown className="w-6 h-6" />
          </button>
        )}

        {replyTo && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'} border-t px-4 py-3`}>
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Reply className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs font-semibold text-blue-600">Trả lời {replyTo.sender}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} truncate max-w-2xl`}>{replyTo.text}</p>
                </div>
              </div>
              <button onClick={() => setReplyTo(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {editingMessage && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-yellow-50 border-yellow-200'} border-t px-4 py-3`}>
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Edit2 className="w-5 h-5 text-yellow-600" />
                <p className="text-sm font-semibold text-yellow-600">Đang chỉnh sửa tin nhắn</p>
              </div>
              <button onClick={() => { setEditingMessage(null); setInputText(''); }} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {isRecording && (
          <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold">🎤 Đang ghi âm... {recordingTime}s / 60s</span>
            </div>
            <button onClick={stopVoiceRecording} className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all">
              Dừng & Gửi
            </button>
          </div>
        )}

        {selectionMode && selectedMessages.length > 0 && (
          <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold">✓ {selectedMessages.length} tin nhắn đã chọn</span>
            <div className="flex gap-2">
              <button onClick={deleteSelectedMessages} className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Xóa
              </button>
              <button onClick={() => { setSelectionMode(false); setSelectedMessages([]); }} className="bg-white/20 px-4 py-2 rounded-lg font-semibold hover:bg-white/30">
                Hủy
              </button>
            </div>
          </div>
        )}

        {showMentions && mentionSuggestions.length > 0 && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-2`}>
            <div className="max-w-6xl mx-auto">
              <p className="text-xs text-gray-500 mb-2">💡 Nhấn Tab để chọn mention</p>
              <div className="flex flex-wrap gap-2">
                {mentionSuggestions.map(user => (
                  <button
                    key={user.name}
                    onClick={() => insertMention(user)}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${user.color || COLORS[user.name.length % COLORS.length]}`}>
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-sm">{user.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showTemplates && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-2`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">📝 Mẫu tin nhắn nhanh</p>
                <button onClick={() => setShowTemplates(false)} className="text-xs text-gray-500 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {messageTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInputText(template); setShowTemplates(false); inputRef.current?.focus(); }}
                    className={`px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t p-4 shadow-lg`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 mb-2 flex-wrap">
              <button onClick={() => applyFormatting('bold')} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Bold (Ctrl+B)">
                <Bold className="w-5 h-5" />
              </button>
              <button onClick={() => applyFormatting('italic')} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Italic (Ctrl+I)">
                <Italic className="w-5 h-5" />
              </button>
              <button onClick={() => applyFormatting('code')} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Code">
                <Code className="w-5 h-5" />
              </button>
              <div className="flex-1"></div>
              <button onClick={() => setAutoScroll(!autoScroll)} className={`p-2 rounded-lg ${autoScroll ? 'bg-blue-500 text-white' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Auto scroll">
                <Activity className="w-5 h-5" />
              </button>
              <button onClick={() => setSelectionMode(!selectionMode)} className={`p-2 rounded-lg ${selectionMode ? 'bg-blue-500 text-white' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Chế độ chọn">
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <button onClick={() => setShowTemplates(!showTemplates)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Mẫu tin nhắn">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button onClick={() => setShowPollCreator(!showPollCreator)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Tạo poll">
                <BarChart3 className="w-5 h-5" />
              </button>
              <button onClick={exportChat} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Export chat">
                <Download className="w-5 h-5" />
              </button>
              <label className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`} title="Import chat">
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={importChat} className="hidden" />
              </label>
              <button onClick={clearChat} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} text-red-500`} title="Xóa chat">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {showPollCreator && (
              <div className={`mb-4 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Tạo Poll Mới
                </h3>
                <input
                  type="text"
                  placeholder="Câu hỏi..."
                  className={`w-full px-3 py-2 rounded-lg mb-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
                  id="poll-question"
                />
                <input
                  type="text"
                  placeholder="Tùy chọn 1"
                  className={`w-full px-3 py-2 rounded-lg mb-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
                  id="poll-opt1"
                />
                <input
                  type="text"
                  placeholder="Tùy chọn 2"
                  className={`w-full px-3 py-2 rounded-lg mb-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
                  id="poll-opt2"
                />
                <input
                  type="text"
                  placeholder="Tùy chọn 3 (tùy chọn)"
                  className={`w-full px-3 py-2 rounded-lg mb-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
                  id="poll-opt3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const question = document.getElementById('poll-question').value;
                      const opt1 = document.getElementById('poll-opt1').value;
                      const opt2 = document.getElementById('poll-opt2').value;
                      const opt3 = document.getElementById('poll-opt3').value;
                      const options = [opt1, opt2, opt3].filter(o => o.trim());
                      if (question && options.length >= 2) {
                        createPoll(question, options);
                        setShowPollCreator(false);
                        document.getElementById('poll-question').value = '';
                        document.getElementById('poll-opt1').value = '';
                        document.getElementById('poll-opt2').value = '';
                        document.getElementById('poll-opt3').value = '';
                      }
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                  >
                    Tạo Poll
                  </button>
                  <button
                    onClick={() => setShowPollCreator(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-2 items-end">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              />
              
              <button onClick={() => setShowEmoji(!showEmoji)} className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors relative`}>
                <Smile className="w-6 h-6" />
                {showEmoji && (
                  <div className={`absolute bottom-full mb-2 left-0 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-2xl p-4 w-80 z-50`}>
                    <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                      {EMOJIS.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => { setInputText(inputText + emoji); setShowEmoji(false); inputRef.current?.focus(); }}
                          className={`text-3xl hover:scale-125 transition-transform p-2 rounded-lg ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </button>

              <button onClick={() => setShowGif(!showGif)} className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors relative`}>
                <Gift className="w-6 h-6" />
                {showGif && (
                  <div className={`absolute bottom-full mb-2 left-0 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-2xl p-4 w-64 z-50`}>
                    <div className="grid grid-cols-5 gap-2">
                      {GIFS.map(gif => (
                        <button
                          key={gif}
                          onClick={() => { setInputText(inputText + gif); setShowGif(false); inputRef.current?.focus(); }}
                          className={`text-3xl hover:scale-110 transition-transform p-2 rounded-lg ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        >
                          {gif}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </button>

              <button onClick={() => fileInputRef.current?.click()} className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`} title="Đính kèm file">
                <Paperclip className="w-6 h-6" />
              </button>

              <button
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                title="Voice message"
              >
                <Mic className="w-6 h-6" />
              </button>

              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                  if (e.key === 'Tab' && showMentions && mentionSuggestions.length > 0) {
                    e.preventDefault();
                    insertMention(mentionSuggestions[0]);
                  }
                  if (e.ctrlKey || e.metaKey) {
                    if (e.key === 'b') {
                      e.preventDefault();
                      applyFormatting('bold');
                    }
                    if (e.key === 'i') {
                      e.preventDefault();
                      applyFormatting('italic');
                    }
                  }
                }}
                placeholder={editingMessage ? "Chỉnh sửa tin nhắn..." : "Nhập tin nhắn... (Enter: gửi, Shift+Enter: xuống dòng, @: mention, Ctrl+B/I: format)"}
                className={`flex-1 px-4 py-3 border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500'} rounded-2xl focus:outline-none focus:border-blue-500 resize-none transition-all`}
                rows="1"
                style={{ maxHeight: '150px', minHeight: '48px' }}
                maxLength={2000}
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`bg-gradient-to-r ${THEMES[theme]} text-white p-4 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 disabled:hover:scale-100`}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {inputText.length}/2000 • {onlineUsers.length} online • {messages.length} tin nhắn • {stats.totalReactions} reactions
              </p>
              <div className="flex gap-2 text-xs items-center">
                <button onClick={() => setSoundEnabled(!soundEnabled)} className={`flex items-center gap-1 ${soundEnabled ? 'text-blue-500' : 'text-gray-400'}`} title="Âm thanh">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button onClick={() => setShowTypingIndicator(!showTypingIndicator)} className={`${showTypingIndicator ? 'text-blue-500' : 'text-gray-400'}`} title="Hiện typing">
                  💬
                </button>
                <button onClick={() => setCompactMode(!compactMode)} className={`${compactMode ? 'text-blue-500' : 'text-gray-400'}`} title="Chế độ compact">
                  {compactMode ? '◾' : '◻️'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSettings(false)}>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>⚙️ Cài đặt</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="font-semibold">Thông báo</span>
                <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="font-semibold">Âm thanh</span>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className={`w-12 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="font-semibold">Đã xem</span>
                <button onClick={() => setReadReceipts(!readReceipts)} className={`w-12 h-6 rounded-full transition-colors ${readReceipts ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${readReceipts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="font-semibold">Chế độ compact</span>
                <button onClick={() => setCompactMode(!compactMode)} className={`w-12 h-6 rounded-full transition-colors ${compactMode ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${compactMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="font-semibold">Auto scroll</span>
                <button onClick={() => setAutoScroll(!autoScroll)} className={`w-12 h-6 rounded-full transition-colors ${autoScroll ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${autoScroll ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="font-semibold">Hiện typing</span>
                <button onClick={() => setShowTypingIndicator(!showTypingIndicator)} className={`w-12 h-6 rounded-full transition-colors ${showTypingIndicator ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${showTypingIndicator ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="font-semibold block">Giới hạn tin nhắn</label>
                <select
                  value={messageLimit}
                  onChange={(e) => setMessageLimit(parseInt(e.target.value))}
                  className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                >
                  <option value="50">50 tin nhắn</option>
                  <option value="100">100 tin nhắn</option>
                  <option value="200">200 tin nhắn</option>
                  <option value="500">500 tin nhắn</option>
                  <option value="0">Không giới hạn</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-semibold block">Chủ đề giao diện</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(THEMES).map(([name, gradient]) => (
                    <button
                      key={name}
                      onClick={() => setTheme(name)}
                      className={`p-3 rounded-lg bg-gradient-to-r ${gradient} text-white font-semibold capitalize ${theme === name ? 'ring-4 ring-blue-500' : ''}`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg bg-gradient-to-r ${THEMES[theme]} text-white`}>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Thống kê của bạn
                </h3>
                <div className="space-y-1 text-sm">
                  <p>📨 Tin nhắn đã gửi: <span className="font-bold">{userStats.messagesSent}</span></p>
                  <p>❤️ Reactions: <span className="font-bold">{userStats.reactionsGiven}</span></p>
                  <p>⏱️ Thời gian: <span className="font-bold">{Math.floor((Date.now() - userStats.activeTime) / 60000)} phút</span></p>
                  <p>⭐ Yêu thích: <span className="font-bold">{favorites.length}</span></p>
                  <p>🔖 Bookmarks: <span className="font-bold">{bookmarkedMessages.length}</span></p>
                  <p>📌 Đã ghim: <span className="font-bold">{pinnedMessages.length}</span></p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold block flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Trạng thái
                </label>
                <select
                  value={userProfile.status}
                  onChange={(e) => {
                    const newProfile = { ...userProfile, status: e.target.value };
                    setUserProfile(newProfile);
                    saveUserProfile(newProfile);
                  }}
                  className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-semibold block">Bio</label>
                <textarea
                  value={userProfile.bio}
                  onChange={(e) => {
                    const newProfile = { ...userProfile, bio: e.target.value.slice(0, 200) };
                    setUserProfile(newProfile);
                  }}
                  onBlur={() => saveUserProfile(userProfile)}
                  placeholder="Giới thiệu về bạn..."
                  className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} resize-none`}
                  rows="3"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500">{userProfile.bio.length}/200</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm mb-2 font-semibold">⚠️ Khu vực nguy hiểm</p>
                <button
                  onClick={() => {
                    if (window.confirm('Xóa toàn bộ dữ liệu cá nhân? Hành động này không thể hoàn tác!')) {
                      setFavorites([]);
                      setBookmarkedMessages([]);
                      setBlockedUsers([]);
                      saveFavorites([]);
                      saveBookmarks([]);
                      saveBlockedUsers([]);
                      alert('Đã xóa toàn bộ dữ liệu cá nhân!');
                    }
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 mb-2"
                >
                  Xóa dữ liệu cá nhân
                </button>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
                    updateOnlineStatus(false);
                    saveDraft();
                    setIsLoggedIn(false);
                    setUsername('');
                  }
                }}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowProfile(false)}>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-6 max-w-md w-full`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>👤 Hồ sơ của bạn</h2>
              <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className={`w-24 h-24 ${userColor} rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-xl`}>
                {userProfile.avatar || username[0].toUpperCase()}
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{username}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{userProfile.status}</p>
              {userProfile.bio && (
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-2 text-center`}>{userProfile.bio}</p>
              )}
            </div>

            <div className={`grid grid-cols-2 gap-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="text-center">
                <p className="text-2xl font-bold">{userStats.messagesSent}</p>
                <p className="text-xs text-gray-500">Tin nhắn</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{userStats.reactionsGiven}</p>
                <p className="text-xs text-gray-500">Reactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{favorites.length}</p>
                <p className="text-xs text-gray-500">Yêu thích</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{bookmarkedMessages.length}</p>
                <p className="text-xs text-gray-500">Bookmarks</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUserProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowUserProfile(null)}>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-6 max-w-md w-full`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>👤 Hồ sơ người dùng</h2>
              <button onClick={() => setShowUserProfile(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className={`w-24 h-24 ${showUserProfile.color || COLORS[showUserProfile.name.length % COLORS.length]} rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-xl relative`}>
                {showUserProfile.avatar || showUserProfile.name[0].toUpperCase()}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800"></div>
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{showUserProfile.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{showUserProfile.status}</p>
            </div>

            {showUserProfile.name !== username && (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setInputText(`@${showUserProfile.name} `);
                    setShowUserProfile(null);
                    inputRef.current?.focus();
                  }}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Gửi tin nhắn
                </button>
                <button
                  onClick={() => {
                    toggleBlockUser(showUserProfile.name);
                    setShowUserProfile(null);
                  }}
                  className={`w-full ${blockedUsers.includes(showUserProfile.name) ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2`}
                >
                  {blockedUsers.includes(showUserProfile.name) ? (
                    <>
                      <Eye className="w-5 h-5" />
                      Bỏ chặn
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-5 h-5" />
                      Chặn người dùng
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
