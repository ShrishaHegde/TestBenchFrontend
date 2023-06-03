<template>
  <div class="nav">
    <img src="./assets/image.png" />
    <div class="menu">
          <ul style="display:flex;list-style:none">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
      </div>
    <div class="dropdown me-4">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1"
        data-bs-toggle="dropdown" aria-expanded="false">
        <span class="d-none d-sm-inline mx-1">Shrisha</span>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#">Log out</a></li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  background-color: black;
  padding: 7px;
  justify-content: space-between;
}
.dropdown{
  padding: 10px;
}

.nav img {
  margin-left: 50px;
  width: 150px;
  height: 35px;
}

.nav-link {
  position: relative;
  padding-bottom: 5px; /* Adjust the height of the underline as needed */
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px; /* Adjust the thickness of the underline as needed */
  background-color: #f00; /* Adjust the color of the underline as needed */
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link.active::after {
  transform: scaleX(1);
}

</style>
