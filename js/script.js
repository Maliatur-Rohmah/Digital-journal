const STORAGE_KEY = 'dear-diary-entries';
const THEME_KEY = 'dear-diary-theme';

const moods = [
  { value: 'happy', emoji: '😊', label: 'Bahagia' },
  { value: 'sad', emoji: '😢', label: 'Sedih' },
  { value: 'tired', emoji: '😴', label: 'Capek' },
  { value: 'excited', emoji: '🤩', label: 'Semangat' },
  { value: 'calm', emoji: '😌', label: 'Tenang' },
  { value: 'angry', emoji: '😠', label: 'Marah' }
];

const form = document.getElementById('entryForm');
const entryDate = document.getElementById('entryDate');
const entryTitle = document.getElementById('entryTitle');
const entryText = document.getElementById('entryText');
const moodPicker = document.getElementById('moodPicker');
const moodFilter = document.getElementById('moodFilter');
const searchInput = document.getElementById('searchInput');
const entriesList = document.getElementById('entriesList');
const formTitle = document.getElementById('formTitle');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const themeToggle = document.getElementById('themeToggle');

let selectedMood = 'happy';
let editingId = null;

function parseEntries() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const entries = JSON.parse(saved);
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    console.error('Gagal parsing data entri:', error);
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function getMoodMeta(value) {
  return moods.find((item) => item.value === value) || moods[0];
}

function renderMoodPicker() {
  moodPicker.innerHTML = moods
    .map(
      (mood) => `
        <button type="button" class="mood-option ${selectedMood === mood.value ? 'active' : ''}" data-mood="${mood.value}" aria-label="Pilih mood ${mood.label}">
          <span class="emoji">${mood.emoji}</span>
          <span>${mood.label}</span>
        </button>
      `
    )
    .join('');

  moodPicker.querySelectorAll('.mood-option').forEach((button) => {
    button.addEventListener('click', () => {
      selectedMood = button.dataset.mood;
      renderMoodPicker();
    });
  });
}

function renderMoodFilter() {
  const options = moods
    .map(
      (mood) => `<option value="${mood.value}">${mood.label}</option>`
    )
    .join('');

  moodFilter.innerHTML = `<option value="all">Semua mood</option>${options}`;
}

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function resetForm() {
  editingId = null;
  form.reset();
  entryDate.value = todayString();
  selectedMood = 'happy';
  formTitle.textContent = 'Tulis hari ini';
  cancelEditBtn.classList.add('hidden');
  renderMoodPicker();
}

function populateForm(entry) {
  editingId = entry.id;
  entryDate.value = entry.date;
  entryTitle.value = entry.title;
  entryText.value = entry.text;
  selectedMood = entry.mood;
  formTitle.textContent = 'Edit entri';
  cancelEditBtn.classList.remove('hidden');
  renderMoodPicker();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderEntries() {
  const entries = parseEntries();
  const keyword = searchInput.value.trim().toLowerCase();
  const moodValue = moodFilter.value;

  const filteredEntries = entries.filter((entry) => {
    const matchesText =
      entry.title.toLowerCase().includes(keyword) ||
      entry.text.toLowerCase().includes(keyword);

    const matchesMood = moodValue === 'all' || entry.mood === moodValue;
    return matchesText && matchesMood;
  });

  filteredEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!filteredEntries.length) {
    entriesList.innerHTML = `
      <div class="empty-state">
        <p>Belum ada entri yang cocok. Yuk mulai menulis hari ini!</p>
      </div>
    `;
    return;
  }

  entriesList.innerHTML = filteredEntries
    .map((entry) => {
      const mood = getMoodMeta(entry.mood);
      return `
        <article class="entry-card">
          <div class="entry-top">
            <div>
              <div class="entry-title-wrap">
                <h3 class="entry-title">${entry.title}</h3>
                <span class="entry-mood">${mood.emoji} ${mood.label}</span>
              </div>
              <p class="entry-date">${formatDate(entry.date)}</p>
            </div>
          </div>

          <p class="entry-text">${entry.text}</p>

          <div class="entry-actions">
            <button type="button" class="action-btn edit" data-action="edit" data-id="${entry.id}">Edit</button>
            <button type="button" class="action-btn delete" data-action="delete" data-id="${entry.id}">Hapus</button>
          </div>
        </article>
      `;
    })
    .join('');

  entriesList.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = Number(button.dataset.id);
      const entry = parseEntries().find((item) => item.id === targetId);
      if (entry) populateForm(entry);
    });
  });

  entriesList.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = Number(button.dataset.id);
      const entries = parseEntries();
      const updatedEntries = entries.filter((item) => item.id !== targetId);
      saveEntries(updatedEntries);

      if (editingId === targetId) {
        resetForm();
      }

      renderEntries();
    });
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const title = entryTitle.value.trim();
  const text = entryText.value.trim();
  const date = entryDate.value || todayString();

  if (!title || !text) {
    alert('Judul dan isi entri tidak boleh kosong.');
    return;
  }

  const entries = parseEntries();

  if (editingId !== null) {
    const index = entries.findIndex((item) => item.id === editingId);
    if (index >= 0) {
      entries[index] = {
        ...entries[index],
        title,
        text,
        date,
        mood: selectedMood
      };
    }
  } else {
    entries.push({
      id: Date.now(),
      title,
      text,
      date,
      mood: selectedMood
    });
  }

  saveEntries(entries);
  resetForm();
  renderEntries();
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
}

function setupEvents() {
  form.addEventListener('submit', handleSubmit);
  cancelEditBtn.addEventListener('click', resetForm);
  searchInput.addEventListener('input', renderEntries);
  moodFilter.addEventListener('change', renderEntries);
  themeToggle.addEventListener('click', toggleTheme);
}

function initializeApp() {
  entryDate.value = todayString();
  renderMoodPicker();
  renderMoodFilter();
  initializeTheme();
  setupEvents();
  renderEntries();
}

initializeApp();
