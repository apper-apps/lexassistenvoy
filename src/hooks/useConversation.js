import { useState, useEffect } from "react";
import conversationService from "@/services/api/conversationService";

export const useConversation = (conversationId) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId]);

  const fetchConversation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await conversationService.getById(conversationId);
      setConversation(data);
} catch (err) {
      const errorMessage = err?.message || err?.toString() || "Failed to fetch conversation";
      setError(errorMessage);
      console.error("Error fetching conversation:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateConversation = async (updates) => {
    try {
      const updated = await conversationService.update(conversationId, updates);
      setConversation(updated);
      return updated;
} catch (err) {
      const errorMessage = err?.message || err?.toString() || "Failed to update conversation";
      setError(errorMessage);
      throw err;
    }
  };

  const addMessage = (message) => {
    setConversation(prev => ({
      ...prev,
      messages: [...(prev?.messages || []), message]
    }));
  };

  return {
    conversation,
    loading,
    error,
    fetchConversation,
    updateConversation,
    addMessage,
    retry: fetchConversation
  };
};