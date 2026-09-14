function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const feedback = document.getElementById('contactFeedback');

    feedback.textContent = `Thank you, ${name}! Your transmission has been queued. We will follow up via ${email}.`;
    feedback.style.display = 'block';

    document.getElementById('portfolioContact').reset();

    setTimeout(() => {
        feedback.style.display = 'none';
    }, 5000);
}
