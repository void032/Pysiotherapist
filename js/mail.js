document.addEventListener("DOMContentLoaded", () => {
  function showAlert(message) {
    const customAlert = document.getElementById("customAlert");
    const customAlertMessage = document.getElementById("customAlertMessage");

    if (customAlert && customAlertMessage) {
      customAlertMessage.innerHTML = message;
      customAlert.style.display = "block";
    } else {
      console.error("Custom alert element not found.");
    }
  }

  function closeAlert() {
    const customAlert = document.getElementById("customAlert");
    if (customAlert) {
      customAlert.style.display = "none";
    }
  }

  function toggleSubmitButton(form, disable) {
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = disable;
    }
  }

  const form = document.getElementById("emailForm");
  const Apform = document.getElementById("AppointmentForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      showAlert("Sending your email... Please wait.");
      toggleSubmitButton(form, true);

      const emailData = {
        to: "vk73511390@gmail.com",
        subject: document.getElementById("subject").value,
        text: `<h4>New Contact Request</h4>
                    <p><strong>Name:</strong> ${
                      document.getElementById("name").value
                    }</p>
                    <p><strong>Email:</strong> ${
                      document.getElementById("email").value
                    }</p>
                    <p><strong>Phone:</strong> ${
                      document.getElementById("phone").value
                    }</p>
                    <p><strong>Address:</strong> ${
                      document.getElementById("project").value
                    }</p>
                    <p><strong>Subject:</strong> ${
                      document.getElementById("subject").value
                    }</p>
                    <p><strong>Message:</strong> ${
                      document.getElementById("messages").value
                    }</p>`,
      };

      try {
        const response = await fetch("http://localhost:3000/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (response.ok) {
          showAlert("Your email has been sent successfully!");
        } else {
          const errorText = await response.text();
          showAlert(
            "Failed to send email. Server responded with: " + errorText
          );
        }
      } catch (error) {
        showAlert(
          "An error occurred while sending the email: " + error.message
        );
      } finally {
        toggleSubmitButton(form, false);
      }
    });
  }

  if (Apform) {
    Apform.addEventListener("submit", async (e) => {
      e.preventDefault();

      showAlert("Sending your appointment request... Please wait.");
      toggleSubmitButton(Apform, true);

      const ApData = {
        to: "vk73511390@gmail.com",
        subject:
          document.getElementById("Apname").value + " Requested an Appointment",
        text: `<h4>New Appointment Request</h4>
                    <p><strong>Name:</strong> ${
                      document.getElementById("Apname").value
                    }</p>
                    <p><strong>Email:</strong> ${
                      document.getElementById("Apemail").value
                    }</p>
                    <p><strong>Phone:</strong> ${
                      document.getElementById("Apphone").value
                    }</p>
                    <p><strong>Gender:</strong> ${
                      document.getElementById("Apgender").value
                    }</p>
                    <p><strong>Date:</strong> ${
                      document.getElementById("Apdate").value
                    }</p>
                    <p><strong>Department:</strong> ${
                      document.getElementById("Apdepartment").value
                    }</p>
                    <p><strong>Comment:</strong> ${
                      document.getElementById("Apcomment").value
                    }</p>`,
      };

      try {
        const response = await fetch("http://localhost:3000/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ApData),
        });

        if (response.ok) {
          showAlert("Your appointment email has been sent successfully!");
        } else {
          const errorText = await response.text();
          showAlert(
            "Failed to send appointment email. Server responded with: " +
              errorText
          );
        }
      } catch (error) {
        showAlert(
          "An error occurred while sending the appointment email: " +
            error.message
        );
      } finally {
        toggleSubmitButton(Apform, false);
      }
    });
  }
});
