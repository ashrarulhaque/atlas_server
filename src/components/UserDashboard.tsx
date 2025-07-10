import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Task } from "../types";
import { tasksAPI } from "../lib/api";
import {
  Upload,
  Play,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  MessageSquare, Headphones, Music, Zap
} from "lucide-react";
import { format } from "date-fns";
import TaskUpload from "./TaskUpload";
import TaskMessages from "./TaskMessages";

export default function UserDashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const data = await tasksAPI.getMyTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "revision_requested":
        return "bg-orange-100 text-orange-800";
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in_progress":
        return <Play className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "revision_requested":
        return <AlertCircle className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleRequestRevision = async (taskId: string) => {
    const feedback = prompt("Please provide feedback for the revision:");
    if (feedback) {
      try {
        await tasksAPI.requestRevision(taskId, feedback);
        fetchTasks();
      } catch (error) {
        console.error("Error requesting revision:", error);
      }
    }
  };

  const handleApproveTask = async (taskId: string) => {
    try {
      await tasksAPI.approveTask(taskId);
      fetchTasks();
      alert("Task approved! Payment processing...");
    } catch (error) {
      console.error("Error approving task:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4E71FF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <div className="flex justify-between items-center animate-fadeIn mb-2">
        <h1 className="text-3xl font-bold text-atlas-dark">My Tasks</h1>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-gradient-to-r from-atlas-gold to-atlas-primary-light text-white font-bold px-4 py-2 rounded-md hover:from-atlas-primary-light hover:to-atlas-gold  flex items-center space-x-2 transition-all duration-300"
        >
          <Upload className="h-5 w-5" />
          <span>Upload Audio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fadeIn"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-atlas-dark truncate">
                {task.title}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                  task.status
                )}`}
              >
                {getStatusIcon(task.status)}
                <span className="capitalize">
                  {task.status.replace("_", " ")}
                </span>
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>{task.description}</p>
              <div className="flex justify-between">
                <span>Duration: {task.duration_minutes} min</span>
                <span className="font-medium text-atlas-primary-default">
                  ${(task.price_cents / 100).toFixed(2)}
                </span>
              </div>
              {task.worker && <p>Worker: {task.worker.full_name}</p>}
              <p>Created: {format(new Date(task.created_at), "MMM d, yyyy")}</p>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => {
                  setSelectedTask(task);
                  setShowMessages(true);
                }}
                className="flex-1 bg-gray-100 text-atlas-dark px-3 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center space-x-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </button>

              {task.status === "completed" && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRequestRevision(task._id)}
                    className="bg-orange-600 text-white px-3 py-2 rounded-md hover:bg-orange-700 text-sm"
                  >
                    Request Revision
                  </button>
                  <button
                    onClick={() => handleApproveTask(task._id)}
                    className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center space-x-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                </div>
              )}

              {task.status === "approved" && task.processed_file_url && (
                <button
                  onClick={() =>
                    window.open(`${task.processed_file_url}`, "_blank")
                  }
                  className="bg-atlas-primary-default text-white px-3 py-2 rounded-md hover:bg-atlas-gold hover:text-black flex items-center space-x-1 transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 animate-fadeIn">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-atlas-dark mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-600 mb-4">
            Upload your first audio file to get started
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-atlas-primary-default to-atlas-primary-light text-white px-6 py-3 rounded-md hover:from-atlas-primary-light hover:to-atlas-gold transition-all duration-300"
          >
            Upload Audio File
          </button>
        </div>
      )}

      {/* Floating Elements */}
        <div className="absolute top-24 left-10 opacity-20">
          <Headphones className="h-16 w-16 text-white animate-bounce" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Music className="h-12 w-12 text-white animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Zap className="h-14 w-14 text-white animate-bounce" style={{ animationDelay: '2s' }} />
        </div>

      {showUpload && (
        <TaskUpload
          onClose={() => setShowUpload(false)}
          onSuccess={() => {
            setShowUpload(false);
            fetchTasks();
          }}
        />
      )}

      {showMessages && selectedTask && (
        <TaskMessages
          task={selectedTask}
          onClose={() => setShowMessages(false)}
        />
      )}
    </div>
  );
}
