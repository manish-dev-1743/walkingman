let max_m_pos = 50;
let min_m_pos = curr_m_pos = 5;
let end_max_m_pos = 95;
let bg_p = 0;
let isTouching = false;
let scrollTimeout;
let startX, startY, scrollLeft, scrollTop;
let touchHoldDirection = null;
let touchHoldInterval;


let imageWrapper = document.querySelector('.walking-man .image-wrapper');
let contentWrapper = document.getElementById('content-wrapper');
let manWrapper = document.getElementById('man_wrap');

manWrapper.setAttribute('style','left:'+curr_m_pos+'%');

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveRight();

    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveLeft();
    }
});

document.addEventListener('keyup', function(event) {
    const imageWrapper = document.querySelector('.walking-man .image-wrapper');
    if (event.key === 'ArrowRight') {
        imageWrapper.classList.remove('walking');
        imageWrapper.classList.remove('reverse-man');

    } else if (event.key === 'ArrowLeft') {
        imageWrapper.classList.remove('walking-reverse');
        imageWrapper.classList.add('reverse-man');
    }
});


       
contentWrapper.addEventListener('wheel', (e) => {
    
    if (e.deltaX > 0) {
        e.preventDefault();
        moveRight();
    } else if (e.deltaX < 0) {
        e.preventDefault();
        moveLeft();
    }else if(e.deltaY > 0){
        e.preventDefault();
        moveRight();
    }else if(e.deltaY < 0){
        e.preventDefault();
        moveLeft();
    }

    detectScrollEnd();
    
});



function startScrolling(direction) {
    isTouching = true;
    touchHoldDirection = direction;
    touchHoldInterval = setInterval(() => {
        if (touchHoldDirection === 'right') {
            moveRight();
        } else if (touchHoldDirection === 'left') {
            moveLeft();
        }
    }, 16); // 60 frames per second
}

// Function to stop scrolling
function stopScrolling() {
    isTouching = false;
    clearInterval(touchHoldInterval);
    touchHoldDirection = null;
    detectScrollEnd();
}

// Function to detect when scrolling has stopped
function detectScrollEnd() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        console.log('Scrolling has stopped');
    }, 150); 
}


// Add touchstart event listener
contentWrapper.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const touchX = touch.pageX;
    const screenWidth = window.innerWidth;

    if (touchX < screenWidth / 2) {
        // Touch on the left side
        startScrolling('left');
    } else {
        // Touch on the right side
        startScrolling('right');
    }
});

// Add touchend event listener
contentWrapper.addEventListener('touchend', (e) => {
    stopScrolling();
});

// Add touchcancel event listener to handle interruptions
contentWrapper.addEventListener('touchcancel', (e) => {
    stopScrolling();
});



function moveRight(){
    if(max_m_pos > curr_m_pos){
        curr_m_pos = curr_m_pos + 0.5;
        manWrapper.setAttribute('style','left:'+curr_m_pos+'%');
    }else{
        if (contentWrapper.scrollLeft + contentWrapper.clientWidth > contentWrapper.scrollWidth - 1) {
            if(end_max_m_pos > curr_m_pos){
                curr_m_pos = curr_m_pos + 0.5;
                manWrapper.setAttribute('style','left:'+curr_m_pos+'%');
            }
        }else{
            contentWrapper.scrollLeft = contentWrapper.scrollLeft + 10 ; 
        }
        if(max_m_pos === curr_m_pos){
            bg_p -= 10;
            contentWrapper.setAttribute('style','background-position:'+bg_p+'px 0');  
        }
       
    }
    imageWrapper.classList.remove('walking-reverse');
    imageWrapper.classList.remove('reverse-man');
    imageWrapper.classList.add('walking');
}

function moveLeft(){
    if(curr_m_pos > max_m_pos && end_max_m_pos >= curr_m_pos){
        curr_m_pos = curr_m_pos - 0.5;
        manWrapper.setAttribute('style','left:'+curr_m_pos+'%');   
    }else{

        contentWrapper.scrollLeft -= 10;    
        if (contentWrapper.scrollLeft === 0) {
            if(curr_m_pos > min_m_pos){
                curr_m_pos = curr_m_pos - 0.5;
                manWrapper.setAttribute('style','left:'+curr_m_pos+'%');
            }        
        }else{
            if(curr_m_pos === max_m_pos){
            
                bg_p += 10;
                if(bg_p > 0){
                    bg_p = 0;
                }
                contentWrapper.setAttribute('style','background-position:'+bg_p+'px 0');
            }
        }

    }
    imageWrapper.classList.remove('walking');
    imageWrapper.classList.add('reverse-man');
    imageWrapper.classList.add('walking-reverse');
}

function detectScrollEnd(){
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        imageWrapper.classList.remove('walking-reverse');
        imageWrapper.classList.remove('walking');
    }, 150);
}