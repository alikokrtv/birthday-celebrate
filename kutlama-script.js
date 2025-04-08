document.addEventListener('DOMContentLoaded', function() {
    var kutlamaButtons = document.querySelectorAll('button.kutlaButton');

    kutlamaButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var user_id = button.getAttribute('data-user-id');
            var sesURL = button.getAttribute('data-sesurl');

            // Kutlama sesi çal
            var audio = new Audio(sesURL);
            audio.play();

            // AJAX isteğiyle kutlama bilgilerini kaydet
            jQuery.post(dogum_gunu_kutla_params.ajax_url, {
                action: 'kutlama_yap',
                user_id: user_id,
                nonce: dogum_gunu_kutla_params.nonce
            }, function(response) {
                if (response.success) {
                    // Confetti göster
                    confetti();

                    // Butonun bulunduğu liste öğesini bul
                    var listItem = button.closest('.birthday-item');
                    var countText = listItem.querySelector('p');

                    // Kullanıcı adı ve kutlama sayısını güncelle
                    var firstName = response.data.user_display_name.split(' ')[0];
                    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

                    countText.textContent = firstName + ' ' + response.data.celebration_count + ' kez kutlandı.';
                }
            });
        });
    });
});
