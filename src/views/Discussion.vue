<template>
  <div class="teams-container">
    <!-- Left Sidebar - Book Club -->
    <div class="teams-sidebar">
      <div class="teams-logo">
        <div class="logo-icon"></div>
        <span class="logo-text">Book Club</span>
      </div>

      <div class="sidebar-tabs">
        <div class="tab active" @click="activeTab = 'discussions'">
          <span class="tab-icon"></span>
          <span class="tab-text">Discussions</span>
        </div>
        <div class="tab" @click="activeTab = 'books'">
          <span class="tab-icon"></span>
          <span class="tab-text">Our Books</span>
        </div>
        <div class="tab" @click="activeTab = 'meetings'">
          <span class="tab-icon"></span>
          <span class="tab-text">Meetings</span>
        </div>
      </div>

      <!-- Current Book Info -->
      <div class="current-book">
        <div class="book-cover">
          <img :src="currentBook.cover" :alt="currentBook.title" />
        </div>
        <div class="book-info">
          <h4>{{ currentBook.title }}</h4>
          <p class="book-author">by {{ currentBook.author }}</p>
          <div class="reading-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{width: currentBook.progress + '%'}"></div>
            </div>
            <span class="progress-text">{{ currentBook.progress }}% read</span>
          </div>
        </div>
      </div>

      <div class="chat-list">
        <div class="section-title">Discussion Groups</div>
        <div
            v-for="chat in filteredChats"
            :key="chat.id"
            class="chat-item"
            :class="{ active: activeChat?.id === chat.id }"
            @click="setActiveChat(chat)"
        >
          <div class="chat-avatar">
            <img :src="chat.avatar" :alt="chat.name" />
            <span class="status-indicator" :class="chat.status"></span>
          </div>
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="last-message">{{ chat.lastMessage }}</div>
          </div>
          <div class="chat-meta">
            <div class="last-time">{{ formatTime(chat.lastMessageTime) }}</div>
            <div class="unread-count" v-if="chat.unreadCount > 0">
              {{ chat.unreadCount }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Discussion Area -->
    <div class="chat-area" v-if="activeChat">
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="header-left">
          <div class="back-button" @click="activeChat = null">←</div>
          <div class="chat-avatar">
            <img :src="activeChat.avatar" :alt="activeChat.name" />
            <span class="status-indicator" :class="activeChat.status"></span>
          </div>
          <div class="chat-info">
            <div class="chat-name">{{ activeChat.name }}</div>
            <div class="chat-topic">Discussing: {{ currentBook.title }}</div>
          </div>
        </div>
        <div class="header-right">
          <button class="header-btn"></button>
          <button class="header-btn"></button>
          <button class="header-btn"></button>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="messages-area" ref="messagesContainer">
        <!-- Book Discussion Header -->
        <div class="discussion-header">
          <div class="book-discussion-info">
            <img :src="currentBook.cover" :alt="currentBook.title" class="discussion-book-cover" />
            <div class="discussion-book-details">
              <h3>{{ currentBook.title }}</h3>
              <p class="book-author">by {{ currentBook.author }}</p>
              <p class="book-genre">{{ currentBook.genre }} • {{ currentBook.pages }} pages</p>
              <div class="book-rating">
                <span class="stars">★★★★☆</span>
                <span class="rating-text">4.2/5 from our club</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Discussion Messages -->
        <div
            v-for="message in activeChat.messages"
            :key="message.id"
            class="message"
            :class="{
            'sent': message.senderId === currentUser.id,
            'received': message.senderId !== currentUser.id
          }"
        >
          <div class="message-avatar" v-if="message.senderId !== currentUser.id">
            <img :src="getUserAvatar(message.senderId)" :alt="getUserName(message.senderId)" />
          </div>
          <div class="message-content">
            <div class="message-sender" v-if="message.senderId !== currentUser.id">
              {{ getUserName(message.senderId) }}
            </div>
            <div class="message-bubble">
              <div class="message-text">{{ message.text }}</div>
              <div class="message-reaction" v-if="message.reaction">
                {{ message.reaction }}
              </div>
              <div class="message-time">{{ formatMessageTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="message-input-container">
        <div class="input-actions">
          <button class="input-btn"></button>
          <button class="input-btn"></button>
          <button class="input-btn"></button>
        </div>
        <div class="message-input-wrapper">
          <textarea
              v-model="newMessage"
              placeholder="Share your thoughts about the book..."
              @keydown.enter.exact.prevent="sendMessage"
              rows="1"
              ref="messageInput"
          ></textarea>
        </div>
        <button class="send-button" @click="sendMessage">
          <span class="send-icon">↑</span>
        </button>
      </div>
    </div>

    <!-- Right Sidebar - Book & Discussion Info -->
    <div class="info-sidebar" v-if="activeChat">
      <div class="info-header">
        <h3>Discussion Info</h3>
        <button class="close-info" @click="activeChat = null">×</button>
      </div>

      <!-- Current Book Details -->
      <div class="book-details">
        <div class="book-cover-large">
          <img :src="currentBook.cover" :alt="currentBook.title" />
        </div>
        <h2 class="book-title">{{ currentBook.title }}</h2>
        <p class="book-author-large">by {{ currentBook.author }}</p>

        <div class="book-stats">
          <div class="stat">
            <div class="stat-value">{{ currentBook.rating }}</div>
            <div class="stat-label">Club Rating</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ currentBook.pages }}</div>
            <div class="stat-label">Pages</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ currentBook.progress }}%</div>
            <div class="stat-label">Progress</div>
          </div>
        </div>

        <div class="reading-progress-large">
          <div class="progress-header">
            <span>Reading Progress</span>
            <span>{{ currentBook.progress }}%</span>
          </div>
          <div class="progress-bar-large">
            <div class="progress-fill-large" :style="{width: currentBook.progress + '%'}"></div>
          </div>
        </div>
      </div>

      <!-- Discussion Themes -->
      <div class="info-section">
        <h4>Discussion Themes</h4>
        <div class="themes-list">
          <div class="theme-tag" v-for="theme in currentBook.themes" :key="theme">
            {{ theme }}
          </div>
        </div>
      </div>

      <!-- Key Quotes -->
      <div class="info-section">
        <h4>Notable Quotes</h4>
        <div class="quotes-list">
          <div class="quote-item" v-for="quote in currentBook.quotes" :key="quote.id">
            <div class="quote-text">"{{ quote.text }}"</div>
            <div class="quote-page">Page {{ quote.page }}</div>
          </div>
        </div>
      </div>

      <!-- Participants -->
      <div class="info-section">
        <h4>Participants</h4>
        <div class="participants-list">
          <div
              v-for="user in users"
              :key="user.id"
              class="participant"
          >
            <div class="participant-avatar">
              <img :src="user.avatar" :alt="user.name" />
              <span class="status-indicator" :class="user.status"></span>
            </div>
            <div class="participant-info">
              <div class="participant-name">{{ user.name }}</div>
              <div class="participant-progress">
                <div class="mini-progress">
                  <div class="mini-progress-fill" :style="{width: user.readingProgress + '%'}"></div>
                </div>
                <span>{{ user.readingProgress }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Chat Selected -->
    <div class="no-chat-selected" v-else>
      <div class="no-chat-content">
        <div class="no-chat-icon"></div>
        <h2>Welcome to Book Club</h2>
        <p>Select a discussion group to share your thoughts about our current book</p>
        <div class="current-book-preview">
          <img :src="currentBook.cover" :alt="currentBook.title" class="preview-cover" />
          <div class="preview-info">
            <h3>{{ currentBook.title }}</h3>
            <p class="preview-author">by {{ currentBook.author }}</p>
            <div class="preview-rating">
              <span class="stars">★★★★☆</span>
              <span class="rating">4.2/5</span>
            </div>
          </div>
        </div>
        <div class="quick-actions">
          <button class="quick-btn" @click="startNewDiscussion">
            <span class="btn-icon">💬</span>
            <span class="btn-text">New Discussion</span>
          </button>
          <button class="quick-btn">
            <span class="btn-icon">📝</span>
            <span class="btn-text">Share Notes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookClubDiscussion',
  data() {
    return {
      activeTab: 'discussions',
      activeChat: null,
      newMessage: '',
      currentUser: {
        id: 1,
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        status: 'available',
        readingProgress: 85
      },
      currentBook: {
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
        genre: "Fiction • Fantasy",
        pages: 304,
        rating: "4.2",
        progress: 75,
        themes: ["Regrets", "Second Chances", "Life Choices", "Mental Health", "Parallel Lives"],
        quotes: [
          { id: 1, text: "Between life and death there is a library, and within that library, the shelves go on forever.", page: 45 },
          { id: 2, text: "You don't have to understand life. You just have to live it.", page: 189 },
          { id: 3, text: "The only way to learn is to live.", page: 267 }
        ]
      },
      users: [
        {
          id: 1,
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          status: 'available',
          readingProgress: 85
        },
        {
          id: 2,
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          status: 'available',
          readingProgress: 100
        },
        {
          id: 3,
          name: 'Alex Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          status: 'busy',
          readingProgress: 60
        },
        {
          id: 4,
          name: 'Emma Wilson',
          avatar: 'https://images.unsplash.com-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          status: 'away',
          readingProgress: 45
        },
        {
          id: 5,
          name: 'Mike Thompson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          status: 'available',
          readingProgress: 95
        }
      ],
      chats: [
        {
          id: 1,
          name: 'Character Analysis',
          avatar: '👤',
          status: 'available',
          lastMessage: 'Sarah: Nora\'s character development was incredible',
          lastMessageTime: new Date(Date.now() - 300000),
          unreadCount: 2,
          messages: [
            {
              id: 1,
              senderId: 2,
              text: 'What did everyone think about Nora\'s journey through the different lives?',
              timestamp: new Date(Date.now() - 3600000)
            },
            {
              id: 2,
              senderId: 3,
              text: 'I found her character development incredible. The way she grew from being suicidal to appreciating life was powerful.',
              timestamp: new Date(Date.now() - 3500000),
              reaction: ''
            },
            {
              id: 3,
              senderId: 1,
              text: 'The scene where she realizes that every life has its own struggles really resonated with me.',
              timestamp: new Date(Date.now() - 3400000)
            },
            {
              id: 4,
              senderId: 5,
              text: 'Nora\'s character development was incredible throughout the book!',
              timestamp: new Date(Date.now() - 300000),
              reaction: ''
            }
          ]
        },
        {
          id: 2,
          name: 'Themes & Philosophy',
          avatar: '',
          status: 'available',
          lastMessage: 'Emma: The concept of regret was handled beautifully',
          lastMessageTime: new Date(Date.now() - 1800000),
          unreadCount: 0,
          messages: [
            {
              id: 1,
              senderId: 4,
              text: 'How did you interpret the main theme of regrets and second chances?',
              timestamp: new Date(Date.now() - 7200000)
            },
            {
              id: 2,
              senderId: 2,
              text: 'I loved how the book showed that every choice leads to a different path, but no life is perfect. The grass isn\'t always greener.',
              timestamp: new Date(Date.now() - 7000000)
            },
            {
              id: 3,
              senderId: 1,
              text: 'The concept of the midnight library itself was such a beautiful metaphor for the choices we make in life.',
              timestamp: new Date(Date.now() - 6800000),
              reaction: ''
            }
          ]
        },
        {
          id: 3,
          name: 'Favorite Moments',
          avatar: '',
          status: 'available',
          lastMessage: 'Mike: The ending brought tears to my eyes',
          lastMessageTime: new Date(Date.now() - 86400000),
          unreadCount: 0,
          messages: [
            {
              id: 1,
              senderId: 5,
              text: 'What was everyone\'s favorite moment in the book?',
              timestamp: new Date(Date.now() - 172800000)
            },
            {
              id: 2,
              senderId: 1,
              text: 'When Nora realizes that the root life with her cat was the one she truly wanted all along. So touching!',
              timestamp: new Date(Date.now() - 172000000),
              reaction: ''
            },
            {
              id: 3,
              senderId: 3,
              text: 'I loved the scene where she\'s a glacier researcher. The descriptions were breathtaking.',
              timestamp: new Date(Date.now() - 171000000)
            },
            {
              id: 4,
              senderId: 4,
              text: 'The ending brought tears to my eyes. So beautifully written.',
              timestamp: new Date(Date.now() - 86400000)
            }
          ]
        }
      ]
    }
  },
  computed: {
    filteredChats() {
      return this.chats.filter(chat => {
        if (this.activeTab === 'discussions') return true
        return this.activeTab === 'books'
      })
    }
  },
  methods: {
    setActiveChat(chat) {
      this.activeChat = chat
      chat.unreadCount = 0
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    sendMessage() {
      if (this.newMessage.trim() && this.activeChat) {
        const message = {
          id: Date.now(),
          senderId: this.currentUser.id,
          text: this.newMessage,
          timestamp: new Date()
        }

        this.activeChat.messages.push(message)
        this.activeChat.lastMessage = `You: ${this.newMessage}`
        this.activeChat.lastMessageTime = new Date()
        this.newMessage = ''

        this.$nextTick(() => {
          this.scrollToBottom()
          this.autoReply()
        })
      }
    },
    autoReply() {
      if (this.activeChat) {
        setTimeout(() => {
          const bookReplies = {
            1: [
              "I completely agree! Nora's transformation felt so authentic.",
              "Her relationship with Mrs. Elm was particularly touching, don't you think?",
              "The way she learned to appreciate her original life was beautifully written."
            ],
            2: [
              "The philosophical questions this book raises are so thought-provoking.",
              "It really makes you reflect on your own life choices and regrets.",
              "The concept of infinite possibilities was both exciting and terrifying."
            ],
            3: [
              "That was such a powerful scene! The emotional payoff was incredible.",
              "I also loved when she realized what truly mattered in life.",
              "The author's prose in that section was absolutely beautiful."
            ]
          }

          const activeUsers = this.users.filter(user =>
              user.id !== this.currentUser.id && user.status === 'available'
          )

          if (activeUsers.length > 0) {
            const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)]
            const replies = bookReplies[this.activeChat.id] || bookReplies[1]
            const reply = {
              id: Date.now() + 1,
              senderId: randomUser.id,
              text: replies[Math.floor(Math.random() * replies.length)],
              timestamp: new Date()
            }

            this.activeChat.messages.push(reply)
            this.activeChat.lastMessage = `${randomUser.name}: ${reply.text}`
            this.activeChat.lastMessageTime = new Date()

            this.$nextTick(() => {
              this.scrollToBottom()
            })
          }
        }, 2000)
      }
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    getUserName(userId) {
      const user = this.users.find(u => u.id === userId)
      return user ? user.name : 'Unknown User'
    },
    getUserAvatar(userId) {
      const user = this.users.find(u => u.id === userId)
      return user ? user.avatar : ''
    },
    formatTime(timestamp) {
      const now = new Date()
      const messageTime = new Date(timestamp)
      const diffInHours = (now - messageTime) / (1000 * 60 * 60)

      if (diffInHours < 24) {
        return messageTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      } else {
        return messageTime.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      }
    },
    formatMessageTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    startNewDiscussion() {
      alert('New discussion group creation would open here')
    }
  },
  mounted() {
    if (this.chats.length > 0) {
      this.setActiveChat(this.chats[0])
    }
  }
}
</script>

