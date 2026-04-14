    

    const cards = document.querySelectorAll('[data-testid="test-todo-card"]');

    cards.forEach(card =>{
        const checkBox = card.querySelector('[data-testid="test-todo-complete-toggle"]');
        const status = card.querySelector('[data-testid="test-todo-status"]');
        const editTask = card.querySelector('[data-testid="test-todo-edit-button"]');
        const deleteTask = card.querySelector('[data-testid="test-todo-delete-button"]');



        checkBox.addEventListener('change',() => {
            if(checkBox.checked){
                console.log('checked')
                card.classList.add('done')
                status.textContent = 'Done'
            }
            else{
                card.classList.remove('done')
                status.textContent = card.classList.contains('high') ? 'In Progress' : 'Pending';
            }
        })


        editTask.addEventListener('click',() => {
            console.log('edit clicked');
        })

        deleteTask.addEventListener('click',() => {
            alert("Delete clicked")
        })

    })


    function timeRemaining() {
        cards.forEach(card => {
            const time = card.querySelector('[data-testid="test-todo-time-remaining"]');
            const dateText = card.querySelector('[data-testid="test-todo-due-date"] .date').textContent.trim();
            
            const dueDate = new Date(dateText);
            const now = new Date();
            const diffrent = dueDate - now;
            const daysLeft = Math.ceil(diffrent / (1000 * 60 * 60 * 24));

            if(daysLeft > 1){
                time.textContent = `Due in ${daysLeft} days`;
            } else if(daysLeft === 1){
                time.textContent = "Due tomorrow";
            } else if(daysLeft === 0){
                time.textContent = "Due today";
            } else{
                time.textContent = `Overdue by ${Math.abs(daysLeft)} days`;
                time.style.color = "red";
            }
        });
    }

    timeRemaining();
    setInterval(timeRemaining, 30000);