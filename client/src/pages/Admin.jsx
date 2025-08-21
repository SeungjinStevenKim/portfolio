import React, { useState, useEffect } from 'react';
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

  const authenticate = () => {
    if (adminKey.trim()) {
      setIsAuthenticated(true);
      setMessage('Authentication successful!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Please enter admin key.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, projRes] = await Promise.all([
        fetch('/api/experience'),
        fetch('/api/projects')
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

      const response = await fetch('/api/experience', {
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
      const response = await fetch('/api/projects', {
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

      const response = await fetch(`/api/experience/${editingExpId}`, {
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
      const response = await fetch(`/api/experience/${id}`, {
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
      const response = await fetch(`/api/projects/${id}`, {
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
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Admin Panel</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your portfolio content</p>
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