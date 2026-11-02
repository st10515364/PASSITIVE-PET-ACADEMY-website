window.onload = function() {
    var menuBtn = document.getElementById("menuBtn");
    var navLinks = document.getElementById("navLinks");

    if (menuBtn != null && navLinks != null) {
        menuBtn.onclick = function() {
            if (navLinks.className === "nav-links") {
                navLinks.className = "nav-links show";
            } else {
                navLinks.className = "nav-links";
            }
        };
    }
    var loginForm = document.getElementById("loginForm");
    if (loginForm != null) {
        loginForm.onsubmit = function(event) {
            event.preventDefault();
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var emailError = document.getElementById("emailError");
            var passwordError = document.getElementById("passwordError");
            var isValid = true;
            emailError.className = "error-text";
            passwordError.className = "error-text";
            if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
                emailError.className = "error-text show";
                isValid = false;
            }
            if (password.length < 6) {
                passwordError.className = "error-text show";
                isValid = false;
            }
            if (isValid == true) {
                window.location.href = "dashboard.html";
            }
        };
    }
    var registerForm = document.getElementById("registerForm");

    if (registerForm != null) {
        registerForm.onsubmit = function(event) {
            event.preventDefault();

            var fullname = document.getElementById("fullname").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirm").value;
            var isValid = true;
            var allErrors = document.getElementsByClassName("error-text");
            for (var i = 0; i < allErrors.length; i++) {
                allErrors[i].className = "error-text";
            }
            if (fullname.length < 3) {
                document.getElementById("nameError").className = "error-text show";
                isValid = false;
            }
            if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
                document.getElementById("emailError").className = "error-text show";
                isValid = false;
            }
            if (password.length < 6) {
                document.getElementById("passError").className = "error-text show";
                isValid = false;
            }
            if (password != confirmPassword) {
                document.getElementById("confirmError").className = "error-text show";
                isValid = false;
            }
            if (isValid == true) {
                window.location.href = "dashboard.html";
            }
        };
    }
    var quoteForm = document.getElementById("quoteForm");
    if (quoteForm != null) {
        var checkboxes = quoteForm.getElementsByTagName("input");
        var subtotalText = document.getElementById("subtotal");
        var discountText = document.getElementById("discount");
        var totalText = document.getElementById("total");
        var noteText = document.getElementById("note");
        function calculateTotal() {
            var subtotal = 0;
            var courseCount = 0;
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].type == "checkbox" && checkboxes[i].checked == true) {
                    // Add the price to subtotal
                    subtotal = subtotal + parseFloat(checkboxes[i].value);
                    courseCount = courseCount + 1;
                }
            }
            var discountRate = 0;
            if (courseCount == 2) {
                discountRate = 0.05; // 5%
            } else if (courseCount >= 3) {
                discountRate = 0.10; // 10%
            }
            var discountAmount = subtotal * discountRate;
            var finalTotal = subtotal - discountAmount;
            subtotalText.innerHTML = "R" + subtotal.toFixed(2);
            discountText.innerHTML = "-R" + discountAmount.toFixed(2) + " (" + (discountRate * 100) + "%)";
            totalText.innerHTML = "R" + finalTotal.toFixed(2);
            if (courseCount == 0) {
                noteText.innerHTML = "Select at least one course to see your quote.";
            } else if (courseCount == 1) {
                noteText.innerHTML = "Add 1 more course to get 5% off.";
            } else if (courseCount == 2) {
                noteText.innerHTML = "You saved 5%. Add 1 more course for 10% off.";
            } else {
                noteText.innerHTML = "You saved 10%. Great choice!";
            }
        }
        for (var j = 0; j < checkboxes.length; j++) {
            if (checkboxes[j].type == "checkbox") {
                checkboxes[j].onchange = calculateTotal;
            }
        }
        calculateTotal();
        var requestBtn = document.getElementById("requestBtn");
        if (requestBtn != null) {
            requestBtn.onclick = function() {
                var successBox = document.getElementById("quoteSuccess");
                successBox.className = "success-box show";
                requestBtn.innerHTML = "Quote Requested";
                requestBtn.disabled = true;
            };
        }
    }
    var inquiryForm = document.getElementById("inquiryForm");

    if (inquiryForm != null) {
        inquiryForm.onsubmit = function(event) {
            event.preventDefault();
            var name = document.getElementById("inqName").value;
            var email = document.getElementById("inqEmail").value;
            var message = document.getElementById("inqMessage").value;
            var isValid = true;
            var allErrors = document.getElementsByClassName("error-text");
            for (var i = 0; i < allErrors.length; i++) {
                allErrors[i].className = "error-text";
            }
            if (name.length < 3) {
                document.getElementById("inqNameError").className = "error-text show";
                isValid = false;
            }
            if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
                document.getElementById("inqEmailError").className = "error-text show";
                isValid = false;
            }
            if (message.length < 10) {
                document.getElementById("inqMsgError").className = "error-text show";
                isValid = false;
            }
            if (isValid == true) {
                document.getElementById("inquirySuccess").className = "success-box show";
                inquiryForm.reset(); // Clears the form
            }
        };
    }
};