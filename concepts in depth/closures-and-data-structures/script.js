/**
 * Lab Experiment 05A: Core JavaScript Paradigms
 * Focus: Lexical Scoping, Closures, Higher-Order Functions, Object Iteration
 */

// --- 1. Lexical Closure Implementation ---
function createAccumulator(initialVal = 0) {
    let state = initialVal; // Private encapsulated variable

    return {
        increment() {
            state += 1;
            return state;
        },
        getValue() {
            return state;
        },
        reset() {
            state = initialVal;
            return state;
        }
    };
}

let activeAccumulator = createAccumulator(5);

function invokeCounter() {
    const val = activeAccumulator.increment();
    logToStream(`[Closure] Counter incremented -> Current encapsulated state: ${val}`, 'accent');
}

function resetCounterDemo() {
    const val = activeAccumulator.reset();
    logToStream(`[Closure] Counter reset to baseline state: ${val}`, 'success');
}

// --- 2. Structured Objects and Iteration ---
const developerProfile = {
    engineerId: "ENG-2049",
    role: "Frontend Systems Engineer",
    experienceYears: 3,
    coreSpecialization: "React & TypeScript Ecosystem",
    activeStatus: true
};

function inspectDeveloperRecord() {
    logToStream(`[Object Introspection] Profile Data:`, 'accent');
    for (const [key, value] of Object.entries(developerProfile)) {
        logToStream(`  • ${key}: ${value}`);
    }
}

function runDataTransform() {
    const modules = [
        { id: 101, title: "CSS Grid Architecture", score: 92 },
        { id: 102, title: "Lexical Scope Engine", score: 88 },
        { id: 103, title: "Async Network Protocol", score: 95 },
        { id: 104, title: "DOM Mutation Pipeline", score: 79 }
    ];

    const highPerforming = modules
        .filter(mod => mod.score >= 85)
        .map(mod => `${mod.title} (${mod.score}%)`);

    logToStream(`[Array Higher-Order Methods] Modules >= 85% Score:`, 'accent');
    highPerforming.forEach(item => logToStream(`  ✓ ${item}`, 'success'));
}

// --- Stream Output Helper ---
function logToStream(message, type = '') {
    const logBox = document.getElementById('outputLog');
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    const timestamp = new Date().toLocaleTimeString();
    line.textContent = `[${timestamp}] ${message}`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
}

function clearStream() {
    document.getElementById('outputLog').innerHTML = '<div class="log-line">// Output stream reset.</div>';
}
