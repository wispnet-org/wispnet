
    function showSection(sectionId) {
      var sections = document.querySelectorAll('.main section');
      sections.forEach(function(section) {
        section.classList.add('hidden');
      });
      document.getElementById(sectionId).classList.remove('hidden');
    }

    document.addEventListener("DOMContentLoaded", function() {
      showSection('home'); // Show home section by default
    });
