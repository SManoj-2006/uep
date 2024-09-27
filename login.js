$(document).ready(function() {
    let selectedRole = null; // Variable to track the selected role

    // Animate inputs on focus
    $('.form-control').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });

    // Smooth transition for social icons and input icons
    $('.social_icon span, .input-group-text').hover(
        function() {
            $(this).addClass('hovered');
        }, function() {
            $(this).removeClass('hovered');
        }
    );

    // Smooth fade transition for card elements
    $('.card').hide().fadeIn(1000);

    // Button hover animation
    $('.login_btn').hover(
        function() {
            $(this).addClass('btn-hover');
        }, function() {
            $(this).removeClass('btn-hover');
        }
    );

    // Link hover animation
    $('a').hover(
        function() {
            $(this).addClass('link-hover');
        }, function() {
            $(this).removeClass('link-hover');
        }
    );

    // Show the role selection modal on page load
    $('#roleModal').modal('show');

    // Add blur to main-container when modal is shown
    $('#roleModal').on('shown.bs.modal', function () {
        $('.main-container').addClass('blur');
    });

    // Remove blur when modal is hidden
    $('#roleModal').on('hidden.bs.modal', function () {
        $('.main-container').removeClass('blur');
    });

    // Handle role selection buttons with pulsing effect
    $('#clientBtn, #engineerBtn').click(function() {
        // Set the selected role based on button clicked
        if ($(this).attr('id') === 'clientBtn') {
            selectedRole = 'client';
            $('.card-header h3').text('Sign In to Client Portal');
            $('.card-header').css({
                'font-family': "'Roboto Slab', serif",
                'color': '#FFC312'
            });
        } else if ($(this).attr('id') === 'engineerBtn') {
            selectedRole = 'engineer';
            $('.card-header h3').text('Sign In to Engineer Portal');
            $('.card-header').css({
                'font-family': "'Roboto Slab', serif",
                'color': '#12CBC4'
            });
        }

        // Add pulsing effect
        $(this).addClass('pulse-effect');

        // Remove the pulsing effect class after animation completes
        setTimeout(() => {
            $(this).removeClass('pulse-effect');
        }, 600); // Duration matches the pulse animation duration

        // Hide the modal after selection
        $('#roleModal').modal('hide');
    });

    // Handle Login button pulsing effect on click
    $('.login_btn').click(function(e) {
        // Prevent form submission to handle validation
        e.preventDefault();

        // Check if username or password fields are empty
        const username = $('input[type="text"]').val().trim();
        const password = $('input[type="password"]').val().trim();

        if (username === '' || password === '') {
            // Display alert message
            alert('Must enter both Username and Password to continue.');
            return;
        }

        // If validation passes, proceed with pulsing effect
        $(this).addClass('pulse-effect');

        // Remove the pulsing effect class after animation completes
        setTimeout(() => {
            $(this).removeClass('pulse-effect');
        }, 600); // Duration matches the pulse animation duration

        // Store the username in localStorage
        localStorage.setItem('username', username);

        // Redirect based on selected role
        if (selectedRole === 'engineer') {
            window.location.href = 'eng.html';
        } else if (selectedRole === 'client') {
            window.location.href = 'index.html'; // Redirect to home or another page for clients
        } else {
            // Default redirection if no role is selected
            window.location.href = 'index.html';
        }
    });

    // Display the role selection modal on page load
    $('#roleModal').modal('show');

    // Handle Client role selection
    $('#clientBtn').on('click', function() {
        selectedRole = 'client';
        $('#roleModal').modal('hide');
    });

    // Handle Engineer role selection
    $('#engineerBtn').on('click', function() {
        selectedRole = 'engineer';
        $('#roleModal').modal('hide');
    });

    // Handle form submission
    $('.login_btn').on('click', function(event) {
        event.preventDefault(); // Prevent the default form submission

        if (!selectedRole) {
            alert('Please select your role before signing in.');
            return;
        }

        // Existing authentication logic
        const username = $('input[type="text"]').val();
        const password = $('input[type="password"]').val();

        // Example: Simple client-side validation (Replace with actual authentication)
        if (username && password) {
            // Redirect based on the selected role
            if (selectedRole === 'client') {
                window.location.href = 'page.html';
            } else if (selectedRole === 'engineer') {
                window.location.href = 'eng.html';
            }
        } else {
            alert('Please enter both username and password.');
        }
    });

    // Optional: Remember Me functionality
    $('.remember input').on('change', function() {
        if ($(this).is(':checked')) {
            // Implement remember me functionality
            // For example, store username in localStorage
            const username = $('input[type="text"]').val();
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }
    });

    // Optional: Pre-fill username if remembered
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        $('input[type="text"]').val(rememberedUsername);
        $('.remember input').prop('checked', true);
    }
});