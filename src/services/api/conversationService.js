import mockConversations from "@/services/mockData/conversations.json";

class ConversationService {
  constructor() {
    this.conversations = [...mockConversations];
    this.nextId = Math.max(...this.conversations.map(c => c.Id)) + 1;
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.conversations]);
      }, 300);
    });
  }

async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const conversation = this.conversations.find(c => c.Id === parseInt(id));
          if (conversation) {
            resolve({ ...conversation, id: conversation.Id });
          } else {
            reject(new Error(`Conversation with ID ${id} not found`));
          }
} catch (error) {
          const errorMessage = error?.message || "Failed to retrieve conversation";
          reject(new Error(errorMessage));
        }
      }, 200);
    });
  }

async create(conversationData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newConversation = {
          Id: this.nextId++,
          toolType: conversationData.toolType || "general",
          messages: conversationData.messages || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        this.conversations.push(newConversation);
        resolve({ ...newConversation, id: newConversation.Id });
      }, 250);
    });
  }

async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!id || id === 'undefined') {
            reject(new Error(`Cannot update: Invalid conversation ID ${id}`));
            return;
          }
          
          const index = this.conversations.findIndex(c => c.Id === parseInt(id));
          if (index !== -1) {
            this.conversations[index] = {
              ...this.conversations[index],
              ...updates,
              Id: parseInt(id),
              updatedAt: new Date().toISOString()
            };
            resolve({ ...this.conversations[index], id: this.conversations[index].Id });
          } else {
            reject(new Error(`Cannot update: Conversation with ID ${id} not found`));
          }
} catch (error) {
          const errorMessage = error?.message || "Failed to update conversation";
          reject(new Error(errorMessage));
        }
      }, 300);
    });
  }

async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = this.conversations.findIndex(c => c.Id === parseInt(id));
          if (index !== -1) {
            const deleted = this.conversations.splice(index, 1)[0];
            resolve(deleted);
          } else {
            reject(new Error(`Cannot delete: Conversation with ID ${id} not found`));
          }
} catch (error) {
          const errorMessage = error?.message || "Failed to delete conversation";
          reject(new Error(errorMessage));
        }
      }, 200);
    });
  }
}

export default new ConversationService();