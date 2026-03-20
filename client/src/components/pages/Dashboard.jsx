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
  const [username, setUsername] = useState(""); // 👈 add this

  const navigate = useNavigate();

  // ─── Fetch Tasks ───────────────────────────────────────────────
  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/task");
      const fetchedTasks = response.data.tasks.map((t) => ({
        ...t,
        status: (t.status || "PENDING").toUpperCase(),
      }));
      setTask(fetchedTasks);
    } catch (err) {
      console.log(err);
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
    try {
      await api.post("/api/task/create", { title, description });
      await fetchTasks();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
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
    try {
      await api.delete(`/api/task/${taskId}`);
      setTask((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.log(err);
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
    try {
      const response = await api.put(`/api/task/${taskId}`, {
        status: newStatus,
      });
      const updated = response.data.task;
      setTask((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...updated } : t)),
      );
      setActiveMenu(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1616] flex flex-col items-center lg:justify-center p-4 lg:p-10 font-sans relative">
      {/* ── Power / Logout Button ── */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(null);
            setShowLogout((prev) => !prev);
          }}
          className={`p-3 rounded-full border transition-all
            ${
              showLogout
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : "bg-white/5 border-white/10 text-white hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
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

      <div className="w-full max-w-6xl mt-16 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          {/* LEFT: New Task Form */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-white text-center">
              Hello <span className="text-[#e086ff]">{username}</span>
            </h1>
            <div className="bg-black/40 border border-[#e086ff]/20 rounded-[40px] p-10 shadow-xl">
              <h2 className="text-[10px] font-black text-white/40 mb-8 uppercase tracking-[0.4em] text-center italic">
                New Task
              </h2>
              <form onSubmit={handleAddTask} className="space-y-5">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task Title"
                  className="w-full bg-[#2a2424] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#e086ff]/40 transition-all"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows="4"
                  className="w-full bg-[#2a2424] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none resize-none focus:border-[#e086ff]/40 transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-[#e086ff] text-black font-black py-4 rounded-full flex items-center justify-center space-x-2 text-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <Plus size={20} /> <span>Add Task</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Tasks List */}
          <div className="bg-black/40 border border-[#e086ff]/20 rounded-[40px] p-8 lg:p-12 shadow-xl flex flex-col max-h-[700px]">
            <h2 className="text-[10px] font-black text-white/40 mb-8 uppercase tracking-[0.4em] text-center lg:text-left italic">
              Your Tasks
            </h2>

            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              {task.length === 0 && (
                <p className="text-white/20 text-sm text-center py-10 italic">
                  No tasks yet. Add one!
                </p>
              )}

              {task.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2a2424]/60 border border-white/5 rounded-[32px] p-6 space-y-4"
                >
                  {/* ── View Mode ── */}
                  {editTask !== item.id ? (
                    <>
                      <div className="min-w-0">
                        {/* ✅ break-words prevents long text overflow */}
                        <h3 className="text-[#e086ff] font-bold text-xl uppercase tracking-tighter break-words">
                          {item.title}
                        </h3>
                        {/* ✅ line-clamp-3 limits to 3 lines, break-words wraps long text */}
                        <p className="text-white/40 text-sm mt-1 break-words line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        {/* Status Button */}
                        <button
                          onClick={(e) => handleStatusButtonClick(e, item.id)}
                          className="flex items-center space-x-2 bg-black/40 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white/60 uppercase transition-all hover:text-[#e086ff]"
                        >
                          <span>{item.status}</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${activeMenu === item.id ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Edit & Delete */}
                        <div className="flex items-center space-x-4">
                          <Edit3
                            size={18}
                            className="cursor-pointer text-white/20 hover:text-[#e086ff] transition-colors"
                            onClick={() => handleOpenEdit(item)}
                          />
                          <Trash2
                            size={18}
                            className="cursor-pointer text-white/20 hover:text-red-500 transition-colors"
                            onClick={() => handleDeleteTask(item.id)}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* ── Edit Mode ── */
                    <div className="space-y-3">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-[#1a1616] border border-[#e086ff]/40 rounded-xl py-3 px-4 text-white outline-none text-sm"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="3"
                        className="w-full bg-[#1a1616] border border-[#e086ff]/40 rounded-xl py-3 px-4 text-white outline-none resize-none text-sm"
                      />
                      <div className="flex items-center space-x-3 pt-1">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="flex items-center space-x-2 bg-[#e086ff] text-black font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl hover:brightness-110 transition-all"
                        >
                          <Check size={13} /> <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center space-x-2 bg-white/5 border border-white/10 text-white/50 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-white/10 transition-all"
                        >
                          <X size={13} /> <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FIXED STATUS DROPDOWN — mobile safe */}
      {activeMenu !== null && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed w-48 bg-[#1a1616] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[9999]"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <StatusOption
            icon={<Clock size={14} className="text-orange-400" />}
            label="PENDING"
            onClick={() => handleUpdateStatus(activeMenu, "PENDING")}
          />
          <StatusOption
            icon={<CheckCircle2 size={14} className="text-green-400" />}
            label="COMPLETED"
            onClick={() => handleUpdateStatus(activeMenu, "COMPLETED")}
          />
          <StatusOption
            icon={<XCircle size={14} className="text-red-400" />}
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
    className={`w-full flex items-center space-x-3 px-5 py-4 text-[10px] text-white font-black uppercase tracking-widest hover:bg-[#e086ff] hover:text-black transition-all ${!isLast ? "border-b border-white/5" : ""}`}
  >
    {icon} <span>{label}</span>
  </button>
);

export default Dashboard;
