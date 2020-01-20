if(localStorage.getItem('start')) {
    $('#continue').css('display', 'inline-block')
}

$('#new').click(() => {
    localStorage.clear()
    localStorage.setItem('start', true)
    window.location.href = "/setup/setup.html";
})

