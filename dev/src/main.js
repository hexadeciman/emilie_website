window.onload = function () {
  var menuButton = document.getElementById('menuButton');

  function isVisible(e) {
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
  }

  function toggleElement(id){
    var x = document.getElementById(id);
    if (!isVisible(x)) {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
  }

  menuButton.addEventListener('click', function (e) {
     var idsToBeToggled = ['hider', 'menu'];
     idsToBeToggled.forEach(function(id){
       toggleElement(id)
     })
     menuButton.classList.toggle('is-active');
     e.preventDefault();
  });

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vuessk'
    }
  })

}
