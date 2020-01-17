if(localStorage.getItem('start')) {
    console.log(":)")
    $('#continue').css('display', 'inline-block')
}

$('#new').click(() => {
    localStorage.clear()
    localStorage.setItem('start', true)
    window.location.href = "http://cluededucer.herokuapp.com/setup/setup.html";
})

