$('.pointer').click(function(event) {
    $('.blind').hide('blind');
    event.stopPropagation();
    let target = $(event.target).attr('data-target');
    $(target).show('blind');
})

$('.pointer').hover(
    function() {
        $(this).children('.drawerDiv').show('blind');
    },
    function() {
        $(this).children('.drawerDiv').hide('blind');
    }
);

$(window).click(function() {
    $('.drawerDiv').hide('blind');
})