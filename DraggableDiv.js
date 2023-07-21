let DragDiv = document.getElementById('dragdiv');
console.log(DragDiv);

let isDragging = false;
let initialX, initialY, offsetX, offsetY;
let resizeHandle = null;
let isResizing = false;
let initialWidth, initialHeight;

function startdrag(e) {
    isDragging = true;
    // Add the event listeners for dragging here
    DragDiv.addEventListener('mousemove', Drag);
    window.addEventListener('mouseup', endDrag);

    initialX = e.clientX;
    initialY = e.clientY;

    const rect = DragDiv.getBoundingClientRect();
    offsetX = initialX - rect.left;
    offsetY = initialY - rect.top;
}

function Drag(e) {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        const computedStyle = window.getComputedStyle(DragDiv);
        const borderTopWidth = parseInt(computedStyle.getPropertyValue('border-top-width'));
        const borderLeftWidth = parseInt(computedStyle.getPropertyValue('border-left-width'));
        const borderRadius = parseInt(computedStyle.getPropertyValue('border-top-left-radius'));

        DragDiv.style.left = (x - borderLeftWidth + borderRadius) + 'px';
        DragDiv.style.top = (y - borderTopWidth + borderRadius) + 'px';
    }
}

function endDrag() {
    isDragging = false;
    // Remove the event listeners for dragging here
    DragDiv.removeEventListener('mousemove', Drag);
    window.removeEventListener('mouseup', endDrag);
}

function startResize(e) {
    resizeHandle = e.target;
    isResizing = true;
    // Add the event listeners for resizing here
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', endResize);

    const rect = DragDiv.getBoundingClientRect();
    initialWidth = rect.width;
    initialHeight = rect.height;

    e.preventDefault();
}

function resize(e) {
    if (isResizing) {
        const newWidth = initialWidth + (e.clientX - initialX);
        const newHeight = initialHeight + (e.clientY - initialY);

        DragDiv.style.width = newWidth + 'px';
        DragDiv.style.height = newHeight + 'px';
    }
}

function endResize() {
    isResizing = false;
    resizeHandle = null;
    // Remove the event listeners for resizing here
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', endResize);
}

const resizeHandles = document.querySelectorAll('.resize-handle');
resizeHandles.forEach(handle => {
    handle.addEventListener('mousedown', startResize);
});

DragDiv.addEventListener('mousedown', startdrag);