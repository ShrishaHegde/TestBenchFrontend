<template>
  <div class="wrapper">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand ms-4" href="#">
        <img src="../assets/image.png" width="185" height="45" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse justify-content-md-center" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Procurement</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Availability</a>
          </li>
        </ul>

        <div class="dropdown me-5">
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
    </nav>
  </div>
   
</template>

<script>
export default {
    name: 'navabar'
}
</script>

<style scope>
nav{
  background-color: black!important;
}
.dropdown-menu{
  left: -50px!important;
}
.dropdown.me-5{
  margin: auto;
}
.navbar-nav.mr-auto{
  margin-left: 430px;
}

</style>