<style scoped>
.teams-container {
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Left Sidebar */
.teams-sidebar {
  width: 320px;
  background-color: #f3f2f1;
  border-right: 1px solid #e1dfdd;
  display: flex;
  flex-direction: column;
}

.teams-logo {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e1dfdd;
}

.logo-icon {
  font-size: 24px;
  margin-right: 12px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: #8B4513;
}

.sidebar-tabs {
  padding: 20px 0;
  border-bottom: 1px solid #e1dfdd;
}

.tab {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tab:hover {
  background-color: #edebe9;
}

.tab.active {
  background-color: #f5f1ee;
  border-right: 3px solid #8B4513;
}

.tab-icon {
  font-size: 20px;
  margin-right: 12px;
}

.tab-text {
  font-size: 14px;
  font-weight: 600;
}

/* Current Book Section */
.current-book {
  padding: 20px;
  border-bottom: 1px solid #e1dfdd;
  background: white;
  margin: 8px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
}

.book-cover img {
  width: 50px;
  height: 70px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.book-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.book-author {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #605e5c;
}

.reading-progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-bar {
  height: 6px;
  background-color: #e1dfdd;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #8B4513;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 11px;
  color: #605e5c;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
}

.section-title {
  padding: 16px 12px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #605e5c;
  text-transform: uppercase;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 2px;
}

.chat-item:hover {
  background-color: #edebe9;
}

.chat-item.active {
  background-color: #f5f1ee;
}

.chat-avatar {
  position: relative;
  margin-right: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.chat-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border: 2px solid white;
  border-radius: 50%;
}

.status-indicator.available {
  background-color: #6bb700;
}

.status-indicator.busy {
  background-color: #d13438;
}

.status-indicator.away {
  background-color: #ffaa44;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.last-message {
  font-size: 13px;
  color: #605e5c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.last-time {
  font-size: 12px;
  color: #605e5c;
  margin-bottom: 4px;
}

.unread-count {
  background-color: #8B4513;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
}

/* Main Chat Area */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #e1dfdd;
  background-color: white;
}

.header-left {
  display: flex;
  align-items: center;
}

.back-button {
  display: none;
  margin-right: 12px;
  font-size: 18px;
  cursor: pointer;
}

.chat-info .chat-name {
  font-size: 16px;
  margin-bottom: 2px;
}

.chat-topic {
  font-size: 12px;
  color: #605e5c;
}

.header-right {
  display: flex;
  gap: 8px;
}

.header-btn {
  background: none;
  border: none;
  font-size: 18px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.header-btn:hover {
  background-color: #f3f2f1;
}

/* Messages Area */
.messages-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f8f9fa;
}

.discussion-header {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.book-discussion-info {
  display: flex;
  gap: 16px;
  align-items: center;
}

.discussion-book-cover {
  width: 60px;
  height: 90px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.discussion-book-details h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  color: #323130;
}

.discussion-book-details .book-author {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #605e5c;
}

.book-genre {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #8B4513;
  font-weight: 500;
}

.book-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #ffc107;
  font-size: 14px;
}

.rating-text {
  font-size: 12px;
  color: #605e5c;
}

.message {
  display: flex;
  margin-bottom: 16px;
}

.message.sent {
  justify-content: flex-end;
}

.message.sent .message-content {
  align-items: flex-end;
}

.message.sent .message-bubble {
  background-color: #8B4513;
  color: white;
  border-radius: 8px 8px 0 8px;
}

.message.received .message-bubble {
  background-color: white;
  border: 1px solid #e1dfdd;
  border-radius: 8px 8px 8px 0;
}

.message-avatar {
  margin-right: 8px;
}

.message-avatar img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.message-sender {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #8B4513;
}

.message-bubble {
  padding: 8px 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
}

.message-reaction {
  position: absolute;
  bottom: -8px;
  right: 8px;
  font-size: 12px;
  background: white;
  padding: 2px 4px;
  border-radius: 8px;
  border: 1px solid #e1dfdd;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  text-align: right;
}

/* Message Input */
.message-input-container {
  display: flex;
  align-items: flex-end;
  padding: 16px 20px;
  border-top: 1px solid #e1dfdd;
  background-color: white;
}

.input-actions {
  display: flex;
  gap: 4px;
  margin-right: 12px;
}

.input-btn {
  background: none;
  border: none;
  font-size: 18px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.input-btn:hover {
  background-color: #f3f2f1;
}

.message-input-wrapper {
  flex: 1;
}

.message-input-wrapper textarea {
  width: 100%;
  border: 1px solid #e1dfdd;
  border-radius: 4px;
  padding: 12px;
  font-family: inherit;
  font-size: 14px;
  resize: none;
  max-height: 120px;
  outline: none;
  transition: border-color 0.2s;
}

.message-input-wrapper textarea:focus {
  border-color: #8B4513;
}

.send-button {
  background-color: #8B4513;
  border: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  margin-left: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #654321;
}

.send-icon {
  color: white;
  font-size: 16px;
  transform: rotate(45deg);
}

/* Info Sidebar */
.info-sidebar {
  width: 320px;
  background-color: white;
  border-left: 1px solid #e1dfdd;
  overflow-y: auto;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e1dfdd;
}

.info-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-info {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
}

/* Book Details */
.book-details {
  padding: 20px;
  border-bottom: 1px solid #e1dfdd;
  text-align: center;
}

.book-cover-large img {
  width: 120px;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  margin-bottom: 16px;
}

.book-title {
  margin: 0 0 4px 0;
  font-size: 20px;
  color: #323130;
}

.book-author-large {
  margin: 0 0 20px 0;
  color: #605e5c;
  font-size: 14px;
}

.book-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 16px 0;
  border-top: 1px solid #e1dfdd;
  border-bottom: 1px solid #e1dfdd;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #8B4513;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #605e5c;
}

.reading-progress-large {
  margin-top: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
}

.progress-bar-large {
  height: 8px;
  background-color: #e1dfdd;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill-large {
  height: 100%;
  background-color: #8B4513;
  transition: width 0.3s ease;
}

/* Info Sections */
.info-section {
  padding: 20px;
  border-bottom: 1px solid #e1dfdd;
}

.info-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #323130;
}

.themes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.theme-tag {
  background-color: #f5f1ee;
  color: #8B4513;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.quotes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quote-item {
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #8B4513;
}

.quote-text {
  font-style: italic;
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 4px;
  color: #323130;
}

.quote-page {
  font-size: 11px;
  color: #605e5c;
  text-align: right;
}

.participants-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.participant {
  display: flex;
  align-items: center;
}

.participant-avatar {
  position: relative;
  margin-right: 12px;
}

.participant-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.participant-info {
  flex: 1;
}

.participant-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.participant-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-progress {
  flex: 1;
  height: 4px;
  background-color: #e1dfdd;
  border-radius: 2px;
  overflow: hidden;
}

.mini-progress-fill {
  height: 100%;
  background-color: #8B4513;
  transition: width 0.3s ease;
}

.participant-progress span {
  font-size: 11px;
  color: #605e5c;
  min-width: 30px;
}

/* No Chat Selected */
.no-chat-selected {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.no-chat-content {
  text-align: center;
  max-width: 400px;
}

.no-chat-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.no-chat-content h2 {
  margin: 0 0 8px 0;
  color: #323130;
}

.no-chat-content p {
  margin: 0 0 24px 0;
  color: #605e5c;
}

.current-book-preview {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.preview-cover {
  width: 60px;
  height: 90px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.preview-info h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  text-align: left;
}

.preview-author {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #605e5c;
  text-align: left;
}

.preview-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-rating .stars {
  font-size: 14px;
}

.preview-rating .rating {
  font-size: 12px;
  color: #605e5c;
}

.quick-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.quick-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #8B4513;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.quick-btn:hover {
  background-color: #654321;
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 14px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .info-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .teams-sidebar {
    width: 280px;
  }

  .info-sidebar {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }
}

@media (max-width: 640px) {
  .teams-sidebar {
    display: none;
  }

  .back-button {
    display: block;
  }

  .message-content {
    max-width: 85%;
  }

  .current-book-preview {
    flex-direction: column;
    text-align: center;
  }

  .preview-info h3,
  .preview-author {
    text-align: center;
  }
}
</style>