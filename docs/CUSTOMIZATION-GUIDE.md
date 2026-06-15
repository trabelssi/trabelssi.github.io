# 🎨 Customization Guide

## Quick Customization Checklist

### 1. Change Colors (styles.css)

Find the `:root` section at the top of `styles.css`:

```css
:root {
    --primary-color: #00d9ff;      /* Main cyan color */
    --secondary-color: #7000ff;    /* Purple accent */
    --accent-color: #ff006e;       /* Pink accent */
    --success-color: #00ff88;      /* Green accent */
    --bg-dark: #0d0221;           /* Dark background */
    --text-light: #f0f0f0;        /* Light text */
}
```

**Popular Color Schemes:**

**Blue Tech:**
```css
--primary-color: #0099ff;
--secondary-color: #0055ff;
--accent-color: #00ccff;
```

**Green Matrix:**
```css
--primary-color: #00ff00;
--secondary-color: #00cc00;
--accent-color: #00ff88;
```

**Orange Fire:**
```css
--primary-color: #ff6600;
--secondary-color: #ff3300;
--accent-color: #ffaa00;
```

**Pink/Purple:**
```css
--primary-color: #ff0099;
--secondary-color: #cc00ff;
--accent-color: #ff66cc;
```

### 2. Update Personal Info (index.html)

**Contact Details:**
```html
<!-- Search for these and replace: -->
aminetrabls021@gmail.com
+216 22 235 413
Jammel, Monastir, Tunisia
```

**Social Links:**
```html
<!-- Update these href attributes: -->
<a href="https://github.com/trabelssi">
<a href="https://www.linkedin.com/in/your-profile">
```

### 3. Modify Skills (index.html)

Find the `<section id="skills">` and edit:

```html
<div class="skill-category">
    <div class="skill-icon"><i class="fas fa-your-icon"></i></div>
    <h3>Your Category</h3>
    <ul class="skill-list">
        <li><span class="skill-bullet">▹</span> Your Skill</li>
    </ul>
</div>
```

