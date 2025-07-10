import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Task, Message } from '../types';
import { messagesAPI } from '../lib/api';
import { X, Send, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface TaskMessagesProps {
  task: Task;
  onClose: () => void;
}

export default function TaskMessages({ task, onClose }: TaskMessagesProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [task._id]);

  const fetchMessages = async () => {
    try {
      const data = await messagesAPI.getMessages(task._id);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      await messagesAPI.sendMessage(task._id, newMessage.trim());
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full h-96 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            <p className="text-sm text-gray-600">{task.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-atlas-primary-default"></div>
            </div>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender_id === user?.id
                      ? 'bg-gradient-to-r from-atlas-primary-default to-atlas-dark text-white'
                      : 'bg-gradient-to-r from-atlas-dark to-atlas-primary-default text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-xs ${
                      message.sender_id === user?.id ? 'text-[#BBFBFF]' : 'text-[#BBFBFF]'
                    }`}>
                      {message.sender?.full_name} &#128337;
                    </span>
                    <span className={`text-xs ${
                      message.sender_id === user?.id ? 'text-[#BBFBFF]' : 'text-[#BBFBFF]'
                    }`}>
                      {format(new Date(message.created_at), 'MMM d, h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No messages yet</p>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-primary-default focus:border-atlas-primary-light"
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="px-4 py-2 bg-gradient-to-r from-atlas-gold to-atlas-primary-light text-white font-bold hover:from-atlas-primary-light hover:to-atlas-gold transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}