const skillsData = {
  languages: [
    { name: 'HTML', proficiency: 95 },
    { name: 'CSS', proficiency: 90 },
    { name: 'JavaScript', proficiency: 88 },
    { name: 'Java', proficiency: 75 }
  ],
  frameworks: [
    { name: 'Node.js', proficiency: 82 },
    { name: 'Express.js', proficiency: 80 }
  ],
  database: [
    { name: 'MongoDB', proficiency: 78 },
    { name: 'Mongoose', proficiency: 76 }
  ],
  tools: [
    { name: 'GitHub', proficiency: 92 },
    { name: 'GitHub Pages', proficiency: 88 },
    { name: 'Vercel', proficiency: 85 }
  ]
};

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const categories = [
    { key: 'languages', title: 'Languages', icon: '💻' },
    { key: 'frameworks', title: 'Frameworks', icon: '🚀' },
    { key: 'database', title: 'Database', icon: '💾' },
    { key: 'tools', title: 'Tools', icon: '🛠️' }
  ];

  categories.forEach(cat => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';
    
    let skillsHtml = `
      <h3 class="skill-category-title">
        <span class="category-icon">${cat.icon}</span>
        ${cat.title}
      </h3>
      <div class="skill-list">
    `;

    skillsData[cat.key].forEach(skill => {
      skillsHtml += `
        <div class="skill-item" style="--percent: ${skill.proficiency}%">
          <div class="skill-info">
            <span class="skill-name">${skill.name}</span>
          </div>
          <div class="skill-bar-container">
            <div class="skill-bar-fill"></div>
          </div>
        </div>
      `;
    });

    skillsHtml += `</div>`;
    categoryDiv.innerHTML = skillsHtml;
    grid.appendChild(categoryDiv);
  });
}

document.addEventListener('DOMContentLoaded', renderSkills);
