    

    const cards = document.querySelectorAll('[data-testid="test-todo-card"]');

    const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
    const cancelEdit = document.querySelector('[data-testid="test-todo-cancel-button"]');
    const saveEdit = document.querySelector('[data-testid="test-todo-save-button"]');
        

    let currentActiveCard = null;
    let values = {
        title: '',
        description: '',
        dueDate: '',
        priority: '',
    }

    cards.forEach(card =>{
        const checkBox = card.querySelector('[data-testid="test-todo-complete-toggle"]');
        const status = card.querySelector('[data-testid="test-todo-status"]');
        const editTask = card.querySelector('[data-testid="test-todo-edit-button"]');
        const deleteTask = card.querySelector('[data-testid="test-todo-delete-button"]');
        const statusSelect = card.querySelector('[data-testid="test-todo-status-control"]');
        const collapseSection = card.querySelector('[data-testid="test-todo-collapsible-section"]');
        const expandBtn = card.querySelector('[data-testid="test-todo-expand-toggle"]');


        if (expandBtn && collapseSection) {
            expandBtn.addEventListener('click', () => {
                const isExpanded = collapseSection.classList.contains('open');
                
                if (isExpanded) {
                    collapseSection.classList.replace('open', 'close');
                    expandBtn.textContent = "Show More";
                    expandBtn.setAttribute('aria-expanded', 'false');
                } else {
                    collapseSection.classList.replace('close', 'open');
                    expandBtn.textContent = "Show Less";
                    expandBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }

        checkBox.addEventListener('change', () => {
            if (checkBox.checked) {
                statusSelect.value = 'done';
                card.classList.add('done');
            } else {
                statusSelect.value = 'pending';
                card.classList.remove('done');
            }
            timeRemaining();
        });

        if (statusSelect && checkBox){
            statusSelect.addEventListener('change', () => {
                const currentStatus = statusSelect.value;
                
                if(currentStatus === 'done'){
                    checkBox.checked = true;
                    card.classList.add('done');
                } else{
                    checkBox.checked = false;
                    card.classList.remove('done');
                }
                
                timeRemaining();
            });
        }


        editTask.addEventListener('click',(e) => {
            currentActiveCard = card;
        
            const title = card.querySelector('[data-testid="test-todo-title"]').textContent.trim();
            const description = card.querySelector('[data-testid="test-todo-description"]').textContent.trim();
            const dateText = card.querySelector('.date').textContent.trim();
            const priority = card.querySelector('[data-testid="test-todo-priority"]').textContent.trim().toLowerCase();

            editForm.querySelector('[name="title"]').value = title;
            editForm.querySelector('[name="description"]').value = description;
            editForm.querySelector('[name="due_date"]').value = new Date(dateText).toLocaleDateString('en-CA');
            editForm.querySelector('[name="priority"]').value = priority;

            editForm.classList.remove('hidden');
        })

        cancelEdit.addEventListener('click', (e)=>{
            e.preventDefault();
            editForm.classList.add('hidden');
        })

        saveEdit.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentActiveCard) {
                const newTitle = editForm.querySelector('[name="title"]').value;
                const newDesc = editForm.querySelector('[name="description"]').value;
                const newPriority = editForm.querySelector('[name="priority"]').value;
                const newDate = editForm.querySelector('[name="due_date"]').value;

                currentActiveCard.querySelector('[data-testid="test-todo-title"]').textContent = newTitle;
                currentActiveCard.querySelector('[data-testid="test-todo-description"]').textContent = newDesc;
                
                const dateSpan = currentActiveCard.querySelector('.date');
                const formattedDate = new Date(newDate).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                });
                dateSpan.textContent = formattedDate;

            
                currentActiveCard.classList.remove('high', 'medium', 'low');
                currentActiveCard.classList.add(newPriority);

            
                const priorityBadge = currentActiveCard.querySelector('[data-testid="test-todo-priority"]');
                priorityBadge.textContent = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);
                priorityBadge.className = 'pills';

                editForm.classList.add('hidden');
                timeRemaining(); 
            }
        });

        deleteTask.addEventListener('click',() => {
            alert("Delete clicked")
        })

    })



    function timeRemaining(){
        document.querySelectorAll('[data-testid="test-todo-card"]').forEach(card => {
            const timeDisplay = card.querySelector('[data-testid="test-todo-time-remaining"]');
            const statusSelect = card.querySelector('[data-testid="test-todo-status-control"]');
            const dateText = card.querySelector('.date');

            if(statusSelect && statusSelect.value === 'done'){
                timeDisplay.textContent = "Completed";
                timeDisplay.style.color = "#10b981"; 
                return;
            }

            if(dateText){
                const dueDate = new Date(dateText.textContent.trim());
                const now = new Date();
                const diffMs = dueDate - now;
                const diffMins = Math.floor(diffMs / (1000 * 60));
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                let timeText = "";
                let color = "";

                if(diffMs < 0){
                    const absMins = Math.abs(diffMins);
                    const absHours = Math.abs(diffHours);
                    const absDays = Math.abs(diffDays);

                    if(absMins < 60) timeText = `Overdue by ${absMins} minutes`;
                    else if(absHours < 24) timeText = `Overdue by ${absHours} hours`;
                    else timeText = `Overdue by ${absDays} days`;
                    
                    color = "red";
                } else{
                    if(diffMins < 60) timeText = `Due in ${diffMins} minutes`;
                    else if(diffHours < 24) timeText = `Due in ${diffHours} hours`;
                    else if(diffDays === 1) timeText = "Due tomorrow";
                    else timeText = `Due in ${diffDays} days`;

                    if(diffHours < 24) color = "orange";
                }
            
                timeDisplay.textContent = timeText;
                timeDisplay.style.color = color;
            }
        });
    }  

    timeRemaining();
    setInterval(timeRemaining, 30000);