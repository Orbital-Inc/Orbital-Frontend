const bodyTag = document.querySelector("html");

function data() {
  function getThemeFromLocalStorage() {
    // if user already changed the theme, use it
    if (window.localStorage.getItem("dark")) {
      return JSON.parse(window.localStorage.getItem("dark"));
    }

    // else return their preferences
    return (
      !!window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem("dark", value);
  }

  function setTheme(value) {
    if (value) {
      bodyTag.classList.add("dark");
    } else {
      bodyTag.classList.remove("dark");
    }
  }

  setTheme(getThemeFromLocalStorage());

  return {
    dark: getThemeFromLocalStorage(),
    toggleTheme() {
      this.dark = !this.dark;
      setTheme(this.dark);
      setThemeToLocalStorage(this.dark);
    },
    isSideMenuOpen: false,
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
    },
    isNotificationsMenuOpen: false,
    toggleNotificationsMenu() {
      this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    },
    closeNotificationsMenu() {
      this.isNotificationsMenuOpen = false;
    },
    isProfileMenuOpen: false,
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;
    },
    isPagesMenuOpen: false,
    togglePagesMenu() {
      this.isPagesMenuOpen = !this.isPagesMenuOpen;
    },
    isServersPagesMenuOpen: false,
    toggleServersPagesMenu() {
      this.isServersPagesMenuOpen = !this.isServersPagesMenuOpen;
    },
    isNetworkPagesMenuOpen: false,
    toggleNetworkPagesMenu() {
      this.isNetworkPagesMenuOpen = !this.isNetworkPagesMenuOpen;
    },
    isAdminPagesMenuOpen: false,
    toggleAdminPagesMenu() {
      this.isAdminPagesMenuOpen = !this.isAdminPagesMenuOpen;
    },
    isMiscPagesMenuOpen: false,
    toggleMiscPagesMenu() {
      this.isMiscPagesMenuOpen = !this.isMiscPagesMenuOpen;
    },

    // Modal
    isModalOpen: false,
    trapCleanup: null,
    openModal() {
      this.isModalOpen = true;
      this.trapCleanup = focusTrap(document.querySelector("#modal"));
    },
    closeModal() {
      this.isModalOpen = false;
      this.trapCleanup();
    },
    open: false, // Add this property for the mobile menu
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
  };
}
