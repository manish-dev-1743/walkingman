let max_m_pos = 50;
let min_m_pos = curr_m_pos = 5;
let end_max_m_pos = 95;
let bg_p = 0;
let startX, isTouching = false;
let scrollTimeout;

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



        // Handle wheel event for mousepad/trackpad
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

            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                imageWrapper.classList.remove('walking-reverse');
                imageWrapper.classList.remove('walking');
            }, 150);
            
        });

        // Handle pointer events for touchpad
        contentWrapper.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'touch') {
                startX = e.clientX;
                isTouching = true;
            }
        });

        contentWrapper.addEventListener('pointermove', (e) => {
            if (!isTouching) return;
            e.preventDefault();
            const diffX = e.clientX - startX;
            if (diffX > 0) {
               moveRight();
            } else if (diffX < 0) {
               moveLeft();
            }

            startX = e.clientX;
        });

        contentWrapper.addEventListener('pointerup', () => {
            isTouching = false;
            imageWrapper.classList.remove('walking-reverse');
            imageWrapper.classList.remove('walking');
        });

        contentWrapper.addEventListener('pointercancel', () => {
            isTouching = false;
            imageWrapper.classList.remove('walking-reverse');
            imageWrapper.classList.remove('walking');
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