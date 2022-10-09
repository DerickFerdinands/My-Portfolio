$("main").eq(1).css('display', 'none');
$("main").eq(2).css('display', 'none');
$("main").eq(3).css('display', 'none');
$(".home").click(function () {
    $("header").css('display', 'block');
    $("main").eq(0).css('display', 'block');
    $("main").eq(1).css('display', 'none');
    $("main").eq(2).css('display', 'none');
    $("main").eq(3).css('display', 'none');
});

$(".customer").click(function () {
    $("header").css('display', 'none');
    $("main").eq(0).css('display', 'none');
    $("main").eq(1).css('display', 'block');
    $("main").eq(2).css('display', 'none');
    $("main").eq(3).css('display', 'none');
});

$(".item").click(function () {
    $("header").css('display', 'none');
    $("main").eq(0).css('display', 'none');
    $("main").eq(1).css('display', 'none');
    $("main").eq(2).css('display', 'block');
    $("main").eq(3).css('display', 'none');
});

$(".order").click(function () {
    $("header").css('display', 'none');
    $("main").eq(0).css('display', 'none');
    $("main").eq(1).css('display', 'none');
    $("main").eq(2).css('display', 'none');
    $("main").eq(3).css('display', 'block');
});