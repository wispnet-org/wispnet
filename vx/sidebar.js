document.addEventListener("DOMContentLoaded", () => {
  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    
    sidebar.classList.toggle("visible");

    // Change color based on sidebar visibility
    if (sidebar.classList.contains("visible")) {
      menuToggle.style.color = "black"; // Sidebar open → black icon
    } else {
      menuToggle.style.color = "white"; // Sidebar closed → white icon
    }
  }

  document.getElementById("menuToggle").onclick = toggleSidebar;

  function showSection(sectionId, event) {
    event.preventDefault();
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    toggleSidebar();
  }
});
