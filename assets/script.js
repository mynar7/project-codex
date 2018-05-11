$('.pointer').click(function(event) {
    $('.blind').fadeOut();
    $('.card').hide();                    
    event.stopPropagation();
    let target = $(event.target).attr('data-target');
    let speed = $(event.target).attr('data-speed');
    speed = parseInt(speed);
    speed = (!isNaN(speed)) ? speed : 500;
    let elementList = $(target).children('.card');
    $(target).show('blind', ()=>{
        chainIn(elementList, 0, speed);
    });
})

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
    if(tagList.indexOf('section') == -1) {
        $('.blind').fadeOut();
        $('.card').hide();                
    }
})

function chainIn (arr, current, speed) {
    if(current == arr.length - 1) {
        $(arr[current]).fadeIn(speed);
    } else {
        $(arr[current]).fadeIn(speed, function(){
            chainIn(arr, current + 1)
        })
    }
}

//info sec
$('#jonInfo').append('<img class="theImg" src="../assets/images/mypic.jpg">' + 
'<p style="font-size:20px;text-align: left;">' + 'I have helped establish and maintain a web presence for several local businesses.<br><br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veritatis a autem qui, animi officia eligendi perspiciatis necessitatibus esse expedita ullam laboriosam placeat assumenda nisi! Doloribus deserunt id excepturi quod!');