import express from 'express';
import { pool } from '../config/database.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();

// GET all experience
router.get('/', async (req, res) => {
  try {
    const [experiences] = await pool.query(`
      SELECT 
        e.id,
        e.company,
        e.location,
        e.created_at,
        e.updated_at
      FROM experience e
      ORDER BY e.created_at DESC
    `);

    const result = [];
    
    for (const exp of experiences) {
      const [positions] = await pool.query(`
        SELECT 
          ep.id,
          ep.title,
          ep.period,
          ep.technologies,
          ep.created_at,
          ep.updated_at
        FROM experience_positions ep
        WHERE ep.experience_id = ?
        ORDER BY ep.created_at DESC
      `, [exp.id]);

      const positionsWithBullets = [];
      
      for (const pos of positions) {
        const [bullets] = await pool.query(`
          SELECT 
            eb.id,
            eb.bullet_text,
            eb.order_index,
            eb.created_at,
            eb.updated_at
          FROM experience_bullets eb
          WHERE eb.position_id = ?
          ORDER BY eb.order_index ASC
        `, [pos.id]);

        positionsWithBullets.push({
          ...pos,
          bullets: bullets.map(b => b.bullet_text)
        });
      }

      result.push({
        ...exp,
        positions: positionsWithBullets
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new experience (admin only)
router.post('/', requireAdminKey, async (req, res) => {
  try {
    const { company, location, positions } = req.body;
    
    if (!company || !location || !positions || !Array.isArray(positions)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert experience
    const [expResult] = await pool.query(
      'INSERT INTO experience (company, location) VALUES (?, ?)',
      [company, location]
    );
    
    const experienceId = expResult.insertId;

    // Insert positions and bullets
    for (const position of positions) {
      const [posResult] = await pool.query(
        'INSERT INTO experience_positions (experience_id, title, period, technologies) VALUES (?, ?, ?, ?)',
        [experienceId, position.title, position.period, position.technologies || null]
      );
      
      const positionId = posResult.insertId;

      // Insert bullets
      if (position.bullets && Array.isArray(position.bullets)) {
        for (let i = 0; i < position.bullets.length; i++) {
          await pool.query(
            'INSERT INTO experience_bullets (position_id, bullet_text, order_index) VALUES (?, ?, ?)',
            [positionId, position.bullets[i], i]
          );
        }
      }
    }

    res.status(201).json({ 
      message: 'Experience created successfully',
      id: experienceId 
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update experience (admin only)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    const { company, location, positions } = req.body;
    
    if (!company || !location || !positions || !Array.isArray(positions)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update experience
    await pool.query(
      'UPDATE experience SET company = ?, location = ? WHERE id = ?',
      [company, location, id]
    );

    // Delete existing positions and bullets
    const [existingPositions] = await pool.query(
      'SELECT id FROM experience_positions WHERE experience_id = ?',
      [id]
    );
    
    for (const pos of existingPositions) {
      await pool.query('DELETE FROM experience_bullets WHERE position_id = ?', [pos.id]);
    }
    
    await pool.query('DELETE FROM experience_positions WHERE experience_id = ?', [id]);

    // Insert new positions and bullets
    for (const position of positions) {
      const [posResult] = await pool.query(
        'INSERT INTO experience_positions (experience_id, title, period, technologies) VALUES (?, ?, ?, ?)',
        [id, position.title, position.period, position.technologies || null]
      );
      
      const positionId = posResult.insertId;

      if (position.bullets && Array.isArray(position.bullets)) {
        for (let i = 0; i < position.bullets.length; i++) {
          await pool.query(
            'INSERT INTO experience_bullets (position_id, bullet_text, order_index) VALUES (?, ?, ?)',
            [positionId, position.bullets[i], i]
          );
        }
      }
    }

    res.json({ message: 'Experience updated successfully' });
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE experience (admin only)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete experience (cascade will handle positions and bullets)
    await pool.query('DELETE FROM experience WHERE id = ?', [id]);
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
