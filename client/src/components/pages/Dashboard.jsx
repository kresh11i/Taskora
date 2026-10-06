import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
  Power,
  ChevronDown,
  Edit3,
  Trash2,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  Check,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [task, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [showLogout, setShowLogout] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const navigate = useNavigate();

  // ─── Fetch Tasks ───────────────────────────────────────────────
  const fetchTasks = async () => {
    setIsLoadingTasks(true);
    try {
      const response = await api.get("/api/task");
      const fetchedTasks = response.data.tasks.map((t) => ({
        ...t,
        status: (t.status || "PENDING").toUpperCase(),
      }));
      setTask(fetchedTasks);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ─── Close all dropdowns on outside click ─────────────────────
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
      setShowLogout(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  // ─── Logout ────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      localStorage.removeItem("username"); // 👈 add this
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/login");
    }
  };

  // ─── Add Task ──────────────────────────────────────────────────
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setIsAddingTask(true);
    try {
      const response = await api.post("/api/task/create", { title, description });
      const newTask = {
        ...response.data.task,
        status: (response.data.task.status || "PENDING").toUpperCase(),
      };
      setTask((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    } finally {
      setIsAddingTask(false);
    }
  };

  // ─── Open Edit Mode ────────────────────────────────────────────
  const handleOpenEdit = (item) => {
    setEditTask(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  // ─── Save Edit ─────────────────────────────────────────────────
  const handleSaveEdit = async (taskId) => {
    if (!editTitle.trim()) return;
    try {
      const response = await api.put(`/api/task/${taskId}`, {
        title: editTitle,
        description: editDescription,
      });
      const updated = response.data.task;
      setTask((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...updated } : t)),
      );
      setEditTask(null);
    } catch (err) {
      console.log(err);
    }
  };

  // ─── Cancel Edit ───────────────────────────────────────────────
  const handleCancelEdit = () => {
    setEditTask(null);
    setEditTitle("");
    setEditDescription("");
  };

  // ─── Delete Task ───────────────────────────────────────────────
  const handleDeleteTask = async (taskId) => {
    const previousTasks = [...task];
    setTask((prev) => prev.filter((t) => t.id !== taskId));
    try {
      await api.delete(`/api/task/${taskId}`);
    } catch (err) {
      console.log(err);
      setTask(previousTasks);
    }
  };

  // ─── Status Dropdown (mobile-safe positioning) ────────────────
  const handleStatusButtonClick = (e, itemId) => {
    e.stopPropagation();
    setShowLogout(false);
    if (activeMenu === itemId) {
      setActiveMenu(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownHeight = 144; // approx height of 3 options
    const dropdownWidth = 192; // w-48 = 12rem = 192px
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    // Flip up if not enough space below
    const top =
      rect.bottom + dropdownHeight > screenHeight
        ? rect.top - dropdownHeight - 8
        : rect.bottom + 8;

    // Shift left if dropdown goes off right edge
    const left =
      rect.left + dropdownWidth > screenWidth
        ? screenWidth - dropdownWidth - 16
        : rect.left;

    setDropdownPos({ top, left });
    setActiveMenu(itemId);
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    const previousTasks = [...task];
    setTask((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    setActiveMenu(null);
    try {
      await api.put(`/api/task/${taskId}`, {
        status: newStatus,
      });
    } catch (err) {
      console.log(err);
      setTask(previousTasks);
    }
  };

  const filteredTasks = task.filter((t) => {
    if (filter === "ALL") return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center lg:justify-center p-4 lg:p-10 font-sans relative selection:bg-white selection:text-black">
      {/* ── Power / Logout Button ── */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(null);
            setShowLogout((prev) => !prev);
          }}
          className={`p-3 rounded-full border transition-colors duration-200
            ${
              showLogout
                ? "bg-red-500 text-white border-red-500"
                : "bg-transparent border-neutral-800 text-neutral-400 hover:bg-neutral-900 hover:text-white"
            }`}
        >
          <Power size={20} />
        </button>

        {/* Logout Dropdown */}
        {showLogout && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-full right-0 mt-2 w-44 bg-[#1a1616] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-[9999]"
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-all"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-7xl mt-16 lg:mt-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* LEFT: New Task Form */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              Hello, <span className="text-neutral-500">{username}</span>
            </h1>
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-8 lg:p-10">
              <h2 className="text-xs font-semibold text-neutral-500 mb-8 uppercase tracking-widest">
                Create New Task
              </h2>
              <form onSubmit={handleAddTask} className="space-y-5">
                <div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-white outline-none focus:border-white transition-colors placeholder:text-neutral-600 text-lg"
                  />
                </div>
                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows="3"
                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-white outline-none resize-none focus:border-white transition-colors placeholder:text-neutral-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAddingTask}
                  className="w-full mt-4 bg-white text-black font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 text-base hover:bg-neutral-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingTask ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Plus size={20} /> <span>Create Task</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Tasks List */}
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-8 lg:p-10 flex flex-col max-h-[750px]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Your Tasks
              </h2>
              
              <div className="flex bg-neutral-900 p-1 rounded-lg mx-auto lg:mx-0">
                {["ALL", "PENDING", "COMPLETED"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors ${
                      filter === f
                        ? "bg-neutral-700 text-white shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 overflow-y-auto pr-3 custom-scrollbar">
              {isLoadingTasks ? (
                // Skeletons
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="border border-neutral-800 rounded-2xl p-6 space-y-4 animate-pulse bg-[#0a0a0a]">
                    <div className="h-6 bg-neutral-800 rounded w-1/3"></div>
                    <div className="h-4 bg-neutral-800 rounded w-2/3 mt-2"></div>
                    <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
                    <div className="pt-4 border-t border-neutral-800 mt-6 flex justify-between">
                      <div className="h-8 bg-neutral-800 rounded w-24"></div>
                      <div className="h-8 bg-neutral-800 rounded w-16"></div>
                    </div>
                  </div>
                ))
              ) : filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center opacity-60">
                  <div className="bg-white/5 p-6 rounded-full mb-4">
                    <CheckCircle2 size={48} className="text-[#e086ff]/50" />
                  </div>
                  <p className="text-white/60 text-lg font-bold mb-2">
                    {filter === "ALL" ? "No tasks found" : `No ${filter.toLowerCase()} tasks`}
                  </p>
                  <p className="text-white/30 text-sm">
                    {filter === "ALL" ? "Create your first task on the left!" : "Try changing the filter."}
                  </p>
                </div>
              ) : (
                filteredTasks.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6 transition-colors hover:border-neutral-600"
                >
                  {/* Status Indicator */}
                  <div className="absolute left-0 top-6 w-1 h-12 rounded-r-full flex flex-col justify-center">
                    <div className={`w-full h-full transition-colors ${item.status === 'COMPLETED' ? 'bg-neutral-400' : item.status === 'INCOMPLETE' ? 'bg-neutral-600' : 'bg-white'}`} />
                  </div>

                  {/* ── View Mode ── */}
                  {editTask !== item.id ? (
                    <>
                      <div className="min-w-0 pl-4">
                        <h3 className={`font-semibold text-xl tracking-tight break-words transition-colors ${item.status === 'COMPLETED' ? 'text-neutral-500 line-through' : 'text-white'}`}>
                          {item.title}
                        </h3>
                        <p className="text-neutral-400 text-sm mt-2 break-words line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-5 mt-5 border-t border-neutral-800 pl-4">
                        {/* Status Button */}
                        <button
                          onClick={(e) => handleStatusButtonClick(e, item.id)}
                          className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-md text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                        >
                          <span>{item.status}</span>
                          <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.id ? "rotate-180" : ""}`} />
                        </button>

                        {/* Edit & Delete */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenEdit(item)} className="p-2 rounded-md text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDeleteTask(item.id)} className="p-2 rounded-md text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* ── Edit Mode ── */
                    <div className="space-y-4 pl-4">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-transparent border-b border-neutral-600 focus:border-white py-2 text-white outline-none text-lg font-semibold transition-colors"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="3"
                        className="w-full bg-transparent border-b border-neutral-600 focus:border-white py-2 text-white outline-none resize-none text-sm transition-colors"
                      />
                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="flex items-center space-x-2 bg-white text-black font-medium text-xs px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors"
                        >
                          <Check size={14} /> <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium text-xs px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors"
                        >
                          <X size={14} /> <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )))}
            </div>
          </div>
        </div>
      </div>

      {/* FIXED STATUS DROPDOWN — mobile safe */}
      {activeMenu !== null && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed w-48 bg-[#0a0a0a] border border-neutral-800 rounded-xl shadow-2xl z-[9999] overflow-hidden"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <StatusOption
            icon={<Clock size={14} />}
            label="PENDING"
            onClick={() => handleUpdateStatus(activeMenu, "PENDING")}
          />
          <StatusOption
            icon={<CheckCircle2 size={14} />}
            label="COMPLETED"
            onClick={() => handleUpdateStatus(activeMenu, "COMPLETED")}
          />
          <StatusOption
            icon={<XCircle size={14} />}
            label="INCOMPLETE"
            isLast
            onClick={() => handleUpdateStatus(activeMenu, "INCOMPLETE")}
          />
        </div>
      )}
    </div>
  );
};

const StatusOption = ({ icon, label, onClick, isLast }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-xs text-neutral-400 font-medium hover:bg-neutral-900 hover:text-white transition-colors ${!isLast ? "border-b border-neutral-800" : ""}`}
  >
    {icon} <span>{label}</span>
  </button>
);

export default Dashboard;
