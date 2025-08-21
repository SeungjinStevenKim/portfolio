import express from 'express';
import { pool } from '../config/database.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const [projects] = await pool.query(`
      SELECT 
        id,
        title,
        description,
        technologies,
        github_url,
        live_url,
        image_url,
        featured,
        order_index,
        created_at,
        updated_at
      FROM projects
      ORDER BY order_index ASC, created_at DESC
    `);

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new project (admin only)
router.post('/', requireAdminKey, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      technologies, 
      github_url, 
      live_url, 
      image_url, 
      featured = false,
      order_index = 0 
    } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const [result] = await pool.query(`
      INSERT INTO projects (
        title, description, technologies, github_url, live_url, image_url, featured, order_index
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, description, technologies, github_url, live_url, image_url, featured, order_index]);

    res.status(201).json({ 
      message: 'Project created successfully',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update project (admin only)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      technologies, 
      github_url, 
      live_url, 
      image_url, 
      featured,
      order_index 
    } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    await pool.query(`
      UPDATE projects SET 
        title = ?, 
        description = ?, 
        technologies = ?, 
        github_url = ?, 
        live_url = ?, 
        image_url = ?, 
        featured = ?, 
        order_index = ?
      WHERE id = ?
    `, [title, description, technologies, github_url, live_url, image_url, featured, order_index, id]);

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE project (admin only)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
