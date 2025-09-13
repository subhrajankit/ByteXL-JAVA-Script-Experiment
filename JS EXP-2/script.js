
        // Get DOM elements
        const categoryFilter = document.getElementById('categoryFilter');
        const productItems = document.querySelectorAll('.product-item');

        // Add event listener for filter changes
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            // Loop through all product items
            productItems.forEach(function(item) {
                const itemCategory = item.getAttribute('data-category');
                
                // Show or hide items based on selected category
                if (selectedCategory === 'all' || selectedCategory === itemCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });

        // Initialize - show all items by default
        categoryFilter.value = 'all';
