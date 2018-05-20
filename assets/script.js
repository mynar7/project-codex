let notHome;
let drawerOut = false;

function home() {
    $('.blind').fadeOut();
    $('.card').hide();
    mainIn();
    notHome = false;
}

function chainIn (arr, current, speed) {
    if(current == arr.length - 1) {
        $(arr[current]).fadeIn(speed);
    } else {
        $(arr[current]).fadeIn(speed, function(){
            chainIn(arr, current + 1)
        })
    }
}

function mainIn() {
    $('.main, .main>.card').fadeIn();                       
}

function showSection(event) {
    notHome = true;
    $('.blind').fadeOut();
    $('.card').hide();                    
    event.stopPropagation();
    let target = $(event.target).attr('data-target');
    let speed = $(event.target).attr('data-speed');
    speed = parseInt(speed);
    speed = (!isNaN(speed)) ? speed : 500;
    let elementList = $(target).children('.card');
    $(target).show( ()=>{
        chainIn(elementList, 0, speed);
    });
}

window.onload = function() {
    mainIn();

    $('header>button').click(function(){
        $('#mobileMenu').slideToggle(1000);
        drawerOut = (drawerOut) ? false : true;
    });

    $('.pointer').click(showSection);

    $('.mobile').click(function(event){
        let event2 = event;
        $('#mobileMenu').fadeOut(function(){
            drawerOut = false;
            showSection(event2);
        });
    });
    

    $('.pointer').hover(
        function() {
            $(this).children('.drawerDiv').show('blind');
        },
        function() {
            $(this).children('.drawerDiv').hide('blind');
        }
    );

    $(window).click(function(event) {
        let tagList = [];
        let arr1 = $(event.target)
        let tag = arr1[0].tagName.toLowerCase();
        tagList.push(tag);
        arr = $(event.target).parents()
        for(i = 0; i< arr.length; i++) {
            tagList.push(arr[i].tagName.toLowerCase());
        }
        if(tagList.indexOf('section') == -1 &&
            tagList.indexOf('nav') == -1 &&
            tagList.indexOf('button') == -1 && notHome) {
            if(drawerOut) {
                $('#mobileMenu').slideToggle(1000, home);
            } else {
                home();
            }
        }
    })
}


