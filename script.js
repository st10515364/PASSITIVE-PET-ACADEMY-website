window.onload = function () {
    var menuBtn = document.getElementById("menuBtn");
    var navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            if (navLinks.className === "nav-links") {
                navLinks.className = "nav-links show";
            } else {
                navLinks.className = "nav-links";
            }
        });
    }

    function clearErrorMessages() {
        var allErrors = document.getElementsByClassName("error-text");
        for (var i = 0; i < allErrors.length; i++) {
            allErrors[i].className = "error-text";
        }
    }

    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var emailInput = document.getElementById("email");
            var passwordInput = document.getElementById("password");
            var emailError = document.getElementById("emailError");
            var passwordError = document.getElementById("passwordError");
            var email = emailInput ? emailInput.value.trim() : "";
            var password = passwordInput ? passwordInput.value : "";
            var isValid = true;

            if (emailError) emailError.className = "error-text";
            if (passwordError) passwordError.className = "error-text";

            if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                if (emailError) emailError.className = "error-text show";
                isValid = false;
            }

            if (!password || password.length < 6) {
                if (passwordError) passwordError.className = "error-text show";
                isValid = false;
            }

            if (isValid) {
                window.location.href = "dashboard.html";
            }
        });
    }

    var registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var fullname = document.getElementById("fullname") ? document.getElementById("fullname").value : "";
            var email = document.getElementById("email") ? document.getElementById("email").value : "";
            var password = document.getElementById("password") ? document.getElementById("password").value : "";
            var confirmPasswordInput = document.getElementById("confirm") || document.getElementById("confirmPassword");
            var confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";
            var isValid = true;

            clearErrorMessages();

            if (fullname.trim().length < 3) {
                var nameError = document.getElementById("nameError");
                if (nameError) nameError.className = "error-text show";
                isValid = false;
            }

            if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                var emailError = document.getElementById("emailError");
                if (emailError) emailError.className = "error-text show";
                isValid = false;
            }

            if (!password || password.length < 6) {
                var passError = document.getElementById("passError");
                if (passError) passError.className = "error-text show";
                isValid = false;
            }

            if (password !== confirmPassword) {
                var confirmError = document.getElementById("confirmError");
                if (confirmError) confirmError.className = "error-text show";
                isValid = false;
            }

            if (isValid) {
                window.location.href = "dashboard.html";
            }
        });
    }

    var quoteForm = document.getElementById("quoteForm");
    if (quoteForm) {
        var checkboxes = quoteForm.querySelectorAll("input[type='checkbox']");
        var subtotalText = document.getElementById("subtotal");
        var discountText = document.getElementById("discount");
        var totalText = document.getElementById("total");
        var noteText = document.getElementById("note");
        var requestBtn = document.getElementById("requestBtn");
        var successBox = document.getElementById("quoteSuccess");

        function calculateTotal() {
            var subtotal = 0;
            var courseCount = 0;

            checkboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    subtotal += parseFloat(checkbox.value);
                    courseCount += 1;
                }
            });

            var discountRate = 0;
            if (courseCount === 2) {
                discountRate = 0.05;
            } else if (courseCount >= 3) {
                discountRate = 0.10;
            }

            var discountAmount = subtotal * discountRate;
            var finalTotal = subtotal - discountAmount;

            if (subtotalText) subtotalText.textContent = "R" + subtotal.toFixed(2);
            if (discountText) discountText.textContent = "-R" + discountAmount.toFixed(2) + " (" + (discountRate * 100) + "%)";
            if (totalText) totalText.textContent = "R" + finalTotal.toFixed(2);

            if (noteText) {
                if (courseCount === 0) {
                    noteText.textContent = "Select at least one course to see your quote.";
                } else if (courseCount === 1) {
                    noteText.textContent = "Add 1 more course to get 5% off.";
                } else if (courseCount === 2) {
                    noteText.textContent = "You saved 5%. Add 1 more course for 10% off.";
                } else {
                    noteText.textContent = "You saved 10%. Great choice!";
                }
            }
        }

        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", calculateTotal);
        });

        calculateTotal();

        if (requestBtn) {
            requestBtn.addEventListener("click", function () {
                if (successBox) {
                    successBox.className = "success-box show";
                }
                requestBtn.textContent = "Quote Requested";
                requestBtn.disabled = true;
            });
        }
    }

    var inquiryForm = document.getElementById("inquiryForm");
    if (inquiryForm) {
        inquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = document.getElementById("inqName") ? document.getElementById("inqName").value : (document.getElementById("name") ? document.getElementById("name").value : "");
            var email = document.getElementById("inqEmail") ? document.getElementById("inqEmail").value : (document.getElementById("email") ? document.getElementById("email").value : "");
            var message = document.getElementById("inqMessage") ? document.getElementById("inqMessage").value : (document.getElementById("message") ? document.getElementById("message").value : "");
            var isValid = true;

            clearErrorMessages();

            if (name.trim().length < 3) {
                var inqNameError = document.getElementById("inqNameError");
                if (inqNameError) inqNameError.className = "error-text show";
                isValid = false;
            }

            if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                var inqEmailError = document.getElementById("inqEmailError");
                if (inqEmailError) inqEmailError.className = "error-text show";
                isValid = false;
            }

            if (message.trim().length < 10) {
                var inqMsgError = document.getElementById("inqMsgError");
                if (inqMsgError) inqMsgError.className = "error-text show";
                isValid = false;
            }

            if (isValid) {
                var inquirySuccess = document.getElementById("inquirySuccess");
                if (inquirySuccess) inquirySuccess.className = "success-box show";
                inquiryForm.reset();
            }
        });
    }
};
