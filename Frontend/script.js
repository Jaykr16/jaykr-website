document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const data = {
      name: name,
      email: email,
      message: message
    };

    try {

      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.text();

      console.log("Server response:", result);

      alert("Message sent successfully!");

      form.reset();

    } catch (error) {

      console.error("Error:", error);

    }

  });

});