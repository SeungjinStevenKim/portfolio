import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import AuthForm from '../components/admin/AuthForm';
import AdminTabs from '../components/admin/AdminTabs';
import ExperienceForm from '../components/admin/ExperienceForm';
import ExperienceList from '../components/admin/ExperienceList';
import ProjectForm from '../components/admin/ProjectForm';
import ProjectList from '../components/admin/ProjectList';

export default function Admin() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('experience');
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingExpId, setEditingExpId] = useState(null);

  // Experience form state
  const [expForm, setExpForm] = useState({
    company: '',
    location: '',
    positions: [{ title: '', period: '', technologies: '', bullets: [''] }]
  });

  // Project form state
  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    live_url: '',
    image_url: '',
    featured: false,
    order_index: 0
  });

  const authenticate = async () => {
    if (!adminKey.trim()) {
      setMessage('Please enter admin key.');
      return;
    }

    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/admin/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        }
      });

      if (response.status === 401) {
        setMessage('Invalid admin key. Please try again.');
        setIsAuthenticated(false);
      } else if (response.ok) {
        setIsAuthenticated(true);
        setMessage('Authentication successful!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Authentication failed. Please check your admin key.');
        setIsAuthenticated(false);
      }
    } catch (error) {
      setMessage('Connection error. Please check your internet connection.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const [expRes, projRes] = await Promise.all([
        fetch(`${apiUrl}/api/experience`),
        fetch(`${apiUrl}/api/projects`)
      ]);
      
      if (expRes.ok) {
        const expData = await expRes.json();
        setExperience(expData);
      }
      
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData);
      }
    } catch (error) {
      setMessage('Failed to load data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const addExperience = async () => {
    try {
      // Filter out empty positions and bullets
      const filteredForm = {
        ...expForm,
        positions: expForm.positions
          .filter(pos => pos.title.trim() || pos.period.trim() || pos.bullets.some(bullet => bullet.trim()))
          .map(pos => ({
            ...pos,
            bullets: pos.bullets.filter(bullet => bullet.trim())
          }))
      };

      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/experience`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify(filteredForm)
      });

      if (response.ok) {
        setMessage('Experience added successfully!');
        setExpForm({ company: '', location: '', positions: [{ title: '', period: '', technologies: '', bullets: [''] }] });
        fetchData();
      } else {
        const error = await response.json();
        setMessage('Failed to add experience: ' + error.error);
      }
    } catch (error) {
      setMessage('Failed to add experience: ' + error.message);
    }
  };

  const addProject = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify(projForm)
      });

      if (response.ok) {
        setMessage('Project added successfully!');
        setProjForm({
          title: '',
          description: '',
          technologies: '',
          github_url: '',
          live_url: '',
          image_url: '',
          featured: false,
          order_index: 0
        });
        fetchData();
      } else {
        const error = await response.json();
        setMessage('Failed to add project: ' + error.error);
      }
    } catch (error) {
      setMessage('Failed to add project: ' + error.message);
    }
  };

  const editExperience = async () => {
    try {
      // Filter out empty positions and bullets
      const filteredForm = {
        ...expForm,
        positions: expForm.positions
          .filter(pos => pos.title.trim() || pos.period.trim() || pos.bullets.some(bullet => bullet.trim()))
          .map(pos => ({
            ...pos,
            bullets: pos.bullets.filter(bullet => bullet.trim())
          }))
      };

      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/experience/${editingExpId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify(filteredForm)
      });

      if (response.ok) {
        setMessage('Experience updated successfully!');
        setExpForm({ company: '', location: '', positions: [{ title: '', period: '', technologies: '', bullets: [''] }] });
        setEditingExpId(null);
        fetchData();
      } else {
        const error = await response.json();
        setMessage('Failed to update experience: ' + error.error);
      }
    } catch (error) {
      setMessage('Failed to update experience: ' + error.message);
    }
  };

  const startEditExperience = (exp) => {
    setEditingExpId(exp.id);
    setExpForm({
      company: exp.company,
      location: exp.location,
      positions: exp.positions.map(pos => ({
        title: pos.title,
        period: pos.period,
        technologies: pos.technologies || '',
        bullets: [...pos.bullets]
      }))
    });
  };

  const cancelEdit = () => {
    setEditingExpId(null);
    setExpForm({ company: '', location: '', positions: [{ title: '', period: '', technologies: '', bullets: [''] }] });
  };

  const deleteExperience = async (id) => {
    if (!confirm('Are you sure you want to delete?')) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/experience/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });

      if (response.ok) {
        setMessage('Experience deleted successfully!');
        fetchData();
      } else {
        const error = await response.json();
        setMessage('Failed to delete experience: ' + error.error);
      }
    } catch (error) {
      setMessage('Failed to delete experience: ' + error.message);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete?')) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });

      if (response.ok) {
        setMessage('Project deleted successfully!');
        fetchData();
      } else {
        const error = await response.json();
        setMessage('Failed to delete project: ' + error.error);
      }
    } catch (error) {
      setMessage('Failed to delete project: ' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthForm 
        adminKey={adminKey}
        setAdminKey={setAdminKey}
        authenticate={authenticate}
        message={message}
        loading={loading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 relative">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Admin Panel</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your portfolio content</p>
          </div>
          <Link
            to="/"
            className="absolute top-0 right-0 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors inline-flex items-center gap-2"
          >
            <FaHome /> Back to Home
          </Link>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successful') || message.includes('successfully')
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}>
            {message}
          </div>
        )}

        <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'experience' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExperienceForm 
              expForm={expForm}
              setExpForm={setExpForm}
              editingExpId={editingExpId}
              addExperience={addExperience}
              editExperience={editExperience}
              cancelEdit={cancelEdit}
            />
            <ExperienceList 
              experience={experience}
              loading={loading}
              startEditExperience={startEditExperience}
              deleteExperience={deleteExperience}
            />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectForm 
              projForm={projForm}
              setProjForm={setProjForm}
              addProject={addProject}
            />
            <ProjectList 
              projects={projects}
              loading={loading}
              deleteProject={deleteProject}
            />
          </div>
        )}
      </div>
    </div>
  );
}