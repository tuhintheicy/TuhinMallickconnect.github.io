const contactMeForm = document.getElementById("contact-me-form");

contactMeForm.addEventListener('submit', async function (e) {
    // e.preventDefault() will stop the page from immediately refreshing 
    // after the user will click on the submit button
    e.preventDefault();
    e.stopPropagation();
    console.log("form submitted")
    const contactMeFormData = new FormData(contactMeForm);
    const clientResponse = {
        clientName: contactMeFormData.get("client-name"),
        clientEmail: contactMeFormData.get("client-email"),
        clientEnquiry: contactMeFormData.get("client-enquiry"),
        clientWillingToWork: contactMeFormData.get("client-willing-to-work") == "on",
    }
    try {
        const res = await fetch("http://localhost:3000/contact-me-form-submitted", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clientResponse)
        })
    } catch (err) {
        console.error(err)
    }

})