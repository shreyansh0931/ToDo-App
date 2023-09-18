console.log("js is connected");
$('.task-checkbox').on('change', function () {
    const taskId = $(this).val();
    const taskDescription = $(this).siblings('.task-details').find('.task-description');

    // Toggle the 'completed-task' class on the task description
    taskDescription.toggleClass('completed-task');

    // Send an AJAX request to update the task's completion status in the database
    $.ajax({
        url: '/update-task',
        type: 'POST',
        data: { id: taskId, completed: this.checked },
        success: function (response) {
            console.log('Task completion status updated');
        },
        error: function (error) {
            console.error('Error updating task completion status', error);
        }
    });
});


 