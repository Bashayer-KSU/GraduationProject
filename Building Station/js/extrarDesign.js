
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

