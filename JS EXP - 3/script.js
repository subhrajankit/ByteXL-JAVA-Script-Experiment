
        // Get DOM elements
        const canvas = document.getElementById('drawingCanvas');
        const drawingMode = document.getElementById('drawingMode');
        const strokeColor = document.getElementById('strokeColor');
        const strokeWidth = document.getElementById('strokeWidth');

        // Drawing state
        let isDrawing = false;
        let currentPath = null;
        let startX, startY;
        let pathPoints = [];

        // Get SVG coordinates from mouse event
        function getSVGCoordinates(event) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.viewBox.baseVal.width / rect.width || 1;
            const scaleY = canvas.viewBox.baseVal.height / rect.height || 1;
            
            return {
                x: (event.clientX - rect.left) * scaleX,
                y: (event.clientY - rect.top) * scaleY
            };
        }

        // Mouse down event handler
        canvas.addEventListener('mousedown', function(event) {
            event.preventDefault();
            isDrawing = true;
            
            const coords = getSVGCoordinates(event);
            startX = coords.x;
            startY = coords.y;

            const mode = drawingMode.value;
            const color = strokeColor.value;
            const width = strokeWidth.value;

            if (mode === 'freehand') {
                // Create a new path for freehand drawing
                currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                currentPath.setAttribute('stroke', color);
                currentPath.setAttribute('stroke-width', width);
                currentPath.setAttribute('fill', 'none');
                currentPath.setAttribute('stroke-linecap', 'round');
                currentPath.setAttribute('stroke-linejoin', 'round');
                
                pathPoints = [`M${startX},${startY}`];
                currentPath.setAttribute('d', pathPoints.join(' '));
                canvas.appendChild(currentPath);
            } else {
                // For shapes, create temporary element
                if (mode === 'line') {
                    currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    currentPath.setAttribute('x1', startX);
                    currentPath.setAttribute('y1', startY);
                    currentPath.setAttribute('x2', startX);
                    currentPath.setAttribute('y2', startY);
                } else if (mode === 'rectangle') {
                    currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    currentPath.setAttribute('x', startX);
                    currentPath.setAttribute('y', startY);
                    currentPath.setAttribute('width', 0);
                    currentPath.setAttribute('height', 0);
                    currentPath.setAttribute('fill', 'none');
                } else if (mode === 'circle') {
                    currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    currentPath.setAttribute('cx', startX);
                    currentPath.setAttribute('cy', startY);
                    currentPath.setAttribute('r', 0);
                    currentPath.setAttribute('fill', 'none');
                }
                
                currentPath.setAttribute('stroke', color);
                currentPath.setAttribute('stroke-width', width);
                canvas.appendChild(currentPath);
            }
        });

        // Mouse move event handler
        canvas.addEventListener('mousemove', function(event) {
            if (!isDrawing || !currentPath) return;
            
            event.preventDefault();
            const coords = getSVGCoordinates(event);
            const mode = drawingMode.value;

            if (mode === 'freehand') {
                // Add point to path
                pathPoints.push(`L${coords.x},${coords.y}`);
                currentPath.setAttribute('d', pathPoints.join(' '));
            } else if (mode === 'line') {
                currentPath.setAttribute('x2', coords.x);
                currentPath.setAttribute('y2', coords.y);
            } else if (mode === 'rectangle') {
                const width = Math.abs(coords.x - startX);
                const height = Math.abs(coords.y - startY);
                const x = Math.min(startX, coords.x);
                const y = Math.min(startY, coords.y);
                
                currentPath.setAttribute('x', x);
                currentPath.setAttribute('y', y);
                currentPath.setAttribute('width', width);
                currentPath.setAttribute('height', height);
            } else if (mode === 'circle') {
                const radius = Math.sqrt(
                    Math.pow(coords.x - startX, 2) + Math.pow(coords.y - startY, 2)
                );
                currentPath.setAttribute('r', radius);
            }
        });

        // Mouse up event handler
        canvas.addEventListener('mouseup', function(event) {
            isDrawing = false;
            currentPath = null;
            pathPoints = [];
        });

        // Mouse leave event handler
        canvas.addEventListener('mouseleave', function(event) {
            isDrawing = false;
            currentPath = null;
            pathPoints = [];
        });

        // Prevent context menu on right click
        canvas.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        // Clear canvas function
        function clearCanvas() {
            while (canvas.firstChild) {
                canvas.removeChild(canvas.firstChild);
            }
        }

        // Initialize canvas viewBox for proper scaling
        function initCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
        }

        // Initialize when page loads
        window.addEventListener('load', initCanvas);
        window.addEventListener('resize', initCanvas);
