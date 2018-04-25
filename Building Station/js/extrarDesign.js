
var imported = document.createElement('script');
imported.src = '/js/jquery.lavalamp.min.js';
document.head.appendChild(imported);

//To remove triangle on small screens
   (function () {

            $(window).bind("resize", function () {
                console.log($(this).width())
                if ($(this).width() < 992) {
                    $('#navbarSupportedContent').removeClass('lightmenu')
                    $('ul').removeClass('lightBlue')
                }
                else {
                    if ($(this).width() > 992) {
                        $('#navbarSupportedContent').addClass('lightmenu')
                        $('ul').addClass('lightBlue')

                    }
                }
            })
})


       function a() {
           var x = document.getElementById('one');
           $(x).lavaLamp({
               fx: "backout",
               speed: 700
           })
       }
