const API_ENDPOINT = 'https://official-joke-api.appspot.com/random_joke';

const jokeSetup = document.getElementById('jokeSetup');
const jokePunchline = document.getElementById('jokePunchline');
const punchlineWrap = document.getElementById('punchlineWrap');
const jokeType = document.getElementById('jokeType');
const jokeId = document.getElementById('jokeId');
const fetchBtn = document.getElementById('fetchBtn');
const revealBtn = document.getElementById('revealBtn');

let currentPunchline = '';

// Offline curated fallback in case of rate-limiting or network outage
const offlineJokes = [
    { id: 101, type: "programming", setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
    { id: 102, type: "programming", setup: "There are 10 types of people in the world:", punchline: "Those who understand binary, and those who don't." },
    { id: 103, type: "general", setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
    { id: 104, type: "programming", setup: "What's the best thing about a boolean?", punchline: "Even if you are wrong, you are only off by a bit." }
];

async function fetchNextJoke() {
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Querying Endpoint...';
    punchlineWrap.style.display = 'none';
    revealBtn.style.display = 'none';
    jokeSetup.textContent = 'Connecting to REST endpoint...';

    try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
        const data = await response.json();
        populateJoke(data);
    } catch (err) {
        console.warn('Live API unavailable or offline, loading fallback repository:', err);
        const randomItem = offlineJokes[Math.floor(Math.random() * offlineJokes.length)];
        populateJoke(randomItem);
    } finally {
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Fetch Another Joke';
    }
}

function populateJoke(joke) {
    jokeType.textContent = joke.type || 'general';
    jokeId.textContent = `#${joke.id || 'N/A'}`;
    jokeSetup.textContent = joke.setup;
    currentPunchline = joke.punchline;

    revealBtn.style.display = 'block';
    revealBtn.textContent = 'Reveal Punchline';
}

function revealPunchline() {
    jokePunchline.textContent = currentPunchline;
    punchlineWrap.style.display = 'block';
    revealBtn.style.display = 'none';
}

// Initial Fetch
fetchNextJoke();
