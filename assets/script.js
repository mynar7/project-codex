let notHome;
let drawerOut = false;
let cardCount = 0; //keeps count of cards generated

function home() {
    $('.blind').fadeOut();
    $('.card').hide();
    mainIn();
    notHome = false;
}

function chainIn(arr, current, speed) {
    if (current == arr.length - 1) {
        $(arr[current]).fadeIn(speed);
    } else {
        $(arr[current]).fadeIn(speed, function () {
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
    $(target).show(() => {
        chainIn(elementList, 0, speed);
    });
}

window.onload = function () {
    mainIn();

    $('header>button').click(function () {
        $('#mobileMenu').slideToggle(1000);
        drawerOut = (drawerOut) ? false : true;
    });

    $('.pointer').click(showSection);

    $('.mobile').click(function (event) {
        let event2 = event;
        $('#mobileMenu').fadeOut(function () {
            drawerOut = false;
            showSection(event2);
        });
    });


    $('.pointer').hover(
        function () {
            $(this).children('.drawerDiv').show('blind');
        },
        function () {
            $(this).children('.drawerDiv').hide('blind');
        }
    );

    $(window).click(function (event) {
        let tagList = [];
        let arr1 = $(event.target)
        let tag = arr1[0].tagName.toLowerCase();
        tagList.push(tag);
        arr = $(event.target).parents()
        for (i = 0; i < arr.length; i++) {
            tagList.push(arr[i].tagName.toLowerCase());
        }
        if (tagList.indexOf('section') == -1 &&
            tagList.indexOf('nav') == -1 &&
            tagList.indexOf('button') == -1 && notHome) {
            if (drawerOut) {
                $('#mobileMenu').slideToggle(1000, home);
            } else {
                home();
            }
        }
    })

    $('#logo').click(function () {
        home();
    })


}
// jQuery.ajaxPrefilter(function(options) {
//     if (options.crossDomain && jQuery.support.cors) {
//         options.url = 'http://cors-anywhere.herokuapp.com/' + options.url;
//     }
// });

// let cors = 'http://cors-anywhere.herokuapp.com/'
$.ajax({
    url: 'http://api.meetup.com/project-code-experience/events',
    type: 'GET',
    dataType: 'JSONP', //CORS workaround
    success: function (response) {
        console.log(response)


        let header = $('<h3>');
        let paragraph = $('<p>')
        //loop through response.data
        response.data.forEach(element => {
            console.log('element: ', element)

            //list ongoing events
            if (element.status === 'active' || element.status === 'upcoming') {

                //format bits
                const ary = ['card','event']
                let street = element.venue.address_1;
                let city = element.venue.city;
                let state = element.venue.state;
                let addr = '<strong>Where: </strong>' + ' '+street+', '+city+', '+state;
                let seatsLeft = '<b>Steats Left: </b>' + (element.rsvp_limit - element.yes_rsvp_count)
                

                let body = [addr, seatsLeft];
                createEventCard(ary, element.name, element.link ,body).appendTo('.main') //get results and append them
            } else {
                // ?fill in
            }
        });


    },
    error: function (xhr, status) {
        console.log('error: ', xhr, status)
    }
});

//custom functions

//create card
function createEventCard(classes, title, url,body) {
    let localClasses = classes.join(' ') //get all classes passed and separate them with spaces
    let localList = $('<ul>'); //list element
    let div = $('<div>').addClass(localClasses);
   
    let header = $('<h3>').text(title).attr('href', url);
    header.appendTo(div);
    body.forEach(element => { //form list from array
        $('<li>').html(element).appendTo(localList);
    });

    let bodyText = localList.appendTo(div); //add

    return div //return result


}