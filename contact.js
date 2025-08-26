document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        try {
            // Validate form data
            if (!formDataObject.name || !formDataObject.email || !formDataObject.message) {
                throw new Error('Please fill in all required fields');
            }

            if (!isValidEmail(formDataObject.email)) {
                throw new Error('Please enter a valid email address');
            }

            // You can use a service like FormSubmit.co for a serverless solution
            // Replace with your actual form endpoint
            const response = await fetch('https://formsubmit.co/jacobjwkim@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Clear form and show success message
            contactForm.reset();
            alert('Message sent successfully!');

        } catch (error) {
            alert(error.message || 'An error occurred. Please try again.');
        }
    });
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}