**Font Awesome Icons:** [Find icons here](https://fontawesome.com/icons)

### 4. Add/Edit Projects (index.html)

```html
<div class="project-card" data-aos="fade-up">
    <div class="project-image">
        <div class="project-placeholder">
            <i class="fas fa-laptop-code"></i> <!-- Change icon -->
        </div>
    </div>
    <div class="project-content">
        <!-- Add badge (optional): -->
        <div class="project-badge">🏆 Featured</div>
        
        <h3>Your Project Name</h3>
        <p>Project description goes here...</p>
        
        <div class="project-tech">
            <span>Tech1</span>
            <span>Tech2</span>
            <span>Tech3</span>
        </div>
        
        <div class="project-links">
            <a href="https://github.com/yourrepo" class="project-link">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://yourlivesite.com" class="project-link">
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    </div>
</div>
```

### 5. Customize Typing Animation (script.js)

Find `setupTypingEffect()` function:

```javascript
const phrases = [
    'Your Title 1',
    'Your Title 2',
    'Your Title 3',
    'Your Title 4'
];
```

### 6. Update Chatbot Responses (chatbot.js)

Find `this.faqDatabase` object:

```javascript
'keywords|here|separated': {
    responses: [
        "Your response option 1",
        "Your response option 2",
        "Your response option 3"
    ],
    keywords: ['keywords', 'here', 'separated']
}
```

**Add New FAQ Topic:**

```javascript
'new topic|keywords|synonyms': {
    responses: [
        "Answer to the new topic with details.\n\nYou can use line breaks!"
    ],
    keywords: ['new', 'topic', 'keywords']
}
```

### 7. Change Particle Colors (particles.js)

Find `createParticles()` function:

```javascript
const colors = [
    'rgba(0, 217, 255, 0.6)',  // Cyan
    'rgba(112, 0, 255, 0.6)',  // Purple
    'rgba(255, 0, 110, 0.6)',  // Pink
    'rgba(0, 255, 136, 0.6)'   // Green
];
```

### 8. Adjust Animation Speed

**Make animations faster/slower:**

```css
/* In styles.css, find @keyframes and adjust duration */

/* Example: Make floating shapes slower */
.floating-shape {
    animation: floatShape 30s ease-in-out infinite; /* Was 20s */
}

/* Example: Make buttons shimmer faster */
@keyframes shimmer {
    /* Change from 3s to 2s */
}
```

### 9. Add New Section

```html
<!-- Add before footer -->
<section id="newsection" class="section">
    <div class="container">
        <h2 class="section-title" data-aos="fade-up">
            <span class="title-number">05.</span> New Section
        </h2>
        <div class="your-content" data-aos="fade-up">
            <!-- Your content here -->
        </div>
    </div>
</section>
```

Don't forget to add to navigation:
```html
<li><a href="#newsection" class="nav-link">New Section</a></li>
```

### 10. Replace Profile Picture

Option A: Use your own image:
```html
<!-- Replace this: -->
<div class="profile-placeholder">
    <i class="fas fa-user-astronaut"></i>
</div>

<!-- With this: -->
<img src="profile picture.jpg" alt="Mohamed Amine Trabelsi">
```

Option B: Keep placeholder, change icon:
```html
<div class="profile-placeholder">
    <i class="fas fa-rocket"></i> <!-- Or any Font Awesome icon -->
</div>
```

## 🎯 Advanced Customizations

### Add Smooth Scroll Offset

If sections are hidden behind navbar:

```css
/* In styles.css */
html {
    scroll-padding-top: 100px; /* Adjust as needed */
}
```

### Change Number of Particles

In `particles.js`:

```javascript
this.particleCount = 150; // Default is 100
```

### Disable Specific Animations

```css
/* In styles.css, comment out or remove animations */

/* Disable glitch effect: */
.glitch::before,
.glitch::after {
    /* display: none; */
}

/* Disable floating shapes: */
.floating-shape {
    /* display: none; */
}
```

### Add Custom Font

```html
<!-- In index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
```

```css
/* In styles.css */
body {
    font-family: 'Poppins', sans-serif;
}
```

### Change Hero Background

```css
/* In styles.css, modify body::before gradient */
body::before {
    background: 
        radial-gradient(ellipse at 30% 40%, rgba(255, 0, 0, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 60%, rgba(0, 255, 0, 0.15) 0%, transparent 50%);
}
```

### Mobile Responsive Adjustments

```css
/* In styles.css, find @media queries and adjust: */

@media (max-width: 768px) {
    .glitch {
        font-size: 2rem; /* Make name smaller on mobile */
    }
    
    .hero-buttons {
        gap: 1rem; /* Reduce gap on mobile */
    }
}
```

## 🐛 Troubleshooting

### Icons Not Showing
- Check Font Awesome CDN link in `<head>`
- Verify class names: `fas` (solid), `fab` (brands), `far` (regular)

### Animation Not Working
- Check for typos in `data-aos` attributes
- Verify JavaScript is loading (check console)

### Colors Not Changing
- Clear browser cache (Ctrl+Shift+R)
- Check CSS variable names match exactly
- Ensure no syntax errors in CSS

### Chatbot Not Responding
- Check JavaScript console for errors
- Verify regex patterns in chatbot.js
- Test with simple keywords first

## 📚 Resources

- **Font Awesome Icons:** https://fontawesome.com/icons
- **Color Palette Generator:** https://coolors.co
- **Gradient Generator:** https://cssgradient.io
- **CSS Animations:** https://animate.style
- **Google Fonts:** https://fonts.google.com

## 💡 Tips

1. **Test on multiple browsers** after making changes
2. **Keep backups** before major customizations
3. **Use browser DevTools** to test CSS changes live
4. **Commit to git** after each successful change
5. **Mobile test** - use browser's responsive mode

---

Happy customizing! 🎨✨
