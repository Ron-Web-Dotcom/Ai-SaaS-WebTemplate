import { useState, useEffect } from 'react';
import {
  Plus,
  FolderKanban,
  Star,
  MoreVertical,
  Trash2,
  Edit3,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmationModal from '../ConfirmationModal';

interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  favorite: boolean;
  created_at: string;
  updated_at: string;
}

const colorOptions = [
  { value: '#3B82F6', label: 'Blue' },
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#10B981', label: 'Green' },
  { value: '#F59E0B', label: 'Amber' },
  { value: '#EF4444', label: 'Red' },
  { value: '#06B6D4', label: 'Cyan' }
];

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  useEffect(() => {
    loadProjects();
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false});

    if (data) {
      setProjects(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update(formData)
        .eq('id', editingProject.id);

      if (!error) {
        loadProjects();
        closeModal();
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          ...formData
        });

      if (!error) {
        loadProjects();
        closeModal();
      }
    }
  };

  const toggleFavorite = async (project: Project) => {
    await supabase
      .from('projects')
      .update({ favorite: !project.favorite })
      .eq('id', project.id);
    loadProjects();
  };

  const deleteProject = async (id: string) => {
    setProjectToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectToDelete);
      if (error) throw error;
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setProjectToDelete(null);
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      color: project.color
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({ name: '', description: '', color: '#3B82F6' });
  };

  const favoriteProjects = projects.filter(p => p.favorite);
  const regularProjects = projects.filter(p => !p.favorite);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects</h1>
          <p className="text-slate-600">Organize your AI work into projects</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Favorites Section */}
      {favoriteProjects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Star size={20} className="text-amber-500" />
            Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onToggleFavorite={toggleFavorite}
                onEdit={openEditModal}
                onDelete={deleteProject}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          {favoriteProjects.length > 0 ? 'All Projects' : 'Your Projects'}
        </h2>
        {regularProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onToggleFavorite={toggleFavorite}
                onEdit={openEditModal}
                onDelete={deleteProject}
              />
            ))}
          </div>
        ) : favoriteProjects.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200/50 p-12 text-center">
            <div className="inline-flex p-6 bg-slate-50 rounded-2xl mb-4">
              <FolderKanban size={48} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No projects yet</h3>
            <p className="text-slate-600 mb-6">Create your first project to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              Create Project
            </button>
          </div>
        ) : null}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Awesome Project"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="What's this project about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Color Theme
                </label>
                <div className="flex gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        formData.color === color.value
                          ? 'ring-2 ring-offset-2 ring-slate-900 scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

function ProjectCard({
  project,
  onToggleFavorite,
  onEdit,
  onDelete
}: {
  project: Project;
  onToggleFavorite: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group bg-white rounded-xl border border-slate-200/50 p-6 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: project.color }}
        >
          <FolderKanban size={24} className="text-white" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(project)}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Star
              size={18}
              className={project.favorite ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}
            />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <MoreVertical size={18} className="text-slate-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-10">
                <button
                  onClick={() => {
                    onEdit(project);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-slate-50 transition-colors"
                >
                  <Edit3 size={16} className="text-slate-600" />
                  <span className="text-sm text-slate-900">Edit</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(project.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} className="text-red-600" />
                  <span className="text-sm text-red-600">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.name}</h3>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
        {project.description || 'No description'}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
          <span>Open</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
