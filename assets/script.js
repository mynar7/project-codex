$('.pointer').click(function(event) {
    $('.blind').fadeOut();
    $('.card').hide();                    
    event.stopPropagation();
    let target = $(event.target).attr('data-target');
    let test = $(target).children('.card');
    $(target).show('blind', ()=>{
        chainIn(test, 0);
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

function chainIn (arr, current) {
    if(current == arr.length - 1) {
        $(arr[current]).fadeIn(500);
    } else {
        $(arr[current]).fadeIn(500, function(){
            chainIn(arr, current + 1)
        })
    }
}