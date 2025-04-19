// src/components/Resources/ResourcePage.js
import React, { useState } from 'react';
import './ResourcePage.css';

// Sample resource data
const RESOURCES = [
 {
  title: 'Stack Overflow',
  url: 'https://stackoverflow.com/',
  category: 'Community',
  description: 'Community‑driven Q&A for programming questions.'
},
{
  title: 'GitHub Docs',
  url: 'https://docs.github.com/',
  category: 'Documentation',
  description: 'Official documentation for GitHub features and APIs.'
},
{
  title: 'React – A JavaScript library for building user interfaces',
  url: 'https://reactjs.org/docs/getting-started.html',
  category: 'Documentation',
  description: 'Official React documentation and tutorials.'
},
{
  title: 'Node.js',
  url: 'https://nodejs.org/en/docs/',
  category: 'Documentation',
  description: 'Official Node.js documentation and API reference.'
},
{
  title: 'Express.js Guide',
  url: 'https://expressjs.com/en/starter/installing.html',
  category: 'Documentation',
  description: 'Official guide and API reference for Express.js.'
},
{
  title: 'W3Schools',
  url: 'https://www.w3schools.com/',
  category: 'Tutorials',
  description: 'Easy‑to‑follow tutorials on HTML, CSS, JavaScript and more.'
},
{
  title: 'Codecademy',
  url: 'https://www.codecademy.com/',
  category: 'Tutorials',
  description: 'Interactive coding lessons across multiple languages and frameworks.'
},
{
  title: 'Udemy',
  url: 'https://www.udemy.com/',
  category: 'Courses',
  description: 'Thousands of paid and free courses on programming, design, and more.'
},
{
  title: 'Coursera',
  url: 'https://www.coursera.org/',
  category: 'Courses',
  description: 'University‑level online courses from top institutions.'
},
{
  title: 'Pluralsight',
  url: 'https://www.pluralsight.com/',
  category: 'Courses',
  description: 'Tech‑focused video courses and skill assessments.'
},
{
  title: 'Khan Academy',
  url: 'https://www.khanacademy.org/computing/computer-programming',
  category: 'Tutorials',
  description: 'Free lessons on computer science and programming basics.'
},
{
  title: 'Eloquent JavaScript',
  url: 'https://eloquentjavascript.net/',
  category: 'Books',
  description: 'A modern introduction to JavaScript, available to read online.'
},
{
  title: 'You Don’t Know JS (book series)',
  url: 'https://github.com/getify/You-Dont-Know-JS',
  category: 'Books',
  description: 'In‑depth book series on JavaScript’s core mechanisms.'
},
{
  title: 'Traversy Media',
  url: 'https://www.youtube.com/c/TraversyMedia',
  category: 'Videos',
  description: 'YouTube tutorials on web development and frameworks.'
},
{
  title: 'The Net Ninja',
  url: 'https://www.youtube.com/c/TheNetNinja',
  category: 'Videos',
  description: 'Concise video tutorials on JavaScript, React, Node.js, and more.'
},
{
  title: 'Academind',
  url: 'https://www.youtube.com/c/Academind',
  category: 'Videos',
  description: 'In‑depth tutorials and courses on web technologies.'
},
{
  title: 'Smashing Magazine',
  url: 'https://www.smashingmagazine.com/',
  category: 'Articles',
  description: 'Articles on web design, development, and UX best practices.'
},
{
  title: 'A List Apart',
  url: 'https://alistapart.com/',
  category: 'Articles',
  description: 'Explores the design, development, and meaning of web content.'
},
{
  title: 'Dev.to',
  url: 'https://dev.to/',
  category: 'Community',
  description: 'Community of developers sharing articles and tutorials.'
},
{
  title: 'CodePen',
  url: 'https://codepen.io/',
  category: 'Tools',
  description: 'Online code editor and social development environment for front‑end.'
},

  // …add more as needed
];

export default function ResourcePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // Filter resources by search and category
  const filtered = RESOURCES.filter(r => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === 'All' || r.category === filter;
    return matchesSearch && matchesCategory;
  });

  // Derive unique categories
  const categories = ['All', ...new Set(RESOURCES.map(r => r.category))];

  return (
    <div className="resource-page">
      <h2>Resources</h2>

      <div className="resource-controls">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="resource-grid">
        {filtered.map((r, i) => (
          <div className="resource-card" key={i}>
            <h3><a href={r.url} target="_blank" rel="noreferrer">{r.title}</a></h3>
            <p className="resource-category">{r.category}</p>
            <p className="resource-desc">{r.description}</p>
          </div>
        ))}

        {filtered.length === 0 && <p>No resources found.</p>}
      </div>
    </div>
  );
}
