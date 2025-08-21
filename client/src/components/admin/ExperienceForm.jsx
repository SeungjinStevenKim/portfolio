import React from 'react';

export default function ExperienceForm({ 
  expForm, 
  setExpForm, 
  editingExpId, 
  addExperience, 
  editExperience, 
  cancelEdit 
}) {
  const addPosition = () => {
    setExpForm({
      ...expForm,
      positions: [...expForm.positions, { title: '', period: '', technologies: '', bullets: [''] }]
    });
  };

  const removePosition = (index) => {
    const newPositions = expForm.positions.filter((_, i) => i !== index);
    setExpForm({ ...expForm, positions: newPositions });
  };

  const addBullet = (posIndex) => {
    const newPositions = [...expForm.positions];
    newPositions[posIndex].bullets.push('');
    setExpForm({ ...expForm, positions: newPositions });
  };

  const removeBullet = (posIndex, bulletIndex) => {
    const newPositions = [...expForm.positions];
    newPositions[posIndex].bullets.splice(bulletIndex, 1);
    setExpForm({ ...expForm, positions: newPositions });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
        {editingExpId ? 'Edit Experience' : 'Add New Experience'}
      </h2>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          value={expForm.company}
          onChange={(e) => setExpForm({...expForm, company: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <input
          type="text"
          placeholder="Location"
          value={expForm.location}
          onChange={(e) => setExpForm({...expForm, location: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Positions</h3>
            <button
              onClick={addPosition}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded transition-colors"
            >
              Add Position
            </button>
          </div>

          {expForm.positions.map((position, posIndex) => (
            <div key={posIndex} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Position {posIndex + 1}</h4>
                {expForm.positions.length > 1 && (
                  <button
                    onClick={() => removePosition(posIndex)}
                    className="px-2 py-1 bg-rose-500 hover:bg-rose-600 text-white text-xs rounded transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Job Title"
                value={position.title}
                onChange={(e) => {
                  const newPositions = [...expForm.positions];
                  newPositions[posIndex].title = e.target.value;
                  setExpForm({...expForm, positions: newPositions});
                }}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg mb-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              <input
                type="text"
                placeholder="Period"
                value={position.period}
                onChange={(e) => {
                  const newPositions = [...expForm.positions];
                  newPositions[posIndex].period = e.target.value;
                  setExpForm({...expForm, positions: newPositions});
                }}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg mb-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={position.technologies}
                onChange={(e) => {
                  const newPositions = [...expForm.positions];
                  newPositions[posIndex].technologies = e.target.value;
                  setExpForm({...expForm, positions: newPositions});
                }}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg mb-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Descriptions</h4>
                  <button
                    onClick={() => addBullet(posIndex)}
                    className="p-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors"
                    title="Add Job Description"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                
                {position.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="mb-3">
                    <div className="flex items-center gap-2">
                      <textarea
                        placeholder="Job Description"
                        value={bullet}
                        onChange={(e) => {
                          const newPositions = [...expForm.positions];
                          newPositions[posIndex].bullets[bulletIndex] = e.target.value;
                          setExpForm({...expForm, positions: newPositions});
                        }}
                        rows={3}
                        className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y min-h-[80px]"
                      />
                      {position.bullets.length > 1 && (
                        <button
                          onClick={() => removeBullet(posIndex, bulletIndex)}
                          className="p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-colors flex-shrink-0"
                          title="Delete Job Description"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {editingExpId ? (
            <>
              <button
                onClick={editExperience}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
              >
                Update Experience
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addExperience}
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
            >
              Add Experience
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
